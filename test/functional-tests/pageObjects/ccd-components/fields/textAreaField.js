class TextAreaField{

  constructor(css){
    this.css = css;
    this.label = this.getLabel();
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  async enterText(){
    let value = await Math.random().toString(36).substring(7);
    await $(`${this.css} textarea`).sendKeys(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = TextAreaField;
