let AddressComplex = require('../ccd-components/complexTypes/addressComplex.js')
let CcdAddressUKComplex = require('../ccd-components/fields/ccdAddressUK.js')
let CcdFixedList = require('../ccd-components/fields/ccdFixedList')

class DataFieldTypesPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.addressComplex = new AddressComplex();
    this.addressUKComplex = new CcdAddressUKComplex();
    this.dynamicList = new CcdFixedList('#DynamicList');
  }

  async getDynamicListItems(){
    return await this.dynamicList.getOptions();
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
