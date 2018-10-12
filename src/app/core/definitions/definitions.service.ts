import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { CaseType } from '../../shared/domain/definition/case-type.model';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class DefinitionsService {

  constructor(private http: HttpService, private appConfig: AppConfig) {}

  getCaseTypes(jurisdictionId: string, access: string): Observable<CaseType[]> {
    const url = this.appConfig.getApiUrl()
      + `/caseworkers/:uid`
      + `/jurisdictions/${jurisdictionId}`
      + `/case-types?access=${access}`;

    return this.http
      .get(url)
      .map(response => response.json());
  }
}
