CcdStringField = require('../../ccd-components/ccdStringField.js.js');


class HideAndShowComplexField {

  constructor() {
    this.css = '#HideAndShowComplex_HideAndShowComplex';

    this.addressLine1 = new CcdStringField('#HideAndShowComplex_AddressLine1','text');
    this.country = new CcdStringField('#HideAndShowComplex_Country','text');
    this.postcode = new CcdStringField('#HideAndShowComplex_Postcode','text')
  }

  static build (){
    //check initial state of fields, add default hidden param to fields based on def file
  }

  async enterData(addressline1, country, postcode){
    if (addressline1 !== ""){
      await this.addressLine1.enterIntoTextField(addressline1);
    }

    if (country !== ""){
      await this.country.enterIntoTextField(country);
    }

    if (postcode !== ""){
      await this.postcode.enterIntoTextField(postcode)
    }
  }

  async getFieldData(){
    let complexData = [];
    let addressline1Data = this.addressLine1.getFieldData();
    let countryData = this.country.getFieldData();
    let postcodeData = this.postcode.getFieldData();
    return complexData.push(addressline1Data,countryData,postcodeData);
  }

  async isPostcodeFieldVisible(){
    return await this.postcode.isVisible();
  }

}

module.exports = HideAndShowComplexField;
