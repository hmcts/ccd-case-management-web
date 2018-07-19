import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { CaseViewerComponent } from './case-viewer.component';
import { By } from '@angular/platform-browser';
import { CaseView } from '../../core/cases/case-view.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MockComponent } from 'ng2-mock-component';
import { OrderService } from '../../core/order/order.service';
import { Observable } from 'rxjs/Observable';
import { CaseViewEvent } from '../../core/cases/case-view-event.model';
import { CaseViewTrigger } from '../../shared/domain/case-view/case-view-trigger.model';
import { attr } from '../../test/helpers';
import { PaletteUtilsModule } from '../../shared/palette/utils/utils.module';
import createSpyObj = jasmine.createSpyObj;
import any = jasmine.any;
import { Subject } from 'rxjs/Subject';
import { CallbackErrorsContext } from '../../shared/error/error-context';
import { HttpError } from '../../core/http/http-error.model';
import { text } from '../../test/helpers';
import { ActivityService } from '../../core/activity/activity.service';
import { LabelSubstitutorDirective } from '../../shared/substitutor/label-substitutor.directive';
import { FieldsUtils } from '../../shared/utils/fields.utils';
import { LabelSubstitutionService } from '../../shared/case-editor/label-substitution.service';
import { ActivityPollingService } from '../../core/activity/activity.polling.service';

@Component({
  // tslint:disable-next-line
  selector: 'cut-tabs',
  template: '<ng-content></ng-content>'
})
class TabsComponent {}

@Component({
  // tslint:disable-next-line
  selector: 'cut-tab',
  template: '<ng-content></ng-content>'
})
class TabComponent {}

