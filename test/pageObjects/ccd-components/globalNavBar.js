CreateCaseStartPage = require('../createCaseStartPage.js');
SearchPage = require('../searchPage.js');

/**
 * This component is not angular therefore we need to set browser.ignoreSynchronization = true before interacting
 * with elements on this page and then turn it back to false after
 */
class NavBar {

  constructor(){
      this._parentNavElement = 'nav';

      this._caseListLink = '#menu-links-left li:nth-of-type(1) a';
      this._createCaseLink = '#menu-links-left li:nth-of-type(2) a';
      this._searchLink = '#menu-links-right a';
      this._bannerHeaderTitle = '.global-header .title span';
      this._userName = 'div #user-name';
      this._signOut = 'div #sign-out';

  }

  async getTitleLabel() {
      return await $(this._bannerHeaderTitle).getText();
  }

  /**
   * Click the 'create case' link ignoring synchronisation while interacting
   * with the button
   * @returns {Promise<CreateCaseStartPage|*>}
   */
  async clickCreateCaseLink(){
    browser.ignoreSynchronization = true;
    await browser.sleep(2000);
    await $(this._createCaseLink).click();
    browser.ignoreSynchronization = false;
    return new CreateCaseStartPage;
  }

  /**
   * Click the 'caseList' link ignoring synchronisation while interacting
   * with the button
   * @returns {Promise<CaseListPage|*>}
   */
  async clickCaseListLink(){
    browser.ignoreSynchronization = true;
    await $(this._caseListLink).click();
    browser.ignoreSynchronization = false;
    return new CreateCaseStartPage;
  }

  /**
   * Click the 'search' link ignoring synchronisation while interacting
   * with the button
   * @returns {Promise<SearchPage|*>}
   */
  async clickSearchLink(){
    browser.ignoreSynchronization = true;
    await $(this._searchLink).click();
    browser.ignoreSynchronization = false;
    return new SearchPage;
  }

  async getUserName(){
      return await $(this._userName).getText();
  }

  async allComponentsDisplayed(){
    browser.ignoreSynchronization = true;

    await browser.sleep(1000);
    let allDisplayed =  await $(this._searchLink).isDisplayed() &&
      await $(this._caseListLink).isDisplayed() &&
      await $(this._createCaseLink).isDisplayed() &&
      await $(this._signOut).isDisplayed() &&
      await $(this._searchLink).isDisplayed() &&
      await $(this._bannerHeaderTitle).isDisplayed() &&
      await $(this._userName).isDisplayed();

    browser.ignoreSynchronization = false;

    return allDisplayed;
  }

  async clickSignOut() {
    browser.ignoreSynchronization = true;
    await $(this._signOut).click();
    browser.ignoreSynchronization = false;
  }
}

module.exports = NavBar;
