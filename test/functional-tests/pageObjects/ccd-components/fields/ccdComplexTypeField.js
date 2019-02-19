let CCDStringField = require('./ccdStringField.js');

class CcdComplexTypeField {

  constructor(css, type, selectors){
      this.css = css;
      this.stringFields = [];
      for(var i = selectors.length; i--;) {
        this.stringFields.push(new CCDStringField(this.css, type, selectors[i]));
      }
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldInputReady(){
    for(var i = this.stringFields.length; i--;) {
      let field = this.stringFields[i];
      if (!field.isFieldInputReady()) {
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
    let mainLabel = await this._getMainLabel();
    let nestedLabels = await this._getNestedLabels();
    let allLabels = [mainLabel].concat(nestedLabels);

    if (labelArray.length !== allLabels.length) {
      return false;
    }
    for(var i = labelArray.length; i--;) {
        if(!allLabels.includes(labelArray[i]))
            return false;
    }
    return true;
  }

  async _getMainLabel(){
    return await $(`${this.css} .heading-small`).getText();
  }

  async _getNestedLabels(){
    let nestedLabelsTexts = [];
    let nestedLabels = $$(`${this.css} .form-label`);

    return await nestedLabels.each(function(label){
        return label.getText().then(function(text){
          nestedLabelsTexts.push(text);
        });

    }).then(function(){
        return nestedLabelsTexts;
    });
  }

}

module.exports = CcdComplexTypeField;
