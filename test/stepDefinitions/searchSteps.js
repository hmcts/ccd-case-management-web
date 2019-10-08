
let SearchPage = require('../pageObjects/searchPage.js');
let TestData = require('../utils/TestData.js');
let chai = require("chai").use(require("chai-as-promised"));
let baseSteps = require('./baseSteps.js');
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  searchPage = new SearchPage();

  Given(/^I am on the search page$/, async function () {
    await searchPage.getNavBarComponent().clickSearchLink();
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
  });

  Given(/^I have filled out the search filters$/, async function() {
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
    await searchPage.interactWithField('text', 'text');
  });

  Given(/^I have filled out the search filters including dynamic filters$/, async function() {
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
    await searchPage.interactWithField('text');
    await searchPage.interactWithField('textarea');
    await searchPage.interactWithField('number');
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
    TestData.jurisdiction = 'Test';
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
  });

  When(/^I select the 'Case type' drop down option for dynamic filters$/, async function () {
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
  });

  When(/^I click the 'Reset' button$/, async function () {
    await searchPage.getSearchFilters().clickResetButton();
  });

  When(/^I click the 'Apply' button$/, async function () {
    await searchPage.getSearchFilters().clickApplyButton();
  });

  When(/^a case exists$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await baseSteps.fillOutAndSubmitForm();
  });

  Then(/^the banner title matches that of the currently selected jurisdiction$/, async function () {
    let titleLabel = await searchPage.getNavBarComponent().getTitleLabel();
    expect(titleLabel).to.equal(TestData.jurisdiction);
  });

  Then(/^I should see a '(.*)' dynamic filter with '(.*)' labels and '(.*)' values$/, async function(dataType, labels, values) {
    expect(await searchPage.isFieldPresent(dataType)).to.be.true;
    expect(await searchPage.hasFieldLabels(dataType, labels.split(','))).to.be.true;
    expect(await searchPage.isFieldReady(dataType, values.split(','))).to.be.true;
  });

  Then(/^I should not see a '(.*)' dynamic filter$/, async function(dataType) {
    expect(await searchPage.isFieldPresent(dataType)).to.be.false;
  });

  Then(/^the search result table will be displayed$/, async function() {
    expect(await searchPage.isSearchResultsDisplayed()).to.be.true;
  });

  //Search Case List Steps
  /**
   * Checks search case list and continues to create a new case until there are 25 cases
   * @returns {Promise<void>}
   */
  //todo broken?
  async function bulkUpdateCases() {
    let columnResults = await searchPage.getCaseListComponent().getFirstColumnResults();
    if (columnResults.length < 25){
        await baseSteps.navigateToCreateCasePage();
        await baseSteps.fillOutAndSubmitForm();
        await searchPage.getNavBarComponent().clickSearchLink();
    }
  }

  Given(/^I have some cases listed in the results table$/, async function () {
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
    await searchPage.getSearchFilters().clickApplyButton();

    await bulkUpdateCases();
  });

  Given(/^I have more than 25 results$/, async function () {
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
    await searchPage.getSearchFilters().clickApplyButton();
    await bulkUpdateCases();
  });

  When(/^I have performed a search$/, async function () {
    await searchPage.getSearchFilters().selectJurisdiction(TestData.jurisdiction);
    await searchPage.getSearchFilters().selectCaseType(TestData.caseType);
    await searchPage.getSearchFilters().clickApplyButton();
    await bulkUpdateCases();
  });

  When(/^I click on sorting icon on the first column to '(.*)'$/, async function (sortOrder) {
    switch (sortOrder){
      case 'ascending':
        return await searchPage.getCaseListComponent().clickSortIconAscending();
      case 'descending':
        return await searchPage.getCaseListComponent().clickSortIconDescending();
      default:
        throw new CustomError(`Invalid option, options are 'ascending' 'descending'`)
    }
  });

  When(/^I click on the case link$/, async function () {
    await searchPage.getCaseListComponent().clickFirstColumnResultLink();
  });

  When(/^I click on page link 2$/, async function () {
    pageOneColumnOneFirstResult = await await searchPage.getCaseListComponent().getFirstColumnResultText()
    await searchPage.getCaseListComponent().clickPageTwo();
  });

  Then(/^I see cases listed in the results table$/, async function () {
    let columnResults = await searchPage.getCaseListComponent().getFirstColumnResults();
    expect (columnResults.length > 0).to.be.true;
  });

  Then(/^I see table header with correct result count$/, async function () {
    const resultText = await searchPage.getCaseListComponent().getResultCountText();
    const hasCorrectResult = resultText.includes('Displaying 1 - 25 out of ');

    expect (hasCorrectResult).to.be.true;
  });

  Then(/^the results of the page should be sorted in the descending order$/, async function () {
    const columnResults = await searchPage.getCaseListComponent().getFirstColumnResults();

    let isSorted = true;
    let tempArr = [];

    for(let i = 0; i < columnResults.length - 1; i++) {
      tempArr.push(await columnResults[i].getText());
    }

    //doesnt work well with text - 'aaa' 'AA' fails test - testing with case ref
    for(let j = 0; j < tempArr.length - 1; j++) {
      const firstElementText = tempArr[j];
      const secondElementText = tempArr[j+1];
      if(firstElementText < secondElementText) {
        console.log(`first ${firstElementText}`)
        console.log(`second ${secondElementText}`)
        isSorted = false;
        break;
      }
    }

    expect (isSorted).to.be.true;
  });

  Then(/^I see case details page$/, async function () {
    const url = await browser.getCurrentUrl();
    expect(url).includes("/case/");
  });

  Then(/^I see results of the second page$/, async function () {
    let pageTwoColumnOneFirstResult = await searchPage.getCaseListComponent().getFirstColumnResultText()
    expect (pageTwoColumnOneFirstResult).to.not.equal(pageOneColumnOneFirstResult);
  });

  Then(/^I see table header with page 2 result count$/, async function () {
    const resultText = await searchPage.getCaseListComponent().getResultCountText();
    const hasCorrectResult = resultText.includes('Displaying 26');
    expect (hasCorrectResult).to.be.true;
  });

  Then(/^The '2' is selected on the Pagination control/, async function () {
    let selectedNumber = await searchPage.getCaseListComponent().getSelectedPaginationControlNumber();
    expect(selectedNumber).to.eq('2')
  });

  Then(/^the results should be sorted by '(.*)' in the '(.*)' order$/, async function (sortColumn, order) {
    let values = await searchPage.getCaseListComponent().getColumnResultsValues(sortColumn);
    let isSorted = false;
    if (values.length <= 1) {
      isSorted = true;
    } else {
      isSorted = values.slice(1).every((item, i) => {
        if (values[i] == '' || item == '') {
          return true;
        } else if (order == 'ascending') {
          return values[i].toLowerCase() <= item.toLowerCase()
        } else {
          return values[i].toLowerCase() >= item.toLowerCase()
        }
      });
    }
    expect (isSorted).to.be.true;
  });

});
