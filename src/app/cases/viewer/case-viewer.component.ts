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
import { ActivityPollingService } from '../../core/activity/activity.polling.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CaseField } from '../../shared/domain/definition/case-field.model';
import { ShowCondition } from '../../shared/conditional-show/conditional-show.model';

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
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_GO;
  ignoreWarning = false;
  subscription: Subscription;

  callbackErrorsSubject: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private activityPollingService: ActivityPollingService
  ) {}

  ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case;

    // Clone and sort tabs array
    this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);

    this.caseFields = this.getTabFields();

    this.sortedTabs = this.sortTabFieldsAndFilterTabs(this.sortedTabs);

    this.subscription = this.postViewActivity().subscribe((_resolved) => {
      // console.log('Posted VIEW activity and result is: ' + JSON.stringify(resolved));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  postViewActivity(): Observable<Activity[]> {
    return this.activityPollingService.postViewActivity(this.caseDetails.case_id);
  }

  private sortTabFieldsAndFilterTabs(tabs: CaseTab[]): CaseTab[] {
    return tabs
      .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
      .filter(tab => new ShowCondition(tab.show_condition).matchByCaseFields(this.caseFields));
  }

  clearErrorsAndWarnings() {
    this.error = null;
    this.ignoreWarning = false;
    this.triggerText = CallbackErrorsComponent.TRIGGER_TEXT_GO;
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
    const caseDataFields = this.sortedTabs.reduce((acc, tab) => {
      return acc.concat(tab.fields);
    }, []);

    return caseDataFields.concat(this.caseDetails.metadataFields);
  }
}
