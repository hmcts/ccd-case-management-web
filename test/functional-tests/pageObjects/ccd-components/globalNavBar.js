CreateCaseStartPage = require('../createCaseStartPage.js');

/**
 * This component is not angular therefore we need to set browser.ignoreSynchronization = true before interacting
 * with elements on this page and then turn it back to false after
 */
class NavBar{

  constructor(){
      this._parentNavElement = 'nav';

      this._caseListLink = '#menu-links-left li:nth-of-type(1) a';
      this._createCaseLink = '#menu-links-left li:nth-of-type(2) a';
      this._searchLink = '#menu-links-right a';
  }

  /**
   * Click the 'create case' link ignoring synchronisation while interacting
   * with the button
   * @returns {Promise<CreateCaseStartPage|*>}
   */
  async clickCreateCaseLink(){
    browser.ignoreSynchronization = true;
    await $(this._createCaseLink).click();
    browser.ignoreSynchronization = false;
    return new CreateCaseStartPage;
  }


}

module.exports = NavBar;
