let TextField = require('../../webdriver-components/textField.js');
let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

/**
 * CcdTextAreaField field component deals with interactions with the CCD Text Area Field component.
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class CcdTextAreaField{

  /**
   * @param css
   * @param key - unique identifier for this element. this key can be used as reference for this field
   * when querying the page fields' data via the 'page 'X' contains the following fields:' step. by default
   * it will take the css and strip an # and use the result as the key (works for parsing id as css eg #FieldID)
   */
  constructor(css, key){
    this.css = css;
    this.key = this.setKey(key);
    this.stringField = new TextField(`${this.css} textarea`);
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


  async getFieldData(){
    let data = new Map();
    let field = 'field';
    let value = 'value';
    let hidden = 'hidden';

    let displayed = await $(this.css).isDisplayed();

    data.set(field, this.key);
    data.set(value, await this.getValue());
    data.set(hidden, !displayed);

    return data;
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
