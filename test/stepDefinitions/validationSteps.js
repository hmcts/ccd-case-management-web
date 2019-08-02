
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage.js');
let baseSteps = require('./baseSteps.js');
let ConditionalsCreateCasePage1 = require('../pageObjects/wizardPages/Conditionals/conditionals_CreateCase_ConditionalPage1.js');
let CreateCollectionOfComplexPage = require('../pageObjects/wizardPages/ComplexCollectionComplex/createCollectionOfComplexPage.js');
let DataTypesPage = require('../pageObjects/wizardPages/dataFieldTypesPage');
let CreateSchoolPage = require('../pageObjects/wizardPages/ComplexCollectionComplex/createSchoolPage.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
CustomError = require('../utils/errors/custom-error.js');


var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseWizardPage = new CreateCaseWizardPage();

  Given(/^the following definition for '(.*)'$/, async function (sheetName, dataTable) {
    // to much output in jenkins logs so commenting this out
    // console.log('sheetName=', sheetName);
    // console.log(dataTable); this is causing to much stuff in the logs so commenting out
  });

  Given(/^the '(.*)' page contains the following fields:$/, async function (page, dataTable) {
    let pageObject = null;

    //Set page object class to use according to page parsed from Step
    switch (page){

      case 'Conditional Page 1' :
        pageObject = new ConditionalsCreateCasePage1();
        break;
      case 'Data Field Types' :
        pageObject = new DataTypesPage();
        break;
      case 'Collection of complex type' :
        pageObject = new CreateCollectionOfComplexPage();
        break;
      case 'Create school':
        pageObject = new CreateSchoolPage();
        break;
      default: throw new CustomError(`This step has not been implemented for '${page}' page yet `)
    }

    let errMsg = `trying to check fields on page '${page}' but not on correct page when checking against page header`;
    expect(await pageObject.getPageHeader(), errMsg).to.have.string(page);

    //Page object class needs to have this method for this step to be used
    let pageData = await pageObject.getFieldData();

    //Iterate through rows on Gherkin datatable
    for (const row of dataTable.hashes()){

      let fieldFound = false;

      let flattenedPageData = [].concat(...pageData);

      //For each row of the datatable, iterate through the fields from the page to find the field then compare and assert
      // the attributes of the field
      for (const pageField of flattenedPageData){
        if (pageField.get('field') === row.field){
          fieldFound = true;

          //Only do the assertion if the column exists, this gives us flexibility so we don't always need the same columns
          //for every scenario using this step
          if (typeof row.value !== 'undefined'){
            let errMsg = `error for value of '${row.field}'`;
            expect(pageField.get('value'), errMsg).to.eq(row.value);
          }

          if (typeof row.hidden !== 'undefined'){
            let errMsg = `error for hidden boolean of '${row.field}'`;
            expect(String(pageField.get('hidden')),errMsg).to.eq(row.hidden);
          }

          break;
        }

      }

      if (!fieldFound){
        throw new CustomError(`Page field data returned but could not find field with name/key: '${row.field}'`)
      }

    }

  });

  Given(/^the definition sheet '(.*)' looks like this$/, async function (sheetName, dataTable) {
    // TODO: No check for now - should be implemented as a part of RDM-5022
  });

  Then(/^no text will appear in the number field$/, async function() {
    let fieldContents = await caseWizardPage.getFieldValue('number');
    console.log(fieldContents);
    expect(fieldContents).to.be.empty;
  });

  Then(/^there will be validation errors$/, async function() {
    let errSummaryBoxDisplayed = await caseWizardPage.errorSummaryDispalyed();
    let fieldErrorDisplayed = await caseWizardPage.fieldErrorDispalyed();

    expect(errSummaryBoxDisplayed).to.be.true;
    expect(fieldErrorDisplayed).to.be.true;
  });


  Then(/^there will be no validation errors$/, async function() {
    expect(await caseWizardPage.errorSummaryDispalyed()).to.be.false;
    expect(await caseWizardPage.fieldErrorDispalyed()).to.be.false;
  });


  Then(/^there will be a field validation error$/, async function() {
    expect(await caseWizardPage.fieldErrorDispalyed()).to.be.true;
  });

  Then(/^the 'Continue' button will be disabled$/, async function() {
    expect(await caseWizardPage.continueButtonEnabled()).to.be.false
  });


  Then(/^the 'Continue' button will be enabled/, async function() {
    expect(await caseWizardPage.continueButtonEnabled()).to.be.true;
  });


  When(/^I click the Continue button$/, async function() {
    await caseWizardPage.clickContinueButton();
  });


  When(/^I can navigate to the next page$/, async function() {
    let page1Header = await caseWizardPage.getPageHeader();

    let errMessage = 'Continue button not enabled';
    expect(await caseWizardPage.continueButtonEnabled(), errMessage).to.be.true;
    await caseWizardPage.clickContinueButton();

    let page2Header = await caseWizardPage.getPageHeader();
    expect(page2Header,'Still on same page').to.not.equal(page1Header);
  });

  When(/^I enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField(fieldType, value);
  });

  When(/^I re-enter '(.*)' into the '(.*)' field$/, async function (value, fieldType) {
    await caseWizardPage.interactWithField(fieldType, value);
  });

  When(/^I have a validation error from invalid '(.*)'$/, async function (dataType) {
    await baseSteps.navigateToCreateCasePage()

    switch (dataType){
      case "email" :
        await caseWizardPage.interactWithField(dataType,'invalidemail.com');
        await caseWizardPage.clickContinueButton();
        break
      case "money-gbp" :
        await caseWizardPage.interactWithField(dataType,'-10');
        break;
      case "phone-uk":
        await caseWizardPage.interactWithField(dataType,'12345');
        await caseWizardPage.clickContinueButton();
        break;
      case "date":
        await caseWizardPage.interactWithField(dataType,'10201990');
        await caseWizardPage.clickContinueButton();
        break;
      case "regex":
        await caseWizardPage.interactWithField('text','lower case is invalid');
        await caseWizardPage.clickContinueButton();
        break;
      default: throw new CustomError(`option ${dataType} not found`)
    }

  });


});
