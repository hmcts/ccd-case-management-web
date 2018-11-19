BasePage = require('./basePage.js');
Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');


class CaseDetailsPage extends BasePage {

  constructor() {
    super();

    this._latestHistoryEventLink = '.EventLogTable tbody > tr:nth-of-type(1) a';
    this._endStateValue = '.EventLogDetails tbody > tr:nth-of-type(3) > td > span';
    this._actionsDropdown = new Dropdown('ccd-event-trigger select');
    this._goButton = new Button('ccd-event-trigger button');

  }

  /**
   * Get text value for the latest event in the History tab
   * @returns {Promise<String>}
   */
  async getLatestHistoryEvent(){
      return await $(this._latestHistoryEventLink).getText();
  }

  /**
   * Get the value for 'End State' as listed in the Details box of the History tab
   * @returns {Promise<void>}
   */
  async getEndStateValue(){
    browser.ignoreSynchronization = true;
    await this.waitForElementToBeVisibleByLocator(this._endStateValue);
    browser.ignoreSynchronization = false;

    return await $(this._endStateValue).getText();
  }

  /**
   * Get available actions from the 'Next Step' dropdown box
   * @returns String Array
   */
  async getActions(){
    browser.ignoreSynchronization = true;
    await this.waitForElementToBeVisibleByLocator(this._actionsDropdown);
    browser.ignoreSynchronization = false;

    return await this._actionsDropdown.getOptionsTextValues()
  }

  /**
   * Select event from the actions dropdown and click go button
   * @param event
   * @returns {Promise<void>}
   */
  async startEvent(event){
    browser.ignoreSynchronization = true;
    await this.waitForElementToBeVisibleByLocator(this._actionsDropdown);
    browser.ignoreSynchronization = false;

    await this._actionsDropdown.selectFromDropdownByText(event);
    await this._goButton.click()
  }


}

module.exports = CaseDetailsPage;
