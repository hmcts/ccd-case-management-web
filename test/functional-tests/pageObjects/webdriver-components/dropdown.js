let CustomError = require('../../utils/errors/custom-error');
let RandomUtils = require('../../utils/ccdDataGenerationUtils.js');

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
  async _getOptionElements(){
    return await $$(`${this._dropdownElement} option`);
  }

  /**
   * Get list of string dropdown options
   * @returns String Array
   */
  async getOptionsTextValues(){
    let dropdownElements = await this._getOptionElements();
    let stringArray = [];
    for (const option of dropdownElements){
      const optionText = await option.getText();
      stringArray.push(optionText);
    }
    return stringArray
  }

  /**
   * Will randomly select any dropdown option
   */
  async selectAnyOption(){
    let options = await this._getOptionElements();
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
  async _selectFromDropdownByText(dropdownOption){
      let optionToSelect;
      let found = false;

      let options = await this._getOptionElements();

      for (const option of options){
          const optionText = await option.getText();

          if (optionText.toLowerCase() === dropdownOption.toLowerCase()){
             optionToSelect = option;
             found = true;
             break;
          }
      }

      if (!found){
        let message = `option '${dropdownOption}' not found in dropdown '${this._dropdownElement.toString()}'. Available options: ${options}`
        throw new CustomError(message)
      }

      await optionToSelect.click();

  }

  /**
   * Select a dropdown option by text value. Retry 2 more times if fails.
   * @param dropdownOption
   */
  async selectFromDropdownByText(dropdownOption){

    let fail = true;
    let failmessage = null;

    for (let i = 0; i < 3; i++){
      try {
        await this._selectFromDropdownByText(dropdownOption)
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i + 1}/3 failed, Retry after 1 second wait`);
        browser.wait(1000)
      }
    }

    if (fail){
      throw new CustomError(failmessage, 'failed 3 retry attempts')
    }

  }

}

module.exports = Dropdown;
