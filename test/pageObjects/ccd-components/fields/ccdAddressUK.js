let CCDStringField = require('../fields/ccdStringField.js');
let CCDFixedList = require('../fields/ccdFixedList.js');
let ComplexBase = require('../fields/ccdComplexTypeBaseField.js');
let Button = require('../../webdriver-components/button.js');
let id = "#AddressUKField_AddressUKField";


class CcdAddressUKComplex extends ComplexBase {

  constructor() {
    super(id);
    this.id = id;

    this.postodeInput = new CCDStringField(`${this.id} input[name=postcode]`,'AddressUK.EnterAUKPostcode');
    this.findAddressButton = new Button(`${this.id} #postcodeLookup button`);
    this.cantEnterPostcodeLink = $(`${this.id} a`);
    this.selectAddressDropdown = new CCDFixedList('#AddressUKField_AddressUKField_addressList','AddressUK.SelectAnAddress');

    this.addressLine1 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(1) input`,'AddressUK.AddressLine1');
    this.addressLine2 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) input`,'AddressUK.AddressLine2');
    this.addressLine3 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) input`,'AddressUK.AddressLine3');
    this.addressTownCity = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(4) input`,'AddressUK.PostTown');
    this.addressCounty = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(5) input`,'AddressUK.County');
    this.addressPostcode = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(6) input`,'AddressUK.PostCode');
    this.addressCountry = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(7) input`,'AddressUK.Country');
  }



  async getFieldData(){
    let addLine1Data = await this.addressLine1.getFieldData();
    let addLine2Data = await this.addressLine2.getFieldData();
    let addLine3Data = await this.addressLine3.getFieldData();
    let addTownCityData = await this.addressTownCity.getFieldData();
    let countyData = await this.addressCounty.getFieldData();
    let countryData = await this.addressCountry.getFieldData();
    let postCodeData = await this.addressPostcode.getFieldData();
    return Array.of(addLine1Data,addLine2Data,addLine3Data,countryData,addTownCityData,countyData,postCodeData);
  }

  async clickCantEnterPostcodeLink(){
    await this.cantEnterPostcodeLink.click();
  }

  async enterAddressLine1(text){
    await this.addressLine1.enterText(text);
  }

  async enterPostcode(text){
    await this.postodeInput.enterText(text)
  }

  async clickAddressButton(){
    await this.findAddressButton.click();
  }

  async getAddressDropdown(){
    return await this.selectAddressDropdown;
  }


}

module.exports = CcdAddressUKComplex;
