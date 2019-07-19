let AddressComplex = require('../ccd-components/complexTypes/addressComplex.js')
let CcdAddressUKComplex = require('../ccd-components/fields/ccdAddressUK.js')

class DataFieldTypesPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.addressComplex = new AddressComplex();
    this.addressUKComplex = new CcdAddressUKComplex();

  }

  async getFieldData(){
    let addressData = await this.addressComplex.getFieldData();
    let addressUKData = await this.addressUKComplex.getFieldData();
    return Array.of(addressData, addressUKData);
  }

  async getAddressComplex(){
    return this.addressComplex;
  }

  async getAddressUKComplex(){
    return await this.addressUKComplex;
  }

}

module.exports = DataFieldTypesPage;
