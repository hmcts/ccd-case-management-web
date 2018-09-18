import { Component, EventEmitter, Input, OnInit, AfterViewInit, Output } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { Observable } from 'rxjs/Observable';
import { Wizard } from './wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confirmation } from './confirmation.model';
import { WizardPage } from '../domain/wizard-page.model';
import { FieldsUtils } from '../utils/fields.utils';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FieldsPurger } from '../utils/fields.purger';
import { ConditionalShowRegistrarService } from '../conditional-show/conditional-show-registrar.service';
import { CaseView } from '../../core/cases/case-view.model';
import { Draft } from '../domain/draft';
import { WizardFactoryService } from '../../core/case-editor/wizard-factory.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SaveOrDiscardDialogComponent } from '../save-or-discard-dialog/save-or-discard-dialog.component';
import { CaseEventData } from '../domain/case-event-data';
import { FormValueService } from '../../core/form/form-value.service';

@Component({
  selector: 'ccd-case-edit',
  templateUrl: 'case-edit.component.html',
  styleUrls: ['./case-edit.scss'],
})
export class CaseEditComponent implements AfterViewInit, OnInit {

  static readonly NEW_FORM_EMPTY_DISCARD = 'NEW_FORM_EMPTY_DISCARD';
  static readonly RESUMED_FORM_NO_CHANGE_DISCARD = 'RESUMED_FORM_NO_CHANGE_DISCARD';
  static readonly RESUMED_FORM_CHANGED_DISCARD = 'RESUMED_FORM_CHANGED_DISCARD';
  static readonly NEW_FORM_CHANGED_DISCARD = 'NEW_FORM_CHANGED_DISCARD';
  static readonly NEW_FORM_CHANGED_SAVE = 'NEW_FORM_CHANGED_SAVE';
  static readonly RESUMED_FORM_CHANGED_SAVE = 'RESUMED_FORM_CHANGED_SAVE';

  @Input()
  eventTrigger: CaseEventTrigger;

  @Input()
  submit: (CaseEventData) => Observable<object>;

  @Input()
  validate: (CaseEventData) => Observable<object>;

  @Input()
  saveDraft: (CaseEventData) => Observable<Draft>;

  @Input()
  caseDetails: CaseView;

  @Output()
  cancelled: EventEmitter<any> = new EventEmitter();

  @Output()
  submitted: EventEmitter<any> = new EventEmitter();

  wizard: Wizard;

  form: FormGroup;

  confirmation: Confirmation;

  dialogConfig: MatDialogConfig;

  formValuesChanged = false;

  jurisdictionId: string;
  caseTypeId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fieldsUtils: FieldsUtils,
    private fieldsPurger: FieldsPurger,
    private registrarService: ConditionalShowRegistrarService,
    private wizardFactory: WizardFactoryService,
    private dialog: MatDialog,
    private formValueService: FormValueService
  ) {}

  ngOnInit(): void {
    this.initDialog();
    this.wizard = this.wizardFactory.create(this.eventTrigger);

    this.form = this.fb.group({
      'data': new FormGroup({}),
      'event': this.fb.group({
        'id': [this.eventTrigger.id, Validators.required],
        'summary': [''],
        'description': ['']
      })
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(changes => {
        this.formValuesChanged = true;
    });
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

  getPage(pageId: string): WizardPage {
    return this.wizard.getPage(pageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
  }

  first(): Promise<boolean> {
    let firstPage = this.wizard.firstPage(this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    return this.router.navigate([firstPage ? firstPage.id : 'submit'], { relativeTo: this.route });
  }

  navigateToPage(pageId: string): Promise<boolean> {
    let page = this.getPage(pageId);
    return this.router.navigate([page ? page.id : 'submit'], { relativeTo: this.route });
  }

  next(currentPageId: string): Promise<boolean> {
    this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
    this.registrarService.reset();

    let theQueryParams: Params = {};
    theQueryParams[Draft.DRAFT] = this.eventTrigger.case_id;
    let nextPage = this.wizard.nextPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    return this.router.navigate([nextPage ? nextPage.id : 'submit'], { queryParams: theQueryParams, relativeTo: this.route });
  }

  previous(currentPageId: string): Promise<boolean> {
    this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
    this.registrarService.reset();

    let previousPage = this.wizard.previousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    if (!previousPage) {
      return Promise.resolve(false);
    }

    let theQueryParams: Params = {};
    theQueryParams[Draft.DRAFT] = this.eventTrigger.case_id;
    return this.router.navigate([previousPage.id], { queryParams: theQueryParams, relativeTo: this.route });
  }

  hasPrevious(currentPageId: string): boolean {
    return this.wizard.hasPreviousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
  }

  cancel(): void  {
    const isEmpty = this.formValueService.isEmpty(this.form.controls['data'].value);
    if (this.formValuesChanged) {
      const dialogRef = this.dialog.open(SaveOrDiscardDialogComponent, this.dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Discard') {
          if (this.router.url.includes('DRAFT=DRAFT')) {
            this.cancelled.emit({status: CaseEditComponent.RESUMED_FORM_CHANGED_DISCARD});
          } else {
            this.cancelled.emit({status: CaseEditComponent.NEW_FORM_CHANGED_DISCARD});
          }
        } else if (result === 'Save') {
          let draftCaseEventData: CaseEventData = this.formValueService.sanitise(this.form.value) as CaseEventData;
          if (this.router.url.includes('DRAFT=DRAFT')) {
            this.cancelled.emit({status: CaseEditComponent.RESUMED_FORM_CHANGED_SAVE, data: draftCaseEventData});
          } else {
            this.cancelled.emit({status: CaseEditComponent.NEW_FORM_CHANGED_SAVE, data: draftCaseEventData});
          }
        }
      });
    } else {
      if (isEmpty) {
        this.cancelled.emit({status: CaseEditComponent.NEW_FORM_EMPTY_DISCARD});
      } else {
        this.cancelled.emit({status: CaseEditComponent.RESUMED_FORM_NO_CHANGE_DISCARD});
      }
    }
  }

  confirm(confirmation: Confirmation): Promise<boolean> {
    this.confirmation = confirmation;
    return this.router.navigate(['confirm'], {relativeTo: this.route});
  }

}
