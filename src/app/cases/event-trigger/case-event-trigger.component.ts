import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseView } from '../../core/cases/case-view.model';
import { CaseReferencePipe } from '../../shared/utils/case-reference.pipe';
import { CasesService } from '../../core/cases/cases.service';
import { AlertService } from '../../core/alert/alert.service';
import { CaseEventTrigger } from '../../shared/domain/case-view/case-event-trigger.model';
import { Observable } from 'rxjs/Observable';
import { Activity, DisplayMode } from '../../core/activity/activity.model';
import { ActivityService } from '../../core/activity/activity.service';
import { Subscription } from 'rxjs/Subscription';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { EventStatusService } from '../../core/cases/event-status.service';

// TODO make this configurable
const RETRY = 5;
const NEXT_POLL_REQUEST_MS = 7500;

@Component({
  selector: 'ccd-case-event-trigger',
  templateUrl: './case-event-trigger.html'
})
export class CaseEventTriggerComponent implements OnInit, OnDestroy {
  BANNER = DisplayMode.BANNER;
  eventTrigger: CaseEventTrigger;
  caseDetails: CaseView;
  subscription: Subscription;

  constructor(
    private casesService: CasesService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private caseReferencePipe: CaseReferencePipe,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case;
    this.eventTrigger = this.route.snapshot.data.eventTrigger;
    this.subscription = this.postViewActivity().subscribe((_resolved) => {
      // console.log('Posted EDIT activity and result is: ' + JSON.stringify(resolved));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // TODO: We need to pull this method to ActivityPolllingService
  postViewActivity(): Observable<Activity[]> {
    return this.activityService.postActivity(this.caseDetails.case_id, ActivityService.ACTIVITY_EDIT)
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

  submit(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => this.casesService.createEvent(this.caseDetails, sanitizedEditForm);
  }

  validate(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => this.casesService.validateCase(
      this.caseDetails.case_type.jurisdiction.id,
      this.caseDetails.case_type.id, sanitizedEditForm);
  }

  submitted(event: any): void {
    let eventStatus: string = event['status'];
    this.router
      .navigate(['case', this.caseDetails.case_type.jurisdiction.id, this.caseDetails.case_type.id, this.caseDetails.case_id])
      .then(() => {
        let caseReference = this.caseReferencePipe.transform(this.caseDetails.case_id.toString());
        if (EventStatusService.isIncomplete(eventStatus)) {
          this.alertService.warning(`Case #${caseReference} has been updated with event: ${this.eventTrigger.name} `
            + `but the callback service cannot be completed`);
        } else {
          this.alertService.success(`Case #${caseReference} has been updated with event: ${this.eventTrigger.name}`);
        }
    });
  }

  cancel(): Promise<boolean> {
    return this.router.navigate(['/case', this.caseDetails.case_type.jurisdiction.id, this.caseDetails.case_type.id,
      this.caseDetails.case_id]);
  }
}
