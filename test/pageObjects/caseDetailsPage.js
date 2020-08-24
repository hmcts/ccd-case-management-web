BasePage = require('./basePage.js');
Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');


class CaseDetailsPage extends BasePage {

  constructor() {
    super();

    this._latestHistoryEventLink = '.EventLogTable tbody > tr:nth-of-type(1) a';
    this._events = 'ccd-event-log-table tbody tr > td:nth-of-type(1)';
    this._endStateValue = '.EventLogDetails tbody > tr:nth-of-type(3) > td > span';
    this._actionsDropdown = new Dropdown('ccd-event-trigger select');
    this._goButton = new Button('ccd-event-trigger button');
    this._tabs = '.tabs-list li';
    this._accordians = 'ccd-read-complex-field-collection-table img';
    this._currentTabFieldKeys = '.tabs-panel:not(.js-hidden) tr > th';
    this._currentTabFieldValues = '.tabs-panel:not(.js-hidden) tr > td span';
    this._currentTabLabelFieldKeys = '.tabs-panel:not(.js-hidden) tr > th markdown';
    this._printButton = '#case-viewer-control-print';
    this._caseReference = 'ccd-case-header .heading-h1';

    // alert bar
    this._alertSuccessBar = '.alert-success';
    this._alertErrorBar = '.alert-error';

    // error summary
    this._errorSummary = 'ccd-case-viewer div > .error-summary';
    this._errorSummaryHeading = 'ccd-case-viewer div > .error-summary .error-summary-heading';
    this._errorSummaryDetails = 'ccd-case-viewer div > .error-summary p';

    this._currentTabNestedFieldKeys = '.tabs-panel:not(.js-hidden) tr > th > td > tbody > tr > th';
    //Details Box
    this._detailsBox = '.EventLog-DetailsPanel';
    this._detailsBoxDate = '.EventLog-DetailsPanel tbody > tr:nth-of-type(1) > td span';
    this._detailsBoxAuthor = '.EventLog-DetailsPanel tbody > tr:nth-of-type(2) > td span';
    this._detailsBoxEndState = '.EventLog-DetailsPanel tbody > tr:nth-of-type(3) > td span';
    this._detailsBoxEvent = '.EventLog-DetailsPanel tbody > tr:nth-of-type(4) > td span';
    this._detailsBoxSummary = '.EventLog-DetailsPanel tbody > tr:nth-of-type(5) > td span';
    this._detailsBoxComment = '.EventLog-DetailsPanel tbody > tr:nth-of-type(6) > td span';
    this._documentLink = 'ccd-read-document-field > a';

  }


  async waitForPageToLoad(){
    await this.waitForElementToBeVisibleWithTimeout($('ccd-case-header'),10000)
  }

  async getCaseReference() {
    return await $(this._caseReference).getText();
  }

  /**
   * Check if case reference is visible
   * @returns {Promise<boolean>}
   */
  async isCaseReferenceVisible() {
    return await $(this._caseReference).isDisplayed();
  }

  /**
   * Check if case reference is matching right format
   * @returns {Promise<boolean>}
   */

