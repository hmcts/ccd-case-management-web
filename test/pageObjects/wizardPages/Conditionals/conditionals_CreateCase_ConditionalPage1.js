let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCasePage1WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this._fieldUsedInShowCondition = ''; // TextField | TextFieldOptional
    this.textField = new CCDStringField('#TextField');
    this.textFieldOptionalButtonTest = new CCDStringField('#TextFieldOptionalButtonTest');
    this.textFieldOptional = new CCDStringField('#TextFieldOptional');

    this.textField2 = new CCDStringField('#TextField2');
    this.textFieldMandatoryButtonTest = new CCDStringField('#TextFieldMandatoryButtonTest')
  }

  async getFieldData(){
    let mandatoryTextFieldData = await this.textField.getFieldData();
    let textField2Data = await this.textField2.getFieldData();
    return Array.of(mandatoryTextFieldData,textField2Data);
  }

  async enterIntoTextField(text) {
    await this.textField.enterText(text);
    this._fieldUsedInShowCondition = 'TextField';
  }

  async enterIntoMandatoryTextField(text) {
    await this.textField.enterText(text);
    this._fieldUsedInShowCondition = 'TextField';
  }

  async enterIntoOptionalContinueButtonTextField(text) {
    await this.textFieldOptionalButtonTest.enterText(text);
    this._fieldUsedInShowCondition = 'TextFieldOptionalButtonTest';
  }

  async enterIntoMandatoryButtonTestTextField(text) {
    await this.textFieldMandatoryButtonTest.enterText(text);
  }

  async enterIntoOptionalTextField(text) {
    await this.textFieldOptional.enterText(text);
    this._fieldUsedInShowCondition = 'TextFieldOptional';
  }

  async completeShowConditionToShowField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.textField.enterText('showmethemoney');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.textFieldOptional.enterText('showme');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptionalButtonTest') {
      await this.textFieldOptionalButtonTest.enterText('showmemandatorytextfield');
    }
  }

  async completeShowConditionToHideField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.textField.enterText('dontshowmethemoney');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.textFieldOptional.enterText('dontshowme');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptionalButtonTest') {
      await this.textFieldOptionalButtonTest.enterText('dontshowme');
    }
  }

  async isConditionalFieldPresent() {
    let labels = await this.getFieldLabels();

    if (this._fieldUsedInShowCondition === 'TextField') {
      return labels.includes('Text Field 2');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      return labels.includes('Text Field ShowHide 13');
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptionalButtonTest') {
      return labels.includes('Text Field Mandatory Continue Button test');
    }
  }

  async enterIntoConditionalField() {
    if (this._fieldUsedInShowCondition === 'TextFieldOptionalButtonTest') {
      return await this.enterIntoMandatoryButtonTestTextField('any text');
    } else {
      return null;
    }
  }
}

module.exports = ConditionalsCreateCasePage1WizardPage;
