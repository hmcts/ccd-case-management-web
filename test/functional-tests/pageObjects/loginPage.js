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
      //await browser.get('https://ccd-case-management-web-saat.service.core-compute-saat.internal/');
    console.log('opening browser and navigating to url...')
      await browser.get(process.env.TEST_URL || 'http://localhost:3451',30000);
    console.log('waiting for url to be /login')
      let EC = protractor.ExpectedConditions;
      let currentURL = await browser.getCurrentUrl();
      await browser.wait(EC.urlContains(selfUrlPath),10000).catch(err => console.log(I`Failed to load page, Expected URL fragment: ${expectedUrlRegex} | Actual URL: ${currentURL}`));
      console.log('finsihed waiting for /login and moving on')
      return new LoginPage
  }


  /**
   * Inputs credentials into username and password field
   * @param username
   * @param password
   * @returns {Promise<void>}
   */
  async inputCredentials(username, password) {
     console.log("coming into input Credentials");
      await element(this._userNameField).sendKeys(username);
      if (username){
        console.log('username is not empty')
      }else{
        console.log('username is empty')
      }

      if (password){
        console.log('password is not empty')
      }else{
        console.log('password is empty')
      }

      await element(this._passwordField).sendKeys(password);
  }

  /**
   * Clicks the sign in button. ignoreSynchronization is turned off as we are now within the CCD app which is Angular
   * @returns {Promise<CCDBanner>} new instance of the CCDBanner page
   */
  async clickSignIn() {
      await element(this._signIn).submit();
      browser.ignoreSynchronization = false;
      return new CCDBanner
  }

  /**
   * Performs full login workflow taking credentials fron env vars
   * @returns {Promise<void>}
   */
  async loginToApp(){
      let username = process.env.CCD_CASEWORKER_AUTOTEST_EMAIL;
      let password = process.env.CCD_CASEWORKER_AUTOTEST_PASSWORD;
      await inputCredentials(username,password);
      await clickSignIn();
  }

}

module.exports = LoginPage;
