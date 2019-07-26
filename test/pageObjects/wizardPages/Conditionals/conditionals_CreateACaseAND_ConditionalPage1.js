let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCaseANDPage1 extends CreateCaseWizardPage {

  constructor() {
    super();
    this.TextField8 = new CCDStringField('#TextField8');
    this.TextField9 = new CCDStringField('#TextField9');
  }

  async getFieldData(){
    let textField8Data = await this.TextField8.getFieldData();
    let textField9Data = await this.TextField9.getFieldData();
    return Array.of(textField8Data,textField9Data);
  }

  async enterIntoTextField8(text) {
    await this.TextField8.enterText(text);
  }

  async enterIntoTextField9(text) {
    await this.TextField9.enterText(text);
  }

}

module.exports = ConditionalsCreateCaseANDPage1;
