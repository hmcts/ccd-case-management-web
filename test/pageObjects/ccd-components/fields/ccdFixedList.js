
let Dropdown = require('../../webdriver-components/dropdown.js');

/**
 * CCD Fixed List dropdown field component
 */
class CcdFixedList extends Dropdown{

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param id
   */
  constructor(css, key) {
    super(css);
    this.css = css;
    this.key = this.setKey(key);
    this.fixedList = new Dropdown(this.css);
    this.options = this.fixedList.getOptionElements();
    this.label = null;

    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  setKey(key){
    if (typeof key === 'undefined') {
      return this.css.replace('#','');
    } else {
      return key;
    }
  }

  async getFieldData(key){
    let data = new Map();
    let field = 'field';
    let value = 'value';
    let hidden = 'hidden';

    key = key ? key : this.key;

    let displayed = await $(this.css).isDisplayed();

    data.set(field, key);
    data.set(value, await this.getCurrentOption());
    data.set(hidden, !displayed);

    return data;
  }

  /**
   * Returns an options array
   * @returns array of options
   */
  async getOptions() {
    return await this.fixedList.getOptionsTextValues()
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

    async getCurrentOption(){
      try {
        await this.fixedList.getCurrentSelectedOption()
      } catch (e) {
        console.log('no option selected on dropdown')
        return 'undefined'
      }
    }


   /**
     * Check if field is present and enabled
     * @returns true or false
     */
    async isFieldReady(optionsTextValues){
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

  async _getLabel(){
    let id = await $(this.css).getAttribute('id');
    let label = await $('label[for=' + id + ']').getText();
    return label;
  }

}

module.exports = CcdFixedList;
