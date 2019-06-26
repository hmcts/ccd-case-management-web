let CreateCaseWizardPage = require("../pageObjects/createCaseWizardPage");
let baseSteps = require("./baseSteps.js");
CustomError = require("../utils/errors/custom-error.js");
let TestData = require("../utils/TestData.js");

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode, setDefaultTimeout } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {
  setDefaultTimeout(300 * 1000);
  let caseWizardPage = new CreateCaseWizardPage();

  Given(/^I am on the case creation form page for case type '(.*)' and event '(.*)'$/, { timeout: -1 }, async function(caseType, eventName) {
    TestData.caseType = caseType;
    TestData.event = eventName;
    await baseSteps.navigateToCreateCasePage();
  });

  When(/^populate field '(.*)' with value '(.*)'$/, async function(fieldName, fieldValue) {
    await caseWizardPage.interactWithField("text", fieldValue, fieldName);
  });

  Then(/^the field '(.*)' is NOT visible$/, async function(fieldType) {
    let fieldPresent = await caseWizardPage.isFieldPresent(fieldType);
    expect(fieldPresent).to.be.false;
  });

  Then(/^the field with labelText '(.*)' is visible$/, async function(labelText) {
    let valueExists = await caseWizardPage.getCheckYourAnswersValueByLabel(labelText);
    expect(valueExists);
  });

});
