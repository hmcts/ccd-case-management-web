import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import { Observable } from 'rxjs';
import { CaseTypeLite, Jurisdiction, CaseEvent, JurisdictionService, OrderService, AlertService,
  CallbackErrorsContext, Banner } from '@hmcts/ccd-case-ui-toolkit';
import { CaseCreatorComponent } from './case-creator.component';
import { CaseViewerComponent, CreateCaseFiltersSelection } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components';
import { text } from '../../test/helpers';
import { AppConfig } from '../../app.config';

const EVENT_ID_1 = 'ID_1';
const EVENT_NAME_1 = 'Event one';
const EVENT_ID_2 = 'ID_2';
const EVENT_NAME_2 = 'Event two';
const EVENT_ID_3 = 'ID_3';
const EVENT_NAME_3 = 'Event three';

const CASE_TYPES_1: CaseTypeLite[] = [
    {
      id: 'CT0',
      name: 'Case type 0',
      description: '',
      states: [],
      events: [
        { id: EVENT_ID_1,
          name: EVENT_NAME_1,
          post_state: 'state_1',
          pre_states: [],
          case_fields: [],
          description: 'description_1',
          order: 1
        },
        { id: EVENT_ID_2,
          name: EVENT_NAME_2,
          post_state: 'state_2',
          pre_states: ['pre_state_1', 'pre_state_2'],
          case_fields: [],
          description: 'description_2',
          order: 2
        },
        { id: EVENT_ID_3,
          name: EVENT_NAME_3,
          post_state: 'state_3',
          pre_states: [],
          case_fields: [],
          description: 'description_3',
          order: 3
        }
      ],
    }
];

const BANNERS: Banner[] = [
  {
    bannerDescription: 'Test Banner Description',
    bannerEnabled: true,
    bannerUrl: 'http://localhost:3451/test',
    bannerUrlText: 'click here to see it.>>>',
    bannerViewed: false
  }
];

const JURISDICTION_1: Jurisdiction = {
  id: 'J1',
  name: 'Jurisdiction 1',
  description: '',
  caseTypes: CASE_TYPES_1
};

const CASE_TYPES_2: CaseTypeLite[] = [
  {
    id: 'CT1',
    name: 'Case type 1',
    description: '',
    states: [],
    events: [
      { id: EVENT_ID_1,
        name: EVENT_NAME_1,
        post_state: 'state_1',
        pre_states: [],
        case_fields: [],
        description: 'description_1',
        order: 1
      },
      { id: EVENT_ID_2,
        name: EVENT_NAME_2,
        post_state: 'state_2',
        pre_states: ['pre_state_1', 'pre_state_2'],
        case_fields: [],
        description: 'description_2',
        order: 2
      },
      { id: EVENT_ID_3,
        name: EVENT_NAME_3,
        post_state: 'state_3',
        pre_states: [],
        case_fields: [],
        description: 'description_3',
        order: 3
      }
    ],
  },
  {
    id: 'CT2',
    name: 'Case type 2',
    description: '',
    states: [
      {
        id: 'S1',
        name: 'State 1',
        description: ''
      },
      {
        id: 'S2',
        name: 'State 2',
        description: ''
      }
    ],
    events: [],
  },
  {
    id: 'CT3',
    name: 'Case type 3',
    description: '',
    states: [],
    events: [
    {   id: EVENT_ID_1,
        name: EVENT_NAME_1,
        post_state: 'state_1',
        pre_states: [],
        case_fields: [],
        description: 'description_1',
        order: 1
      }
    ],
  }
];

const BANNERS_2: Banner[] = [
  {
    bannerDescription: 'Test Banner Description',
    bannerEnabled: true,
    bannerUrl: 'http://localhost:3451/test',
    bannerUrlText: 'click here to see it.>>>',
    bannerViewed: false
  }
];

const JURISDICTION_2: Jurisdiction = {
  id: 'J2',
  name: 'Jurisdiction 2',
  description: '',
  caseTypes: CASE_TYPES_2
};

const SINGLE_EVENT: CaseEvent[] = [{
  id: EVENT_ID_1,
  name: EVENT_NAME_1,
  post_state: 'state_1',
  pre_states: [],
  case_fields: [],
  description: 'description_1',
  order: 1
}];

