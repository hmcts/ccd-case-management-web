import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AbstractAppConfig, CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig extends AbstractAppConfig {

  protected config: Config;

  constructor(private http: HttpClient) {
    super();
  }

  public load(): Promise<void> {
    console.log('Loading app config...');

    let configUrl = environment.configUrl;

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(configUrl)
        .catch((error: any): any => {
          console.error(`Configuration ${configUrl} could not be read`, error);
          reject();
          return throwError(error.json().error || 'Server error');
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

  public getDocumentManagementUrl() {
    return this.config.document_management_url;
  }

  public getRemoteDocumentManagementUrl() {
    return this.config.remote_document_management_url;
  }

  public getAnnotationApiUrl(): string {
    return this.config.annotation_api_url;
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

  public getUnsupportedBrowserUrl() {
    return this.config.unsupported_browser_url;
  }

  public getActivityUrl() {
    return this.config.activity_url;
  }

  public getActivityNexPollRequestMs() {
    return this.config.activity_next_poll_request_ms;
  }

  public getActivityRetry() {
    return this.config.activity_retry;
  }

  public getActivityBatchCollectionDelayMs() {
    return this.config.activity_batch_collection_delay_ms;
  }

  public getActivityMaxRequestPerBatch() {
    return this.config.activity_max_request_per_batch;
  }

  public getPaymentsUrl() {
    return this.config.payments_url;
  }

  public getPayBulkScanBaseUrl() {
    return this.config.pay_bulk_scan_url;
  }

  public getChromeMinRequiredVersion() {
    return this.config.chrome_min_required_version;
  }

  public getIEMinRequiredVersion() {
    return this.config.ie_min_required_version;
  }

  public getEdgeMinRequiredVersion() {
    return this.config.edge_min_required_version;
  }

  public getFirefoxMinRequiredVersion() {
    return this.config.firefox_min_required_version;
  }

  public getAppInsightsEnabled() {
    return this.config.appInsights_enabled;
  }

  public getAppInsightsRoleName() {
    return this.config.appInsights_roleName;
  }

  public getShutterRedirectUrl() {
    return this.config.shutter_redirect_url;
  }

  public getShutterRedirectWait() {
    return this.config.shutter_redirect_wait;
  }

  public getCaseHistoryUrl(caseId: string, eventId: string) {
    return this.getCaseDataUrl()
      + `/internal`
      + `/cases/${caseId}`
      + `/events/${eventId}`;
  }

  public getCreateOrUpdateDraftsUrl(ctid: string) {
    return this.getCaseDataUrl() + `/internal/case-types/${ctid}/drafts/`;
  }

  public getViewOrDeleteDraftsUrl(did: string) {
    return this.getCaseDataUrl() + `/internal/drafts/${did}`;
  }

  public getBannersUrl() {
    return this.getCaseDataUrl() + `/internal/banners/`;
  }

  public getJurisdictionUiConfigsUrl() {
    return this.getCaseDataUrl() + `/internal/jurisdiction-ui-configs/`;
  }

  public getLoggingLevel() {
    return this.config.logging_level;
  }

  public getLoggingCaseFieldList() {
    return this.config.logging_case_field_list;
  }
}

export class Config extends CaseEditorConfig {
  logout_url: string;
  oauth2_token_endpoint_url: string;
  annotation_api_url: string;
  pagination_page_size: number;
  smart_survey_url: string;
  unsupported_browser_url: string;
  chrome_min_required_version: number;
  ie_min_required_version: number;
  edge_min_required_version: number;
  firefox_min_required_version: number;
  appInsights_enabled: string;
  appInsights_roleName: string;
  shutter_redirect_url: string;
  shutter_redirect_wait: number;
  logging_level: string;
  logging_case_field_list: string;
}
