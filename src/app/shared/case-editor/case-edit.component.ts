import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseEventTrigger, WizardPage, ConditionalShowRegistrarService, Draft, FieldsUtils,
  FieldsPurger, WizardFactoryService, Wizard, CaseView, Confirmation } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccd-case-edit',
  templateUrl: 'case-edit.component.html',
  styleUrls: ['./case-edit.scss'],
})
export class CaseEditComponent implements OnInit {

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fieldsUtils: FieldsUtils,
    private fieldsPurger: FieldsPurger,
    private registrarService: ConditionalShowRegistrarService,
    private wizardFactory: WizardFactoryService
  ) {}

  ngOnInit(): void {
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

    let nextPage = this.wizard.nextPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    return this.router.navigate([nextPage ? nextPage.id : 'submit'], { relativeTo: this.route });
  }

  previous(currentPageId: string): Promise<boolean> {
    this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
    this.registrarService.reset();

    let previousPage = this.wizard.previousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    if (!previousPage) {
      return Promise.resolve(false);
    }

    return this.router.navigate([previousPage.id], { relativeTo: this.route });
  }

  hasPrevious(currentPageId: string): boolean {
    return this.wizard.hasPreviousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
  }

  cancel(): void {
    this.cancelled.emit();
  }

  confirm(confirmation: Confirmation): Promise<boolean> {
    this.confirmation = confirmation;
    return this.router.navigate(['confirm'], {relativeTo: this.route});
  }

}
