import { Component, OnInit } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { FormGroup } from '@angular/forms';
import { CaseEventData } from '../domain/case-event-data';
import { FormValueService } from '../../core/form/form-value.service';
import { CaseEditComponent } from './case-edit.component';
import { HttpError } from '../../core/http/http-error.model';
import { FormErrorService } from '../../core/form/form-error.service';
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsComponent } from '../error/callback-errors.component';
import { CallbackErrorsContext } from '../error/error-context';
import { CaseField } from '../domain/definition/case-field.model';
import { WizardPage } from '../domain/wizard-page.model';
import { FieldsUtils } from '../utils/fields.utils';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../core/profile/profile.model';
import { Confirmation } from './confirmation.model';
import { CaseFieldService } from '../domain/case-field.service';
import { Wizard } from './wizard.model';
import { PaletteContext } from '../palette/base-field/palette-context.enum';

@Component({
  selector: 'ccd-case-edit-submit',
  templateUrl: 'case-edit-submit.html',
  styleUrls: ['./case-edit.scss']
})
export class CaseEditSubmitComponent implements OnInit {
  eventTrigger: CaseEventTrigger;
  editForm: FormGroup;
  error: HttpError;
  callbackErrorsSubject: Subject<any> = new Subject();
  ignoreWarning = false;
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
  wizard: Wizard;
  profile: Profile;
  paletteContext: PaletteContext = PaletteContext.CHECK_YOUR_ANSWER;

  constructor(
    private caseEdit: CaseEditComponent,
    private formValueService: FormValueService,
    private formErrorService: FormErrorService,
    private fieldsUtils: FieldsUtils,
    private caseFieldService: CaseFieldService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.eventTrigger = this.caseEdit.eventTrigger;
    this.editForm = this.caseEdit.form;
    this.wizard = this.caseEdit.wizard;
    this.profile = this.getProfile(this.route);
  }

  submit(): void {
    let caseEventData: CaseEventData = this.formValueService.sanitise(this.editForm.value) as CaseEventData;
    caseEventData.event_token = this.eventTrigger.event_token;
    caseEventData.ignore_warning = this.ignoreWarning;
    this.caseEdit.submit(caseEventData)
      .subscribe(
        response => {
          let confirmation: Confirmation = this.buildConfirmation(response);
          if (confirmation && (confirmation.getHeader() || confirmation.getBody())) {
            this.caseEdit.confirm(confirmation);
          } else {
            this.caseEdit.submitted.emit({caseId: response['id'], status: response['callback_response_status']});
          }
        },
        error => {
          this.error = error;
          this.callbackErrorsSubject.next(this.error);
          if (this.error.details) {
            this.formErrorService
              .mapFieldErrors(this.error.details.field_errors, this.editForm.controls['data'] as FormGroup, 'validation');
          }
        }
      );
  }

  isDisabled(): boolean {
    return !this.editForm.valid || this.hasErrors();
  }

  private hasErrors(): boolean {
    return this.error
      && this.error.callbackErrors
      && this.error.callbackErrors.length;
  }

  navigateToPage(pageId: string): void {
    this.caseEdit.navigateToPage(pageId);
  }

  callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignore_warning;
    this.triggerText = errorContext.trigger_text;
  }

  summaryCaseField(field: CaseField): CaseField {
    let cloneField: CaseField = Object.assign({}, field);

    if (null == this.editForm.get('data').get(field.id)) {
      // If not in form, return field itself
      return field;
    }

    cloneField.value = this.editForm.get('data').get(field.id).value;

    return cloneField;
  }

  cancel(): void {
    this.caseEdit.cancel();
  }

  isChangeAllowed(field: CaseField): boolean {
    return !this.caseFieldService.isReadOnly(field);
  }

  fieldsToDisplayExists(): boolean {

    if (!this.eventTrigger.show_summary) {
      return false;
    }

    for (let page of this.wizard.pages) {
      if (this.isShown(page)) {
        for (let field of page.case_fields) {
          if (this.canShowField(field)) {
            // at least one field needs showing
            return true;
          }
        }
      }
    }

    // found no fields to show in summary page
    return false;
  }

  private getLastPageShown(): WizardPage {
    let lastPage: WizardPage;
    this.wizard.reverse().forEach(page => {
      if (!lastPage && this.isShown(page)) {
        lastPage = page;
      }
    });
    // noinspection JSUnusedAssignment
    return lastPage;
  }

  previous() {
    if (this.hasPrevious()) {
      this.navigateToPage(this.getLastPageShown().id);
    }
  }

  hasPrevious(): boolean {
    return !!this.getLastPageShown();
  }

  isShown(page: WizardPage): boolean {
    let fields = this.fieldsUtils
        .mergeCaseFieldsAndFormFields(this.eventTrigger.case_fields, this.editForm.controls['data'].value);
    return page.parsedShowCondition.match(fields);
  }

  canShowField(field: CaseField): boolean {
    return field.show_summary_change_option;
  }

  isSolicitor(): boolean {
    return this.profile.isSolicitor();
  }

  private getProfile(route: ActivatedRoute) {
    return route.snapshot.pathFromRoot[1].data.profile;
  }

  private buildConfirmation(response: any): Confirmation {
    if (response['after_submit_callback_response']) {
      return new Confirmation(
        response['id'],
        response['callback_response_status'],
        response['after_submit_callback_response']['confirmation_header'],
        response['after_submit_callback_response']['confirmation_body']
      );
    } else {
      return null;
    }
  }
}
