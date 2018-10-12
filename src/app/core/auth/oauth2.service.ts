import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpService, AuthService } from '@hmcts/ccd-case-ui-toolkit';

/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
@Injectable()
export class OAuth2Service {

  constructor(private http: HttpService,
              private appConfig: AppConfig,
              private authService: AuthService) {}

  getAccessToken(code: string): Observable<Response> {
    if (code) {
      const url = this.appConfig.getOAuth2TokenEndpointUrl();
      let params = new URLSearchParams();
      params.set('code', code);
      // On successfully obtaining a token, the redirect should go back to the Angular application, i.e. ourselves.
      // Note: This *must not* include any query string.
      params.set('redirect_uri', this.authService.redirectUri().replace('https://', ''));
      return this.http
        .get(url, { search: params });
    } else {
      console.error('Error: Unable to obtain access token - no OAuth2 code provided');
    }
  }

  signOut(): void {
    this.http.get(this.appConfig.getLogoutUrl()).subscribe(() => this.authService.signIn());
  }
}
