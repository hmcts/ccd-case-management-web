import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';

// TODO make this configurable
const RETRY = 5;
const NEXT_POLL_REQUEST_MS = 5000;
const MAX_REQUEST_PER_BATCH = 10;
const BATCH_COLLECTION_DELAY_MS = 1;

@Injectable()
export class ActivityPollingService {

  pendingRequests = new Map<string, Subject<Activity>>();
  subscriptions = new Map<string, Subject<Activity>>();
  private currentTimeoutHandle: any;

  constructor(private activityService: ActivityService, private ngZone: NgZone) {}

  /* Executes next request NEXT_POLL_REQUEST_MS sec after the previous one returned.
  In case of errors it retries RETRY times with incremental delay between each retry*/
  pollActivities(...caseIds: string[]): Observable<Activity[]> {
    return this.activityService.getActivities(...caseIds)
      .switchMap(
        (data) => Observable.timer(NEXT_POLL_REQUEST_MS)
                      .switchMap(() => this.pollActivities(...caseIds))
          .startWith(data)
      ).retryWhen(
        attempts =>
          attempts
            .zip(Observable.range(1, RETRY), (_, i) => i)
            .flatMap(i => {
          // console.log('retrying fetching of activity. Delay retry by ' + i + ' second(s)');
              return Observable.timer(i * 1000);
            }));
  }

  subscribeToActivity(caseId: string, done: (activity: Activity) => void): Subscription {
    let subsctiption: Subscription;
    if (this.pendingRequests.has(caseId)) {
      subsctiption = this.pendingRequests.get(caseId).subscribe(done);
    } else {
      let subject = new Subject<Activity>();
      subsctiption = subject.subscribe(done);
      this.pendingRequests.set(caseId, subject);
    }

    if (this.pendingRequests.size === 1) {
      this.ngZone.runOutsideAngular(() => {
        this.currentTimeoutHandle = setTimeout(
          () => this.ngZone.run(() => this.flushRequests()),
          BATCH_COLLECTION_DELAY_MS);
      });
    }

    if (this.pendingRequests.size >= MAX_REQUEST_PER_BATCH) {
      this.flushRequests();
    }
    console.log('subscribe map size:' + this.subscriptions.size);
    return subsctiption;
  }

  unsubscribeFromActivity(caseId: string) {
    if (this.pendingRequests.has(caseId)) {
      console.log(`pendingRequests unsubscribed for ${caseId}`);
      this.pendingRequests.get(caseId).unsubscribe();
    }

    if (this.subscriptions.has(caseId)) {
      console.log(`subscription unsubscribed for ${caseId}`);
      this.subscriptions.get(caseId).unsubscribe();
    }
  }

  // public clearSubsctiptions(): void {
  //   this.subscriptions.clear();
  // }

  public flushRequests(): void {
    if (this.currentTimeoutHandle) {
      clearTimeout(this.currentTimeoutHandle);
      this.currentTimeoutHandle = undefined;
    }

    const requests = new Map(this.pendingRequests);
    this.subscriptions = new Map([...Array.from(this.subscriptions.entries()), ...Array.from(this.pendingRequests.entries())]);
    this.pendingRequests.clear();

    this.performBatchRequest(requests);
  }

  protected performBatchRequest(requests: Map<string, Subject<Activity>>): void {
    const caseIds = Array.from(requests.keys()).join();
    // console.log('issuing batch request for cases: '+ caseIds);
    this.pollActivities(caseIds).subscribe(
      (activities: Activity[]) => {
        activities.forEach((activity) => {
            requests.get(activity.caseId).next(activity);
        });
      },
      (err) => {
        console.log('error: ' + err);
        Array.from(requests.values()).forEach((subject) => subject.error(err));
      }
    );
  }

}
