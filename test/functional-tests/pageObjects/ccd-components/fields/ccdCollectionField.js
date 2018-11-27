let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

class CcdCollectionField {

  constructor(css){
      this.css = css;
      this.label = this.getLabel();
      this.addNewButtonCss = `${this.css} > div > div >button:nth-of-type(1)`;
      this.lastTextField = `${this.css} > div > div > div > div:last-of-type input`;
      this.inputValue = null;
      this.checkYourAnswersValue = null;

  }

  async getLabel(){
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
  }

  /**
   * Add 3 random bits of data into a collection of Text fields
   * @returns {Promise<void>}
   */
  async enterTextData(){
    let data = [];
    let data1 = await RandomUtils.generateRandomString();
    await $(this.addNewButtonCss).click();
    await $(this.lastTextField).sendKeys(data1);

    let data2 = await RandomUtils.generateRandomString();
    await $(this.addNewButtonCss).click();
    await $(this.lastTextField).sendKeys(data2);

    let data3 = await RandomUtils.generateRandomString();
    await $(this.addNewButtonCss).click();
    await $(this.lastTextField).sendKeys(data3);

    this.checkYourAnswersValue = await `${data1}\n${data2}\n${data3}`;
    this.inputValue = data.push(data1, data2, data3);

  }
}

module.exports = CcdCollectionField;

