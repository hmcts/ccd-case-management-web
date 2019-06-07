let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');
let baseSteps = require('./baseSteps.js');
CustomError = require('../utils/errors/custom-error.js');
let TestData = require('../utils/TestData.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {

  let caseWizardPage = new CreateCaseWizardPage();
  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();

  async function createCase(){
    //todo post to data store
    await baseSteps.navigateToCreateCasePage();
    await baseSteps.fillOutAndSubmitForm();
  }

  When(/^I create the case$/, async function () {
      await createCase();
  });

  Given(/^there are cases listed on the case list page for that case type$/, async function () {
      await createCase();
  });

  When(/^I have navigated to a case in the state 'Case created'$/, async function () {
    await createCase();
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await baseSteps.navigateToCreateCasePage();
  });

  Then(/^I should see a '(.*)' field$/, async function(dataType) {
      let fieldDisplayed = await new CreateCaseWizardPage().isFieldPresent(dataType);
      expect(fieldDisplayed).to.be.true;
  });

  Given(/^I have filled out the '(.*)' field$/, async function(dataType) {
    await baseSteps.navigateToCreateCasePage()
    this.fieldObject = await new CreateCaseWizardPage().interactWithField(dataType);
  });

  When(/^I navigate to the 'check your answers' form page$/, async function() {
      await new CreateCaseWizardPage().clickContinueButton();
  });

  Then(/^I should see my value displayed$/, async function() {
    let label = await this.fieldObject.label;
    let expectedValue = await this.fieldObject.checkYourAnswersValue.toString();
    let value = await new CreateCaseWizardPage().getCheckYourAnswersValueByLabel(label);
    expect(expectedValue).to.equal(value);
  });

  When(/^I select and submit the event '(.*)'$/, async function (event) {
    await new CaseDetailsPage().startEvent(event);
    await baseSteps.fillOutAndSubmitForm();
  });


  When(/^I click the 'Create a case' button$/, async function () {
    await caseListPage.clickCreateNewCaseButton();
  });

  Then(/^I will be navigated to the 'Create Case' page$/, async function () {
    expect(await new CreateCaseStartPage().amOnPage()).to.be.true
  });

  //---- complexTypes
  When(/^I populate the form with the school data$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo('Yes');
  });

  When(/^I populate the form with the school data with a support YesOrNo field set to '(.*)'$/, async function (supportAnswer) {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo(supportAnswer);
  });

  Then(/^'Is child autistic' field should not be visible$/, async function () {
    expect(await caseWizardPage.isYesOrNoFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_IsAutistic')).to.be.true;
  });

  Then(/^'Is child autistic' field should be visible$/, async function () {
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_IsAutistic')).to.be.true;
  });

  Then(/^only the fields defined in EventToComplexTypes sheet should be visible$/, async function () {
    expect(await caseWizardPage.isTextFieldVisibleById('MySchool_Name')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('MySchool_ProvidesAutisticChildrenSupport')).to.be.true;

    expect(await caseWizardPage.isTextFieldVisibleById('MySchool_Class_0_ClassName')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_MotherFullName')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_MotherAge')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_FatherFullName')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_FatherAge')).to.be.true;

    expect(await caseWizardPage.isTextFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_ChildFullName')).to.be.true;
    expect(await caseWizardPage.isFixedListFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_ChildGender')).to.be.true;
    expect(await caseWizardPage.isDateFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildDOB')).to.be.true;

    expect(await caseWizardPage.isTextFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__AddressLine1')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__AddressLine2')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__AddressLine3')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__PostTown')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__County')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__PostCode')).to.be.true;
    expect(await caseWizardPage.isTextFieldHiddenById('MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__Country')).to.be.true;

    expect(await caseWizardPage.isYesOrNoFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_IsAutistic')).to.be.true;
    expect(await caseWizardPage.isCaseLinkFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_AutisticChildCaseNumber')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('MySchool_Class_0_ClassMembers_0_Children_0_NeedsSupport')).to.be.true;
  });

  Then(/^the fields should have label, hint text and displayContext updated$/, async function () {
    expect(await caseWizardPage.fieldLabelContains('text', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildFullName', 'Child full name (UPDATED)')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('text', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildFullName', 'Child hint (UPDATED)')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('text', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildFullName', '(Optional)')).to.be.false;
    expect(await caseWizardPage.fieldLabelContains('text', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__AddressLine1', 'Building and Street (Optional)')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('fixed-list', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildGender', 'Child Gender')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('fixed-list', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildGender', '(Optional)')).to.be.false;
    expect(await caseWizardPage.fieldLabelContains('case-link', 'MySchool_Class_0_ClassMembers_0_Children_0_AutisticChildCaseNumber', 'Autistic child case number reference')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('case-link', 'MySchool_Class_0_ClassMembers_0_Children_0_AutisticChildCaseNumber', '(Optional)')).to.be.false;
    expect(await caseWizardPage.fieldLabelContains('yes-no', 'MySchool_Class_0_ClassMembers_0_Children_0_IsAutistic', 'Is the child autistic? (Optional)')).to.be.true;
    expect(await caseWizardPage.fieldLabelContains('yes-no', 'MySchool_Class_0_ClassMembers_0_Children_0_NeedsSupport', 'Does the child needs support? (Optional)')).to.be.true;
  });

  //---- conditionals

  When(/^I meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  When(/^I do NOT meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.interactWithField('text','dontshowmethemoney');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  Then(/^the field with label '(.*)' is not visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.not.include(expectedLabel);
  });

  Then(/^the field with label '(.*)' is visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.include(expectedLabel);
  });

  Then(/^the field with label '(.*)' is visible with grey bar$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getGreyBarFieldLabels();
    expect(labels).to.include(expectedLabel);
  });

  Then(/^the field with label '(.*)' is visible without grey bar$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getGreyBarFieldLabels();
    expect(labels).to.not.include(expectedLabel);
  });

  Then(/^I will not be on the '(.*)' page$/, async function (expectedPageHeader) {
    let pageHeader = await caseWizardPage.getPageHeader();
    expect(pageHeader).to.not.equal(expectedPageHeader);
  });

  Then(/^I will be on the '(.*)' page$/, async function (expectedPageHeader) {
    await IAmOnPageWithHeader(expectedPageHeader)
  })

  Then(/^the '(.*)' page should be displayed$/, async function(expectedPageHeader) {
    await IAmOnPageWithHeader(expectedPageHeader);
  });

  async function IAmOnPageWithHeader(expectedPage){
    let pageHeader = await caseWizardPage.getPageHeader();
    expect(pageHeader).to.equal(expectedPage);
  }

  Given(/^I have filled out the create case filters$/, async function () {
    await caseListPage.getNavBarComponent().clickCreateCaseLink();
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
  });

  When(/^I click the 'Start' button$/, async function () {
    await createCaseStartPage.clickStartButton();
  });

  Then(/^I will be navigated to 'Create Case' wizard form page$/, async function () {
    await browser.getCurrentUrl()
      .then(function(currentUrl) {
        expect(currentUrl.indexOf('createCaseSingleFormPage') > -1).to.be.true
      });
  });

  async function populateFormDataWithSupportFieldSetTo(supportAnswer) {
    await caseWizardPage.interactWithField('text', 'Busy Bees', 'MySchool_Name');
    await caseWizardPage.interactWithField('yes-no', supportAnswer, 'MySchool_ProvidesAutisticChildrenSupport');
    await caseWizardPage.clickCollectionAddNewButton('MySchool_Class');
    await caseWizardPage.interactWithField('text', 'Class one', 'MySchool_Class_0_ClassName');
    await caseWizardPage.clickCollectionAddNewButton('MySchool_Class_0_ClassMembers');
    await caseWizardPage.clickCollectionAddNewButton('MySchool_Class_0_ClassMembers_0_Children');
    await caseWizardPage.interactWithField('text', 'Joe Kember', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildFullName');
    await caseWizardPage.interactWithField('fixed-list', ' Male ', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildGender');
    await caseWizardPage.interactWithField('text', '150 Boyson Road', 'MySchool_Class_0_ClassMembers_0_Children_0_ChildAddress__AddressLine1');
    if (supportAnswer === 'Yes') {
      await caseWizardPage.interactWithField('yes-no', 'Yes', 'MySchool_Class_0_ClassMembers_0_Children_0_IsAutistic');
    }
    await caseWizardPage.interactWithField('case-link', '1111222233334444', 'MySchool_Class_0_ClassMembers_0_Children_0_AutisticChildCaseNumber');
  }

  Given(/^I have submitted a case with nested collection data$/, async function(){
    await baseSteps.navigateToCreateCasePage()
    await caseWizardPage.clickGenericCollectionAddNewButton();
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have submitted a case with nested collection data containing (\d+) items$/, async function(numberOfItems){
    await baseSteps.navigateToCreateCasePage()
    for (let i = 0; i < numberOfItems; i++) {
      await caseWizardPage.clickGenericCollectionAddNewButton();
    }
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have submitted a case with a collection of complex with a complex data$/, async function(){
    await baseSteps.navigateToCreateCasePage()
    await caseWizardPage.clickGenericCollectionAddNewButton();
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have created a case with fixed list item$/, async function() {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField("text");
    await caseWizardPage.interactWithField("fixed-list", "Marriage");
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  When(/^The fixed list item is hidden$/, async function() {
    let fieldPresent = await caseWizardPage.isFieldPresent('fixed-list')
    expect(fieldPresent).to.be.false;
  });

  When(/^I move forward (\d+) pages$/, async function(pages) {
    for (let i = 0; i <pages ; i++) {
      await caseWizardPage.clickContinueButton();
    }
  });


  Given(/^I do meet the condition for showing fields on the complex type that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'showpage3', 'TextField3');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'showline4', 'AddressComplex1_AddressLine3');
  });

  Given(/^I do NOT meet the condition for showing fields on the complex type that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'showpage3', 'TextField3');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'donotshowline4', 'AddressComplex1_AddressLine3');
  });

  When(/^I populate the non-conditional fields and the shown conditional fields on the complex type$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'AddressComplex1_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'AddressComplex1_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'AddressComplex1_Country');

    await caseWizardPage.interactWithField('text', 'showline5', 'AddressComplex1_AddressLine4');
    await caseWizardPage.interactWithField('text', 'London', 'AddressComplex1_AddressLine5');
  });

  When(/^I populate the non-conditional fields on the complex type$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'AddressComplex1_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'AddressComplex1_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'AddressComplex1_Country');
  });

  When(/^I populate the non-conditional fields but NOT the shown conditional fields on the complex type$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'AddressComplex1_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'AddressComplex1_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'AddressComplex1_Country');

    await caseWizardPage.interactWithField('text', 'showline5', 'AddressComplex1_AddressLine4');
    // AddressComplex1_AddressLine5 is empty
  });

  Given(/^I do meet the condition for showing fields on the collection of complex types that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'showpage4', 'TextField3');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.clickCollectionAddNewButton('CollectionComplexField');
    await caseWizardPage.interactWithField('text', 'showline4', 'CollectionComplexField_0_AddressLine3');
  });

  Given(/^I do NOT meet the condition for showing fields on the collection of complex types that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await caseWizardPage.interactWithField('text','showmethemoney');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.interactWithField('text', 'showpage4', 'TextField3');
    await caseWizardPage.clickContinueButton();

    await caseWizardPage.clickCollectionAddNewButton('CollectionComplexField');
    await caseWizardPage.interactWithField('text', 'donotshowline4', 'CollectionComplexField_0_AddressLine3');
  });

  When(/^I populate the non-conditional fields and the shown conditional fields on the collection of complex types$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'CollectionComplexField_0_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'CollectionComplexField_0_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'CollectionComplexField_0_Country');

    await caseWizardPage.interactWithField('text', 'showline5', 'CollectionComplexField_0_AddressLine4');
    await caseWizardPage.interactWithField('text', 'London', 'CollectionComplexField_0_AddressLine5');
  });

  When(/^I populate the non-conditional fields on the collection of complex types$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'CollectionComplexField_0_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'CollectionComplexField_0_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'CollectionComplexField_0_Country');
  });

  When(/^I populate the non-conditional fields but NOT the shown conditional fields on the collection of complex types$/, async function(){
    await caseWizardPage.interactWithField('text', '10 Downing Street', 'CollectionComplexField_0_AddressLine1');
    await caseWizardPage.interactWithField('text', 'PMO', 'CollectionComplexField_0_AddressLine2');
    await caseWizardPage.interactWithField('text', 'UK', 'CollectionComplexField_0_Country');

    await caseWizardPage.interactWithField('text', 'showline5', 'CollectionComplexField_0_AddressLine4');
    // CollectionComplexField_0_AddressLine5 is empty
  });

  Then(/^I can submit the case$/, async function () {
    while (await caseWizardPage.continueButtonDisplayed()){
      if (!caseWizardPage.continueButtonEnabled()) {
        throw new CustomError('Trying to click Continue/Submit button but it is not enabled')
      }
      await caseWizardPage.clickContinueButton();
    }
    await new CaseDetailsPage().waitForPageToLoad();
  });

  Then(/^I CANNOT submit the case$/, async function () {
    expect(await caseWizardPage.continueButtonEnabled()).to.be.false;
  });

});
