let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListFilters = require('../../../page-objects/caseListFilters.po.js')

describe('Case List', function() {

beforeEach(function(){

   browser.ignoreSynchronization = true
   browser.get(process.env.TEST_URL || 'http://localhost:3451')

   loginPage = new Login
   loginPage.isLoaded()
   loginPage.signInAs('caseworker-autotest1')

   browserUtils = new BrowserUtils
   browserUtils.waitForUrlToChangeTo(RegExp("list"))
   browser.sleep(500).then(function() { browser.ignoreSynchronization = false })
   browser.waitForAngular()

   ccdBannerPage = new CCDBanner
   ccdBannerPage.isLoaded()

});

afterEach(function(){

});

it('Filters are available for selection', function() {

      caseListFilters = new CaseListFilters
      caseListFilters.isLoaded()

 });

});
