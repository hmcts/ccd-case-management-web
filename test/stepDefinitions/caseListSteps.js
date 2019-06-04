let CaseListPage = require('../pageObjects/caseListPage.js');
let TestData = require('../utils/TestData.js');
CaseFilters = require('../pageObjects/ccd-components/caseFilters.js');
let baseSteps = require('./baseSteps.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {

  let caseListPage = new CaseListPage();


  Then(/^the case reference is displayed in the case list results with hyphens$/, async function () {
    await caseListPage.getNavBarComponent().clickCaseListLink();

    let wbFilters = new CaseFilters();
    await wbFilters.selectJurisdiction(TestData.jurisdiction);
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.clickApplyButton();

    let columnResults = await caseListPage.getCaseListComponent().getColumnResults('Case Reference');
    expect(await columnResults[0].getText()).to.match(/\d{4}-\d{4}-\d{4}-\d{4}/)
  });

  Given(/^I am on page (.*) of results$/, async function (pageNum) {
      let currentPage = await caseListPage.getCaseListComponent().getSelectedPaginationControlNumber();
      if (currentPage !== pageNum){
          await caseListPage.getCaseListComponent().clickPaginationLink(pageNum);
      }

      this.topResult = await caseListPage.getCaseListComponent().getFirstColumnResultText()
  });


  Given(/^I am on the last page of results$/, async function () {
      await caseListPage.getCaseListComponent().clickLastPaginationPage();
  });

  Given(/^I am on case list page$/, async function () {
      await caseListPage.getNavBarComponent().clickCaseListLink();
  });

  Then(/^the '(.*)' button will not be displayed on pagination$/, async function (linkName) {
      switch (linkName.toLowerCase()){
        case 'previous' :
          let previousDisplayed = await caseListPage.getCaseListComponent().isPaginationPreviousLinkDisplayed();
          expect(previousDisplayed).to.be.false;
          break;
        case 'next' :
          let nextDisplayed = await caseListPage.getCaseListComponent().isPaginationNextLinkDisplayed();
          expect(nextDisplayed).to.be.false
          break;
        default:
          throw new CustomError(`invalid option, valid options are 'previous' 'next'`)
      }
  });

  Then(/^the '(.*)' button will be displayed on pagination$/, async function (linkName) {
      switch (linkName.toLowerCase()){
        case 'previous' :
          let previousDisplayed = await caseListPage.getCaseListComponent().isPaginationPreviousLinkDisplayed();
          expect(previousDisplayed).to.be.true;
          break;
        case 'next' :
          let nextDisplayed = await caseListPage.getCaseListComponent().isPaginationNextLinkDisplayed();
          expect(nextDisplayed).to.be.true;
          break;
        default:
          throw new CustomError(`invalid option, valid options are 'previous' 'next'`)
      }
  });

  When(/^I navigate to page (.*) of results$/, async function(pageNumber){
    await caseListPage.getCaseListComponent().clickPaginationLink(pageNumber);
  });

  When(/^I click the pagination '(.*)' button$/, async function(button){
    await caseListPage.getCaseListComponent().clickPaginationLink(button);
  });

  Then(/^page '(.*)' will be selected on the pagination$/, async function(pageNumber){
    let selected = await caseListPage.getCaseListComponent().getSelectedPaginationControlNumber();
    expect(selected).to.equal(pageNumber);
  });

  Then(/^three dots will be displayed after page (.*) on the pagination$/, async function(pageNumber){
    let items = await caseListPage.getCaseListComponent().getPaginationItems();
    let pageFound = false;

    for (let i = 0; i <items.length ; i++) {
      let currentItem = items[i];
      if (currentItem === pageNumber) {
        expect(items[i + 1] === '...');
        pageFound = true
      }
    }

    if (!pageFound){
        throw new CustomError(`Could not find a page ${pageNumber}`)
    }
  });

  When(/^I will see a different page of results$/, async function(){
    let currentPageTopResult =  await caseListPage.getCaseListComponent().getFirstColumnResultText();
    let errorMsg = 'first result in the case list page should be different to the one saved from a previous page';
    expect(this.topResult, errorMsg).to.not.equal(currentPageTopResult)
  });

  Given(/^there are more than (\d+) page of results$/, async function(pages){
    let totalCases = await caseListPage.getCaseListComponent().getTotalCases();
    let casesToCreate = ((parseInt(pages) * 25) +1) - parseInt(totalCases);

    if (Math.sign(casesToCreate) === 1){
      console.log(`about to create ${casesToCreate} cases`)
      for (let i = 0; i < casesToCreate; i++) {
        await baseSteps.createCase();
      }
    }
  });

});
