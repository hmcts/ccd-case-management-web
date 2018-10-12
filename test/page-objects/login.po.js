BrowserUtils = require('../utils/browser.utils.js')

class Login extends BrowserUtils {

    constructor() {

        super(by.css('.button'), true);

        this._userNameField = by.css('#username');
        this._passwordField = by.css('#password');
        this._signIn = by.css('.button');

        let EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element(by.css('#username'))), 7000);
        browser.wait(EC.visibilityOf(element(by.css('#password'))), 7000);

    }

    isLoaded() {

    }

    inputCredentials(username, password) {

        let EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element(this._userNameField)), 3000);

        element(this._userNameField).isDisplayed();
        element(this._userNameField).click();
        element(this._userNameField).sendKeys(username);
        element(this._passwordField).isDisplayed();
        element(this._passwordField).click();
        element(this._passwordField).sendKeys(password);

    }

    clickSignIn() {
        //browser.wait(10000);
        element(this._signIn).click();

    }


    signInTo() {

        this.waitForUrlToChangeTo(RegExp('login'))
        this.inputCredentials(process.env.CCD_CASEWORKER_AUTOTEST_EMAIL, process.env.CCD_CASEWORKER_AUTOTEST_PASSWORD);
        this.clickSignIn()
        this.waitForUrlToChangeTo(RegExp("list"))
      //  browser.sleep(1000).then(function() { browser.ignoreSynchronization = false })

    }

}

module.exports = Login
