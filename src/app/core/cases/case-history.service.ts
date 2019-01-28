import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { CaseHistory } from './case-history.model';
import { plainToClass } from 'class-transformer';
import { HttpService, HttpErrorService } from '@hmcts/ccd-case-ui-toolkit';
import { Headers } from '@angular/http';

@Injectable()
export class CaseHistoryService {
  public static readonly V2_MEDIATYPE_CASE_EVENT_VIEW =
    'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-event-view.v2+json;charset=UTF-8';

  constructor(private httpService: HttpService,
              private httpErrorService: HttpErrorService,
              private appConfig: AppConfig) {}

  get(caseId: string,
      eventId: string): Observable<CaseHistory> {

    const url = this.appConfig.getCaseHistoryUrl(caseId, eventId);

    let headers = new Headers({
      'experimental': 'true',
      'Accept': CaseHistoryService.V2_MEDIATYPE_CASE_EVENT_VIEW
    });

    return this.httpService
      .get(url, {headers})
      .map(response => response.json())
      .catch((error: any): any => {
        this.httpErrorService.setError(error);
        return Observable.throw(error);
      })
      .map((caseHistory: Object) => plainToClass(CaseHistory, caseHistory));
  }
}
