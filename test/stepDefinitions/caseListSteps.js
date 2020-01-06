let CaseListPage = require('../pageObjects/caseListPage.js');
let TestData = require('../utils/TestData.js');
let FieldUtils = require('../utils/fieldUtils.js');
CaseFilters = require('../pageObjects/ccd-components/caseFilters.js');
let baseSteps = require('./baseSteps.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {

  let caseListPage = new CaseListPage();
  let wbFilters = new CaseFilters();

  Given(/^I have logged out$/, {timeout: 120 * 1000}, async function () {
    await caseListPage.getNavBarComponent().clickSignOut();
  });

  Then(/^the case reference is displayed in the case list results with hyphens$/, async function () {
    await caseListPage.getNavBarComponent().clickCaseListLink();

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

  When(/^I search for this Case Type on the workbasket filters$/, async function(){
    await caseListPage.getNavBarComponent().clickCaseListLink();
    await wbFilters.selectJurisdiction(TestData.jurisdiction);
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.clickApplyButton();
  });

  Then(/^page '(.*)' will be selected on the pagination$/, async function(pageNumber){
    let selected = await caseListPage.getCaseListComponent().getSelectedPaginationControlNumber();
    expect(selected).to.equal(pageNumber);
  });

  Then(/^a box stating No Cases Found is displayed$/, async function(){
    let boxFound = await caseListPage.isNoCasesBoxDisplayed();
    expect(boxFound, "could not locate 'No Cases Found' notification box").to.be.true;
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
    this.topResult = currentPageTopResult;
  });

  Given(/^there are more than (\d+) page of results$/, {timeout: 1200 * 1000}, async function(pages){
    let totalCases = await caseListPage.getCaseListComponent().getTotalCases();
    let casesToCreate = ((parseInt(pages) * 25) +1) - parseInt(totalCases);

    if (Math.sign(casesToCreate) === 1){
      console.log(`about to create ${casesToCreate} cases`)
      for (let i = 0; i < casesToCreate; i++) {
        await baseSteps.createCase();
      }
    }
  });

  Given('I am on the case list page', async  function () {
    await caseListPage.getNavBarComponent().clickCaseListLink()
  });

  Given('I am on the case list page and selected CaseType CRUDComplex', async  function () {
    TestData.caseType = 'Complex CRUD';
    await caseListPage.getNavBarComponent().clickCaseListLink();
    await wbFilters.selectJurisdiction(TestData.jurisdiction);
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.clickApplyButton();
  });

  Then(/^the school number is NOT displayed in the case list results$/, async function() {
    let columnResults = await caseListPage.getCaseListComponent().getColumnResults('Child full name');
    expect(await columnResults[0].getText()).to.equal('Child full nameee');
  });

  Given(/^I have filled the case filters for a case other than the workbasket default$/, async function () {
    TestData.caseType='Multiple Pages';
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.interactWithField('text');
    await wbFilters.clickApplyButton();
  });

  Given(/^I have filled out the case list filters$/, async function () {
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

  Then(/^navigating back to the original case type shows cleared dynamic filters$/, async function () {
    await wbFilters.selectCaseType(TestData.caseType);
    await dynamicFiltersCleared();
  });

  Then(/^the dynamic filters will be cleared$/, async function () {
    await dynamicFiltersCleared();
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


  async function dynamicFiltersCleared() {
    let allFiltersCleared = true;
    let errMessage = '';

    let fieldUtils = new FieldUtils();

    if (await fieldUtils.isFieldPresent('text')) {
      let textFieldValue = await fieldUtils.getTextFieldValue()
      if (textFieldValue !==''){
        allFiltersCleared = false;
        errMessage = `text field has value ${textFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('textarea')) {
      let textAreaFieldValue = await fieldUtils.getTextAreaFieldValue();
      if (textAreaFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `textarea field has value ${textAreaFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('date')) {
      let dateFieldValue = await fieldUtils.getDateFieldValue();
      if (dateFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `date field has value ${dateFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('email')) {
      let emailFieldValue = await fieldUtils.getEmailFieldValue();
      if (emailFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `email field has value ${emailFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('money-gbp')) {
      let moneyFieldValue = await fieldUtils.getMoneyFieldValue();
      if (moneyFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `money field has value ${moneyFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('phone-uk')) {
      let phoneFieldValue = await fieldUtils.getPhoneUKFieldValue();
      if (phoneFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `phone field has value ${phoneFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('number')) {
      let numberFieldValue = await fieldUtils.getNumberFieldValue();
      if (numberFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `number field has value ${numberFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('fixed-list')) {
      let fixedListFieldValue = await fieldUtils.getFixedListFieldValue()
      if (fixedListFieldValue !== '--Select a value--'){
        allFiltersCleared = false;
        errMessage = `fixed list field has value ${fixedListFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('yes-no')) {
      let yesNoValue = await fieldUtils.getYesNoFieldValue()
      if (yesNoValue !== ''){
        allFiltersCleared = false;
        errMessage = `yes-no field has value ${yesNoValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('multi-select')) {
      let multiSelectValues = await fieldUtils.getSelectedCheckboxes();
      if (multiSelectValues.length !== 0){
        allFiltersCleared = false;
        errMessage = `multi select field has values ${multiSelectValues}`

      }
    }

    expect(allFiltersCleared, errMessage).to.be.true

  }

  When(/^I search for that case by case reference$/, async function () {
    await caseListPage.getNavBarComponent().clickCaseListLink();
    await caseListPage.getWorkBasketFilters().selectCaseType(TestData.caseType);
    await caseListPage.getWorkBasketFilters().enterIntoCaseReferenceField(TestData.caseReference);
    await caseListPage.getWorkBasketFilters().clickApplyButton();
  });

  Then(/^the list table displays the following:$/, async function (datatable) {
    let caselist = await caseListPage.getCaseListComponent();

    let dt = datatable.raw();
    let fieldsCount = dt[0].length;
    let rows = datatable.raw().length;

    for (let i = 1; i <rows ; i++) {

      for (let j = 0; j <fieldsCount; j++) {
        let columnResults = await caselist.getColumnResultsValues(dt[0][j]);
        let expectedValue = dt[i][j];
        expect(columnResults).to.include(expectedValue)
      }

    }

  });



});
