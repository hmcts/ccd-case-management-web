let RandomUtils = require('../../../utils/randomUtils.js');

/**
 * TextAreaField field component deals with interactions with the CCD Yes No Field component.
 *
 * returning this object will give access to the expected 'show your answers' page answer for the specified field
 */
class YesNoField {

  /**
   * Must take the parent css tag for the ccd field component
   * in the format  ccd-write-yes-no-field
   *
   * @param css
   */
  constructor(css){
    this.css = css;
    this.yesCss = `${css} .form-group > div:nth-of-type(1) input`;
    this.noCss = `${css} .form-group > div:nth-of-type(2) input`;
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
      this.label = await this.getLabel();
  }

  /**
   * Select 'Yes' radio button option
   */
  async selectYes(){
      await $(this.yesCss).click();
      this.checkYourAnswersValue = 'Yes';
  }

  /**
   * Select 'No' radio button option
   */
  async selectNo(){
      await $(this.noCss).click();
      this.checkYourAnswersValue = 'No';
  }

  /**
   * @returns Label name for the Text Area Field
   */
  async getLabel(){
      return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = YesNoField;
