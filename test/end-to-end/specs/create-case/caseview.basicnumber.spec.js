let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')

describe('create and view case - simple number type (read/write)', function() {

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

it('Should create case with simple number type and display on case view', function() {

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

   expect(caseCreateStep.getNumberInputFieldLabel()).toBe('A `Number` field (Optional)', failedOnMissingFieldLabel)
   expect(caseCreateStep.getNumberInputFieldHint()).toBe('A numeric data.', failedOnMissingFieldHint)
   expect(caseCreateStep.getNumberInputFieldBoxValue()).toBe('', failedOnFieldValue)

   caseCreateStep.setNumberInputFieldBoxValue(5)

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Number` field']
   let v = ['5']
   let c = ['Change']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'
   let failedOnMissingLink = 'Link was missing from check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(1)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(1)).toEqual(v, failedOnFieldValue)
   expect(caseCreateCYAPage.getFormRowChangeLinkText(1)).toEqual(c, failedOnMissingLink)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(1)).toBe('A `Number` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(1)).toBe('5', failedOnFieldValue)

})

it('Should create case with simple number type (use previous) and displayed on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)
   caseCreateStep.setNumberInputFieldBoxValue(5)
   caseCreateStep.clickContinueButton()
   caseCreateStep.clickPreviousButton()
   browser.waitForAngular

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getNumberInputFieldBoxValue()).toBe('5', failedOnFieldValue)

   caseCreateStep.setNumberInputFieldBoxValue(10)

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Number` field']
   let v = ['10']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(1)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(1)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(1)).toBe('A `Number` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(1)).toBe('10', failedOnFieldValue)

 })

it('Should create a case with number type (using check your answers) and displayed on caseview', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)
   caseCreateStep.setNumberInputFieldBoxValue(5)

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   caseCreateCYAPage.clickFormRowChangeLink(1)

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getNumberInputFieldBoxValue()).toBe("5", failedOnFieldValue)

   caseCreateStep.setNumberInputFieldBoxValue(10)

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `Number` field']
   let v = ['10']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(1)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(1)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(1)).toBe('A `Number` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(1)).toBe('10', failedOnFieldValue)

});

});
