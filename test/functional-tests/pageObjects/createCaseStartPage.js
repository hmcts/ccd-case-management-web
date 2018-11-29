Dropdown = require('./webdriver-components/dropdown.js')
BasePage = require('./basePage.js');
CreateCaseWizardPage = require('./createCaseWizardPage.js')

// const pageHeader = 'Create Case';

class CreateCaseStartPage extends BasePage{


  constructor(){
      super();
      this._jurisdiction = new Dropdown('#cc-jurisdiction');
      this._caseType = new Dropdown('#cc-case-type');
      this._event = new Dropdown('#cc-event');
      this._submitButton = '.container-fluid .button';

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
    await this.waitForElementToBeClickable($(this._submitButton));
    await $(this._submitButton).click();
    await browser.waitForAngular;
    return new CreateCaseWizardPage;
  }

  /**
   * Check we are on CreateCaseStartPage by checking the page header is as expected
   * @returns Boolean
   */
  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Create Case'
  }

}

module.exports = CreateCaseStartPage;
