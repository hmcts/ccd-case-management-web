import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { CaseHistory } from './case-history.model';
import { plainToClass } from 'class-transformer';
import { HttpService, HttpErrorService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class CaseHistoryService {

  constructor(private httpService: HttpService,
              private httpErrorService: HttpErrorService,
              private appConfig: AppConfig) {}

  get(jurisdictionId: string,
      caseTypeId: string,
      caseId: string,
      eventId: string): Observable<CaseHistory> {

    const url = this.appConfig.getCaseHistoryUrl(jurisdictionId, caseTypeId, caseId, eventId);

    return this.httpService
      .get(url)
      .map(response => response.json())
      .catch((error: any): any => {
        this.httpErrorService.setError(error);
        return Observable.throw(error);
      })
      .map((caseHistory: Object) => plainToClass(CaseHistory, caseHistory));
  }
}
