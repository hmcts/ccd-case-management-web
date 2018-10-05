import { Response, ResponseOptions } from '@angular/http';
import { AppConfig } from '../../app.config';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { DefinitionsService } from './definitions.service';
import { CaseType } from '../../shared/domain/definition/case-type.model';
import createSpyObj = jasmine.createSpyObj;

describe('DefinitionsService', () => {

  const API_DATA_URL = 'http://data.ccd.reform/aggregated';
  const JID = 'PROBATE';
  const CTID = 'TestAddressBookCase';
  const CTID_2 = 'TestAddressBookCase2';
  const CASE_TYPES_URL = API_DATA_URL + `/caseworkers/:uid/jurisdictions/${JID}/case-types?access=create`;

  let appConfig: any;
  let httpService: any;

  let definitionsService: DefinitionsService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getApiUrl']);
    appConfig.getApiUrl.and.returnValue(API_DATA_URL);

    httpService = createSpyObj<HttpService>('httpService', ['get']);

    definitionsService = new DefinitionsService(httpService, appConfig);
  });

  describe('getCaseTypes()', () => {
    beforeEach(() => {
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify([createCaseType(CTID), createCaseType(CTID_2)])
      }))));
    });

    it('should use HttpService::get with correct url', () => {
      definitionsService
        .getCaseTypes(JID, 'create')
        .subscribe();

      expect(httpService.get).toHaveBeenCalledWith(CASE_TYPES_URL);
    });

    it('should retrieve case type from server', () => {
      definitionsService
        .getCaseTypes(JID, 'create')
        .subscribe(
          caseTypesData => expect(caseTypesData).toEqual([createCaseType(CTID), createCaseType(CTID_2)])
        );
    });

    function createCaseType(caseTypeId: string): CaseType {
      return {
        id: caseTypeId,
        name: 'Complex Address Book Case',
        events: [],
        states: [],
        case_fields: [],
        description: 'Complex Address Book Case',
        jurisdiction: {
          id: 'PROBATE',
          name: 'Probate',
          description: 'Content for the Test Jurisdiction.',
          caseTypes: []
        }
      };
    }

  });
});
