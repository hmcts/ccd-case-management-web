import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { HttpService } from '../http/http.service';
import { CaseHistory } from './case-history.model';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CaseHistoryService {

  constructor(private http: HttpService,
              private appConfig: AppConfig) {}

  get(jurisdictionId: string,
      caseTypeId: string,
      caseId: string,
      eventId: string): Observable<CaseHistory> {

    const url = this.appConfig.getCaseHistoryUrl(jurisdictionId, caseTypeId, caseId, eventId);

    return this.http
      .get(url)
      .map(response => response.json())
      .map((caseHistory: Object) => plainToClass(CaseHistory, caseHistory));
  }
}
