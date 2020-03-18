import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { CoreComponent } from './core.component';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { attr } from '../test/helpers';
import { OAuth2Service } from './auth/oauth2.service';
import { AppConfig } from '../app.config';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import { CcdBrowserSupportComponent } from '../core/ccd-browser-support/ccd-browser-support.component';
import { HttpService, Jurisdiction, JurisdictionService, Banner, BannersService, JurisdictionUIConfig, UrlTransformationService } from '@hmcts/ccd-case-ui-toolkit';
import { NavigationListenerService } from './utils/navigation-listener.service';
import { Observable } from 'rxjs';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';
import { MatDialog } from '@angular/material';
import { Response, ResponseOptions } from '@angular/http';

describe('CoreComponent', () => {

  const BANNERS: Banner[] = [
    {
      bannerDescription: 'Test Banner Description',
      bannerEnabled: true,
      bannerUrl: 'http://localhost:3451/test',
      bannerUrlText: 'click here to see it.>>>',
      bannerViewed: false
    }
  ];

  const SELECTED_JURISDICTION: Jurisdiction = {
    id: 'DIVORCE',
    name: 'Divorce',
    description: 'Divorce description',
    caseTypes: []
  };

  let HeaderComponent: any = MockComponent({ selector: 'cut-header-bar', inputs: [
      'title',
      'username',
      'isSolicitor',
    ]});

  let PhaseComponent: any = MockComponent({ selector: 'cut-phase-bar', inputs: [
      'phaseLabel',
      'phaseLink',
      'isSolicitor',
    ]});

  let BrowserSupportComponent: any = MockComponent({ selector: 'ccd-browser-support', inputs: [
      'isSolicitor',
    ]});

  const TEMPLATE =
    `<div>
      <nav class="cut-nav-bar">
          <ng-content select="[leftNavLinks]"></ng-content>
          <ng-content select="[rightNavLinks]"></ng-content>
      </nav>
    </div>
    `;

  let NavigationComponent: any = MockComponent({ selector: 'cut-nav-bar', inputs: [
      'isSolicitor',
    ], template: TEMPLATE});

  let NavigationItemComponent: any = MockComponent({ selector: 'cut-nav-item', inputs: [
      'link',
      'label'
    ]});

  let BannerComponent: any = MockComponent({ selector: 'ccd-banner', inputs: ['banners']});

  let AlertComponent: any = MockComponent({ selector: 'ccd-alert', inputs: []});

  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});

  let FooterComponent: any = MockComponent({ selector: 'cut-footer-bar', inputs: [
      'email',
      'phone',
      'workhours',
      'isSolicitor',
    ]});

  let BlankComponent: any = MockComponent({ selector: 'blank-component', inputs: []});

  let profile;

  let mockRoute;

  const $LEFT_MENU_LINKS = By.css('.nav-left #menu-links-left');
  const $RIGHT_MENU_LINKS = By.css('.nav-right #menu-links-right');

  let comp: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;
  let bannersService: any;
  let navigationListenerService: NavigationListenerService;
  let httpService: any;
  let appConfig: any;
  let browserSupport: any;
  let oauth2Service: any;
  const SMART_SURVEY_URL = 'https://www.smartsurvey.co.uk/s/CCDfeedback/';
  const BANNERS_URL = 'http://localhost:3451/api/display/banners';
  let windowService: any;
  let dialog: any;
  let urlTransformationService: any;

  beforeEach(async(() => {
    navigationListenerService = createSpyObj('NavigationListenerService', ['init']);
    navigationListenerService = createSpyObj('NavigationListenerService', ['init']);
    httpService = createSpyObj<HttpService>('httpService', ['get']);
    httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify([])
    }))));
    appConfig = createSpyObj('AppConfig', ['get', 'getSmartSurveyUrl', 'getBannersUrl', 'getShutterRedirectUrl', 'getJurisdictionUiConfigsUrl']);
    jurisdictionService = new JurisdictionService(httpService, appConfig);
    browserSupport = createSpyObj('CcdBrowserSupportComponent', ['isUnsupportedBrowser']);
    oauth2Service = createSpyObj('AppConfig', ['signOut']);
    appConfig.getSmartSurveyUrl.and.returnValue(SMART_SURVEY_URL);
    appConfig.getBannersUrl.and.returnValue(BANNERS_URL);
    bannersService = createSpyObj<BannersService>('bannersService', ['getBanners']);
    bannersService.getBanners.and.returnValue(Observable.of());
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);
    dialog = createSpyObj<MatDialog>('dialog', ['open']);
    urlTransformationService =  createSpyObj<UrlTransformationService>('urlTransformationService', ['getPreferredEquivalentOf']);
    profile = {
      user: {
        idam: {
          email: 'hello@world.co.uk',
          forename: 'forename',
          surname: 'surname'
        }
      },
      default: {
        workbasket: {
          jurisdiction_id: 'PROBATE'
        }
      },
      jurisdictions: [
        {
          id: 'PROBATE',
          name: 'Probate',
          description: 'Probate descritpion',
          case_types: []
        },
        {
          id: 'DIVORCE',
          name: 'Divorce',
          description: 'Divorce descritpion',
          case_types: []
        }
      ],
      isSolicitor: createSpy(),
      isCourtAdmin: createSpy()
    };

    profile.isSolicitor.and.returnValue(false);
    // TODO Write test where `isSolicitor()` is true
    profile.isCourtAdmin.and.returnValue(false);

    mockRoute = {
      snapshot: {
        data: {
          profile: profile
        }
      }
    };

    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(
            [
              {path: 'list/case', component: BlankComponent},
              {path: 'create/case', component: BlankComponent}
            ]
          )
        ],
        declarations: [
          CoreComponent,
          // Mocks
          AlertComponent,
          BannerComponent,
          RouterOutlet,
          HeaderComponent,
          PhaseComponent,
          FooterComponent,
          PhaseComponent,
          BrowserSupportComponent,
          NavigationComponent,
          NavigationItemComponent,
          BlankComponent,
        ],
        providers: [
          provideRoutes([]),
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: HttpService, useValue: httpService },
          { provide: AppConfig, useValue: appConfig },
          { provide: OAuth2Service, useValue: oauth2Service },
          { provide: CcdBrowserSupportComponent, useValue: browserSupport },
          { provide: NavigationListenerService, useValue: navigationListenerService },
          { provide: BannersService, useValue: bannersService },
          { provide: WindowService, useValue: windowService },
          { provide: MatDialog, useValue: dialog },
          { provide: UrlTransformationService, useValue: urlTransformationService }
        ]
      })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
  });

  it('should have a `beta-bar`', () => {

    let betaBarEl = de.query(By.directive(PhaseComponent));

    expect(betaBarEl).not.toBeNull();

    let betaBar = betaBarEl.componentInstance;

    expect(betaBar.phaseLabel).toEqual('BETA');
    expect(betaBar.phaseLink).toEqual('https://www.smartsurvey.co.uk/s/CCDfeedback/');
  });

  it('should have a `header-bar`', () => {
    let headerBarEl = de.query(By.directive(HeaderComponent));

    expect(headerBarEl).not.toBeNull();

    let headerBar = headerBarEl.componentInstance;

    expect(headerBar.title).toEqual('Probate');
    expect(headerBar.username).toEqual('Forename Surname');
  });

  it('should have a `nav-bar` and two `nav-item`s not on Case List', () => {
    spyOn(comp.router, 'isActive').and.callFake((url) => {
      return url !== '/list/case';
    });
    fixture.detectChanges();

    let navBarEl = de.query(By.directive(NavigationComponent));
    let leftMenuLinkEl = de.query($LEFT_MENU_LINKS);
    let rightMenuLinkEl = de.query($RIGHT_MENU_LINKS);

    expect(navBarEl).not.toBeNull();
    expect(navBarEl.nativeElement.tagName).toBe('CUT-NAV-BAR');

    expect(leftMenuLinkEl).not.toBeNull();
    expect(leftMenuLinkEl.children.length).toBe(2);
    expect(leftMenuLinkEl.children[0].children[0].nativeElement.tagName).toBe('CUT-NAV-ITEM');
    expect(attr(leftMenuLinkEl.children[0].children[0], 'imageLink')).toBeNull();

    expect(leftMenuLinkEl.children[1].children[0].nativeElement.tagName).toBe('CUT-NAV-ITEM');
    expect(attr(leftMenuLinkEl.children[1].children[0], 'imageLink')).toBeNull();

    expect(rightMenuLinkEl.children.length).toBe(1);
    expect(rightMenuLinkEl.children[0].children[0].nativeElement.tagName).toBe('CUT-NAV-ITEM');
    expect(attr(rightMenuLinkEl.children[0].children[0], 'imageLink')).toEqual('/img/icon-search-white.png');
  });

  it('should have a `nav-bar` and one `nav-item` on Case List page', () => {
    spyOn(comp.router, 'isActive').and.callFake((url) => {
      return url === '/list/case';
    });
    fixture.detectChanges();

    let navBarEl = de.query(By.directive(NavigationComponent));
    let leftMenuLinkEl = de.query($LEFT_MENU_LINKS);
    let rightMenuLinkEl = de.query($RIGHT_MENU_LINKS);

    expect(navBarEl).not.toBeNull();
    expect(navBarEl.nativeElement.tagName).toBe('CUT-NAV-BAR');
    expect(leftMenuLinkEl.children.length).toBe(1);
    expect(leftMenuLinkEl.children[0].children[0].nativeElement.tagName).toBe('CUT-NAV-ITEM');
    expect(attr(leftMenuLinkEl.children[0].children[0], 'imageLink')).toBeNull();

    expect(rightMenuLinkEl.children.length).toBe(1);
    expect(rightMenuLinkEl.children[0].children[0].nativeElement.tagName).toBe('CUT-NAV-ITEM');
    expect(attr(rightMenuLinkEl.children[0].children[0], 'imageLink')).toEqual('/img/icon-search-white.png');
  });

  it('should have a `router-outlet`', () => {
    let routerOutletEl = de.query(By.directive(RouterOutlet));

    expect(routerOutletEl).not.toBeNull();
  });

  it('should have a `footer-bar`', () => {
    let footerBarEl = de.query(By.directive(FooterComponent));

    expect(footerBarEl).not.toBeNull();

    let footerBar = footerBarEl.componentInstance;

    expect(footerBar.email).toEqual('service-desk@hmcts.gsi.gov.uk');
    expect(footerBar.phone).toEqual('0207 633 4140');
    expect(footerBar.workhours).toEqual('Monday to Friday, 8am to 6pm (excluding bank holidays)');
  });

  it('should initially select jurisdiction id', () => {
    let headerBar = de.query(By.directive(HeaderComponent));

    expect(headerBar).toBeTruthy();
    expect(headerBar.componentInstance.title).toEqual('Probate');
  });

  it('should update jurisdiction id if notified about selected jurisdiction', () => {
    let headerBar = de.query(By.directive(HeaderComponent));

    expect(headerBar).toBeTruthy();
    expect(headerBar.componentInstance.title).toEqual('Probate');

    jurisdictionService.announceSelectedJurisdiction(SELECTED_JURISDICTION);
    fixture.detectChanges();

    expect(headerBar).toBeTruthy();
    expect(headerBar.componentInstance.title).toEqual('Divorce');
  });

  it('should call OAuth2 sign out on component sign out', () => {
    comp.signOut();

    expect(oauth2Service.signOut).toHaveBeenCalled();
  });
});

