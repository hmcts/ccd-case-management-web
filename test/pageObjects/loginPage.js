BasePage = require('./basePage.js')
let CCDBanner = require('./caseListPage.js')
const selfUrlPath = '/login';


class LoginPage extends BasePage {

  constructor() {
      super();

      this._userNameField = by.css('#username');
      this._passwordField = by.css('#password');
      this._signIn = by.css('.button');
  }

  /**
   * Opens browser window and navigates to login page, defaults to docker if env var not present.
   * @returns {Promise<LoginPage>} new instance of the LoginPage
   */
  static async open(){

      //open browser and navigate to url
      await browser.driver.get(process.env.TEST_URL || 'http://localhost:3451',50000);

      element(by.id('view-container')).getText().then(function(text) {
        console.log(text);
      });

      //wait for browser url to be correct
      let EC = protractor.ExpectedConditions;
      let currentURL = await browser.driver.getCurrentUrl();
      let errorMessage = `Failed to load page, Expected URL fragment: ${selfUrlPath} | Actual URL: ${currentURL}`;

      await browser.driver.wait(EC.urlContains(selfUrlPath),30000)
        .catch(err => console.log(errorMessage));

      //return new instance of the login page
      return new LoginPage
  }

  /**
   * Inputs credentials into username and password field
   * @param username
   * @param password
   * @returns {Promise<void>}
   */
  async inputCredentials(username, password) {
      await element(this._userNameField).sendKeys(username);
      await element(this._passwordField).sendKeys(password);
  }

  /**
   * Clicks the sign in button. ignoreSynchronization is turned off as we are now within the CCD app which is Angular
   * @returns {Promise<CCDBanner>} new instance of the CCDBanner page
   */
  async clickSignIn() {
    await element(this._signIn).click();
    return new CCDBanner
  }

  /**
   * Performs full login workflow taking credentials from env vars
   * @returns {Promise<void>}
   */
  async loginToApp(username = '') {
    let user = '';
    if (username === '') {
      user = process.env.CCD_CASEWORKER_AUTOTEST_FE_EMAIL;
    } else {
      user = username;
    }
    let password = process.env.CCD_CASEWORKER_AUTOTEST_FE_PASSWORD;

    await this.inputCredentials(user, password);
    return await this.clickSignIn();
  }
}

module.exports = LoginPage;
