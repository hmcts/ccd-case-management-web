RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
TextField = require('../../webdriver-components/textField.js');

/**
 * CCD String field component, represents different data type text fields in the CCS app that us a single text box that
 * takes a string. Includes following fields: Text, Number, Money, Phone number, Email
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class CCDStringField {

  /**
   * @param css - css of the input field
   * @param key - unique identifier for this element. this key can be used as reference for this field
   * when querying the page fields' data via the 'page 'X' contains the following fields:' step. by default
   * it will take the css and strip an # and use the result as the key (works for parsing id as css eg #FieldID)
   * */
  constructor(css, key){
    // this.component = 'ccd-write-text-field';
    this.css = css;
    this.stringField = new TextField(css);
    this.key = this.setKey(key);
    this.label = null;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  setKey(key){
    if (typeof key === 'undefined') {
      return this.css.replace('#','');
    } else {
      return key;
    }
  }

  async getFieldData(key){
    let data = new Map();
    let field = 'field';
    let value = 'value';
    let hidden = 'hidden';

    let displayed = await this.stringField.isDisplayed();

    key = key ? key : this.key;

    data.set(field, key);
    data.set(value, await this.getFieldValue());
    data.set(hidden, !displayed);

    return data;
  }

  /**
   * enter given or random text into a CCD Text Field
   */
  async enterText(text){
    let value = typeof text === 'undefined' ? await RandomUtils.generateRandomString() : text;
    await this._enterIntoField(value);
  }

  /**
   * enter random number between 1-100 into CCD Number Field
   */
  async enterNumber(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomInt(1,100) : value;
    await this._enterIntoField(value);
  }

  /**
   * enter random number between 1-100 into CCD Money GBP Field
   */
  async enterMoney(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomInt(1,100) : value;
    this.checkYourAnswersValue = `£${value}.00`;
    await this._enterIntoField(value);
    await $('#global-header').click(); //click out of focus to trigger any errors
  }

  /**
   * Enter random valid phone number into CCD Phone UK field
   */
  async enterPhoneNumber(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomPhoneNumber() : value;
    this.checkYourAnswersValue = value;
    await this._enterIntoField(value);
  }

  /**
   * Enter random email into CCD Email field
   * @returns {Promise<void>}
   */
  async enterEmail(value){
    let firstpart = await RandomUtils.generateRandomString();
    let email = `${firstpart}@gmail.com`;

    value = typeof value === 'undefined' ? email : value;

    await this._enterIntoField(value)
  }

  async isVisible() {
    return await this.stringField.isPresent() && await this.stringField.isDisplayed();
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldReady(){
    let isPresent = await this.stringField.isPresent();
    let isDisplayed = await this.stringField.isDisplayed();
    return isPresent && isDisplayed;
  }

  /**
   * Check if field has given labels
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labelText = await this.getLabel();
    return labelText === labelArray[0];
  }

  /**
   * Check if field has given label
   * @returns true or false
   */
  async hasFieldLabel(label) {
    let labelText = await this.getLabel();
    return labelText.indexOf(label) !== -1;
  }

  async getFieldValue(){
    return await this.stringField.getText()
  }

  async _enterIntoField(value){
    this.label = await this.getLabel();
    await this.stringField.clearField();
    await this.stringField.enterText(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  async getLabel(){
    let id = await $(this.css).getAttribute('id');
    let label = await $('label[for=' + id + ']').getText();
    return label;
  }


}

module.exports = CCDStringField;
