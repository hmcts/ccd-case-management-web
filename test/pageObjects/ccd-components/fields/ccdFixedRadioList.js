/**
 * CCD Fixed Radio List field component
 */
class CcdFixedRadioList {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param id
   */
  constructor(css) {
    this.optionsDiv = $$(`${css} .multiple-choice label`);
  }

  /**
   * Returns an options array
   * @returns array of options
   */
  async getOptions() {
    let optionValues = [];
    for(const field of await this.optionsDiv){
      let value = await field.getText();
      optionValues.push(value);
    }
    return optionValues;
  }

  /**
   * Will randomly select any multi select option or a specified option value
   */
  async selectOption(optionValue) {

    if (typeof optionValue === 'undefined') {
      let radioElements = await this._getRadioElements();
      let elementListSize = await radioElements.length;
      let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
      let optionToSelect = await radioElements[randomOptionArrayInt - 1];
      await optionToSelect.click();
    } else {
      let optionToSelect = await this._getRadioOption(optionValue);
      optionToSelect.click();
    }
  }

  //private
  async _getRadioElements(){
    return await $$(`${this.css} input`);
  }

  async _getRadioOption(optionValue) {
    let radioElements = await this._getRadioElements();
    for (const elem of radioElements) {
      const elemText = await elem.getAttribute("id");
      if (elemText.includes(optionValue)) {
        return elem;
      }
    }
  }

}

module.exports = CcdFixedRadioList;
