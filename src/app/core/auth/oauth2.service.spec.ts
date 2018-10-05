import { AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { OAuth2Service } from './oauth2.service';
import createSpyObj = jasmine.createSpyObj;
import { HttpService } from '@hmcts/ccd-case-ui-toolkit';

describe('OAuth2Service', () => {

  const TOKEN_ENDPOINT = 'http://localhost:1234/oauth2/token';
  const AUTH_CODE = 'abc123';
  const RESPONSE = Observable.of(new Response(new ResponseOptions()));
  const LOGIN_URL = 'http://idam/login';
  const LOGOUT_URL = 'http://gateway.ccd/logout';
  const OAUTH2_CLIENT_ID = 'some_client_id';
  const REDIRECT_URI = 'http://localhost/oauth2redirect';

  let oauth2Service: OAuth2Service;
  let authService: any;
  let httpService: any;
  let appConfig: any;

  beforeEach(() => {
    httpService = createSpyObj<HttpService>('httpService', ['get']);
    httpService.get.and.returnValue(RESPONSE);

    appConfig = createSpyObj<AppConfig>('appConfig', [
      'getOAuth2TokenEndpointUrl',
      'getOAuth2ClientId',
      'getLoginUrl',
      'getLogoutUrl',
    ]);
    appConfig.getOAuth2TokenEndpointUrl.and.returnValue(TOKEN_ENDPOINT);
    appConfig.getLoginUrl.and.returnValue(LOGIN_URL);
    appConfig.getLogoutUrl.and.returnValue(LOGOUT_URL);
    appConfig.getOAuth2ClientId.and.returnValue(OAUTH2_CLIENT_ID);
    authService = createSpyObj<HttpService>('authService', ['redirectUri', 'signIn']);
    authService.redirectUri.and.returnValue(REDIRECT_URI);

    oauth2Service = new OAuth2Service(httpService, appConfig, authService);
  });

  describe('getAccessToken', () => {
    it('should make an HTTP GET request with the correct URL and option parameters', () => {
      let response = oauth2Service.getAccessToken(AUTH_CODE);
      let params = new URLSearchParams();
      params.set('code', AUTH_CODE);
      params.set('redirect_uri', REDIRECT_URI);

      expect(httpService.get).toHaveBeenCalledWith(TOKEN_ENDPOINT, { search: params });
      expect(response).toEqual(RESPONSE);
    });
  });

  describe('signOut', () => {
    it('should make an HTTP GET request with the logout url', () => {
      oauth2Service.signOut();

      expect(httpService.get).toHaveBeenCalledWith(LOGOUT_URL);
      expect(authService.signIn).toHaveBeenCalled();
    });
  });
});
