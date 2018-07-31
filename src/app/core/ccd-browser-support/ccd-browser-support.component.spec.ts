import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppConfig } from '../../app.config';
import createSpyObj = jasmine.createSpyObj;
import { DeviceDetectorService } from 'ngx-device-detector';
import { CcdBrowserSupportComponent } from './ccd-browser-support.component';

describe('CcdBrowserSupportComponent', () => {
  let component: CcdBrowserSupportComponent;
  let fixture: ComponentFixture<CcdBrowserSupportComponent>;
  let appConfig: any;
  let deviceService: any;
  let deviceServiceArg: any;
  const UNSUPPORTED_BROWSER_URL = 'https://www.gov.uk/help/browsers';
  const CHROME_MIN_REQUIRED_VERSION = '67';
  const IE_MIN_REQUIRED_VERSION = 11;
  const EDGE_MIN_REQUIRED_VERSION = 17;
  const FIREFOX_MIN_REQUIRED_VERSION = 60;

  beforeEach(async(() => {
    appConfig = createSpyObj('AppConfig', ['get', 'getUnsupportedBrowserUrl', 'getChromeMinRequiredVersion']);
    appConfig.getUnsupportedBrowserUrl.and.returnValue(UNSUPPORTED_BROWSER_URL);
    deviceService = createSpyObj('DeviceDetectorService', ['getDeviceInfo']);
    const deviceInfo = {
      'userAgent': 'nghcilwoy',
      'os': 'XJO',
      'browser': 'chrome',
      'device': 'green tea',
      'os_version': '10.5',
      'browser_version': '67.0'
    };
    deviceService.getDeviceInfo.and.returnValue(deviceInfo);
    TestBed.configureTestingModule({
      declarations: [ CcdBrowserSupportComponent ],
      providers: [
        { provide: AppConfig, useValue: appConfig },
        { provide: DeviceDetectorService, useValue: deviceService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdBrowserSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the unsupported browser url', () => {
    expect(component).toBeTruthy();
    expect(component.getUnsupportedBrowserUrl()).toEqual(UNSUPPORTED_BROWSER_URL);
  });

  it('should hide when hide link clicked', () => {
    expect(component).toBeTruthy();
    component.hideUnsupportedBrowser();
    expect(component.showUnsupportedBrowser).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not display if unsupported browser', function () {
    expect(component).toBeTruthy();
    expect(component.isUnsupportedBrowser()).toBeFalsy();
  });
});
