
let Dropdown = require('../../webdriver-components/dropdown.js');

class FixedList {

    constructor(css){
        this.css = css;
        this.fixedList = new Dropdown(by.css(`${this.css} select`));
        this.label = this.getLabel();

        this.inputValue = null;
        this.checkYourAnswersValue = null;
    }

    async selectOption(){
        await this.fixedList.selectAnyOption();
        this.checkYourAnswersValue = await this.fixedList.getCurrentSelectedOption();
    }

    //select option with params

    async getLabel(){
      return await $(`${this.css} .form-label`).getText();
    }

}

module.exports = FixedList;
