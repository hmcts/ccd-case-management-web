let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

/**
 * This is a decoupled class from the dataType classes and should not have any specific methods or locators pointing
 * towards specific classes. It's purpose is to take an instance of a dataType class and initialise it in a list format
 * returning these objects to be used in Page Objects Classes
 *
 */
class CcdCollection {

  /**
   * @param id - id of the collection - MUST be id
   * @param dataTypeObject
   */
  constructor(id, dataTypeObject){
    this.id = id.includes('#') ? id : `#${id}`;
    this.dataTypeObject = dataTypeObject;

    this.addNewButton = new Button(`${this.id} > div > button`);
    this.removeButtons = `${id} .float-right button`;
    this.collectionItemsCount = `${this.id} .collection-title`

  }

  /**
   * Directly choose which item in the collection list to use then enter data into that field(s)
   * @param collectionItemInt - Item in collection eg 1st field/complex
   * @param data - data to enter into that field/complex type - requires data type class to have 'enterData' method
   * @returns {Promise<void>}
   */
  async enterData(collectionItemInt, data){
    //starts at zero index
    collectionItemInt = collectionItemInt -1;

    let currentCollectionId = `${this.id}_${collectionItemInt}_${collectionItemInt}`;
    await this.dataTypeObject.initialiseFields(currentCollectionId);
    await this.dataTypeObject.enterData(data)
  }

  /**
   * Select item in the collection (1st, 2nd, 3rd in collection list), intitalise that object and return it back to the
   * Page Object to be used and have it's functionas called
   * @param collectionItemInt
   * @returns {Promise<*>}
   */
  async getCollectionItem(collectionItemInt){
    //index in id starts from 0 so we -1 from the order position
    let currentCollectionId = `${this.id}_${collectionItemInt -1}_${collectionItemInt -1}`;
    await this.dataTypeObject.initialiseFields(currentCollectionId,collectionItemInt);
    return this.dataTypeObject;
  }

  /**
   * Click the 'Add New' button within this Collection
   * @returns {Promise<void>}
   */
  async clickAddNewButton(){
    await this.addNewButton.click();
  }

  /**
   * Remove a specific item in the collection
   * @param collectionItemInt - tem in collection (eg 1st field/complex) to remove
   * @returns {Promise<void>}
   */
  async clickRemoveButton(collectionItemInt){
    let button = await $$(this.removeButtons).get(collectionItemInt);
    await button.click();
  }

  async getItemsInCollection(){
    return await element.all(by.css(this.collectionItemsCount)).count();
  }

}

module.exports = CcdCollection;

