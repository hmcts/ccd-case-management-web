class TextField{

  constructor(css){
    this.css = css;
      this.label = this.getLabel();
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  async enterText(){
    let value = await Math.random().toString(36).substring(7);
    await this.enterIntoField(value);
  }

  async enterNumber(){
    let value = await Math.floor((Math.random() * 100) + 1);
    await this.enterIntoField(value);
  }

  async enterIntoField(value){
    await $(`${this.css} input`).sendKeys(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  async enterMoney(){
    let value = await Math.floor((Math.random() * 100) + 1);
    this.checkYourAnswersValue = `£${value}.00`;
    await this.enterIntoField(value);
  }

  async enterEmail(){
    let firstpart = await Math.random().toString(36).substring(7);
    let email = `${firstpart}@gmail.com`;
    await this.enterIntoField(email)
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = TextField;
