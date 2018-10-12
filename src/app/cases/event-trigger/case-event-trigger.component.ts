import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../../core/cases/cases.service';
import { CaseEventTrigger, CaseEventData, CaseReferencePipe, CaseView, AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { Activity, DisplayMode } from '../../core/activity/activity.model';
import { Subscription } from 'rxjs/Subscription';
import { EventStatusService } from '../../core/cases/event-status.service';
import { ActivityPollingService } from '../../core/activity/activity.polling.service';

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
    private activityPollingService: ActivityPollingService
  ) { }

  ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case;
    this.eventTrigger = this.route.snapshot.data.eventTrigger;
    this.subscription = this.postEditActivity().subscribe((_resolved) => {
      // console.log('Posted EDIT activity and result is: ' + JSON.stringify(resolved));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  postEditActivity(): Observable<Activity[]> {
    return this.activityPollingService.postEditActivity(this.caseDetails.case_id);
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
