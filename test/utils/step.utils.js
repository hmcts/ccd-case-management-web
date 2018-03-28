let CaseListResults = require('../page-objects/caseListResults.po.js')
let CaseCreateStart = require('../page-objects/caseCreateStart.po.js')
let CaseCreateStep = require('../page-objects/caseCreateStep.po.js')
let BrowserUtils = require('../utils/browser.utils.js')

class StepUtils {

    constructor() {

    browser.waitForAngular

    }

    caseListResultsPageStartingANewCase() {

           let caseListResultsPage = new CaseListResults

           caseListResultsPage.isLoaded()

           caseListResultsPage.clickCreateCaseButton()

           let createCaseStartPage = new CaseCreateStart

           createCaseStartPage.clickSubmitButton()

           browser.sleep(5000)
           browser.waitForAngular
    }

}

module.exports = StepUtils
