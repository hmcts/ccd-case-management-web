BrowserUtils = require('../utils/browser.utils.js')

class CaseCreateCYA extends BrowserUtils {

    constructor() {

       super('.form-group.form-group-related button[type="submit"]', false);

       this._formRows = by.css('.form-table tr');
       this._submitButton = by.css('.form-group.form-group-related button[type="submit"]');

    }

    getPageTitleLabel() {

        return element(this._pageTitle).getText()

    }

    getFormRowLabelText(rowNum) {

        return element.all(this._formRows).get(rowNum).all(by.css('th')).getText()

    }

    getFormRowValueText(rowNum) {

        return element.all(this._formRows).get(rowNum).all(by.css('.form-cell')).getText()

    }

    getFormRowChangeLinkText(rowNum) {

        return element.all(this._formRows).get(rowNum).all(by.css('td a')).getText()

    }

    clickFormRowChangeLink(rowNum) {

        element.all(this._formRows).get(rowNum).all(by.css('td a')).click()

    }

    submitButtonIsClickable() {

        return this.clickableAndWithLabel(this._submitButton, 'Submit')

    }

    clickSubmitButton() {

        expect(this.submitButtonIsClickable()).toBe(true)
        browser.waitForAngular
        element(this._submitButton).click()
        browser.waitForAngular

    }

}

module.exports = CaseCreateCYA

