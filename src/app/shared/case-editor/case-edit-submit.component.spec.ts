import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CaseEditSubmitComponent } from './case-edit-submit.component';
import { CaseFieldService } from '../domain/case-field.service';
import { FormValueService } from '../../core/form/form-value.service';
import { CaseEditComponent } from './case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { FormErrorService } from '../../core/form/form-error.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { WizardPage } from '../domain/wizard-page.model';
import { FieldsUtils } from '../utils/fields.utils';
import { IsCompoundPipe } from '../palette/utils/is-compound.pipe';
import createSpyObj = jasmine.createSpyObj;
import { CaseField } from '../domain/definition/case-field.model';
import { aCaseField, aWizardPage } from './case-edit.spec';
import { Wizard } from './wizard.model';
import { OrderService } from '../../core/order/order.service';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';

describe('CaseEditSubmitComponent', () => {
  let comp: CaseEditSubmitComponent;
  let fixture: ComponentFixture<CaseEditSubmitComponent>;
  let de: DebugElement;

  let formValueService: any;
  let formErrorService: any;
  let caseFieldService = new CaseFieldService();
  let fieldsUtils: FieldsUtils = new FieldsUtils();
  const FORM_GROUP = new FormGroup({
    'data': new FormGroup({'PersonLastName': new FormControl('Khaleesi')})
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
  let eventTrigger: CaseEventTrigger = new CaseEventTrigger();
  let caseField1: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', 3);
  let caseField2: CaseField = aCaseField('field2', 'field2', 'Text', 'OPTIONAL', 2);
  let caseField3: CaseField = aCaseField('field3', 'field3', 'Text', 'OPTIONAL', 1);

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

    caseEditComponent = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': {'case_fields': [caseField1, caseField2, caseField3]},
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
        IsCompoundPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: CaseEditComponent, useValue: caseEditComponent},
        {provide: FormValueService, useValue: formValueService},
        {provide: FormErrorService, useValue: formErrorService},
        {provide: CaseFieldService, useValue: caseFieldService},
        {provide: FieldsUtils, useValue: fieldsUtils},
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

    let result = comp.readOnlySummaryfieldsToDisplayExists();

    expect(result).toBeFalsy();
  });

  it('should return true when no Fields to Display exists and readOnlySummaryFieldsToDisplayExists is called', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL', null);
    caseField.show_summary_content_option = 3;
    comp.eventTrigger.case_fields = [caseField];

    let result = comp.readOnlySummaryfieldsToDisplayExists();

    expect(result).toBeTruthy();
  });

  it('should sort case fields with show_summary_content_option', () => {
    expect(comp.eventTrigger.case_fields[0].show_summary_content_option).toBe(3);
    expect(comp.eventTrigger.case_fields[1].show_summary_content_option).toBe(2);
    expect(comp.eventTrigger.case_fields[2].show_summary_content_option).toBe(1);
    expect(orderService.sort).toHaveBeenCalledWith(
      comp.eventTrigger.case_fields,
      CaseEditSubmitComponent.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION);
    expect(comp.sortedFields.length).toBe(3);
    expect(comp.sortedFields[0].show_summary_content_option).toBe(1);
    expect(comp.sortedFields[1].show_summary_content_option).toBe(2);
    expect(comp.sortedFields[2].show_summary_content_option).toBe(3);
  });
});
