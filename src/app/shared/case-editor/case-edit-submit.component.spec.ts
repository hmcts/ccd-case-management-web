import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CaseEditSubmitComponent } from './case-edit-submit.component';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import createSpyObj = jasmine.createSpyObj;
import { CaseFieldService, CaseReferencePipe, CaseEventTrigger, aCaseField, CaseField,
  IsCompoundPipe, FieldsUtils, WizardPage, FormErrorService, FormValueService, OrderService, Wizard } from '@hmcts/ccd-case-ui-toolkit';
import { aWizardPage } from './case-edit.spec';

describe('CaseEditSubmitComponent', () => {
  let comp: CaseEditSubmitComponent;
  let fixture: ComponentFixture<CaseEditSubmitComponent>;
  let de: DebugElement;

  const END_BUTTON_LABEL = 'Go now!';
  let formValueService: any;
  let formErrorService: any;
  let caseFieldService = new CaseFieldService();
  let fieldsUtils: FieldsUtils = new FieldsUtils();
  const FORM_GROUP = new FormGroup({
    'data': new FormGroup({ 'PersonLastName': new FormControl('Khaleesi') })
  });
  let caseEditComponent: any;
  let pages: WizardPage[] = [
    aWizardPage('page1', 'Page 1', 1),
    aWizardPage('page2', 'Page 2', 2),
    aWizardPage('page3', 'Page 3', 3)
  ];
  let firstPage = pages[0];
  let wizard: Wizard = new Wizard(pages);
  let orderService;
  let casesReferencePipe: any;
  let eventTrigger: CaseEventTrigger = new CaseEventTrigger();
  let caseField1: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', 3);
  let caseField2: CaseField = aCaseField('field2', 'field2', 'Text', 'OPTIONAL', 2);
  let caseField3: CaseField = aCaseField('field3', 'field3', 'Text', 'OPTIONAL', 1);
  const $EVENT_NOTES = By.css('#fieldset-event');

  let mockRoute: any = {
    snapshot: {
      data: {},
      params: {},
      pathFromRoot: [
        {},
        {
          data: {
            profile: {
              user: {
                idam: {
                  id: 'userId',
                  email: 'string',
                  forename: 'string',
                  surname: 'string',
                  roles: ['caseworker', 'caseworker-test', 'caseworker-probate-solicitor']
                }
              },
              'isSolicitor': () => false,
            }
          }
        }
      ]
    },
    params: Observable.of({})
  };

  beforeEach(async(() => {
    orderService = new OrderService();
    spyOn(orderService, 'sort').and.callThrough();

    casesReferencePipe = createSpyObj<CaseReferencePipe>('caseReference', ['transform']);

    caseEditComponent = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': {'case_fields': [caseField1, caseField2, caseField3], 'end_button_label': END_BUTTON_LABEL},
      'wizard': wizard,
      'hasPrevious': () => true,
      'getPage': () => firstPage,
      'navigateToPage': () => undefined,
      'cancel': () => undefined
    };
    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);
    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise']);

    spyOn(caseEditComponent, 'navigateToPage');
    spyOn(caseEditComponent, 'cancel');

    TestBed.configureTestingModule({
      declarations: [
        CaseEditSubmitComponent,
        IsCompoundPipe,
        CaseReferencePipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: CaseEditComponent, useValue: caseEditComponent},
        {provide: FormValueService, useValue: formValueService},
        {provide: FormErrorService, useValue: formErrorService},
        {provide: CaseFieldService, useValue: caseFieldService},
        {provide: FieldsUtils, useValue: fieldsUtils},
        {provide: CaseReferencePipe, useValue: casesReferencePipe},
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: OrderService, useValue: orderService}
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEditSubmitComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('must render correct button label', () => {
    let buttons = de.queryAll(By.css('div>button'));
    expect(buttons[1].nativeElement.textContent.trim()).toEqual(END_BUTTON_LABEL);
  });

  it('should delegate navigateToPage calls to caseEditComponent', () => {
    comp.navigateToPage('somePage');
    expect(caseEditComponent.navigateToPage).toHaveBeenCalled();
  });

  it('should delegate cancel calls to caseEditComponent', () => {
    comp.cancel();
    expect(caseEditComponent.cancel).toHaveBeenCalled();
  });

  it('should not allow changes for READONLY fields', () => {
    let changeAllowed = comp.isChangeAllowed(aCaseField('field1', 'field1', 'Text', 'READONLY', null));
    expect(changeAllowed).toBeFalsy();
  });

  it('should allow changes for non READONLY fields', () => {
    let changeAllowed = comp.isChangeAllowed(aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null));
    expect(changeAllowed).toBeTruthy();
  });

  it('should return TRUE for canShowFieldInCYA when caseField show_summary_change_option is TRUE', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_change_option = true;
    let canShow = comp.canShowFieldInCYA(caseField);
    expect(canShow).toBeTruthy();
  });

  it('should return FALSE for canShowFieldInCYA when caseField show_summary_change_option is FALSE', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_change_option = false;
    let canShow = comp.canShowFieldInCYA(caseField);
    expect(canShow).toBeFalsy();
  });

  it('should return lastPageShown', () => {
    spyOn(comp, 'navigateToPage').and.callThrough();

    comp.previous();

    expect(comp.navigateToPage).toHaveBeenCalled();
    expect(caseEditComponent.navigateToPage).toHaveBeenCalled();
  });

  it('should return false when no field exists and checkYourAnswerFieldsToDisplayExists is called', () => {
    let result = comp.checkYourAnswerFieldsToDisplayExists();

    expect(result).toBeFalsy();
  });

  it('should return true when no Fields to Display exists and checkYourAnswerFieldsToDisplayExists is called', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_change_option = true;
    comp.wizard.pages[0].case_fields = [caseField];
    comp.eventTrigger.show_summary = true;

    let result = comp.checkYourAnswerFieldsToDisplayExists();
    expect(result).toBeTruthy();
  });

  it('should return false when no field exists and readOnlySummaryFieldsToDisplayExists is called', () => {
    comp.eventTrigger.case_fields = [];
    fixture.detectChanges();

    let result = comp.readOnlySummaryFieldsToDisplayExists();

    expect(result).toBeFalsy();
  });

  it('should return true when no Fields to Display exists and readOnlySummaryFieldsToDisplayExists is called', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_content_option = 3;
    comp.eventTrigger.case_fields = [caseField];

    let result = comp.readOnlySummaryFieldsToDisplayExists();

    expect(result).toBeTruthy();
  });

  it('should show event notes when set in event trigger and showEventNotes is called', () => {
    comp.eventTrigger.show_event_notes = true;
    fixture.detectChanges();
    let eventNotes = de.query($EVENT_NOTES);

    let result = comp.showEventNotes();

    expect(result).toBeTruthy();
    expect(eventNotes).not.toBeNull();
  });

  it('should show event notes when not set in event trigger and showEventNotes is called', () => {
    comp.eventTrigger.show_event_notes = null;
    fixture.detectChanges();
    let eventNotes = de.query($EVENT_NOTES);

    let result = comp.showEventNotes();

    expect(result).toBeTruthy();
    expect(eventNotes).not.toBeNull();
  });

  it('should show event notes when not defined in event trigger and showEventNotes is called', () => {
    comp.eventTrigger.show_event_notes = undefined;
    fixture.detectChanges();
    let eventNotes = de.query($EVENT_NOTES);

    let result = comp.showEventNotes();

    expect(result).toBeTruthy();
    expect(eventNotes).not.toBeNull();
  });

  it('should not show event notes when set to false in event trigger and showEventNotes is called', () => {
    comp.eventTrigger.show_event_notes = false;
    fixture.detectChanges();
    let eventNotes = de.query($EVENT_NOTES);

    let result = comp.showEventNotes();

    expect(result).toBeFalsy();
    expect(eventNotes).toBeNull();
  });

  it('should return false when no field exists and readOnlySummaryFieldsToDisplayExists is called', () => {
    comp.eventTrigger.case_fields = [];
    fixture.detectChanges();

    let result = comp.readOnlySummaryFieldsToDisplayExists();

    expect(result).toBeFalsy();
  });

  it('should return true when no Fields to Display exists and readOnlySummaryFieldsToDisplayExists is called', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_content_option = 3;
    comp.eventTrigger.case_fields = [caseField];

    let result = comp.readOnlySummaryFieldsToDisplayExists();

    expect(result).toBeTruthy();
  });

  it('should sort case fields with show_summary_content_option', () => {
    expect(comp.eventTrigger.case_fields[0].show_summary_content_option).toBe(3);
    expect(comp.eventTrigger.case_fields[1].show_summary_content_option).toBe(2);
    expect(comp.eventTrigger.case_fields[2].show_summary_content_option).toBe(1);
    expect(orderService.sort).toHaveBeenCalledWith(
      comp.eventTrigger.case_fields,
      CaseEditSubmitComponent.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION);
    expect(comp.showSummaryFields.length).toBe(3);
    expect(comp.showSummaryFields[0].show_summary_content_option).toBe(1);
    expect(comp.showSummaryFields[1].show_summary_content_option).toBe(2);
    expect(comp.showSummaryFields[2].show_summary_content_option).toBe(3);
  });
});

