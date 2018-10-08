import { Component, OnInit } from '@angular/core';
import { CaseReferencePipe } from '../../shared/utils/case-reference.pipe';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CasesService } from '../../core/cases/cases.service';
import { AlertService } from '../../core/alert/alert.service';
import { CaseEventTrigger } from '../../shared/domain/case-view/case-event-trigger.model';
import { Observable } from 'rxjs/Observable';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { EventStatusService } from '../../core/cases/event-status.service';
import { DraftService } from '../../core/draft/draft.service';
import { Draft } from '../../shared/domain/draft';

@Component({
  selector: 'ccd-case-creator-submit',
  templateUrl: 'case-creator-submit.component.html'
})
export class CaseCreatorSubmitComponent implements OnInit {

  eventTrigger: CaseEventTrigger;

  jurisdictionId: string;
  caseTypeId: string;

  constructor(
    private casesService: CasesService,
    private draftService: DraftService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private caseReferencePipe: CaseReferencePipe,
  ) {
    this.eventTrigger = route.snapshot.data.eventTrigger;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.jurisdictionId = params['jid'];
      this.caseTypeId = params['ctid'];
    });
  }

  submit(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => {
      sanitizedEditForm.draft_id = this.eventTrigger.case_id;
      return this.casesService.createCase(this.jurisdictionId, this.caseTypeId, sanitizedEditForm);
    }
  }

  validate(): (sanitizedEditForm: CaseEventData) => Observable<object> {
    return (sanitizedEditForm: CaseEventData) => this.casesService.validateCase(this.jurisdictionId, this.caseTypeId, sanitizedEditForm);
  }

  saveDraft(): (caseEventData: CaseEventData) => Observable<Draft> {
    if (this.eventTrigger.can_save_draft) {
      return (caseEventData: CaseEventData) => this.draftService.createOrUpdateDraft(this.jurisdictionId,
        this.caseTypeId,
        this.eventTrigger.case_id,
        caseEventData);
    }
  }

  submitted(event: any): void {
    let caseId: string = event['caseId'];
    let eventStatus: string = event['status'];
    this.router
      .navigate(['case', this.jurisdictionId, this.caseTypeId, caseId])
      .then(() => {
        let caseReference = this.caseReferencePipe.transform(String(caseId));
        if (EventStatusService.isIncomplete(eventStatus)) {
          this.alertFailure(eventStatus, caseReference);
        } else {
          this.alertSuccess(eventStatus, caseReference);
        }
    });
  }

  cancel(): Promise<boolean> {
    return this.router.navigate(['/create/case']);
  }

  private alertSuccess(eventStatus, caseReference) {
    eventStatus = eventStatus || EventStatusService.CALLBACK_STATUS_COMPLETE;
    switch (eventStatus) {
      case EventStatusService.CALLBACK_STATUS_COMPLETE:
        this.alertService.success(`Case #${caseReference} has been created.`);
        break;
      case EventStatusService.DELETE_DRAFT_STATUS_COMPLETE:
        this.alertService.success(`Case #${caseReference} has been created. The draft has been successfully deleted`);
        break;
    }
  }

  private alertFailure(eventStatus, caseReference) {
    switch (eventStatus) {
      case EventStatusService.CALLBACK_STATUS_INCOMPLETE:
        this.alertService.warning(`Case #${caseReference} has been created but the callback service cannot be completed`);
        break;
      case EventStatusService.DELETE_DRAFT_STATUS_INCOMPLETE:
        this.alertService.warning(`Case #${caseReference} has been created. The draft store is currently down so the draft
         was not deleted.`);
        break;
    }
  }
}
