BrowserUtils = require('../utils/browser.utils.js')

class CaseView {

    constructor(){

        this.browserUtils = new BrowserUtils

        this._caseHeader = by.css('ng-component ccd-case-header')
        this._caseTabs = by.css('.grid-row .tabs-list-item')
        this._caseTabTitle = by.css('heading-medium')
        this._caseTabHeading = by.css('.tabs-content .heading-medium')

    }

    isLoaded() {

//        browser.ignoreSynchronization = true

//        browserUtils = new BrowserUtils
//        browserUtils.waitForUrlToChangeTo(RegExp("case"))
//        browser.sleep(500).then(function() { browser.ignoreSynchronization = false })
        browser.waitForAngular()
        this.browserUtils.waitForPageElemToLoad(element(this._caseHeader))

    }

    getCaseID() {

        return element(this._caseHeader).getText()

    }

    getTabLabelText(index) {

        return element.all(this._caseTabs).get(index).getText()

    }

    clickTab(int) {

        element.all(this._caseTabs).get(index).click()

    }

}

module.exports = CaseView

