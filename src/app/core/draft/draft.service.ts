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

  getDrafts(): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getDraftUrl() + `/caseworkers/:uid/jurisdictions/:jid/case-types/:ctid/drafts/`;

    return this.http
      .get(saveDraftEndpoint)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  createDraft(jid: string, ctid: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getDraftUrl() + `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/drafts/`;
    console.log('Calling create draft');
    return this.http
      .post(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }

  updateDraft(jid: string, ctid: string, draftId: string, eventData: CaseEventData): Observable<Draft> {
    const saveDraftEndpoint = this.appConfig.getDraftUrl() + `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/drafts/${draftId}`;
    console.log('Calling update draft at -> ', saveDraftEndpoint);
    return this.http
      .put(saveDraftEndpoint, eventData)
      .map(response => response.json())
      .catch((error: any): any => {
        this.errorService.setError(error);
        return Observable.throw(error);
      });
  }
}
