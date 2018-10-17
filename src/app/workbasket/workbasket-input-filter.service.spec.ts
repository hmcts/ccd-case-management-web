import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { WorkbasketInputFilterService } from './workbasket-input-filter.service';
import { AppConfig } from '../app.config';
import { WorkbasketInputModel } from './workbasket-input.model';
import createSpyObj = jasmine.createSpyObj;
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

describe('DefinitionsService', () => {
  const API_DATA_URL = 'http://data.ccd.reform/aggregated';
  const JurisdictionId = 'PROBATE';
  const CaseTypeId = 'TestAddressBookCase';
  const CASE_TYPES_URL = API_DATA_URL + `/caseworkers/:uid/jurisdictions/${JurisdictionId}/case-types/${CaseTypeId}/work-basket-inputs`;

  let appConfig: any;
  let httpService: any;
  let workbasketInputFilterService: WorkbasketInputFilterService;

  beforeEach(() => {
    appConfig = createSpyObj<AppConfig>('appConfig', ['getApiUrl']);
    appConfig.getApiUrl.and.returnValue(API_DATA_URL);
    httpService = createSpyObj<HttpService>('httpService', ['get']);
    workbasketInputFilterService = new WorkbasketInputFilterService(httpService, appConfig);
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
              id: 'field1', field_type: { id: 'Text', type: 'Text' }, label: 'Field 1' },
            order: 1
          },
          {
            label: 'Field 2',
            field: { id: 'field2', field_type: { id: 'Text', type: 'Text' }, label: 'Field 2' },
            order: 2
          },
          {
            label: 'Field 3',
            field: { id: 'field3', field_type: { id: 'Text', type: 'Text' }, label: 'Field 3' },
            order: 3
          }
        ];
      }
    }
  );
});
