Button = require('./webdriver-components/button.js')
Dropdown = require('./webdriver-components/dropdown.js')
BasePage = require('./basePage.js');
NavBar = require('./ccd-components/globalNavBar.js');
DateField = require('../pageObjects/ccd-components/fields/ccdDateField.js');
let FieldUtils = require('../utils/fieldUtils.js');
CaseList = require('./ccd-components/caseListComponent.js');
CaseFilters = require('./ccd-components/caseFilters.js');
class SearchPage extends BasePage {

  constructor(){
      super();
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
   * Return a new instance if the Case Filters dropdowns and apply/reset button
   * which is common on search page and workbasket filters on Case List page
   * @returns {CaseFilters|*}
   */
  getSearchFilters(){
    return new CaseFilters;
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
