
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

fdescribe('ActivityPollingService', () => {

  beforeEach(() => {
    ngZone = jasmine.createSpyObj<NgZone>('ngZone', ['run', 'runOutsideAngular']);
    activityService = jasmine.createSpyObj<ActivityService>('activityService', ['getActivities']);
    activityService.getActivities.and.returnValue(switchMap);
    activityService.isEnabled = true;

    activityPollingService = new ActivityPollingService(activityService, ngZone);
  });

  afterEach(() => {
  });

  it('should accesss activityService for pollActivities', () => {
    activityPollingService.pollActivities('');
    expect(activityService.getActivities).toHaveBeenCalled();
  });

  it('should accesss activityService for subscribe', () => {
    activityPollingService.subscribeToActivity('222', () => ({}));
    expect(ngZone.runOutsideAngular).toHaveBeenCalled();
  });

  it('should not accesss activityService for pollActivities when disabled', () => {
    activityService.isEnabled = false;
    activityPollingService.pollActivities('');

    expect(activityService.getActivities).not.toHaveBeenCalled();
  });

  it('should not accesss activityService for pollActivities when disabled', () => {
    activityService.isEnabled = false;
    activityPollingService.subscribeToActivity('222', () => ({}));

    expect(ngZone.runOutsideAngular).not.toHaveBeenCalled();
  });

  it('should clear pending requests after flushRequests is called', () => {
    activityPollingService.subscribeToActivity('222', () => ({}));
    expect(ngZone.runOutsideAngular).toHaveBeenCalled();
    activityPollingService.flushRequests();
    expect(activityPollingService.pendingRequests.size).toEqual(0);
  });
});
