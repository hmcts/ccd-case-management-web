import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';
import { WorkbasketInputModel } from './workbasket-input.model';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class WorkbasketInputFilterService {

  constructor(private httpService: HttpService, private appConfig: AppConfig) {
  }

  getWorkbasketInputUrl(jurisdictionId: string, caseTypeId: string): string {
    return `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions/${jurisdictionId}/case-types/${caseTypeId}/work-basket-inputs`;
  }

  getWorkbasketInputs(jurisdictionId: string, caseTypeId: string): Observable<WorkbasketInputModel[]> {
    let url = this.getWorkbasketInputUrl(jurisdictionId, caseTypeId);
    return this.httpService
      .get(url)
      .map(response => {
        let workbasketInputs = response.json();
        workbasketInputs.forEach( item => { item.field.label = item.label; });
        return workbasketInputs;
      });
  }
}
