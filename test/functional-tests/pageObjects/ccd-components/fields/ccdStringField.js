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
   *
   * @param css
   */
  constructor(css){
    this.stringField = new TextField(`${css} input`)
    this.css = css;
    this.label = null;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  /**
   * enter random text into a CCD Text Field
   */
  async enterText(text){
    let value = typeof text === 'undefined' ? await RandomUtils.generateRandomString() : text;
    await this.enterIntoField(value);
  }

  /**
   * enter random number between 1-100 into CCD Number Field
   */
  async enterNumber(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomInt(1,100) : value;
    await this.enterIntoField(value);
  }

  /**
   * enter random number between 1-100 into CCD Money GBP Field
   */
  async enterMoney(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomInt(1,100) : value;
    this.checkYourAnswersValue = `£${value}.00`;
    await this.enterIntoField(value);
    await $('h1').click(); //click out of focus to trigger any errors
  }

  /**
   * Enter random valid phone number into CCD Phone UK field
   */
  async enterPhoneNumber(value){
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomPhoneNumber() : value;
    this.checkYourAnswersValue = value;
    await this.enterIntoField(value);
  }

  /**
   * Enter random email into CCD Email field
   * @returns {Promise<void>}
   */
  async enterEmail(value){
    let firstpart = await RandomUtils.generateRandomString();
    let email = `${firstpart}@gmail.com`;

    value = typeof value === 'undefined' ? email : value;

    await this.enterIntoField(value)
  }

  async getFieldValue(){
    return await this.stringField.getText()
  }

  //private
  async enterIntoField(value){
    this.label = await this._getLabel();
    await this.stringField.clearField();
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
