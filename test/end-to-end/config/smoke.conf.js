exports.config = {

  specs: [
    '../specs/*/login.*.spec.js'
  ],

  exclude: [],

  allScriptsTimeout: 110000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,

  directConnect: true,

  framework: 'jasmine2',

  // comment out shardTestFiles andmaxInstances to stop test specs running in parallel

  capabilities: {

      'shardTestFiles': true,
      'maxInstances': 4,
      'acceptInsecureCerts': true,
      'marionette': false,
      'browserName': 'firefox',

      'moz:firefoxOptions': {
              args: [ "--headless" ]
            }

  },

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000

  },


  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true,

  onCleanUp: function (results) {
  //  retry.onCleanUp(results);
  },

  onPrepare: function () {

    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  //  retry.onPrepare();
  },

  afterLaunch: function() {
 //   return retry.afterLaunch(2);
  }

};
