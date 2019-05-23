let CaseListPage = require('../pageObjects/caseListPage.js');
let TestData = require('../utils/TestData.js');
CaseFilters = require('../pageObjects/ccd-components/caseFilters.js');

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
      console.log(`currentpage: ${currentPage}`);
      if (currentPage !== pageNum){
          await caseListPage.getCaseListComponent().clickPaginationLink(pageNum);
      }
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

    console.log(items)
    for (let i = 0; i <items.length ; i++) {
      let currentItem = items[i];
      console.log(`CurrentItem: ${currentItem}`);
      if (currentItem === pageNumber) {
        expect(items[i + 1] === '...');
        pageFound = true
      }
    }

    if (!pageFound){
        throw new CustomError(`Could not find a page ${pageNumber}`)

    }
  });

  When(/^I will be on the 2nd results page$/, async function(){
    //todo
  });

  When(/^I will be on the 1st results page$/, async function(){
    //todo
  });

  Given(/^there are more than (.*) page of results$/, async function(pages){
    //todo check and create cases
  });



});
