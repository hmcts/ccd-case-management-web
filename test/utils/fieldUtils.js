let CustomError = require('./errors/custom-error.js');
let CCDStringField = require('../pageObjects/ccd-components/fields/ccdStringField.js');
let DateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let FixedList = require('../pageObjects/ccd-components/fields/ccdFixedList.js');
let YesNoField = require('../pageObjects/ccd-components/fields/ccdYesNoField.js');
let TextAreaField = require('../pageObjects/ccd-components/fields/ccdTextAreaField.js');
let CollectionField = require('../pageObjects/ccd-components/fields/ccdCollectionField.js');
let ComplexField = require('../pageObjects/ccd-components/fields/ccdComplexTypeField.js');

class FieldDataTypes {

  /**
   * Enter random text into the Text field
   * @returns CCDStringField Object
   */
  async enterIntoTextField(value){
    let css = await fields.TEXT.cssTag;
    let field = await new CCDStringField(css);
    await field.enterText(value);
    return field;
  }

  /**
   * Enter random text into the Text Area field
   * @returns CCDStringField Object
   */
  async enterIntoTextAreaField(value){
    let css = await fields.TEXT_AREA.cssTag;
    let textAreaField = await new TextAreaField(css);
    await textAreaField.enterText(value);
    return textAreaField;
  }

  /**
   * Enter random number into the Number field field
   * @returns CCDStringField Object
   */
  async enterIntoNumberField(value){
    let css = await fields.NUMBER.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterNumber(value);
    return textField;
  }

  /**
   * Enter random number in money field
   * @returns CCDStringField Object
   */
  async enterIntoMoneyField(value){
    let css = await fields.MONEY_GBP.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterMoney(value);
    return textField;
  }

  /**
   * Enter random email address into Email field
   * @returns CCDStringField Object
   */
  async enterIntoEmailField(value){
    let css = await fields.EMAIL.cssTag;
    let textField = await new CCDStringField(css);
    await textField.enterEmail(value);
    return textField;
  }

  /**
   * Enter random valid phone number into Phone UK field
   * @returns CCDStringField Object
   */
  async enterIntoPhoneField(value){
    let css = await fields.PHONE_NUMBER.cssTag;
    let phoneField = await new CCDStringField(css);
    await phoneField.enterPhoneNumber(value);
    return phoneField;
  }

  /**
   * Enter random valid date in the past
   * @returns CCDStringField Object
   */
  async enterIntoDateField(value){
    let css = await fields.DATE.cssTag;
    let dateField = await new DateField(css);
    await dateField.enterDate(value);
    return dateField;
  }

  /**
   * Select a random option from the dropdown
   * @returns CCDStringField Object
   */
  async selectFromFixedList(){
    let css = await fields.FIXED_LIST.cssTag;
    let fixedListField = await new FixedList(css);
    await fixedListField.selectOption();
    return fixedListField;
  }

  /**
   * Select random radio butto option
   * @returns CCDStringField Object
   */
  async selectYesNoOption(){
    let css = await fields.YES_NO.cssTag;
    let yesNoField = await new YesNoField(css);
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
   * retrieve the css component of a given field data type
   * @param dataType
   * @returns css component of specified field
   */
  async _getFieldCSS(dataType){
    switch(dataType.toLowerCase()) {
      case 'text':
          return fields.TEXT.cssTag;
      case 'textarea':
          return fields.TEXT_AREA.cssTag;
      case 'number':
          return fields.NUMBER.cssTag;
      case 'money-gbp':
          return fields.MONEY_GBP.cssTag;
      case 'date':
          return fields.DATE.cssTag;
      case 'document':
          return fields.DOCUMENT.cssTag;
      case 'email':
          return fields.EMAIL.cssTag;
      case 'fixed-list':
          return fields.FIXED_LIST.cssTag;
      case 'phone uk':
          return fields.PHONE_NUMBER.cssTag;
      case 'yes-no':
          return fields.YES_NO.cssTag;
      case 'collection':
          return fields.COLLECTION.cssTag;
      case 'complex':
          return fields.COMPLEX_TYPE.cssTag;
      default:
        throw new CustomError(`could not find a data type called '${dataType}'`)
    }
  }

}

module.exports = FieldDataTypes;

/**
 *  Enum holding css component for each field data type
 */
const fields = Object.freeze({
  TEXT: {
    cssTag: 'ccd-write-text-field'
  },
  DATE: {
    cssTag: 'ccd-write-date-field'
  },
  DOCUMENT: {
    cssTag: 'ccd-write-document-field'
  },
  EMAIL: {
    cssTag: 'ccd-write-email-field'
  },
  FIXED_LIST: {
    cssTag: 'ccd-write-fixed-list-field'
  },
  MONEY_GBP: {
    cssTag: 'ccd-write-money-gbp-field'
  },
  MULTI_SELECT: {
    cssTag: 'ccd-write-multi-select-list-field'
  },
  NUMBER: {
    cssTag: 'ccd-write-number-field'
  },
  ORDER_SUMMARY: {
    cssTag: 'ccd-write-order-summary-field'
  },
  PAYMENT: {
    cssTag: 'ccd-case-payment-history-viewer-field'
  },
  PHONE_NUMBER: {
    cssTag: 'ccd-write-phone-uk-field'
  },
  TEXT_AREA: {
    cssTag: 'ccd-write-text-area-field'
  },
  YES_NO: {
    cssTag: 'ccd-write-yes-no-field'
  },
  COLLECTION: {
    cssTag: 'ccd-write-collection-field'
  },
  COMPLEX_TYPE: {
    cssTag: 'ccd-write-complex-type-field'
  },


});