const CASE_TYPES_SINGLE_EVENT: CaseTypeLite[] = [
  {
    id: 'CT0',
    name: 'Case type 0',
    description: '',
    states: [],
    events: [...SINGLE_EVENT],
  }
];

const BANNERS_3: Banner[] = [
  {
    bannerDescription: 'Test Banner Description',
    bannerEnabled: true,
    bannerUrl: 'http://localhost:3451/test',
    bannerUrlText: 'click here to see it.>>>',
    bannerViewed: false
  }
];

const JURISDICTION_SINGLE_EVENT: Jurisdiction = {
  id: 'J2',
  name: 'Jurisdiction 2',
  description: '',
  caseTypes: CASE_TYPES_SINGLE_EVENT
};

const CASE_TYPE: CaseTypeLite = {
  id: 'CT3',
  name: 'Complex Address Book Case',
  events: [
    { id: EVENT_ID_1,
      name: EVENT_NAME_1,
      post_state: 'state_1',
      pre_states: [],
      case_fields: [],
      description: 'description_1',
      order: 1
    },
    { id: EVENT_ID_2,
      name: EVENT_NAME_2,
      post_state: 'state_2',
      pre_states: ['pre_state_1', 'pre_state_2'],
      case_fields: [],
      description: 'description_2',
      order: 2
    },
    { id: EVENT_ID_3,
      name: EVENT_NAME_3,
      post_state: 'state_3',
      pre_states: [],
      case_fields: [],
      description: 'description_3',
      order: 3
    }
  ],
  states: [],
  description: 'Complex Address Book Case',
};

const CASE_EVENTS_NO_PRE_STATES: CaseEvent[] = [
  { id: EVENT_ID_1,
    name: EVENT_NAME_1,
    post_state: 'state_1',
    pre_states: [],
    case_fields: [],
    description: 'description_1',
    order: 1
  },
  { id: EVENT_ID_3,
    name: EVENT_NAME_3,
    post_state: 'state_3',
    pre_states: [],
    case_fields: [],
    description: 'description_3',
    order: 3
  }
];

const SORTED_CASE_EVENTS: CaseEvent[] = [...CASE_EVENTS_NO_PRE_STATES];

@Component({
  selector: 'ccd-callback-errors',
  template: ``
})
class CallbackErrorsComponent {

  @Input()
  triggerTextIgnore: string;
  @Input()
  triggerTextContinue: string;
  @Input()
  callbackErrorsSubject: Subject<any> = new Subject();
  @Output()
  callbackErrorsContext: EventEmitter<any> = new EventEmitter();

}

let mockRouter: any;
let mockOrderService: any;
let mockCallbackErrorSubject: any;
let mockAlertService: any;

