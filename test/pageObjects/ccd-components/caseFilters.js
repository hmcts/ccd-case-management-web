Button = require('../webdriver-components/button.js')
Dropdown = require('../webdriver-components/dropdown.js')
BasePage = require('../basePage.js');
let FieldUtils = require('../../utils/fieldUtils.js');



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

    this._caseReferenceField = element(by.xpath('//span[text() = \'Case Reference\']/../following-sibling::input'));

    this.fieldUtils = new FieldUtils();
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
   * Return value of Case Type dropdown
   * @returns {Promise<String>}
   */
  async getSelectedCaseType(){
    return await this._caseType.getCurrentSelectedOption();
  }

  /**
   * Fill out a specified field type with a random value
   * @param fieldDataType - the field type we are interacting with
   * @param value - the field value we are entering
   * @returns An object containing data about the field we are interacting with
   * including the value in which we have entered
   */
  async interactWithField(fieldDataType, value){
    return await this.fieldUtils.interactWithField(fieldDataType, value);
  }

  /**
   * Select State from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectState(option){
    await this._state.selectFromDropdownByText(option);
  }

  async enterIntoCaseReferenceField(caseref){
    caseref = caseref.replace(/#|-/g,'');
    await this._caseReferenceField.sendKeys(caseref)
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
