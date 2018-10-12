import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseEventTrigger, WizardPage, ConditionalShowRegistrarService, Draft, FieldsUtils,
  FieldsPurger } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { Wizard } from './wizard.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confirmation } from './confirmation.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CaseView } from '../../core/cases/case-view.model';
import { WizardFactoryService } from '../../core/case-editor/wizard-factory.service';
import { CaseViewerComponent } from '../../cases/viewer/case-viewer.component';

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

  navigationOrigin: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fieldsUtils: FieldsUtils,
    private fieldsPurger: FieldsPurger,
    private registrarService: ConditionalShowRegistrarService,
    private wizardFactory: WizardFactoryService,
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

    this.route.queryParams.subscribe((params: Params) => {
      this.navigationOrigin = params[CaseViewerComponent.ORIGIN_QUERY_PARAM];
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

    let theQueryParams: Params = {};
    theQueryParams[CaseViewerComponent.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
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
    theQueryParams[CaseViewerComponent.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
    return this.router.navigate([previousPage.id], { queryParams: theQueryParams, relativeTo: this.route });
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
