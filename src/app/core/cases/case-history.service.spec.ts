import { Response, ResponseOptions, Headers } from '@angular/http';
import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { CaseHistory } from './case-history.model';
import { CaseHistoryService } from './case-history.service';
import { createCaseHistory } from './case-history.test.fixture';
import createSpyObj = jasmine.createSpyObj;
import { HttpService, HttpError, HttpErrorService } from '@hmcts/ccd-case-ui-toolkit';

describe('CaseHistoryService', () => {

  const DATA_URL = 'http://data.ccd.reform';
  const CASE_ID = '1';
  const EVENT_ID = '10';
  const CASE_HISTORY_URL = DATA_URL + `/internal/cases/${CASE_ID}/events/${EVENT_ID}`;
  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let appConfig: any;
  let httpService: any;
  let httpErrorService: any;

  let caseHistoryService: CaseHistoryService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getCaseHistoryUrl']);
    appConfig.getCaseHistoryUrl.and.returnValue(CASE_HISTORY_URL);

    httpService = createSpyObj<HttpService>('httpService', ['get']);
    httpErrorService = createSpyObj<HttpErrorService>('errorService', ['setError']);

    caseHistoryService = new CaseHistoryService(httpService, httpErrorService, appConfig);
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
        .get(CASE_ID, EVENT_ID)
        .subscribe();

      expect(httpService.get).toHaveBeenCalledWith(CASE_HISTORY_URL, {
        headers: new Headers({
          'experimental': 'true',
          'Accept': CaseHistoryService.V2_MEDIATYPE_CASE_EVENT_VIEW
        })});
    });

    it('should retrieve case history from server', () => {
      caseHistoryService
        .get(CASE_ID, EVENT_ID)
        .subscribe(
          caseHistory => expect(caseHistory).toEqual(CASE_HISTORY)
        );
    });

    it('should set error when error is thrown', () => {
      httpService.get.and.returnValue(Observable.throw(ERROR));

      caseHistoryService
        .get(CASE_ID, EVENT_ID)
        .subscribe(() => {
        }, err => {
          expect(err).toEqual(ERROR);
          expect(httpErrorService.setError).toHaveBeenCalledWith(ERROR);
        });
    });

  });
});
