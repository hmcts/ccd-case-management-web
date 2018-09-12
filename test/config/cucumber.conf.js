exports.config = {

  specs: [
    '../end-to-end/features/*.feature'
  ],

  exclude: [],

  directConnect: true,

  baseURL: '',

  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'shardTestFiles': true,
    'maxInstances': 1,
    'acceptInsecureCerts': true,
    'marionette': false,
    'browserName': 'chrome'
  },

  cucumberOpts: {
    require: [
      '../end-to-end/features/stepDefinitions/*.js'
    ],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  },

  useAllAngular2AppRoots: true,

};
