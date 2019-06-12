class ConditionalsCreateCasePage1WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this._fieldUsedInShowCondition = ''; // TextField | TextFieldOptional
  }

  async enterIntoMandatoryTextField(text) {
    await this.interactWithField('text', text, 'TextField');
    this._fieldUsedInShowCondition = 'TextField';
  }

  async enterIntoOptionalTextField(text) {
    await this.interactWithField('text', text, 'TextFieldOptional');
    this._fieldUsedInShowCondition = 'TextFieldOptional';
  }

  async completeShowConditionToShowField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.interactWithField('text', 'showmethemoney', this._fieldUsedInShowCondition);
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.interactWithField('text', 'showme', this._fieldUsedInShowCondition);
    }
  }

  async completeShowConditionToHideField() {
    if (this._fieldUsedInShowCondition === 'TextField') {
      await this.interactWithField('text', 'dontshowmethemoney', this._fieldUsedInShowCondition);
    } else if (this._fieldUsedInShowCondition === 'TextFieldOptional') {
      await this.interactWithField('text', 'dontshowme', this._fieldUsedInShowCondition);
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
