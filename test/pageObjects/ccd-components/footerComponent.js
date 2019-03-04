
CreateCaseStartPage = require('../createCaseStartPage.js');

/**
 * This component is not angular therefore we need to set browser.ignoreSynchronization = true before interacting
 * with elements on this page and then turn it back to false after
 */
class Footer{

  constructor(){
    this._footer = '.footer-wrapper';
  }

  async isDisplayed(){
      return $(this._footer).isDisplayed()
  }


}

module.exports = Footer;
