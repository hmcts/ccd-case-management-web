import { AppConfig } from './app.config';
import { environment } from '../environments/environment';

describe('AppConfig', () => {

  const CASE_HISTORY_URL = environment.case_data_url + '/internal/cases/CID/events/EID';
  const CREATE_OR_UPDATE_DRAFT_URL = environment.case_data_url + '/internal/case-types/CTID/drafts/';
  const VIEW_OR_DELETE_DRAFT_URL = environment.case_data_url + '/internal/drafts/DID';

  let appConfig: AppConfig;

  beforeEach(() => {
    appConfig = new AppConfig();
  });

  describe('load()', () => {

    it('should load config from environment', () => {

      appConfig.load();

      expect(appConfig.getLoginUrl()).toEqual(environment.login_url);
      expect(appConfig.getLogoutUrl()).toEqual(environment.logout_url);
      expect(appConfig.getApiUrl()).toEqual(environment.api_url);
      expect(appConfig.getCaseDataUrl()).toEqual(environment.case_data_url);
      expect(appConfig.getDocumentManagementUrl()).toEqual(environment.document_management_url);
      expect(appConfig.getRemoteDocumentManagementUrl()).toEqual(environment.remote_document_management_url);
      expect(appConfig.getPaginationPageSize()).toEqual(environment.pagination_page_size);
      expect(appConfig.getPostcodeLookupUrl()).toEqual(environment.postcode_lookup_url);
      expect(appConfig.getOAuth2TokenEndpointUrl()).toEqual(environment.oauth2_token_endpoint_url);
      expect(appConfig.getOAuth2ClientId()).toEqual(environment.oauth2_client_id);
      expect(appConfig.getPrintServiceUrl()).toEqual(environment.print_service_url);
      expect(appConfig.getRemotePrintServiceUrl()).toEqual(environment.remote_print_service_url);
      expect(appConfig.getSmartSurveyUrl()).toEqual(environment.smart_survey_url);
      expect(appConfig.getUnsupportedBrowserUrl()).toEqual(environment.unsupported_browser_url);
      expect(appConfig.getActivityUrl()).toEqual(environment.activity_url);
      expect(appConfig.getActivityBatchCollectionDelayMs()).toEqual(environment.activity_batch_collection_delay_ms);
      expect(appConfig.getActivityMaxRequestPerBatch()).toEqual(environment.activity_max_request_per_batch);
      expect(appConfig.getActivityNexPollRequestMs()).toEqual(environment.activity_next_poll_request_ms);
      expect(appConfig.getActivityRetry()).toEqual(environment.activity_retry);
      expect(appConfig.getPaymentsUrl()).toEqual(environment.payments_url);
      expect(appConfig.getChromeMinRequiredVersion()).toEqual(environment.chrome_min_required_version);
      expect(appConfig.getIEMinRequiredVersion()).toEqual(environment.ie_min_required_version);
      expect(appConfig.getEdgeMinRequiredVersion()).toEqual(environment.edge_min_required_version);
      expect(appConfig.getFirefoxMinRequiredVersion()).toEqual(environment.firefox_min_required_version);
      expect(appConfig.getCaseHistoryUrl('CID', 'EID')).toEqual(CASE_HISTORY_URL);
      expect(appConfig.getCreateOrUpdateDraftsUrl('CTID')).toEqual(CREATE_OR_UPDATE_DRAFT_URL);
      expect(appConfig.getViewOrDeleteDraftsUrl('DID')).toEqual(VIEW_OR_DELETE_DRAFT_URL);

    });
  });
});
