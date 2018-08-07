let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseSearchFilters = require('../../../page-objects/caseSearchFilters.po.js')
let CaseCreateStart = require('../../../page-objects/caseCreateStart.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')
let StepUtils = require('../../../utils/step.utils.js')

describe('user - navigation', function() {

beforeEach(function(){

   let browserUtils = new BrowserUtils("", false)

   browser.ignoreSynchronization = true
   browser.get(process.env.TEST_URL || 'http://localhost:3451').then(function()
      { let loginPage = new Login
        loginPage.signInTo()
      })

});

afterEach(function(){

  let browserUtils = new BrowserUtils("", false)
  browserUtils.signOut()

});

it('Should be able to navigate to search', function() {

   let ccdBannerPage = new CCDBanner

   ccdBannerPage.isLoaded()
   ccdBannerPage.clickSearchBoxLabel()

   let failedOnLoggedInUserName = 'user appears not logged in on search page'
   let failedOnMissingMenuItem = 'missing from menu bar on search page'
   let failedOnMissingFooterItem = 'missing from footer on search page'

   expect(ccdBannerPage.getTitleLabel()).toBe('Auto Test 1', failedOnLoggedInUserName)
   expect(ccdBannerPage.getUserNameLabel()).toContain('Auto Test ▼', failedOnLoggedInUserName)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Case List', failedOnMissingMenuItem)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Create Case', failedOnMissingMenuItem)
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getSearchBoxLabel()).toBe('Search', failedOnMissingMenuItem)
   expect(ccdBannerPage.getFooterText()).toContain('Help', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Email:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Phone:', failedOnMissingFooterItem)
   expect(ccdBannerPage.getFooterText()).toContain('Monday to Friday', failedOnMissingFooterItem)

   let caseSearchFiltersPage = new CaseSearchFilters

   caseSearchFiltersPage.isLoaded()

   expect(caseSearchFiltersPage.getPageTitleLabel()).toBe('Search')
   expect(caseSearchFiltersPage.jurisdictionDropDownIsClickable()).toBeTruthy();
   expect(caseSearchFiltersPage.caseTypeDropDownIsClickable()).toBeTruthy();

});

it('Should be able to navigate to create case', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.clickCreateCaseButton()

   let caseCreateStartPage = new CaseCreateStart

   let failedOnPageTitle = 'not on create case page - title missing'
   let failedMissingDropDownOption = 'selection from drop down not possible on create case page'

   expect(caseCreateStartPage.getPageTitleLabel()).toBe('Create Case', failedOnPageTitle)
   expect(caseCreateStartPage.jurisdictionDropDownIsClickable()).toBeTruthy(failedMissingDropDownOption)
   expect(caseCreateStartPage.caseTypeDropDownIsClickable()).toBeTruthy(failedMissingDropDownOption)
   expect(caseCreateStartPage.eventDropDownIsClickable()).toBeTruthy(failedMissingDropDownOption)
   expect(caseCreateStartPage.submitButtonIsClickable()).toBeTruthy(failedMissingDropDownOption)

});

it('Should be able to navigate to start to create case steps', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.clickCreateCaseButton()

   let createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   let caseCreateStepPage = new CaseCreateStep

   let failedOnPageTitle = 'not on create case step - title missing'
   let failedOnMissingButton = 'missing button on create case step'
   let failedOnButtonNotDisabled = 'button should not be clickable on create case step'

   expect(caseCreateStepPage.getPageTitleLabel()).toBe('Create a new case', failedOnPageTitle)
   expect(caseCreateStepPage.continueButtonIsClickable()).toBeTruthy(failedOnMissingButton)
   expect(caseCreateStepPage.previousButtonIsEnabled()).toBe(false, failedOnButtonNotDisabled)
   expect(caseCreateStepPage.cancelLinkIsClickable()).toBeTruthy(failedOnMissingButton)

});

it('Should be able to navigate to start to create case steps then cancel', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.clickCreateCaseButton()

   let createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   let caseCreateStepPage = new CaseCreateStep

   caseCreateStepPage.clickCancelLink()

   let failedOnPageTitle = 'not on create case page - title missing'

   let caseCreateStartPage =  new CaseCreateStart

   expect(caseCreateStartPage.getPageTitleLabel()).toBe('Create Case', failedOnPageTitle)

});


it('Should be able to navigate back to a previous create case step', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.clickCreateCaseButton()

   let createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   let caseCreateStepPage = new CaseCreateStep

   caseCreateStepPage.clickContinueButton()

   browser.waitForAngular()

   caseCreateStepPage.isLoaded()

   let failedOnMissingButton = 'button should be clickable on create case step'

   expect(caseCreateStepPage.previousButtonIsClickable()).toBe(true, failedOnMissingButton)

   caseCreateStepPage.clickPreviousButton()

   browser.waitForAngular()

   caseCreateStepPage.isLoaded()

   let failedOnButtonNotDisabled = 'button should not be clickable on create case step'

   expect(caseCreateStepPage.previousButtonIsEnabled()).toBe(false, failedOnButtonNotDisabled)

});

it('Should be able to navigate through all create case step to view a case', function() {

   let caseListResultsPage = new CaseListResults

   let stopAtCYA = 3

   let stepUtils = new StepUtils

   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA

   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.isLoaded()

   let caseIDMatcher = /^#(\d){4}-(\d){4}-(\d){4}-(\d){4}$/

   let failedOnMissingCaseId = 'not on case view page - case id missing'

   expect(caseViewPage.getCaseID()).toMatch(caseIDMatcher, failedOnMissingCaseId)

});

});
