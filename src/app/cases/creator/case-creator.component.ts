import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpError, Jurisdiction, CallbackErrorsContext, AlertService } from '@hmcts/ccd-case-ui-toolkit/';
import { Router } from '@angular/router';
import { CreateCaseFiltersSelection } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components';
import { DefinitionsService } from '../../core/definitions/definitions.service';
import { CREATE_ACCESS } from '../../shared/domain/case-view/access-types.model';

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
  triggerText = CaseCreatorComponent.TRIGGER_TEXT_START;
  ignoreWarning = false;
  error: HttpError;

  constructor(
    private router: Router,
    private definitionsService: DefinitionsService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.definitionsService.getJurisdictions(CREATE_ACCESS)
      .subscribe(jurisdictions => {
        this.jurisdictions = jurisdictions;
      });
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
      this.callbackErrorsSubject.next(error);
    });
  }

  callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignore_warning;
    this.triggerText = errorContext.trigger_text;
  }

  resetErrors(): void {
    this.error = null;
    this.ignoreWarning = false;
    this.callbackErrorsSubject.next(null);
    this.alertService.clear();
  }
}
