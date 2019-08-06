// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  login_url: 'http://localhost:3501/login',
  logout_url: 'http://localhost:3453/logout',
  api_url: 'http://localhost:3453/aggregated',
  case_data_url: 'http://localhost:3453/data',
  document_management_url: 'http://localhost:3453/documents',
  remote_document_management_url: 'https://api-gateway.dev.dm.reform.hmcts.net/documents',
  pagination_page_size: 25,
  postcode_lookup_url: 'http://localhost:3453/addresses?postcode=${postcode}',
  oauth2_token_endpoint_url: 'http://localhost:3453/oauth2',
  oauth2_client_id: 'ccd_gateway',
  print_service_url: 'http://localhost:3453/print',
  remote_print_service_url: 'https://return-case-doc.dev.ccd.reform.hmcts.net',
  smart_survey_url: 'https://www.smartsurvey.co.uk/s/CCDfeedback/',
  unsupported_browser_url: 'https://www.gov.uk/help/browsers',
  activity_url: '',
  payments_url: 'http://localhost:3453/payments',
  chrome_min_required_version: 67,
  ie_min_required_version: 11,
  edge_min_required_version: 17,
  firefox_min_required_version: 60,
  activity_next_poll_request_ms: 5000,
  activity_retry: 5,
  activity_batch_collection_delay_ms: 1,
  activity_max_request_per_batch: 25
};
