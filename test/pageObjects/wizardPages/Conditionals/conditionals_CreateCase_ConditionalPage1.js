let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCasePage1WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this._fieldUsedInShowCondition = ''; // TextField | TextFieldOptional
    this.TextField = new CCDStringField('#TextField');
    this.optionalTextField = new CCDStringField('TextFieldOptional');

    this.TextField2 = new CCDStringField('#TextField2')
  }

  async getFieldData(){
    let mandatoryTextFieldData = await this.TextField.getFieldData();
    let textField2Data = await this.TextField2.getFieldData();
    return Array.of(mandatoryTextFieldData,textField2Data);
    // return fields.push(mandatoryTextFieldData,textField2Data);
  }



  async enterIntoTextField(text) {
    await this.TextField.enterText(text);
    this._fieldUsedInShowCondition = 'TextField';
  }


  async enterIntoMandatoryTextField(text) {
    await this.TextField.enterText(text);
    this._fieldUsedInShowCondition = 'TextField';
  }

  async enterIntoOptionalTextField(text) {
    await this.optionalTextField.enterText(text);
    this._fieldUsedInShowCondition = 'TextFieldOptional';
  }

  async completeShowConditionToShowField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.TextField.enterText('showmethemoney');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.optionalTextField.enterText('showme');
    }
  }

  async completeShowConditionToHideField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.TextField.enterText('dontshowmethemoney');
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
