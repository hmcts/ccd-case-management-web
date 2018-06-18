import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { WizardPage } from '../domain/wizard-page.model';
import { CaseEventData } from '../domain/case-event-data';
import { FormValueService } from '../../core/form/form-value.service';
import { CallbackErrorsComponent } from '../error/callback-errors.component';
import { Subject } from 'rxjs/Subject';
import { HttpError } from '../../core/http/http-error.model';
import { FormErrorService } from '../../core/form/form-error.service';
import { CallbackErrorsContext } from '../error/error-context';
import { CaseFieldService } from '../domain/case-field.service';
import { CaseField } from '../domain/definition/case-field.model';

@Component({
  selector: 'ccd-case-edit-page',
  templateUrl: 'case-edit-page.html',
  styleUrls: ['./case-edit-page.scss']
})
export class CaseEditPageComponent implements OnInit, AfterViewChecked {
  eventTrigger: CaseEventTrigger;
  editForm: FormGroup;
  currentPage: WizardPage;
  error: HttpError;
  callbackErrorsSubject: Subject<any> = new Subject();
  ignoreWarning = false;
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
  isSubmitting = false;

  constructor(
    private caseEdit: CaseEditComponent,
    private route: ActivatedRoute,
    private formValueService: FormValueService,
    private formErrorService: FormErrorService,
    private cdRef: ChangeDetectorRef,
    private caseFieldService: CaseFieldService,
  ) {}

  ngOnInit(): void {
    this.eventTrigger = this.caseEdit.eventTrigger;
    this.editForm = this.caseEdit.form;

    this.route.params.subscribe(params => {
      let pageId = params['page'];
      if (!this.currentPage || pageId !== this.currentPage.id) {
        let page = this.caseEdit.getPage(pageId);
        if (page) {
          this.currentPage = page;
        } else {
          if (this.currentPage) {
            return this.next();
          } else {
            return this.first();
          }
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  first(): Promise<boolean> {
    return this.caseEdit.first();
  }

  currentPageIsNotValid(): boolean {
    return !this.currentPage.case_fields
      .filter(caseField => !this.caseFieldService.isReadOnly(caseField))
      .every(caseField => {
        let theControl = this.editForm.controls['data'].get(caseField.id);
        return this.checkDocumentField(caseField, theControl) && this.checkOptionalField(caseField, theControl);
      });
  }

  private checkDocumentField(caseField: CaseField, theControl: AbstractControl): boolean {
    if (caseField.field_type.id !== 'Document') {
      return true;
    }
    return !(this.checkMandatoryField(caseField, theControl));
  }

  private checkOptionalField(caseField: CaseField, theControl: AbstractControl): boolean {
    return (!theControl && this.caseFieldService.isOptional(caseField)) || theControl.valid || theControl.disabled;
  }

  private checkMandatoryField(caseField: CaseField, theControl: AbstractControl): boolean {
    return this.caseFieldService.isMandatory(caseField) && theControl === null;
  }

  submit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.error = null;
      let currentPageFields = this.formValueService.filterCurrentPageFields(this.currentPage.case_fields,
        this.editForm.value);
      let caseEventData: CaseEventData = this.formValueService.sanitise(currentPageFields) as CaseEventData;
      caseEventData.event_token = this.eventTrigger.event_token;
      caseEventData.ignore_warning = this.ignoreWarning;
      this.caseEdit.validate(caseEventData)
        .subscribe(() => this.next(),
          error => {
            this.isSubmitting = false;
            this.error = error;
            this.callbackErrorsSubject.next(this.error);
            if (this.error.details) {
              this.formErrorService
                .mapFieldErrors(this.error.details.field_errors, this.editForm.controls['data'] as FormGroup, 'validation');
            }
          }
        );
      this.scrollToTop();
    }
  }

  callbackErrorsNotify(errorContext: CallbackErrorsContext) {
    this.ignoreWarning = errorContext.ignore_warning;
    this.triggerText = errorContext.trigger_text;
  }

  next(): Promise<boolean> {
    this.isSubmitting = false;
    return this.caseEdit.next(this.currentPage.id);
  }

  previous(): Promise<boolean> {
    this.error = null;
    return this.caseEdit.previous(this.currentPage.id);
  }

  hasPrevious(): boolean {
    return this.caseEdit.hasPrevious(this.currentPage.id);
  }

  cancel(): void {
    this.caseEdit.cancel();
  }

  submitting(): boolean {
    return this.isSubmitting;
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
