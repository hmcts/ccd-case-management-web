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
   * Check text field is present
   * @returns {Promise<boolean|*>}
   */
  async isTextFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.TEXT.cssTag);
  }

  /**
   * Check text field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasTextFieldLabel(label) {
    return await new FieldUtils().hasTextFieldLabel(label);
  }

  /**
   * Check given text field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isTextFieldInputReady(selector) {
    return await new FieldUtils().isInputFieldReady(FIELDS.TEXT.cssTag, FIELDS.TEXT.type,  selector);
  }

  /**
   * Check date field is present
   * @returns {Promise<boolean|*>}
   */
  async isDateFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.DATE.cssTag);
  }

  /**
   * Check date label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasDateFieldLabel(label) {
    return await new FieldUtils().hasDateFieldLabel(label);
  }

  /**
   * Check given date's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDateFieldInputReady() {
    return await new FieldUtils().isDateFieldInputReady();
  }

  /**
   * Check document field is present
   * @returns {Promise<boolean|*>}
   */
  async isDocumentFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.DOCUMENT.cssTag);
  }

  /**
   * Check document field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasDocumentFieldLabel(label) {
    return await new FieldUtils().hasDocumentFieldLabel(label);
  }

  /**
   * Check given document field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isDocumentFieldInputReady() {
    return await new FieldUtils().isDocumentFieldInputReady();
  }

  /**
   * Check document field is present
   * @returns {Promise<boolean|*>}
   */
  async isEmailFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.EMAIL.cssTag);
  }

  /**
   * Check fixed list field is present
   * @returns {Promise<boolean|*>}
   */
  async isFixedListFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.FIXED_LIST.cssTag);
  }

  /**
   * Check fixed list field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasFixedListFieldLabel(label) {
    return await new FieldUtils().hasFixedListFieldLabel(label);
  }

  /**
   * Check given fixed list field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isFixedListFieldInputReady(values) {
    return await new FieldUtils().isFixedListFieldInputReady(values);
  }

  /**
   * Check money GBP field is present
   * @returns {Promise<boolean|*>}
   */
  async isMoneyGBPFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.MONEY_GBP.cssTag);
  }

  /**
   * Check money gbp field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasMoneyGBPFieldLabel(label) {
    return await new FieldUtils().hasMoneyGBPFieldLabel(label);
  }

  /**
   * Check given money gbp field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isMoneyGBPFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.MONEY_GBP.cssTag, FIELDS.MONEY_GBP.type);
  }
  
  /**
   * Check multi select field is present
   * @returns {Promise<boolean|*>}
   */
  async isMultiSelectFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.MULTI_SELECT.cssTag);
  }

  /**
   * Check number field is present
   * @returns {Promise<boolean|*>}
   */
  async isNumberFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.NUMBER.cssTag);
  }

  /**
   * Check number field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasNumberFieldLabel(label) {
    return await new FieldUtils().hasNumberFieldLabel(label);
  }

  /**
   * Check given number field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isNumberFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.NUMBER.cssTag, FIELDS.NUMBER.type);
  }

  /**
   * Check phone field is present
   * @returns {Promise<boolean|*>}
   */
  async isPhoneFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.PHONE_NUMBER.cssTag);
  }

  /**
   * Check phone field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasPhoneFieldLabel(label) {
    return await new FieldUtils().hasPhoneFieldLabel(label);
  }

  /**
   * Check given phone field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isPhoneFieldInputReady() {
    return await new FieldUtils().isInputFieldReady(FIELDS.PHONE_NUMBER.cssTag, FIELDS.PHONE_NUMBER.type);
  }

  /**
   * Check text area field is present
   * @returns {Promise<boolean|*>}
   */
  async isTextAreaFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.TEXT_AREA.cssTag);
  }

  /**
   * Check text area label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasTextAreaFieldLabel(label) {
    return await new FieldUtils().hasTextAreaFieldLabel(label);
  }

  /**
   * Check given text area field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isTextAreaFieldInputReady() {
    return await new FieldUtils().isTextAreaFieldInputReady();
  }

  /**
   * Check yes or no field is present
   * @returns {Promise<boolean|*>}
   */
  async isYesNoFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.YES_NO.cssTag);
  }

  /**
   * Check yes no field label matches provided
   * @param label - the label value we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasYesNoFieldLabel(label) {
    return await new FieldUtils().hasYesNoFieldLabel(label);
  }

  /**
   * Check given yes no field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isYesNoFieldInputReady() {
    return await new FieldUtils().isYesNoFieldInputReady();
  }

  /**
   * Check collection field is present
   * @returns {Promise<boolean|*>}
   */
  async isCollectionFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.COLLECTION.cssTag);
  }

  /**
   * Check collection label matches provided
   * @param labels - the label values we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasCollectionFieldLabel(labels) {
    return await new FieldUtils().hasCollectionFieldLabel(labels);
  }

  /**
   * Check given collection field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isCollectionFieldInputReady() {
    return await new FieldUtils().isCollectionFieldInputReady();
  }

  /**
   * Check complex type field is present
   * @returns {Promise<boolean|*>}
   */
  async isComplexTypeFieldPresent() {
    return await new FieldUtils().isFieldPresent(FIELDS.COMPLEX_TYPE.cssTag);
  }

  /**
   * Check complex type label matches provided
   * @param labels - the label values we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasComplexTypeFieldLabel(labels, idSelectors) {
    return await new FieldUtils().hasComplexTypeFieldLabel(labels, idSelectors);
  }

  /**
   * Check given complex type field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isComplexTypeFieldInputReady(idSelectors) {
    return await new FieldUtils().isComplexTypeFieldInputReady(idSelectors);
  }

  /**
   * Check multi select label matches provided
   * @param labels - the label values we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasMultiSelectFieldLabel(labels, selectors) {
    return await new FieldUtils().hasMultiSelectFieldLabel(labels, selectors);
  }

  /**
   * Check given multi select field's input ready to type
   * @returns {Promise<boolean|*>}
   */
  async isMultiSelectFieldInputReady(selectors) {
    return await new FieldUtils().isMultiSelectFieldInputReady(selectors);
  }

  /**
   * Check email label matches provided
   * @param labels - the label values we are looking for
   * @returns {Promise<boolean|*>}
   */
  async hasEmailFieldLabel(labels) {
    return await new FieldUtils().hasEmailFieldLabel(labels);
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
