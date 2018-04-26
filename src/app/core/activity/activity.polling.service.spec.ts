
import { ActivityService } from './activity.service';
import { ActivityPollingService } from './activity.polling.service';
import { NgZone } from '@angular/core';

let ngZone: any;
let activityService: any;
let activityPollingService: ActivityPollingService;

const switchMap = {
  switchMap: () => ({
    retryWhen: () => ({
      subscribe: () => ({})
    })
  })
};

describe('ActivityPollingService', () => {

  beforeEach(() => {
    ngZone = jasmine.createSpyObj<NgZone>('ngZone', ['run', 'runOutsideAngular']);
    activityService = jasmine.createSpyObj<ActivityService>('activityService', ['getActivities']);
    activityService.getActivities.and.returnValue(switchMap);

    activityPollingService = new ActivityPollingService(activityService, ngZone);
  });

  afterEach(() => {
  });

  it('should accesss activityService for pollActivities', () => {
    activityPollingService.pollActivities('');
    expect(activityService.getActivities).toHaveBeenCalled();
  });

  it('should accesss activityService for pollActivities', () => {
    activityPollingService.subscribeToActivity('222', () => ({}));
    expect(ngZone.runOutsideAngular).toHaveBeenCalled();
  });

  it('should clear pending requests after flushRequests is called', () => {
    activityPollingService.subscribeToActivity('222', () => ({}));
    expect(ngZone.runOutsideAngular).toHaveBeenCalled();
    activityPollingService.flushRequests();
    expect(activityPollingService.pendingRequests.size).toEqual(0);
  });
});
