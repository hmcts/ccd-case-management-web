import { Response, ResponseOptions } from '@angular/http';
import { AppConfig } from '../../app.config';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs/Observable';
import { HttpError } from '../http/http-error.model';
import { CaseHistory } from './case-history.model';
import { CaseHistoryService } from './case-history.service';
import { createCaseHistory } from './case-history.test.fixture';
import createSpyObj = jasmine.createSpyObj;

describe('CaseHistoryService', () => {

  const API_URL = 'http://aggregated.ccd.reform';
  const JID = 'TEST';
  const CTID = 'TestAddressBookCase';
  const CASE_ID = '1';
  const EVENT_ID = '10';
  const CASE_HISTORY_URL = API_URL + `/caseworkers/:uid/jurisdictions/${JID}/case-types/${CTID}/cases/${CASE_ID}`
    + `/events/${EVENT_ID}/case-history`;
  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let appConfig: any;
  let httpService: any;

  let caseHistoryService: CaseHistoryService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getCaseHistoryUrl']);
    appConfig.getCaseHistoryUrl.and.returnValue(CASE_HISTORY_URL);

    httpService = createSpyObj<HttpService>('httpService', ['get']);

    caseHistoryService = new CaseHistoryService(httpService, appConfig);
  });

  describe('get()', () => {
    const CASE_HISTORY: CaseHistory = createCaseHistory();

    beforeEach(() => {
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(CASE_HISTORY)
      }))));
    });

    it('should use HttpService::get with correct url', () => {
      caseHistoryService
        .get(JID, CTID, CASE_ID, EVENT_ID)
        .subscribe();

      expect(httpService.get).toHaveBeenCalledWith(CASE_HISTORY_URL);
    });

    it('should retrieve case history from server', () => {
      caseHistoryService
        .get(JID, CTID, CASE_ID, EVENT_ID)
        .subscribe(
          caseHistory => expect(caseHistory).toEqual(CASE_HISTORY)
        );
    });

  });
});
