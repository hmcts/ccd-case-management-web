import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JurisdictionService } from '../shared/jurisdiction.service';
import { DebugElement } from '@angular/core';
import { CoreComponent } from './core.component';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';
import { Jurisdiction } from '../shared/domain/definition/jurisdiction.model';
import { attr } from '../test/helpers';
import { AuthService } from './auth/auth.service';
import { HttpService } from './http/http.service';
import createSpyObj = jasmine.createSpyObj;
import { AppConfig } from '../app.config';

fdescribe('CoreComponent', () => {

  const PROFILE = {
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
    isSolicitor: () => false
  };

  const SELECTED_JURISDICTION: Jurisdiction = {
    id: 'DIVORCE',
    name: 'Divorce',
    description: 'Divorce description'
  };

  let HeaderComponent: any = MockComponent({ selector: 'cut-header-bar', inputs: [
      'title',
      'isSolicitor',
      'username'
    ]});

  let PhaseComponent: any = MockComponent({ selector: 'cut-phase-bar', inputs: [
      'phaseLabel',
      'isSolicitor',
      'phaseLink'
    ]});

  const TEMPLATE =
    `<div>
      <nav class="cut-nav-bar">
          <ng-content select="[leftNavLinks]"></ng-content>
          <ng-content select="[rightNavLinks]"></ng-content>
      </nav>
    </div>
    `;

  let NavigationComponent: any = MockComponent({ selector: 'cut-nav-bar', template: TEMPLATE, inputs: [
    'isSolicitor'
  ]});

  let NavigationItemComponent: any = MockComponent({ selector: 'cut-nav-item', inputs: [
      'link',
      'label'
    ]});

  let AlertComponent: any = MockComponent({ selector: 'ccd-alert', inputs: []});

  let RouterOutlet: any = MockComponent({ selector: 'router-outlet', inputs: []});

  let FooterComponent: any = MockComponent({ selector: 'cut-footer-bar', inputs: [
      'email',
      'phone',
      'isSolicitor',
      'workhours'
    ]});

  let mockRouter: any = {
    'isActive': () => false
  };

  let mockRoute: any = {
    snapshot: {
      data: {
        profile: PROFILE
      }
    }
  };

  const $LEFT_MENU_LINKS = By.css('.nav-left #menu-links-left');
  const $RIGHT_MENU_LINKS = By.css('.nav-right #menu-links-right');

  let comp: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let de: DebugElement;
  let jurisdictionService: JurisdictionService;
  let httpService: any;
  let appConfig: any;
  let authService: any;

  beforeEach(async(() => {

    jurisdictionService = new JurisdictionService();
    httpService = createSpyObj('HttpService', ['get']);
    appConfig = createSpyObj('AppConfig', ['get']);
    authService = createSpyObj('AppConfig', ['signIn']);

    TestBed
      .configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          CoreComponent,
          // Mocks
          AlertComponent,
          RouterOutlet,
          HeaderComponent,
          PhaseComponent,
          FooterComponent,
          PhaseComponent,
          NavigationComponent,
          NavigationItemComponent
        ],
        providers: [
          provideRoutes([]),
          { provide: Router, useValue: mockRouter},
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: JurisdictionService, useValue: jurisdictionService },
          { provide: HttpService, useValue: httpService },
          { provide: AppConfig, useValue: appConfig },
          { provide: AuthService, useValue: authService },
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
    expect(betaBar.phaseLink).toEqual('\'javascript:void(0)\'');
  });

  it('should have a `header-bar`', () => {
    let headerBarEl = de.query(By.directive(HeaderComponent));

    expect(headerBarEl).not.toBeNull();

    let headerBar = headerBarEl.componentInstance;

    expect(headerBar.title).toEqual('Probate');
    expect(headerBar.username).toEqual('Forename Surname');
  });

  it('should have a `nav-bar` and two `nav-item`s not on Case List', () => {
    spyOn(mockRouter, 'isActive').and.returnValue(false);
    fixture.detectChanges();

    let navBarEl = de.query(By.directive(NavigationComponent));
    let leftMenuLinkEl = de.query($LEFT_MENU_LINKS);
    let rightMenuLinkEl = de.query($RIGHT_MENU_LINKS);

    expect(navBarEl).not.toBeNull();
    expect(navBarEl.nativeElement.tagName).toBe('CUT-NAV-BAR');

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
    spyOn(comp.router, 'isActive').and.returnValue(true);
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
});
