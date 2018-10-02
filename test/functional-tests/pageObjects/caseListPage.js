BasePage = require('./basePage.js')
NavBar = require('./ccd-components/globalNavBar.js');

class CaseListPage extends BasePage {

  constructor() {
      super();

      this._landingPageFilters = by.css('ccd-workbasket-filters');
      this._bannerHeaderTitle = by.css('.global-header .title span');
      this._userName = by.css('div #user-name');
      this._menuItems = by.css('.global-navigation cut-nav-item a');
      this._searchBox = by.css('.global-navigation .cut-nav-bar #search');
      this._footer = by.css('.footer-wrapper');
      this._signOut = by.css('div #sign-out');
  }

  /**
   * Waits for workbasket search filters to be visible then checks if it is now visible
   *
   * This method is primarily used to wait for the landing page to fully load, once it has loaded we set
   * ignoreSynchronization = false as we can be dure we are now on an angluar page
   * @returns {Promise<boolean>}
   */
  async isFiltersDisplayed(){
    await this.waitForElementToBeVisible(element(this._landingPageFilters), 10000);
    browser.ignoreSynchronization = false;
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

}

module.exports = CaseListPage;

