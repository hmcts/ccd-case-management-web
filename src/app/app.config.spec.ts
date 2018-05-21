import { AppConfig, Config } from './app.config';
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AppConfig', () => {

  const LOGIN_URL = 'http://idam.reform/login';
  const LOGOUT_URL = 'http://gateway.ccd/logout';
  const API_URL = 'http://api.ccd.reform/aggregated';
  const DATA_URL = 'http://api.ccd.reform';
  const ACTIVITY_URL = 'http://activity';
  const DOC_MANAGEMENT_URL = 'http://localhost:3453/documents';
  const REMOTE_DOC_MANAGEMENT_URL = 'http://evidence.ccd.reform/documents';
  const PAGINATION_PAGE_SIZE = 25;
  const POSTCODE_LOOKUP_URL = 'http://api.ccd.reform/addresses?postcode=';
  const OAUTH2_TOKEN_ENDPOINT_URL = 'http://gateway.ccd.reform/oauth2';
  const OAUTH2_CLIENT_ID = 'some_client_id';
  const PRINT_SERVICE_URL = 'http://print';
  const REMOTE_PRINT_SERVICE_URL = 'http://print.ccd.reform';
  const SMART_SURVEY_URL = 'https://www.smartsurvey.co.uk/s/CCDfeedback/';

  const MOCK_CONFIG: Config = {
    login_url: LOGIN_URL,
    logout_url: LOGOUT_URL,
    api_url: API_URL,
    case_data_url: DATA_URL,
    activity_url: ACTIVITY_URL,
    document_management_url: DOC_MANAGEMENT_URL,
    remote_document_management_url: REMOTE_DOC_MANAGEMENT_URL,
    pagination_page_size: PAGINATION_PAGE_SIZE,
    postcode_lookup_url: POSTCODE_LOOKUP_URL,
    oauth2_token_endpoint_url: OAUTH2_TOKEN_ENDPOINT_URL,
    oauth2_client_id: OAUTH2_CLIENT_ID,
    print_service_url: PRINT_SERVICE_URL,
    remote_print_service_url: REMOTE_PRINT_SERVICE_URL,
    smart_survey_url: SMART_SURVEY_URL
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        AppConfig
      ]
    });
  });

  describe('load()', () => {

    it('should load config from public/config.json',
      async(inject([AppConfig, XHRBackend], (appConfig: AppConfig, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCK_CONFIG)
          })));
        });

        appConfig
          .load()
          .then(() => {
            expect(appConfig.getLoginUrl()).toEqual(LOGIN_URL);
            expect(appConfig.getLogoutUrl()).toEqual(LOGOUT_URL);
            expect(appConfig.getApiUrl()).toEqual(API_URL);
            expect(appConfig.getCaseDataUrl()).toEqual(DATA_URL);
            expect(appConfig.getActivityUrl()).toEqual(ACTIVITY_URL);
            expect(appConfig.getDocumentManagementUrl()).toEqual(DOC_MANAGEMENT_URL);
            expect(appConfig.getRemoteDocumentManagementUrl()).toEqual(REMOTE_DOC_MANAGEMENT_URL);
            expect(appConfig.getPaginationPageSize()).toEqual(PAGINATION_PAGE_SIZE);
            expect(appConfig.getPostcodeLookupUrl()).toEqual(POSTCODE_LOOKUP_URL);
            expect(appConfig.getOAuth2TokenEndpointUrl()).toEqual(OAUTH2_TOKEN_ENDPOINT_URL);
            expect(appConfig.getOAuth2ClientId()).toEqual(OAUTH2_CLIENT_ID);
            expect(appConfig.getPrintServiceUrl()).toEqual(PRINT_SERVICE_URL);
            expect(appConfig.getRemotePrintServiceUrl()).toEqual(REMOTE_PRINT_SERVICE_URL);
          });
      })));
  });
});
