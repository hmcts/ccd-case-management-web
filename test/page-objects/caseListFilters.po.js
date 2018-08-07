BrowserUtils = require('../utils/browser.utils.js')

class CaseListFilters extends BrowserUtils{

    constructor() {

       super("", false);

       this._clfJurisdiction = by.css('#wb-jurisdiction');
       this._clfJurisdictionCss = '#wb-jurisdiction';
       this._clfJurisdictionOptions = by.css('#wb-jurisdiction option');

       this._clfCaseType = by.css('#wb-case-type');
       this._clfCaseTypeCss = '#wb-case-type';
       this._clfCaseTypeOptions = by.css('#wb-case-type option');

       this._clfState = by.css('#wb-case-state');
       this._clfStateCss = '#wb-case-state';
       this._clfStateOptions = by.css('#wb-case-state option');

       this._pageTitle = by.css('.global-display > cut-body > div h1');

       this._clfApplyButton = by.css('.global-display .display-left button');

    }

    isLoaded() {

        browser.waitForAngular

    }

    getPageTitleLabel() {

        return element(this._pageTitle).getText()
    }

    jurisdictionDropDownIsClickable() {
        return element(this._clfJurisdiction).isDisplayed()
    }

    getJurisdictionSelectedOptionText() {

         return this.getSelectedOption(this._clfJurisdictionCss).then(function(v) {  return v } )

    }

    caseTypeDropDownIsClickable() {
        return element(this._clfCaseType).isDisplayed()
    }

    getCaseTypeSelectedOptionText() {


         return this.getSelectedOption(this._clfCaseTypeCss).then(function(v) {  return v } )

    }

    stateDropDownIsClickable() {
        return element(this._clfState).isDisplayed()
    }

    getCaseStateSelectedOptionText() {

         return this.getSelectedOption(this._clfStateCss).then(function(v) {  return v } )

    }

    selectJurisdictionOptionByText(optionText) {

         this.selectOption(this._clfJurisdictionOptions, optionText)

    }

    selectCaseTypeOptionByText(optionText) {

         this.selectOption(this._clfCaseTypeOptions, optionText)

    }

    selectStateOptionByText(optionText) {

         this.selectOption(this._clfStateOptions, optionText)

    }

    applyButtonIsClickable() {

        return element(this._clfApplyButton).isDisplayed()

    }

    clickApplyButton() {

         browser.waitForAngular
         element(this._clfApplyButton).click()
         browser.waitForAngular

    }

}

module.exports = CaseListFilters

