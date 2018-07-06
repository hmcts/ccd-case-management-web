import { HttpError } from '../http/http-error.model';
import { HttpService } from '../http/http.service';
import { HttpErrorService } from '../http/http-error.service';
import { AppConfig } from '../../app.config';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { Observable } from 'rxjs/Observable';
import { Response, ResponseOptions } from '@angular/http';
import createSpyObj = jasmine.createSpyObj;
import { DraftService } from './draft.service';
import { Draft } from '../../shared/domain/draft';
import { CaseDetails } from '../../shared/domain/case-details';

describe('Drafts Service', () => {

  const DATA_URL = 'http://aggregated.ccd.reform';
  const JID = 'TEST';
  const CT_ID = 'TestAddressBookCase';
  const DRAFT_ID = 'Draft#1';
  const EVENT_TRIGGER_ID = 'createCase';
  const DRAFT_URL = DATA_URL + `/caseworkers/:uid/jurisdictions/${JID}/case-types/${CT_ID}/event-trigger/${EVENT_TRIGGER_ID}/drafts/`;
  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let appConfig: any;
  let httpService: any;
  let errorService: any;

  let draftService: DraftService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getApiUrl', 'getCaseDataUrl']);
    appConfig.getCaseDataUrl.and.returnValue(DATA_URL);

    httpService = createSpyObj<HttpService>('httpService', ['get', 'post', 'put']);
    errorService = createSpyObj<HttpErrorService>('errorService', ['setError']);

    draftService = new DraftService(httpService, appConfig, errorService);
  });

  describe('saveDraft()', () => {
    const CASE_EVENT_DATA: CaseEventData = {
      event: {
        id: EVENT_TRIGGER_ID,
        summary: 'Short summary',
        description: 'A very nice description'
      },
      event_token: 'test-token',
      ignore_warning: false
    };

    const CASE_DETAILS: CaseDetails = {
      id: 'string',
      jurisdiction: 'Test Jurisdiction',
      case_type_id: 'TestCaseType',
      state: 'State 1',
      case_data: {}
    };

    const DRAFT_RESPONSE: Draft = {
      id: '5',
      document: CASE_DETAILS,
      type: 'Case Details',
      created: '21-06-2018',
      updated: '23-04-2019'
    };

    beforeEach(() => {
      httpService.post.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(DRAFT_RESPONSE)
      }))));
      httpService.put.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(DRAFT_RESPONSE)
      }))));
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(DRAFT_RESPONSE)
      }))));
    });

    it('should create a draft on server', () => {
      draftService
        .createDraft(JID, CT_ID, CASE_EVENT_DATA)
        .subscribe(
          data => expect(data).toEqual(DRAFT_RESPONSE)
        );
      expect(httpService.post).toHaveBeenCalledWith(DRAFT_URL, CASE_EVENT_DATA);
    });

    it('should set error when error is thrown when creating draft', () => {
      httpService.post.and.returnValue(Observable.throw(ERROR));

      draftService.createDraft(JID, CT_ID, CASE_EVENT_DATA)
        .subscribe(data => {}, err => {
          expect(err).toEqual(ERROR);
          expect(errorService.setError).toHaveBeenCalledWith(ERROR);
        });
    });

    it('should update a draft on server', () => {
      draftService
        .updateDraft(JID, CT_ID, DRAFT_ID, CASE_EVENT_DATA)
        .subscribe(
          data => expect(data).toEqual(DRAFT_RESPONSE)
        );
      expect(httpService.put).toHaveBeenCalledWith(DRAFT_URL + DRAFT_ID, CASE_EVENT_DATA);
    });

    it('should set error when error is thrown when updating draft', () => {
      httpService.put.and.returnValue(Observable.throw(ERROR));

      draftService.updateDraft(JID, CT_ID, DRAFT_ID, CASE_EVENT_DATA)
        .subscribe(data => {}, err => {
          expect(err).toEqual(ERROR);
          expect(errorService.setError).toHaveBeenCalledWith(ERROR);
        });
    });

  });
});