describe('CaseViewerComponent', () => {

  @Component({
    selector: 'ccd-event-trigger',
    template: ``
  })
  class EventTriggerComponent {
    @Input()
    triggers: CaseViewTrigger[];

    @Input()
    triggerText: string;

    @Input()
    callbackErrorsSubject: Subject<any> = new Subject();

    @Output()
    onTrigger = new EventEmitter<CaseViewTrigger>();
  }

  @Component({
    selector: 'ccd-callback-errors',
    template: ``
  })
  class CallbackErrorsComponent {

    public static readonly TRIGGER_TEXT_GO = 'Go';
    public static readonly TRIGGER_TEXT_IGNORE = 'Ignore Warning and Go';

    @Input()
    callbackErrorsSubject: Subject<any> = new Subject();
    @Output()
    callbackErrorsContext: EventEmitter<any> = new EventEmitter();

  }

  const EventLogComponent: any = MockComponent({
    selector: 'ccd-event-log',
    inputs: ['events']
  });

  const CaseHeaderComponent: any = MockComponent({
    selector: 'ccd-case-header',
    inputs: ['caseDetails']
  });

  const MarkdownComponent: any = MockComponent({
    selector: 'ccd-markdown',
    inputs: ['content']
  });

  const STATIC_TABS_LENGTH = 1;

  // Page object selectors
  const $ALL_TAB_HEADERS = By.css('cut-tabs>cut-tab');
  const $FIRST_TAB_HEADER = By.css('cut-tabs>cut-tab:first-child');
  const $CASE_TAB_HEADERS = By.css('cut-tabs>cut-tab:not(:first-child)');
  const $NAME_TAB_CONTENT = By.css('cut-tabs>cut-tab#NameTab');
  const $EVENT_TAB_CONTENT = By.css('cut-tabs>cut-tab#History');
  const $PRINT_LINK = By.css('#case-viewer-control-print');
  const $ERROR_SUMMARY = By.css('.error-summary');
  const $ERROR_MESSAGE = By.css('p');

  const TRIGGERS: CaseViewTrigger[] = [
    {
      id: 'EDIT',
      name: 'Edit',
      description: 'Edit a case'
    }
  ];

  const EVENTS: CaseViewEvent[] = [
    {
      id: 4,
      timestamp: '2017-05-09T16:07:03.973',
      summary: 'Case updated!',
      comment: 'Plop plop',
      event_id: 'updateCase',
      event_name: 'Update a case',
      state_id: 'CaseUpdated',
      state_name: 'Case Updated',
      user_id: 0,
      user_last_name: 'Chan',
      user_first_name: 'Phillip'
    }
  ];

  const CASE_VIEW: CaseView = {
    case_id: '1234567890123456',
    case_type: {
      id: 'TestAddressBookCase',
      name: 'Test Address Book Case',
      jurisdiction: {
        id: 'TEST',
        name: 'Test',
      }
    },
    channels: [],
    state: {
      id: 'CaseCreated',
      name: 'Case created'
    },
    tabs: [
      {
        id: 'AddressTab',
        label: 'Address',
        order: 2,
        fields: [],
        show_condition: 'PersonFirstName="Jane"'
      },
      {
        id: 'NameTab',
        label: 'Name',
        order: 1,
        fields: [
          {
            id: 'PersonFirstName',
            label: 'First name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 2,
            value: 'Janet',
            show_condition: ''
          },
          {
            id: 'PersonLastName',
            label: 'Last name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 1,
            value: 'Parker',
            show_condition: 'PersonFirstName="Jane*"'
          },
          {
            id: 'PersonComplex',
            label: 'Complex field',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Complex',
              type: 'Complex',
              complex_fields: []
            },
            order: 3,
            show_condition: 'PersonFirstName="Park"'
          }
        ],
        show_condition: 'PersonFirstName="Janet"'
      },
      {
        id: 'SomeTab',
        label: 'Some Tab',
        order: 3,
        fields: [],
        show_condition: ''
      },
    ],
    triggers: TRIGGERS,
    events: EVENTS
  };
  const FIELDS = CASE_VIEW.tabs[1].fields;
  const SIMPLE_FIELDS = CASE_VIEW.tabs[1].fields.slice(0, 2);
  const COMPLEX_FIELDS = CASE_VIEW.tabs[1].fields.slice(2);

  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let fixture: ComponentFixture<CaseViewerComponent>;
  let component: CaseViewerComponent;
  let de: DebugElement;

  let mockRoute: any = {
    snapshot: {
      data: {
        case: CASE_VIEW
      }
    }
  };

  let orderService;
  let router: any;
  let mockCallbackErrorSubject: any;
  let activityService: any;

  let CaseActivityComponent: any = MockComponent({
    selector: 'ccd-activity',
    inputs: ['caseId', 'displayMode']
  });

  let FieldReadComponent: any = MockComponent({ selector: 'ccd-field-read', inputs: [
    'caseField'
  ]});

  let LinkComponent: any = MockComponent({ selector: 'a', inputs: [
    'routerLink'
  ]});

  beforeEach(async(() => {
    orderService = new OrderService();
    spyOn(orderService, 'sort').and.callThrough();

    activityService = createSpyObj<ActivityPollingService>('activityPollingService', ['postViewActivity']);
    activityService.postViewActivity.and.returnValue(Observable.of());

    router = createSpyObj<Router>('router', ['navigate']);
    router.navigate.and.returnValue(new Promise(any));
    mockCallbackErrorSubject = createSpyObj<Router>('callbackErrorSubject', ['next']);

    TestBed
      .configureTestingModule({
        imports: [
          PaletteUtilsModule,
        ],
        declarations: [
          CaseViewerComponent,
          LabelSubstitutorDirective,
          // Mock
          CaseActivityComponent,
          FieldReadComponent,
          EventLogComponent,
          EventTriggerComponent,
          CaseHeaderComponent,
          LinkComponent,
          CallbackErrorsComponent,
          TabsComponent,
          TabComponent,
          MarkdownComponent
        ],
        providers: [
          FieldsUtils,
          LabelSubstitutionService,
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: OrderService, useValue: orderService },
          { provide: Router, useValue: router },
          { provide: ActivityPollingService, useValue: activityService }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseViewerComponent);
    component = fixture.componentInstance;
    component.callbackErrorsSubject = mockCallbackErrorSubject;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render a case header', () => {
    let header = de.query(By.directive(CaseHeaderComponent));
    expect(header).toBeTruthy();
    expect(header.componentInstance.caseDetails).toEqual(CASE_VIEW);
  });

  it('should render the correct tabs based on show_condition', () => {
    // we expect address tab not to be rendered
    let tabHeaders = de.queryAll($ALL_TAB_HEADERS);
    expect(tabHeaders.length).toBe(STATIC_TABS_LENGTH + CASE_VIEW.tabs.length - 1);
    expect(attr(tabHeaders[1], 'title')).toBe(CASE_VIEW.tabs[1].label);
    expect(attr(tabHeaders[2], 'title')).toBe(CASE_VIEW.tabs[2].label);
  });

  it('should render the event log tab first', () => {
    let firstTabHeader = de.query($FIRST_TAB_HEADER);
    expect(firstTabHeader).toBeTruthy();

    expect(attr(firstTabHeader, 'title')).toBe('History');
  });

  it('should render each tab defined by the Case view', () => {
    // we expect address tab not to be rendered
    let tabHeaders = de.queryAll($CASE_TAB_HEADERS);
    expect(tabHeaders.length).toBe(CASE_VIEW.tabs.length - 1);

    expect(tabHeaders.find(c => 'Name' === attr(c, 'title'))).toBeTruthy('Could not find tab Name');
    expect(tabHeaders.find(c => 'Some Tab' === attr(c, 'title'))).toBeTruthy('Could not find tab Some Tab');
  });

  it('should render the field labels based on show_condition', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr>th'));

    expect(headers.find(r => r.nativeElement.textContent.trim() === 'Complex field'))
      .toBeFalsy('Found row with label Complex field');
    expect(headers.find(r => r.nativeElement.textContent.trim() === 'Last name'))
      .toBeTruthy('Cannot find row with label Last name');
    expect(headers.find(r => r.nativeElement.textContent.trim() === 'First name'))
      .toBeTruthy('Cannot find row with label First name');
  });

  it('should render tabs in ascending order', () => {
    let tabHeaders = de.queryAll($CASE_TAB_HEADERS);

    expect(attr(tabHeaders[0], 'title')).toBe(CASE_VIEW.tabs[1].label);
    expect(orderService.sort).toHaveBeenCalledWith(CASE_VIEW.tabs);
  });

  it('should render a row for each field in a given tab', () => {
    let rows = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr'));
    expect(rows.length).toBe(FIELDS.length);
  });

  it('should render each simple field label as a table header', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr>th'));

      SIMPLE_FIELDS.forEach(field => {
      expect(headers.find(r => r.nativeElement.textContent.trim() === field.label))
        .toBeTruthy(`Could not find row with label ${field.label}`);
    });
  });

  it('should render each compound field without label as a cell spanning 2 columns', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr.complex-field>th'));

    expect(headers.length).toBe(0);

    let cells = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr.compound-field>td'));

    expect(cells.length).toEqual(COMPLEX_FIELDS.length);
  });

  it('should render each field value using FieldReadComponent', () => {
    let readFields_fields = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr td>ccd-field-read'));

    let readFields_compound = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr th>ccd-field-read'));

    let readFields = readFields_fields.concat(readFields_compound);

    FIELDS.forEach(field => {
      expect(readFields.find(f => {
          let fieldInstance = f.componentInstance;
          return JSON.stringify(fieldInstance.caseField) === JSON.stringify(field);
        }))
        .toBeTruthy(`Could not find field with type ${field.field_type}`);
    });
    expect(FIELDS.length).toBe(readFields.length);
  });

  it('should render fields in ascending order', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr>th'));

      expect(headers[0].nativeElement.textContent.trim()).toBe(FIELDS[1].label);
    expect(orderService.sort).toHaveBeenCalledWith(FIELDS);
  });

  it('should render the event log component in the event log tab', () => {
    let eventLogElement = de
      .query($EVENT_TAB_CONTENT)
      .query(By.directive(EventLogComponent));
    let eventLog = eventLogElement.componentInstance;

    expect(eventLog.events).toEqual(EVENTS);
  });

  it('should render an event trigger', () => {
    let eventTriggerElement = de.query(By.directive(EventTriggerComponent));

    expect(eventTriggerElement).toBeTruthy();

    let eventTrigger = eventTriggerElement.componentInstance;

    expect(eventTrigger.triggers).toEqual(TRIGGERS);
  });

  it('should emit trigger event on trigger submit', () => {
    spyOn(component, 'applyTrigger').and.callThrough();

    let eventTriggerElement = de.query(By.directive(EventTriggerComponent));
    let eventTrigger = eventTriggerElement.componentInstance;

    eventTrigger.onTrigger.emit(TRIGGERS[0]);

    expect(component.applyTrigger).toHaveBeenCalledWith(TRIGGERS[0]);
    expect(component.applyTrigger).toHaveBeenCalledTimes(1);
  });

  it('should navigate to event trigger view on trigger emit', () => {
    component.applyTrigger(TRIGGERS[0]);

    expect(router.navigate).toHaveBeenCalledWith(['trigger', TRIGGERS[0].id], {
      queryParams: { },
      relativeTo: mockRoute
    });
  });

  it('should notify user about errors/warnings when trigger applied and response with callback warnings/errors', () => {
    const VALID_ERROR = {
      callbackErrors: ['error1', 'error2'],
      callbackWarnings: ['warning1', 'warning2']
    };
    router.navigate.and.returnValue({ catch : (error) => error(VALID_ERROR)});

    let eventTriggerElement = de.query(By.directive(EventTriggerComponent));
    let eventTrigger = eventTriggerElement.componentInstance;
    eventTrigger.onTrigger.emit(TRIGGERS[0]);

    expect(router.navigate).toHaveBeenCalledWith(['trigger', TRIGGERS[0].id], {
      queryParams: { },
      relativeTo: mockRoute
    });
    expect(mockCallbackErrorSubject.next).toHaveBeenCalledWith(VALID_ERROR);
  });

  it('should change button label when notified about callback errors', () => {
    let callbackErrorsContext: CallbackErrorsContext = new CallbackErrorsContext();
    callbackErrorsContext.trigger_text = CallbackErrorsComponent.TRIGGER_TEXT_GO;
    component.callbackErrorsNotify(callbackErrorsContext);
    fixture.detectChanges();

    let eventTriggerElement = de.query(By.directive(EventTriggerComponent));
    let eventTrigger = eventTriggerElement.componentInstance;

    expect(eventTrigger.triggerText).toEqual(CallbackErrorsComponent.TRIGGER_TEXT_GO);

    callbackErrorsContext.trigger_text = CallbackErrorsComponent.TRIGGER_TEXT_IGNORE;
    component.callbackErrorsNotify(callbackErrorsContext);
    fixture.detectChanges();

    expect(eventTrigger.triggerText).toEqual(CallbackErrorsComponent.TRIGGER_TEXT_IGNORE);
  });

  it('should initially not display form errors', () => {
    let error = de.query($ERROR_SUMMARY);
    expect(error).toBeFalsy();
    expect(component.error).toBeFalsy();
  });

  it('should clear errors and warnings', () => {
    let callbackErrorsContext: CallbackErrorsContext = new CallbackErrorsContext();
    callbackErrorsContext.trigger_text = CallbackErrorsComponent.TRIGGER_TEXT_GO;
    component.callbackErrorsNotify(callbackErrorsContext);
    fixture.detectChanges();
    component.clearErrorsAndWarnings();
    let error = de.query($ERROR_SUMMARY);
    expect(error).toBeFalsy();
    expect(component.error).toBeFalsy();
  });

  it('should display error when form error get set', () => {
    component.error = ERROR;
    fixture.detectChanges();

    let error = de.query($ERROR_SUMMARY);
    expect(error).toBeTruthy();

    let errorMessage = error.query($ERROR_MESSAGE);
    expect(text(errorMessage)).toBe(ERROR.message);
  });

  it('should contain a print link', () => {
    let printLink = de.query($PRINT_LINK);

    expect(printLink).toBeTruthy();
    expect(printLink.componentInstance.routerLink).toEqual('print');
  });

  it('should not contain a print link if Draft', () => {
    component.caseDetails.case_id = 'DRAFT123';
    fixture.detectChanges();
    let printLink = de.query($PRINT_LINK);

    expect(printLink).toBeFalsy();
  });
});
