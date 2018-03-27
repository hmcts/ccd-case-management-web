let Login = require('../../../page-objects/login.po.js')
let StepUtils = require('../../../utils/step.utils.js')
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

it('Should have history', function() {

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
   expect(caseViewHistoryTabPage.getSubHeadingText(0)).toBe('History')
   expect(caseViewHistoryTabPage.getSubHeadingText(1)).toBe('Details')

   expect(caseViewHistoryTabPage.getHistoryEventColumnName(0)).toBe('Date')
   expect(caseViewHistoryTabPage.getHistoryEventColumnName(1)).toBe('Author')
   expect(caseViewHistoryTabPage.getHistoryEventColumnName(2)).toBe('Event')


   let dateFormat = require('dateformat');
   let now = new Date();
   let now_month_day = dateFormat(now, "mmm dd, yyyy");

   expect(caseViewHistoryTabPage.getHistoryEventRowValue(0, 0)).toBe(now_month_day)
   expect(caseViewHistoryTabPage.getHistoryEventRowValue(0, 1)).toBe("User TEST")
   expect(caseViewHistoryTabPage.getHistoryEventRowValue(0, 2)).toBe("Create a new case")

});
//
//it('Should have details', function() {
//
//   stepUtils = new StepUtils
//   stepUtils.fromCaseListResults_startANewCase()
//   stepUtils.fromCaseStep_throughSteps(3)
//
//   caseCreateStepPage = new CaseCreateStep
//   caseCreateStepPage.clickSubmitButton()
//
//   caseViewPage = new CaseView
//   caseViewPage.isLoaded()
//
//   let caseIDMatcher = /^#(\d){4}-(\d){4}-(\d){4}-(\d){4}$/
//
//   expect(caseViewPage.getCaseID()).toMatch(caseIDMatcher)
//
//});

});
