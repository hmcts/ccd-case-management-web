let AddressComplex = require('../ccd-components/fields/ccdAddressUKField.js')

class DataFieldTypesPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.addressComplex = new AddressComplex('#AddressField_AddressField')

  }

  async getFieldData(){
    return Array.of(await this.addressComplex.getFieldData());
  }

  async getAddressComplex(){
    return this.addressComplex;
  }

  async enterIntoComplex(data){
    await this.addressComplex.enterData(data);
  }

}

module.exports = DataFieldTypesPage;
