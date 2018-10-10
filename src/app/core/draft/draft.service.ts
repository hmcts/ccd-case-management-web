import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AppConfig } from '../../app.config';
import { HttpErrorService } from '../http/http-error.service';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { Observable } from 'rxjs';
import { Draft } from '../../shared/domain/draft';
import { CaseView } from '../cases/case-view.model';
import { Response } from '@angular/http';

@Injectable()
export class DraftService {
  constructor(
    private http: HttpService,
    private appConfig: AppConfig,
    private errorService: HttpErrorService
  ) {}

  createDraft(jid: string, ctid: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getCreateOrUpdateDraftsUrl(jid, ctid, eventData);
    return this.http
      .post(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  updateDraft(jid: string, ctid: string, draftId: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getCreateOrUpdateDraftsUrl(jid, ctid, eventData) + draftId;
    return this.http
      .put(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  getDraft(jid: string, ctid: string, draftId: string): Observable<CaseView> {
    const url = this.appConfig.getViewOrDeleteDraftsUrl(jid, ctid, draftId.slice(Draft.DRAFT_PREFIX.length));
    return this.http
      .get(url)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  deleteDraft(jid: string, ctid: string, draftId: string): Observable<{} | Response> {
    const url = this.appConfig.getViewOrDeleteDraftsUrl(jid, ctid, draftId.slice(Draft.DRAFT_PREFIX.length));
    return this.http
      .delete(url)
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
