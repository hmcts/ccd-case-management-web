import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import * as xFrameOptions from 'x-frame-options';
import * as healthcheck from "@hmcts/nodejs-healthcheck";
import * as noCache from 'nocache';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const appHealth = express();

const PORT = process.env.PORT || 3451;
const DIST_FOLDER = join(process.cwd());
const CONFIG = {
  'login_url': process.env['IDAM_LOGIN_URL'] || 'https://localhost:3501/login',
  'logout_url': process.env['CCD_GW_LOGOUT_URL'] || 'http://localhost:3453/logout',
  'api_url': process.env['CCD_API_URL'] || 'http://localhost:3453/aggregated',
  'case_data_url': process.env['CCD_DATA_URL'] || 'http://localhost:3453/data',
  'document_management_url': process.env['DM_URL'] || 'http://localhost:3453/documents',
  'remote_document_management_url': process.env['DM_URL_REMOTE'] || 'https://api-gateway.dev.dm.reform.hmcts.net/documents',
  'annotation_api_url':process.env['ANNOTATION_API_URL'] || 'http://localhost:3453/em-anno',
  'pagination_page_size': parseInt(process.env['CCD_PAGE_SIZE'], 10) || 25,
  'postcode_lookup_url': process.env['POSTCODE_LOOKUP_URL'] || 'http://localhost:3453/addresses?postcode=${postcode}',
  'oauth2_token_endpoint_url': process.env['CCD_GW_OAUTH2_URL'] || 'http://localhost:3453/oauth2',
  'oauth2_client_id': process.env['CCD_GW_OAUTH2_CLIENT_ID'] || 'ccd_gateway',
  'print_service_url': process.env['PRINT_SERVICE_URL'] || 'http://localhost:3453/print',
  'remote_print_service_url': process.env['PRINT_SERVICE_URL_REMOTE'] || 'https://return-case-doc.dev.ccd.reform.hmcts.net',
  'smart_survey_url': process.env['SMART_SURVEY_URL'] || 'https://www.smartsurvey.co.uk/s/CCDfeedback/',
  'unsupported_browser_url': process.env['UNSUPPORTED_BROWSER_URL'] || 'https://www.gov.uk/help/browsers',
  'activity_url': process.env['CCD_ACTIVITY_URL'] || '',
  'payments_url': process.env['PAYMENTS_URL'] || 'http://localhost:3453/payments',
  'pay_bulk_scan_url': process.env['PAY_BULKSCAN_URL'] || 'http://localhost:3453/pay-bulkscan',
  'chrome_min_required_version': parseInt(process.env['CHROME_MIN_REQUIRED_VERSION'], 10) || 67,
  'ie_min_required_version': parseInt(process.env['IE_MIN_REQUIRED_VERSION'], 10) || 11,
  'edge_min_required_version': parseInt(process.env['EDGE_MIN_REQUIRED_VERSION'], 10) || 17,
  'firefox_min_required_version': parseInt(process.env['FIREFOX_MIN_REQUIRED_VERSION'], 10) || 60,
  'activity_next_poll_request_ms': parseInt(process.env['CCD_ACTIVITY_NEXT_POLL_REQUEST_MS'], 10) || 5000,
  'activity_retry': parseInt(process.env['CCD_ACTIVITY_RETRY'], 10) || 5,
  'activity_batch_collection_delay_ms': parseInt(process.env['CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS'], 10) || 1,
  'activity_max_request_per_batch': parseInt(process.env['CCD_ACTIVITY_MAX_REQUEST_PER_BATCH'], 10) || 25,
  'appInsights_enabled': process.env['APPINSIGHTS_ENABLED'] || 'true',
  'appInsights_roleName': process.env['APPINSIGHTS_ROLE'] || 'ccd-management-web',
  'shutter_redirect_url': process.env['SHUTTER_REDIRECT_URL'] || '',
  'shutter_redirect_wait': parseInt(process.env['SHUTTER_REDIRECT_WAIT'], 10) || 10
};

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

import { AppConfig } from './src/app/app.config';
import { AppServerConfig } from './src/app/app.server.config';
import * as config from 'config';
import * as propertiesVolume from '@hmcts/properties-volume';
propertiesVolume.addTo(config);

const enableAppInsights = require('./src/app/app-insights/app-insights');
let appServerConfig = new AppServerConfig(CONFIG);
enableAppInsights(appServerConfig);

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
    { provide: AppConfig, useValue: appServerConfig },
  ]
}));

const poweredByHeader = 'x-powered-by';
app.disable(poweredByHeader);
appHealth.disable(poweredByHeader);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.use(xFrameOptions());

// health check
const healthConfig = {
  checks: {},
};
healthcheck.addTo(appHealth, healthConfig);
app.use(appHealth);

app.get('/config', (req, res) => {
  res.status(200).json(CONFIG);
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
