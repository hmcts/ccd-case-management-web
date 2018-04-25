import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityService } from './activity.service';

@Injectable()
export class ActivityResolver implements Resolve<Boolean> {

  constructor(private activityService: ActivityService) {}

  resolve(): Observable<Boolean> {
    this.activityService.verifyUserIsAuthorized();
    return Observable.of(true);
  }

}
