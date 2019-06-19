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

  fillOutMandatoryFields: async function(){
    let wizardPage = new CreateCaseWizardPage();
    for (const elem of TestData.mandatoryFields) {
      let id = elem.fieldType === 'yes-no' ? elem.fieldId + '-' + elem.value : elem.fieldId;
      if (await wizardPage.isFieldPresent(elem.fieldType, id)) {
        await wizardPage.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  },

  fillOutOptionalFields: async function(){
    let wizardPage = new CreateCaseWizardPage();
    for (const elem of TestData.optionalFields) {
      let id = elem.fieldType === 'yes-no' ? elem.fieldId + '-' + elem.value : elem.fieldId;
      if (wizardPage.isFieldPresent(elem.fieldType, id)) {
        await wizardPage.interactWithField(elem.fieldType, elem.value || elem.fieldType, elem.fieldId);
      }
    }
  }

};
