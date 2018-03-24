BrowserUtils = require('../utils/browser.utils.js')

class CaseListResults {

    constructor() {

        this.browserUtils = new BrowserUtils

        this._pagination_current_page = by.css('.ngx-pagination .current div')
        this._resultsListColumnHeadings = by.css('ccd-core cut-body .global-display .display-right thead th')
        this._resultsListResultRows = by.css('ccd-core cut-body .global-display .display-right ccd-search-result tbody  tr[_ngcontent-c10]')
        this._resultsListResultFirstRowFirstColumn = by.css('ccd-core cut-body .global-display .display-right tbody :nth-child(1) td a div')

    }

    isLoaded() {


        browser.waitForAngular
        this.browserUtils.waitForPageElemToLoad(element(this._resultsListResultFirstRowFirstColumn))

    }

    getResultsListColumnHeadingText(col_index) {

        return element.all(this._resultsListColumnHeadings).get(col_index).getText()

    }

    getResultsListRowCount() {

        return  element.all(this._resultsListResultRows).count()

    }

    getResultsListRowText(row_index) {

        return  element.all(this._resultsListResultRows).get(0).getText()

    }

    clickOnFirstCaseNumber() {

        this.first_case_listed.click();

    }

}

module.exports = CaseListResults


