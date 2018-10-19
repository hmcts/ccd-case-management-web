
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let NavBar = require('../pageObjects/ccd-components/globalNavBar.js');
let FieldUtils = require('../utils/fieldUtils.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {


  async function navigateToCreateCasePage(){
      createCaseStartPage = await caseListPage.getNavBarComponent().clickCreateCaseLink();
      await createCaseStartPage.selectJurisdiction('Test');
      await createCaseStartPage.selectCaseType('All Data Types');
      await createCaseStartPage.selectEvent('Create a case');
      await createCaseStartPage.clickStartButton();
  }

  When(/^I create a new case$/, async function () {
    await navigateToCreateCasePage()
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await navigateToCreateCasePage()
  });

  Then(/^I print console output of the fields on the page$/, async function () {
    console.log('should be on the wizard page now')
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
      await new CreateCaseWizardPage().clickProgressButton();
  });


  Then(/^I should see my value displayed$/, async function() {
    let label = await this.fieldObject.label;
    let expectedValue = await this.fieldObject.checkYourAnswersValue.toString();
    let value = await new CreateCaseWizardPage().getCheckYourAnswersValueByLabel(label);
    expect(expectedValue).to.equal(value);
  });


  Given(/^a case type containing every field type exists$/, function() {
    // todo : Placeholder for uploading a definition file, not priority now
  });



});

