import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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

  it('should navigate to next page when next is called', () => {
        component.wizard = wizard;
        wizard.nextPage.and.returnValue(new WizardPage());
        fixture.detectChanges();
        component.next('somePage');
        expect(wizard.nextPage).toHaveBeenCalled();
        expect(routerStub.navigate).toHaveBeenCalled();
    });

  it('should navigate to previous page when previous is called', () => {
        component.wizard = wizard;
        wizard.previousPage.and.returnValue(new WizardPage());
        fixture.detectChanges();
        component.previous('somePage');
        expect(wizard.previousPage).toHaveBeenCalled();
        expect(routerStub.navigate).toHaveBeenCalled();
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
