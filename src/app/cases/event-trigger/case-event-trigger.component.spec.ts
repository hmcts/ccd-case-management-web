import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseEventTriggerComponent } from './case-event-trigger.component';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseView } from '../../core/cases/case-view.model';
import { CaseEventTrigger } from '../../shared/domain/case-view/case-event-trigger.model';
import { CasesService } from '../../core/cases/cases.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../core/alert/alert.service';
import { HttpError } from '../../core/http/http-error.model';
import { CaseReferencePipe } from '../../shared/utils/case-reference.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityPollingService } from '../../core/activity/activity.polling.service';
import { CaseEventData } from '../../shared/domain/case-event-data';
import createSpyObj = jasmine.createSpyObj;

@Component({
  selector: 'ccd-case-edit',
  template: ``
})
class CaseEditComponent {

  @Input()
  eventTrigger: CaseEventTrigger;

  @Input()
  submit: (CaseEventData) => Observable<object>;

  @Input()
  validate: (CaseEventData) => Observable<object>;

  @Input()
  caseDetails: CaseView;

  @Output()
  cancelled: EventEmitter<any> = new EventEmitter();

  @Output()
  submitted: EventEmitter<string> = new EventEmitter();

}

describe('CaseEventTriggerComponent', () => {
  const CASE_DETAILS: CaseView = new CaseView();
  CASE_DETAILS.case_id = '42';
  CASE_DETAILS.case_type = {
    id: 'TEST_CASE_TYPE',
    name: 'Test Case Type',
    jurisdiction: {
      id: 'TEST',
      name: 'Test'
    }
  };
  CASE_DETAILS.case_type.id = 'TEST_CASE_TYPE';
  CASE_DETAILS.case_type.jurisdiction.id = 'TEST';

  const EVENT_TRIGGER: CaseEventTrigger = {
    id: 'TEST_TRIGGER',
    name: 'Test Trigger',
    description: 'This is a test trigger',
    case_id: '3',
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
    event_token: 'test-token',
    wizard_pages: []
  };

  const SANITISED_EDIT_FORM: CaseEventData = {
    data: {
      'PersonLastName': 'Khaleesi'
    },
    event: {
      id: EVENT_TRIGGER.id,
      summary: 'Some summary',
      description: 'Some description',
    },
    event_token: 'cbcdcbdh',
    ignore_warning: false
  };

  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let fixture: ComponentFixture<CaseEventTriggerComponent>;
  let component: CaseEventTriggerComponent;
  let de: DebugElement;

  let CaseActivityComponent: any = MockComponent({
    selector: 'ccd-activity',
    inputs: ['caseId', 'displayMode']
  });

  let CaseHeaderComponent: any = MockComponent({
    selector: 'ccd-case-header',
    inputs: ['caseDetails']
  });

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
    selector: 'a'
  });

  let mockRoute: any = {
    snapshot: {
      data: {
        case: CASE_DETAILS,
        eventTrigger: EVENT_TRIGGER
      }
    }
  };

  let router: any;
  let alertService: any;
  let casesService: any;
  let casesReferencePipe: any;
  let activityPollingService: any;

  beforeEach(async(() => {
    casesService = createSpyObj<CasesService>('casesService', ['createEvent', 'validateCase']);
    casesService.createEvent.and.returnValue(Observable.of());
    casesService.validateCase.and.returnValue(Observable.of());

    casesReferencePipe = createSpyObj<CaseReferencePipe>('caseReference', ['transform']);

    alertService = createSpyObj<AlertService>('alertService', ['success', 'warning']);
    activityPollingService = createSpyObj<ActivityPollingService>('activityPollingService', ['postEditActivity']);
    activityPollingService.postEditActivity.and.returnValue(Observable.of());
    router = createSpyObj('router', ['navigate']);
    router.navigate.and.returnValue({then: f => f()});

    TestBed
      .configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        declarations: [
          CaseEditComponent,
          CaseEventTriggerComponent,

          // Mock
          CaseActivityComponent,
          CaseHeaderComponent,
          EventTriggerHeaderComponent,
          RouterLinkComponent,
          FieldRead,
          FieldWrite,
          CaseReferencePipe
        ],
        providers: [
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: CasesService, useValue: casesService },
          { provide: Router, useValue: router },
          { provide: AlertService, useValue: alertService },
          { provide: CaseReferencePipe, useValue: casesReferencePipe },
          { provide: ActivityPollingService, useValue: activityPollingService }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseEventTriggerComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should edit case with sanitised data when form submitted', () => {
    component.submit()(SANITISED_EDIT_FORM);

    expect(casesService.createEvent).toHaveBeenCalledWith(CASE_DETAILS, SANITISED_EDIT_FORM);
  });

  it('should edit case with sanitised data when form validated', () => {
    component.validate()(SANITISED_EDIT_FORM);

    expect(casesService.validateCase).toHaveBeenCalledWith(CASE_DETAILS.case_type.jurisdiction.id,
      CASE_DETAILS.case_type.id, SANITISED_EDIT_FORM);
  });

  it('should navigate to case view upon successful event creation', () => {
    casesService.createEvent.and.returnValue(Observable.of({}));

    component.submitted({caseId: 123});

    expect(router.navigate).toHaveBeenCalledWith(['case', CASE_DETAILS.case_type.jurisdiction.id, CASE_DETAILS.case_type.id,
      CASE_DETAILS.case_id]);
  });

  it('should alert success message after navigation upon successful event creation', () => {
    casesService.createEvent.and.returnValue(Observable.of({}));

    component.submitted({caseId: 123});

    expect(alertService.success).toHaveBeenCalled();
  });

  it('should alert success message after navigation upon successful event creation and call back', () => {
    casesService.createEvent.and.returnValue(Observable.of({}));

    component.submitted({caseId: 123, status: 'happy'});

    expect(alertService.success).toHaveBeenCalled();
  });

  it('should alert warning message after navigation upon successful event creation but incomplete call back', () => {
    casesService.createEvent.and.returnValue(Observable.of({}));

    component.submitted({caseId: 123, status: 'INCOMPLETE'});

    expect(alertService.warning).toHaveBeenCalled();
  });

  it('should have a cancel button going back to the create case', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/case', CASE_DETAILS.case_type.jurisdiction.id, CASE_DETAILS.case_type.id,
      CASE_DETAILS.case_id]);
  });
});
