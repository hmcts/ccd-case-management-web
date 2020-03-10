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
  const UNSUPPORTED_BROWSER_URL = 'https://www.gov.uk/help/browsers';

  beforeEach(async(() => {
    appConfig = createSpyObj('AppConfig', ['get', 'getUnsupportedBrowserUrl',
      'getChromeMinRequiredVersion', 'getIEMinRequiredVersion', 'getFirefoxMinRequiredVersion',
      'getEdgeMinRequiredVersion']);
    appConfig.getUnsupportedBrowserUrl.and.returnValue(UNSUPPORTED_BROWSER_URL);
    deviceService = createSpyObj('DeviceDetectorService', ['getDeviceInfo']);

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

  it('should not display if unsupported chrome browser', function () {
    const deviceInfo = {
      'browser': 'chrome',
      'browser_version': '67.0'
    };
    deviceService.getDeviceInfo.and.returnValue(deviceInfo);

    expect(component).toBeTruthy();
    expect(component.isUnsupportedBrowser()).toBeFalsy();
  });

  it('should not display if unsupported ie browser', function () {
    const deviceInfo = {
      'browser': 'ie',
      'browser_version': '11'
    };
    deviceService.getDeviceInfo.and.returnValue(deviceInfo);

    expect(component).toBeTruthy();
    expect(component.isUnsupportedBrowser()).toBeFalsy();
  });

  it('should not display if unsupported firefox browser', function () {
    const deviceInfo = {
      'browser': 'firefox',
      'browser_version': '71'
    };
    deviceService.getDeviceInfo.and.returnValue(deviceInfo);

    expect(component).toBeTruthy();
    expect(component.isUnsupportedBrowser()).toBeFalsy();
  });

  it('should not display if unsupported ms-edge browser', function () {
    const deviceInfo = {
      'browser': 'ms-edge',
      'browser_version': '77'
    };
    deviceService.getDeviceInfo.and.returnValue(deviceInfo);

    expect(component).toBeTruthy();
    expect(component.isUnsupportedBrowser()).toBeFalsy();
  });
});
