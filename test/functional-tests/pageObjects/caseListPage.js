BasePage = require('./basePage.js')
const selfUrlPath = '/list';


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

      let EC = protractor.ExpectedConditions;
      browser.wait(EC.urlContains(selfUrlPath),30000)
        .catch(err => console.log('page not loaded'));


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

  /**
   * Check the workbasket filters are displayed on the case list landing page
   * @returns {Promise<boolean>}
   */
  async isFiltersDisplayed(){
      await this.waitForElementToBeVisible(element(this._landingPageFilters));
      return await element(this._landingPageFilters).isDisplayed()
  }

}

module.exports = CaseListPage;

