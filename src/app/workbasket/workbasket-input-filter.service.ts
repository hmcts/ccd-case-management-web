import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';
import { WorkbasketInputModel } from './workbasket-input.model';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class WorkbasketInputFilterService {
  private currentJurisdiction: string;
  private currentCaseType: string;

  constructor(private httpService: HttpService, private appConfig: AppConfig) {
  }

  getWorkbasketInputUrl(jurisdictionId: string, caseTypeId: string): string {
    return `${this.appConfig.getApiUrl()}/caseworkers/:uid/jurisdictions/${jurisdictionId}/case-types/${caseTypeId}/work-basket-inputs`;
  }

  getWorkbasketInputs(jurisdictionId: string, caseTypeId: string): Observable<WorkbasketInputModel[]> {
    let url = this.getWorkbasketInputUrl(jurisdictionId, caseTypeId);
    this.currentJurisdiction = jurisdictionId;
    this.currentCaseType = caseTypeId;
    return this.httpService
      .get(url)
      .map(response => {
        let workbasketInputs = response.json();
        if (this.isDataValid(jurisdictionId, caseTypeId)) {
          workbasketInputs.forEach(item => {
            item.field.label = item.label;
          });
        } else {
          throw new Error('Response expired');
        }
        return workbasketInputs;
      });
  }

  isDataValid(jurisdictionId: string, caseTypeId: string): boolean {
    return this.currentJurisdiction === jurisdictionId && this.currentCaseType === caseTypeId
  }
}
