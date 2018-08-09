BrowserUtils = require('../../../utils/browser.utils.js')
CaseListResults = require('../../../page-objects/CaseListResults.po.js')
Login = require('../../../page-objects/login.po')
CaseListFilters = require('../../../page-objects/caseListFilters.po')

describe('Case List - Basic Page Structure', function() {

beforeEach(function(){

   browser.get(process.env.TEST_FRONTEND_URL || "http://localhost:3451")
   let browserUtils = new BrowserUtils("", false)
   browserUtils.waitForUrlToChangeTo(RegExp("list"))

});

afterEach(function(){

});


it('Should default the jurisdiction, case type and state for the CCD user', function() {

        let caseListFiltersPage = new CaseListFilters;

        expect(caseListFiltersPage.getJurisdictionSelectedOptionText().then(function(result) { return result })).toContain("Test")
        expect(caseListFiltersPage.getCaseTypeSelectedOptionText().then(function(result) { return result })).toContain("Test Address Book Case")
        expect(caseListFiltersPage.getCaseStateSelectedOptionText().then(function(result) { return result })).toContain("Case created")

})


it('Should display column names for listed cases', function() {

        let caseListResultsPage = new CaseListResults;
        let caseListFiltersPage = new CaseListFilters;

        caseListFiltersPage.isLoaded()
        browser.sleep(3000)
        caseListResultsPage.isLoaded()

        expect(caseListResultsPage.getResultsListColumnHeadingText(0)).toContain("Case reference")
        expect(caseListResultsPage.getResultsListColumnHeadingText(1)).toContain("First name")
        expect(caseListResultsPage.getResultsListColumnHeadingText(2)).toContain("Last name")
        expect(caseListResultsPage.getResultsListColumnHeadingText(3)).toContain("Link to evidence")
        expect(caseListResultsPage.getResultsListColumnHeadingText(4)).toContain("Address")

})

//it('Should have cases listed', function() {
//
//        let caseListResultsPage = new CaseListResults;
//        let caseListFiltersPage = new CaseListFilters;
//
//        caseListFiltersPage.isLoaded();
//        browser.sleep(3000)
//        caseListResultsPage.isLoaded();
//
//        expect(caseListResultsPage.getResultsListRowCount()).toBe(5)
//
//});


//it('Should have a case listed with values in each column', function() {
//
//        let caseListResultsPage = new CaseListResults;
//        let caseListFiltersPage = new CaseListFilters;
//
//        caseListResultsPage.isLoaded();
//        browser.sleep(3000)
//        caseListFiltersPage.isLoaded();
//
//        expect(caseListResultsPage.getResultsListRowText(1)).toContain("Janet")
//        expect(caseListResultsPage.getResultsListRowText(1)).toContain("Parker")
//        expect(caseListResultsPage.getResultsListRowText(1)).toContain("Example_filename.xyz")
//
//});

});
