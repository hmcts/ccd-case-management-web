const config = {

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',

    host: 'ondemand.eu-central-1.saucelabs.com',
    sauceregion: 'eu',
    specs: [
      '../features/*.feature',
      '../features/*/*.feature'
    ],

    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),

    // sauceProxy: 'https://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/',
    allScriptsTimeout: 111000,

    useAllAngular2AppRoots: true,
    multiCapabilities: [

        {
            browserName: 'chrome',
            name: 'CCD_WIN_CHROME_LATEST',
            version: 'latest',
            platform: 'Windows 10',
            name: 'chrome-tests',
            'tunnel-identifier': 'reformtunnel',
            extendedDebugging: true,
            shardTestFiles: false,
            maxInstances: 1

        },

        {
            browserName: 'chrome',
            name: 'CCD_MAC_CHROME_LATEST',
            platform: 'macOS 10.13',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel',
            shardTestFiles: true,
            maxInstances: 1

        },

        {
            browserName: 'firefox',
            name: 'CCD_WIN_FIREFOX_LATEST',
            platform: 'Windows 10',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel',
            shardTestFiles: false,
            maxInstances: 1

        },

        {
            browserName: 'firefox',
            name: 'CCD_MAC_FIREFOX_LATEST',
            platform: 'macOS 10.13',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel',
            shardTestFiles: false,
            maxInstances: 1
        }

    ],

    exclude: [],

    cucumberOpts: {
        strict: true,
        format: ['node_modules/cucumber-pretty', 'json:cb_reports/saucelab_results.json' ],
        require: ['../stepDefinitions/*.js'],
        tags: ['@functional']
    },


     plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'CCD Cross-Browser Tests',
                jsonDir: 'reports/tests/crossbrowser',
                reportPath: 'reports/tests/crossbrowser'

            }
        }
    ],

      useAllAngular2AppRoots: true,

      SELENIUM_PROMISE_MANAGER: false,

      allScriptsTimeout: 60000,

      onPrepare() {
        const caps = browser.getCapabilities();
        browser.manage()
            .window()
            .maximize();
        browser.waitForAngularEnabled(false);

    }
};

exports.config = config;
