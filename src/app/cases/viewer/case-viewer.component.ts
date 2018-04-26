import { Component, OnDestroy, OnInit } from '@angular/core';
import { CaseView } from '../../core/cases/case-view.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseTab } from '../../core/cases/case-tab.model';
import { OrderService } from '../../core/order/order.service';
import { CaseViewTrigger } from '../../shared/domain/case-view/case-view-trigger.model';
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsContext } from '../../shared/error/error-context';
import { CallbackErrorsComponent } from '../../shared/error/callback-errors.component';
import { Activity, DisplayMode } from '../../core/activity/activity.model';
import { ActivityService } from '../../core/activity/activity.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CaseField } from '../../shared/domain/definition/case-field.model';

// TODO make this configurable
const RETRY = 5;
const NEXT_POLL_REQUEST_MS = 7500;

@Component({
  templateUrl: './case-viewer.component.html',
  styleUrls: ['./case-viewer.scss']
})
export class CaseViewerComponent implements OnInit, OnDestroy {
  BANNER = DisplayMode.BANNER;

  caseDetails: CaseView;
  sortedTabs: CaseTab[];
  caseFields: CaseField[];
  error: any;
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
  ignoreWarning = false;
  subscription: Subscription;

  callbackErrorsSubject: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case;

    // Clone and sort tabs array
    this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);

    // Clone and sort fields array
    this.sortedTabs = this.sortedTabs.map(tab => Object.assign({}, tab, {
      fields: this.orderService.sort(tab.fields)
    }));

    this.caseFields = this.getTabFields();

    this.subscription = this.postViewActivity().subscribe((_resolved) => {
      // console.log('Posted VIEW activity and result is: ' + JSON.stringify(resolved));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // TODO: We need to pull this method to ActivityPolllingService
  postViewActivity(): Observable<Activity[]> {
    return this.activityService.postActivity(this.caseDetails.case_id, ActivityService.ACTIVITY_VIEW)
      .switchMap(
        (data) => Observable.timer(NEXT_POLL_REQUEST_MS)
          .switchMap(() => this.postViewActivity())
          .startWith(data)
      ).retryWhen(
        attempts =>
          attempts
            .zip(Observable.range(1, RETRY), (_, i) => i)
            .flatMap(i => {
              // console.log('retrying fetching of activity. Delay retry by ' + i + ' second(s)');
              return Observable.timer(i * 1000);
            }));
  }

  clearErrorsAndWarnings() {
    this.error = null;
    this.ignoreWarning = false;
    this.triggerText = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
  }

  applyTrigger(trigger: CaseViewTrigger): Promise<boolean | void> {
    this.error = null;

    let queryParams = {};

    if (this.ignoreWarning) {
      queryParams['ignoreWarning'] = this.ignoreWarning;
    }

    return this.router.navigate(['trigger', trigger.id], {
      queryParams,
      relativeTo: this.route
    }).catch(error => {
      if (error.status !== 401 && error.status !== 403) {
        this.error = error;
        console.log('error during triggering event:', trigger.id);
        console.log(error);
        this.callbackErrorsSubject.next(this.error);
      }
    });
  }

  callbackErrorsNotify(callbackErrorsContext: CallbackErrorsContext) {
    this.ignoreWarning = callbackErrorsContext.ignore_warning;
    this.triggerText = callbackErrorsContext.trigger_text;
  }

  private getTabFields(): CaseField[] {
    return this.sortedTabs.reduce((acc, tab) => {
      return acc.concat(tab.fields);
    }, []);
  }
}
