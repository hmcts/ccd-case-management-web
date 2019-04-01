
let SearchResultPage = require('../pageObjects/searchResultPage.js');
let TestData = require('../utils/TestData.js');
let chai = require("chai").use(require("chai-as-promised"));
let baseSteps = require('./baseSteps.js');
let expect = chai.expect;
let Data = require('../utils/TestData.js');

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let searchResultPage = new SearchResultPage();
  const valueArr = ['Odin', 'Freya', 'Demeter', 'Quetzcuatl', 'Thor', 'Zeus', 'Wotan', 'Ares', 'Zephyr', 'Baldur', 'Aegir', 'Heimdall', 'Loki', 'Tyr', 'Hera', 'Dionysus', 'Poseidon', 'Mithras', 'Khantengri', 'Ishtar', 'Ahuramazda', 'Aphrodite', 'Crom', 'Lady of the Lake', 'Morgana', 'Baphomet'];

  async function bulkUpdateCases(arr) {
    let columnResults = await searchResultPage.getCaseListComponent().getFirstColumnResults();
    Data.jurisdiction = 'Auto Test 1';
    Data.caseType = 'All Field Data Types';
    
    if (columnResults.length < 25){

      for (let i = 0; i < arr.length; i++) {
        await baseSteps.navigateToCreateCasePage();
        await baseSteps.fillOutAndSubmitFormWithValue(arr[i]);     
      }
      await searchResultPage.getNavBarComponent().clickSearchLink();
    }
  }  

  Given(/^I am on the search results page$/, async function () {
    await searchResultPage.getNavBarComponent().clickSearchLink();
    await searchResultPage.selectJurisdiction(TestData.jurisdiction);
  });

  Given(/^I have some cases listed in the results table$/, async function () {
    await searchResultPage.waitForPageLoaded();

    await bulkUpdateCases(valueArr);
  });

  Given(/^I have more than 25 results$/, async function () {
    await searchResultPage.waitForPageLoaded();

    await bulkUpdateCases(valueArr);
  });

  When(/^I have performed a search$/, async function () {
    await bulkUpdateCases(valueArr);
    await searchResultPage.clickApplyButton();
  });

  When(/^I click on sorting icon on the first column$/, async function () {
    await searchResultPage.clickSortIcon();
  });

  When(/^I click on the case link$/, async function () {
    await searchResultPage.clickFirstLink();
  });

  When(/^I click on page link 2$/, async function () {
    await searchResultPage.clickPageTwo();
  });

  Then(/^I see cases listed in the results table$/, async function () {

    let columnResults = await searchResultPage.getCaseListComponent().getFirstColumnResults();
    
    expect (columnResults.length > 0).to.be.true;
  });

  Then(/^I see table header with correct result count$/, async function () {
    const columnResultsLength = valueArr.length;
    const resultText = await searchResultPage.getResultCountText();
    const hasCorrectResult = resultText.indexOf('of ' + columnResultsLength + ' results') > -1;
    
    expect (hasCorrectResult).to.be.true;
  });

  Then(/^the results of the page should be sorted in the descending order$/, async function () {
    const columnResults = await searchResultPage.getCaseListComponent().getFirstColumnResults();
    
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

  Then(/^I see case details page$/, async function () {
    const url = await browser.getCurrentUrl();
    expect(url).contain("/case/");
  });

  Then(/^I see results of the second page$/, async function () {
    const resultText = await searchResultPage.getFirstLineText();
    
    expect (resultText).to.be.equal(valueArr[25]);
  });

  Then(/^I see table header with page 2 result count$/, async function () {
    const resultText = await searchResultPage.getResultCountText();
    const hasCorrectResult = resultText.indexOf('Displaying 26') > -1;
    
    expect (hasCorrectResult).to.be.true;
  });

});
