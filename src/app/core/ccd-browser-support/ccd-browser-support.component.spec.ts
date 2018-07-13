import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppConfig } from '../../app.config';
import createSpyObj = jasmine.createSpyObj;

import { CcdBrowserSupportComponent } from './ccd-browser-support.component';

describe('CcdBrowserSupportComponent', () => {
  let component: CcdBrowserSupportComponent;
  let fixture: ComponentFixture<CcdBrowserSupportComponent>;
  let appConfig: any;
  const UNSUPPORTED_BROWSER_URL = 'https://www.gov.uk/help/browsers';
  const CHROME_VERSION = 67;
  const IE_VERSION = 11;
  const EDGE_VERSION = 17;
  const FIREFOX_VERSION = 60;

  beforeEach(async(() => {
    appConfig = createSpyObj('AppConfig', ['get', 'getUnsupportedBrowserUrl']);
    appConfig.getUnsupportedBrowserUrl.and.returnValue(UNSUPPORTED_BROWSER_URL);
    TestBed.configureTestingModule({
      declarations: [ CcdBrowserSupportComponent ],
      providers: [
        { provide: AppConfig, useValue: appConfig },
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
});
