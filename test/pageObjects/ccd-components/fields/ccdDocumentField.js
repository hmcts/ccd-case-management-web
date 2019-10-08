/**
 * CCD Document field component
 */
class CcdDocumentField {

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param key - unique identifier for this element. this key can be used as reference for this field
   * when querying the page fields' data via the 'page 'X' contains the following fields:' step. by default
   * it will take the css and strip an # and use the result as the key (works for parsing id as css eg #FieldID)
   * */
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
   * @returns label of the document field
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

  async uploadFile(value) {
    let docField = await $(`${this.css} input`);
    await docField.sendKeys(value);
  }
}

module.exports = CcdDocumentField;
