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
  constructor(css, id) {
    this.css = css;
    this.optionsDiv = $$(`#${id} .multiple-choice label`);
    this.optionsRadioIds = $$(`#${id} .multiple-choice input`);
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

  async selectRandomOption() {
    let radioInputOptions = await this.optionsRadioIds;
    let elementListSize = await radioInputOptions.length;
    let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
    let optionToSelect = await radioInputOptions[randomOptionArrayInt-1];
    await optionToSelect.click();
  }
}

module.exports = CcdFixedRadioList;
