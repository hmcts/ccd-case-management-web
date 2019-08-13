let AddressComplex = require('../../ccd-components/complexTypes/addressHiddenComplex.js')
let Collection = require('../../ccd-components/fields/ccdCollection.js');

class ConditionalsCreateCasePage4WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.addressComplex = new AddressComplex();
    this.collectionOfAddressComplex = new Collection('#CollectionComplexField',this.addressComplex);
  }

  async getFieldData(){
    let pageData = [];
    let itemsInCollection = await this.collectionOfAddressComplex.getItemsInCollection();

    for (let i = 1; i < itemsInCollection + 1; i++) {
      let collectionItemObject = await this.collectionOfAddressComplex.getCollectionItem(i);
      let collectionItemData = await collectionItemObject.getFieldData();
      pageData.push(collectionItemData);
    }
    return pageData;
  }

  async clickAddNewButton(){
    await this.collectionOfAddressComplex.clickAddNewButton();
  }

  /**
   * Choose a collection index and return an object of the complex type for that index
   * @param complexItemInt - order in the collection
   * @returns {Promise<>} ccdAddressUKField object
   */
  async getCollectionOfAddressComplex(complexItemInt){
    return await this.collectionOfAddressComplex.getCollectionItem(complexItemInt);
  }







}

module.exports = ConditionalsCreateCasePage4WizardPage;
