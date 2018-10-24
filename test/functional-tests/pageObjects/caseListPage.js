BasePage = require('./basePage.js')
NavBar = require('./ccd-components/globalNavBar.js');
Footer = require('./ccd-components/footerComponent.js');
const selfUrlPath = '/list';

class CaseListPage extends BasePage {

  constructor() {
      super();

      this._landingPageFilters = by.css('ccd-workbasket-filters');

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

  /**
   * returns new instance of the footer component
   * @returns {Footer|*}
   */
  getFooter(){
      return new Footer;
  }

}

module.exports = CaseListPage;

