let CustomError = require('../../utils/errors/custom-error');
let RandomUtils = require('../../utils/randomUtils.js');

/**
 * Wrapper object to handle all interactions around dealing with a dropdown box. constructor takes locator in plain string
 */
class Dropdown {


  constructor(css){
    this._dropdownElement = css;
  }

  //private
  async getOptionElements(){
     return await element.all(this._dropdownElement).all(by.css('option'));
  }

  async selectAnyOption(){
    let options = await this.getOptionElements();
    let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await options.length);
    let optionToSelect = await options[randomOptionArrayInt];
    await optionToSelect.click();
  }

  async getCurrentSelectedOption(){
    let text = await element(this._dropdownElement).$('option:checked').getText();
    return text.trim();
  }

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
