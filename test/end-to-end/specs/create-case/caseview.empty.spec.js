let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseViewHistoryTab = require('../../../page-objects/caseViewHistoryTab.po.js')

describe('create and view case - empty case type (read/write)', function() {

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

it('Should have history tab', function() {

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(4)

   let caseCreateCYAPage = new CaseCreateCYA
   caseCreateCYAPage.clickSubmitButton()

   let caseIDMatcher = /^#(\d){4}-(\d){4}-(\d){4}-(\d){4}$/

   let caseView = new CaseView

   expect(caseView.getCaseID()).toMatch(caseIDMatcher)
   expect(caseView.getTabLabelText(0)).toBe('History')

});

it('Should have history with create event activity', function() {

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(4)

   let caseCreateCYAPage = new CaseCreateCYA
   caseCreateCYAPage.clickSubmitButton()

   let caseViewHistoryTabPage = new CaseViewHistoryTab
//   caseViewHistoryTabPage.isLoaded()

   let failedOnMissingSubHeading = 'sub heading not found on case view page, history tab, event activity'
   let failedOnMissingColumnLabel = 'column not displayed on case view page, history tab, event activity'

   expect(caseViewHistoryTabPage.getSubHeadingText(0)).toBe('History', failedOnMissingSubHeading)
   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(0)).toBe('Date', failedOnMissingColumnLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(1)).toBe('Author', failedOnMissingColumnLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(2)).toBe('Event', failedOnMissingColumnLabel)


   let dateFormat = require('dateformat');

   let now = new Date();
   let now_month_day = dateFormat(now, "mmm dd, yyyy");

   let rowNum = 0
   let failedOnExpectedFieldValue = 'field value for row ' + rowNum + ' was not as expected on case view page, history tab, event activity'

   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(rowNum, 0)).toBe(now_month_day, failedOnExpectedFieldValue)
   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(rowNum, 1)).toBe("Auto TEST", failedOnExpectedFieldValue)
   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(rowNum, 2)).toBe("Create a new case", failedOnExpectedFieldValue)

});

it('Should have history with case event detail', function() {

   let stopAtCYA = 4

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()
   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(4)

   let caseCreateCYAPage = new CaseCreateCYA
   caseCreateCYAPage.clickSubmitButton()

   let caseViewHistoryTabPage = new CaseViewHistoryTab
//   caseViewHistoryTabPage.isLoaded()

   expect(caseViewHistoryTabPage.getSubHeadingText(1)).toBe('Details')

   let dateFormat = require('dateformat');
   let now = new Date();
   let now_month_day_hour = dateFormat(now, "mmm dd, yyyy, h");

   let failedOnMissingEventDetailFieldLabel = 'field label is not present as expected for event detail displayed'
   let failedOnMissingEventDetailFieldValue = 'field value is not as expected for event detail displayed'

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(0)).toBe('Date', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(0)).toContain(now_month_day_hour, failedOnMissingEventDetailFieldValue)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(1)).toBe('Author', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(1)).toBe('Auto TEST', failedOnMissingEventDetailFieldValue)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(2)).toBe('End state', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(2)).toBe('To do', failedOnMissingEventDetailFieldValue)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(3)).toBe('Event', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(3)).toBe('Create a new case', failedOnMissingEventDetailFieldValue)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(4)).toBe('Summary', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(4)).toBe('-', failedOnMissingEventDetailFieldValue)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(5)).toBe('Comment', failedOnMissingEventDetailFieldLabel)
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(5)).toBe('-', failedOnMissingEventDetailFieldValue)

});

});
