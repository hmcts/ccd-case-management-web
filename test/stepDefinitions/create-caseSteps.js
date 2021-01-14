let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage');
let CaseDetailsPage = require('../pageObjects/caseDetailsPage.js');
let baseSteps = require('./baseSteps.js');
let Data = require('../utils/TestData.js');
CustomError = require('../utils/errors/custom-error.js');
let TestData = require('../utils/TestData.js');
let ConditionalsCreateCasePage1 = require('../pageObjects/wizardPages/Conditionals/conditionals_CreateCase_ConditionalPage1.js');
let ConditionalsCreateCasePage2 = require('../pageObjects/wizardPages/Conditionals/conditionals_CreateCase_ConditionalPage2.js');
let ConditionalsCreateCasePage3 = require('../pageObjects/wizardPages/Conditionals/conditionals_CreateCase_ConditionalPage3.js');
let ConditionalsCreateCasePage4 = require('../pageObjects/wizardPages/Conditionals/conditionals_CreateCase_ConditionalPage4.js');
let CreateCollectionOfComplexPage = require('../pageObjects/wizardPages/ComplexCollectionComplex/createCollectionOfComplexPage.js');
let DataTypesPage = require('../pageObjects/wizardPages/dataFieldTypesPage');
let CreateSchoolPage = require('../pageObjects/wizardPages/ComplexCollectionComplex/createSchoolPage.js');
let CreateQandAPage = require('../pageObjects/wizardPages/ComplexCollectionComplex/createQandAPage.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, And}) {


  let caseWizardPage = new CreateCaseWizardPage();
  let createCasePage1 = new ConditionalsCreateCasePage1();
  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();
  let conditionals_createCase_conditionalPage1 = new ConditionalsCreateCasePage1();
  let conditionals_createCase_conditionalPage2 = new ConditionalsCreateCasePage2();
  let conditionals_createCase_conditionalPage3 = new ConditionalsCreateCasePage3();
  let conditionals_createCase_conditionalPage4 = new ConditionalsCreateCasePage4();
  let createCollectionOfComplexPage = new CreateCollectionOfComplexPage();
  let dataTypesPage = new DataTypesPage();

  //todo delete before final merge
  Then(/^I am able to fill out data on the school form$/, async function () {
    let createSchoolPage = new CreateSchoolPage();

    //Enter School Name
    await createSchoolPage.enterSchoolName('Dulwich College');

    //Enter Details for School Class
    await createSchoolPage.clickAddNewSchoolClassButton();
    let schoolClass1 = await createSchoolPage.getCollectionOfSchoolClass(1);
    await schoolClass1.enterClassName('A team');
    await schoolClass1.enterClassNumber('1');
    await schoolClass1.enterClassRanking('1');
    await schoolClass1.enterClassBuilding('North Cloister');
    await schoolClass1.selectClassFloor('Two');
    await schoolClass1.enterClassTeacher('Mr Henderson');

    //Enter Details for Another School Class (another collection item)
    await createSchoolPage.clickAddNewSchoolClassButton();
    let schoolClass2 = await createSchoolPage.getCollectionOfSchoolClass(2);
    await schoolClass2.enterClassName('B team');

    //Add Members for first School Class
    await schoolClass1.clickAddNewMembersButton();
    let class1Members1 = await schoolClass1.getCollectionOfClassMembersComplex(1);

    //Add first Child to members for first School class
    await class1Members1.clickAddNewChildrenButton();
    let class1Members1Child1 = await class1Members1.getCollectionOfClassMemberChildrenComplex(1);
    await class1Members1Child1.enterChildFullName('Ashley Noronha');
    await class1Members1Child1.enterBuildingAndStreet('5a Westway');
    await class1Members1Child1.selectChildGender('Male');
    await class1Members1Child1.enterAutisticChildCaseRefNumber('12345A');

    //Add second Child to members for first School class
    await class1Members1.clickAddNewChildrenButton();
    let class1Members1Child2 = await class1Members1.getCollectionOfClassMemberChildrenComplex(2);
    await class1Members1Child2.enterChildFullName('Finn Noronha');

    //Add Member and a child for Second School Class
    await schoolClass2.clickAddNewMembersButton();
    let class2Members1 = await schoolClass2.getCollectionOfClassMembersComplex(1);
    await class2Members1.clickAddNewChildrenButton();
    let class2Members1Child1 = await class2Members1.getCollectionOfClassMemberChildrenComplex(1);
    await class2Members1Child1.enterChildFullName('Harry Potter');

    //Change child 2 name from first school class
    await class1Members1Child2.enterChildFullName('Cam Noronha');

  });

  //todo delete before final merge
  Then(/^I can data regarding the form page$/, async function () {
    let createSchoolPage = new CreateSchoolPage();
    let data = await createSchoolPage.getFieldData();
    let flattenedPageData = [].concat(...data);
    console.log(flattenedPageData);
    // process.exit()
  });

  //todo delete before final merge
  Then(/^I successfully fill out 2 collection items$/, async function () {

    await createCollectionOfComplexPage.clickAddNewButton();
    let addressComplex1 = await createCollectionOfComplexPage.getCollectionOfAddressComplex(1);
    await addressComplex1.enterAddressLine1('102 Petty France');
    await addressComplex1.enterAddressLine2('St James Park');
    await addressComplex1.enterCountry('UK');

    await createCollectionOfComplexPage.clickAddNewButton();
    let addressComplex2 = await createCollectionOfComplexPage.getCollectionOfAddressComplex(2);
    await addressComplex2.enterAddressLine1('70 Massingberd way');
    await addressComplex2.enterAddressLine2('Tooting');
    await addressComplex2.enterCountry('UK');

  });

  //todo delete before final merge
  Then(/^I successfully fill out the complex type$/, async function () {
    let addressComplex = await dataTypesPage.getAddressComplex();
    await addressComplex.enterAddressLine1('5a Westway')
    await addressComplex.enterAddressLine2('Raynes Park')
    await addressComplex.enterCountry('UK')
  });

  When(/^I have created a case for the caseType with data$/, async function () {
      await baseSteps.createCase()
      TestData.caseReference = await new CaseDetailsPage().getCaseReference();
  });

  When(/^I create a case of this case type with the file given$/, async function () {
    await baseSteps.createCase();
  });
  
  When(/^I create the case$/, async function () {
      await baseSteps.createCase();
  });

  When(/^I create the case with Complex Type Authorisation$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.clickCollectionAddNewButton('FamilyDetails_Children');
    await baseSteps.fillOutAndSubmitForm();
  });

  When(/^I select and start the event '(.*)'$/, async function (event) {
    await new CaseDetailsPage().startEvent(event);
  });

  Given('I start createCase event', async function () {
    await baseSteps.navigateToCreateCasePage();
  });

  Given(/^there is an '(.*)' field on page1$/, async function (field) {
    if (field === 'Mandatory text') {
      await createCasePage1.enterIntoMandatoryTextField(undefined);
    } else if (field === 'Optional text') {
      await createCasePage1.enterIntoOptionalTextField(undefined);
    } else if (field === 'Optional Button Test text') {
      await createCasePage1.enterIntoOptionalContinueButtonTextField(undefined);
    }
  });

  Given(/^there is an '(.*)' field on page1 with a text '(.*)'$/, async function (field, text) {
    if (field === 'Mandatory text') {
      await createCasePage1.enterIntoMandatoryTextField(text);
    } else if (field === 'Optional text') {
      await createCasePage1.enterIntoOptionalTextField(text);
    } else if (field === 'Optional Button Test text') {
      await createCasePage1.enterIntoOptionalContinueButtonTextField(text);
    }
  });

  Given(/^there is an '(.*)' field on page1 with a matching show condition$/, async function (field) {
    if (field === 'Mandatory text') {
      await createCasePage1.enterIntoMandatoryTextField(undefined);
      await createCasePage1.completeShowConditionToShowField();
    } else if (field === 'Optional text') {
      await createCasePage1.enterIntoOptionalTextField(undefined);
      await createCasePage1.completeShowConditionToShowField();
    } else if (field === 'Text Field Optional Continue Button test') {
      await createCasePage1.enterIntoOptionalContinueButtonTextField(undefined);
      await createCasePage1.completeShowConditionToShowField();
    }
  });

  When('I complete the show condition to show the field', async function () {
    await createCasePage1.completeShowConditionToShowField();
  });

  When('I complete the show condition to hide the field', async function () {
    await createCasePage1.completeShowConditionToHideField();
  });

  When('I complete the conditional field', async function () {
    await createCasePage1.enterIntoConditionalField();
  });

  Then(/^a conditional text field on the same page is displayed$/, async function() {
    let fieldDisplayed = await createCasePage1.isConditionalFieldPresent();
    expect(fieldDisplayed).to.be.true;
  });

  Then(/^a conditional text field on the same page is hidden/, async function() {
    let fieldDisplayed = await createCasePage1.isConditionalFieldPresent();
    expect(fieldDisplayed).to.be.false;
  });

  Given(/^there are cases listed on the case list page for that case type$/, async function () {
      await baseSteps.createCase();
  });

  When(/^I have navigated to a case in the state 'Case created'$/, async function () {
    await baseSteps.createCase();
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await baseSteps.navigateToCreateCasePage();
  });

  When(/^I navigate to multiple pages case type form pages$/, async function (){
    await baseSteps.navigateToCreateCasePage();
    await new CreateCaseWizardPage().clickContinueButton();
  })

  When(/^I create a case with multiple pages$/, async function (){
    await baseSteps.navigateToCreateCasePage();
    await new CreateCaseWizardPage().clickContinueButton();
    await new CreateCaseWizardPage().clickContinueButton();
    await new CreateCaseWizardPage().clickContinueButton();
    await new CreateCaseWizardPage().clickSubmitCaseButton();
  })

  Then(/^I should expect address list to be empty$/, async function(){
    let addressUK = await dataTypesPage.getAddressUKComplex();
    let addressDropdown = await addressUK.getAddressDropdown();
    let currentSelection = await addressDropdown.getCurrentOption();
    expect(currentSelection).to.be.equals("No address found");
  });

  When(/^I enter a postcode '(.*)' and click find address$/, async function (postcode) {
    await baseSteps.navigateToCreateCasePage();

    let addressUK = await dataTypesPage.getAddressUKComplex();
    await addressUK.enterPostcode(postcode);
    await addressUK.clickAddressButton();
  });


  Then(/^I should see a '(.*)' addresses populated in the address list$/, async function(count) {
    let addressUK = await dataTypesPage.getAddressUKComplex();

    let addressDropdown = await addressUK.getAddressDropdown();
    let currentSelection = await addressDropdown.getCurrentOption();
    expect(currentSelection).to.be.equals(count+ " addresses found");
  });

  When(/^I Select a option '(.*)' from the address list$/, async function(index) {
    let addressDropdown = await (await dataTypesPage.getAddressUKComplex()).getAddressDropdown();
    await addressDropdown.selectOptionByIndex(index)
  });


  When(/^I start the case creation for complex authorisation case$/, async function () {
    await baseSteps.navigateToCreateCasePage();
  });

  Then(/^only the fields defined in AuthorisationComplexTypes sheet for CREATE should be visible$/, async function() {
    expect(await caseWizardPage.isTextFieldVisibleById("#FamilyDetails_MotherFullName")).to.be.false;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_MotherAge')).to.be.false;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_FatherFullName')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_FatherAge')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#Homeless')).to.be.true;
    expect(await caseWizardPage.isCollectionAddNewButtonEnabled('FamilyDetails_Children')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#MySchool_Number')).to.be.false;
    expect(await caseWizardPage.isTextFieldVisibleById('#MySchool_Name')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#MySchool_ProvidesAutisticChildrenSupport')).to.be.false;
    expect(await caseWizardPage.isCollectionAddNewButtonEnabled('MySchool_Class')).to.be.true;
  });

  Then(/^only the fields defined in AuthorisationComplexTypes sheet for UPDATE should be editable$/, async function() {
    expect(await caseWizardPage.isTextFieldVisibleById("#FamilyDetails_MotherFullName")).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_MotherAge')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_FatherFullName')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_Children_0_ChildFullName')).to.be.true;
    expect(await caseWizardPage.isFixedListFieldVisibleById('#FamilyDetails_Children_0_ChildGender')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#FamilyDetails_Children_0_IsAutistic')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#FamilyDetails_Children_0_NeedsSupport')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#FamilyDetails_FatherAge')).to.be.false;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#Homeless')).to.be.true;
    expect(await caseWizardPage.isCollectionAddNewButtonEnabled('FamilyDetails_Children')).to.be.true;
    expect(await caseWizardPage.isNumberFieldVisibleById('#MySchool_Number')).to.be.true;
    expect(await caseWizardPage.isTextFieldVisibleById('#MySchool_Name')).to.be.true;
    expect(await caseWizardPage.isYesOrNoFieldVisibleById('#MySchool_ProvidesAutisticChildrenSupport')).to.be.true;
    expect(await caseWizardPage.isCollectionAddNewButtonEnabled('MySchool_Class')).to.be.true;
  });

  Then(/^I should see a '(.*)' field$/, async function(dataType) {
      let fieldDisplayed = await caseWizardPage.isFieldPresent(dataType);
      expect(fieldDisplayed).to.be.true;
  });

  Then('the Dynamic list is populated with the following values', async function (dataTable) {
    let expectedDynamicListItems = await [].concat(...dataTable.raw());
    let actualDynamicListItems = await dataTypesPage.getDynamicListItems();
    expect(expectedDynamicListItems).to.deep.equal(actualDynamicListItems);
  });

  Given(/^I have filled out the '(.*)' field$/, async function(dataType) {
    await baseSteps.navigateToCreateCasePage()
    this.fieldObject = await caseWizardPage.interactWithField(dataType);
  });

  When(/^I click on add collection item button$/, async function () {
    await caseWizardPage.clickGenericCollectionAddNewButton();
  });

  Then(/^the '(.*)' list is in the following order:$/, async function (listDataType, fieldDetails) {
    let actualOrder = await caseWizardPage.getListOrder(listDataType);
    let expectedOrder = [].concat(...fieldDetails.rawTable);
    expect(actualOrder).to.deep.equal(expectedOrder)
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

  When(/^I select and submit the event Modify Case$/, async function () {
    await new CaseDetailsPage().startEvent('Modify Case');
  });

  When(/^I click 'Ignore Warning and Go' and submit the event$/, async function () {
    await new CaseDetailsPage().clickGoButtonOnlyWhenTextIsSet('Ignore Warning and Go');
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

  When(/^I populate the form with the school data with a ClassMember IsAutistic field set to '(.*)'$/, async function (isAutistic) {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo('Yes', 'A team', isAutistic);
  });

  When(/^I populate the form with the school data with a ClassName field set to '(.*)'$/, async function (className) {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo('Yes', className);
  });

  When(/^I populate the form with the school data with a support YesOrNo field set to '(.*)'$/, async function (supportAnswer) {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo(supportAnswer);
  });

  When(/^I populate the form with the school data with a degree field set to '(.*)'$/, async function (degreeOption) {
    await baseSteps.navigateToCreateCasePage();
    await populateFormDataWithSupportFieldSetTo('Yes', 'A team', 'Yes', degreeOption);
  });

  Then(/^the fields should have label, hint text and displayContext updated$/, async function () {
    let labels = await caseWizardPage.getFullFieldLabels();
    expect(labels).to.include('Child full name (UPDATED)');
    expect(labels).to.include('Child hint (UPDATED)');
    expect(labels).to.include('Building and Street (Optional)');
    expect(labels).to.include('Child Gender');
    expect(labels).to.include('Autistic child case number reference');
    expect(labels).to.include('Is the child autistic? (Optional)');
    expect(labels).to.include('Does the child needs support? (Optional)');
  });

  //---- conditionals

  When(/^I meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showmethemoney');
    await conditionals_createCase_conditionalPage2.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  When(/^I do NOT meet the condition for showing the field in the tab$/, async function () {
    await baseSteps.navigateToCreateCasePage();

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('dontshowmethemoney');
    await conditionals_createCase_conditionalPage2.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  When(/^I do NOT meet the condition for showing the field$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await conditionals_createCase_conditionalPage1.enterIntoTextField('dontshowmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();
  });

  When(/^I do meet the condition for showing the field$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();
    await conditionals_createCase_conditionalPage2.enterIntoTextField3('text','dontshowpage3');
    await caseWizardPage.clickContinueButton();
  });

  When(/^I do NOT meet the condition for showing the page$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await caseWizardPage.clickContinueButton();
    await conditionals_createCase_conditionalPage2.enterIntoTextField3('text','dontshowpage3');
    await caseWizardPage.clickContinueButton();
  });

  When(/^I do meet the condition for showing the page$/, async function () {
    await baseSteps.navigateToCreateCasePage();
    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await caseWizardPage.clickContinueButton();
    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showpage3');
    await caseWizardPage.clickContinueButton();

    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine1('10 Downing Street');
    await address.enterAddressLine2('SW1A 2AA');
    await address.enterAddressLine3('Westminster');
    await address.enterCountry('UK');
    await caseWizardPage.clickContinueButton();
  });

  Then(/^the field with label '(.*)' is not visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.not.include(expectedLabel);
  });

  Given(/^the field with label '(.*)' is visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.include(expectedLabel);
  });

  Then(/^verify the field with label '(.*)' is not visible$/, async function (expectedLabel) {
    let labels = await caseWizardPage.getFieldLabels();
    expect(labels).to.not.include(expectedLabel);
  });

  Then(/^verify the field with label '(.*)' is visible$/, async function (expectedLabel) {
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

  async function populateFormDataWithSupportFieldSetTo(supportAnswer = 'Yes',
                                                       className = 'A team',
                                                       isClassMemeberAutistic = 'Yes',
                                                       degreeOption = 'BSc') {
    let createSchoolPage = new CreateSchoolPage();

    await createSchoolPage.enterSchoolName('Busy Bees');
    await createSchoolPage.selectProvidesAutisticSupport(supportAnswer);
    await createSchoolPage.selectSchoolRegionalCentre();

    await createSchoolPage.clickAddNewSchoolClassButton();
    let classDetails = await createSchoolPage.getCollectionOfSchoolClass(1);

    await classDetails.enterClassName(className);
    await classDetails.enterClassTeacher('Zohan');
    await classDetails.enterClassRanking('12');
    await classDetails.enterClassBuilding('Test Building Name');
    await classDetails.selectClassFloor('One');
    await classDetails.selectDegreeOption(degreeOption);
    if (className === 'A team') {
      await classDetails.enterClassNumber('12345')
    }
    await classDetails.clickAddNewMembersButton();

    let classMembers = await classDetails.getCollectionOfClassMembersComplex(1);
    await classMembers.clickAddNewChildrenButton();

    let childrenDetails = await classMembers.getCollectionOfClassMemberChildrenComplex(1);
    await childrenDetails.enterChildFullName('Joe Kember');
    await childrenDetails.selectChildGender('Male');
    await childrenDetails.enterBuildingAndStreet('150 Boyson Road');
    if (supportAnswer === 'Yes') {
      await childrenDetails.selectIsAutistic(isClassMemeberAutistic);
    }
    await childrenDetails.enterAutisticChildCaseRefNumber('1111222233334444');
  }

  Given(/^I have submitted a case with question and judge notes collection data containing 1 item each$/, async function(){
    let createQandAPage = new CreateQandAPage();

    await baseSteps.navigateToCreateCasePage();

    await createQandAPage.clickAddNewQandAButton();
    let qanda = await createQandAPage.getCollectionOfQandA(1);
    await qanda.enterQuestion('Are you ready?');

    await createQandAPage.clickAddNewjudgeNotesButton();
    let judgeNotes = await createQandAPage.getCollectionOfJudgeNotes(1);
    await judgeNotes.enterNote('Please double check');

    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();

    TestData.caseReference = await new CaseDetailsPage().getCaseReference();
  });

  Given(/^I populate the answer field and submit the event$/, async function(){
    let createQandAPage = new CreateQandAPage();

    let qanda = await createQandAPage.getCollectionOfQandA(1);
    await qanda.enterAnswer('Yes!');

    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  Given(/^I have submitted a case with nested collection data$/, async function(){
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.clickGenericCollectionAddNewButton();
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have submitted a case with conditional nested collection data$/, async function(){
    await baseSteps.navigateToCreateCasePage()
    await caseWizardPage.clickGenericCollectionAddNewButton()
    let addressComplex = await createCollectionOfComplexPage.getCollectionOfAddressComplex(1);
    await addressComplex.enterAddressLine1('10');
    await addressComplex.enterAddressLine2('Great Bouleverd');
    await addressComplex.enterAddressLine3('San Jose');
    await addressComplex.enterCountry('US');
    await addressComplex.enterZipCode('19078');
    await addressComplex.enterSecondLine1('1');
    await addressComplex.enterSecondLine2('Tick tock close');
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  Given(/^I have submitted a case with nested collection data containing (\d+) items$/, async function(numberOfItems){
    await baseSteps.navigateToCreateCasePage()
    for (let i = 0; i < numberOfItems; i++) {
      await caseWizardPage.clickGenericCollectionAddNewButton();
    }
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have submitted a case with a collection of complex with a complex data$/, async function(){
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.clickGenericCollectionAddNewButton();
    await baseSteps.fillOutAndSubmitForm();
  });

  Given(/^I have created a case with text fields$/, async function() {
    await baseSteps.navigateToCreateCasePage();

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney')
    await conditionals_createCase_conditionalPage1.enterIntoOptionalTextField('showme')
    await conditionals_createCase_conditionalPage1.clickContinueButton();
    await conditionals_createCase_conditionalPage1.clickContinueButton();
    await conditionals_createCase_conditionalPage1.clickSubmitCaseButton();
  });

  Given(/^I have created a case with fixed list item$/, async function() {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField("text");
    await caseWizardPage.interactWithField("fixed-list", "Marriage");
    await caseWizardPage.clickContinueButton();
    await caseWizardPage.clickSubmitCaseButton();
  });

  Given(/^I have created a case with '(.*)' fixed list item$/, async function(marritalStatus) {
    await baseSteps.navigateToCreateCasePage();
    await caseWizardPage.interactWithField("text");
    await caseWizardPage.interactWithField("fixed-list", marritalStatus);
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

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showpage3');
    await conditionals_createCase_conditionalPage2.clickContinueButton();

    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine3('showline4');
  });

  Given(/^I do NOT meet the condition for showing fields on the complex type that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showpage3');
    await conditionals_createCase_conditionalPage2.clickContinueButton();

    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine3('donotshowline4');
  });

  When(/^I populate the non-conditional fields and the shown conditional fields on the complex type$/, async function(){
    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine1('10 Downing Street');
    await address.enterAddressLine2('PMO');
    await address.enterCountry('UK');

    await address.enterAddressLine4('showline5');
    await address.enterAddressLine5('London');
  });

  When(/^I populate the non-conditional fields on the complex type$/, async function(){
    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine1('10 Downing Street');
    await address.enterAddressLine2('PMO');
    await address.enterCountry('UK');
  });

  When(/^I populate the non-conditional fields but NOT the shown conditional fields on the complex type$/, async function(){
    let address = await conditionals_createCase_conditionalPage3.getAddressComplex();
    await address.enterAddressLine1('10 Downing Street');
    await address.enterAddressLine2('PMO');
    await address.enterCountry('UK');

    await address.enterAddressLine4('showline5');
    // AddressComplex1_AddressLine5 is empty
  });

  Given(/^I do meet the condition for showing fields on the collection of complex types that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showpage4');
    await conditionals_createCase_conditionalPage2.clickContinueButton();

    await conditionals_createCase_conditionalPage4.clickAddNewButton();
    let addressInCollection = await conditionals_createCase_conditionalPage4.getCollectionOfAddressComplex(1);
    await addressInCollection.enterAddressLine3('showline4')
  });

  Given(/^I do NOT meet the condition for showing fields on the collection of complex types that are conditional$/, async function(){
    await baseSteps.navigateToCreateCasePage();

    await conditionals_createCase_conditionalPage1.enterIntoTextField('showmethemoney');
    await conditionals_createCase_conditionalPage1.clickContinueButton();

    await conditionals_createCase_conditionalPage2.enterIntoTextField3('showpage4');
    await conditionals_createCase_conditionalPage2.clickContinueButton();

    await conditionals_createCase_conditionalPage4.clickAddNewButton();
    let addressInCollection = await conditionals_createCase_conditionalPage4.getCollectionOfAddressComplex(1);
    await addressInCollection.enterAddressLine3('donotshowline4')
  });

  When(/^I populate the non-conditional fields and the shown conditional fields on the collection of complex types$/, async function(){
    let addressInCollection = await conditionals_createCase_conditionalPage4.getCollectionOfAddressComplex(1);

    await addressInCollection.enterAddressLine1('10 Downing Street');
    await addressInCollection.enterAddressLine2('PMO');
    await addressInCollection.enterCountry('UK');

    await addressInCollection.enterAddressLine4('showline5');
    await addressInCollection.enterAddressLine5('London');
  });

  When(/^I populate the non-conditional fields on the collection of complex types$/, async function(){
    let addressInCollection = await conditionals_createCase_conditionalPage4.getCollectionOfAddressComplex(1);

    await addressInCollection.enterAddressLine1('10 Downing Street');
    await addressInCollection.enterAddressLine2('PMO');
    await addressInCollection.enterCountry('UK');
  });

  When(/^I populate the non-conditional fields but NOT the shown conditional fields on the collection of complex types$/, async function(){
    let addressInCollection = await conditionals_createCase_conditionalPage4.getCollectionOfAddressComplex(1);

    await addressInCollection.enterAddressLine1('10 Downing Street');
    await addressInCollection.enterAddressLine2('PMO');
    await addressInCollection.enterCountry('UK');

    await addressInCollection.enterAddressLine4('showline5');
    // CollectionComplexField_0_AddressLine5 is empty
  });

  Then(/^I (?:can |)?submit the case$/, async function () {
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

  Given(/^I have successfully submitted this case$/, async function() {
    await baseSteps.navigateToCreateCasePage();
    await baseSteps.fillOutAndSubmitEvent();
  });

  When(/^I navigate through to the page '(.*)'$/, async function(pageTitle) {
    while(await caseWizardPage.getPageHeader() !== pageTitle){
      await caseWizardPage.clickContinueButton();

      if (await caseWizardPage.errorSummaryDispalyed()){
        let errMsg = `Attempting to navigate through to page '${pageTitle}' but found an error on page and cannot continue`;
        throw new CustomError(errMsg)
      }

      if (await caseWizardPage.amOnCheckYourAnswersPage()){
        let errMsg = `Attempting to navigate through to page '${pageTitle}' but have reached Check Your Answers page`;
        throw new CustomError(errMsg)
      }
    }
  });

  Then(/^the originally entered value will be shown in the '(.*)' field on the page$/, async function(dataType) {
    let val = await caseWizardPage.getFieldValue(dataType);
    expect(val).to.eq(TestData.savedValue);
  });

});
