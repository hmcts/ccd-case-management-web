import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AppConfig } from '../../app.config';
import { HttpErrorService } from '../http/http-error.service';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { Observable } from 'rxjs';
import { Draft } from '../../shared/domain/draft';
import { CaseView } from '../cases/case-view.model';

@Injectable()
export class DraftService {
  constructor(
    private http: HttpService,
    private appConfig: AppConfig,
    private errorService: HttpErrorService
  ) {}

  createDraft(jid: string, ctid: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getDraftsUrl(jid, ctid, eventData);
    return this.http
      .post(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  updateDraft(jid: string, ctid: string, draftId: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getDraftsUrl(jid, ctid, eventData) + draftId;
    return this.http
      .put(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  getDraft(jurisdictionId: string,
              caseTypeId: string,
              draftId: string): Observable<CaseView> {
    const url = this.appConfig.getApiUrl()
      + `/caseworkers/:uid`
      + `/jurisdictions/${jurisdictionId}`
      + `/case-types/${caseTypeId}`
      + `/drafts/${draftId.slice(5)}`;
    return this.http
      .get(url)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  createOrUpdateDraft(jurisdictionId: string, caseTypeId: string, draftId: string, caseEventData: CaseEventData): Observable<Draft> {
    if (!draftId) {
      return this.createDraft(jurisdictionId, caseTypeId, caseEventData);
    } else {
      return this.updateDraft(jurisdictionId, caseTypeId, Draft.stripDraftId(draftId), caseEventData);
    }
  }
}
