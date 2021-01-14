let TestData = require('../utils/TestData.js');
let CaseListPage = require('../pageObjects/caseListPage.js')
let FieldUtils = require('../utils/fieldUtils.js')

module.exports = {

  navigateToCreateCasePage: async function(){
    createCaseStartPage = await new CaseListPage().getNavBarComponent().clickCreateCaseLink();
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
    await createCaseStartPage.clickStartButton();
  },

  fillOutAndSubmitForm: async function(){
    let wizardPage = new CreateCaseWizardPage();
    await this._fillOutMandatoryFields();
    await this._fillOutOptionalFields();
    await wizardPage.clickContinueButton();
    await wizardPage.clickSubmitCaseButton();
  },

  /**
   * Takes an array of arrays, the top array being the event, each sub array being
   * the fields in an individual page. It will fill out forms on each page and continuecreat
   * tot he next page until the end of the array in which it will submit the event
   * @returns {Promise<void>}
   */
  fillOutAndSubmitEvent: async function(){
    let wizardPage = new CreateCaseWizardPage();
    let fieldUtils = new FieldUtils();

    for (const page of TestData.eventFields) {
      for (const field of page) {
        if (await fieldUtils.isFieldPresent(field.fieldType, field.fieldId)) {
          await fieldUtils.interactWithField(field.fieldType, field.value || field.fieldType, field.fieldId);
        }
      }
      await wizardPage.clickContinueButton();
    }
    await wizardPage.clickSubmitCaseButton();
  },

  _fillOutMandatoryFields: async function(){
    let fieldUtils = new FieldUtils();

    for (const elem of TestData.mandatoryFields) {
      if (await fieldUtils.isFieldPresent(elem.fieldType, elem.fieldId)) {
        await fieldUtils.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  },

  _fillOutOptionalFields: async function(){
    let fieldUtils = new FieldUtils();

    for (const elem of TestData.optionalFields) {
      if (fieldUtils.isFieldPresent(elem.fieldType, elem.fieldId)) {
        await fieldUtils.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  },

  createCase: async function(){
    await this.navigateToCreateCasePage();
    await this.fillOutAndSubmitForm();
  }

};
