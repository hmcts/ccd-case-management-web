RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
TextField = require('../../webdriver-components/textField.js');

/**
 * CCD String field component, represents different data type text fields in the CCS app that us a single text box that
 * takes a string. Includes following fields: Text, Number, Money, Phone number, Email
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class CDDStringField {

  /**
   * Must take the parent css tag for the ccd field component
   * in the format ccd-write-XXXX-field
   * Selector farther narrows down the location
   * @param css
   * @param selector
   */
  constructor(css, type, selector){
    if (selector) {
      this.stringField = new TextField(`${css} ${selector}`);
    } else {
      this.stringField = new TextField(`${css} input`);
    }
    this.css = css;
    this.label = null;
    this.type = type;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  /**
   * enter random text into a CCD Text Field
   */
  async enterText(value){
    await this.enterIntoField(value ? value : await RandomUtils.generateRandomString());
  }

  /**
   * enter random number between 1-100 into CCD Number Field
   */
  async enterNumber(){
    let value = await RandomUtils.generateRandomInt(1,100);
    await this.enterIntoField(value);
  }

  /**
   * enter random number between 1-100 into CCD Money GBP Field
   */
  async enterMoney(){
    let value = await RandomUtils.generateRandomInt(1,100);
    this.checkYourAnswersValue = `£${value}.00`;
    await this.enterIntoField(value);
  }

  /**
   * Enter random valid phone number into CCD Phone UK field
   */
  async enterPhoneNumber(){
    let value = await RandomUtils.generateRandomPhoneNumber();
    this.checkYourAnswersValue = value;
    await this.enterIntoField(value);
  }

  /**
   * Enter random email into CCD Email field
   * @returns {Promise<void>}
   */
  async enterEmail(){
    let firstpart = await RandomUtils.generateRandomString();
    let email = `${firstpart}@gmail.com`;
    await this.enterIntoField(email)
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldInputReady(){
    let isCorrectType = await this.stringField.isType(this.type);
    let isPresent = await this.stringField.isPresent();
    let isDisplayed = await this.stringField.isDisplayed();
    return isCorrectType && isPresent && isDisplayed;
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabel(label){
    let labelText = await this._getLabel();
    return labelText === label;
  }

  //private
  async enterIntoField(value){
    this.label = await this._getLabel();
    await this.stringField.enterText(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  //private
  async _getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = CDDStringField;
