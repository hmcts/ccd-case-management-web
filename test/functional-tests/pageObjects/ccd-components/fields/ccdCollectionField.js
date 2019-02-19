class CcdCollectionField {

  constructor(css){
    this.css = css;
    this.label = this._getLabel();
    this.button = new Button('.button', 'Add new');
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldInputReady(){
    let isPresent = await this.button.isPresent();
    let isEnabled = await this.button.isEnabled();
    return isPresent && isEnabled;
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabel(label){
    let labelText = await this._getLabel();
    return labelText === label;
  }

  async _getLabel(){
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
  }

}

module.exports = CcdCollectionField;
