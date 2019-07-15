let TestData = require('../utils/TestData.js');

module.exports = {

  navigateToCreateCasePage: async function(){
    createCaseStartPage = await caseListPage.getNavBarComponent().clickCreateCaseLink();
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
    await createCaseStartPage.clickStartButton();
  },

  fillOutAndSubmitForm: async function(){
    let wizardPage = new CreateCaseWizardPage();
    await this.fillOutMandatoryFields();
    await this.fillOutOptionalFields();
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

    for (const page of TestData.eventFields) {
      for (const field of page) {
        if (await wizardPage.isFieldPresent(field.fieldType, field.fieldId)) {
          await wizardPage.interactWithField(field.fieldType, field.value || field.fieldType, field.fieldId);
        }
      }
      await wizardPage.clickContinueButton();
    }
    await wizardPage.clickSubmitCaseButton();
  },

  fillOutMandatoryFields: async function(){
    let wizardPage = new CreateCaseWizardPage();
    for (const elem of TestData.mandatoryFields) {
      if (await wizardPage.isFieldPresent(elem.fieldType, elem.fieldId)) {
        await wizardPage.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  },

  fillOutOptionalFields: async function(){
    let wizardPage = new CreateCaseWizardPage();
    for (const elem of TestData.optionalFields) {
      if (await wizardPage.isFieldPresent(elem.fieldType, elem.fieldId)) {
        await wizardPage.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  },

  createCase: async function(){
    await this.navigateToCreateCasePage();
    await this.fillOutAndSubmitForm();
  }

};
