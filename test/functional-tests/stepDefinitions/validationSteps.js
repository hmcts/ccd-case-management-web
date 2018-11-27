
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseWizardPage = require('../pageObjects/CreateCaseWizardPage.js');
let NavBar = require('../pageObjects/ccd-components/globalNavBar.js');
let Data = require('../utils/TestData.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let wizardPage = new CreateCaseWizardPage();

  Then(/^no text will appear in the number field$/, async function() {
    let fieldContents = await wizardPage.getNumberFieldValue();
    console.log(fieldContents);
    expect(fieldContents).to.be.empty;
  });

  Then(/^there will be validation errors$/, async function() {
    let errSummaryBoxDisplayed = await wizardPage.errorSummaryDispalyed();
    let fieldErrorDisplayed = await wizardPage.fieldErrorDispalyed();

    expect(errSummaryBoxDisplayed).to.be.true;
    expect(fieldErrorDisplayed).to.be.true;
  });


  Then(/^there will be no validation errors$/, async function() {
    expect(await wizardPage.errorSummaryDispalyed()).to.be.false;
    expect(await wizardPage.fieldErrorDispalyed()).to.be.false;
  });


  Then(/^there will be a field validation error$/, async function() {
    expect(await wizardPage.fieldErrorDispalyed()).to.be.true;
  });

  Then(/^the 'Continue' button will be disabled$/, async function() {
    expect(await wizardPage.continueButtonEnabled()).to.be.false
  });


  Then(/^the 'Continue' button will be enabled/, async function() {
    expect(await wizardPage.continueButtonEnabled()).to.be.true

  });


  When(/^I click the Continue button$/, async function() {
    await wizardPage.clickContinueButton();
  });


  When(/^I can navigate to the next page$/, async function() {
    let page1Header = await wizardPage.getPageHeader();

    let errMessage = 'Continue button not enabled';
    expect(await wizardPage.continueButtonEnabled(), errMessage).to.be.true;
    await wizardPage.clickContinueButton();

    let page2Header = await wizardPage.getPageHeader();
    expect(page2Header,'Still on same page').to.not.equal(page1Header);
  });




});
