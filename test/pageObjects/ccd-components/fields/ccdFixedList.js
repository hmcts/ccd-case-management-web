let Dropdown = require('../../webdriver-components/dropdown.js');

/**
 * CCD Fixed List dropdown field component
 */
class CcdFixedList {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param id
   */
  constructor(css, id) {
    this.css = css;
    if (id) {
      this.fixedList = new Dropdown(`${this.css} #${id}`);
    } else {
      this.fixedList = new Dropdown(`${this.css} select`);
    }
    this.options = this.fixedList.getOptionElements();
    this.label = null;

    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  /**
   * Returns an options array
   * @returns array of options
   */
  async getOptions() {
    let optionValues = [];
    for(const field of await this.options){
      let value = await field.getAttribute('ng-reflect-value');
      optionValues.push(value);
    }
    return optionValues;
  }

  async selectOption(optionLabel) {
    if (typeof optionLabel === 'undefined') {
      await this.fixedList.selectAnOption()
    } else {
      await this.fixedList.selectFromDropdownByText(optionLabel);
    }
    this.checkYourAnswersValue = await this.fixedList.getCurrentSelectedOption();
    this.label = await this._getLabel();
  }

  async selectOptionByValue(value) {
    await this.fixedList.selectAnOption(value);
    this.checkYourAnswersValue = await this.fixedList.getCurrentSelectedOption();
    this.label = await this._getLabel();
  }

  /**
   * Check if field is present and enabled
   * @returns true or false
   */
  async isFieldReady(optionsTextValues) {
    let isPresent = await this.fixedList.isPresent(optionsTextValues);
    let isEnabled = await this.fixedList.isEnabled();
    return isPresent && isEnabled;
  }

  async isHidden() {
    return await this.fixedList.waitForElementToBeInvisible();
  }

  async isVisible() {
    return await this.fixedList.waitForElementToBeVisible();
  }

  /**
   * Check if label is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray) {
    let labelText = await this._getLabel();
    return labelText === labelArray[0];
  }

  async hasFieldLabel(label) {
    let labelText = await this._getLabel();
    return labelText.indexOf(label) !== -1;
  }

  async _getLabel() {
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = CcdFixedList;
