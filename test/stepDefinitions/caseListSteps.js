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


});
