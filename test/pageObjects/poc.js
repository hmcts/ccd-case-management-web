BasePage = require('./basePage.js')
let HideAndShowComplexField = require('./ccd-components/fields/HideAndShowComplexField.js')
let CcdStringField = require('./ccd-components/ccdStringField.js.js');

class POC extends BasePage {

  constructor() {
    super();

    this.textField1 = new CcdStringField('TextField1','text');
    this.textField2 = new CcdStringField('TextField2','text');
    this.hideAndShowAddress = new HideAndShowComplexField();

  }

  async returnPageFields(){
      return [].push(this.textField1.getFieldData(), this.textField2.getFieldData(), this.hideAndShowAddress.getFieldData());
  }

}

module.exports = POC;
