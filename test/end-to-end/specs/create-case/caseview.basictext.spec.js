let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')

describe('create and view - simple text type (read/write)', function() {

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

it('Should create case with simple text type inputs and display on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)

   let failedOnMissingFieldLabel = 'Field labels missing from field on create step' + stopAtStep
   let failedOnMissingFieldHint = 'Field hint missing from field on create step' + stopAtStep
   let failedOnFieldValue = 'Field value was not set as expected on create step' + stopAtStep

   expect(caseCreateStep.getTextInputFieldLabel()).toBe('A `Text` field (Optional)', failedOnMissingFieldLabel)
   expect(caseCreateStep.getTextInputFieldHint()).toBe('Some generic textual data.', failedOnMissingFieldHint)
   expect(caseCreateStep.getTextInputFieldBoxValue()).toBe('', failedOnFieldValue)

   caseCreateStep.setTextInputFieldBoxValue("This is text inputted")

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Text` field']
   let v = ['This is text inputted']
   let c = ['Change']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'
   let failedOnMissingLink = 'Link was missing from check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(0)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(0)).toEqual(v, failedOnFieldValue)
   expect(caseCreateCYAPage.getFormRowChangeLinkText(0)).toEqual(c, failedOnMissingLink)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(0)).toBe('A `Text` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(0)).toBe('This is text inputted', failedOnFieldValue)

})

it('Should create case with simple text type input (use previous) and displayed on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)

   caseCreateStep.setTextInputFieldBoxValue("This is text inputted")
   caseCreateStep.clickContinueButton()
   caseCreateStep.clickPreviousButton()
   browser.waitForAngular

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getTextInputFieldBoxValue()).toBe("This is text inputted", failedOnFieldValue)

   caseCreateStep.setTextInputFieldBoxValue("This is new text inputted")

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Text` field']
   let v = ['This is new text inputted']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(0)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(0)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(0)).toBe('A `Text` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(0)).toBe('This is new text inputted', failedOnFieldValue)

 })

it('Should create a case with text type input (using check your answers) and displayed on caseview', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep
   caseCreateStep.continueBy(stopAtStep)

   caseCreateStep.setTextInputFieldBoxValue("This is text inputted")

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA
   caseCreateCYAPage.clickFormRowChangeLink(0)

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getTextInputFieldBoxValue()).toBe("This is text inputted", failedOnFieldValue)

   caseCreateStep.setTextInputFieldBoxValue("This is changed text inputted")

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Text` field']
   let v = ['This is changed text inputted']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(0)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(0)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(0)).toBe('A `Text` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(0)).toBe('This is changed text inputted', failedOnFieldValue)

});

});
