let RandomUtils = require('../../../utils/randomUtils.js');

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
    let day = await RandomUtils.generateRandomInt(1,28);
    let month = await RandomUtils.generateRandomInt(1,12);
    let year = await RandomUtils.generateRandomInt(1950, 2000);
    await this.enterDateWithParams(day, month, year);
  }

  async enterDateWithParams(day, month, year){
      await $(this.dayCss).sendKeys(day);
      await $(this.monthCss).sendKeys(month);
      await $(this.yearCss).sendKeys(year);
      await this.setCheckYourAnswersValue(day, month, year)
  }

  async setCheckYourAnswersValue(day, month, year){
    if (month.toString().startsWith('0')){
      month = await month.substring(1);
    }

    this.checkYourAnswersValue = `${day} ${MONTH[month]} ${year}`;
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

const MONTH = Object.freeze({
  1:  'Jan',
  2:  'Feb',
  3:  'Mar',
  4:  'Apr',
  5:  'May',
  6:  'Jun',
  7:  'Jul',
  8:  'Aug',
  9:  'Sep',
  10:  'Oct',
  11:  'Nov',
  12:  'Dec'
});

module.exports = DateField;
