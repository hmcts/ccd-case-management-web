BrowserUtils = require('../utils/browser.utils.js')

class Login {

    constructor() {

        this.browserUtils = new BrowserUtils

        this._userNameField = by.css('#username');
        this._passwordField = by.css('#password');
        this._signIn = by.css('.button');

    }


    isLoaded() {

        this.browserUtils.waitForPageElemToLoad(element(this._userNameField));
        this.browserUtils.waitForPageElemToLoad(element(this._passwordField));
        this.browserUtils.waitForPageElemToLoad(element(this._signIn));

    }

    inputCredentials(username, password) {

        element(this._userNameField).isDisplayed();
        element(this._userNameField).click();
        element(this._userNameField).sendKeys(username);
        element(this._passwordField).isDisplayed();
        element(this._passwordField).click();
        element(this._passwordField).sendKeys(password);

    }

    signIn() {

        element(this._signIn).click();

    }

    signInAs(user) {

       switch(user) {
          case 'test-casework':
              this.inputCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
              this.signIn();
              break;
          case 'caseworker-autotest1':
              this.inputCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
              this.signIn();
              break;
          default:
              console.log("User not specified")
        }

    }

}

module.exports = Login
