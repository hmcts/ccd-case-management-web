import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { DebugElement } from '@angular/core';
import { CoreComponent } from './core.component';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { attr } from '../test/helpers';
import { OAuth2Service } from './auth/oauth2.service';
import { HttpService } from './http/http.service';
import { AppConfig } from '../app.config';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import { CcdBrowserSupportComponent } from '../core/ccd-browser-support/ccd-browser-support.component';

describe('CoreComponent', () => {

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
  let httpService: any;
  let appConfig: any;
  let browserSupport: any;
  let deviceServiceArg: any;
  let oauth2Service: any;
  const SMART_SURVEY_URL = 'https://www.smartsurvey.co.uk/s/CCDfeedback/';

  beforeEach(async(() => {

    jurisdictionService = new JurisdictionService();
    httpService = createSpyObj('HttpService', ['get']);
    appConfig = createSpyObj('AppConfig', ['get', 'getSmartSurveyUrl']);
    browserSupport = createSpyObj('CcdBrowserSupportComponent', ['isUnsupportedBrowser']);
    oauth2Service = createSpyObj('AppConfig', ['signOut']);
    appConfig.getSmartSurveyUrl.and.returnValue(SMART_SURVEY_URL);

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
      isSolicitor: createSpy()
    };

    profile.isSolicitor.and.returnValue(false);
    // TODO Write test where `isSolicitor()` is true

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
