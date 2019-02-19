let CCDCheckBoxField = require('../../webdriver-components/checkBox.js');

class CcdMultiSelectField {

  constructor(css, fields){
      this.css = css;
      this.checkboxes = [];
      for(var i = fields.length; i--;) {
        this.checkboxes.push(new CCDCheckBoxField(this.css, fields[i]));
      }
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldInputReady(){
    for(var i = this.checkboxes.length; i--;) {
      let field = this.checkboxes[i];
      let isPresent = await field.isPresent();
      let isEnabled = await field.isEnabled();
      if (!isPresent || !isEnabled) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labels = await this._getLabels();

    if (labelArray.length !== labels.length) {
      return false;
    }
    for(var i = labelArray.length; i--;) {
        if(!labels.includes(labelArray[i]))
            return false;
    }
    return true;
  }

  async _getLabels(){
    let labelsTexts = [];
    let labels = $$(`${this.css} .form-label`);

    return await labels.each(function(label){
        return label.getText().then(function(text){
          labelsTexts.push(text);
        });

    }).then(function(){
        return labelsTexts;
    });
  }

}

module.exports = CcdMultiSelectField;
