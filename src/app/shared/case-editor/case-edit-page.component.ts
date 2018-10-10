import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CaseEventTrigger, WizardPage, CaseEventData, FormValueService, FormErrorService, DRAFT_PREFIX,
  HttpError, SaveOrDiscardDialogComponent, PageValidationService} from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { CallbackErrorsComponent } from '../error/callback-errors.component';
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsContext } from '../error/error-context';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CaseCreatorSubmitComponent } from '../../cases/creator/case-creator-submit.component';

@Component({
  selector: 'ccd-case-edit-page',
  templateUrl: 'case-edit-page.html',
  styleUrls: ['./case-edit-page.scss']
})
export class CaseEditPageComponent implements OnInit, AfterViewChecked {

  static readonly RESUMED_FORM_DISCARD = 'RESUMED_FORM_DISCARD';
  static readonly NEW_FORM_DISCARD = 'NEW_FORM_DISCARD';
  static readonly NEW_FORM_SAVE = 'NEW_FORM_CHANGED_SAVE';
  static readonly RESUMED_FORM_SAVE = 'RESUMED_FORM_SAVE';

  eventTrigger: CaseEventTrigger;
  editForm: FormGroup;
  currentPage: WizardPage;
  currentPageForm: FormGroup;
  dialogConfig: MatDialogConfig;
  error: HttpError;
  callbackErrorsSubject: Subject<any> = new Subject();
  ignoreWarning = false;
  triggerText: string = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
  isSubmitting = false;
  formValuesChanged = false;
  pageChangeSubject: Subject<boolean> = new Subject();

  constructor(
    private caseEdit: CaseEditComponent,
    private route: ActivatedRoute,
    private formValueService: FormValueService,
    private formErrorService: FormErrorService,
    private cdRef: ChangeDetectorRef,
    private pageValidationService: PageValidationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.initDialog();
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

  applyValuesChanged(valuesChanged: boolean): void {
    this.formValuesChanged = valuesChanged;
  }

  private initDialog() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.ariaLabel = 'Label';
    this.dialogConfig.height = '245px';
    this.dialogConfig.width = '550px';
    this.dialogConfig.panelClass = 'dialog';

    this.dialogConfig.closeOnNavigation = false;
    this.dialogConfig.position = {
      top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
    }
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
    this.formValuesChanged = false;
    this.pageChangeSubject.next(true);
    return this.caseEdit.next(this.currentPage.id);
  }

  previous(): Promise<boolean> {
    this.error = null;
    this.saveDraft();
    this.formValuesChanged = false;
    this.pageChangeSubject.next(true);
    return this.caseEdit.previous(this.currentPage.id);
  }

  hasPrevious(): boolean {
    return this.caseEdit.hasPrevious(this.currentPage.id);
  }

  cancel(): void {
    if (this.formValuesChanged) {
      const dialogRef = this.dialog.open(SaveOrDiscardDialogComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Discard') {
          this.discard();
        } else if (result === 'Save') {
          const draftCaseEventData: CaseEventData = this.formValueService.sanitise(this.editForm.value) as CaseEventData;
          if (this.route.snapshot.queryParamMap.get(CaseCreatorSubmitComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
            this.caseEdit.cancelled.emit({status: CaseEditPageComponent.RESUMED_FORM_SAVE, data: draftCaseEventData});
          } else {
            this.caseEdit.cancelled.emit({status: CaseEditPageComponent.NEW_FORM_SAVE, data: draftCaseEventData});
          }
        }
      });
    } else {
      this.discard();
    }
  }

  private discard() {
    if (this.route.snapshot.queryParamMap.get(CaseCreatorSubmitComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
      this.caseEdit.cancelled.emit({status: CaseEditPageComponent.RESUMED_FORM_DISCARD});
    } else {
      this.caseEdit.cancelled.emit({status: CaseEditPageComponent.NEW_FORM_DISCARD});
    }
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
        (draft) => this.eventTrigger.case_id = DRAFT_PREFIX + draft.id, error => this.handleError(error)
      );
    }
  }
}
