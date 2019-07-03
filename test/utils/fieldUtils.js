let CustomError = require('./errors/custom-error.js');
let CCDStringField = require('../pageObjects/ccd-components/fields/ccdStringField.js');
let CCDDateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let CCDFixedListField = require('../pageObjects/ccd-components/fields/ccdFixedList.js');
let CCDFixedRadioListField = require('../pageObjects/ccd-components/fields/ccdFixedRadioList.js');
let CCDYesNoField = require('../pageObjects/ccd-components/fields/ccdYesNoField.js');
let CCDTextAreaField = require('../pageObjects/ccd-components/fields/ccdTextAreaField.js');
let CCDComplexTypeField = require('../pageObjects/ccd-components/fields/ccdComplexTypeField.js');
let CCDMultiSelectField = require('../pageObjects/ccd-components/fields/ccdMultiSelectField.js');
let CCDCollectionField = require('../pageObjects/ccd-components/fields/ccdCollectionField.js');
let CCDAddressUKField = require('../pageObjects/ccd-components/fields/ccdAddressUKField.js');

class FieldDataTypes {

  /**
   * Enter random text into the Text field
   * @returns CCDStringField Object
   */
  async enterIntoTextField(value, id){
    let css = await FIELDS.TEXT.cssTag;
    let type = await FIELDS.TEXT.type;
    let field = await new CCDStringField(css, type, id);
    await field.enterText(value);
    return field;
  }

  async textFieldContainsInLabel(value, id) {
    let css = await FIELDS.TEXT.cssTag;
    let type = await FIELDS.TEXT.type;
    let field = await new CCDStringField(css, type, id);
    return await field.hasFieldLabel(value);
  }

  async fixedListFieldContainsInLabel(value, id) {
    let css = await FIELDS.FIXED_LIST.cssTag;
    let field = await new CCDFixedListField(css, id);
    return await field.hasFieldLabel(value);
  }

  async caseLinkFieldContainsInLabel(value, id) {
    let css = await FIELDS.CASE_LINK.cssTag;
    let type = await FIELDS.CASE_LINK.type;
    let field = await new CCDStringField(css, type, id);
    return await field.hasFieldLabel(value);
  }

  async yesNoFieldContainsInLabel(value, radioId) {
    let css = await FIELDS.YES_NO.cssTag;
    let field = await new CCDYesNoField(css, radioId);
    return await field.hasFieldLabel(value);
  }

  /**
   * Enter a text into the CaseLink field
   * @returns CCDStringField Object
   */
  async enterIntoCaseLinkField(value, id) {
    let css = await FIELDS.CASE_LINK.cssTag;
    let type = await FIELDS.CASE_LINK.type;
    let field = await new CCDStringField(css, type, id);
    await field.enterText(value);
    return field;
  }

  /**
   * Sets the value into the AddressLine1 field of the address field specified by id.
   * If no id is specified it will populate AddressLine1 of the first found address.
   * @param value
   * @param id
   * @returns CCDAddressUKField Object
   */
  async enterIntoAddressLine1Field(value, id) {
    let css = await FIELDS.ADDRESS.cssTag;
    let type = await FIELDS.ADDRESS.type;
    let field = await new CCDAddressUKField(css, id);
    await field.enterTextIntoAddressLine1(value);
    return field;
  }

  /**
   * Enter random text into the Text Area field
   * @returns CCDStringField Object
   */
  async enterIntoTextAreaField(value){
    let css = await FIELDS.TEXT_AREA.cssTag;
    let textAreaField = await new CCDTextAreaField(css);
    await textAreaField.enterText(value);
    return textAreaField;
  }

