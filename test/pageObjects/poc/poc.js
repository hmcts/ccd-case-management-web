BasePage = require('../basePage.js')
let HideAndShowComplexField = require('./HideAndShowComplexField.js')
let CcdStringField = require('../ccd-components/fields/ccdStringField.js');

class POC extends BasePage {

  constructor() {
    super();

    this.textField1 = new CcdStringField('#TextField1','text', 'insertkey');
    this.textFieldA = new CcdStringField('#TextField2','text');
    // this.addressLine1 = new CcdStringField('#HideAndShowComplex_AddressLine1','text');
    // this.country = new CcdStringField('#HideAndShowComplex_Country','text');
    // this.postcode = new CcdStringField('#HideAndShowComplex_Postcode','text')
    this.hideAndShowAddress = new HideAndShowComplexField();

  }


  async returnPageFields(){
      return [].push(await this.textField1.getFieldData(), await this.textFieldA.getFieldData(), await this.hideAndShowAddress.getFieldData());
  }
  /**
   * list of
   * for each field
   * -key
   * -val
   * -is hidden
   */


}

module.exports = POC;

