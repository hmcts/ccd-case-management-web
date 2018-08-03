BrowserUtils = require('../utils/browser.utils.js')

class CaseView extends BrowserUtils {

    constructor(){

        super(by.css('ng-component ccd-case-header'), true);

        this._caseHeader = by.css('ng-component ccd-case-header');
        this._caseTabs = by.css('.grid-row .tabs-list-item');
        this._caseTabTitle = by.css('heading-medium');
        this._caseTabHeading = by.css('.tabs-content .heading-medium');

        this._selectedTabDetailRows = null;

    }

    isLoaded() {

        browser.waitForAngular()
        this.waitForPageElemToLoad(element(this._caseHeader))

    }

    getCaseID() {

        return element(this._caseHeader).getText()

    }

    getTabLabelText(index) {

        return element.all(this._caseTabs).get(index).getText()

    }

    getTabLabels() {

        browser.waitForAngular
        return element.all(this._caseTabs).getText()

    }

    getTabLabelPos(label) {

        let tabLabels =  element.all(this._caseTabs).getText()

        browser.waitForAngular
        return tabLabels.then(function (tl) { return tl.indexOf(label) })

    }

    clickTabLabeled(label) {

        browser.sleep(5000)
        element.all(this._caseTabs).get(this.getTabLabelPos(label)).click()

        let labelInUrl = label.replace(/\w+/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1); }).replace(/\s/g, '');

        this.waitForUrlToChangeTo(RegExp(labelInUrl))

        this._selectedTabDetailRows = by.css('div #' + labelInUrl + ' tr')

    }

    getTabRowLabelText(row) {

        return element.all(this._selectedTabDetailRows).all(by.css('tr th')).get(row).getText()

    }

    getTabRowValueText(row) {

        return element.all(this._selectedTabDetailRows).all(by.css('tr td')).get(row).getText()

    }



}

module.exports = CaseView

