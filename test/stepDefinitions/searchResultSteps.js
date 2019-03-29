
let SearchResultPage = require('../pageObjects/searchResultPage.js');
let TestData = require('../utils/TestData.js');
let chai = require("chai").use(require("chai-as-promised"));
let baseSteps = require('./baseSteps.js');
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let searchResultPage = new SearchResultPage();
  const columnName = 'Text Field';

  Given(/^I am on the search results page$/, async function () {
    await searchResultPage.getNavBarComponent().clickSearchLink();
    await searchResultPage.selectJurisdiction(TestData.jurisdiction);
  });

  Given(/^I have some cases listed in the results table$/, async function () {
    await searchResultPage.waitForPageLoaded();
  });

  When(/^I have performed a search$/, async function () {
    await searchResultPage.clickApplyButton();
  });

  When(/^I click on sorting icon on the first column$/, async function () {
    await searchResultPage.clickSortIcon();
  });

  Then(/^I see cases listed in the results table$/, async function () {
    searchResultPage.waitForPageLoaded();

    let columnResults = await searchResultPage.getCaseListComponent().getColumnResults(columnName);
    
    expect (columnResults.length > 0).to.be.true;
  });

  Then(/^I see table header with correct result count$/, async function () {
    searchResultPage.waitForPageLoaded();

    const columnResults = await searchResultPage.getCaseListComponent().getColumnResults(columnName);
    const columnResultsLength = columnResults.length;
    const resultText = await searchResultPage.getResultCountText();
    const hasCorrectResult = resultText.indexOf('of ' + columnResultsLength + ' results') > -1;

    expect (hasCorrectResult).to.be.true;
  });

  Then(/^the results of the page should be sorted in the descending order$/, async function () {

    const columnResults = await searchResultPage.getCaseListComponent().getColumnResults(columnName);
    
    let isSorted = true;
    let tempArr = [];
    
    for(let i = 0; i < columnResults.length - 1; i++) {
      tempArr.push(await columnResults[i].getText());
    }
    
    for(let j = 0; j < tempArr.length - 1; j++) {
      const firstElementText = tempArr[j];
      const secondElementText = tempArr[j+1];
      if(firstElementText < secondElementText) {
        isSorted = false;
        break;
      }
    }
    
    expect (isSorted).to.be.true;
  });

});
