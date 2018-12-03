CustomError = require('../utils/errors/custom-error.js');

const DEFAULT_TIMEOUT = 5000;
const EC = protractor.ExpectedConditions;

class BasePage {


    constructor(locator) {
        if (locator != null){
            let EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(element(locator)), );
        }

        this._pageHeader= 'h1';

        this._formFields = 'ccd-case-edit-form > div > * > *';
        this._optionalClass = 'ng-valid';
        this._mandetoryClass = 'ng-invalid';
    }


  /**
   * Wait a designated amount of time for an element to be visible before timing out
   * and throwing an error
   * @param element to wait for
   * @param timeout - time to wait for element to be visible
   */
    async waitForElementToBeVisibleWithTimeout(element, timeout){
      try {
          await browser.wait(await EC.visibilityOf(element), timeout);
        } catch (e) {
          let message = `timed out after ${timeout} waiting for element`
          throw new CustomError(message, e)
        }
    }

    async waitForElementToBeVisible(element){
        await this.waitForElementToBeVisibleWithTimeout(element, DEFAULT_TIMEOUT);
    }

    async waitForElementToBeVisibleByLocator(locator){
      await this.waitForElementToBeVisibleWithTimeout(element(locator), DEFAULT_TIMEOUT);
    }


  /**
   * Wait for an element to be clickable or throw an error.
   * will wait for the DEFAULT_TIMEOUT value of 5000ms
   * @param element to wait to be clickable
   */
    async waitForElementToBeClickable(element){
      try {
        await browser.wait(await EC.elementToBeClickable(element), DEFAULT_TIMEOUT);
      } catch (e) {
        let message = `timed out after ${timeout} waiting for element ${element} to be clickable`;
        throw new CustomError(message, e)
      }
    }


    async waitForUrl(expectedUrlRegex){
      let currentURL = await browser.getCurrentUrl();
      await browser.wait(EC.urlContains(expectedUrlRegex))
        .catch(err => console.log(`Failed to load page, Expected URL fragment: ${expectedUrlRegex} | Actual URL: ${currentURL}`));
    }

  /**
   * Checks if an element is displayed. Will catch a NoSuchElementError exception and return false instead
   * @param element
   * @returns Boolean
   */
    async elementDisplayed(element){
      let displayed = null;
        try {
            displayed = await element.isDisplayed();
        } catch (e) {
            if (e.name === 'NoSuchElementError'){
                displayed = false; //element not present so not displayed
            }
            else {
                throw new CustomError(e);
            }
        }

      return displayed
    }

  /**
   * Get page header title
   * @returns String
   */
  async getPageHeader(){
      return await $(this._pageHeader).getText();
    }


}

module.exports = BasePage;
