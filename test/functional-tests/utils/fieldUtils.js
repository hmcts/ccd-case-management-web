let CustomError = require('./errors/custom-error.js');
TextField = require('../pageObjects/ccd-components/fields/textField.js');
DateField = require('../pageObjects/ccd-components/fields/dateField.js');
TextAreaField = require('../pageObjects/ccd-components/fields/textAreaField.js');

class FieldDataTypes {

  async enterIntoTextField(){
    let css = await fields.TEXT.cssTag;
    let textField = await new TextField(css);
    await textField.enterText();
    return textField;
  }

  async enterIntoTextAreaField(){
    let css = await fields.TEXT_AREA.cssTag;
    let textAreaField = await new TextAreaField(css);
    await textAreaField.enterText();
    return textAreaField;
  }

  async enterIntoNumberField(){
    let css = await fields.NUMBER.cssTag;
    let textField = await new TextField(css);
    await textField.enterNumber();
    return textField;
  }

  async enterIntoMoneyField(){
    let css = await fields.MONEY_GBP.cssTag;
    let textField = await new TextField(css);
    await textField.enterMoney();
    return textField;
  }

  async enterIntoEmailField(){
    let css = await fields.EMAIL.cssTag;
    let textField = await new TextField(css);
    await textField.enterEmail();
    return textField;
  }


  async enterIntoDateField(){
    let css = await fields.DATE.cssTag;
    let dateField = await new DateField(css);
    await dateField.enterDate();
    return dateField;
  }



    async interactWithField(dataType){
      let dt = dataType.toLowerCase();
      switch(dt) {
        case 'text':
          return await this.enterIntoTextField();
        case 'textarea':
          return await this.enterIntoTextAreaField();
        case 'number':
          return await this.enterIntoNumberField();
        case 'address':
          return fields.ADDRESS.cssTag;
        case 'money-gbp':
          return await this.enterIntoMoneyField();
        case 'date':
          return await this.enterIntoDateField();
        case 'document':
          return fields.DOCUMENT.cssTag;
        case 'email':
          return await this.enterIntoEmailField();
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


    async getFieldCSS(dataType){
      switch(dataType.toLowerCase()) {
        case 'text':
            return fields.TEXT.cssTag;
        case 'textarea':
            return fields.TEXT_AREA.cssTag;
        case 'number':
            return fields.NUMBER.cssTag;
        case 'address':
            return fields.ADDRESS.cssTag;
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


const fields = {
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


};
