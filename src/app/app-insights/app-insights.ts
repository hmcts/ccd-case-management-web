import { AppConfig } from '../app.config';
const config = require('config');
const appInsights = require('applicationinsights');

const enableAppInsights = (appConfig: AppConfig) => {
  if (appConfig.getAppInsightsEnabled().toLowerCase() === 'true') {
    const appInsightsKey = config.get('secrets.ccd.AppInsightsInstrumentationKey');
    const appInsightsRoleName = appConfig.getAppInsightsRoleName();
    appInsights.setup(appInsightsKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(true);
    appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = appInsightsRoleName;
    console.log('Starting appInsights...');
    appInsights.start();
    console.log('Started appInsights...');
  }
};

module.exports = enableAppInsights;
