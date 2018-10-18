let CustomError = require('../../utils/errors/custom-error');

/**
 * Wrapper object to handle all interactions around dealing with a dropdown box. constructor takes locator in plain string
 */
class Dropdown {

  constructor(css){
    this._dropdownElement = css;
  }

  async selectFromDropdownByText(dropdownOption){
      let optionToSelect;
      let found = false;

      let options = await element.all(this._dropdownElement).all(by.css('option'));

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
