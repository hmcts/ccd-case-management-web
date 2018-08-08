
exports.config = {

  /*
     - before execution set the following environment variables:
                CCD_CASEWORKER_AUTOTEST_EMAIL
                CCD_CASEWORKER_AUTOTEST_PASSWORD
                TEST_FRONTEND_URL
     - to stop parallel execution: comment out shardTestFiles and maxInstances
     - to stop tests running headless: comment out moz:firefoxOptions section
  */

  specs: [
    "./end-to-end/specs/*/login.*.spec.js"
  ],

  exclude: [],

  allScriptsTimeout: 110000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,

  directConnect: true,

  framework: "jasmine2",

  capabilities: {
     "shardTestFiles": true,
     "acceptInsecureCerts": true,
     "maxInstances": 1,
     "browserName": "chrome",
     /**
      * Chrome is not allowed to create a SUID sandbox when running inside Docker
      */
    
     'proxy': {
      'proxyType': 'manual',
      'httpProxy': 'http://proxy.uk:8080'
      'httpsProxy': 'http://proxy.uk:8080'
      'noProxy': ''
             } 
 
     "chromeOptions": {
         "args": [
            "no-sandbox",
            "--disable-web-security"
         ]
     }
  },

//  capabilities: {
//
//      'shardTestFiles': true,
//      'maxInstances': 2,
//      'acceptInsecureCerts': true,
//      'marionette': false,
//      'browserName': 'firefox'
////      'moz:firefoxOptions': {
////              args: [ "--headless" ]
////            }
//  },

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000

  },

  useAllAngular2AppRoots: true,


  plugins: [{
        package: "protractor-screenshoter-plugin",
        screenshotPath: "./test/reports/e2e",
        screenshotOnExpect: "failure+success",
        screenshotOnSpec: "none",
        withLogs: true,
        writeReportFreq: "asap",
        clearFoldersBeforeTest: true
    }],

      onPrepare: function() {
          // returning the promise makes protractor wait for the reporter config before executing tests
          return global.browser.getProcessedConfig().then(function(config) {
              //it is ok to be empty
          });
      }

};
