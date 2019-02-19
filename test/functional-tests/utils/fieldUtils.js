let CustomError = require('./errors/custom-error.js');
let CCDStringField = require('../pageObjects/ccd-components/fields/ccdStringField.js');
let CCDDateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let CCDFixedListField = require('../pageObjects/ccd-components/fields/ccdFixedList.js');
let CCDYesNoField = require('../pageObjects/ccd-components/fields/ccdYesNoField.js');
let CCDTextAreaField = require('../pageObjects/ccd-components/fields/ccdTextAreaField.js');
let CCDComplexTypeField = require('../pageObjects/ccd-components/fields/ccdComplexTypeField.js');
let CCDMultiSelectField = require('../pageObjects/ccd-components/fields/ccdMultiSelectField.js');
let CCDCollectionField = require('../pageObjects/ccd-components/fields/ccdCollectionField.js');

class FieldDataTypes {

  /**
   * Enter random text into the Text field
   * @returns CCDStringField Object
   */
  async enterIntoTextField(value){
    let css = await FIELDS.TEXT.cssTag;
    let type = await FIELDS.TEXT.type;
    let field = await new CCDStringField(css, type, '#TextField');
    await field.enterText(value);
    return field;
  }

  /**
   * Enter random text into the Text Area field
   * @returns CCDStringField Object
   */
  async enterIntoTextAreaField(){
    let css = await FIELDS.TEXT_AREA.cssTag;
    let textAreaField = await new CCDTextAreaField(css);
    await textAreaField.enterText();
    return textAreaField;
  }

