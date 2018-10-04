BasePage = require('./basePage.js')

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

      //As we are now on the CCD landing page, we can set this to false and make use of protractor angular functionality
      browser.ignoreSynchronization = false;

  }

  waitForPagetoLoad() {
      this.waitForElementToBeVisible(element(this._bannerHeaderTitle))
      this.waitForElementToBeVisible(element(this._userName))
  }

  async getTitleLabel() {
      return await element(this._bannerHeaderTitle).getText();
  }

  async isFiltersDisplayed(){
      await this.waitForElementToBeVisible(element(this._landingPageFilters), 10000);
      return await element(this._landingPageFilters).isDisplayed()
  }

}

module.exports = CaseListPage;

