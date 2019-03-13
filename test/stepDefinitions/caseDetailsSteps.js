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

  Then(/^the Event History Timeline should show the following ordered events:$/, async function (dataTable) {
    let events = await [].concat(...dataTable.raw());
    let actualEvents = await caseDetailsPage.getTimelineEvents();

    expect(events).to.deep.equal(actualEvents);
  });

  Then(/^the details box shows the following$/, async function (dataTable) {
    // iterate over data table for details box which is an array of arrays
    for (const detail of dataTable.raw()){
        let key = detail[0];
        let expectedValue = detail[1];
        let actualValue = await caseDetailsPage.getDetailsValueFor(key)

        expect(expectedValue).to.equal(actualValue)
    }
  });

  When(/^I select the '(.*)' event in the Event timeline$/, async function (eventName) {
      await caseDetailsPage.selectTimelineEvent(eventName)
  });

});
