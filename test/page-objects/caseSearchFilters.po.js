BrowserUtils = require('../utils/browser.utils.js')

class CaseSearchFilters extends BrowserUtils {

    constructor() {

       super(by.css('#s-jurisdiction'), true);

       this._clfJurisdiction = by.css('#s-jurisdiction');
       this._clfJurisdictionCss = '#s-jurisdiction';
       this._clfJurisdictionOptions = by.css('#s-jurisdiction option');

       this._clfCaseType = by.css('#s-case-type');
       this._clfCaseTypeCss = '#s-case-type';
       this._clfCaseTypeOptions = by.css('#s-case-type option');

       this._clfState = by.css('#s-case-state');
       this._clfStateCss = '#s-case-state';
       this._clfStateOptions = by.css('#s-case-state option');

       this._pageTitle = by.css('.container-fluid ng-component h3');

       this._clfApplyButton = by.css('.ng-pristine.ng-valid.ng-touched .button');

    }

    isLoaded() {

        browser.waitForAngular
        this.waitForPageElemToLoad(element(this._pageTitle))

    }

    getPageTitleLabel() {

        return element(this._pageTitle).getText()
    }

    getSelectedOption(dropDownCss) {

        let valueOfSelectedOption =
        this.getValueByElementId(this._clfJurisdictionCss)

        let cssForOption = valueOfSelectedOption
                  .then(function(css){return dropDownCss + ' option[value="' +  css + '"]'})

        return cssForOption
                  .then(function(css) { return element(by.css(css)).getText()})

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

module.exports = CaseSearchFilters

