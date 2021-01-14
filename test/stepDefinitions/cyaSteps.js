let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let baseSteps = require('./baseSteps.js');
let CyaPage = require('../pageObjects/cyaPage')
CustomError = require('../utils/errors/custom-error.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseWizardPage = new CreateCaseWizardPage();
  let cyaPage = new CyaPage();

  Given(/^I am on the check your answers page$/, async function () {
    //multiple pages caseType
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField('text');
    await caseWizardPage.clickContinueButton();
    this.fieldObject = await caseWizardPage.interactWithField('text');
    this.label = await this.fieldObject.getLabel();
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text');
    await caseWizardPage.clickContinueButton();
  });


  When('I click the change link', async function () {
    await caseWizardPage.clickChangeLink(this.label)
  });


  When(/^I click the 'change' link for '(.*)'$/, async function (fieldLabel) {
    await caseWizardPage.clickChangeLink(fieldLabel)
  });


  When(/^I change the value of the field$/, async function () {
    this.fieldObject = await caseWizardPage.interactWithField('text');
  });


  Then('I am navigated back to the page containing the field', async function () {
    let expectedHeader = 'Case Multiple Pages: Page 2/3 - Create a case';
    let failMessage = 'page header not expected, on wrong page?';

    expect(await caseWizardPage.getPageHeader(),failMessage).to.equal(expectedHeader)
  });


  When(/^the new value will be shown in Check Your Answers$/, async function () {
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickContinueButton();

    // let fieldLabel = await this.fieldObject.label;
    let actualValue = await caseWizardPage.getCheckYourAnswersValueByLabel(this.label);
    let expectedValue = await this.fieldObject.checkYourAnswersValue;

    expect(actualValue, 'wrong value for CYA').to.equal(expectedValue)
  });


  When(/^I do not fill in the Mandatory field$/, async function () {
    await baseSteps.navigateToCreateCasePage()
  });


  When(/^I Submit the case$/, async function () {
    while (await caseWizardPage.continueButtonDisplayed()) {
      if (!caseWizardPage.continueButtonEnabled()) {
        throw new CustomError('Trying to click Continue/Submit button but it is not enabled')
      }
      await caseWizardPage.clickContinueButton();
    }
  });

  Then(/^the following fields will be visible on CYA page:$/, async function (dataTable) {
    let expectedFields = await [].concat(...dataTable.raw());
    let actualFields = await cyaPage.getFieldLabels();
    for (const expectedField of expectedFields) {
      expect(actualFields).to.include(expectedField);
    }
  });

  Then(/^the following fields will NOT be visible on CYA page:$/, async function (dataTable) {
    let expectedFields = await [].concat(...dataTable.raw());
    let actualFields = await cyaPage.getFieldLabels();
    for (const expectedField of expectedFields) {
      expect(actualFields).not.to.include(expectedField);
    }
  });

  Then(/^the following complex fields will be visible on CYA page:$/, async function (dataTable) {
    let expectedFields = await [].concat(...dataTable.raw());
    let actualFields = await cyaPage.getComplexFieldLabels();
    for (const expectedField of expectedFields) {
      expect(actualFields).to.include(expectedField);
    }
  });

  Then(/^the following complex fields will NOT be visible on CYA page:$/, async function (dataTable) {
    let expectedFields = await [].concat(...dataTable.raw());
    let actualFields = await cyaPage.getComplexFieldLabels();
    for (const expectedField of expectedFields) {
      expect(actualFields).not.to.include(expectedField);
    }
  });
});

