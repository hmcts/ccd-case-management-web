let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');

class CcdComplexTypeField {

  constructor(css){
    this.css = css;
    this.label = this._getLabel();
    this.inputValue = null;
    this.checkYourAnswersValue = null;
    this.textFieldList = `${this.css} ccd-field-write`;
    this.checkYourAnswersValue = '';

  }

  async _getLabel(){
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
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

