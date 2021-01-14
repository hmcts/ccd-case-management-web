let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

/**
 * @deprecated - use ccdCollection.js
 */
class CcdCollectionField {

  constructor(css){
    this.css = css;
    this.label = this._getLabel();
    this.button = new Button('.button', 'Add new');
    this.lastTextField = `${this.css} > div > div > div > div:last-of-type input`;
    this.inputValue = null;
    this.checkYourAnswersValue = '';
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldReady(){
    let isPresent = await this.button.isPresent();
    let isEnabled = await this.button.isEnabled();
    return isPresent && isEnabled;
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labelText = await this._getLabel();
    return labelText === labelArray[0];
  }

  async _getLabel(){
    return await $(`${this.css} h2:nth-of-type(1)`).getText();
  }

  /**
   * Add n random bits of data into a collection of Text fields
   * @returns {Promise<void>}
   */
  async enterTextData(n){
    let dataArray = [];
    for (let i=0; i < n; i++) {
      let data = await RandomUtils.generateRandomString();
      await this.button.click();
      await $(this.lastTextField).sendKeys(data);

      dataArray.push(data);
      this.checkYourAnswersValue += data;

      if (i !== n-1){
        //don't want a new line at the very end
        this.checkYourAnswersValue += '\n'
      }

    }

    this.inputValue = dataArray

  }

}

module.exports = CcdCollectionField;

