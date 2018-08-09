BrowserUtils = require('../../../utils/browser.utils.js')
CaseListResults = require('../../../page-objects/CaseListResults.po.js')
Login = require('../../../page-objects/login.po')
CaseListFilters = require('../../../page-objects/caseListFilters.po')


describe('Case List - Jurisdiction', function() {

beforeEach(function(){

   browser.get(process.env.TEST_FRONTEND_URL || "http://localhost:3451")

});

afterEach(function(){

});


it('Should be possible to select jurisdiction and relevant cases be listed', function() {

//        let caeListFiltersPage = new CaseListFilters;
//        let caseListResultsPage = new CaseListResults;
//
//        caeListFiltersPage.isLoaded
//        caseListResultsPage.isLoaded
//
//        caeListFiltersPage.selectJurisdictionOptionByText('Test2')
//        caeListFiltersPage.clickApplyButton()
//
//        browser.waitForAngular
//        caeListFiltersPage.isLoaded
//        caseListResultsPage.isLoaded
//
//        expect(caeListFiltersPage.getJurisdictionSelectedOptionText().then(function(result) { return result })).toBe("Test2")
//          expect(caseListResultsPage.numberOfCaseListed().then(function(count) { return count })).toBe(5)
//
//          let resultsHash = caseListResultsPage.firstCaseOnPage().then(function(resultsHash) { return resultsHash })
//
//          expect(resultsHash["Case Reference"].toContain("1234-1234-1234-1234"))
//          expect(resultsHash["First Name"].toContain("Tim"))
//          expect(resultsHash["Last Name"].toContain("Smith"))

});

it('Should be possible to select jurisdiction and then default to applicable case type and state', function() {


});


});
