let CCDStringField = require('../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCasePage2WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.TextField3 = new CCDStringField('#TextField3');
  }

  async getFieldData(){
    let textField3Data = await this.TextField3.getFieldData();
    return Array.of(textField3Data);
  }

  async enterIntoTextField3(text) {
    await this.mandatoryTextField.enterText(text);
  }

}

module.exports = ConditionalsCreateCasePage2WizardPage;
