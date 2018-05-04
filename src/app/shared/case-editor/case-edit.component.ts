import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { Observable } from 'rxjs/Observable';
import { Wizard } from './wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confirmation } from './confirmation.model';
import { Predicate } from '../predicate';
import { WizardPage } from '../domain/wizard-page.model';
import { FieldsUtils } from '../utils/fields.utils';
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
    let nextPage = this.wizard.nextPage(currentPageId, this.buildCanShowPredicate());
    return this.router.navigate([nextPage ? nextPage.id : 'submit'], { relativeTo: this.route });
  }

  previous(currentPageId: string): Promise<boolean> {
    let previousPage = this.wizard.previousPage(currentPageId, this.buildCanShowPredicate());
    if (!previousPage) {
      return Promise.resolve(false);
    }
    this.resetInvalidFormFields();
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

  private resetInvalidFormFields() {
    Object.keys(this.form.controls['data'].value).forEach(key => {
      const control = this.form.controls['data'].get(key);
      if (control.touched && control.invalid) {
        control.reset();
      }
    });
  }
}
