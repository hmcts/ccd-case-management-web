import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { HttpService } from '../http/http.service';

@Injectable()
export class ActivityService {
  static get ACTIVITY_VIEW() { return 'view'; }
  static get ACTIVITY_EDIT() { return 'edit'; }

  private userAuthorised = true;

  constructor(private http: HttpService, private appConfig: AppConfig) {}

  getActivities(...caseId: string[]): Observable<Activity[]> {
    const url = this.activityUrl() + `/cases/${caseId.join(',')}/activity`;

    return this.http
      .get(url)
      .map(response => response.json());
  }

  postActivity(caseId: string, activityType: String): Observable<Activity[]> {
    const url = this.activityUrl() + `/cases/${caseId}/activity`;
    let body = { activity: activityType};
    return this.http
      .post(url, body)
      .map(response => response.json());
  }

  private activityUrl(): string {
    return this.appConfig.getActivityUrl();
  }

  get isEnabled(): boolean {
    return this.activityUrl() && this.userAuthorised;
}

}
