let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListFilters = require('../../../page-objects/caseListFilters.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then }) {
//module.exports = function() {

Given(/^I login to CCD$/, function () {
//this.Given(/^I login to CCD$/, function() {
   browser.ignoreSynchronization = true
   browser.get(process.env.TEST_FRONTEND_URL || 'http://localhost:3451')
   //browser.sleep(1000);
   loginPage = new Login
   loginPage.isLoaded()
   loginPage.signInAs('caseworker-autotest1')

   browserUtils = new BrowserUtils
   browserUtils.waitForUrlToChangeTo(RegExp("list"))
   browser.sleep(500).then(function() { browser.ignoreSynchronization = false })
//   browser.waitForAngular()

});

Then(/^I should see CCD case list page$/, function () {
//this.Then(/^I should see CCD case list page$/, function() {


   ccdBannerPage = new CCDBanner
   ccdBannerPage.isLoaded()

   failedOnPageTitle = 'page not titled on case list page'
   failedOnUserSignedIn = 'user appears not signed in on case list page'
   failedOnMissingMenuItem = 'menu item missing on case list page'
   failedOnMissingFooterItem = 'footer item missing on case list page'

   expect(ccdBannerPage.getTitleLabel()).toBe('Auto Test 1', failedOnPageTitle)
   expect(ccdBannerPage.getUserNameLabel()).toContain('Autotest Cnp ▼', failedOnUserSignedIn)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Case List', failedOnMissingMenuItem)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getSearchBoxLabel()).toBe('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getFooterText()).toContain('Help', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Email:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Phone:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Monday to Friday', failedOnMissingFooterItem)


   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   failedOnEmptyCaseList = 'cases not listed on case list page'

   expect(caseListResultsPage.hasCreateCaseButton()).toBe(true, failedOnEmptyCaseList)

});

});
