const OUTPUT_DIR = !!process.env.PROTRACTOR_OUTPUT_DIR ? process.env.PROTRACTOR_OUTPUT_DIR : 'test';

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
    'maxInstances': 5,
    'acceptInsecureCerts': true,
    'marionette': false,
    'browserName': 'chrome',

    chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox',
     '--no-zygote ', '--disable-browser-side-navigation', '--allow-insecure-localhost'] },

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
    format: `json:${OUTPUT_DIR}/results/results.json`,
    profile: false,
    'no-source': true,
    plugin: `json:${OUTPUT_DIR}/cucumber.json`
  },

  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options:{
      jsonOutputPath: `${OUTPUT_DIR}/results/`,
      reportPath: `${OUTPUT_DIR}/results/`,

      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile:true
    }
  }],

  useAllAngular2AppRoots: true,

  SELENIUM_PROMISE_MANAGER: false,

  allScriptsTimeout: 60000
};
