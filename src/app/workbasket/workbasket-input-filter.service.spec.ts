import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { WorkbasketInputFilterService } from './workbasket-input-filter.service';
import { AppConfig } from '../app.config';
import { WindowService } from '../core/utils/window.service';
import { WorkbasketInputModel } from './workbasket-input.model';
import createSpyObj = jasmine.createSpyObj;
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

describe('DefinitionsService', () => {
  const API_DATA_URL = 'http://data.ccd.reform/aggregated';
  const JurisdictionId = 'PROBATE';
  const CaseTypeId = 'TestAddressBookCase';
  const CASE_TYPES_URL = API_DATA_URL + `/caseworkers/:uid/jurisdictions/${JurisdictionId}/case-types/${CaseTypeId}/work-basket-inputs`;
  const workbasketfiltervalue = `{\"PersonLastName\":null,\"PersonFirstName\":\"CaseFirstName\",`
    + `\"PersonAddress\":{\"AddressLine1\":null,\"AddressLine2\":null,\"AddressLine3\":null,`
    + `\"PostTown\":null,\"County\":null,\"PostCode\":null,\"Country\":null}}`
  let appConfig: any;
  let httpService: any;
  let workbasketInputFilterService: WorkbasketInputFilterService;
  let windowService: WindowService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getApiUrl']);
    appConfig.getApiUrl.and.returnValue(API_DATA_URL);
    httpService = createSpyObj<HttpService>('httpService', ['get']);
    workbasketInputFilterService = new WorkbasketInputFilterService(httpService, appConfig);
    windowService = new WindowService();
    windowService.setLocalStorage('workbasket-filter-form-group-value', workbasketfiltervalue);
  });

  describe('getWorkbasketInputs()', () => {
    beforeEach(() => {
      httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify(createWorkbasketInputs())
      }))));
    });

    it('should use HttpService::get with correct url', () => {
      workbasketInputFilterService
        .getWorkbasketInputs(JurisdictionId, CaseTypeId)
        .subscribe();

      expect(httpService.get).toHaveBeenCalledWith(CASE_TYPES_URL);
    });

    it('should retrieve workbasketInput array from server', () => {
      workbasketInputFilterService
        .getWorkbasketInputs(JurisdictionId, CaseTypeId)
        .subscribe(workbasketInputData => expect(workbasketInputData).toEqual(createWorkbasketInputs())
        );
    });

    function createWorkbasketInputs(): WorkbasketInputModel[] {
      return [
        {
          label: 'Field 1',
          field: {
            id: 'field1', field_type: { id: 'Text', type: 'Text' }, value: '', label: 'Field 1'
          },
          order: 1
        },
        {
          label: 'Field 2',
          field: { id: 'field2', field_type: { id: 'Text', type: 'Text' }, value: 'Some Value', label: 'Field 2' },
          order: 2
        },
        {
          label: 'Field 3',
          field: { id: 'field3', field_type: { id: 'Text', type: 'Text' }, value: '', label: 'Field 3' },
          order: 3
        }
      ];
    }
  }
  );
});
