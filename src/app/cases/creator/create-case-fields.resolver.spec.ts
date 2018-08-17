import { Observable } from 'rxjs/Observable';
import { CaseEventTrigger } from '../../shared/domain/case-view/case-event-trigger.model';
import { HttpError } from '../../core/http/http-error.model';
import { CreateCaseFieldsResolver } from './create-case-fields.resolver';
import createSpyObj = jasmine.createSpyObj;
import { Draft } from '../../shared/domain/draft';

describe('CreateCaseFieldsResolver', () => {

  const PARAM_JURISDICTION_ID = CreateCaseFieldsResolver.PARAM_JURISDICTION_ID;
  const PARAM_CASE_TYPE_ID = CreateCaseFieldsResolver.PARAM_CASE_TYPE_ID;
  const PARAM_EVENT_ID = CreateCaseFieldsResolver.PARAM_EVENT_ID;
  const QUERY_PARAM_IGNORE_WARNINGS = CreateCaseFieldsResolver.QUERY_PARAM_IGNORE_WARNING;
  const JURISDICTION = 'TEST';
  const IGNORE_WARNINGS = false;
  const CASE_TYPE = 'TestAddressBookCase';
  const EVENT_TRIGGER_ID = 'enterCaseIntoLegacy';
  const DRAFT_ID = Draft.DRAFT + '12345';
  const EVENT_TRIGGER: CaseEventTrigger = {
    id: EVENT_TRIGGER_ID,
    name: 'Into legacy',
    case_fields: [],
    event_token: 'test-token',
    wizard_pages: [],
    show_summary: true
  };
  const EVENT_TRIGGER_OBS: Observable<CaseEventTrigger> = Observable.of(EVENT_TRIGGER);
  const ERROR: HttpError = {
    timestamp: '',
    status: 422,
    message: 'Validation failed',
    error: '',
    exception: '',
    path: ''
  };

  let createCaseFieldsResolver: CreateCaseFieldsResolver;

  let casesService: any;
  let alertService: any;

  let route: any;

  let router: any;

  beforeEach(() => {
    casesService = createSpyObj('casesService', ['getEventTrigger']);
    alertService = createSpyObj('alertService', ['error']);

    router = createSpyObj('router', ['navigate']);

    createCaseFieldsResolver = new CreateCaseFieldsResolver(casesService, alertService);

    route = {
      paramMap: createSpyObj('paramMap', ['get']),
      queryParamMap: createSpyObj('queryParamMap', ['get']),
    };

    route.paramMap.get.and.callFake(key => {
      switch (key) {
        case PARAM_JURISDICTION_ID:
          return JURISDICTION;
        case PARAM_CASE_TYPE_ID:
          return CASE_TYPE;
        case PARAM_EVENT_ID:
          return EVENT_TRIGGER_ID;
      }
    });

    route.queryParamMap.get.and.callFake(key => {
      switch (key) {
        case QUERY_PARAM_IGNORE_WARNINGS:
          return IGNORE_WARNINGS;
      }
    });
  });

  it('should resolve event trigger using case service', () => {
    casesService.getEventTrigger.and.returnValue(EVENT_TRIGGER_OBS);

    createCaseFieldsResolver
      .resolve(route)
      .subscribe(triggerData => {
        expect(triggerData).toBe(EVENT_TRIGGER);
      });

    expect(casesService.getEventTrigger).toHaveBeenCalledWith(
      JURISDICTION, CASE_TYPE, EVENT_TRIGGER_ID, undefined, String(IGNORE_WARNINGS));
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_JURISDICTION_ID);
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_TYPE_ID);
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_EVENT_ID);
    expect(route.queryParamMap.get).toHaveBeenCalledWith(QUERY_PARAM_IGNORE_WARNINGS);
    expect(route.paramMap.get).toHaveBeenCalledTimes(3);
    expect(route.queryParamMap.get).toHaveBeenCalledTimes(2);
  });

  it('should use draftId when resuming create event ', () => {
    route.queryParamMap.get.and.callFake(key => {
      switch (key) {
        case QUERY_PARAM_IGNORE_WARNINGS:
          return IGNORE_WARNINGS;
        case Draft.DRAFT:
          return DRAFT_ID;
      }
    });
    casesService.getEventTrigger.and.returnValue(EVENT_TRIGGER_OBS);

    createCaseFieldsResolver
      .resolve(route)
      .subscribe(triggerData => {
        expect(triggerData).toBe(EVENT_TRIGGER);
      });

    expect(casesService.getEventTrigger).toHaveBeenCalledWith(
      JURISDICTION, CASE_TYPE, EVENT_TRIGGER_ID, DRAFT_ID, String(IGNORE_WARNINGS));
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_JURISDICTION_ID);
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_CASE_TYPE_ID);
    expect(route.paramMap.get).toHaveBeenCalledWith(PARAM_EVENT_ID);
    expect(route.queryParamMap.get).toHaveBeenCalledWith(QUERY_PARAM_IGNORE_WARNINGS);
    expect(route.paramMap.get).toHaveBeenCalledTimes(3);
    expect(route.queryParamMap.get).toHaveBeenCalledTimes(2);
  });

  it('should create error alert when event trigger cannot be retrieved', done => {
    casesService.getEventTrigger.and.returnValue(Observable.throw(ERROR));

    createCaseFieldsResolver
      .resolve(route)
      .subscribe(data => {
        fail(data);
      }, err => {
        expect(err).toBeTruthy();
        expect(alertService.error).toHaveBeenCalledWith(ERROR.message);
        done();
      });
  });
});
