BrowserUtils = require('../utils/browser.utils.js')

class CaseCreateStep {

    constructor() {

       this.browserUtils = new BrowserUtils

       this._pageTitle = by.css('ccd-event-trigger-header h3')
       this._continueButton = by.css('.form.ng-untouched.ng-pristine.ng-valid .form-group.form-group-related button[type="submit"]')
       this._previousButton = by.css('.ng-untouched.ng-pristine.ng-valid .button[type="button"]')
       this._cancelLink = by.css('.ng-untouched.ng-pristine.ng-valid p a')
       this._submitButton = by.css('.form-group.form-group-related button[type="submit"]')

    }

    isLoaded() {

        browser.waitForAngular

    }

    getPageTitleLabel() {

        return element(this._pageTitle).getText()
    }

    continueButtonIsClickable() {

        return this.browserUtils.clickableAndWithLabel(this._continueButton, 'Continue')

    }

    continueButtonIsExists() {

    return element(this._continueButton).isPresent()

    }

    clickContinueButton() {
         expect(this.continueButtonIsClickable()).toBe(true)
         browser.waitForAngular
         element(this._continueButton).click()
         browser.waitForAngular

    }

    previousButtonIsClickable() {

        return this.browserUtils.clickableAndWithLabel(this._previousButton, 'Previous')

    }

    previousButtonIsEnabled() {

        return this.browserUtils.enabledAndWithLabel(this._previousButton, 'Previous')

    }

    clickPreviousButton() {

             browser.waitForAngular
             element(this._previousButton).click()
             browser.waitForAngular

    }

    cancelLinkIsClickable() {

        return this.browserUtils.clickableAndWithLabel(this._cancelLink, 'Cancel')

    }

    clickCancelLink() {

             browser.waitForAngular
             element(this._cancelLink).click()
             browser.waitForAngular

    }

    submitButtonIsClickable() {

        return this.browserUtils.clickableAndWithLabel(this._submitButton, 'Submit')

    }

    clickSubmitButton() {
                 expect(this.submitButtonIsClickable()).toBe(true)
                 browser.waitForAngular
                 element(this._submitButton).click()
                 browser.waitForAngular
    }

}

module.exports = CaseCreateStep