describe('CaseEditSubmitComponent without custom end button label', () => {
  let comp: CaseEditSubmitComponent;
  let fixture: ComponentFixture<CaseEditSubmitComponent>;
  let de: DebugElement;

  let formValueService: any;
  let formErrorService: any;
  let casesReferencePipe: any;
  let caseFieldService = new CaseFieldService();
  let fieldsUtils: FieldsUtils = new FieldsUtils();

  const FORM_GROUP = new FormGroup({
    'data': new FormGroup({ 'PersonLastName': new FormControl('Khaleesi') })
  });
  let caseEditComponent: any;
  let pages: WizardPage[] = [
    aWizardPage('page1', 'Page 1', 1),
  ];
  let firstPage = pages[0];
  let wizard: Wizard = new Wizard(pages);
  let orderService;

  let mockRoute: any = {
    snapshot: {
      data: {},
      params: {},
      pathFromRoot: [
        {},
        {
          data: {
            profile: {
              user: {
                idam: {
                  id: 'userId',
                  email: 'string',
                  forename: 'string',
                  surname: 'string',
                  roles: ['caseworker', 'caseworker-test', 'caseworker-probate-solicitor']
                }
              },
              'isSolicitor': () => false,
            }
          }
        }
      ]
    },
    params: Observable.of({})
  };

  beforeEach(async(() => {
    orderService = new OrderService();
    spyOn(orderService, 'sort').and.callThrough();
    casesReferencePipe = createSpyObj<CaseReferencePipe>('caseReference', ['transform']);
    caseEditComponent = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': { 'case_fields': [] },
      'wizard': wizard,
      'hasPrevious': () => true,
      'getPage': () => firstPage,
      'navigateToPage': () => undefined,
      'cancel': () => undefined
    };
    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);
    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise']);

    spyOn(caseEditComponent, 'navigateToPage');
    spyOn(caseEditComponent, 'cancel');

    TestBed.configureTestingModule({
      declarations: [
        CaseEditSubmitComponent,
        IsCompoundPipe,
        CaseReferencePipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CaseEditComponent, useValue: caseEditComponent },
        { provide: FormValueService, useValue: formValueService },
        { provide: FormErrorService, useValue: formErrorService },
        { provide: CaseFieldService, useValue: caseFieldService },
        { provide: FieldsUtils, useValue: fieldsUtils },
        { provide: CaseReferencePipe, useValue: casesReferencePipe },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: OrderService, useValue: orderService }
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEditSubmitComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('must render default button label when custom one is not supplied', () => {
    let buttons = de.queryAll(By.css('div>button'));
    expect(buttons[1].nativeElement.textContent.trim()).toEqual('Submit');
  });
});
