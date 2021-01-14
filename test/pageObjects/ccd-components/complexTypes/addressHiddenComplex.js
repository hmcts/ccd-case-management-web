let CCDStringField = require('../fields/ccdStringField.js');
let ComplexBase = require('../fields/ccdComplexTypeBaseField.js');
const id = "#AddressComplex1_AddressComplex1";
class AddressHiddenComplex extends ComplexBase {

  constructor() {
    super(id);
    this.id = id;
    this.initialiseFields(this.id)
  }

  /**
   * Allows us to also re-initialise fields for a collection by parsing collection parent id here
   * @param id - id of the complex OR may be the id of the collection (of this complex)
   * @param collectionOrderIndex - position in the collection, for example if you are initialising the 2nd item in
   * a collection you would enter 2 as the collectionOrderIndex
   */
  initialiseFields(id,collectionOrderIndex) {
    //if this is part of a collection we want to prefix the key with the index ie 1.Complex.field
    let collectionPrefix = '';
    if (typeof collectionOrderIndex !== 'undefined'){
      collectionPrefix = `${collectionOrderIndex}.`
    }
    this.id = id;
    this.addLine1 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(1) input`, `${collectionPrefix}Address.AddressLine1AddressLine1`);
    this.addLine2 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(2) input`, `${collectionPrefix}Address.AddressLine1AddressLine2`);
    this.addLine3 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(3) input`, `${collectionPrefix}Address.AddressLine1AddressLine3`);
    this.addLine4 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) input`, `${collectionPrefix}Address.AddressLine1AddressLine4`);
    this.addLine5 = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(6) input`, `${collectionPrefix}Address.AddressLine1AddressLine5`);
    this.country = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(4) input`, `${collectionPrefix}Address.Country`);
  }

  async enterData(dataArray) {
    await this.enterAddressLine1(dataArray[0]);
    await this.enterAddressLine2(dataArray[1]);
    await this.enterAddressLine3(dataArray[3]);
    await this.enterCountry(dataArray[4]);
  }

  async getFieldData(){
    let addLine1Data = await this.addLine1.getFieldData();
    let addLine2Data = await this.addLine2.getFieldData();
    let addLine3Data = await this.addLine3.getFieldData();
    let addLine4Data = await this.addLine4.getFieldData();
    let addLine5Data = await this.addLine5.getFieldData();
    let countryData = await this.country.getFieldData();
    return Array.of(addLine1Data,addLine2Data,addLine3Data,countryData,addLine4Data,addLine5Data);
  }

  async enterAddressLine1(text) {
    await this.addLine1.enterText(text);
  }

  async enterAddressLine2(text) {
    await this.addLine2.enterText(text);
  }

  async enterAddressLine3(text) {
    await this.addLine3.enterText(text);
  }

  async enterAddressLine4(text) {
    await this.addLine4.enterText(text);
  }

  async enterAddressLine5(text) {
    await this.addLine5.enterText(text);
  }

  async enterCountry(text) {
    await this.country.enterText(text);
  }

}

module.exports = AddressHiddenComplex;
