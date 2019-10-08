let CustomError = require('./errors/custom-error.js');
let CCDStringField = require('../pageObjects/ccd-components/fields/ccdStringField.js');
let CCDDateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let CCDFixedListField = require('../pageObjects/ccd-components/fields/ccdFixedList.js');
let CCDFixedRadioListField = require('../pageObjects/ccd-components/fields/ccdFixedRadioList.js');
let CCDYesNoField = require('../pageObjects/ccd-components/fields/ccdYesNoField.js');
let CCDTextAreaField = require('../pageObjects/ccd-components/fields/ccdTextAreaField.js');
let CCDComplexTypeField = require('../pageObjects/ccd-components/fields/ccdComplexTypeBaseField.js');
let CCDMultiSelectField = require('../pageObjects/ccd-components/fields/ccdMultiSelectField.js');
let CCDCollectionField = require('../pageObjects/ccd-components/fields/ccdCollectionField.js');
let CCDAddressUKField = require('../pageObjects/ccd-components/fields/ccdAddressUK.js');
let CCDDocumentField = require('../pageObjects/ccd-components/fields/ccdDocumentField.js');

class FieldDataTypes {

  /**
   * Enter random text into the Text field
   * @returns CCDStringField Object
   */
  async enterIntoTextField(value, id){
    let css = await FIELDS.TEXT.cssTag;
    let locator = id ? `#${id}` : css;
    let field = await new CCDStringField(locator);
    await field.enterText(value);
    return field;
  }

  /**
   * Enter a text into the CaseLink field
   * @returns CCDStringField Object
   */
  async enterIntoCaseLinkField(value) {
    let css = await FIELDS.CASE_LINK.cssTag;
    let field = await new CCDStringField(css);
    await field.enterText(value);
    return field;
  }

