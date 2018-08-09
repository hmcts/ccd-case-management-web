BrowserUtils = require('../../../utils/browser.utils.js')
CaseListResults = require('../../../page-objects/CaseListResults.po.js')
Login = require('../../../page-objects/login.po')
CaseListFilters = require('../../../page-objects/caseListFilters.po')

describe('Case List - State', function() {

beforeEach(function(){

   browser.get(process.env.TEST_FRONTEND_URL || "http://localhost:3451")

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
