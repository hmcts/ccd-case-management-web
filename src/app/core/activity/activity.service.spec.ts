
import { ActivityService } from './activity.service';
import { AppConfig } from '../../app.config';
import { HttpService } from '../http/http.service';

let httpService: any;
let appConfig: any;
let activityService: ActivityService;

const map = {
  map: () => ({})
};

describe('ActivityService', () => {

  beforeEach(() => {
    appConfig = jasmine.createSpyObj<AppConfig>('appConfig', ['getActivityUrl']);
    appConfig.getActivityUrl.and.returnValue('someUrl');
    httpService = jasmine.createSpyObj<HttpService>('httpService', ['get', 'post']);
    httpService.get.and.returnValue(map);
    httpService.post.and.returnValue(map);

    activityService = new ActivityService(httpService, appConfig);
  });

  afterEach(() => {
  });

  it('should access AppConfig and HttpService for getActivities', () => {
    activityService.getActivities('1111');
    expect(httpService.get).toHaveBeenCalled();
    expect(appConfig.getActivityUrl).toHaveBeenCalled();
  });

  it('should accesss AppConfig and HttpService for postActivity', () => {
    activityService.postActivity('1111', 'edit');
    expect(httpService.post).toHaveBeenCalled();
    expect(appConfig.getActivityUrl).toHaveBeenCalled();
  });

  it('should not access HttpService on getActivities when empty activity url', () => {
    appConfig.getActivityUrl.and.returnValue('');
    activityService.getActivities('1111');
    expect(httpService.get).not.toHaveBeenCalled();
    expect(appConfig.getActivityUrl).toHaveBeenCalled();
  });

  it('should not access HttpService on postActivity when empty activity url', () => {
    appConfig.getActivityUrl.and.returnValue('');
    activityService.postActivity('1111', 'edit');
    expect(httpService.post).not.toHaveBeenCalled();
    expect(appConfig.getActivityUrl).toHaveBeenCalled();
  });
});
