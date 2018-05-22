import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfig {

  protected config: Config;

  constructor(private http: Http) {}

  public load(): Promise<void> {
    console.log('Loading app config...');

    let configUrl = environment.configUrl;

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(configUrl)
        .map(response => response.json())
        .catch((error: any): any => {
          console.error(`Configuration ${configUrl} could not be read`, error);
          reject();
          return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((config: Config) => {
          this.config = config;
          console.log('Loading app config: OK');
          resolve();
        });
    });
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

  public getLogoutUrl(): string {
    return this.config.logout_url;
  }

  public getApiUrl() {
    return this.config.api_url;
  }

  public getCaseDataUrl() {
    return this.config.case_data_url;
  }

  public getActivityUrl() {
    return this.config.activity_url;
  }

  public getDocumentManagementUrl() {
    return this.config.document_management_url;
  }

  public getRemoteDocumentManagementUrl() {
    return this.config.remote_document_management_url;
  }

  public getPaginationPageSize() {
    return this.config.pagination_page_size;
  }

  public getPostcodeLookupUrl() {
    return this.config.postcode_lookup_url;
  }

  public getOAuth2TokenEndpointUrl() {
    return this.config.oauth2_token_endpoint_url;
  }

  public getOAuth2ClientId() {
    return this.config.oauth2_client_id;
  }

  public getPrintServiceUrl() {
    return this.config.print_service_url;
  }

  public getRemotePrintServiceUrl() {
    return this.config.remote_print_service_url;
  }

  public getSmartSurveyUrl() {
    return this.config.smart_survey_url;
  }
}

export class Config {
  login_url: string;
  logout_url: string;
  api_url: string;
  case_data_url: string;
  activity_url: string;
  document_management_url: string;
  remote_document_management_url: string;
  pagination_page_size: number;
  postcode_lookup_url: string;
  oauth2_token_endpoint_url: string;
  oauth2_client_id: string;
  print_service_url: string;
  remote_print_service_url: string;
  smart_survey_url: string;
}