describe('CoreComponent when no workbasket defaults in the profile', () => {

  let HeaderComponent: any = MockComponent({ selector: 'cut-header-bar', inputs: [
      'title',
      'username',
      'isSolicitor',
    ]});

  let PhaseComponent: any = MockComponent({ selector: 'cut-phase-bar', inputs: [
      'phaseLabel',
      'phaseLink',
      'isSolicitor',
    ]});

  let BrowserSupportComponent: any = MockComponent({ selector: 'ccd-browser-support', inputs: [
      'isSolicitor',
    ]});

  const TEMPLATE =
    `<div>
      <nav class="cut-nav-bar">
          <ng-content select="[leftNavLinks]"></ng-content>
          <ng-content select="[rightNavLinks]"></ng-content>
      </nav>
    </div>
    `;

  let NavigationComponent: any = MockComponent({ selector: 'cut-nav-bar', inputs: [
      'isSolicitor',
    ], template: TEMPLATE});

  let NavigationItemComponent: any = MockComponent({ selector: 'cut-nav-item', inputs: [
      'link',
      'label'
    ]});

  let BannerComponent: any = MockComponent({ selector: 'ccd-banner', inputs: ['banners']});

  let AlertComponent: any = MockComponent({ selector: 'ccd-alert', inputs: []});

  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});

  let FooterComponent: any = MockComponent({ selector: 'cut-footer-bar', inputs: [
      'email',
      'phone',
      'workhours',
      'isSolicitor',
    ]});

  let BlankComponent: any = MockComponent({ selector: 'blank-component', inputs: []});

  let profile;

  let mockRoute;
  let fixture: ComponentFixture<CoreComponent>;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;
  let httpService: any;
  let appConfig: any;
  let browserSupport: any;
  let oauth2Service: any;
  let navigationListenerService: NavigationListenerService;
  let bannersService: any;
  let windowService: any;
  let dialog: any;
  let urlTransformationService: any;

  beforeEach(async(() => {

    httpService = createSpyObj<HttpService>('httpService', ['get']);
    httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify([])
    }))));
    appConfig = createSpyObj('AppConfig', ['get', 'getSmartSurveyUrl', 'getBannersUrl', 'getShutterRedirectUrl', 'getJurisdictionUiConfigsUrl']);
    jurisdictionService = new JurisdictionService(httpService, appConfig);
    browserSupport = createSpyObj('CcdBrowserSupportComponent', ['isUnsupportedBrowser']);
    oauth2Service = createSpyObj('AppConfig', ['signOut']);
    navigationListenerService = createSpyObj('NavigationListenerService', ['init']);
    bannersService = createSpyObj<BannersService>('bannersService', ['getBanners']);
    bannersService.getBanners.and.returnValue(Observable.of());
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);
    dialog = createSpyObj<MatDialog>('dialog', ['open']);
    urlTransformationService =  createSpyObj<UrlTransformationService>('urlTransformationService', ['getPreferredEquivalentOf']);
    profile = {
      user: {
        idam: {
          email: 'hello@world.co.uk',
          forename: 'forename',
          surname: 'surname'
        }
      },
      default: {
      },
      jurisdictions: [
        {
          id: 'PROBATE',
          name: 'Probate',
          description: 'Probate descritpion',
          case_types: []
        }
      ],
      isSolicitor: createSpy(),
      isCourtAdmin: createSpy()
    };

    mockRoute = {
      snapshot: {
        data: {
          profile: profile
        }
      }
    };

    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(
            [
              {path: 'list/case', component: BlankComponent},
              {path: 'create/case', component: BlankComponent}
            ]
          )
        ],
        declarations: [
          CoreComponent,
          // Mocks
          AlertComponent,
          BannerComponent,
          RouterOutlet,
          HeaderComponent,
          PhaseComponent,
          FooterComponent,
          PhaseComponent,
          BrowserSupportComponent,
          NavigationComponent,
          NavigationItemComponent,
          BlankComponent,
        ],
        providers: [
          provideRoutes([]),
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: AppConfig, useValue: appConfig },
          { provide: OAuth2Service, useValue: oauth2Service },
          { provide: CcdBrowserSupportComponent, useValue: browserSupport },
          { provide: NavigationListenerService, useValue: navigationListenerService },
          { provide: BannersService, useValue: bannersService },
          { provide: WindowService, useValue: windowService },
          { provide: MatDialog, useValue: dialog },
          { provide: UrlTransformationService, useValue: urlTransformationService }
        ]
      })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();

    let comp = fixture.componentInstance;

    de = fixture.debugElement;
  });

  it('should not update jurisdiction id in the title when no workbasket defaults', () => {
    let headerBar = de.query(By.directive(HeaderComponent));

    expect(headerBar).toBeTruthy();
    expect(headerBar.componentInstance.title).toBeUndefined();

  });

});

