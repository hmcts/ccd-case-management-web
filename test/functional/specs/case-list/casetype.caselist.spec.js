BrowserUtils = require('../../utils/browser.utils.js')
CaseListResults = require('../../page-objects/CaseListResults.po.js')
Login = require('../../page-objects/login.po')
CaseListFilters = require('../../page-objects/caseListFilters.po')
let configuration = require('../../config/protractor.conf.js')

describe('Case List - Case type', function() {

beforeEach(function(){

        browser.get(configuration.config.testFrontEndURL)

        browserUtils = new BrowserUtils

        browserUtils.waitForUrlToChangeTo(RegExp("list"))

        browser.sleep(500).then(function() { browser.ignoreSynchronization = false })
        browser.waitForAngular()


});

afterEach(function(){

});

it('Should be possible to select case type and then default to applicable state', function() {


});

it('Should be possible to select case type and relevant cases be listed', function() {

          let caeListFiltersPage = new CaseListFilters;
          let caseListResultsPage = new CaseListResults;

          caeListFiltersPage.isLoaded
          caseListResultsPage.isLoaded

          caeListFiltersPage.selectCaseTypeOptionByText('Test Address Book Case 2')
          caeListFiltersPage.clickApplyButton()

          browser.waitForAngular
          caeListFiltersPage.isLoaded
          caseListResultsPage.isLoaded

      //    expect(workBasketPage.getCaseTypeSelectedOptionText().then(function(result) { return result })).toBe("Test Address Book Case 2")
//          expect(caseListResultsPage.numberOfCaseListed().then(function(count) { return count })).toBe(5)
//
//          let resultsHash = caseListResultsPage.firstCaseOnPage().then(function(resultsHash) { return resultsHash })
//
//          expect(resultsHash["Case Reference"].toContain("1234-1234-1234-1234"))
//          expect(resultsHash["First Name"].toContain("Tim"))
//          expect(resultsHash["Last Name"].toContain("Smith"))

 });

});
