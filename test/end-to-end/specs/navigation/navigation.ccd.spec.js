let Login = require('../../../page-objects/login.po.js')
let CCDBanner = require('../../../page-objects/ccdBanner.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseSearchFilters = require('../../../page-objects/caseSearchFilters.po.js')
let CaseCreateStart = require('../../../page-objects/caseCreateStart.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')
let StepUtils = require('../../../utils/step.utils.js')

describe('User - navigation', function() {

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

it('Should be able to navigate to search', function() {

   ccdBannerPage = new CCDBanner

   ccdBannerPage.isLoaded()
   ccdBannerPage.clickSearchBoxLabel()

   expect(ccdBannerPage.getTitleLabel()).toBe('Auto Test 1')
   expect(ccdBannerPage.getUserNameLabel()).toContain('User Test')
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Case List')
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Create Case')
   expect(ccdBannerPage.getMenuItemsLabels()).toContain('Search')
   expect(ccdBannerPage.getSearchBoxLabel()).toBe('Search')
   expect(ccdBannerPage.getFooterText()).toContain('Help')
   expect(ccdBannerPage.getFooterText()).toContain('Email:')
   expect(ccdBannerPage.getFooterText()).toContain('Phone:')
   expect(ccdBannerPage.getFooterText()).toContain('Monday to Friday')

   caseSearchFiltersPage = new CaseSearchFilters

   caseSearchFiltersPage.isLoaded()

   expect(caseSearchFiltersPage.getPageTitleLabel()).toBe('Search')
   expect(caseSearchFiltersPage.jurisdictionDropDownIsClickable()).toBeTruthy();
   expect(caseSearchFiltersPage.caseTypeDropDownIsClickable()).toBeTruthy();
  // expect(caseSearchFiltersPage.applyButtonIsClickable()).toBeTruthy();

});

it('Should be able to navigate to create case', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   caseListResultsPage.clickCreateCaseButton()

   caseCreateStartPage = new CaseCreateStart

   expect(caseCreateStartPage.getPageTitleLabel()).toBe('Create Case')
   expect(caseCreateStartPage.jurisdictionDropDownIsClickable()).toBeTruthy()
   expect(caseCreateStartPage.caseTypeDropDownIsClickable()).toBeTruthy()
   expect(caseCreateStartPage.eventDropDownIsClickable()).toBeTruthy()
   expect(caseCreateStartPage.submitButtonIsClickable()).toBeTruthy()


});

it('Should be able to navigate to start to create case', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   caseListResultsPage.clickCreateCaseButton()

   createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   caseCreateStepPage = new CaseCreateStep

   expect(caseCreateStepPage.getPageTitleLabel()).toBe('Create a new case')
   expect(caseCreateStepPage.continueButtonIsClickable()).toBeTruthy()
   expect(caseCreateStepPage.previousButtonIsEnabled()).toBe(false)
   expect(caseCreateStepPage.cancelLinkIsClickable()).toBeTruthy()

});

it('Should be able to navigate to start to create case then cancel', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   caseListResultsPage.clickCreateCaseButton()

   createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   caseCreateStepPage = new CaseCreateStep

   caseCreateStepPage.clickCancelLink()

   expect(caseCreateStartPage.getPageTitleLabel()).toBe('Create Case')

});


it('Should be able to navigate back to a previous create case step', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   caseListResultsPage.clickCreateCaseButton()

   createCaseStartPage = new CaseCreateStart

   createCaseStartPage.clickSubmitButton()

   caseCreateStepPage = new CaseCreateStep

   caseCreateStepPage.clickContinueButton()

   browser.waitForAngular
   caseCreateStepPage.isLoaded()
   expect(caseCreateStepPage.previousButtonIsClickable()).toBe(true)
   caseCreateStepPage.clickPreviousButton()

   browser.waitForAngular
   caseCreateStepPage.isLoaded()
   expect(caseCreateStepPage.previousButtonIsEnabled()).toBe(false)

});

it('Should be able to navigate through all create case step to view a case', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stepUtils = new StepUtils

   stepUtils.fromCaseListResults_startANewCase()
   stepUtils.fromCaseStep_throughSteps(3)

   caseCreateStepPage.clickSubmitButton()

   caseViewPage = new CaseView

   caseViewPage.isLoaded()

   let caseIDMatcher = /^#(\d){4}-(\d){4}-(\d){4}-(\d){4}$/

   expect(caseViewPage.getCaseID()).toMatch(caseIDMatcher)

});

});
