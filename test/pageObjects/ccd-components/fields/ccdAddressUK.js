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
    this.cantEnterPostcodeLink = $(`${this.id} #postcodeLookup link`);
    this.selectAddressDropdown = new CCDFixedList('#AddressUKField_AddressUKField_addressList','AddressUK.SelectAnAddress');

    this.addressLine1 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(1) input`,'AddressUK.AddressLine1');
    this.addressLine2 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) input`,'AddressUK.AddressLine2');
    this.addressLine3 = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) input`,'AddressUK.AddressLine3');
    this.addressTownCity = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(4) input`,'AddressUK.PostTown');
    this.addressCounty = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(5) input`,'AddressUK.County');
    this.addressPostcode = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(6) input`,'AddressUK.PostCode');
    this.addressCountry = new CCDStringField(`${this.id} ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(7) input`,'AddressUK.Country');

    // this.initialiseFields(this.id)
  }

  // /**
  //  * Allows us to also re-initialise fields fpr a collection by parsing collection parent id here
  //  * @param id - id of the complex OR may be the id of the collection (of this complex)
  //  * @param collectionOrderIndex
  //  */
  // initialiseFields(id,collectionOrderIndex) {
  //   //if this is part of a collection we want to prefix the key with the index ie 1.Complex.field
  //   let collectionPrefix = '';
  //   if (typeof collectionOrderIndex !== 'undefined'){
  //     collectionPrefix = `${collectionOrderIndex}.`
  //   }
  //   this.id = id;
  //   this.addLine1 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(1) input`, `${collectionPrefix}Address.AddressLine1AddressLine1`);
  //   this.addLine2 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(2) input`, `${collectionPrefix}Address.AddressLine1AddressLine2`);
  //   this.addLine3 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(3) input`, `${collectionPrefix}Address.AddressLine1AddressLine3`);
  //   this.country = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(4) input`, `${collectionPrefix}Address.Country`);
  // }

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

  async enterPostcode(text){
    await this.postodeInput.enterText(text)
  }

  async clickAddressButton(){
    await this.findAddressButton.click();
  }

  getAddressDropdown(){
    return this.selectAddressDropdown;
  }


}

module.exports = CcdAddressUKComplex;
