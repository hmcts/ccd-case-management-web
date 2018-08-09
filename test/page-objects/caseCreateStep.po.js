BrowserUtils = require('../utils/browser.utils.js')

class CaseCreateStep extends BrowserUtils {

    constructor() {

      super(by.css('.ng-untouched.ng-pristine.ng-valid p a'), false);

       this._pageTitle = by.css('ccd-event-trigger-header h3');
       this._continueButton = by.css('.form-group.form-group-related .button[type=submit]');
       this._previousButton = by.css('.form-group.form-group-related .button[type="button"]');
       this._cancelLink = by.css('.ng-untouched.ng-pristine.ng-valid p a');

       this._textInputFieldLabel = by.css('ccd-write-text-field div .form-label-bold');
       this._textInputFieldHint = by.css('ccd-write-text-field div .form-hint');
       this._textInputFieldBox = by.css('ccd-write-text-field div input');
       this._textInputFieldBoxCss = 'ccd-write-text-field div input';

       this._emailInputFieldLabel = by.css('ccd-write-email-field div .form-label-bold');
       this._emailInputFieldHint = by.css('ccd-write-email-field div .form-hint');
       this._emailInputFieldBox = by.css('ccd-write-email-field div input');
       this._emailInputFieldBoxCss = 'ccd-write-email-field div input';

       this._numberInputFieldLabel = by.css('ccd-write-number-field div .form-label-bold');
       this._numberInputFieldHint = by.css('ccd-write-number-field div .form-hint');
       this._numberInputFieldBox = by.css('ccd-write-number-field div input');
       this._numberInputFieldBoxCss = 'ccd-write-number-field div input';

       this._phoneNumberInputFieldLabel = by.css('ccd-write-phone-uk-field div .form-label-bold');
       this._phoneNumberInputFieldHint = by.css('ccd-write-phone-uk-field div .form-hint');
       this._phoneNumberInputFieldBox = by.css('ccd-write-phone-uk-field div input');
       this._phoneNumberInputFieldBoxCss = 'ccd-write-phone-uk-field div input';

       this._yesOrNoButtonsLabel = by.css('ccd-write-yes-no-field div legend .form-label-bold');
       this._yesOrNoButtonsHint = by.css('ccd-write-yes-no-field div legend .form-hint');
       this._yesOrNoButton_YesOption = by.css('ccd-write-yes-no-field div #YesOrNoField-Yes');
       this._yesOrNoButton_NoOption = by.css('ccd-write-yes-no-field div #YesOrNoField-No');
       this._yesOrNoButtonSelected = by.css('ccd-write-yes-no-field div .multiple-choice.selected');

    }

    isLoaded() {

        browser.waitForAngular

    }

    getPageTitleLabel() {

        return element(this._pageTitle).getText()
    }

    continueButtonIsClickable() {

        return this.clickableAndWithLabel(this._continueButton, 'Continue')

    }

    continueButtonIsExists() {

    return element(this._continueButton).isPresent()

    }

    clickContinueButton() {
         expect(this.continueButtonIsClickable()).toBe(true)
         browser.waitForAngular
         element(this._continueButton).click()
         browser.waitForAngular

    }

    previousButtonIsClickable() {

        return this.clickableAndWithLabel(this._previousButton, 'Previous')

    }

    previousButtonIsEnabled() {

        return this.enabledAndWithLabel(this._previousButton, 'Previous')

    }

    clickPreviousButton() {

        browser.waitForAngular
        element(this._previousButton).click()
        browser.waitForAngular

    }

    cancelLinkIsClickable() {

        return this.clickableAndWithLabel(this._cancelLink, 'Cancel')

    }

    clickCancelLink() {

        browser.waitForAngular
        element(this._cancelLink).click()
        browser.waitForAngular

    }

    submitButtonIsClickable() {

        return this.clickableAndWithLabel(this._submitButton, 'Submit')

    }

    clickSubmitButton() {

        expect(this.submitButtonIsClickable()).toBe(true)
        browser.waitForAngular
        element(this._submitButton).click()
        browser.waitForAngular

    }

    getTextInputFieldLabel() {

        return element(this._textInputFieldLabel).getText()

    }

    getTextInputFieldHint() {

        return element(this._textInputFieldHint).getText()

    }

    getTextInputFieldBoxValue() {

        return this.getValueByElementCss(this._textInputFieldBoxCss)

    }

    setTextInputFieldBoxValue(text) {

        element(this._textInputFieldBox).clear().sendKeys(text)

    }

    getNumberInputFieldLabel() {

        return element(this._numberInputFieldLabel).getText()

    }

    getNumberInputFieldHint() {

        return element(this._numberInputFieldHint).getText()

    }

    getNumberInputFieldBoxValue() {

        return this.getValueByElementCss(this._numberInputFieldBoxCss)

    }

    setNumberInputFieldBoxValue(text) {

        element(this._numberInputFieldBox).clear().sendKeys(text)

    }

    getPhoneNumberInputFieldLabel() {

        return element(this._phoneNumberInputFieldLabel).getText()

    }

    getPhoneNumberInputFieldHint() {

        return element(this._phoneNumberInputFieldHint).getText()

    }

    getPhoneNumberInputFieldBoxValue() {

        return this.getValueByElementCss(this._phoneNumberInputFieldBoxCss)

    }

    setPhoneNumberInputFieldBoxValue(text) {

        element(this._phoneNumberInputFieldBox).clear().sendKeys(text)

    }


    getYesOrNoButtonsLabel() {

        return element(this._yesOrNoButtonsLabel).getText()

    }

    getYesOrNoButtonsHint() {

        return element(this._yesOrNoButtonsHint).getText()

    }

    isYesOrNoButtonSelected() {

       return element(this._yesOrNoButtonSelected).isPresent()

    }

    getYesOrNoButtonSelectedText() {

        return element(this._yesOrNoButtonSelected).getText()

    }

    clickYesButton() {

        element(this._yesOrNoButton_YesOption).click()

    }

    clickNoButton() {

        element(this._yesOrNoButton_NoOption).click()

    }

    getEmailInputFieldLabel() {

        return element(this._emailInputFieldLabel).getText()

    }

    getEmailInputFieldHint() {

        return element(this._emailInputFieldHint).getText()

    }

    getEmailInputFieldBoxValue() {

        return this.getValueByElementCss(this._emailInputFieldBoxCss)

    }

    setEmailInputFieldBoxValue(text) {

        element(this._emailInputFieldBox).clear().sendKeys(text)

    }

    continueBy(noOfSteps) {

           let caseCreateStepPage = new CaseCreateStep

           let i = 1

           for (i=1; i <=noOfSteps; ++i) {

           browser.waitForAngular

           caseCreateStepPage.continueButtonIsExists().then(function(doesExist) {

              browser.waitForAngular

              if (doesExist) {

                      caseCreateStepPage.continueButtonIsClickable().then(function(isClickable) {

                          browser.waitForAngular

                          if (isClickable) { caseCreateStepPage.clickContinueButton() }

                      })

              }

              })

           }

    }

}

module.exports = CaseCreateStep

