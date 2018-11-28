let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

class CcdCollectionField {

  constructor(css){
      this.css = css;
      this.label = this._getLabel();
      this.addNewButtonCss = `${this.css} > div > div >button:nth-of-type(1)`;
      this.lastTextField = `${this.css} > div > div > div > div:last-of-type input`;
      this.inputValue = null;
      this.checkYourAnswersValue = '';

  }

  async _getLabel(){
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
  }

  /**
   * Add n random bits of data into a collection of Text fields
   * @returns {Promise<void>}
   */
  async enterTextData(n){
    let dataArray = [];
    for (let i=0; i < n; i++) {
      let data = await RandomUtils.generateRandomString();
      await $(this.addNewButtonCss).click();
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

