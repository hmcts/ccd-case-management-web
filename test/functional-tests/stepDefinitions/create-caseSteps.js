let TestData = require('../utils/TestData.js');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

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
    await wizardPage.clickContinueButton();
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

});

