let CCDStringField = require('../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCasePage1WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this._fieldUsedInShowCondition = ''; // TextField | TextFieldOptional
    this.mandatoryTextField = new CCDStringField('ccd-write-text-field', 'text', 'TextField');
    this.optionalTextField = new CCDStringField('ccd-write-text-field', 'text', 'TextFieldOptional');
  }

  async enterIntoMandatoryTextField(text) {
    await this.mandatoryTextField.enterText(text);
    this._fieldUsedInShowCondition = 'TextField';
  }

  async enterIntoOptionalTextField(text) {
    await this.optionalTextField.enterText(text);
    this._fieldUsedInShowCondition = 'TextFieldOptional';
  }

  async completeShowConditionToShowField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.mandatoryTextField.enterText('showmethemoney');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.optionalTextField.enterText('showme');
    }
  }

  async completeShowConditionToHideField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.mandatoryTextField.enterText('dontshowmethemoney');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.optionalTextField.enterText('dontshowme');
    }
  }

  async isConditionalFieldPresent() {
    let labels = await this.getFieldLabels();

    if (this._fieldUsedInShowCondition === 'TextField') {
      return labels.includes('Text Field 2');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      return labels.includes('Text Field ShowHide 13');
    }
  }
}

module.exports = ConditionalsCreateCasePage1WizardPage;
