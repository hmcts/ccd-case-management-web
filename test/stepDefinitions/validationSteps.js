
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage.js');
let baseSteps = require('./baseSteps.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
CustomError = require('../utils/errors/custom-error.js');


var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseWizardPage = new CreateCaseWizardPage();

  Then(/^no text will appear in the number field$/, async function() {
    let fieldContents = await caseWizardPage.getNumberFieldValue();
    console.log(fieldContents);
    expect(fieldContents).to.be.empty;
  });

  Then(/^there will be validation errors$/, async function() {
    let errSummaryBoxDisplayed = await caseWizardPage.errorSummaryDispalyed();
    let fieldErrorDisplayed = await caseWizardPage.fieldErrorDispalyed();

    expect(errSummaryBoxDisplayed).to.be.true;
    expect(fieldErrorDisplayed).to.be.true;
  });


  Then(/^there will be no validation errors$/, async function() {
    expect(await caseWizardPage.errorSummaryDispalyed()).to.be.false;
    expect(await caseWizardPage.fieldErrorDispalyed()).to.be.false;
  });


  Then(/^there will be a field validation error$/, async function() {
    expect(await caseWizardPage.fieldErrorDispalyed()).to.be.true;
  });

  Then(/^the 'Continue' button will be disabled$/, async function() {
    expect(await caseWizardPage.continueButtonEnabled()).to.be.false
  });


  Then(/^the 'Continue' button will be enabled/, async function() {
    expect(await caseWizardPage.continueButtonEnabled()).to.be.true

  });


  When(/^I click the Continue button$/, async function() {
    await caseWizardPage.clickContinueButton();
  });


  When(/^I can navigate to the next page$/, async function() {
    let page1Header = await caseWizardPage.getPageHeader();

    let errMessage = 'Continue button not enabled';
    expect(await caseWizardPage.continueButtonEnabled(), errMessage).to.be.true;
    await caseWizardPage.clickContinueButton();

    let page2Header = await caseWizardPage.getPageHeader();
    expect(page2Header,'Still on same page').to.not.equal(page1Header);
  });

  When(/^I enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await baseSteps.navigateToCreateCasePage()
    await caseWizardPage.interactWithField(fieldType,value);
  });

  When(/^I re-enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await caseWizardPage.interactWithField(fieldType,value);
  });

  When(/^I have a validation error from invalid '(.*)'$/, async function (dataType) {
    await baseSteps.navigateToCreateCasePage()

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


});
