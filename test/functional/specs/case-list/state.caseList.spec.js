BrowserUtils = require('../../utils/browser.utils.js')
CaseListResults = require('../../page-objects/CaseListResults.po.js')
Login = require('../../page-objects/login.po')
CaseListFilters = require('../../page-objects/caseListFilters.po')
let configuration = require('../../config/protractor.conf.js')

describe('Case List - State', function() {

beforeEach(function(){

        browser.get(configuration.config.testFrontEndURL)

        browserUtils = new BrowserUtils

        browserUtils.waitForUrlToChangeTo(RegExp("list"))

        browser.sleep(500).then(function() { browser.ignoreSynchronization = false })
        browser.waitForAngular()

});

afterEach(function(){

});

it('Should be possible to select state and relevant cases be listed', function() {

//          let workBasketPage = new WorkBasket;
//          let caseListResultsPage = new CaseListResults;
//
//          workBasketPage.isLoaded
//          caseListResultsPage.isLoaded
//
//          workBasketPage.selectStateOptionByText('Case has been Entered into Legacy')
//          workBasketPage.clickApplyButton()
//
//          expect(workBasketPage.getStateSelectedOptionText().then(function(result) { return result })).toBe("Case has been Entered into Legacy")
//          expect(caseListResultsPage.numberOfCaseListed().then(function(count) { return count })).toBe(5)
//
//          let resultsHash = caseListResultsPage.firstCaseOnPage().then(function(resultsHash) { return resultsHash })
//
//          expect(resultsHash["Case Reference"].toContain("1234-1234-1234-1234"))
//          expect(resultsHash["First Name"].toContain("Tim"))
//          expect(resultsHash["Last Name"].toContain("Smith"))

 });

});
