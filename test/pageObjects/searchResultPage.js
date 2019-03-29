BasePage = require('./basePage.js')
NavBar = require('./ccd-components/globalNavBar.js');
CaseList= require('./ccd-components/caseListComponent.js');
Footer = require('./ccd-components/footerComponent.js');

class SearchResultPage extends BasePage {

  constructor() {
      super();

      this._jurisdiction = new Dropdown('#s-jurisdiction');
      this._caseType = new Dropdown('#s-case-type');
      this._applyButton = new Button('.button', 'Apply');
      this._resultCount = by.css('.pagination-top');
      this._sortIcon = by.css('.search-result-column-sort .sort-widget');
      this._landingPageFilters = by.css('ccd-search-filters');
  }

  async waitForPageLoaded(){
    const EC = protractor.ExpectedConditions;
    let condition = await EC.and(await EC.urlContains('/search'), await EC.visibilityOf(element(this._landingPageFilters)));
    await browser.wait(condition,60000);
    browser.ignoreSynchronization = false;
  }


  /**
   * Waits for workbasket search filters to be visible then checks if it is now visible
   *
   * This method is primarily used to wait for the landing page to fully load, once it has loaded we set
   * ignoreSynchronization = false as we can be dure we are now on an angluar page
   * @returns {Promise<boolean>}
   */
  async isFiltersDisplayed(){
      return await element(this._landingPageFilters).isDisplayed()
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
   * Click Sort icon to sort results
   * @returns {Promise<void|*>}
   */
  async clickSortIcon() {
    await element(this._sortIcon).click();
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
   * Return the result count
   * @returns {Promise<String|*>}
   */
  async getResultCountText(){
      return await element(this._resultCount).getText();
  }

  /**
   * returns new instance of the footer component
   * @returns {Footer|*}
   */
  getFooter(){
      return new Footer;
  }

}

module.exports = SearchResultPage;

