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
  async enterText(){
    let value = await RandomUtils.generateRandomString();
    await this.stringField.enterText(value)
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    this.label = await this.getLabel();
  }

  /**
   * @returns Label name for the Text Area Field
   */
  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = CcdTextAreaField;
