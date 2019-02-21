
let Dropdown = require('../../webdriver-components/dropdown.js');

/**
 * CCD Fixed List dropdown field component
 */
class CcdFixedList {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   */
    constructor(css){
        this.css = css;
        this.fixedList = new Dropdown(`${this.css} select`);
        this.label = null;

        this.inputValue = null;
        this.checkYourAnswersValue = null;
    }

    async selectOption(){
        await this.fixedList.selectAnyOption();
        this.checkYourAnswersValue = await this.fixedList.getCurrentSelectedOption();
        this.label = await this._getLabel();
    }

      /**
     * Check if field is ready to type
     * @returns true or false
     */
    async isFieldReady(optionsTextValues){
        let isPresent = await this.fixedList.isPresent(optionsTextValues);
        let isEnabled = await this.fixedList.isEnabled();
        return isPresent && isEnabled;
    }

    /**
     * Check if label is present
     * @returns true or false
     */
    async hasFieldLabels(labelArray){
        let labelText = await this._getLabel();
        return labelText === labelArray[0];
    }

    async _getLabel(){
      return await $(`${this.css} .form-label`).getText();
    }

}

module.exports = CcdFixedList;
