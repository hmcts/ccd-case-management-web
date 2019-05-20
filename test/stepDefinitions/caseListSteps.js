let CaseListPage = require('../pageObjects/caseListPage.js');
let TestData = require('../utils/TestData.js');
CaseFilters = require('../pageObjects/ccd-components/caseFilters.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {

  let caseListPage = new CaseListPage();
  let wbFilters = new CaseFilters();


  Then(/^the case reference is displayed in the case list results with hyphens$/, async function () {
    await caseListPage.getNavBarComponent().clickCaseListLink();


    await wbFilters.selectJurisdiction(TestData.jurisdiction);
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.clickApplyButton();

    let columnResults = await caseListPage.getCaseListComponent().getColumnResults('Case Reference');
    expect(await columnResults[0].getText()).to.match(/\d{4}-\d{4}-\d{4}-\d{4}/)
  });



  Given(/^I have filled the create case filters for a case other than the workbasket default$/, async function () {
    await wbFilters.selectCaseType('Multiple Pages')
    await wbFilters.interactWithField('text')
    await wbFilters.clickApplyButton();
  });

  Then(/^navigating back to the original case type shows a cleared field$/, async function () {
    await wbFilters.selectCaseType('Multiple Pages')
    await wbFilters.('text')
    await wbFilters.clickApplyButton();
  });

  Then(/^I will remain on the '(.*)' case type filter$/, async function (caseType) {
    await assertCaseTypeWorkbasketFilter(caseType)
  });

  Then(/^the filters are switched to the default '(.*)' case type$/, async function (caseType) {
    await assertCaseTypeWorkbasketFilter(caseType)
  });

  async function assertCaseTypeWorkbasketFilter(caseType){
    let actualCaseTypeOption = await caseListPage.getWorkBasketFilters().getSelectedCaseType();
    expect(actualCaseTypeOption).to.equal(caseType)
  }



});
