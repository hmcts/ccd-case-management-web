let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')

describe('create and view - simple yes or no type (read/write)', function() {

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

it('Should create case with simple yes or no type and display on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)

   let failedOnMissingFieldLabel = 'Field labels missing from field on create step ' + stopAtStep
   let failedOnMissingFieldHint = 'Field hint missing from field on create step ' + stopAtStep
   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getYesOrNoButtonsLabel()).toBe('A `YesOrNo` field (Optional)', failedOnMissingFieldLabel)
   expect(caseCreateStep.getYesOrNoButtonsHint()).toBe('A simple boolean.', failedOnMissingFieldHint)
   expect(caseCreateStep.isYesOrNoButtonSelected()).toBe(false, failedOnFieldValue)

   caseCreateStep.clickYesButton()
   expect(caseCreateStep.isYesOrNoButtonSelected()).toBe(true, failedOnFieldValue)

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `YesOrNo` field']
   let v = ['Yes']
   let c = ['Change']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'
   let failedOnMissingLink = 'Link was missing from check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(2)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(2)).toEqual(v, failedOnFieldValue)
   expect(caseCreateCYAPage.getFormRowChangeLinkText(2)).toEqual(c, failedOnMissingLink)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(2)).toBe('A `YesOrNo` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(2)).toBe('Yes', failedOnFieldValue)

})

it('Should create case with simple yes or no type (use previous) and displayed on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)

   caseCreateStep.clickYesButton()
   caseCreateStep.clickContinueButton()
   caseCreateStep.clickPreviousButton()
   browser.waitForAngular

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.isYesOrNoButtonSelected()).toBe(true, failedOnFieldValue)

   caseCreateStep.clickNoButton()

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   let caseCreateCYAPage = new CaseCreateCYA

    let l = ['A `YesOrNo` field']
    let v = ['No']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(2)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(2)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(2)).toBe('A `YesOrNo` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(2)).toBe('No', failedOnFieldValue)

 })

it('Should create a case with simple yes or no type (using check your answers) and displayed on caseview', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.clickNoButton()

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   caseCreateCYAPage.clickFormRowChangeLink(3)

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.isYesOrNoButtonSelected()).toBe(true, failedOnFieldValue)

   caseCreateStep.clickYesButton()

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `YesOrNo` field']
   let v = ['Yes']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(2)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(2)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(2)).toBe('A `YesOrNo` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(2)).toBe('Yes', failedOnFieldValue)

});

});
