let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListFilters = require('../../../page-objects/caseListFilters.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')

describe('User - sign In', function() {

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

});

afterEach(function(){

});


it('Should display banner', function() {

   ccdBannerPage = new CCDBanner

   ccdBannerPage.isLoaded()

   expect(ccdBannerPage.getTitleLabel()).toBe('Auto Test 1')
   expect(ccdBannerPage.getUserNameLabel()).toContain('User Test')
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Case List')
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Search')
   expect(ccdBannerPage.getSearchBoxLabel()).toBe('Search')
   expect(ccdBannerPage.getFooterText()).toContain('Help')
   expect(ccdBannerPage.getFooterText()).toContain('Email:')
   expect(ccdBannerPage.getFooterText()).toContain('Phone:')
   expect(ccdBannerPage.getFooterText()).toContain('Monday to Friday')



 });

it('Should display case list filters', function() {

   let caseListFiltersPage = new CaseListFilters

   caseListFiltersPage.isLoaded()

   expect(caseListFiltersPage.getPageTitleLabel()).toBe('Case List')
   expect(caseListFiltersPage.jurisdictionDropDownIsClickable()).toBeTruthy();
   expect(caseListFiltersPage.caseTypeDropDownIsClickable()).toBeTruthy();
   expect(caseListFiltersPage.stateDropDownIsClickable()).toBeTruthy();
   expect(caseListFiltersPage.applyButtonIsClickable()).toBeTruthy();

 });


it('Should display case list results', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   expect(caseListResultsPage.hasCreateCaseButton()).toBe(true)

 });

});