describe('CaseCreatorComponent', () => {

  let fixture: ComponentFixture<CaseCreatorComponent>;
  let component: CaseCreatorComponent;
  let de: DebugElement;

  const $ERROR_HEADER = By.css('.error-summary-heading');
  const $ERROR_SUMMARY = By.css('.error-summary');
  const $ERROR_MESSAGE = By.css('p');
  const $ERROR_FIELD_MESSAGES = By.css('ul');

  beforeEach(async(() => {
    mockOrderService = createSpyObj<OrderService>('orderService', ['sort']);
    mockOrderService.sort.and.returnValue(SORTED_CASE_EVENTS);
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));
    mockCallbackErrorSubject = createSpyObj<any>('callbackErrorSubject', ['next']);
    mockAlertService = createSpyObj<AlertService>('alertService', ['clear']);
    TestBed
      .configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule
        ],
        declarations: [
          CaseCreatorComponent,
          CallbackErrorsComponent
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: OrderService, useValue: mockOrderService },
          { provide: AlertService, useValue: mockAlertService },
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseCreatorComponent);
    component = fixture.componentInstance;
    component.callbackErrorsSubject = mockCallbackErrorSubject;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should load create case page when apply triggered', async(() => {
    const request: CreateCaseFiltersSelection = {
      jurisdictionId: JURISDICTION_2.id,
      caseTypeId: CASE_TYPES_2[2].id,
      eventId: EVENT_ID_2
    };

    component.apply(request);
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/create/case', JURISDICTION_2.id, CASE_TYPES_2[2].id, EVENT_ID_2],
      { queryParams: {}});

  }));

  it('should clear errors and warnings', () => {
    let callbackErrorsContext: CallbackErrorsContext = new CallbackErrorsContext();
    callbackErrorsContext.trigger_text = CaseViewerComponent.TRIGGER_TEXT_START;
    component.callbackErrorsNotify(callbackErrorsContext);

    fixture.detectChanges();
    component.resetErrors();

    let error = de.query($ERROR_SUMMARY);
    expect(error).toBeFalsy();
    expect(component.error).toBeFalsy();
    expect(component.ignoreWarning).toBeFalsy();
  });

  it('should notify user about errors/warnings when fields selected and button clicked and response with callback errors/warnings', () => {
    const VALID_ERROR = {
      error: 'Error heading',
      callbackErrors: ['error1', 'error2'],
      callbackWarnings: ['warning1', 'warning2']
    };
    mockRouter.navigate.and.returnValue({ catch : (error) => error(VALID_ERROR)});

    const request: CreateCaseFiltersSelection = {
      jurisdictionId: JURISDICTION_2.id,
      caseTypeId: CASE_TYPES_2[2].id,
      eventId: EVENT_ID_2
    };

    component.apply(request);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/create/case', JURISDICTION_2.id, CASE_TYPES_2[2].id, EVENT_ID_2],
      { queryParams: {}});
    expect(mockCallbackErrorSubject.next).toHaveBeenCalledWith(VALID_ERROR);
  });

  it('should notify user about field validation errors when response with field validation errors', () => {
    const FIELD_ERRORS = [
      {
        message: 'This field1 failed validation'
      },
      {
        message: 'This field2 failed validation'
      }
    ];
    const VALID_ERROR = {
      error: 'Field error',
      message: 'Field validation failed',
      details: {
        field_errors: FIELD_ERRORS
      }
    };
    mockRouter.navigate.and.returnValue({ catch : (error) => error(VALID_ERROR)});

    const request: CreateCaseFiltersSelection = {
      jurisdictionId: JURISDICTION_2.id,
      caseTypeId: CASE_TYPES_2[2].id,
      eventId: EVENT_ID_2
    };

    component.apply(request);
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/create/case', JURISDICTION_2.id, CASE_TYPES_2[2].id, EVENT_ID_2],
      { queryParams: {}});
    expect(mockCallbackErrorSubject.next).toHaveBeenCalledWith(VALID_ERROR);

    let errorElement = de.query($ERROR_SUMMARY);
    expect(errorElement).toBeTruthy();
    let errorHeader = errorElement.query($ERROR_HEADER);
    let errorMessage = errorElement.query($ERROR_MESSAGE);
    expect(text(errorHeader)).toBe('Field error');
    expect(text(errorMessage)).toBe('Field validation failed');
    let errorFieldMessages = errorElement.query($ERROR_FIELD_MESSAGES);
    expect(errorFieldMessages.children.length).toBe(2);
    expect(errorFieldMessages.children[0].nativeElement.textContent).toContain('This field1 failed validation');
    expect(errorFieldMessages.children[1].nativeElement.textContent).toContain('This field2 failed validation');
  });

  it('should remove field validation errors when errors previously but resetErrors() is called', () => {
    const FIELD_ERRORS = [
      {
        message: 'This field1 failed validation'
      },
      {
        message: 'This field2 failed validation'
      }
    ];
    const VALID_ERROR = {
      message: 'Field validation failed',
      details: {
        field_errors: FIELD_ERRORS
      }
    };
    mockRouter.navigate.and.returnValue({ catch : (error) => error(VALID_ERROR)});

    const request: CreateCaseFiltersSelection = {
      jurisdictionId: JURISDICTION_2.id,
      caseTypeId: CASE_TYPES_2[2].id,
      eventId: EVENT_ID_2
    }

    component.apply(request);
    fixture.detectChanges();

    let errorElement = de.query($ERROR_SUMMARY);
    expect(errorElement).toBeTruthy();
    let errorMessage = errorElement.query($ERROR_MESSAGE);
    expect(errorMessage).toBeTruthy();
    let errorFieldMessages = errorElement.query($ERROR_FIELD_MESSAGES);
    expect(errorFieldMessages).toBeTruthy();

    component.resetErrors();

    fixture.detectChanges();

    errorElement = de.query($ERROR_SUMMARY);
    expect(errorElement).toBeFalsy();
  });

});
