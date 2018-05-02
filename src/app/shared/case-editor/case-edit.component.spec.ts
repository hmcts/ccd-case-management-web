import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { CaseEventTrigger } from '../domain/case-view/case-event-trigger.model';
import { PaletteUtilsModule } from '../palette/utils/utils.module';
import { CaseEditComponent } from './case-edit.component';
import { FormValueService } from '../../core/form/form-value.service';
import { FormErrorService } from '../../core/form/form-error.service';
import { ConditionalShowDirective } from '../conditional-show/conditional-show.directive';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FieldsUtils } from '../utils/fields.utils';
import { Wizard } from './wizard.model';
import { Router } from '@angular/router';
import { WizardPage } from '../domain/wizard-page.model';
import createSpyObj = jasmine.createSpyObj;
import { WizardPageField } from '../domain/wizard-page-field.model';
import { CaseField } from '../domain/definition/case-field.model';

describe('CaseEditComponent', () => {

  const EVENT_TOKEN = 'test-token';
  const EVENT_TRIGGER: CaseEventTrigger = {
    id: 'TEST_TRIGGER',
    name: 'Test Trigger',
    description: 'This is a test trigger',
    case_fields: [
      {
        id: 'PersonFirstName',
        label: 'First name',
        field_type: null,
        display_context: 'READONLY'
      },
      {
        id: 'PersonLastName',
        label: 'Last name',
        field_type: null,
        display_context: 'OPTIONAL'
      }
    ],
    wizard_pages: [],
    event_token: EVENT_TOKEN
  };

  const WIZARD_PAGE_FIELD: WizardPageField = {
    case_field_id: 'PersonFirstName'
  };

  const CASE_FIELD: CaseField = {
    id: 'PersonFirstName',
    label: 'First name',
    field_type: null,
    display_context: 'READONLY',
    show_condition: 'PersonLastName=\"Smith\"',
    value: 'Robert'
  };

  const CASE_FIELD_2: CaseField = {
    id: 'PersonLastName',
    label: 'First name',
    field_type: null,
    display_context: 'READONLY'
  };

  let fixture: ComponentFixture<CaseEditComponent>;
  let component: CaseEditComponent;
  let de: DebugElement;

  let EventTriggerHeaderComponent: any = MockComponent({
    selector: 'ccd-event-trigger-header',
    inputs: ['eventTrigger']
  });

  let FieldRead: any = MockComponent({
    selector: 'ccd-field-read',
    inputs: ['caseField']
  });

  let FieldWrite: any = MockComponent({
    selector: 'ccd-field-write',
    inputs: ['caseField', 'formGroup', 'idPrefix']
  });

  const RouterLinkComponent: any = MockComponent({
    selector: 'a',
    inputs: ['routerLink']
  });

  let cancelHandler: any;
  let submitHandler: any;
  let formErrorService: any;
  let formValueService: any;
  let callbackErrorsSubject: any;
  let wizard: any;
  let routerStub: any;
  let fieldsUtils = new FieldsUtils();

  routerStub = {
    navigate: jasmine.createSpy('navigate'),
    routerState: {}
  };

  beforeEach(async(() => {
    cancelHandler = createSpyObj('cancelHandler', ['applyFilters']);
    cancelHandler.applyFilters.and.returnValue();

    submitHandler = createSpyObj('submitHandler', ['applyFilters']);
    submitHandler.applyFilters.and.returnValue();

    callbackErrorsSubject = createSpyObj('callbackErrorsSubject', ['next']);
    wizard = createSpyObj<Wizard>('wizard', ['getPage', 'firstPage', 'nextPage', 'previousPage', 'hasPreviousPage']);

    formErrorService = createSpyObj<FormErrorService>('formErrorService', ['mapFieldErrors']);

    formValueService = createSpyObj<FormValueService>('formValueService', ['sanitise']);

    TestBed
      .configureTestingModule({
        imports: [
          ReactiveFormsModule,
          PaletteUtilsModule,
          RouterTestingModule
        ],
        declarations: [
          CaseEditComponent,
          // CallbackErrorsComponent,
          ConditionalShowDirective,

          // Mock
          EventTriggerHeaderComponent,
          RouterLinkComponent,
          FieldRead,
          FieldWrite
        ],
        providers: [
          { provide: FormErrorService, useValue: formErrorService },
          { provide: FormValueService, useValue: formValueService },
          { provide: FieldsUtils, useValue: fieldsUtils },
          { provide: Router, useValue: routerStub }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseEditComponent);
    component = fixture.componentInstance;
    component.wizard = wizard;
    component.eventTrigger = EVENT_TRIGGER;
    component.cancelled.subscribe(cancelHandler.applyFilters);
    component.submitted.subscribe(submitHandler.applyFilters);
    // component.errorsSubject = errorSubject;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  beforeEach(() => {
  });

  it('should render an event trigger header', () => {
    let header = de.query(By.directive(EventTriggerHeaderComponent));
    expect(header).toBeTruthy();
    expect(header.componentInstance.eventTrigger).toEqual(EVENT_TRIGGER);
  });

  it('should return true for hasPrevious', () => {
    component.wizard = wizard;
    wizard.hasPreviousPage.and.returnValue(true);
    fixture.detectChanges();
    expect(component.hasPrevious('last')).toBeTruthy();
    expect(wizard.hasPreviousPage).toHaveBeenCalled();
  });

  it('should navigate to first page when first is called', () => {
    component.wizard = wizard;
    wizard.firstPage.and.returnValue(new WizardPage());
    fixture.detectChanges();
    component.first();
    expect(wizard.firstPage).toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  describe('next page', () => {

    it('should navigate to next page when next is called and do not clear visible field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.nextPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormControl('John'),
            PersonLastName: new FormControl('Smith')
          })
        });
      fixture.detectChanges();

      component.next('somePage');

      expect(wizard.nextPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.form.get('data').get('PersonFirstName').value).toBe('John');
    });

    it('should navigate to next page when next is called and clear hidden simple form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.nextPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormControl('John'),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.next('somePage');

      expect(wizard.nextPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.form.get('data').get('PersonFirstName').value).toBeNull();
    });

    it('should navigate to next page when next is called and clear hidden complex form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.nextPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormGroup({PersonMiddleName: new FormControl('John')}),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.next('somePage');

      expect(wizard.nextPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(JSON.stringify(component.form.get('data').get('PersonFirstName').value)).toBe(JSON.stringify({ PersonMiddleName: null }));
    });

    it('should navigate to next page when next is called and clear hidden collection form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.nextPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormArray([new FormGroup({PersonMiddleName: new FormControl('John')})]),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.next('somePage');

      expect(wizard.nextPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(JSON.stringify(component.form.get('data').get('PersonFirstName').value)).toBe(JSON.stringify([ { PersonMiddleName: null } ]));
    });
  });

  describe('previous page', () => {

    it('should navigate to previous page when previous is called and do not clear visible field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.previousPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormControl('John'),
            PersonLastName: new FormControl('Smith')
          })
        });
      fixture.detectChanges();

      component.previous('somePage');

      expect(wizard.previousPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.form.get('data').get('PersonFirstName').value).toBe('John');
    });

    it('should navigate to previous page when previous is called and clear hidden simple form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.previousPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormControl('John'),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.previous('somePage');

      expect(wizard.previousPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.form.get('data').get('PersonFirstName').value).toBeNull();
    });

    it('should navigate to previous page when next is called and clear hidden complex form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.previousPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormGroup({PersonMiddleName: new FormControl('John')}),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.previous('somePage');

      expect(wizard.previousPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(JSON.stringify(component.form.get('data').get('PersonFirstName').value)).toBe(JSON.stringify({ PersonMiddleName: null }));
    });

    it('should navigate to previous page when next is called and clear hidden collection form field', () => {
      component.wizard = wizard;
      let currentPage = new WizardPage();
      currentPage.wizard_page_fields = [WIZARD_PAGE_FIELD];
      currentPage.case_fields = [CASE_FIELD, CASE_FIELD_2];
      wizard.getPage.and.returnValue(currentPage);
      wizard.previousPage.and.returnValue(new WizardPage());
      component.form = new FormGroup({
        data : new FormGroup({
            PersonFirstName: new FormArray([new FormGroup({PersonMiddleName: new FormControl('John')})]),
            PersonLastName: new FormControl('Other')
          })
        });
      fixture.detectChanges();

      component.previous('somePage');

      expect(wizard.previousPage).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(JSON.stringify(component.form.get('data').get('PersonFirstName').value)).toBe(JSON.stringify([ { PersonMiddleName: null } ]));
    });
  });

  it('should navigate to the page when navigateToPage is called', () => {
    component.wizard = wizard;
    wizard.getPage.and.returnValue(new WizardPage());
    fixture.detectChanges();
    component.navigateToPage('somePage');
    expect(wizard.getPage).toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel is called', () => {
    component.cancel();
    expect(cancelHandler.applyFilters).toHaveBeenCalled();
  });
});