  /**
   * Sets the value into the AddressLine1 field of the address field specified by id.
   * If no id is specified it will populate AddressLine1 of the first found address.
   * @param value
   * @param id
   * @returns CCDAddressUKField Object
   * @deprecated: not highly reusable, use page objects instead
   */
  async enterIntoAddressLine1Field(value, id) {
    let css = await FIELDS.ADDRESS.cssTag;
    let field = await new CCDAddressUKField(css, id);
    await field.clickCantEnterPostcodeLink();
    await field.enterAddressLine1(value);
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
  async enterIntoNumberField(value, id){
    let css = await FIELDS.NUMBER.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterNumber(value);
    return textField;
  }

  /**
   * Enter random number in money field
   * @returns CCDStringField Object
   */
  async enterIntoMoneyField(value){
    let css = await FIELDS.MONEY_GBP.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterMoney(value);
    return textField;
  }

  /**
   * Enter random email address into Email field
   * @returns CCDStringField Object
   */
  async enterIntoEmailField(value){
    let css = await FIELDS.EMAIL.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterEmail(value);
    return textField;
  }

  /**
   * Enter random valid phone number into Phone UK field
   * @returns CCDStringField Object
   */
  async enterIntoPhoneField(value){
    let css = await FIELDS.PHONE_NUMBER.cssTag;
    let phoneField = await new CCDStringField(css);
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
   * Enter the valid document file name to be uploaded
   * @returns CCDDocumentField Object
   */
  async enterIntoDocumentField(value, id){
    let css = await FIELDS.DOCUMENT.cssTag;
    let docField = new CCDDocumentField(css, id);
    let fileValue = ''
    if (value ) {
      fileValue = process.cwd() + value;
    }
    await docField.uploadFile(fileValue);
    return docField;
  }

  /**
   * Select a provided option from the dropdown
   * @returns CCDStringField Object
   */
  async selectFromFixedList(value, id){
    let css = await FIELDS.FIXED_LIST.cssTag;
    let locator = id ? `#${id}` : css;
    let fixedListField = await new CCDFixedListField(locator);
    await fixedListField.selectOption(value);
    return fixedListField;
  }

  /**
   * Select a provided option from the dropdown
   * @returns CCDStringField Object
   */
  async selectFromFixedRadioList(value, id){
    let css = await FIELDS.FIXED_RADIO_LIST.cssTag;
    let fixedRadioListField = await new CCDFixedRadioListField(css, id);
    await fixedRadioListField.selectOption(value);
    return fixedRadioListField;

  }

  async selectFromMultiSelect(value, id){
    let css = await FIELDS.MULTI_SELECT.cssTag;
    let locator = id ? `#${id}` : css;
    let multiSelectField = await new CCDMultiSelectField(locator);
    await multiSelectField.selectAnyOneElement(value);
    return multiSelectField;
  }

  /**
   * Select a provided radio butto option
   * @returns CCDStringField Object
   */
  async selectYesNoOption(value, id){
    let css = await FIELDS.YES_NO.cssTag;
    let locator = id ? `#${id}` : css;
    let yesNoField = await new CCDYesNoField(locator);
    await yesNoField.selectOption(value);
    return yesNoField;
  }

  //needs refactor later -------


  async fieldYesNoIsVisible(radioId) {
    let yesNoField = await new CCDYesNoField(radioId);
    return await yesNoField.isVisible();
  }

  async textFieldIsVisible(id) {
    let field = await new CCDStringField(id);
    return await field.isVisible();
  }

  async numberFieldIsVisible(id) {
    let field = await new CCDStringField(id);
    return await field.isVisible();
  }

  async caseLinkFieldIsVisible(id) {
    let field = await new CCDStringField(id);
    return await field.isVisible();
  }

  async fixedListFieldIsVisible(id) {
    let field = await new CCDFixedListField(id);
    return await field.isVisible();
  }

  async dateFieldIsVisible(id) {
    let field = await new CCDDateField(id);
    return await field.isVisible();
  }

  //--------

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
        return await this.enterIntoNumberField(value, id);
      case 'money-gbp':
        return await this.enterIntoMoneyField(value);
      case 'date':
        return await this.enterIntoDateField(value, id);
      case 'document':
        return await this.enterIntoDocumentField(value, id);
      case 'email':
        return await this.enterIntoEmailField(value);
      case 'fixed-list':
        return await this.selectFromFixedList(value, id);
      case 'fixed-radio-list':
        return await this.selectFromFixedRadioList(value, id);
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


  async getListOptions(listType){
    let field = await this._getField(listType);
    return await field.getOptions();
  }



  /**
   * Check if field is present
   * @returns {Promise<boolean|*>}
   */
  async isFieldPresent(dataType, id){
    let css = await this._getFieldCSS(dataType);
    if (id) {
      return await $(`#${id}`).isPresent();
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
    switch(dataType.toLowerCase()) {
      case 'text':
      case 'number':
      case 'email':
      case 'money-gbp':
      case 'phone-uk':
          return new CCDStringField(css);
      case 'textarea':
          return new CCDTextAreaField(css);
      case 'address':
        return new CCDComplexTypeField(css);
      case 'complex':
          return new CCDComplexTypeField(css);
      case 'fixed-list':
          return new CCDFixedListField(css);
      case 'yes-no':
          return new CCDYesNoField(css);
      case 'collection':
          return new CCDCollectionField(css);
      case 'multi-select':
          return new CCDMultiSelectField(css);
      case 'date':
        return new CCDDateField(css)
     case 'document':
        return new CCDDocumentField(css)
      case 'fixed-radio-list':
        return new CCDFixedRadioListField(css);
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
    cssTag: 'ccd-write-text-field input'
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
    cssTag: 'ccd-write-email-field input'
  },
  FIXED_LIST: {
    htmlTag: 'select',
    cssTag: 'ccd-write-fixed-list-field select'
  },
  FIXED_RADIO_LIST: {
    htmlTag: 'input',
    cssTag: 'ccd-write-fixed-radio-list-field'
  },
  MONEY_GBP: {
    type: 'text',
    cssTag: 'ccd-write-money-gbp-field input'
  },
  MULTI_SELECT: {
    type: 'checkbox',
    cssTag: 'ccd-write-multi-select-list-field'
  },
  NUMBER: {
    type: 'number',
    cssTag: 'ccd-write-number-field input'
  },
  ORDER_SUMMARY: {
    cssTag: 'ccd-write-order-summary-field'
  },
  PAYMENT: {
    cssTag: 'ccd-case-payment-history-viewer-field'
  },
  PHONE_NUMBER: {
    type: 'tel',
    cssTag: 'ccd-write-phone-uk-field input'
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
