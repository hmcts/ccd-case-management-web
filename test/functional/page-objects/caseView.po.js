BrowserUtils = require('../utils/browser.utils.js')

class CaseView {

    constructor(){

        this.browserUtils = new BrowserUtils

        this.caseViewSectionHeaders: by.css('.tabs .tabs-list')

    }

    isLoaded() {

        browser.waitForAngular

    }


    caseView() {

        this.browserUtils: require('../utils/browserUtils.js'),
        caseViewSectionHeaders: by.css('.tabs .tabs-list')
    }

    go(url) {

        let _caseView = this.caseView;

        browser.get(url); //overrides baseURL
        browser.waitForAngular();
        this.isLoaded();

    }

    isLoaded() {

        browser.waitForAngular();
        this.browserUtils.waitForPageElemToLoad(element(caseViewSectionHeaders));

    }

}

module.exports = CaseView

