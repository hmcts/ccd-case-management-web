/**
 * CCD Fixed Radio List field component
 */
class CcdFixedRadioList {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
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

}

module.exports = CcdFixedRadioList;
