Button = require('./webdriver-components/button.js')
Dropdown = require('./webdriver-components/dropdown.js')
BasePage = require('./basePage.js');
NavBar = require('./ccd-components/globalNavBar.js');
DateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
global._ = require('../utils/fieldUtils.js');
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
    await browser.waitForAngular;
  }

  /**
   * Click Reset button to reset options for search
   * @returns {Promise<void|*>}
   */
  async clickResetButton() {
    await this._resetButton. waitForElementToBeClickable();
    await this._resetButton.click();
    await browser.waitForAngular;
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
   * Check given field's input ready
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async isFieldInputReady(dataType, valueArray) {
    return await new FieldUtils().isInputFieldReady(dataType, valueArray);
  }

  /**
   * Check given text field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isTextFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.TEXT.cssTag, FIELDS.TEXT.type);
  }

  /**
   * Check given date's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDateFieldInputReady() {
    return await new FieldUtils().isDateFieldInputReady();
  }

  /**
   * Check given document field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDocumentFieldInputReady() {
    return await new FieldUtils().isDocumentFieldInputReady();
  }

  /**
   * Check given fixed list field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isFixedListFieldInputReady(values) {
    return await new FieldUtils().isFixedListFieldInputReady(values);
  }

  /**
   * Check given money gbp field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isMoneyGBPFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.MONEY_GBP.cssTag, FIELDS.MONEY_GBP.type);
  }

  /**
   * Check given number field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isNumberFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.NUMBER.cssTag, FIELDS.NUMBER.type);
  }

  /**
   * Check given phone field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isPhoneFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.PHONE_NUMBER.cssTag, FIELDS.PHONE_NUMBER.type);
  }

  /**
   * Check given text area field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isTextAreaFieldInputReady() {
    return await new FieldUtils().isTextAreaFieldInputReady();
  }

  /**
   * Check given yes no field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isYesNoFieldInputReady() {
    return await new FieldUtils().isYesNoFieldInputReady();
  }

  /**
   * Check given collection field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isCollectionFieldInputReady() {
    return await new FieldUtils().isCollectionFieldInputReady();
  }

  /**
   * Check given complex type field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isComplexTypeFieldInputReady() {
    return await new FieldUtils().isComplexTypeFieldInputReady();
  }

  /**
   * Check given multi select field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isMultiSelectFieldInputReady(selectors) {
    return await new FieldUtils().isMultiSelectFieldInputReady(selectors);
  }

  /**
   * Check given email field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isEmailFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.EMAIL.cssTag, FIELDS.EMAIL.type);
  }

}

module.exports = SearchPage;
