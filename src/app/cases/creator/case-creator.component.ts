import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpError, Jurisdiction, CallbackErrorsContext, AlertService, CreateCaseFiltersSelection } from '@hmcts/ccd-case-ui-toolkit/';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'case-creator.component.html'
})
export class CaseCreatorComponent implements OnInit {

  static readonly TRIGGER_TEXT_START = 'Start';
  static readonly TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Start';

  jurisdictions: Jurisdiction[];
  callbackErrorsSubject: Subject<any> = new Subject();

  triggerTextStart = CaseCreatorComponent.TRIGGER_TEXT_START;
  triggerTextIgnoreWarnings = CaseCreatorComponent.TRIGGER_TEXT_CONTINUE;
  startButtonText = CaseCreatorComponent.TRIGGER_TEXT_START;
  ignoreWarning = false;
  error: HttpError;

  constructor(
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  apply(selected: CreateCaseFiltersSelection) {
    let queryParams = {};
    if (this.ignoreWarning) {
      queryParams['ignoreWarning'] = this.ignoreWarning;
    }
    return this.router.navigate(['/create/case', selected.jurisdictionId, selected.caseTypeId, selected.eventId], {
      queryParams
    }).catch(error => {
      this.error = error;
      console.log(error);
      this.callbackErrorsSubject.next(error);
    });
  }

  callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignore_warning;
    this.startButtonText = errorContext.trigger_text;
  }

  resetErrors(): void {
    this.error = null;
    this.ignoreWarning = false;
    this.callbackErrorsSubject.next(null);
    this.alertService.clear();
  }

  hasErrors(): boolean {
    return (this.error
      && this.error.callbackErrors
      && this.error.callbackErrors.length)
      ||
      (this.error
        && this.error.details
        && this.error.details.field_errors
        && this.error.details.field_errors.length);
  }
}
