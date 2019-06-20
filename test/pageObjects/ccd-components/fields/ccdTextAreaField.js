let TextField = require('../../webdriver-components/textField.js');
let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

/**
 * CcdTextAreaField field component deals with interactions with the CCD Text Area Field component.
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class CcdTextAreaField{

  /**
   * Must take the parent css tag for the ccd field component
   * in the format ccd-write-text-area-field
   *
   * @param css
   */
  constructor(css){
    this.css = css;
    this.stringField = new TextField(`${this.css} textarea`);
    this.label = null;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  /**
   * Enter random text into the Text Area Field
   */
  async enterText(value) {
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomString() : value;
    await this.stringField.enterText(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null) {
      this.checkYourAnswersValue = value;
    }
    this.label = await this._getLabel();
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
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labelText = await this._getLabel();
    return labelText === labelArray[0];
  }


  /**
   * @returns Label name for the Text Area Field
   */
  async _getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

  async getValue(){
    return await this.stringField.getText();
  }

}

module.exports = CcdTextAreaField;
