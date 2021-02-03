import * as appInsights from 'applicationinsights';
import { AppConfig } from '../app.config';

const enableAppInsights = (config: AppConfig) => {
  if (config.getAppInsightsEnabled().toLowerCase() === 'true') {
    const appInsightsKey = config.get('secrets.ccd.AppInsightsInstrumentationKey');
    const appInsightsRoleName = config.getAppInsightsRoleName();
    appInsights.setup(appInsightsKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectConsole(true, true);
    appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = appInsightsRoleName;
    console.log('Starting appInsights...');
    appInsights.start();
    console.log('Started appInsights...');
  }
};

module.exports = enableAppInsights;
