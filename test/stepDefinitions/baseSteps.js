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
    //todo eventually change to be dynamic and automatic
    let wizardPage = new CreateCaseWizardPage();
    await wizardPage.interactWithField('text', 'text');
    await wizardPage.clickContinueButton();
    await wizardPage.clickSubmitCaseButton();
  }

};
