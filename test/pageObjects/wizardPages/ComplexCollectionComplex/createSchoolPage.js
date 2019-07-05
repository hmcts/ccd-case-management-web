let CCDStringField = require('../ccd-components/fields/ccdStringField.js');

class ConditionalsCreateCasePage1WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.Name = new CCDStringField('#MySchool_Name','MySchool.Name');
    this.ProvidesAutisticChildrenSupport; //todo yes no
    this.SchoolRegionalCentre
    this.SchoolClass.ClassName = new CCDStringField('#MySchool_Class_0_ClassName','MySchool.SchoolClass.ClassName');
    this.Class.ClassMandatoryFor
    this.Class.ClassDetails.ClassRanking
    this.Class.ClassDetails.ClassTeacher
    this.Class.ClassDetails.ClassLocation.Building.Name
    this.Class.ClassDetails.ClassLocation.Building.Floor
    this.Class.ClassNumber
    this.Class.ClassMembers.Children.IsAutistic
    this.Class.ClassMembers.Children.ChildFullName
    this.Class.ClassMembers.Children.ChildGender
    this.Class.ClassMembers.Children.ChildAddress.AddressLine1
    this.Class.ClassMembers.Children.NeedsSupport
    this.Class.ClassMembers.Children.AutisticChildCaseNumber.CaseReference

    this.TextField2 = new CCDStringField('#TextField2')
  }

  async getFieldData(){
    let mandatoryTextFieldData = await this.mandatoryTextField.getFieldData();
    let textField2Data = await this.TextField2.getFieldData();
    return Array.of(mandatoryTextFieldData,textField2Data);
    // return fields.push(mandatoryTextFieldData,textField2Data);
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
