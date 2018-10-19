TextField = require('../../webdriver-components/textField.js');
RandomUtils = require('../../../utils/randomUtils.js');


class CcdStringField extends TextField{

  constructor(css){
    super();
    this.css = css;
      this.label = this.getLabel();
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  async enterText(){
    let value = await RandomUtils.generateRandomString();
    await this.enterIntoField(value);
  }

  async enterNumber(){
    let value = await RandomUtils.generateRandomInt(1,100);
    await this.enterIntoField(value);
  }

  //private
  async enterIntoField(value){
    await $(`${this.css} input`).sendKeys(value);
    this.inputValue = value;
    if (this.checkYourAnswersValue === null){
      this.checkYourAnswersValue = value;
    }
    return value;
  }

  async enterMoney(){
    let value = await RandomUtils.generateRandomInt(1,100);
    this.checkYourAnswersValue = `£${value}.00`;
    await this.enterIntoField(value);
  }

  async enterPhoneNumber(){
    let value = await RandomUtils.generateRandomPhoneNumber();
    this.checkYourAnswersValue = value;
    await this.enterIntoField(value);
  }

  async enterEmail(){
    let firstpart = await RandomUtils.generateRandomString();
    let email = `${firstpart}@gmail.com`;
    await this.enterIntoField(email)
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

module.exports = CcdStringField;
