let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  Then(/^the latest History event should be '(.*)'$/, async function (expectedEvent) {
      let actualEvent = await new CaseDetailsPage().getLatestHistoryEvent()
      expect(actualEvent).to.equal(expectedEvent);
  });

  Then(/^the Details table should show 'End State' as '(.*)'$/, async function (expectedState) {
      let actualState = await new CaseDetailsPage().getEndStateValue()
      expect(actualState).to.equal(expectedState);
  });

  Then('the available actions should be:', async function (dataTable) {
      let expectedActions = await [].concat(...dataTable.raw());
      let actualActions = await new CaseDetailsPage().getActions();

      expect( actualActions.toString()).to.include( expectedActions);
  });

});
