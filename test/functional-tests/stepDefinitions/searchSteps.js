
let SearchPage = require('../pageObjects/searchPage.js');
let TestData = require('../utils/TestData.js');
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
global._ = require('../utils/fieldUtils.js');

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  Given(/^I am on the search page$/, async function () {
    searchPage = new SearchPage();
    await searchPage.getNavBarComponent().clickSearchLink();
    await searchPage.selectJurisdiction(TestData.jurisdiction);
  });

  Given(/^I am on the search page and selected case type$/, async function () {
    searchPage = new SearchPage();
    await searchPage.getNavBarComponent().clickSearchLink();
    await searchPage.selectJurisdiction(TestData.jurisdiction);
    await searchPage.selectCaseType(TestData.caseType);
  });

  Given(/^I have filled out the search filters$/, async function() {
    let searchPage = new SearchPage();
    await searchPage.interactWithField('text', 'text');
  });

  Given(/^I have filled out the search filters including dynamic filters$/, async function() {
    let searchPage = new SearchPage();
    await searchPage.interactWithField('text');
    await searchPage.interactWithField('textarea');
    await searchPage.interactWithField('number');
    await searchPage.interactWithField('address');
    await searchPage.interactWithField('money-gbp');
    await searchPage.interactWithField('date');
    await searchPage.interactWithField('document');
    await searchPage.interactWithField('email');
    await searchPage.interactWithField('fixed-list');
    await searchPage.interactWithField('phone-uk');
    await searchPage.interactWithField('yes-no');
    await searchPage.interactWithField('collection');
    await searchPage.interactWithField('complex');
  });

  When(/^I change the jurisdiction search drop down option$/, async function () {
    searchPage = new SearchPage();
    TestData.jurisdiction = 'Test';
    await searchPage.selectJurisdiction(TestData.jurisdiction);
  });

  When(/^I select the 'Case type' drop down option for dynamic filters$/, async function () {
    searchPage = new SearchPage();
    await searchPage.selectJurisdiction(TestData.jurisdiction);
    await searchPage.selectCaseType(TestData.caseType);
  });

  When(/^I click the 'Reset' button$/, async function () {
    searchPage = new SearchPage();
    await searchPage.clickResetButton();
  });

  When(/^I click the 'Apply' button$/, async function () {
    searchPage = new SearchPage();
    await searchPage.clickApplyButton();
  });

  Then(/^the banner title matches that of the currently selected jurisdiction$/, async function () {
    searchPage = new SearchPage();
    let titleLabel = await searchPage.getNavBarComponent().getTitleLabel();
    expect(titleLabel).to.equal(TestData.jurisdiction);
  });

  Then(/^a dynamic filter of every datatype will be displayed$/, async function () {
    expect(await searchPage.isTextFieldPresent()).to.be.true;
    expect(await searchPage.hasTextFieldLabel('Text Field')).to.be.true;
    expect(await searchPage.isTextFieldInputReady('#TextField')).to.be.true;

    expect(await searchPage.isTextAreaFieldPresent()).to.be.true;
    expect(await searchPage.hasTextAreaFieldLabel('Text Area')).to.be.true;
    expect(await searchPage.isTextAreaFieldInputReady()).to.be.true;

    expect(await searchPage.isDateFieldPresent()).to.be.true;
    expect(await searchPage.hasDateFieldLabel('Date Field')).to.be.true;
    expect(await searchPage.isDateFieldInputReady()).to.be.true;

    expect(await searchPage.isComplexTypeFieldPresent()).to.be.true;
    expect(await searchPage.hasComplexTypeFieldLabel(['Address Field', 'Address Line 1', 'Address Line 2', 'Address Line 3', 'Country'],
                                                     ['#AddressLine1', '#AddressLine2', '#AddressLine3', '#Country'])).to.be.true;
    expect(await searchPage.isComplexTypeFieldInputReady(['#AddressLine1', '#AddressLine2', '#AddressLine3', '#Country'])).to.be.true;

    expect(await searchPage.isPhoneFieldPresent()).to.be.true;
    expect(await searchPage.hasPhoneFieldLabel('Phone Field')).to.be.true;
    expect(await searchPage.isPhoneFieldInputReady()).to.be.true;

    expect(await searchPage.isNumberFieldPresent()).to.be.true;
    expect(await searchPage.hasNumberFieldLabel('Number Field')).to.be.true;
    expect(await searchPage.isNumberFieldInputReady()).to.be.true;

    expect(await searchPage.isYesNoFieldPresent()).to.be.true;
    expect(await searchPage.hasYesNoFieldLabel('Yes or No Field')).to.be.true;
    expect(await searchPage.isYesNoFieldInputReady()).to.be.true;

    expect(await searchPage.isCollectionFieldPresent()).to.be.true;
    expect(await searchPage.hasCollectionFieldLabel('Collection Field')).to.be.true;
    expect(await searchPage.isCollectionFieldInputReady()).to.be.true;

    expect(await searchPage.isFixedListFieldPresent()).to.be.true;
    expect(await searchPage.hasFixedListFieldLabel('Marrital Status Field')).to.be.true;
    expect(await searchPage.isFixedListFieldInputReady(['--Select a value--', ' Marriage ', ' Civil Partnership ', ' Single ', ' Widow '])).to.be.true;

    expect(await searchPage.isMoneyGBPFieldPresent()).to.be.true;
    expect(await searchPage.hasMoneyGBPFieldLabel('Money Field')).to.be.true;
    expect(await searchPage.isMoneyGBPFieldInputReady()).to.be.true;

    expect(await searchPage.isDocumentFieldPresent()).to.be.true;
    expect(await searchPage.hasDocumentFieldLabel('Document Field')).to.be.true;
    expect(await searchPage.isDocumentFieldInputReady()).to.be.true;

    expect(await searchPage.isMultiSelectFieldPresent()).to.be.true;
    expect(await searchPage.hasMultiSelectFieldLabel(['Multi Select Field', 'Cardiff', 'Manchester', 'Oxford'],
                                                     ['#MultiSelectField-CARDIFF', '#MultiSelectField-MANCHESTER', '#MultiSelectField-OXFORD'])).to.be.true;
    expect(await searchPage.isMultiSelectFieldInputReady(['#MultiSelectField-CARDIFF', '#MultiSelectField-MANCHESTER', '#MultiSelectField-OXFORD'])).to.be.true;

    expect(await searchPage.isEmailFieldPresent()).to.be.true;
    expect(await searchPage.hasEmailFieldLabel('Email Field')).to.be.true;
    expect(await searchPage.isEmailFieldInputReady()).to.be.true;
  });

  Then(/^The search dropdowns will be empty$/, async function() {
    searchPage = new SearchPage();
    expect(await searchPage.isJurisdictionSelected()).to.be.false;
    expect(await searchPage.isCaseTypeSelected()).to.be.false;
  });

  Then(/^there will be no dynamic search filters visible$/, async function() {
    searchPage = new SearchPage();
    expect(await searchPage.isTextFieldPresent()).to.be.false;
    expect(await searchPage.isTextAreaFieldPresent()).to.be.false;
    expect(await searchPage.isDateFieldPresent()).to.be.false;
    expect(await searchPage.isComplexTypeFieldPresent()).to.be.false;
    expect(await searchPage.isYesNoFieldPresent()).to.be.false;
    expect(await searchPage.isCollectionFieldPresent()).to.be.false;
    expect(await searchPage.isFixedListFieldPresent()).to.be.false;
    expect(await searchPage.isMoneyGBPFieldPresent()).to.be.false;
    expect(await searchPage.isDocumentFieldPresent()).to.be.false;
    expect(await searchPage.isMultiSelectFieldPresent()).to.be.false;
    expect(await searchPage.isEmailFieldPresent()).to.be.false;
  });

  Then(/^the search result table will be displayed$/, async function() {
    searchPage = new SearchPage();
    expect(await searchPage.isSearchResultsDisplayed()).to.be.true;
  });

});
