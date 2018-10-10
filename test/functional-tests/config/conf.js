exports.config = {

  specs: [
    '../features/*.feature'
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

    chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote '] },

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
    format: 'json:test/functional-tests/results/results.json',
    profile: false,
    'no-source': true,
    plugin: 'json:test/cucumber.json'
  },

  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options:{
      jsonOutputPath: 'test/functional-tests/results/',
      reportPath: 'test/functional-tests/results/',

      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile:true
    }
  }],

  useAllAngular2AppRoots: true,

  SELENIUM_PROMISE_MANAGER: false,

};
