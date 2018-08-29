import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { FormGroup } from '@angular/forms';
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
import { PageValidationService } from './page-validation.service';
import { Draft } from '../domain/draft';

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
    private pageValidationService: PageValidationService,
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
    return !this.pageValidationService.isPageValid(this.currentPage, this.editForm);
  }

  submit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.error = null;
      let currentPageFields = this.formValueService.filterCurrentPageFields(this.currentPage.case_fields, this.editForm.value);
      let caseEventData: CaseEventData = this.formValueService.sanitise(currentPageFields) as CaseEventData;
      caseEventData.event_token = this.eventTrigger.event_token;
      caseEventData.ignore_warning = this.ignoreWarning;
      this.caseEdit.validate(caseEventData)
        .subscribe(() => {
          this.saveDraft();
          this.next();
        }, error => this.handleError(error));
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
    this.saveDraft();
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

  private handleError(error) {
    this.isSubmitting = false;
    this.error = error;
    this.callbackErrorsSubject.next(this.error);
    if (this.error.details) {
      this.formErrorService
        .mapFieldErrors(this.error.details.field_errors, this.editForm.controls['data'] as FormGroup, 'validation');
    }
  }

  getCaseId(): String {
    return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
  }

  private saveDraft() {
    if (this.eventTrigger.can_save_draft) {
      let draftCaseEventData: CaseEventData = this.formValueService.sanitise(this.editForm.value) as CaseEventData;
      draftCaseEventData.event_token = this.eventTrigger.event_token;
      draftCaseEventData.ignore_warning = this.ignoreWarning;
      this.caseEdit.saveDraft(draftCaseEventData).subscribe(
        (draft) => this.eventTrigger.case_id = Draft.DRAFT + draft.id, error => this.handleError(error)
      );
    }
  }
}
