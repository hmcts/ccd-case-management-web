let CaseListResults = require('../page-objects/caseListResults.po.js')
let CaseCreateStart = require('../page-objects/caseCreateStart.po.js')
let CaseCreateStep = require('../page-objects/caseCreateStep.po.js')


class StepUtils {

    constructor() {

    browser.waitForAngular

    }

    fromCaseStep_throughSteps(noOfSteps) {

           let caseCreateStepPage = new CaseCreateStep

           let i = 0

           for (i=1; i <=noOfSteps; ++i) {

           browser.sleep(500)
           caseCreateStepPage.continueButtonIsExists() ? caseCreateStepPage.clickContinueButton() : false

            }

    }

    fromCaseListResults_startANewCase() {

           let caseListResultsPage = new CaseListResults

           caseListResultsPage.isLoaded()

           caseListResultsPage.clickCreateCaseButton()

           let createCaseStartPage = new CaseCreateStart

           createCaseStartPage.clickSubmitButton()

    }

}

module.exports = StepUtils
