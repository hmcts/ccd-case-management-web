let StepUtils = require('../../../utils/step.utils.js')
let Login = require('../../../page-objects/login.po.js')
let CaseListResults = require('../../../page-objects/caseListResults.po.js')
let CaseCreateStep = require('../../../page-objects/caseCreateStep.po.js')
let CaseCreateCYA = require('../../../page-objects/caseCreateCYA.po.js')
let CaseView = require('../../../page-objects/caseView.po.js')

describe('create and view case - simple phone number type (read/write)', function() {

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

it('Should create case with simple phone number type and display on case view', function() {

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

   expect(caseCreateStep.getPhoneNumberInputFieldLabel()).toBe('A `PhoneUK` field (Optional)', failedOnMissingFieldLabel)
   expect(caseCreateStep.getPhoneNumberInputFieldHint()).toBe('A UK phone number.', failedOnMissingFieldHint)
   expect(caseCreateStep.getPhoneNumberInputFieldBoxValue()).toBe('', failedOnFieldValue)

   caseCreateStep.setPhoneNumberInputFieldBoxValue('+440208123123')

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `PhoneUK` field']
   let v = ['+440208123123']
   let c = ['Change']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'
   let failedOnMissingLink = 'Link was missing from check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(3)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(3)).toEqual(v, failedOnFieldValue)
   expect(caseCreateCYAPage.getFormRowChangeLinkText(3)).toEqual(c, failedOnMissingLink)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(3)).toBe('A `PhoneUK` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(3)).toBe('+440208123123', failedOnFieldValue)

})

it('Should create case with simple phone number type (use previous) and displayed on case view', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)
   caseCreateStep.setPhoneNumberInputFieldBoxValue('+440208123123')
   caseCreateStep.clickContinueButton()
   caseCreateStep.clickPreviousButton()
   browser.waitForAngular

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getPhoneNumberInputFieldBoxValue()).toBe('+440208123123', failedOnFieldValue)

   caseCreateStep.setPhoneNumberInputFieldBoxValue('+440192312345')

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `PhoneUK` field']
   let v = ['+440192312345']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(3)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(3)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(3)).toBe('A `PhoneUK` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(3)).toBe('+440192312345', failedOnFieldValue)

 })

it('Should create a case with phone number type (using check your answers) and displayed on caseview', function() {

   let caseListResultsPage = new CaseListResults

   caseListResultsPage.isLoaded()

   let stopAtStep = 0

   let stepUtils = new StepUtils
   stepUtils.caseListResultsPageStartingANewCase()

   let caseCreateStep = new CaseCreateStep

   caseCreateStep.continueBy(stopAtStep)
   caseCreateStep.setPhoneNumberInputFieldBoxValue('+440192312345')

   let stopAtCYA = 3

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   caseCreateCYAPage.clickFormRowChangeLink(1)

   let failedOnFieldValue = 'Field value was not set as expected on create step ' + stopAtStep

   expect(caseCreateStep.getPhoneNumberInputFieldBoxValue()).toBe('+440192312345', failedOnFieldValue)

   caseCreateStep.setPhoneNumberInputFieldBoxValue('+440208123123')

   caseCreateStep.continueBy(stopAtCYA)

   caseCreateCYAPage = new CaseCreateCYA

   let l = ['A `PhoneUK` field']
   let v = ['+440208123123']

   failedOnMissingFieldLabel = 'Field labels missing from field on check your answers page'
   failedOnFieldValue = 'Field value was not set as expected on check your answers page'

   expect(caseCreateCYAPage.getFormRowLabelText(3)).toEqual(l, failedOnMissingFieldLabel)
   expect(caseCreateCYAPage.getFormRowValueText(3)).toEqual(v, failedOnFieldValue)
   caseCreateCYAPage.clickSubmitButton()

   let caseViewPage = new CaseView

   caseViewPage.clickTabLabeled('First tab')

   failedOnMissingFieldLabel = 'Field labels missing from field on case view page'
   failedOnFieldValue = 'Field value was not set as expected on case view page'

   expect(caseViewPage.getTabRowLabelText(3)).toBe('A `PhoneUK` field', failedOnMissingFieldLabel)
   expect(caseViewPage.getTabRowValueText(3)).toBe('+440208123123', failedOnFieldValue)

});

});
