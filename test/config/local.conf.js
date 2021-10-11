exports.config = {

  specs: [
    '../features/*.feature',
    '../features/*/*.feature'
  ],

  exclude: [],

  directConnect: true,

  baseURL: '',

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  capabilities: {
    'shardTestFiles': true,
    'maxInstances': 1,
    'acceptInsecureCerts': true,
    'marionette': false,
    'browserName': 'chrome',
    'acceptInsecureCerts': true,

    'proxy': {
      'proxyType': 'manual',
      'httpProxy': 'proxyout.reform.hmcts.net:8080',
      'sslProxy': 'proxyout.reform.hmcts.net:8080',
      'noProxy': ''
    },
  },

  cucumberOpts: {
    require: [
      '../stepDefinitions/*.js'
    ],
    tags: false,
    format: 'json:test/results/results.json',
    profile: false,
    'no-source': true,
    plugin: 'json:test/cucumber.json'
  },

  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options:{
      jsonOutputPath: 'test/results/',
      reportPath: 'test/results/',

      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile:true
    }
  }],

  useAllAngular2AppRoots: true,

  SELENIUM_PROMISE_MANAGER: false,

  allScriptsTimeout: 30000
};
