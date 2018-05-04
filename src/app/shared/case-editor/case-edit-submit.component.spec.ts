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
import { CaseField } from '../domain/definition/case-field.model';
import { aCaseField, aWizardPage } from './case-edit.spec';
import { Wizard } from './wizard.model';
import { By } from '@angular/platform-browser';
import createSpyObj = jasmine.createSpyObj;

describe('CaseEditSubmitComponent', () => {
  let comp: CaseEditSubmitComponent;
  let fixture: ComponentFixture<CaseEditSubmitComponent>;
  let de: DebugElement;

  let END_BUTTON_LABEL = 'Go now!';
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
    caseEditComponent = {
      'form': FORM_GROUP,
      'data': '',
      'eventTrigger': { 'case_fields': [], 'end_button_label': END_BUTTON_LABEL },
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
        { provide: CaseEditComponent, useValue: caseEditComponent },
        { provide: FormValueService, useValue: formValueService },
        { provide: FormErrorService, useValue: formErrorService },
        { provide: CaseFieldService, useValue: caseFieldService },
        { provide: FieldsUtils, useValue: fieldsUtils },
        { provide: ActivatedRoute, useValue: mockRoute }
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
    let changeAllowed = comp.isChangeAllowed(aCaseField('field1', 'field1', 'Text', 'READONLY'));
    expect(changeAllowed).toBeFalsy();
  });

  it('should allow changes for non READONLY fields', () => {
    let changeAllowed = comp.isChangeAllowed(aCaseField('field1', 'field1', 'Text', 'OPTIONAL'));
    expect(changeAllowed).toBeTruthy();
  });

  it('should return TRUE for canShowField when caseField show_summary_change_option is TRUE', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL');
    caseField.show_summary_change_option = true;
    let canShow = comp.canShowField(caseField);
    expect(canShow).toBeTruthy();
  });

  it('should return FALSE for canShowField when caseField show_summary_change_option is FALSE', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL');
    caseField.show_summary_change_option = false;
    let canShow = comp.canShowField(caseField);
    expect(canShow).toBeFalsy();
  });

  it('should return lastPageShown', () => {
    spyOn(comp, 'navigateToPage').and.callThrough();

    comp.previous();

    expect(comp.navigateToPage).toHaveBeenCalled();
    expect(caseEditComponent.navigateToPage).toHaveBeenCalled();
  });

  it('should return false when no field exists and fieldsToDisplayExists is called', () => {
    let result = comp.fieldsToDisplayExists();

    expect(result).toBeFalsy();
  });

  it('should return true when no Fields to Display exists and fieldsToDisplayExists is called', () => {
    let caseField: CaseField = aCaseField('field1', 'field1', 'Text', 'OPTIONAL');
    caseField.show_summary_change_option = true;
    comp.wizard.pages[0].case_fields = [caseField];
    comp.eventTrigger.show_summary = true;

    let result = comp.fieldsToDisplayExists();

    expect(result).toBeTruthy();
  });

});

describe('CaseEditSubmitComponent without custom end button label', () => {
  let comp: CaseEditSubmitComponent;
  let fixture: ComponentFixture<CaseEditSubmitComponent>;
  let de: DebugElement;

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
  ];
  let firstPage = pages[0];
  let wizard: Wizard = new Wizard(pages);

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
        IsCompoundPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CaseEditComponent, useValue: caseEditComponent },
        { provide: FormValueService, useValue: formValueService },
        { provide: FormErrorService, useValue: formErrorService },
        { provide: CaseFieldService, useValue: caseFieldService },
        { provide: FieldsUtils, useValue: fieldsUtils },
        { provide: ActivatedRoute, useValue: mockRoute }
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
