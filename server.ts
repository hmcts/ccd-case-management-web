// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 3451;
const DIST_FOLDER = join(process.cwd());
const CONFIG = {
  'login_url': process.env['IDAM_LOGIN_URL'] || 'https://localhost:3501/login',
  'logout_url': process.env['CCD_GW_LOGOUT_URL'] || 'http://localhost:3453/logout',
  'api_url': process.env['CCD_API_URL'] || 'http://localhost:3453/aggregated',
  'case_data_url': process.env['CCD_DATA_URL'] || 'http://localhost:3453/data',
  'document_management_url': process.env['DM_URL'] || 'http://localhost:3453/documents',
  'remote_document_management_url': process.env['DM_URL_REMOTE'] || 'https://api-gateway.dev.dm.reform.hmcts.net/documents',
  'pagination_page_size': parseInt(process.env['CCD_PAGE_SIZE'], 10) || 25,
  'postcode_lookup_url': process.env['POSTCODE_LOOKUP_URL'] || 'http://localhost:3453/addresses?postcode=${postcode}',
  'oauth2_token_endpoint_url': process.env['CCD_GW_OAUTH2_URL'] || 'http://localhost:3453/oauth2',
  'oauth2_client_id': process.env['CCD_GW_OAUTH2_CLIENT_ID'] || 'ccd_gateway',
  'print_service_url': process.env['PRINT_SERVICE_URL'] || 'http://localhost:3453/print',
  'remote_print_service_url': process.env['PRINT_SERVICE_URL_REMOTE'] || 'https://return-case-doc.dev.ccd.reform.hmcts.net',
  'smart_survey_url': process.env['SMART_SURVEY_URL'] || 'https://www.smartsurvey.co.uk/s/CCDfeedback/',
  'activity_url': process.env['CCD_ACTIVITY_URL'] || '',
  'activity_next_poll_request_ms': process.env['CCD_ACTIVITY_NEXT_POLL_REQUEST_MS'] || 5000,
  'activity_retry': process.env['CCD_ACTIVITY_RETRY'] || 5,
  'activity_batch_collection_delay_ms': process.env['CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS'] || 1,
  'activity_max_request_per_batch': process.env['CCD_ACTIVITY_MAX_REQUEST_PER_BATCH'] || 25,
  'payments_url': process.env['PAYMENTS_URL'] || 'http://localhost:8080/payments'
};

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { AppConfig } from './src/app/app.config';
import { AppServerConfig } from './src/app/app.server.config';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
    { provide: AppConfig, useValue: new AppServerConfig(CONFIG) },
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/health', (req, res) => {
  res.status(200).json({
    'status': 'UP',
    'buildInfo': {
      'environment': 'development',
      'project': 'ccd',
      'name': 'case-management-web',
      'version': '1.2.0'
    }
  });
});

app.get('/config', (req, res) => {
  res.status(200).json(CONFIG);
});

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
