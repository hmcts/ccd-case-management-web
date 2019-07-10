/**
 * CCD Fixed Radio List field component
 */
class CcdDocumentField {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param id
   */
  constructor(css, key) {
    this.css = css;
    this.key = this.setKey(key);

    this.label = `${this.css} label`
  }


  setKey(key){
    if (typeof key === 'undefined') {
      return this.css.replace('#','');
    } else {
      return key;
    }
  }
  /**
   * Returns an options array
   * @returns array of options
   */
  async getLabel() {
    return await $(this.label).getText();
  }

  async hasFieldLabels(labelArray){
    let labelText = await this.getLabel();
    return labelText === labelArray[0];
  }

  async isFieldReady(){
    return await $(this.css).isDisplayed();
  }

}

module.exports = CcdDocumentField;
