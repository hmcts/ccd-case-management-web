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

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
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

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// No cache for any routes handled by Universal
app.use(noCache());

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
