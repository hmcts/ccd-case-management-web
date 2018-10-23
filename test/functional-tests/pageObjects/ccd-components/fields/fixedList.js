
let Dropdown = require('../../webdriver-components/dropdown.js');

/**
 * CCD Fixed List dropdown field component
 */
class FixedList {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   */
    constructor(css){
        this.css = css;
        this.fixedList = new Dropdown(`${this.css} select`);
        this.label = this.getLabel();

        this.inputValue = null;
        this.checkYourAnswersValue = null;
    }

    async selectOption(){
        await this.fixedList.selectAnyOption();
        this.checkYourAnswersValue = await this.fixedList.getCurrentSelectedOption();
    }

    async getLabel(){
      return await $(`${this.css} .form-label`).getText();
    }

}

module.exports = FixedList;
