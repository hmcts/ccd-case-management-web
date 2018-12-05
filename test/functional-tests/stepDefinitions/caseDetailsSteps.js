let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  let caseDetailsPage = new CaseDetailsPage();

  Then(/^the latest History event should be '(.*)'$/, async function (expectedEvent) {
      let actualEvent = await caseDetailsPage.getLatestHistoryEvent()
      expect(actualEvent).to.equal(expectedEvent);
  });

  Then(/^the Details table should show 'End State' as '(.*)'$/, async function (expectedState) {
      let actualState = await caseDetailsPage.getEndStateValue()
      expect(actualState).to.equal(expectedState);
  });

  Then('the available actions should be:', async function (dataTable) {
      let expectedActions = await [].concat(...dataTable.raw());
      let actualActions = await caseDetailsPage.getActions();

      expect( actualActions.toString()).to.include( expectedActions);
  });

  Then('the following tabs will be visible:', async function (dataTable) {
      let expectedTabs = await [].concat(...dataTable.raw());
      let actualTabs = await caseDetailsPage.getTabsText();
      expect(expectedTabs).to.deep.equal(actualTabs);
  });

  Then(/^the '(.*)' field will be visible on the '(.*)' tab$/, async function (tabfield, tabName) {
      await caseDetailsPage.clickTab(tabName);
      let fields =await caseDetailsPage.getTabFields()
      expect(fields).to.include(tabfield)
  });

  Then(/^the '(.*)' field will NOT be visible on the '(.*)' tab$/, async function (tabfield, tabName) {
      await caseDetailsPage.clickTab(tabName);
      let fields =await caseDetailsPage.getTabFields()
      expect(fields).to.not.include(tabfield)
  });


});
