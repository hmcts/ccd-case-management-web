Button = require('./webdriver-components/button.js')
Dropdown = require('./webdriver-components/dropdown.js')
BasePage = require('./basePage.js');
NavBar = require('./ccd-components/globalNavBar.js');
DateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let FieldUtils = require('../utils/fieldUtils.js');
CaseList = require('./ccd-components/caseListComponent.js');

class SearchPage extends BasePage {

  constructor(){
      super();
      this._jurisdiction = new Dropdown('#s-jurisdiction');
      this._caseType = new Dropdown('#s-case-type');
      this._applyButton = new Button('.button', 'Apply');
      this._resetButton = new Button('#reset');
  }

   /**
    * Return a new instance of the Navigation bar component which is common to many
    * pages and abstracted into it's own class
    * @returns {NavBar|*}
    */
  getNavBarComponent(){
    return new NavBar;
  }

  /**
   * Return a new instance of the Case List Component which is common across both
   * the case list page and search page
   * @returns {CaseListComponent|*}
   */
  getCaseListComponent(){
    return new CaseList;
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
    await this._resetButton. waitForElementToBeClickable();
    await this._resetButton.click();
  }

  /**
   * Check that jurisdiction is selected
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
  async isJurisdictionSelected(){
    let isSelected = this._jurisdiction.isOptionSelected();
    return isSelected;
  }

  /**
   * Check that case type is selected
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
  async isCaseTypeSelected(){
    let isSelected = this._caseType.isOptionSelected();
    return isSelected;
  }

  /**
   * Check that case results page is displayed
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
  async isSearchResultsDisplayed(){
    return await this.getCaseListComponent().isDisplayed();
  }

  /**
   * Fill out a specified field type with a random value
   * @param fieldDataType - the field type we are interacting with
   * @param value - the field value we are entering
   * @returns An object containing data about the field we are interacting with
   * including the value in which we have entered
   */
  async interactWithField(fieldDataType, value){
    return await new FieldUtils().interactWithField(fieldDataType, value);
  }

  /**
   * Check field is present
   * @returns {Promise<boolean|*>}
   */
  async isFieldPresent(dataType) {
    return await new FieldUtils().isFieldPresent(dataType);
  }

  /**
   * Check field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasFieldLabels(dataType, labelArray) {
    return await new FieldUtils().hasFieldLabels(dataType, labelArray);
  }

  /**
   * Check given field is ready
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async isFieldReady(dataType, valueArray) {
    return await new FieldUtils().isFieldReady(dataType, valueArray);
  }

}

module.exports = SearchPage;
