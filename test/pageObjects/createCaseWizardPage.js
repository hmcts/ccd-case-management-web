
BasePage = require('./basePage');
let FieldUtils = require('../utils/fieldUtils.js');
Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField');
DropDown = require('./webdriver-components/dropdown');
CCDAddressUKField = require('./ccd-components/complexTypes/addressComplex.js');
CaseDetailsPage = require('./caseDetailsPage.js');



class CreateCaseWizardPage extends BasePage{

    constructor() {
      super();
      this.continueButton = new Button('ccd-case-edit button[type=submit]');
        this.collectionAddNewElementButtonXPathTemplate = '//ccd-write-collection-field/*[@id="COLLECTION-ID-PLACEHOLDER"]/div/button[1]'; //MySchool_Class
      this.CollectionNewButton = new Button('.button', 'Add new');
      this.answerValueXpathTemplate = '//span[text()="LABEL-TEXT-PLACEHOLDER"]/../following-sibling::td//ccd-field-read-label/*';
      this.answerChangeLinkXpathTemplate = '//span[text()="LABEL-TEXT-PLACEHOLDER"]/../../td[2]/a';
      this.fieldLabels = 'fieldset span';
      this.greyBarFieldLabels = '.show-condition-grey-bar span';
      this.topErrorBox = '.error-summary';
      this.fieldError = '.error-message';
      this.header = 'h1';
      this.fieldUtils =  new FieldUtils();
    }

  /**
   * Check that a particular field type is present on the current wizard page
   * @param fieldDataType
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
    async isFieldPresent(fieldDataType, id){
        return await this.fieldUtils.isFieldPresent(fieldDataType, id);
    }


  /**
   * Fill out a specified field type with a random value
   * @param fieldDataType - the field type we are interacting with
   * @param value - optional value to enter into field if applicable
   * @param id - the field id we are interacting with
   * @returns An object containing data about the field we are interacting with
   * including the value in which we have entered
   */
    async interactWithField(fieldDataType, value) {
      return await this.fieldUtils.interactWithField(fieldDataType, value);
    }

    async interactWithField(fieldDataType, value, id){
      return await this.fieldUtils.interactWithField(fieldDataType, value, id);
    }

    async getFieldDetails(fieldDataType, fieldId) {
      return await new FieldUtils().getFieldDetails(fieldDataType, fieldId);
    }

    async isTextFieldVisibleById(fieldId) {
      return await this.fieldUtils.textFieldIsVisible(fieldId);
    }

  async isNumberFieldVisibleById(fieldId) {
    return await this.fieldUtils.numberFieldIsVisible(fieldId);
  }

    async isCaseLinkFieldVisibleById(fieldId) {
      return await this.fieldUtils.caseLinkFieldIsVisible(fieldId);
    }

    async isFixedListFieldVisibleById(fieldId) {
      return await this.fieldUtils.fixedListFieldIsVisible(fieldId);
    }


    async isDateFieldVisibleById(fieldId) {
      return await this.fieldUtils.dateFieldIsVisible(fieldId);
    }


    async isYesOrNoFieldVisibleById(fieldId) {
      return await this.fieldUtils.fieldYesNoIsVisible(fieldId);
    }


    async getFieldValue(dataType){
      return await new FieldUtils().getFieldValue(dataType);
    }

    async getListOrder(listDataType){
      return await new FieldUtils().getListOptions(listDataType);
    }

    async clickCollectionAddNewButton(collectionFieldId) {
      let xpathLocator = await this.collectionAddNewElementButtonXPathTemplate.replace('COLLECTION-ID-PLACEHOLDER', collectionFieldId);
      await element(by.xpath(xpathLocator)).click();
    }

  async isCollectionAddNewButtonEnabled(collectionFieldId) {
    let xpathLocator = await this.collectionAddNewElementButtonXPathTemplate.replace('COLLECTION-ID-PLACEHOLDER', collectionFieldId);
    return await element(by.xpath(xpathLocator)).isEnabled();
  }

  /**
   * Get contents of number field
   * @returns {Promise<Promise<*>|Promise<String>>}
   */
    async getNumberFieldValue(){
      return await this.fieldUtils.getNumberFieldValue();
    }

  /**
   * Button to progress the case, may be called continue or may be the final
   * Submit button with a different name as it can be dynamic
   * @returns {Promise<void>}
   */
    async clickContinueButton(){
        await this.continueButton.click();
    }

  /**
   * Final button to submit the case/event
   * @returns {Promise<void>}
   */
    async clickSubmitCaseButton(){
        await this.continueButton.click();
        await new CaseDetailsPage().waitForPageToLoad();
    }

  /**
   * Strips out (Optional) string if present to return just label value
   * @returns {Promise<Array>}
   */
  async getFieldLabels(){
      let labels = [];
      for (const label of await this.getFullFieldLabels()){
          labels.push(label.replace(' (Optional)', ''))
      }

      return labels;
    }

  /**
   * Includes (Optional) if present
   * @returns {Promise<Array>}
   */
  async getFullFieldLabels(){
      let labelElements = await $$(this.fieldLabels);
      let labels = [];
      for (const labelElem of labelElements){
          labels.push(await labelElem.getText())
      }
      return labels;
    }

    async getGreyBarFieldLabels(){
      let labelElements = await $$(this.greyBarFieldLabels);
      let labels = [];
      for (const labelElem of labelElements){
        let labelText = await labelElem.getText();
        let label = labelText.replace(' (Optional)', '');
        labels.push(label)
      }

      return labels;
    }

    async getCheckYourAnswersValueByLabel(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerValueXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);

      return await element(by.xpath(xpathLocator.toString())).getText();
    }

    async clickChangeLink(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerChangeLinkXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);
      await element(by.xpath(xpathLocator)).click();
    }

    async getPageHeader(){
      return await $(this.header).getText();
    }

    async errorSummaryDispalyed() {
      return await this.elementDisplayed($(this.topErrorBox));
    }

    async fieldErrorDispalyed() {
      return await this.elementDisplayed($(this.fieldError));
    }

    async continueButtonEnabled(){
      return await this.continueButton.isEnabled();
    }

    async continueButtonDisplayed(){
      return await this.continueButton.isDisplayed();
    }

    async clickGenericCollectionAddNewButton() {
      await this.CollectionNewButton.click();
    }

    async amOnCheckYourAnswersPage(){
      let url = await browser.getCurrentUrl();
      return url.includes('/submit')
    }

}

module.exports = CreateCaseWizardPage;
