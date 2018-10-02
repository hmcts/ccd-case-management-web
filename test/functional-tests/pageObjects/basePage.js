const TIMEOUT = 5000;
const EC = protractor.ExpectedConditions;

class BasePage {


    constructor(locator) {
        if (locator != null){
            let EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(locator)), );
        }

        this._formFields = 'ccd-case-edit-form > div > * > *'
        this._optionalClass = 'ng-valid'
        this._mandetoryClass = 'ng-invalid'
    }

    async waitForElementToBeVisible(element){
        await browser.wait(EC.visibilityOf(element), TIMEOUT);
    }

    async waitForElementToBeVisible(element, timeout){
        await browser.wait(EC.visibilityOf(element), timeout);
    }

    async waitForElementToBeVisibleByLocator(locator){
        await browser.wait(EC.visibilityOf(element(locator)), TIMEOUT);
    }

    async waitForElementToBeClickable(element){
        await browser.wait(EC.elementToBeClickable(element), TIMEOUT);
    }

    async waitForUrl(expectedUrlRegex){
      let currentURL = await browser.getCurrentUrl();
      await browser.wait(EC.urlContains(expectedUrlRegex))
        .catch(err => console.log(`Failed to load page, Expected URL fragment: ${expectedUrlRegex} | Actual URL: ${currentURL}`));
    }

}

module.exports = BasePage
