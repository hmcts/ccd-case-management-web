let CCDStringField = require('./ccdStringField.js');
let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

class CcdComplexTypeField {

  constructor(css, type, selectors){
      this.css = css;
      this.stringFields = [];
      for(var i = selectors.length; i--;) {
        this.stringFields.push(new CCDStringField(this.css, type, selectors[i]));
      }
      this.inputValue = null;
      this.mainLabel = this._getMainLabel();
      this.nestedLabels = this._getNestedLabels();
      this.checkYourAnswersValue = null;
      this.textFieldList = `${this.css} ccd-field-write`;
      this.checkYourAnswersValue = '';
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
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
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
    
  async enterComplexTextData(){
    let fields = $$(this.textFieldList);
    let index = 1;

    for(const field of await fields){
        let data = '';

        let text = await RandomUtils.generateRandomString();
        await field.$('input').sendKeys(text);

        let label = await field.$('label').getText();

        data += await label.replace(' (Optional)','') + '\n' + text;
        if(index !== await fields.count()){
          data += '\n'
        }

        this.checkYourAnswersValue += data

        index += 1;
    }
  }
}

module.exports = CcdComplexTypeField;
