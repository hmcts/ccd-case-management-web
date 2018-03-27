let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseViewHistoryTab = require('../../../page-objects/caseViewHistoryTab.po.js')

describe('Caseview - with no optionals', function() {

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

it('Should have history tab', function() {

   stepUtils = new StepUtils
   stepUtils.fromCaseListResults_startANewCase()
   stepUtils.fromCaseStep_throughSteps(3)

   caseCreateStepPage = new CaseCreateStep
   caseCreateStepPage.clickSubmitButton()

   caseViewHistoryTabPage = new CaseViewHistoryTab
   caseViewHistoryTabPage.isLoaded()

   let caseIDMatcher = /^#(\d){4}-(\d){4}-(\d){4}-(\d){4}$/

   expect(caseViewHistoryTabPage.getCaseID()).toMatch(caseIDMatcher)

   expect(caseViewHistoryTabPage.getTabLabelText(0)).toBe('History')

});

it('Should have history with create event activity', function() {

   stepUtils = new StepUtils
   stepUtils.fromCaseListResults_startANewCase()
   stepUtils.fromCaseStep_throughSteps(3)

   caseCreateStepPage = new CaseCreateStep
   caseCreateStepPage.clickSubmitButton()

   caseViewHistoryTabPage = new CaseViewHistoryTab
   caseViewHistoryTabPage.isLoaded()

   expect(caseViewHistoryTabPage.getSubHeadingText(0)).toBe('History')

   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(0)).toBe('Date')
   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(1)).toBe('Author')
   expect(caseViewHistoryTabPage.getHistoryEventLogColumnName(2)).toBe('Event')


   let dateFormat = require('dateformat');
   let now = new Date();
   let now_month_day = dateFormat(now, "mmm dd, yyyy");

   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(0, 0)).toBe(now_month_day)
   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(0, 1)).toBe("User TEST")
   expect(caseViewHistoryTabPage.getHistoryEventLogRowFieldValue(0, 2)).toBe("Create a new case")

});

it('Should have history details', function() {

   stepUtils = new StepUtils
   stepUtils.fromCaseListResults_startANewCase()
   stepUtils.fromCaseStep_throughSteps(3)

   caseCreateStepPage = new CaseCreateStep
   caseCreateStepPage.clickSubmitButton()

   caseViewHistoryTabPage = new CaseViewHistoryTab

   caseViewHistoryTabPage.isLoaded()

   expect(caseViewHistoryTabPage.getSubHeadingText(1)).toBe('Details')

   let dateFormat = require('dateformat');
   let now = new Date();
   let now_month_day_hour = dateFormat(now, "mmm dd, yyyy, h");


   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(0)).toBe('Date')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(0)).toContain(now_month_day_hour)

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(1)).toBe('Author')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(1)).toBe('User TEST')

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(2)).toBe('End state')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(2)).toBe('To do')

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(3)).toBe('Event')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(3)).toBe('Create a new case')

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(4)).toBe('Summary')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(4)).toBe('')

   expect(caseViewHistoryTabPage.getHistoryEventLogDetailField(5)).toBe('Comment')
   expect(caseViewHistoryTabPage.getHistoryEventLogDetailFieldValue(5)).toBe('')

});

});
