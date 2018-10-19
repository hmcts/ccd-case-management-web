let RandomUtils = require('../../../utils/randomUtils.js');

class YesNoField {

  constructor(css){
    this.css = css;
    this.yesCss = `${css} .form-group > div:nth-of-type(1) input`;
    this.noCss = `${css} .form-group > div:nth-of-type(2) input`;
    this.label = this.getLabel();

    this.checkYourAnswersValue = null;

  }

  async selectOption(){
      let bool = RandomUtils.generateRandomBoolean();
      return await (bool ? await this.selectYes() : await this.selectNo());
  }

  async selectYes(){
      await $(this.yesCss).click();
      this.checkYourAnswersValue = 'Yes';
  }

  async selectNo(){
      await $(this.noCss).click();
      this.checkYourAnswersValue = 'No';
  }

  async getLabel(){
      return await $(`${this.css} .form-label`).getText();
  }


}

module.exports = YesNoField;
