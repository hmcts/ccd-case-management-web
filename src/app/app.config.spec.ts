import { AppConfig, Config } from './app.config';
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

describe('AppConfig', () => {

  const LOGIN_URL = 'http://idam.reform/login';
  const LOGOUT_URL = 'http://gateway.ccd/logout';
  const API_URL = 'http://api.ccd.reform/aggregated';
  const DATA_URL = 'http://api.ccd.reform';
  const ACTIVITY_URL = 'http://activity';
  const DOC_MANAGEMENT_URL = 'http://localhost:3453/documents';
  const REMOTE_DOC_MANAGEMENT_URL = 'http://evidence.ccd.reform/documents';
  const ANNOTATION_API_URL = 'http://localhost:3453/em-anno';
  const PAGINATION_PAGE_SIZE = 25;
  const POSTCODE_LOOKUP_URL = 'http://api.ccd.reform/addresses?postcode=';
  const OAUTH2_TOKEN_ENDPOINT_URL = 'http://gateway.ccd.reform/oauth2';
  const OAUTH2_CLIENT_ID = 'some_client_id';
  const PRINT_SERVICE_URL = 'http://print';
  const REMOTE_PRINT_SERVICE_URL = 'http://print.ccd.reform';
  const SMART_SURVEY_URL = 'https://www.smartsurvey.co.uk/s/CCDfeedback/';
  const UNSUPPORTED_BROWSER_URL = 'https://www.gov.uk/help/browsers';
  const ACTIVITY_NEXT_POLL_REQUEST_MS = 1;
  const ACTIVITY_RETRY = 1;
  const ACTIVITY_BATCH_COLLECTION_DELAY_MS = 1;
  const ACTIVITY_MAX_REQUEST_PER_BATCH = 1;
  const PAYMENTS_URL = 'http://payments.reform';
  const PAY_BULKSCAN_URL = 'http://pay-bulkscan.reform';
  const CHROME_MIN_REQUIRED_VERSION = 67;
  const IE_MIN_REQUIRED_VERSION = 11;
  const EDGE_MIN_REQUIRED_VERSION = 17;
  const FIREFOX_MIN_REQUIRED_VERSION = 60;
  const CASE_HISTORY_URL = DATA_URL + '/internal/cases/CID/events/EID';
  const CREATE_OR_UPDATE_DRAFT_URL = DATA_URL + '/internal/case-types/CTID/drafts/';
  const VIEW_OR_DELETE_DRAFT_URL = DATA_URL + '/internal/drafts/DID';
  const APPINSIGHTS_INSTRUMENTATIONKEY = 'some-key';
  const APPLICATIONINSIGHTS_ENABLED = 'true';
  const APPLICATIONINSIGHTS_ROLE = 'ccd-management-web';
  const SHUTTER_REDIRECT_URL = 'http://expertui';
  const SHUTTER_REDIRECT_WAIT = 10;
  const BANNER_URL = DATA_URL + '/internal/banners/';
  const JURISDICTION_UI_CONFIGS_URL = DATA_URL + '/internal/jurisdiction-ui-configs/';

  let httpMock: HttpTestingController;

  const MOCK_CONFIG: Config = {
    login_url: LOGIN_URL,
    logout_url: LOGOUT_URL,
    api_url: API_URL,
    case_data_url: DATA_URL,
    document_management_url: DOC_MANAGEMENT_URL,
    remote_document_management_url: REMOTE_DOC_MANAGEMENT_URL,
    annotation_api_url: ANNOTATION_API_URL,
    pagination_page_size: PAGINATION_PAGE_SIZE,
    postcode_lookup_url: POSTCODE_LOOKUP_URL,
    oauth2_token_endpoint_url: OAUTH2_TOKEN_ENDPOINT_URL,
    oauth2_client_id: OAUTH2_CLIENT_ID,
    print_service_url: PRINT_SERVICE_URL,
    remote_print_service_url: REMOTE_PRINT_SERVICE_URL,
    smart_survey_url: SMART_SURVEY_URL,
    unsupported_browser_url: UNSUPPORTED_BROWSER_URL,
    activity_url: ACTIVITY_URL,
    activity_next_poll_request_ms: ACTIVITY_NEXT_POLL_REQUEST_MS,
    activity_retry: ACTIVITY_RETRY,
    activity_batch_collection_delay_ms: ACTIVITY_BATCH_COLLECTION_DELAY_MS,
    activity_max_request_per_batch: ACTIVITY_MAX_REQUEST_PER_BATCH,
    payments_url: PAYMENTS_URL,
    pay_bulk_scan_url: PAY_BULKSCAN_URL,
    chrome_min_required_version: CHROME_MIN_REQUIRED_VERSION,
    ie_min_required_version: IE_MIN_REQUIRED_VERSION,
    edge_min_required_version: EDGE_MIN_REQUIRED_VERSION,
    firefox_min_required_version: FIREFOX_MIN_REQUIRED_VERSION,
    appInsights_instrumentationKey: APPINSIGHTS_INSTRUMENTATIONKEY,
    appInsights_enabled: APPLICATIONINSIGHTS_ENABLED,
    appInsights_roleName: APPLICATIONINSIGHTS_ROLE,
    shutter_redirect_url: SHUTTER_REDIRECT_URL,
    shutter_redirect_wait: SHUTTER_REDIRECT_WAIT,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppConfig
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('load()', () => {

    it('should load config from public/config.json',
      async(inject([AppConfig], (appConfig: AppConfig) => {
        appConfig
          .load()
          .then(() => {
            expect(appConfig.getLoginUrl()).toEqual(LOGIN_URL);
            expect(appConfig.getLogoutUrl()).toEqual(LOGOUT_URL);
            expect(appConfig.getApiUrl()).toEqual(API_URL);
            expect(appConfig.getCaseDataUrl()).toEqual(DATA_URL);
            expect(appConfig.getDocumentManagementUrl()).toEqual(DOC_MANAGEMENT_URL);
            expect(appConfig.getRemoteDocumentManagementUrl()).toEqual(REMOTE_DOC_MANAGEMENT_URL);
            expect(appConfig.getAnnotationApiUrl()).toEqual(ANNOTATION_API_URL);
            expect(appConfig.getPaginationPageSize()).toEqual(PAGINATION_PAGE_SIZE);
            expect(appConfig.getPostcodeLookupUrl()).toEqual(POSTCODE_LOOKUP_URL);
            expect(appConfig.getOAuth2TokenEndpointUrl()).toEqual(OAUTH2_TOKEN_ENDPOINT_URL);
            expect(appConfig.getOAuth2ClientId()).toEqual(OAUTH2_CLIENT_ID);
            expect(appConfig.getPrintServiceUrl()).toEqual(PRINT_SERVICE_URL);
            expect(appConfig.getRemotePrintServiceUrl()).toEqual(REMOTE_PRINT_SERVICE_URL);
            expect(appConfig.getSmartSurveyUrl()).toEqual(SMART_SURVEY_URL);
            expect(appConfig.getUnsupportedBrowserUrl()).toEqual(UNSUPPORTED_BROWSER_URL);
            expect(appConfig.getActivityUrl()).toEqual(ACTIVITY_URL);
            expect(appConfig.getActivityBatchCollectionDelayMs()).toEqual(ACTIVITY_BATCH_COLLECTION_DELAY_MS);
            expect(appConfig.getActivityMaxRequestPerBatch()).toEqual(ACTIVITY_MAX_REQUEST_PER_BATCH);
            expect(appConfig.getActivityNexPollRequestMs()).toEqual(ACTIVITY_NEXT_POLL_REQUEST_MS);
            expect(appConfig.getActivityRetry()).toEqual(ACTIVITY_RETRY);
            expect(appConfig.getPaymentsUrl()).toEqual(PAYMENTS_URL);
            expect(appConfig.getPayBulkScanBaseUrl()).toEqual(PAY_BULKSCAN_URL);
            expect(appConfig.getChromeMinRequiredVersion()).toEqual(CHROME_MIN_REQUIRED_VERSION);
            expect(appConfig.getIEMinRequiredVersion()).toEqual(IE_MIN_REQUIRED_VERSION);
            expect(appConfig.getEdgeMinRequiredVersion()).toEqual(EDGE_MIN_REQUIRED_VERSION);
            expect(appConfig.getFirefoxMinRequiredVersion()).toEqual(FIREFOX_MIN_REQUIRED_VERSION);
            expect(appConfig.getCaseHistoryUrl('CID', 'EID')).toEqual(CASE_HISTORY_URL);
            expect(appConfig.getCreateOrUpdateDraftsUrl('CTID')).toEqual(CREATE_OR_UPDATE_DRAFT_URL);
            expect(appConfig.getViewOrDeleteDraftsUrl('DID')).toEqual(VIEW_OR_DELETE_DRAFT_URL);
            expect(appConfig.getAppInsightsEnabled()).toEqual(APPLICATIONINSIGHTS_ENABLED);
            expect(appConfig.getAppInsightsRoleName()).toEqual(APPLICATIONINSIGHTS_ROLE);
            expect(appConfig.getAppInsightsInstrumentationKey()).toEqual(APPINSIGHTS_INSTRUMENTATIONKEY);
            expect(appConfig.getShutterRedirectUrl()).toEqual(SHUTTER_REDIRECT_URL);
            expect(appConfig.getShutterRedirectWait()).toEqual(SHUTTER_REDIRECT_WAIT);
            expect(appConfig.getBannersUrl()).toEqual(BANNER_URL);
            expect(appConfig.getJurisdictionUiConfigsUrl()).toEqual(JURISDICTION_UI_CONFIGS_URL);
          });
          let configRequest = httpMock.expectOne('/config.json');
          configRequest.flush(MOCK_CONFIG);
          httpMock.verify();
      })));
  });
});
