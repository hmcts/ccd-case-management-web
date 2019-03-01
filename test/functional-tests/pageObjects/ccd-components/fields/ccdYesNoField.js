let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
let RadioField = require('../../webdriver-components/radioField.js');

/**
 * Yes-No  field component deals with interactions with the CCD Yes No Field component - Yes/No radio button options.
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class CcdYesNoField {

  /**
   * Must take the parent css tag for the ccd field component
   * in the format  ccd-write-yes-no-field
   *
   * @param css
   */
  constructor(css){
    this.css = css;
    this.yesRadio = new RadioField(`${css} .form-group #YesNoField-Yes`);
    this.noRadio = new RadioField(`${css} .form-group #YesNoField-No`);
    this.label = null;

    this.checkYourAnswersValue = null;
  }

  /**
   * Select random radio button option
   * @returns {Promise<void>}
   */
  async selectOption(){
      let bool = RandomUtils.generateRandomBoolean();
      await (bool ? await this.selectYes() : await this.selectNo());
      this.label = await this._getLabel();
  }

  /**
   * Select 'Yes' radio button option
   */
  async selectYes(){
      await this.yesRadio.click();
      this.checkYourAnswersValue = 'Yes';
  }

  /**
   * Select 'No' radio button option
   */
  async selectNo(){
      await this.noRadio().click();
      this.checkYourAnswersValue = 'No';
  }

  /**
   * Check if field is present and enabled
   * @returns true or false
   */
  async isFieldReady(){
    return this._isYesRadioReady() && this._isNoRadioReady();
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labelTexts = await this._getLabels();
    return labelTexts.length === 3 &&
        labelTexts.includes(labelArray[0]) &&
        labelTexts.includes('Yes') &&
        labelTexts.includes('No');
  }

  async _isYesRadioReady() {
    let isPresent = await this.yesRadio.isPresent();
    let isEnabled = await this.yesRadio.isEnabled();
    return isPresent && isEnabled;
  }

  async _isNoRadioReady() {
    let isPresent = await this.noRadio.isPresent();
    let isEnabled = await this.noRadio.isEnabled();
    return isPresent && isEnabled;
  }

  async _getLabel(){
      return await $(`${this.css} .form-label`).getText();
  }

  async _getLabels(){
      return await $$(`${this.css} .form-label`).getText();
  }

}

module.exports = CcdYesNoField;
