let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListFilters = require('../../../page-objects/caseListFilters.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')

describe('user - sign in and landing page', function() {

beforeEach(function(){

   let browserUtils = new BrowserUtils("", false)

   browser.ignoreSynchronization = true
   browser.get(process.env.TEST_URL || 'http://localhost:3451').then(function()
      { let loginPage = new Login
        loginPage.signInTo()
      })

});

afterEach(function(){

  let ccdBannerPage = new CCDBanner
  ccdBannerPage.clickSignOut();

});


it('Should display banner', function() {

   let ccdBannerPage = new CCDBanner

   ccdBannerPage.isLoaded()

   failedOnPageTitle = 'page not titled on case list page'
   failedOnUserSignedIn = 'user appears not signed in on case list page'
   failedOnMissingMenuItem = 'menu item missing on case list page'
   failedOnMissingFooterItem = 'footer item missing on case list page'

   expect(ccdBannerPage.getTitleLabel()).toBe('Auto Test 1', failedOnPageTitle)
   expect(ccdBannerPage.getUserNameLabel()).toContain('Ccd Auto Test', failedOnUserSignedIn)

   ccdBannerPage.getMenuItemsLabels().then(function(a) { console.log(a) })

   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Case List', failedOnMissingMenuItem)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getSearchBoxLabel()).toBe('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getFooterText()).toContain('Help', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Email:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Phone:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Monday to Friday', failedOnMissingFooterItem)



 });

it('Should display case list filters', function() {

   let caseListFiltersPage = new CaseListFilters

   caseListFiltersPage.isLoaded()

   failedOnPageTitle = 'page not titled on case list page'
   failedOnMissingDropDownFilter = 'drop down filter missing on case list page'
   failedOnMissingButton = 'button missing on case list page'

   expect(caseListFiltersPage.getPageTitleLabel()).toBe('Case List')
   expect(caseListFiltersPage.jurisdictionDropDownIsClickable()).toBeTruthy(failedOnMissingDropDownFilter);
   expect(caseListFiltersPage.caseTypeDropDownIsClickable()).toBeTruthy(failedOnMissingDropDownFilter);
   expect(caseListFiltersPage.stateDropDownIsClickable()).toBeTruthy(failedOnMissingDropDownFilter);
   expect(caseListFiltersPage.applyButtonIsClickable()).toBeTruthy(failedOnMissingButton);

 });


it('Should display case list results', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   failedOnEmptyCaseList = 'cases not listed on case list page'

   expect(caseListResultsPage.hasCreateCaseButton()).toBe(true, failedOnEmptyCaseList)

 });

});
