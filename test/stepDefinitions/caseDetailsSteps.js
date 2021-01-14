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

  Then('no tabs will be visible', async function () {
      let actualTabs = await caseDetailsPage.getTabsText();
      expect(actualTabs.length).to.equal(0)
  });

  Then('the success case created bar will be visible', async function() {
      let alertBarText = await caseDetailsPage.getSuccessAlertBarText();
      expect(alertBarText).to.match(/^Case #\d{4}-\d{4}-\d{4}-\d{4} has been created\.$/);
  });

  Then('the callback error or warnings bar will be visible', async function() {
      let alertBarText = await caseDetailsPage.getErrorAlertBarText();
      expect(alertBarText).to.equal('Unable to proceed because there are one or more callback Errors or Warnings');
  });

  Then(/^the callback validation error summary is displayed$/, async function () {
    expect(await caseDetailsPage.isErrorSummaryVisible()).to.be.true;
    expect(await caseDetailsPage.getErrorSummaryHeadingText()).to.equal('The callback data failed validation');
    expect(await caseDetailsPage.getErrorSummaryDetailsText()).to.equal('Unable to proceed because there are one or more callback Errors or Warnings');
  });

  Then(/^the '(.*)' field will be visible on the '(.*)' tab$/, async function (tabfield, tabName) {
    await caseDetailsPage.clickTab(tabName);
    let fields = await caseDetailsPage.getTabFields();
    expect(fields).to.include(tabfield);
  });

  Then(/^the following fields will be visible:$/, async function (dataTable) {
      let expectedFields = await [].concat(...dataTable.raw());
      let actualFields = await caseDetailsPage.getTabFields();
      for (const expectedField of expectedFields) {
          expect(actualFields).to.include(expectedField);
      }
  });

  Then(/^the following field values will be visible:$/, async function (dataTable) {
      let expectedFields = await [].concat(...dataTable.raw());
      let actualFieldValues = await caseDetailsPage.getTabFieldValues();
      for (const expectedField of expectedFields) {
        expect(actualFieldValues).to.include(expectedField);
      }
  });

  Then(/^the following fields will NOT be visible:$/, async function (dataTable) {
    let expectedFields = await [].concat(...dataTable.raw());
    let actualFields = await caseDetailsPage.getTabFields();
    for (const expectedField of expectedFields) {
      expect(actualFields).to.not.include(expectedField);
    }
  });

  Then(/^the print button will be visible$/, async function () {
    expect(await caseDetailsPage.isPrintButtonReady()).to.be.true;
  });

  Then(/^the print button will not be visible$/, async function () {
    expect(await caseDetailsPage.isPrintButtonReady()).to.be.false;
  });

  Then(/^the case reference will be visible and formatted well$/, async function () {
    expect(await caseDetailsPage.isCaseReferenceVisible()).to.be.true;
    expect(await caseDetailsPage.isCaseReferenceOfCorrectFormat()).to.be.true;
  });

  Then(/^the '(.*)' field will NOT be visible on the '(.*)' tab$/, async function (tabfield, tabName) {
    await caseDetailsPage.clickTab(tabName);
    let fields = await caseDetailsPage.getTabFields();
    expect(fields).to.not.include(tabfield);
  });

  Then(/^the '(.*)' label will be visible on the '(.*)' tab$/, async function (labelValue, tabName) {
    await caseDetailsPage.clickTab(tabName);
    let fields = await caseDetailsPage.getTabLabelFields();
    expect(fields[0]).to.match(new RegExp(labelValue));
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

  When(/^I navigate to tab '(.*)'$/, async function (tabName) {
    await caseDetailsPage.clickTab(tabName);
  });

  When(/^I click on its first accordion on the '(.*)' tab$/, async function (tabName) {
    await caseDetailsPage.clickTab(tabName);
    await caseDetailsPage.clickFirstAccordian();
  });

  When(/^I start the event '(.*)'$/, async function(event) {
    await caseDetailsPage.startEvent(event);
  });

  When(/^I click the document link$/, async function () {
    await caseDetailsPage.clickDocumentLink();
  });

  Then(/^the media viewer is opened in a new tab$/, async function () {
    let newTabUrl = await caseDetailsPage.getMediaViewerURL();
    expect(newTabUrl.includes('/media-viewer')).to.be.true;
  });

  Then(/^the pdf document is visible in the new tab$/, {timeout: 60 * 1000}, async function () {
    let visible = await caseDetailsPage.pdfContentVisible();
    expect(visible).to.be.true;
  });

  Then(/^the image document is visible in the new tab$/, {timeout: 60 * 1000}, async function () {
    let visible = await caseDetailsPage.imageContentVisible();
    expect(visible).to.be.true;
  });

  When(/^the document is shown as unsupported in the new tab$/, {timeout: 60 * 1000}, async function () {
    let shownUnsupported = await caseDetailsPage.documentContentTypeNotSupported();
    expect(shownUnsupported).to.be.true;
  });

  Then(/^the go button is disabled$/, async function () {
    let enabled = await caseDetailsPage.isGoButtonEnabled();
    let text = await caseDetailsPage.getGoButtonText();
    expect(enabled).to.be.false;
    expect(text).to.equals('Go');
  });

});
