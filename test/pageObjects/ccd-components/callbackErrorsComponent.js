BasePage = require('../basePage.js');


/**
 * Class to encapsulate functionality of the Callback Errors component which is common to many
 * pages and abstracted into it's own class
 */
class CallbackErrorsComponent extends BasePage {

  constructor(){
    super();

    this._errorSummary = 'ccd-callback-errors .error-summary';
    this._headings = 'ccd-callback-errors .error-summary-heading';
    this._errors = 'ccd-callback-errors ul#errors li';
    this._warnings = 'ccd-callback-errors ul#warnings li';
  }

  /**
   * Check that the component is showing error summary.
   * @returns {Promise<boolean>}
   */
  async isDisplayed(){
    return await this.elementDisplayed($(this._errorSummary));
  }

  /**
   * Check that the component is showing the errors heading.
   * @returns {Promise<boolean>}
   */
  async isDisplayingErrors(){
    let headings = await $$(this._headings);
    let headingTexts = await this.getElementsText(headings);

    return headingTexts.includes('Errors');
  }

  /**
   * Check that the component is showing the warnings heading.
   * @returns {Promise<boolean>}
   */
  async isDisplayingWarnings(){
    let headings = await $$(this._headings);
    let headingTexts = await this.getElementsText(headings);

    return headingTexts.includes('Warnings');
  }

  /**
   * Get list of the errors displayed by the component
   * @returns Array of Strings
   */
  async getErrors(){
    let errors = await $$(this._errors);
    return await this.getElementsText(errors);
  }

  /**
   * Get list of the warnings displayed by the component
   * @returns Array of Strings
   */
  async getWarnings(){
    let warnings = await $$(this._warnings);
    return await this.getElementsText(warnings);
  }
}

module.exports = CallbackErrorsComponent;
