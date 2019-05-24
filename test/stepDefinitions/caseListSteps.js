let CaseListPage = require('../pageObjects/caseListPage.js');
let TestData = require('../utils/TestData.js');
let FieldUtils = require('../utils/fieldUtils.js');
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

  Given('I am on the case list page', async  function () {
    await caseListPage.getNavBarComponent().clickCaseListLink()

  });

  Given(/^I have filled the create case filters for a case other than the workbasket default$/, async function () {
    TestData.caseType='Multiple Pages';
    await wbFilters.selectCaseType(TestData.caseType);
    await wbFilters.interactWithField('text');
    await wbFilters.clickApplyButton();
  });

  Given(/^I have filled out the case list filters$/, async function () {
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
        console.log(textFieldValue);
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
      console.log(dateFieldValue);
      if (dateFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `date field has value ${dateFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('email')) {
      let emailFieldValue = await fieldUtils.getEmailFieldValue();
      console.log(emailFieldValue)
      if (emailFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `email field has value ${emailFieldValue}`
      }
    }

    if (await fieldUtils.isFieldPresent('money-gbp')) {
      let moneyFieldValue = await fieldUtils.getMoneyFieldValue();
      console.log(moneyFieldValue);
      if (moneyFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `money field has value ${moneyFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('phone-uk')) {
      let phoneFieldValue = await fieldUtils.getPhoneUKFieldValue();
      console.log(phoneFieldValue);
      if (phoneFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `phone field has value ${phoneFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('number')) {
      let numberFieldValue = await fieldUtils.getNumberFieldValue();
      console.log(numberFieldValue)
      if (numberFieldValue !== ''){
        allFiltersCleared = false;
        errMessage = `number field has value ${numberFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('fixed-list')) {
      let fixedListFieldValue = await fieldUtils.getFixedListFieldValue()
      if (fixedListFieldValue !== 'undefined'){
        allFiltersCleared = false;
        errMessage = `fixed list field has value ${fixedListFieldValue}`

      }
    }

    if (await fieldUtils.isFieldPresent('yes-no')) {
      let yesNoValue = await fieldUtils.getYesNoFieldValue()
      console.log(yesNoValue)
      if (yesNoValue !== 'undefined'){
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


});
