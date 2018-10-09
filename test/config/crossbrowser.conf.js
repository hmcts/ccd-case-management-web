const baseUrl = (process.env.TEST_URL || 'http://localhost:3451/').replace('https', 'http');

exports.config = {

  /*
     - before execution set the following environment variables:
                CCD_CASEWORKER_AUTOTEST_EMAIL
                CCD_CASEWORKER_AUTOTEST_PASSWORD
                TEST_FRONTEND_URL
     - to stop parallel execution: comment out shardTestFiles and maxInstances
     - to stop tests running headless: comment out moz:firefoxOptions section
  */

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceSeleniumAddress: 'ondemand.saucelabs.com:443/wd/hub',

  specs: ["../end-to-end/specs/*/login.*.spec.js"],
  seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',

  exclude: [],

  allScriptsTimeout: 110000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,

  framework: 'jasmine2',

  multiCapabilities: [{
        browserName: 'chrome',
        version: 'latest',
        platform: 'Windows 10',
        name: "chrome-tests",
        shardTestFiles: true,
        maxInstances: 1,
        "tunnel-identifier": 'reformtunnel',
        tags:'ccd-crossbrowser'
    }],

    plugins: [{
        package: "protractor-screenshoter-plugin",
        screenshotPath: "./smoke-output",
        screenshotOnExpect: "failure+success",
        screenshotOnSpec: "failure+success",
        withLogs: true,
        writeReportFreq: "asap",
        clearFoldersBeforeTest: true
    }],

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000

  },

  useAllAngular2AppRoots: true,

};
