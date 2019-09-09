let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
TextField = require('../../webdriver-components/textField.js');


/**
 * CCD date field component, encapsulated all interactions with the Date field
 */
class CcdDateField{

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   * @param key - unique identifier for this element. this key can be used as reference for this field
   * when querying the page fields' data via the 'page 'X' contains the following fields:' step. by default
   * it will take the css and strip an # and use the result as the key (works for parsing id as css eg #FieldID)
   * */
  constructor(css, key){
    this.css = css;
    this.key = this.setKey(key);

    this.dayCss = new TextField(`${css} .form-date > div:nth-of-type(1) input`);
    this.monthCss = new TextField(`${css} .form-date > div:nth-of-type(2) input`);
    this.yearCss = new TextField(`${css} .form-date > div:nth-of-type(3) input`);

    this.label = null;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  setKey(key){
    if (typeof key === 'undefined') {
      return this.css.replace('#','');
    } else {
      return key;
    }
  }


  async getFieldData(){
    let data = new Map();
    let field = 'field';
    let value = 'value';
    let hidden = 'hidden';

    let displayed = await $(this.css).isDisplayed();

    data.set(field, this.key);
    data.set(value, await this.getDate());
    data.set(hidden, !displayed);

    return data;
  }

  async enterDate(value){
    let day = null;
    let month = null;
    let year = null;

    if (typeof value === 'undefined') {
       day = await RandomUtils.generateRandomInt(1,28);
       month = await RandomUtils.generateRandomInt(1,12);
       year = await RandomUtils.generateRandomInt(1950, 2000);
    } else {
        day = value.slice(0,2);
        month = value.slice(2,4);
        year = value.slice(4,8);
    }

    await this._enterDateWithParams(day, month, year);
  }

  async getDate(){
    let day = await this.dayCss.getText();
    let month = await this.monthCss.getText();
    let year = await this.yearCss.getText();
    return day + month + year;
  }

   /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldReady(){
    return this._isDayFieldInputReady()
        && this._isMonthFieldInputReady()
        && this._isYearFieldInputReady();
  }



  async isVisible() {
    return await this.dayCss.isPresent() && await this.dayCss.isDisplayed();
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray){
    let labelTexts = await this._getLabels();

    return labelTexts.length === 4 &&
           labelTexts.includes(labelArray[0]) &&
           labelTexts.includes('Day') &&
           labelTexts.includes('Month') &&
           labelTexts.includes('Year');
  }

  async _enterDateWithParams(day, month, year){
    await this.dayCss.clearField();
    await this.dayCss.enterText(day);

    await this.monthCss.clearField();
    await this.monthCss.enterText(month);

    await this.yearCss.clearField();
    await this.yearCss.enterText(year);
    await this._setCheckYourAnswersValue(day, month, year)

    this.label = await this._getLabel();
  }

  async _setCheckYourAnswersValue(day, month, year){
    if (month.toString().startsWith('0')){
      month = await month.substring(1);
    }

    this.checkYourAnswersValue = `${day} ${MONTH[month]} ${year}`;
  }

  async _isDayFieldInputReady() {
    let isDatPresent = await this.dayCss.isPresent();
    let isDayDisplayed = await this.dayCss.isDisplayed();
    return isDatPresent && isDayDisplayed;
  }

  async _isMonthFieldInputReady() {
    let isMonthPresent = await this.monthCss.isPresent();
    let isMonthDisplayed = await this.monthCss.isDisplayed();
    return isMonthPresent && isMonthDisplayed;
  }

  async _isYearFieldInputReady() {
    let isYearPresent = await this.yearCss.isPresent();
    let isYearDisplayed = await this.yearCss.isDisplayed();
    return isYearPresent && isYearDisplayed;
  }

  async _getLabel(){
    return await $(`${this.css} legend`).getText();
  }

  async _getLabels(){
    return await $$(`${this.css} .form-label`).getText();
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

module.exports = CcdDateField;
