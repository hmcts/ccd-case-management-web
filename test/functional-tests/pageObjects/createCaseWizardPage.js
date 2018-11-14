BasePage = require('./basePage');
let FieldUtils = require('../utils/fieldUtils.js');
Button = require('./webdriver-components/button.js')


class CreateCaseWizardPage extends BasePage{

    constructor() {
      super();
      this.progressButton = new Button('button[type=submit]');
      this.answerValueXpathTemplate = '//span[text()="LABEL-TEXT-PLACEHOLDER"]/../following-sibling::td//ccd-field-read-label/*';

    }

  /**
   * Check that a particular field type is present on the current wizard page
   * @param fieldDataType
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
    async isFieldPresent(fieldDataType){
        let css = await new FieldUtils().getFieldCSS(fieldDataType);
        return await $(css).isDisplayed();
    }

  /**
   * Fill out a specified field type with a random value
   * @param fieldDataType - the field type we are interacting with
   * @returns An object containing data about the field we are interacting with
   * including the value in which we have entered
   */
    async interactWithField(fieldDataType){
      return await new FieldUtils().interactWithField(fieldDataType);
    }

  /**
   * Button to progress the case, may be called continue or may be the final
   * Submit button with a different name as it can be dynamic
   * @returns {Promise<void>}
   */
    async clickProgressButton(){
        await this.progressButton.click();
    }



    async getCheckYourAnswersValueByLabel(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerValueXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);

      return await element(by.xpath(xpathLocator.toString())).getText();
    }

}

module.exports = CreateCaseWizardPage;
