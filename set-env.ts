import { writeFile } from 'fs';

const environmentFilePath = `./src/environments/environment.prod.ts`;
const environmentFile = `
export const environment = {
  production: true,
  login_url: '${process.env['IDAM_LOGIN_URL'] || 'https://localhost:5000/login'}',
  logout_url: '${process.env['CCD_GW_LOGOUT_URL'] || 'http://localhost:3453/logout'}',
  api_url: '${process.env['CCD_API_URL'] || 'http://localhost:3453/aggregated'}',
  case_data_url: '${process.env['CCD_DATA_URL'] || 'http://localhost:3453/data'}',
  document_management_url: '${process.env['DM_URL'] || 'http://localhost:3453/documents'}',
  remote_document_management_url: '${process.env['DM_URL_REMOTE'] || 'https://api-gateway.dev.dm.reform.hmcts.net/documents'}',
  pagination_page_size: ${parseInt(process.env['CCD_PAGE_SIZE'], 10) || 25},
  postcode_lookup_url: '${process.env['POSTCODE_LOOKUP_URL'] || 'http://localhost:3453/addresses?postcode=\${postcode}'}',
  oauth2_token_endpoint_url: '${process.env['CCD_GW_OAUTH2_URL'] || 'http://localhost:3453/oauth2'}',
  oauth2_client_id: '${process.env['CCD_GW_OAUTH2_CLIENT_ID'] || 'ccd_gateway'}',
  print_service_url: '${process.env['PRINT_SERVICE_URL'] || 'http://localhost:3453/print'}',
  remote_print_service_url: '${process.env['PRINT_SERVICE_URL_REMOTE'] || 'https://return-case-doc.dev.ccd.reform.hmcts.net'}',
  smart_survey_url: '${process.env['SMART_SURVEY_URL'] || 'https://www.smartsurvey.co.uk/s/CCDfeedback/'}',
  unsupported_browser_url: '${process.env['UNSUPPORTED_BROWSER_URL'] || 'https://www.gov.uk/help/browsers'}',
  activity_url: '${process.env['CCD_ACTIVITY_URL'] || ''}',
  payments_url: '${process.env['PAYMENTS_URL'] || 'http://localhost:3453/payments'}',
  chrome_min_required_version: ${parseInt(process.env['CHROME_MIN_REQUIRED_VERSION'], 10) || 67},
  ie_min_required_version: ${parseInt(process.env['IE_MIN_REQUIRED_VERSION'], 10) || 11},
  edge_min_required_version: ${parseInt(process.env['EDGE_MIN_REQUIRED_VERSION'], 10) || 17},
  firefox_min_required_version: ${parseInt(process.env['FIREFOX_MIN_REQUIRED_VERSION'], 10) || 60},
  activity_next_poll_request_ms: ${parseInt(process.env['CCD_ACTIVITY_NEXT_POLL_REQUEST_MS'], 10) || 5000},
  activity_retry: ${parseInt(process.env['CCD_ACTIVITY_RETRY'], 10) || 5},
  activity_batch_collection_delay_ms: ${parseInt(process.env['CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS'], 10) || 1},
  activity_max_request_per_batch: ${parseInt(process.env['CCD_ACTIVITY_MAX_REQUEST_PER_BATCH'], 10) || 25}
};
`;

writeFile(environmentFilePath, environmentFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Environment variables set at ${environmentFilePath}`);
});
