let TestData = require('../utils/TestData.js');
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');
CustomError = require('../utils/errors/custom-error.js');



let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseWizardPage = new CreateCaseWizardPage();

  async function navigateToCreateCasePage(){
      createCaseStartPage = await caseListPage.getNavBarComponent().clickCreateCaseLink();
      await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
      await createCaseStartPage.selectCaseType(TestData.caseType);
      await createCaseStartPage.selectEvent(TestData.event);
      await createCaseStartPage.clickStartButton();
  }


  async function fillOutAndSubmitForm(){
    //todo eventually change to be dynamic and automatic
    let wizardPage = new CreateCaseWizardPage();
    await wizardPage.interactWithField('text');
    await wizardPage.clickContinueButton();
    await wizardPage.clickSubmitCaseButton();
  }

  When(/^I create the case$/, async function () {
    await navigateToCreateCasePage();
    await fillOutAndSubmitForm();
  });

  When(/^I have navigated to a case in the state 'Case created'$/, async function () {
    //todo should we pushing this data in through API instead?
    await navigateToCreateCasePage();
    await fillOutAndSubmitForm();
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await navigateToCreateCasePage();
  });

  Then(/^I should see a '(.*)' field$/, async function(dataType) {
      let fieldDisplayed = await new CreateCaseWizardPage().isFieldPresent(dataType);
      expect(fieldDisplayed).to.be.true;
  });

  Given(/^I have filled out the '(.*)' field$/, async function(dataType) {
    await navigateToCreateCasePage();
    this.fieldObject = await new CreateCaseWizardPage().interactWithField(dataType);
  });

  When(/^I navigate to the 'check your answers' form page$/, async function() {
      await new CreateCaseWizardPage().clickContinueButton();
  });

  Then(/^I should see my value displayed$/, async function() {
    let label = await this.fieldObject.label;
    let expectedValue = await this.fieldObject.checkYourAnswersValue.toString();
    let value = await new CreateCaseWizardPage().getCheckYourAnswersValueByLabel(label);
    expect(expectedValue).to.equal(value);
  });

  When(/^I select and submit the event '(.*)'$/, async function (event) {
    await new CaseDetailsPage().startEvent(event)
    await fillOutAndSubmitForm();
  });


  //----- VALIDATION STEPS -----

  When(/^I enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await navigateToCreateCasePage()
    await caseWizardPage.interactWithField(fieldType,value);
  });

  When(/^I re-enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await caseWizardPage.interactWithField(fieldType,value);
  });

  When(/^I have a validation error from invalid '(.*)'$/, async function (dataType) {
    await navigateToCreateCasePage()

    switch (dataType){
      case "email" :
        await caseWizardPage.interactWithField(dataType,'invalidemail.com');
        await caseWizardPage.clickContinueButton();
        break
      case "money-gbp" :
        await caseWizardPage.interactWithField(dataType,'-10');
        break;
      case "phone uk":
        await caseWizardPage.interactWithField(dataType,'12345');
        await caseWizardPage.clickContinueButton();
        break;
      case "date":
        await caseWizardPage.interactWithField(dataType,'10201990');
        await caseWizardPage.clickContinueButton();
        break;
      case "regex":
        await caseWizardPage.interactWithField('text','lower case is invalid');
        await caseWizardPage.clickContinueButton();
        break;
      default: throw new CustomError(`option ${dataType} not found`)
    }

  });


  //----- Check Your Answers

  Given(/^I am on the check your answers page$/, async function () {
    //multiple pages caseType
    await navigateToCreateCasePage()
    await caseWizardPage.interactWithField('text');
    await caseWizardPage.clickContinueButton();
    this.fieldObject = await caseWizardPage.interactWithField('text');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text');
    await caseWizardPage.clickContinueButton();
  });


  When('I click the change link', async function () {
    let label = this.fieldObject.label.toString();
    await caseWizardPage.clickChangeLink(label)
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

    let fieldLabel = await this.fieldObject.label;
    let actualValue = await caseWizardPage.getCheckYourAnswersValueByLabel(fieldLabel)
    let expectedValue = await this.fieldObject.checkYourAnswersValue;

    expect(actualValue, 'wrong value for CYA').to.equal(expectedValue)
  });


  When(/^I do not fill in the Mandatory field$/, async function () {
    await navigateToCreateCasePage()
  });


});

