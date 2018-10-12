import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

const DUMMY_CASE_REFERENCE = '0';

@Injectable()
export class ActivityService {
  static get ACTIVITY_VIEW() { return 'view'; }
  static get ACTIVITY_EDIT() { return 'edit'; }
  readonly DUMMY_CASE_REFERENCE = '0';

  private userAuthorised;

  constructor(private http: HttpService, private appConfig: AppConfig) {}

  getActivities(...caseId: string[]): Observable<Activity[]> {
    const url = this.activityUrl() + `/cases/${caseId.join(',')}/activity`;
    return this.http
      .get(url, null, false)
      .map(response => response.json());
  }

  postActivity(caseId: string, activityType: String): Observable<Activity[]> {
    const url = this.activityUrl() + `/cases/${caseId}/activity`;
    let body = { activity: activityType};
    return this.http
      .post(url, body, null, false)
      .map(response => response.json());
  }

  verifyUserIsAuthorized(): void {
    if (this.activityUrl() && this.userAuthorised === undefined) {
      this.getActivities(DUMMY_CASE_REFERENCE).subscribe(
        data => this.userAuthorised = true,
        error => {
            if (error.status === 403) {
              this.userAuthorised = false;
            } else {
              this.userAuthorised = true
            }
        }
      );
    }
  }

  private activityUrl(): string {
    return this.appConfig.getActivityUrl();
  }

  get isEnabled(): boolean {
    return this.activityUrl() && this.userAuthorised;
}

}