  /**
   * Enter random number into the Number field field
   * @returns CCDStringField Object
   */
  async enterIntoNumberField(value){
    let css = await FIELDS.NUMBER.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type);
    await textField.enterNumber(value);
    return textField;
  }

  /**
   * Enter random number in money field
   * @returns CCDStringField Object
   */
  async enterIntoMoneyField(value){
    let css = await FIELDS.MONEY_GBP.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type);
    await textField.enterMoney(value);
    return textField;
  }

  /**
   * Enter random email address into Email field
   * @returns CCDStringField Object
   */
  async enterIntoEmailField(value){
    let css = await FIELDS.EMAIL.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type);
    await textField.enterEmail(value);
    return textField;
  }

  /**
   * Enter random valid phone number into Phone UK field
   * @returns CCDStringField Object
   */
  async enterIntoPhoneField(value){
    let css = await FIELDS.PHONE_NUMBER.cssTag;
    let type = await FIELDS.TEXT.type;
    let phoneField = await new CCDStringField(css, type);
    await phoneField.enterPhoneNumber(value);
    return phoneField;
  }

  /**
   * Enter random valid date in the past
   * @returns CCDStringField Object
   */
  async enterIntoDateField(value, id){
    let css = await FIELDS.DATE.cssTag;
    let dateField = await new CCDDateField(css, id);
    await dateField.enterDate(value);
    return dateField;
  }

  /**
   * Select a provided option from the dropdown
   * @returns CCDStringField Object
   */
  async selectFromFixedList(value, id){
    let css = await FIELDS.FIXED_LIST.cssTag;
    let fixedListField = await new CCDFixedListField(css, id);
    await fixedListField.selectOption(value);
    return fixedListField;
  }

  async selectFromMultiSelect(value, id){
    let css = await FIELDS.MULTI_SELECT.cssTag;
    let multiSelectField = await new CCDMultiSelectField(css, id);
    await multiSelectField.selectAnyOneElement(value);
    return multiSelectField;
  }

  /**
   * Select a provided radio butto option
   * @returns CCDStringField Object
   */
  async selectYesNoOption(value, id){
    let css = await FIELDS.YES_NO.cssTag;
    let yesNoField = await new CCDYesNoField(css, id);
    await yesNoField.selectOption(value);
    return yesNoField;
  }

  async fieldYesNoIsHidden(radioId) {
    let css = await FIELDS.YES_NO.cssTag;
    let yesNoField = await new CCDYesNoField(css, radioId);
    return await yesNoField.isHidden();
  }

  async fieldYesNoIsVisible(radioId) {
    let css = await FIELDS.YES_NO.cssTag;
    let yesNoField = await new CCDYesNoField(css, radioId);
    return await yesNoField.isVisible();
  }

  async textFieldIsHidden(id) {
    let css = await FIELDS.TEXT.cssTag;
    let type = await FIELDS.TEXT.type;
    let field = await new CCDStringField(css, type, id);
    return await field.isHidden();
  }

  async textFieldIsVisible(id) {
    let css = await FIELDS.TEXT.cssTag;
    let type = await FIELDS.TEXT.type;
    let field = await new CCDStringField(css, type, id);
    return await field.isVisible();
  }

  async caseLinkFieldIsHidden(id) {
    let css = await FIELDS.CASE_LINK.cssTag;
    let type = await FIELDS.CASE_LINK.type;
    let field = await new CCDStringField(css, type, id);
    return await field.isHidden();
  }

  async caseLinkFieldIsVisible(id) {
    let css = await FIELDS.CASE_LINK.cssTag;
    let type = await FIELDS.CASE_LINK.type;
    let field = await new CCDStringField(css, type, id);
    return await field.isVisible();
  }

  async fixedListFieldIsHidden(id) {
    let css = await FIELDS.FIXED_LIST.cssTag;
    let field = await new CCDFixedListField(css, id);
    return await field.isHidden();
  }

  async fixedListFieldIsVisible(id) {
    let css = await FIELDS.FIXED_LIST.cssTag;
    let field = await new CCDFixedListField(css, id);
    return await field.isVisible();
  }

  async dateFieldIsHidden(id) {
    let css = await FIELDS.DATE.cssTag;
    let field = await new CCDDateField(css, id);
    return await field.isHidden();
  }

  async dateFieldIsVisible(id) {
    let css = await FIELDS.DATE.cssTag;
    let field = await new CCDDateField(css, id);
    return await field.isVisible();
  }

  /**
   * Select random radio butto option
   * @returns CCDStringField Object
   */
  async enterIntoCollectionField(){
    let css = await FIELDS.COLLECTION.cssTag;
    let collectionField  = await new CCDCollectionField(css);
    await collectionField.enterTextData(3);
    return collectionField;
  }


  async enterIntoComplexField(){
    let css = await FIELDS.COMPLEX_TYPE.cssTag;
    let complexField  = await new CCDComplexTypeField(css);
    await complexField.enterComplexTextData();
    return complexField;
  }

  /**
   * Get contents of the number field
   * @returns {Promise<String>}
   */
  async getNumberFieldValue(){
    let css = await FIELDS.NUMBER.cssTag;
    let numberField = await new CCDStringField(css);
    return await numberField.getFieldValue();
  }

  /**
   * Get contents of the email field
   * @returns {Promise<String>}
   */
  async getEmailFieldValue(){
    let css = await FIELDS.EMAIL.cssTag;
    let field = await new CCDStringField(css);
    return await field.getFieldValue();
  }

  /**
   * Get contents of the text field
   * @returns {Promise<String>}
   */
  async getTextFieldValue(){
    let css = await FIELDS.TEXT.cssTag;
    let field = await new CCDStringField(css);
    return await field.getFieldValue();
  }

  /**
   * Get contents of the money field
   * @returns {Promise<String>}
   */
  async getMoneyFieldValue(){
    let css = await FIELDS.MONEY_GBP.cssTag;
    let field = await new CCDStringField(css);
    return await field.getFieldValue();
  }

  /**
   * Get contents of the phoneUK field
   * @returns {Promise<String>}
   */
  async getPhoneUKFieldValue(){
    let css = await FIELDS.PHONE_NUMBER.cssTag;
    let field = await new CCDStringField(css);
    return await field.getFieldValue();
  }

  /**
   * Get contents of the date field
   * @returns {Promise<String>} eg 10102019
   */
  async getDateFieldValue(){
    let css = await FIELDS.DATE.cssTag;
    let field = await new CCDDateField(css);
    return await field.getDate();
  }

  /**
   * Get contents of the text area field
   * @returns {Promise<String>}
   */
  async getTextAreaFieldValue(){
    let css = await FIELDS.TEXT_AREA.cssTag;
    let field = await new CCDTextAreaField(css);
    return await field.getValue();
  }

  /**
   * Get contents of the fixed list field
   * @returns {Promise<String>}, returns 'undefined' if no option selected
   */
  async getFixedListFieldValue(){
    let css = await FIELDS.FIXED_LIST.cssTag;
    let field = await new CCDFixedListField(css);
    return await field.getCurrentOption();
  }

  /**
   * Get contents of the yes-no field
   * @returns {Promise<String>}, returns 'undefined' if no option selected
   */
  async getYesNoFieldValue(){
    let css = await FIELDS.YES_NO.cssTag;
    let field = await new CCDYesNoField(css);
    return await field.getCurrentOption();
  }

  /**
   * Get contents of the number field
   * @returns {Array<String>}, returns array of names of selected checkboxes
   */
  async getSelectedCheckboxes(){
    let css = await FIELDS.MULTI_SELECT.cssTag;
    let field = await new CCDMultiSelectField(css);
    return await field.getSelectedCheckboxes();
  }

  /**
   * Interact with any field type entering randomly generated data or selecting random options
   * @param dataType
   * @param value - optional value to enter into field if applicable
   * @param id - field id
   * @returns {Promise<void>}
   */
  async interactWithField(dataType, value, id){
    let dt = dataType.toLowerCase();
    switch(dt) {
      case 'address':
        return await this.enterIntoAddressLine1Field(value, id);
      case 'case-link':
        return await this.enterIntoCaseLinkField(value, id);
      case 'text':
        return await this.enterIntoTextField(value, id);
      case 'textarea':
        return await this.enterIntoTextAreaField(value);
      case 'number':
        return await this.enterIntoNumberField(value);
      case 'money-gbp':
        return await this.enterIntoMoneyField(value);
      case 'date':
        return await this.enterIntoDateField(value, id);
      case 'document':
        return //todo
      case 'email':
        return await this.enterIntoEmailField(value);
      case 'fixed-list':
        return await this.selectFromFixedList(value, id);
      case 'multi-select':
        return await this.selectFromMultiSelect(value, id);
      case 'phone-uk':
        return await this.enterIntoPhoneField(value);
      case 'yes-no':
        return await this.selectYesNoOption(value, id);
      case 'collection':
        return await this.enterIntoCollectionField();
      case 'complex':
        return await this.enterIntoComplexField();
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

  async fieldLabelContains(dataType, id, value) {
    let dt = dataType.toLowerCase();
    switch(dt) {
      case 'address':
        return //todo
      case 'case-link':
        return await this.caseLinkFieldContainsInLabel(value, id);
      case 'text':
        return await this.textFieldContainsInLabel(value, id);
      case 'fixed-list':
        return await this.fixedListFieldContainsInLabel(value, id);
      case 'yes-no':
        return await this.yesNoFieldContainsInLabel(value, id);
      case 'textarea':
      case 'number':
      case 'money-gbp':
      case 'date':
      case 'document':
      case 'email':
      case 'phone-uk':
      case 'collection':
      case 'complex':
        throw new CustomError(`fieldLabelContains not implemented for '${dataType}'`);
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }


  /**
   * Get value from the field
   * @param dataType
   * @returns Value -can be string, or array for checkboxes
   */
  async getFieldValue(dataType){
    let dt = dataType.toLowerCase();
    switch(dt) {
      case 'text':
        return await this.getTextFieldValue()
      case 'number':
        return await this.getNumberFieldValue();
      case 'date':
        return await this.getDateFieldValue()
      case 'email':
        return await this.getEmailFieldValue();
      case 'money-gbp':
        return await this.getMoneyFieldValue();
      case 'phone-uk':
        return await this.getPhoneUKFieldValue();
      case 'textarea':
        return await this.getTextAreaFieldValue();
      case 'fixed-list':
        return await this.getFixedListFieldValue();
      case 'yes-no':
        return await this.getYesNoFieldValue();
      case 'multi-select':
        return await this.getSelectedCheckboxes();
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }




  /**
   * Check if field is present
   * @returns {Promise<boolean|*>}
   */
  async isFieldPresent(dataType, id){
    let css = await this._getFieldCSS(dataType);
    if (id) {
      return await $(`${css} #${id}`).isPresent();
    } else {
      return await element(by.css(css)).isPresent();
    }
  }

  /**
   * Check if field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasFieldLabels(dataType, labelArray){
    let field = await this._getField(dataType);
    return await field.hasFieldLabels(labelArray);
  }

  /**
   * Check if field is present and enabled
   * @returns {Promise<boolean|*>}
   */
  async isFieldReady(dataType, valueArray){
    let field = await this._getField(dataType);
    let isPresent = await field.isFieldReady(valueArray);
    return isPresent;
  }

  async getFieldDetails(dataType, fieldId) {
    let css = await this._getFieldCSS(dataType);
    switch(dataType.toLowerCase()) {
      case 'fixed-list':
        return new CCDFixedListField(css, fieldId).getOptions();
      case 'fixed-radio-list':
        return new CCDFixedRadioListField(css, fieldId).getOptions();
      case 'multi-select':
        return new CCDMultiSelectField(css, fieldId).getOptions();
      case 'text':
      case 'number':
      case 'date':
      case 'document':
      case 'email':
      case 'money-gbp':
      case 'phone-uk':
      case 'yes-no':
      case 'collection':
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

  /**
   * retrieve the css component of a given field data type
   * @param dataType
   * @returns css component of specified field
   */
  async _getField(dataType){
    let css = await this._getFieldCSS(dataType);
    let type = await this._getFieldInputType(dataType);
    switch(dataType.toLowerCase()) {
      case 'text':
      case 'number':
      case 'date':
      case 'document':
      case 'email':
      case 'money-gbp':
      case 'phone-uk':
          return new CCDStringField(css, type);
      case 'textarea':
          return new CCDTextAreaField(css);
      case 'address':
        return new CCDComplexTypeField(css, type);
      case 'complex':
          return new CCDComplexTypeField(css, type);
      case 'fixed-list':
          return new CCDFixedListField(css);
      case 'yes-no':
          return new CCDYesNoField(css);
      case 'collection':
          return new CCDCollectionField(css);
      case 'multi-select':
          return new CCDMultiSelectField(css);
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }


  /**
   * retrieve the css component of a given field data type
   * @param dataType
   * @returns css component of specified field
   */
  async _getFieldCSS(dataType){
    switch(dataType.toLowerCase()) {
      case 'text':
          return FIELDS.TEXT.cssTag;
      case 'textarea':
          return FIELDS.TEXT_AREA.cssTag;
      case 'number':
          return FIELDS.NUMBER.cssTag;
      case 'address':
          return FIELDS.ADDRESS.cssTag;
      case 'money-gbp':
          return FIELDS.MONEY_GBP.cssTag;
      case 'date':
          return FIELDS.DATE.cssTag;
      case 'document':
          return FIELDS.DOCUMENT.cssTag;
      case 'email':
          return FIELDS.EMAIL.cssTag;
      case 'fixed-radio-list':
          return FIELDS.FIXED_RADIO_LIST.cssTag;
      case 'fixed-list':
          return FIELDS.FIXED_LIST.cssTag;
      case 'phone-uk':
          return FIELDS.PHONE_NUMBER.cssTag;
      case 'yes-no':
          return FIELDS.YES_NO.cssTag;
      case 'collection':
          return FIELDS.COLLECTION.cssTag;
      case 'complex':
          return FIELDS.COMPLEX_TYPE.cssTag;
      case 'multi-select':
          return FIELDS.MULTI_SELECT.cssTag;
      case 'case-link':
        return FIELDS.CASE_LINK.cssTag;
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

  /**
   * retrieve the input type component of a given field data type
   * @param dataType
   * @returns css component of specified field
   */
  async _getFieldInputType(dataType){
    switch(dataType.toLowerCase()) {
      case 'text':
          return FIELDS.TEXT.type;
      case 'textarea':
          return FIELDS.TEXT_AREA.type;
      case 'number':
          return FIELDS.NUMBER.type;
      case 'address':
          return FIELDS.ADDRESS.type;
      case 'money-gbp':
          return FIELDS.MONEY_GBP.type;
      case 'date':
          return FIELDS.DATE.type;
      case 'document':
          return FIELDS.DOCUMENT.type;
      case 'email':
          return FIELDS.EMAIL.type;
      case 'fixed-radio-list':
          return FIELDS.FIXED_RADIO_LIST.type;
      case 'fixed-list':
          return FIELDS.FIXED_LIST.type;
      case 'phone-uk':
          return FIELDS.PHONE_NUMBER.type;
      case 'yes-no':
          return FIELDS.YES_NO.type;
      case 'collection':
          return FIELDS.COLLECTION.type;
      case 'complex':
          return FIELDS.COMPLEX_TYPE.type;
      case 'multi-select':
          return FIELDS.MULTI_SELECT.type;
      case 'case-link':
        return FIELDS.CASE_LINK.type;
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

  async hasClass (element, cls) {
    let classes = await element.getAttribute('class');
    return classes.split(' ').indexOf(cls) !== -1;
  };

}

module.exports = FieldDataTypes;

/**
 *  Enum holding css component for each field data type
 */
const FIELDS = Object.freeze({
  TEXT: {
    type: 'text',
    cssTag: 'ccd-write-text-field'
  },
  DATE: {
    type: 'number',
    cssTag: 'ccd-write-date-field'
  },
  DOCUMENT: {
    type: 'file',
    cssTag: 'ccd-write-document-field'
  },
  EMAIL: {
    type: 'email',
    cssTag: 'ccd-write-email-field'
  },
  FIXED_LIST: {
    htmlTag: 'select',
    cssTag: 'ccd-write-fixed-list-field'
  },
  FIXED_RADIO_LIST: {
    htmlTag: 'input',
    cssTag: 'ccd-write-fixed-radio-list-field'
  },
  MONEY_GBP: {
    type: 'text',
    cssTag: 'ccd-write-money-gbp-field'
  },
  MULTI_SELECT: {
    type: 'checkbox',
    cssTag: 'ccd-write-multi-select-list-field'
  },
  NUMBER: {
    type: 'number',
    cssTag: 'ccd-write-number-field'
  },
  ORDER_SUMMARY: {
    cssTag: 'ccd-write-order-summary-field'
  },
  PAYMENT: {
    cssTag: 'ccd-case-payment-history-viewer-field'
  },
  PHONE_NUMBER: {
    type: 'tel',
    cssTag: 'ccd-write-phone-uk-field'
  },
  TEXT_AREA: {
    type: 'text',
    html: 'textarea',
    cssTag: 'ccd-write-text-area-field'
  },
  YES_NO: {
    type: 'radio',
    htmlTag: 'input',
    cssTag: 'ccd-write-yes-no-field'
  },
  COLLECTION: {
    type: 'button',
    htmlTag: 'button',
    cssTag: 'ccd-write-collection-field'
  },
  COMPLEX_TYPE: {
    type: 'text',
    cssTag: 'ccd-write-complex-type-field'
  },
  CASE_LINK: {
    type: 'case-link',
    cssTag: 'ccd-write-case-link-field'
  },
  ADDRESS: {
    type: 'address-uk',
    cssTag: 'ccd-write-address-field'
  },

});
