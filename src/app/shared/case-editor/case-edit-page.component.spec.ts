import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseEditPageComponent } from './case-edit-page.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { WizardPage } from '../domain/wizard-page.model';
import { CaseField } from '../domain/definition/case-field.model';
import { FormValueService } from '../../core/form/form-value.service';
import { FormErrorService } from '../../core/form/form-error.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { CaseFieldService } from '../domain/case-field.service';
import { aCaseField } from './case-edit.spec';
import createSpyObj = jasmine.createSpyObj;
import { CaseEventData } from '../domain/case-event-data';
import { Draft } from '../domain/draft';
import { CaseDetails } from '../domain/case-details';

describe('CaseEditPageComponent', () => {

  let comp: CaseEditPageComponent;
  let fixture: ComponentFixture<CaseEditPageComponent>;
  let de: DebugElement;
  let wizardPage: WizardPage;
  let readOnly = new CaseField();
  let formValueService: any;
  let formErrorService: any;
  let firstPage = new WizardPage();
  let caseFieldService = new CaseFieldService();
  const FORM_GROUP = new FormGroup({
    'data': new FormGroup({'PersonLastName': new FormControl('Khaleesi')})
  });
  const CASE_EVENT_DATA: CaseEventData = {
    event: {
      id: 'CreateCase',
      summary: 'Some Event Summary',
      description: 'Some Event Description'
    },
    data: FORM_GROUP,
    event_token: 'some_ugly_token_string',
    ignore_warning: true
  };
  const A_CASE: CaseDetails = {
    id: '1234567890123456',
    jurisdiction: 'Test',
    case_type_id: 'TestCase',
    state: 'CaseCreated'
  };
  let draft: Draft = {
    id: '1',
    document: A_CASE,
    type: 'typeA'
  };
  let someObservable = {
    'subscribe': () => new Draft()
  };

  let caseEditComponentStub: any;
  beforeEach(async(() => {
    firstPage.id = 'first page';
    caseEditComponentStub = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': {'case_fields': []},
      'hasPrevious': () => true,
      'getPage': () => firstPage,
      'next': () => true,
      'cancel': () => undefined,
      'validate': (caseEventData: CaseEventData) => Observable.of(caseEventData),
      'saveDraft': (caseEventData: CaseEventData) => Observable.of(someObservable),
    };

    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);
    formErrorService.mapFieldErrors.and.returnValue('Ok');
    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise', 'filterCurrentPageFields']);
    formValueService.sanitise.and.returnValue(CASE_EVENT_DATA);
    spyOn(caseEditComponentStub, 'cancel');
    TestBed.configureTestingModule({
      declarations: [CaseEditPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: FormValueService, useValue: formValueService},
        {provide: FormErrorService, useValue: formErrorService},
        {provide: CaseEditComponent, useValue: caseEditComponentStub},
        {provide: CaseFieldService, useValue: caseFieldService},
        {provide: ActivatedRoute, useValue: {params: Observable.of({id: 123})}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEditPageComponent);
    comp = fixture.componentInstance;
    readOnly.display_context = 'READONLY';
    const FIELDS: CaseField[] = [readOnly];
    wizardPage = new WizardPage();
    wizardPage.case_fields = FIELDS;
    wizardPage.getCol1Fields = () => FIELDS;
    wizardPage.getCol2Fields = () => FIELDS;
  });

  it('should display a page with two columns when wizard page is multicolumn', () => {
    wizardPage.isMultiColumn = () => true;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#caseEditForm'));
    expect(de).toBeNull();
    de = fixture.debugElement.query(By.css('#caseEditForm1'));
    expect(de.nativeElement.textContent).toBeDefined();
    de = fixture.debugElement.query(By.css('#caseEditForm2'));
    expect(de.nativeElement.textContent).toBeDefined();
  });

  it('should display a page with one column when wizard page is not multicolumn', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('#caseEditForm'));
    expect(de.nativeElement.textContent).toBeDefined();
    de = fixture.debugElement.query(By.css('#caseEditForm1'));
    expect(de).toBeNull();
    de = fixture.debugElement.query(By.css('#caseEditForm2'));
    expect(de).toBeNull();
  });

  it('should init to the provided first page in event trigger', () => {
    comp.ngOnInit();
    expect(comp.currentPage).toEqual(firstPage);
  });

  it('should return true on hasPrevious check', () => {
    let errorContext = {
      'ignore_warning': true,
      'trigger_text': 'Some error!'
    };
    comp.callbackErrorsNotify(errorContext);
    expect(comp.ignoreWarning).toBeTruthy();
    expect(comp.triggerText).toEqual('Some error!');
  });

  it('should delegate cancel calls to caseEditComponent', () => {
    comp.cancel();
    expect(caseEditComponentStub.cancel).toHaveBeenCalled();
  });

  it('should allow empty values when field is OPTIONAL', () => {
    wizardPage.case_fields.push(aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null));
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    expect(comp.currentPageIsNotValid()).toBeFalsy();
  });

  it('should allow empty document fields when OPTIONAL', () => {
    wizardPage.case_fields.push(aCaseField('field1', 'field1', 'Document', 'OPTIONAL', null));
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    expect(comp.currentPageIsNotValid()).toBeFalsy();
  });

  it('should not allow empty document fields when MANDATORY', () => {
    wizardPage.case_fields.push(aCaseField('field1', 'field1', 'Document', 'MANDATORY', null));
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    expect(comp.currentPageIsNotValid()).toBeTruthy();
  });

  it('should submit', () => {
    wizardPage.isMultiColumn = () => false;
    comp.currentPage = wizardPage;
    fixture.detectChanges();
    comp.submit();
    expect(formValueService.filterCurrentPageFields).toHaveBeenCalled();
    expect(formValueService.sanitise).toHaveBeenCalled();
  });
});
