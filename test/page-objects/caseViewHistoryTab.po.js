BrowserUtils = require('../utils/browser.utils.js')
CaseView = require('../page-objects/caseView.po.js')

class CaseViewHistoryTab extends BrowserUtils {

    constructor(){

        super(by.css('ccd-event-log-table .EventLogTable'), true);

        this._caseViewHistoryColumns = by.css('.tabs-content .grid-row .column-one-half');
        this._caseViewHistoryEventLogColumnNames = by.css('ccd-event-log-table thead tr th');
        this._caseViewHistoryEventLogRow = by.css('ccd-event-log-table tbody tr');
        this._caseViewHistoryEventLogDetail = by.css('ccd-event-log-details .EventLogDetails tbody tr');
        // partial locators

        this._caseViewSubHeading = by.css('h3');

    }

    getSubHeadingText(index) {

        return element.all(this._caseViewHistoryColumns).get(index).element(this._caseViewSubHeading).getText()

    }

    getHistoryEventLogColumnName(index) {

        return element.all(this._caseViewHistoryEventLogColumnNames).get(index).getText()

    }

    getHistoryEventLogRowFieldValue(row, col) {

            return element.all(this._caseViewHistoryEventLogRow).get(row).all(by.css('td')).get(col).getText()

    }


    getHistoryEventLogDetailField(index) {

        return element.all(this._caseViewHistoryEventLogDetail).get(index).element(by.css('th')).getText()

    }

    getHistoryEventLogDetailFieldValue(index) {

        return element.all(this._caseViewHistoryEventLogDetail).get(index).element(by.css('td')).getText()

    }

}

module.exports = CaseViewHistoryTab
