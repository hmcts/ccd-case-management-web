let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
let Button = require('../../webdriver-components/button.js');
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
    this.collectionItemsCount = `${this.id} > div > div > div`;
  }

  /**
   * Select item in the collection (1st, 2nd, 3rd in collection list), intitalise that object and return it back to the
   * Page Object to be used and have it's functionas called
   * @param collectionItemInt - position in the collection, for example if you are initialising the 2nd item in
   * a collection you would enter 2 as the collectionOrderIndex
   * @returns {Promise<*>}
   */
  async getCollectionItem(collectionItemInt){
    //index in id starts from 0 so we -1 from the order position
    let currentCollectionId = await `${this.id}_${collectionItemInt -1}_${collectionItemInt -1}`;
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
   * @param collectionItemInt - item in collection (eg 1st field/complex) to remove
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

