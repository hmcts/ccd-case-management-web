BrowserUtils = require('../utils/browser.utils.js')
let configuration = require('../config/protractor.conf.js')

class Login {

    constructor() {

        this.browserUtils = new BrowserUtils

        this._userNameField = by.css('#username');
        this._passwordField = by.css('#password');
        this._signIn = by.css('.button');

        //browser.waitForPageElemToLoad(_signIn)
    }


    isLoaded() {

        this.browserUtils.waitForPageElemToLoad(element(this._userNameField));

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

        if ('test-casework') {

           this.inputCredentials(configuration.config.testUserName, configuration.config.testPassword);
           this.signIn();

        }

    }

}

module.exports = Login