  /**
   * Enter random number into the Number field field
   * @returns CCDStringField Object
   */
  async enterIntoNumberField(){
    let css = await FIELDS.NUMBER.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type, '#NumberField');
    await textField.enterNumber();
    return textField;
  }

  /**
   * Enter random number in money field
   * @returns CCDStringField Object
   */
  async enterIntoMoneyField(){
    let css = await FIELDS.MONEY_GBP.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type, '#MoneyField');
    await textField.enterMoney();
    return textField;
  }

  /**
   * Enter random email address into Email field
   * @returns CCDStringField Object
   */
  async enterIntoEmailField(){
    let css = await FIELDS.EMAIL.cssTag;
    let type = await FIELDS.TEXT.type;
    let textField = await new CCDStringField(css, type, '#EmailField');
    await textField.enterEmail();
    return textField;
  }

  /**
   * Enter random valid phone number into Phone UK field
   * @returns CCDStringField Object
   */
  async enterIntoPhoneField(){
    let css = await FIELDS.PHONE_NUMBER.cssTag;
    let type = await FIELDS.TEXT.type;
    let phoneField = await new CCDStringField(css, type, '#PhoneField');
    await phoneField.enterPhoneNumber();
    return phoneField;
  }

  /**
   * Enter random valid date in the past
   * @returns CCDStringField Object
   */
  async enterIntoDateField(){
    let css = await FIELDS.DATE.cssTag;
    let dateField = await new CCDDateField(css);
    await dateField.enterDate();
    return dateField;
  }

  /**
   * Select a random option from the dropdown
   * @returns CCDStringField Object
   */
  async selectFromFixedList(){
    let css = await FIELDS.FIXED_LIST.cssTag;
    let fixedListField = await new CCDFixedListField(css);
    await fixedListField.selectOption();
    return fixedListField;
  }

  /**
   * Select random radio butto option
   * @returns CCDStringField Object
   */
  async selectYesNoOption(){
    let css = await FIELDS.YES_NO.cssTag;
    let yesNoField = await new CCDYesNoField(css);
    await yesNoField.selectOption();
    return yesNoField;
  }

  /**
   * Select random radio butto option
   * @returns CCDStringField Object
   */
  async enterIntoCollectionField(){
    let css = await fields.COLLECTION.cssTag;
    let collectionField  = await new CollectionField(css);
    await collectionField.enterTextData(3);
    return collectionField;
  }

  /**
   * Select random radio butto option
   * @returns CCDStringField Object
   */
  async enterIntoComplexFiled(){
    let css = await fields.COMPLEX_TYPE.cssTag;
    let complexField  = await new ComplexField(css);
    await complexField.enterComplexTextData();
    return complexField;
  }

  /**
   * Get contents of the number field
   * @returns {Promise<String>}
   */
  async getNumberFieldValue(){
    let css = await fields.NUMBER.cssTag;
    let numberField = await new CCDStringField(css);
    return await numberField.getFieldValue();
  }

  /**
   * Interact with any field type entering randomly generated data or selecting random options
   * @param dataType
   * @param value - optional value to enter into field if applicable
   * @returns {Promise<void>}
   */
  async interactWithField(dataType, value){
    let dt = dataType.toLowerCase();
    switch(dt) {
      case 'text':
        return await this.enterIntoTextField(value);
      case 'textarea':
        return await this.enterIntoTextAreaField(value);
      case 'number':
        return await this.enterIntoNumberField(value);
      case 'money-gbp':
        return await this.enterIntoMoneyField(value);
      case 'date':
        return await this.enterIntoDateField(value);
      case 'document':
        return //todo
      case 'email':
        return await this.enterIntoEmailField(value);
      case 'fixed-list':
        return await this.selectFromFixedList();
      case 'phone uk':
        return await this.enterIntoPhoneField(value);
      case 'yes-no':
        return await this.selectYesNoOption();
      case 'collection':
        return await this.enterIntoCollectionField();
      case 'complex':
        return await this.enterIntoComplexFiled();
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

  /**
   * Check if field is present
   * @returns {Promise<boolean|*>}
   */
  async isFieldPresent(css){
    let isPresent = await element(by.css(css)).isPresent();
    return isPresent;
  }

  /**
   * Check if field is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isInputFieldReady(css, idSelectors, type){
    let textField = await new CCDStringField(css, idSelectors, type);
    let isPresent = await textField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if text field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasTextFieldLabel(label){
    let textField = await new CCDStringField(`${FIELDS.TEXT.cssTag} label[for="TextField"]`);
    return await textField.hasFieldLabel(label);
  }

  /**
   * Check if date is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDateFieldInputReady(){
    let dateField = await new CCDDateField(FIELDS.DATE.cssTag);
    let isPresent = await dateField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if date field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasDateFieldLabel(label){
    let dateField = await new CCDDateField(FIELDS.DATE.cssTag);
    return await dateField.hasFieldLabel(label);
  }

  /**
   * Check if text area is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isTextAreaFieldInputReady(){
    let textAreaField = await new CCDTextAreaField(FIELDS.TEXT_AREA.cssTag);
    let isPresent = await textAreaField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if text area label is present
   * @returns {Promise<boolean|*>}
   */
  async hasTextAreaFieldLabel(label){
    let textAreaField = await new CCDTextAreaField(FIELDS.TEXT_AREA.cssTag);
    return await textAreaField.hasFieldLabel(label);
  }

  /**
   * Check if complex type is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isComplexTypeFieldInputReady(idSelectors){
    let complexTypeField = await new CCDComplexTypeField(FIELDS.COMPLEX_TYPE.cssTag, FIELDS.COMPLEX_TYPE.type, idSelectors);
    let isPresent = await complexTypeField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if text area label is present
   * @returns {Promise<boolean|*>}
   */
  async hasComplexTypeFieldLabel(labels, idSelectors){
    let complexTypeField = await new CCDComplexTypeField(FIELDS.COMPLEX_TYPE.cssTag, FIELDS.COMPLEX_TYPE.type, idSelectors);
    return await complexTypeField.hasFieldLabels(labels);
  }

  /**
   * Check if phone field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasPhoneFieldLabel(label){
    let phoneField = await new CCDStringField(FIELDS.PHONE_NUMBER.cssTag);
    return await phoneField.hasFieldLabel(label);
  }

  /**
   * Check if phone field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasNumberFieldLabel(label){
    let numberField = await new CCDStringField(FIELDS.NUMBER.cssTag);
    return await numberField.hasFieldLabel(label);
  }

  /**
   * Check if yes no field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasYesNoFieldLabel(label){
    let yesNoField = await new CCDYesNoField(FIELDS.YES_NO.cssTag);
    return await yesNoField.hasFieldLabel(label);
  }

  /**
   * Check if yes no is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isYesNoFieldInputReady(){
    let yesNoField = await new CCDYesNoField(FIELDS.YES_NO.cssTag);
    let isPresent = await yesNoField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if collection field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasCollectionFieldLabel(label){
    let collectionField = await new CCDCollectionField(FIELDS.COLLECTION.cssTag);
    return await collectionField.hasFieldLabel(label);
  }

  /**
   * Check if collection is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isCollectionFieldInputReady(){
    let collectionField = await new CCDCollectionField(FIELDS.COLLECTION.cssTag);
    let isPresent = await collectionField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if fixed list field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasFixedListFieldLabel(label){
    let fixedListField = await new CCDFixedListField(FIELDS.FIXED_LIST.cssTag);
    return await fixedListField.hasFieldLabel(label);
  }

  /**
   * Check if fixed list is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isFixedListFieldInputReady(values){
    let fixedListField = await new CCDFixedListField(FIELDS.FIXED_LIST.cssTag);
    let isPresent = await fixedListField.isFieldInputReady(values);
    return isPresent;
  }

  /**
   * Check if fixed list field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasMoneyGBPFieldLabel(label){
    let moneyGBPField = await new CCDStringField(FIELDS.MONEY_GBP.cssTag);
    return await moneyGBPField.hasFieldLabel(label);
  }

  /**
   * Check if documet field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasDocumentFieldLabel(label){
    let documentField = await new CCDStringField(FIELDS.DOCUMENT.cssTag);
    return await documentField.hasFieldLabel(label);
  }

  /**
   * Check if document field is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDocumentFieldInputReady(){
    let documentField = await new CCDStringField(FIELDS.DOCUMENT.cssTag, FIELDS.DOCUMENT.type);
    let isPresent = await documentField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if multi select field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasMultiSelectFieldLabel(labels, idSelectors){
    let multiSelectField = await new CCDMultiSelectField(FIELDS.MULTI_SELECT.cssTag, idSelectors);
    return await multiSelectField.hasFieldLabels(labels);
  }

  /**
   * Check if document field is ready to type
   * @returns {Promise<boolean|*>}
   */
  async isMultiSelectFieldInputReady(idSelectors){
    let documentField = await new CCDMultiSelectField(FIELDS.MULTI_SELECT.cssTag, idSelectors);
    let isPresent = await documentField.isFieldInputReady();
    return isPresent;
  }

  /**
   * Check if email field label is present
   * @returns {Promise<boolean|*>}
   */
  async hasEmailFieldLabel(label){
    let emailField = await new CCDStringField(FIELDS.EMAIL.cssTag);
    return await emailField.hasFieldLabel(label);
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
      case 'fixed-list':
          return FIELDS.FIXED_LIST.cssTag;
      case 'phone uk':
          return FIELDS.PHONE_NUMBER.cssTag;
      case 'yes-no':
          return FIELDS.YES_NO.cssTag;
      case 'collection':
          return FIELDS.COLLECTION.cssTag;
      case 'complex':
          return FIELDS.COMPLEX_TYPE.cssTag;
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
global.FIELDS = Object.freeze({
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
    type: 'textarea',
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

});
