import { Response, ResponseOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { AppConfig } from '../../app.config';
import createSpyObj = jasmine.createSpyObj;
import { PaginationService } from './pagination.service';
import { Observable } from 'rxjs';
import { HttpService, RequestOptionsBuilder } from '@hmcts/ccd-case-ui-toolkit';

describe('PaginationService', () => {

  const JID = 'TEST';
  const CTID = 'TestAddressBookCase';
  const DATA_URL = 'http://data.ccd.reform';
  const SEARCH_PAGINATION_METADATA_URL = DATA_URL + `/caseworkers/:uid/jurisdictions/${JID}/case-types/${CTID}/cases/pagination_metadata`;

  const PAGINATION_METADATA_RESULT = {
    total_results_count: 234,
    total_pages_count: 12
  };

  const SEARCH_VIEW = {
    columns: [],
    results: []
  };

  let params: URLSearchParams;
  let appConfig: any;
  let httpService: any;
  let requestOptionsBuilder: any;
  let paginationService: PaginationService;
  let requestOptionsArgs: RequestOptionsArgs;

  describe('get()', () => {

    beforeEach(() => {
      function matchCall(value: any, expected: any): boolean {
        return expected === value ||
            JSON.stringify(expected) === JSON.stringify(value) ||
            expected[0] === value[0] && JSON.stringify(expected[1]).trim() === JSON.stringify(value[1]).trim();
      }

      jasmine.addCustomEqualityTester(matchCall);

      appConfig = createSpyObj<AppConfig>('appConfig', ['getApiUrl', 'getCaseDataUrl']);
      appConfig.getCaseDataUrl.and.returnValue(DATA_URL);

      httpService = createSpyObj<HttpService>('httpService', ['get']);
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify([SEARCH_VIEW])
      }))));

      params = new URLSearchParams();
      requestOptionsArgs = { params };

      requestOptionsBuilder = createSpyObj<RequestOptionsBuilder>('requestOptionsBuilder', ['buildOptions']);
      requestOptionsBuilder.buildOptions.and.returnValue(requestOptionsArgs);

      paginationService = new PaginationService(appConfig, httpService, requestOptionsBuilder);
    });

    it('should call httpService with right URL, authorization, meta and case criteria and http method', () => {
      paginationService
        .getPaginationMetadata(JID, CTID, {}, {})
        .subscribe();

      expect(httpService.get).toHaveBeenCalledWith(SEARCH_PAGINATION_METADATA_URL, { params });
    });

    it('should call requestOptionsBuilder with right meta, case criteria and no view arguments', () => {
      let metaCriteria = { 'caseState': 'testState'};
      let caseCriteria = { 'firstName': 'testFirstName', 'lastName': 'testLastName'};

      paginationService
        .getPaginationMetadata(JID, CTID, metaCriteria, caseCriteria)
        .subscribe();

      expect(requestOptionsBuilder.buildOptions).toHaveBeenCalledWith(metaCriteria, caseCriteria);
    });

    it('should return correct pagination metadata', () => {
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(PAGINATION_METADATA_RESULT)
      }))));

      paginationService
        .getPaginationMetadata(JID, CTID, {}, {})
        .subscribe(resultView => {
          expect(resultView).toEqual(PAGINATION_METADATA_RESULT, {params});
        });
    });
  });
});
