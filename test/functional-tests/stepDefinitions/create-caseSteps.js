let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');
let baseSteps = require('./baseSteps.js');
CustomError = require('../utils/errors/custom-error.js');
let TestData = require('../utils/TestData.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseWizardPage = new CreateCaseWizardPage();
  let caseListPage = new CaseListPage();  
  let createCaseStartPage = new CreateCaseStartPage();


  async function fillOutAndSubmitForm(){
    //todo eventually change to be dynamic and automatic
    let wizardPage = new CreateCaseWizardPage();
    await wizardPage.interactWithField('text');
    await wizardPage.clickContinueButton();
    await wizardPage.clickSubmitCaseButton();
  }

  When(/^I create the case$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await fillOutAndSubmitForm();
  });

  When(/^I have navigated to a case in the state 'Case created'$/, async function () {
    //todo should we pushing this data in through API instead?
    await baseSteps.navigateToCreateCasePage();
    await fillOutAndSubmitForm();
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await baseSteps.navigateToCreateCasePage();
  });

  Then(/^I should see a '(.*)' field$/, async function(dataType) {
      let fieldDisplayed = await new CreateCaseWizardPage().isFieldPresent(dataType);
      expect(fieldDisplayed).to.be.true;
  });

  Given(/^I have filled out the '(.*)' field$/, async function(dataType) {
    await baseSteps.navigateToCreateCasePage()
    // await navigateToCreateCasePage();
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


  When(/^I click the 'Create a case' button$/, async function () {
    await caseListPage.clickCreateNewCaseButton();
  });

  Then(/^I will be navigated to the 'Create Case' page$/, async function () {
    expect(await new CreateCaseStartPage().amOnPage()).to.be.true
  });

  //---- conditionals

  When(/^I meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  When(/^I do NOT meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage()
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text','dontshowmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });


  Then(/^the field with label '(.*)' is not visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.not.include(expectedLabel);
  });

  Then(/^the field with label '(.*)' is visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.include(expectedLabel);
  });

  Then(/^I will not be on the '(.*)' page$/, async function (expectedPageHeader) {
    let pageHeader = await caseWizardPage.getPageHeader();
    expect(pageHeader).to.not.equal(expectedPageHeader);
  });

  Then(/^I will be on the '(.*)' page$/, async function (expectedPageHeader) {
    let pageHeader = await caseWizardPage.getPageHeader();
    expect(pageHeader).to.equal(expectedPageHeader);
  });

  Given(/^I have filled out the create case filters$/, async function () {
    await caseListPage.getNavBarComponent().clickCreateCaseLink();
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
  });

  When(/^I click the 'Start' button$/, async function () {
    await createCaseStartPage.clickStartButton();
  });

  Then(/^I will be navigated to 'Create Case' wizard form page$/, async function () {
    browser.getCurrentUrl().then(function(currentUrl){
      expect(currentUrl.indexOf('createCaseSingleFormPage') > -1).to.be.true
    });
  });


});
