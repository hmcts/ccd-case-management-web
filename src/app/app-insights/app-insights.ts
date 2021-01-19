const config = require('config');
const appInsights = require('applicationinsights');

// const enabled = config.get('appInsights.enabled');
const enabled = true;

const enableAppInsights = () => {
  if (enabled) {
    const appInsightsKey = config.get('secrets.ccd.AppInsightsInstrumentationKey');
    const appInsightsRoleName = config.get('appInsights.roleName');
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
