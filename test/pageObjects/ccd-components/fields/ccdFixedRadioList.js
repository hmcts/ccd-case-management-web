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
    this.optionsDiv = $$(`#${id} .multiple-choice input`);;
  }

  /**
   * Returns an options array
   * @returns array of options
   */
  async getOptions() {
    let optionValues = [];
    for(const field of await this.optionsDiv){
      let value = await field.getAttribute('ng-reflect-value');
      optionValues.push(value);
    }
    return optionValues;
  }

}

module.exports = CcdFixedRadioList;
