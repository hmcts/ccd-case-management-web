let RandomUtils = require('../../utils/randomUtils.js');

class DateField{

  constructor(css){
    this.css = css;
    this.dayCss = `${css} #DateField-day`;
    this.monthCss = `${css} #DateField-month`;
    this.yearCss = `${css} #DateField-year`;

    this.label = this.getLabel();
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  async enterDate(){
    let day = RandomUtils.generateRandomInt(1,28);
    let month = RandomUtils.generateRandomInt(1,12);
    let year = RandomUtils.generateRandomInt(1950, 2000);
    await this.enterDate(day, month, year);
  }

  async enterDate(day, month, year){
      await $(this.dayCss).sendKeys(day);
      await $(this.monthCss).sendKeys(month);
      await $(this.yearCss).sendKeys(year);
      await this.setCheckYourAnswersValue(day, month, year)
  }

  async setCheckYourAnswersValue(day, month, year){
    if (month.startsWith('0')){
      month = await month.substring(1);
    }

    this.checkYourAnswersValue = `${day} ${MONTH[month].value} ${year}`;
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}


const MONTH = {
  1: {
    stringValue: 'January'
  },
  2: {
    stringValue: 'Febuary'
  },
  3: {
    stringValue: 'March'
  },
  4: {
    stringValue: 'April'
  },
  5: {
    stringValue: 'May'
  },
  6: {
    stringValue: 'June'
  },
  7: {
    stringValue: 'July'
  },
  8: {
    stringValue: 'August'
  },
  9: {
    stringValue: 'September'
  },
  10: {
    stringValue: 'October'
  },
  11: {
    stringValue: 'November'
  },
  12: {
    stringValue: 'December'
  }
};


module.exports = DateField;
