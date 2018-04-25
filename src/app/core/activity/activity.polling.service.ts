import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/Subject';
import polling from 'rx-polling';

// TODO make this configurable
const RETRY = 5;
const NEXT_POLL_REQUEST_MS = 5000;
const MAX_REQUEST_PER_BATCH = 25;
const BATCH_COLLECTION_DELAY_MS = 1;

/* Execute poll requests every NEXT_POLL_REQUEST_MS msec.
  In case of errors retry RETRY times */
const POLL_CONFIG = {
  interval: NEXT_POLL_REQUEST_MS,
  attempts: RETRY,
};

@Injectable()
export class ActivityPollingService {

  pendingRequests = new Map<string, Subject<Activity>>();
  private currentTimeoutHandle: any;

  pollActivitiesSubscription: Subscription;

  constructor(private activityService: ActivityService, private ngZone: NgZone) {}

  pollActivities(...caseIds: string[]): Observable<Activity[]> {
    if (!this.isEnabled) {
      return Observable.empty();
    }

    return polling(this.activityService.getActivities(...caseIds), POLL_CONFIG);
  }

  subscribeToActivity(caseId: string, done: (activity: Activity) => void): Subject<Activity> {
    if (!this.isEnabled) {
      return new Subject<Activity>();
    }

    let subject = this.pendingRequests.get(caseId);
    if (subject) {
      subject.subscribe(done);
    } else {
      subject = new Subject<Activity>();
      subject.subscribe(done);
      this.pendingRequests.set(caseId, subject);
    }
    if (this.pendingRequests.size === 1) {
      this.ngZone.runOutsideAngular(() => {
        this.currentTimeoutHandle = setTimeout(
          () => this.ngZone.run(() => {
            // console.log('timeout: flushing requests')
            this.flushRequests();
          }),
          BATCH_COLLECTION_DELAY_MS);
      });
    }

    if (this.pendingRequests.size >= MAX_REQUEST_PER_BATCH) {
      // console.log('max pending hit: flushing requests');
      this.flushRequests();
    }
    return subject;
  }

  stopPolling() {
    this.pollActivitiesSubscription.unsubscribe();
  }

  public flushRequests(): void {
    if (this.currentTimeoutHandle) {
      clearTimeout(this.currentTimeoutHandle);
      this.currentTimeoutHandle = undefined;
    }

    const requests = new Map(this.pendingRequests);
    this.pendingRequests.clear();
    this.performBatchRequest(requests);
  }

  protected performBatchRequest(requests: Map<string, Subject<Activity>>): void {
    const caseIds = Array.from(requests.keys()).join();
    // console.log('issuing batch request for cases: ' + caseIds);
    this.pollActivitiesSubscription = this.pollActivities(caseIds).subscribe(
      (activities: Activity[]) => {
        activities.forEach((activity) => {
          // console.log('pushing activity: ' + activity.caseId);
          requests.get(activity.caseId).next(activity);
        });
      },
      (err) => {
        console.log('error: ' + err);
        Array.from(requests.values()).forEach((subject) => subject.error(err));
      }
    );
  }

  postViewActivity(caseId: string): Observable<Activity[]> {
    return this.postActivity(caseId, ActivityService.ACTIVITY_VIEW);
  }

  postEditActivity(caseId: string): Observable<Activity[]> {
    return this.postActivity(caseId, ActivityService.ACTIVITY_EDIT);
  }

  private postActivity(caseId: string, activityType: string): Observable<Activity[]> {
    if (!this.isEnabled) {
      return Observable.empty();
    }

    return this.activityService.postActivity(caseId, activityType)
      .switchMap(
        (data) => Observable.timer(NEXT_POLL_REQUEST_MS)
          .switchMap(() => this.postActivity(caseId, activityType))
          .startWith(data)
      ).retryWhen(
        attempts =>
          attempts
            .zip(Observable.range(1, RETRY), (_, i) => i)
            .flatMap(i => {
              // console.log('retrying fetching of activity. Delay retry by ' + i + ' second(s)');
              return Observable.timer(i * 1000);
            })
      );
  }

  get isEnabled(): boolean {
    return this.activityService.isEnabled;
  }
}
