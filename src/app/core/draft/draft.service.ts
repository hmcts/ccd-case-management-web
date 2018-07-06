import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AppConfig } from '../../app.config';
import { HttpErrorService } from '../http/http-error.service';
import { CaseEventData } from '../../shared/domain/case-event-data';
import { Observable } from '../../../../node_modules/rxjs';
import { Draft } from '../../shared/domain/draft';

@Injectable()
export class DraftService {
  constructor(
    private http: HttpService,
    private appConfig: AppConfig,
    private errorService: HttpErrorService
  ) {}

  createDraft(jid: string, ctid: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getCaseDataUrl()
      + `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/event-trigger/${eventData.event.id}/drafts/`;
    return this.http
      .post(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  updateDraft(jid: string, ctid: string, draftId: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getCaseDataUrl()
      + `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/event-trigger/${eventData.event.id}/drafts/${draftId}`;
    return this.http
      .put(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }
}
