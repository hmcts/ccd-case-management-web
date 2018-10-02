Dropdown = require('./webdriver-components/dropdown.js')
BasePage = require('./basePage.js');
CreateCaseWizardPage = require('./createCaseWizardPage.js')

class CreateCaseStartPage extends BasePage{

  constructor(){
      super();
      this._jurisdiction = new Dropdown(by.css('#cc-jurisdiction'));
      this._caseType = new Dropdown(by.css('#cc-case-type'));
      this._event = new Dropdown(by.css('#cc-event'));
      this._submitButton = by.css('.container-fluid .button');
  }

  /**
   * Select a Jurisdiction from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectJurisdiction(option){
      await this._jurisdiction.selectFromDropdownByText(option);
  }

  /**
   * Select Case Type from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectCaseType(option){
      await this._caseType.selectFromDropdownByText(option);
  }

  /**
   * Select Event Type from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectEvent(option){
      await this._event.selectFromDropdownByText(option);
  }

  /**
   * Click Start button to submit options and start a new case
   * @returns {Promise<CreateCaseWizardPage|*>}
   */
  async clickStartButton() {
    await this.waitForElementToBeClickable(element(this._submitButton));
    await element(this._submitButton).click();
    await browser.waitForAngular;
    return new CreateCaseWizardPage;
  }

}

module.exports = CreateCaseStartPage;
