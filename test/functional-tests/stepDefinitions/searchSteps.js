
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

  Then(/^I should see a '(.*)' dynamic filter with '(.*)' labels and '(.*)' values$/, async function(dataType, labels, values) {
    expect(await new SearchPage().isFieldPresent(dataType)).to.be.true;
    expect(await new SearchPage().hasFieldLabels(dataType, labels.split(','))).to.be.true;
    expect(await new SearchPage().isFieldInputReady(dataType, values.split(','))).to.be.true;
  });

  Then(/^The search dropdowns will be empty$/, async function() {
    searchPage = new SearchPage();
    expect(await searchPage.isJurisdictionSelected()).to.be.false;
    expect(await searchPage.isCaseTypeSelected()).to.be.false;
  });

  Then(/^I should not see a '(.*)' dynamic filter$/, async function(dataType) {
    expect(await new SearchPage().isFieldPresent(dataType)).to.be.false;
  });

  Then(/^the search result table will be displayed$/, async function() {
    searchPage = new SearchPage();
    expect(await searchPage.isSearchResultsDisplayed()).to.be.true;
  });

});
