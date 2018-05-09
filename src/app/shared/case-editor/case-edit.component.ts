import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { Observable } from 'rxjs/Observable';
import { Wizard } from './wizard.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Confirmation } from './confirmation.model';
import { Predicate } from '../predicate';
import { WizardPage } from '../domain/wizard-page.model';
import { FieldsUtils } from '../utils/fields.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowCondition } from '../conditional-show/conditional-show.model';

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
  ) {}

  ngOnInit(): void {
    this.wizard = new Wizard(this.eventTrigger.wizard_pages);

    this.form = this.fb.group({
      'data': new FormGroup({}),
      'event': this.fb.group({
        'id': [this.eventTrigger.id, Validators.required],
        'summary': [''],
        'description': ['']
      })
    });
  }

  buildCanShowPredicate(): Predicate<WizardPage> {
    let currentState = this.fieldsUtils.mergeCaseFieldsAndFormFields(this.eventTrigger.case_fields, this.form.controls['data'].value);
    return (page: WizardPage): boolean => {
      return page.parsedShowCondition.match(currentState);
    };
  }

  getPage(pageId: string): WizardPage {
    return this.wizard.getPage(pageId, this.buildCanShowPredicate());
  }

  first(): Promise<boolean> {
    let firstPage = this.wizard.firstPage(this.buildCanShowPredicate());
    return this.router.navigate([firstPage ? firstPage.id : 'submit'], { relativeTo: this.route });
  }

  navigateToPage(pageId: string): Promise<boolean> {
    let page = this.getPage(pageId);
    return this.router.navigate([page ? page.id : 'submit'], { relativeTo: this.route });
  }

  next(currentPageId: string): Promise<boolean> {
    this.clearHiddenFields(currentPageId);

    let nextPage = this.wizard.nextPage(currentPageId, this.buildCanShowPredicate());
    return this.router.navigate([nextPage ? nextPage.id : 'submit'], { relativeTo: this.route });
  }

  previous(currentPageId: string): Promise<boolean> {
    this.clearHiddenFields(currentPageId);

    let previousPage = this.wizard.previousPage(currentPageId, this.buildCanShowPredicate());
    if (!previousPage) {
      return Promise.resolve(false);
    }

    return this.router.navigate([previousPage.id], { relativeTo: this.route });
  }

  hasPrevious(currentPageId: string): boolean {
    return this.wizard.hasPreviousPage(currentPageId, this.buildCanShowPredicate());
  }

  cancel(): void {
    this.cancelled.emit();
  }

  confirm(confirmation: Confirmation): Promise<boolean> {
    this.confirmation = confirmation;
    return this.router.navigate(['confirm'], {relativeTo: this.route});
  }

  private clearHiddenFields(currentPageId) {
    let formFields = this.form.getRawValue();
    this.clearHiddenFieldForFieldShowCondition(currentPageId, formFields);
    this.clearHiddenFieldForPageShowCondition(formFields);
  }

  private clearHiddenFieldForPageShowCondition(formFields) {
    this.wizard.pages.forEach(wp => {
      if (this.hasShowConditionPage(wp, formFields)) {
          let condition = new ShowCondition(wp.show_condition);
          if (this.isHidden(condition, formFields)) {
            this.resetPage(wp);
          }
      }
    });
  }

  private clearHiddenFieldForFieldShowCondition(currentPageId, formFields) {
    let currentPage: WizardPage = this.wizard.getPage(currentPageId, this.buildCanShowPredicate());
    currentPage.wizard_page_fields.forEach(wpf => {
      let case_field = this.findCaseFieldByWizardPageFieldId(currentPage, wpf);
      if (this.hasShowConditionField(case_field, formFields)) {
          let condition = new ShowCondition(case_field.show_condition);
          if (this.isHidden(condition, formFields)) {
            this.resetField(case_field);
          }
      }
    });
  }

  private isHidden(condition, formFields) {
    return !condition.match(formFields.data);
  }

  private findCaseFieldByWizardPageFieldId(currentPage, wizardPageField) {
    return currentPage.case_fields.find(cf => cf.id === wizardPageField.case_field_id);
  }

  private hasShowConditionPage(wizardPage, formFields): boolean {
    return wizardPage.show_condition && formFields.data[this.getShowConditionKey(wizardPage.show_condition)];
  }

  private hasShowConditionField(case_field, formFields): boolean {
    return case_field.show_condition && formFields.data[this.getShowConditionKey(case_field.show_condition)];
  }

  private getShowConditionKey(show_condition) {
    return show_condition.split('=')[0];
  }

  private resetField(field) {
    if (Array.isArray(field.value)) {
      field.value.splice(0, field.value.length);
    } else if (this.isObject(field.value)) {
      field.value = {};
    } else {
      field.value = '';
    }
    (this.form.get('data') as FormGroup).removeControl(field.id);
  }

  private resetPage(wizardPage: WizardPage) {
    wizardPage.wizard_page_fields.forEach(wpf => {
      let case_field = this.findCaseFieldByWizardPageFieldId(wizardPage, wpf);
      this.resetField(case_field);
    });
  }

  private getType(elem): string {
    return Object.prototype.toString.call(elem).slice(8, -1);
  }

  private isObject(elem) {
    return this.getType(elem) === 'Object';
  };
}
