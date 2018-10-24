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
  async enterText(){
    let value = await RandomUtils.generateRandomString();
    await this.enterIntoField(value);
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

  //private
  async enterIntoField(value){
    this.label = await this.getLabel();
    await this.stringField.enterText(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  //private
  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = CDDStringField;
