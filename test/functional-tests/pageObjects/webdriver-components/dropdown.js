let CustomError = require('../../utils/errors/custom-error');
let RandomUtils = require('../../utils/randomUtils.js');

/**
 * Wrapper object to handle all interactions around dealing with a dropdown box. constructor takes locator in plain string
 */
class Dropdown {


  /**
   * Should be parsed ccs 'select' tag for a dropdown
   * @param css
   */
  constructor(css){
    this._dropdownElement = css;
    this._currentDropdownOptionElement = `${css} option:checked`;
  }

  //private
  async getOptionElements(){
     return await $$(`${this._dropdownElement} option`);
  }

  /**
   * Will randomly select any dropdown option
   */
  async selectAnyOption(){
    let options = await this.getOptionElements();
    let elementListSize = await options.length;
    let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
    let optionToSelect = await options[randomOptionArrayInt];
    await optionToSelect.click();

  }

  /**
   * Returns the value of the current option selected for a dropdown
   * @returns String
   */
  async getCurrentSelectedOption(){
    let text = await $(this._currentDropdownOptionElement).getText();
    return text.trim();
  }

  /**
   * Select a dropdown option by text value. Case insensitive
   * @param dropdownOption
   */
  async selectFromDropdownByText(dropdownOption){
      let optionToSelect;
      let found = false;

      let options = await this.getOptionElements();

      for (const option of options){
          const optionText = await option.getText();

          if (optionText.toLowerCase() === dropdownOption.toLowerCase()){
             optionToSelect = option;
             found = true;
             break;
          }
      }

      if (!found){
        throw new CustomError(`option '${dropdownOption}' not found in dropdown '${this._dropdownElement.toString()}'`)
      }

      await optionToSelect.click();

  }

}

module.exports = Dropdown;
