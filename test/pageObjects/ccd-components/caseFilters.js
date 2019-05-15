Button = require('../webdriver-components/button.js')
Dropdown = require('../webdriver-components/dropdown.js')
BasePage = require('../basePage.js');


/**
 * Class to encapsulate functionality of the case filters that can be found on both the Search page and the
 * Case list page in the form of Workbasket filters. we can also use this component fo the dropdown filters on the
 * Create Case page
 */
class CaseFilters extends BasePage {

  constructor(){
    super();

    this._jurisdiction = new Dropdown('select[name=jurisdiction]');
    this._caseType = new Dropdown('select[name=case-type]');
    this._state = new Dropdown('select[name=state]');
    this._applyButton = new Button('.button', 'Apply');
    this._resetButton = new Button('.button','Reset');
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
   * Select State from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectState(option){
    await this._state.selectFromDropdownByText(option);
  }

  /**
   * Click Apply button to submit options for search
   * @returns {Promise<void|*>}
   */
  async clickApplyButton() {
    await this._applyButton.waitForElementToBeClickable();
    await this._applyButton.click();
  }

  /**
   * Click Reset button to reset options for search
   * @returns {Promise<void|*>}
   */
  async clickResetButton() {
    await this._resetButton.click();
  }

}

module.exports = CaseFilters;
