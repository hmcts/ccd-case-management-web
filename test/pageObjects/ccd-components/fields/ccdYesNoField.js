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
   * @param id
   */
  constructor(css, key ){
    this.css = css;
    this.key = this.setKey(key)

    this.yesRadio = new RadioField(`${this.css} fieldset > div > .multiple-choice:nth-of-type(1) input`);
    this.noRadio = new RadioField(`${this.css} fieldset > div > .multiple-choice:nth-of-type(2) input`);
    this.label = `${this.css} legend`;

    this.yesRadioSelectedCss = `${css} .form-group .selected #YesNoField-Yes`;
    this.noRadioSelectedCss = `${css} .form-group .selected #YesNoField-No`;
    this.label = null;

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
    data.set(value, await this.getDate());
    data.set(hidden, !displayed);

    return data;
  }

  /**
   * Select random radio button option
   * @returns {Promise<void>}
   */
  async selectOption(option){
    if(option && option === 'Yes') {
      await this.selectYes();
    } else if (option && option === 'No') {
      await this.selectNo();
    } else {
      let bool = RandomUtils.generateRandomBoolean();
      await (bool ? await this.selectYes() : await this.selectNo());
    }
    this.label = await this._getLabel();
  }

  async isHidden() {
    return await this.yesRadio.waitForElementToBeInvisible();
  }

  async isVisible() {
    return await this.yesRadio.waitForElementToBeVisible();
  }

  async getCurrentOption(){
    let option = 'undefined';
    try {
      if (await $(this.yesRadioSelectedCss).isDisplayed()) {
        option = 'yes';
      }
    } catch (e) {
      //do nothing
    }

    try {
      if (await $(this.noRadioSelectedCss).isDisplayed()) {
        option = 'no';
      }
    } catch (e) {
      //do nothing
    }

    return option;

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
    await this.noRadio.click();
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

  async hasFieldLabel(labelMatch) {
    let label = await element(By.xpath(`${this.labelXPath}`)).getText();
    return label.indexOf(labelMatch) !== -1;
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