describe('CoreComponent when no defaults in the profile', () => {

  let HeaderComponent: any = MockComponent({ selector: 'cut-header-bar', inputs: [
      'title',
      'username',
      'isSolicitor',
    ]});

  let PhaseComponent: any = MockComponent({ selector: 'cut-phase-bar', inputs: [
      'phaseLabel',
      'phaseLink',
      'isSolicitor',
    ]});

  let BrowserSupportComponent: any = MockComponent({ selector: 'ccd-browser-support', inputs: [
      'isSolicitor',
    ]});

  const TEMPLATE =
    `<div>
      <nav class="cut-nav-bar">
          <ng-content select="[leftNavLinks]"></ng-content>
          <ng-content select="[rightNavLinks]"></ng-content>
      </nav>
    </div>
    `;

  let NavigationComponent: any = MockComponent({ selector: 'cut-nav-bar', inputs: [
      'isSolicitor',
    ], template: TEMPLATE});

  let NavigationItemComponent: any = MockComponent({ selector: 'cut-nav-item', inputs: [
      'link',
      'label'
    ]});

  let BannerComponent: any = MockComponent({ selector: 'ccd-banner', inputs: ['banners']});

  let AlertComponent: any = MockComponent({ selector: 'ccd-alert', inputs: []});

  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});

  let FooterComponent: any = MockComponent({ selector: 'cut-footer-bar', inputs: [
      'email',
      'phone',
      'workhours',
      'isSolicitor',
    ]});

  let BlankComponent: any = MockComponent({ selector: 'blank-component', inputs: []});

  let profile;

  let mockRoute;
  let fixture: ComponentFixture<CoreComponent>;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;
  let httpService: any;
  let appConfig: any;
  let browserSupport: any;
  let oauth2Service: any;
  let navigationListenerService: NavigationListenerService;
  let bannersService: any;
  let windowService: any;
  let dialog: any;
  let urlTransformationService: any;

  beforeEach(async(() => {

    httpService = createSpyObj<HttpService>('httpService', ['get']);
    httpService.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify([])
    }))));
    appConfig = createSpyObj('AppConfig', ['get', 'getSmartSurveyUrl', 'getBannersUrl', 'getShutterRedirectUrl', 'getJurisdictionUiConfigsUrl']);
    jurisdictionService = new JurisdictionService(httpService, appConfig);
    browserSupport = createSpyObj('CcdBrowserSupportComponent', ['isUnsupportedBrowser']);
    oauth2Service = createSpyObj('AppConfig', ['signOut']);
    navigationListenerService = createSpyObj('NavigationListenerService', ['init']);
    bannersService = createSpyObj<BannersService>('bannersService', ['getBanners']);
    bannersService.getBanners.and.returnValue(Observable.of());
    windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);
    dialog = createSpyObj<MatDialog>('dialog', ['open']);
    urlTransformationService =  createSpyObj<UrlTransformationService>('urlTransformationService', ['getPreferredEquivalentOf']);
    profile = {
      user: {
        idam: {
          email: 'hello@world.co.uk',
          forename: 'forename',
          surname: 'surname'
        }
      },
      default: {
        workbasket: {
        }
      },
      jurisdictions: [
        {
          id: 'PROBATE',
          name: 'Probate',
          description: 'Probate descritpion',
          case_types: []
        }
      ],
      isSolicitor: createSpy(),
      isCourtAdmin: createSpy()
    };

    mockRoute = {
      snapshot: {
        data: {
          profile: profile
        }
      }
    };

    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(
            [
              {path: 'list/case', component: BlankComponent},
              {path: 'create/case', component: BlankComponent}
            ]
          )
        ],
        declarations: [
          CoreComponent,
          // Mocks
          AlertComponent,
          BannerComponent,
          RouterOutlet,
          HeaderComponent,
          PhaseComponent,
          FooterComponent,
          PhaseComponent,
          BrowserSupportComponent,
          NavigationComponent,
          NavigationItemComponent,
          BlankComponent,
        ],
        providers: [
          provideRoutes([]),
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: AppConfig, useValue: appConfig },
          { provide: OAuth2Service, useValue: oauth2Service },
          { provide: CcdBrowserSupportComponent, useValue: browserSupport },
          { provide: NavigationListenerService, useValue: navigationListenerService },
          { provide: BannersService, useValue: bannersService },
          { provide: WindowService, useValue: windowService },
          { provide: MatDialog, useValue: dialog },
          { provide: UrlTransformationService, useValue: urlTransformationService }
        ]
      })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();

    let comp = fixture.componentInstance;

    de = fixture.debugElement;
  });

  it('should not update jurisdiction id in the title when no profile defaults', () => {
    let headerBar = de.query(By.directive(HeaderComponent));

    expect(headerBar).toBeTruthy();
    expect(headerBar.componentInstance.title).toBeUndefined();

  });

});

