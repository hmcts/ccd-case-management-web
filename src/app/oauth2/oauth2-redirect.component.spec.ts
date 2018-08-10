import { OAuth2RedirectComponent } from './oauth2-redirect.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuth2Service } from '../core/auth/oauth2.service';
import createSpyObj = jasmine.createSpyObj;
import { AuthService } from '../core/auth/auth.service';

describe('OAuth2RedirectComponent', () => {
  const ROUTE_WITH_CODE = {
    snapshot: {
      queryParams: {
        code: 'abc123'
      }
    }
  };

  const ROUTE_WITHOUT_CODE = {
    snapshot: {
      queryParams: {}
    }
  };

  let fixture: ComponentFixture<OAuth2RedirectComponent>;
  let de: DebugElement;
  let mockOAuth2Service: any;
  let mockAuthService: any;
  let mockRouter: any;
  let component: OAuth2RedirectComponent;

  describe('when query param `code` is provided', () => {
    beforeEach(() => {
      mockOAuth2Service = createSpyObj<OAuth2Service>('oauth2Service', ['getAccessToken']);
      mockOAuth2Service.getAccessToken.and.returnValue(Observable.of(true));
      mockRouter = createSpyObj<Router>('router', ['navigate']);
      mockRouter.navigate.and.callThrough();
      mockAuthService = createSpyObj<AuthService>('authService', ['signIn']);

      TestBed
        .configureTestingModule({
          imports: [],
          declarations: [
            OAuth2RedirectComponent
          ],
          providers: [
            { provide: ActivatedRoute, useValue: ROUTE_WITH_CODE },
            { provide: OAuth2Service, useValue: mockOAuth2Service },
            { provide: AuthService, useValue: mockAuthService },
            { provide: Router, useValue: mockRouter },
          ]
        })
        .compileComponents();

      fixture = TestBed.createComponent(OAuth2RedirectComponent);
      de = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should render a page indicating the application is logging in', () => {
      let pageElement = de.query(By.css('h3'));
      expect(pageElement).toBeTruthy();
    });

    it('should call AuthService to get an access token', () => {
      component.ngOnInit();
      expect(mockOAuth2Service.getAccessToken).toHaveBeenCalledWith('abc123');
      expect(mockAuthService.signIn).not.toHaveBeenCalled();
    });

    it('should redirect to / (index) upon successful authentication', () => {
      component.ngOnInit();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/'], { replaceUrl: true });
      expect(mockAuthService.signIn).not.toHaveBeenCalled();
    });
  });

  describe('when query param `code` is NOT provided', () => {
    beforeEach(() => {
      mockOAuth2Service = createSpyObj<OAuth2Service>('oauth2Service', ['getAccessToken']);
      mockOAuth2Service.getAccessToken.and.returnValue(Observable.of(true));
      mockRouter = createSpyObj<Router>('router', ['navigate']);
      mockRouter.navigate.and.callThrough();
      mockAuthService = createSpyObj<AuthService>('authService', ['signIn']);

      TestBed
        .configureTestingModule({
          imports: [],
          declarations: [
            OAuth2RedirectComponent
          ],
          providers: [
            { provide: ActivatedRoute, useValue: ROUTE_WITHOUT_CODE },
            { provide: OAuth2Service, useValue: mockOAuth2Service },
            { provide: AuthService, useValue: mockAuthService },
            { provide: Router, useValue: mockRouter },
          ]
        })
        .compileComponents();

      fixture = TestBed.createComponent(OAuth2RedirectComponent);
      de = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should start sign in flow when code is missing', () => {
      component.ngOnInit();

      expect(mockAuthService.signIn).toHaveBeenCalled();
    });
  });
});
