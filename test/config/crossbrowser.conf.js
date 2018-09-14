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

  specs: ["../end-to-end/specs/*/login.*.spec.js"],

  exclude: [],

  allScriptsTimeout: 110000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,

  framework: 'jasmine2',

  multiCapabilities: [{
        browserName: 'firefox',
        version: 'latest',
        platform: 'Windows 7',
        name: "chrome-tests",
        shardTestFiles: true,
        maxInstances: 1,
        "tunnel-identifier": 'reformtunnel',
        "tags":'ccd-crossbrowser'
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
