import { OAuth2RedirectComponent } from './oauth2-redirect.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuth2Service } from '../core/auth/oauth2.service';
import createSpyObj = jasmine.createSpyObj;

describe('OAuth2RedirectComponent', () => {
  let fixture: ComponentFixture<OAuth2RedirectComponent>;
  let de: DebugElement;
  let mockOAuth2Service: any;
  let mockRouter: any;
  let component: OAuth2RedirectComponent;

  beforeEach(() => {
    mockOAuth2Service = createSpyObj<OAuth2Service>('oauth2Service', ['getAccessToken']);
    mockOAuth2Service.getAccessToken.and.returnValue(Observable.of(true));
    mockRouter = createSpyObj<Router>('router', ['navigate']);
    mockRouter.navigate.and.callThrough();

    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          OAuth2RedirectComponent
        ],
        providers: [
          { provide: ActivatedRoute,
            useValue: {
              snapshot: {
                queryParams: {
                  code: 'abc123'
                }
              }
            }
          },
          { provide: OAuth2Service, useValue: mockOAuth2Service },
          { provide: Router, useValue: mockRouter }
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
  });

  it('should redirect to / (index) upon successful authentication', () => {
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/'], { replaceUrl: true });
  });
});
