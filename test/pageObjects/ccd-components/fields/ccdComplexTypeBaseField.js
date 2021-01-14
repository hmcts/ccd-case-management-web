let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

class CcdComplexTypeBaseField {

  constructor(css){
      this.css = css;
      this.stringFields = [];
      this.inputValue = null;
      // this.label = this._getMainLabel(); todo refactor this and find failing test if this is commented out
      this.label = null;
      // this.nestedLabels = this._getNestedLabels();
      this.nestedLabels = null;
      this.textFieldList = `${this.css} ccd-field-write`;
      this.checkYourAnswersValue = null;
      this.checkYourAnswersValue = '';
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldReady(){
    let fields = $$(this.textFieldList);
    for(const field of await fields){
      let inputField = await field.$('input');
      let isPresent = await inputField.isPresent();
      let isDisplayed = await inputField.isDisplayed();
      if ( !isPresent || !isDisplayed) {
        return false
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
    return await $(`${this.css} h2:nth-of-type(1)`).getText();
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

  /**
   * @deprecated
   * @returns {Promise<void>}
   */
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

module.exports = CcdComplexTypeBaseField;