  async isCaseReferenceOfCorrectFormat() {
    let caseReferenceText = await $(this._caseReference).getText();
    let matched = caseReferenceText.match(/^#\d{4}-\d{4}-\d{4}-\d{4}$/);
    return matched && matched.length === 1;
  }

  /**
   * Check if print button is ready to click
   * @returns {Promise<boolean>}
   */

  async isPrintButtonReady() {
    try {
      return await $(this._printButton).isDisplayed()
        && await $(this._printButton).isEnabled();
    } catch (e) {
      return false;
    }
  }

  /**
   * Get text value for the Alert Success bar
   * @returns {Promise<String>}
   */
  async getSuccessAlertBarText(){
    let text = await $(this._alertSuccessBar).getText();
    return text
  }

  /**
   * Get text value for the Alert Error bar
   * @returns {Promise<String>}
   */
  async getErrorAlertBarText(){
    let text = await $(this._alertErrorBar).getText();
    return text
  }

  /**
   * Get text value for the latest event in the History tab
   * @returns {Promise<String>}
   */
  async getLatestHistoryEvent(){
    let text = await $(this._latestHistoryEventLink).getText();
    return text
  }

  /**
   * Get the value for 'End State' as listed in the Details box of the History tab
   * @returns {Promise<void>}
   */
  async getEndStateValue(){
    let text = await $(this._endStateValue).getText();
    return text
  }

  /**
   * Get available actions from the 'Next Step' dropdown box
   * @returns String Array
   */
  async getActions(){
    let options = await this._actionsDropdown.getOptionsTextValues()
    return options
  }

  /**
   * Select event from the actions dropdown and click go button
   * @param event
   * @returns {Promise<void>}
   */
  async startEvent(event){
    await this._actionsDropdown.selectFromDropdownByText(event);
    await this._goButton.click()
  }

  /**
   * Click go button only if its text is set to the correct value
   * @param label button label
   * @returns {Promise<void>}
   */
  async clickGoButtonOnlyWhenTextIsSet(label){
    let buttonText = await this._goButton.getText();
    if (buttonText !== label)  {
      throw new CustomError(`Go button text not set to '${label}'`)
    }
    await this._goButton.click()
  }


  async clickTab(tabName){
    let element = await this.getElementWithText(await $$(this._tabs),tabName);
    await element.click();
  }

  /**
   * Get list of tabs
   * @returns Array of Strings
   */
  async getTabsText(){
    let tabs = await $$(this._tabs);
    return await this.getElementsText(tabs);
  }

  /**
   * Get list of event names in the Event History timeline
   * @returns Array of Strings
   */
  async getTimelineEvents(){
    let events = await $$(this._events);
    return await this.getElementsText(events);
  }

  /**
   * Click event box to render details for event. This does NOT click link
   * navigating to event history details
   * @param eventName
   * @returns {Promise<void>}
   */
  async selectTimelineEvent(eventName){
    let events = await $$(this._events);
    let eventFound = false;
    for(const event of events){
      if (await event.getText() === eventName){
        eventFound = true;
        await event.click();
        break;
      }
    }

    if (!eventFound){
      throw new CustomError(`Event ${eventName} not found in event timeline`)
    }
  }

  /**
   * Get list of the fields displayed on the currently viewed tab
   * @returns Array of Strings
   */
  async getTabFields(){
    return await this.getElementsText(await $$(this._currentTabFieldKeys))
  }

  /**
   * Get list of the fields displayed on the currently viewed tab
   * @returns Array of Strings
   */
  async getTabFieldValues() {
    return await this.getElementsText(await $$(this._currentTabFieldValues))
  }

  /**
   * Get field displayed on the currently viewed tab by id
   * @param fieldId
   * @returns Array of Strings
   */
  async getTabLabelFields(){
    return await this.getElementsText(await $$(this._currentTabLabelFieldKeys))
  }

  /**
   * Get list of the fields displayed on the currency viewed tab
   * @returns Array of Strings
   */
  async getTabNestedFields(){
    return await this.getElementsText(await $$(this._currentTabNestedFieldKeys))
  }

  /**
   * Get the value for an item in the details box by parsing the name of the detail
   * @param detailKey
   * @returns {Promise<string>}
   */
  async getDetailsValueFor(detailKey){
    switch (detailKey.toLowerCase()){
      case 'date' : return await $(this._detailsBoxDate).getText();
      case 'author' :  return await $(this._detailsBoxAuthor).getText();
      case 'end state' :  return await $(this._detailsBoxEndState).getText();
      case 'event' :  return await $(this._detailsBoxEvent).getText();
      case 'summary' :  return await $(this._detailsBoxSummary).getText();
      case 'comment' :  return await $(this._detailsBoxComment).getText();
      default:
        throw new CustomError(`could not find a details box item called '${detailKey}'`)
    }

  }

  async clickFirstAccordian(){
    let first = await $$(this._accordians).first();
    await first.click();
  }

  /**
   * Clicking on the document link
   * @returns {Promise<void>}
   */
  async clickDocumentLink(){
    let documentLink = await $(this._documentLink);
    await documentLink.click();
  }

  /**
   * Returns the URL of media viewer loaded in the new tab
   * @returns {Promise<string>}
   */
  async getMediaViewerURL(){
    let handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    await browser.waitForAngularEnabled(false);
    return await browser.getCurrentUrl();
  }

  /**
   * Check that Media Viewer is showing the pdf document.
   * @returns {Promise<void>}
   */
  async pdfContentVisible(){
    let fail = true;
    let failmessage = null;

    for (let i = 1; i < 4; i++){
      try {
        await $('mv-pdf-viewer').isDisplayed();
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i}/3 failed, Retry after wait`);
        await browser.sleep(2000 * i)
      }
    }

    return !fail;
  }

  /**
   * Check that Media Viewer is showing the image document.
   * @returns {Promise<boolean>}
   */
  async imageContentVisible(){

    let fail = true;
    let failmessage = null;

    for (let i = 1; i < 4; i++){
      try {
        await $('mv-image-viewer').isDisplayed();
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i}/3 failed, Retry after wait`);
        await browser.sleep(2000 * i)
      }
    }

    return !fail;

    // return await $('mv-image-viewer').isDisplayed();
  }

  /**
   * Check that Media Viewer is showing the current document as of unsupported type.
   * @returns {Promise<boolean>}
   */
  async documentContentTypeNotSupported() {
    let fail = true;
    let failmessage = null;

    for (let i = 1; i < 4; i++){
      try {
        await $('mv-unsupported-viewer').isDisplayed();
        fail = false;
        break;
      } catch (e) {
        failmessage = e;
        console.log(e);
        console.log(`Attempt ${i}/3 failed, Retry after wait`);
        await browser.sleep(2000 * i)
      }
    }

    return !fail;

  }

  /**
   * Check that Media Viewer is showing an error message.
   * @returns {Promise<void>}
   */
  async mediaViewerIsShowingErrorMessage() {
    return await $('mv-error-message').isDisplayed();
  }

  /**
   * Check if Error Summary is visible
   * @returns {Promise<boolean>}
   */
  async isErrorSummaryVisible() {
    return await $(this._errorSummary).isDisplayed();
  }

  /**
   * Get text value for the Error Summary's header
   * @returns {Promise<String>}
   */
  async getErrorSummaryHeadingText(){
    return await $(this._errorSummaryHeading).getText();
  }

  /**
   * Get text value for the Error Summary's details
   * @returns {Promise<String>}
   */
  async getErrorSummaryDetailsText(){
    return await $(this._errorSummaryDetails).getText();
  }

  /**
   * Check if Go button is present and enabled
   * @returns {Promise<boolean>}
   */
  async isGoButtonEnabled() {
    return await this._goButton.isPresent()
        && await this._goButton.isEnabled();
  }

  /**
   * Get text value for the Go button
   * @returns {Promise<String>}
   */
  async getGoButtonText() {
    return await this._goButton.getText();
  }

}


module.exports = CaseDetailsPage;