describe('CoreComponent no shutter dialog when all jurisdictions are not shuttered', () => {
  let HeaderComponent: any = MockComponent({ selector: 'cut-header-bar', inputs: [
      'title',
      'username',
      'isSolicitor',
    ]});

  let PhaseComponent: any = MockComponent({ selector: 'cut-phase-bar', inputs: [
      'phaseLabel',
      'phaseLink',
      'isSolicitor',
    ]});

  let BrowserSupportComponent: any = MockComponent({ selector: 'ccd-browser-support', inputs: [
      'isSolicitor',
    ]});

  const TEMPLATE =
    `<div>
      <nav class="cut-nav-bar">
          <ng-content select="[leftNavLinks]"></ng-content>
          <ng-content select="[rightNavLinks]"></ng-content>
      </nav>
    </div>
    `;

  let NavigationComponent: any = MockComponent({ selector: 'cut-nav-bar', inputs: [
      'isSolicitor',
    ], template: TEMPLATE});

  let NavigationItemComponent: any = MockComponent({ selector: 'cut-nav-item', inputs: [
      'link',
      'label'
    ]});

  let BannerComponent: any = MockComponent({ selector: 'ccd-banner', inputs: ['banners']});

  let AlertComponent: any = MockComponent({ selector: 'ccd-alert', inputs: []});

  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});

  let FooterComponent: any = MockComponent({ selector: 'cut-footer-bar', inputs: [
      'email',
      'phone',
      'workhours',
      'isSolicitor',
    ]});

  let BlankComponent: any = MockComponent({ selector: 'blank-component', inputs: []});

  let profile;

  let mockRoute;
  let fixture: ComponentFixture<CoreComponent>;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;
  let httpService: any;
  let appConfig: any;
  let browserSupport: any;
  let oauth2Service: any;
  let navigationListenerService: NavigationListenerService;
  let bannersService: any;
  let windowService: any;
  let dialog: any;
  let comp: CoreComponent;
  let urlTransformationService: any;

  beforeEach(async(() => {

    httpService = createSpyObj<HttpService>('httpService', ['get']);
    appConfig = createSpyObj('AppConfig', ['get', 'getSmartSurveyUrl', 'getBannersUrl', 'getShutterRedirectUrl', 'getJurisdictionUiConfigsUrl']);
    jurisdictionService = new JurisdictionService(httpService, appConfig);
    browserSupport = createSpyObj('CcdBrowserSupportComponent', ['isUnsupportedBrowser']);
    oauth2Service = createSpyObj('AppConfig', ['signOut']);
    navigationListenerService = createSpyObj('NavigationListenerService', ['init']);
    bannersService = createSpyObj<BannersService>('bannersService', ['getBanners']);
    bannersService.getBanners.and.returnValue(Observable.of());
    windowService = new WindowService();
    dialog = createSpyObj<MatDialog>('dialog', ['open']);
    urlTransformationService =  createSpyObj<UrlTransformationService>('urlTransformationService', ['getPreferredEquivalentOf']);

    profile = {
      user: {
        idam: {
          email: 'hello@world.co.uk',
          forename: 'forename',
          surname: 'surname'
        }
      },
      default: {
        workbasket: {
        }
      },
      jurisdictions: [
        {
          id: 'PROBATE',
          name: 'Probate',
          description: 'Probate descritpion',
          case_types: []
        }
      ],
      isSolicitor: createSpy(),
      isCourtAdmin: createSpy()
    };

    mockRoute = {
      snapshot: {
        data: {
          profile: profile
        }
      }
    };

    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(
            [
              {path: 'list/case', component: BlankComponent},
              {path: 'create/case', component: BlankComponent}
            ]
          )
        ],
        declarations: [
          CoreComponent,
          // Mocks
          AlertComponent,
          BannerComponent,
          RouterOutlet,
          HeaderComponent,
          PhaseComponent,
          FooterComponent,
          PhaseComponent,
          BrowserSupportComponent,
          NavigationComponent,
          NavigationItemComponent,
          BlankComponent,
        ],
        providers: [
          provideRoutes([]),
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: AppConfig, useValue: appConfig },
          { provide: OAuth2Service, useValue: oauth2Service },
          { provide: CcdBrowserSupportComponent, useValue: browserSupport },
          { provide: NavigationListenerService, useValue: navigationListenerService },
          { provide: BannersService, useValue: bannersService },
          { provide: WindowService, useValue: windowService },
          { provide: MatDialog, useValue: dialog },
          { provide: UrlTransformationService, useValue: urlTransformationService }
        ]
      })
      .compileComponents();  // compile template and css
  }));

  it('should not call shuttering logic when local store is available', () => {
    let jurisdictionConfigsArr: JurisdictionUIConfig[] = [
      {
        id: 'PROBATE',
        name: 'Probate',
        shuttered: true
      },
      {
        id: 'DIVORCE',
        name: 'Divorce',
        shuttered: true
      }
    ];
    spyOn(jurisdictionService, 'getJurisdictionUIConfigs').and.callFake(function() {
      return Observable.of(jurisdictionConfigsArr);
    });
    spyOn(windowService, 'getLocalStorage').and.callFake(function() {
      let param = arguments[0];
      if (param === 'UI_CONFIGS_CACHED') {
        return JSON.stringify(true);
      }
    });
    fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
    fixture.detectChanges();
    expect(windowService.getLocalStorage).toHaveBeenCalledWith('UI_CONFIGS_CACHED');
    expect(dialog.open).toHaveBeenCalledTimes(0);
  });

  it('should not show shuttering dialog when all jurisdicitons are shuttered', () => {
    let jurisdictionConfigsArr: JurisdictionUIConfig[] = [
      {
        id: 'PROBATE',
        name: 'Probate',
        shuttered: false
      },
      {
        id: 'DIVORCE',
        name: 'Divorce',
        shuttered: false
      }
    ];
    spyOn(jurisdictionService, 'getJurisdictionUIConfigs').and.callFake(function() {
      return Observable.of(jurisdictionConfigsArr);
    });
    spyOn(windowService, 'getLocalStorage').and.callFake(function() {
      let param = arguments[0];
      if (param === 'UI_CONFIGS_CACHED') {
        return null;
      }
    });
    fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    de = fixture.debugElement;
    expect(windowService.getLocalStorage).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledTimes(0);
  });

  it('should show shuttering dialog when some jurisdicitons are shuttered', () => {
    let jurisdictionConfigsArr: JurisdictionUIConfig[] = [
      {
        id: 'PROBATE',
        name: 'Probate',
        shuttered: true
      },
      {
        id: 'DIVORCE',
        name: 'Divorce',
        shuttered: false
      }
    ];
    spyOn(jurisdictionService, 'getJurisdictionUIConfigs').and.callFake(function() {
      return Observable.of(jurisdictionConfigsArr);
    });
    spyOn(windowService, 'getLocalStorage').and.callFake(function() {
      let param = arguments[0];
      if (param === 'UI_CONFIGS_CACHED') {
        return null;
      }
    });
    fixture = TestBed.createComponent(CoreComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    expect(windowService.getLocalStorage).toHaveBeenCalledWith('UI_CONFIGS_CACHED');
    expect(dialog.open).toHaveBeenCalledTimes(1);
  });
});
