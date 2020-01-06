let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');
let CCDFixedList = require('../../ccd-components/fields/ccdFixedList.js');
let Collection = require('../../ccd-components/fields/ccdCollection.js');
let CCDYesNoField = require('../../ccd-components/fields/ccdYesNoField.js');
let CCDFixedRadioList = require('../../ccd-components/fields/ccdFixedRadioList.js');
let CCDMultiSelectField = require('../../ccd-components/fields/ccdMultiSelectField.js');
let Button = require('../../webdriver-components/button.js');

class CreateSchoolPage extends CreateCaseWizardPage {

  //This entire page in a complex type
  //School Complex
  constructor() {
    super();
    this.key = 'MySchool';
    this.schoolName = new CCDStringField('#MySchool_Name','MySchool.Name');
    this.providesAutisticSupport = new CCDYesNoField('#MySchool_ProvidesAutisticChildrenSupport','MySchool.ProvidesAutisticChildrenSupport');
    this.schoolRegionalCentre = new CCDFixedRadioList('#MySchool_SchoolRegionalCentre','MySchool.SchoolRegionalCentre');
    this._schoolClassComplexCollectionID = '#MySchool_Class' ;
    this.collectionOfSchoolClass = new Collection('#MySchool_Class',new SchoolClassComplex());
  }

  async getFieldData(){
    let nameData = await this.schoolName.getFieldData();
    let autisticSupportData = await this.providesAutisticSupport.getFieldData();

    let pageData = [nameData,autisticSupportData];

    let itemsInCollection = await this.collectionOfSchoolClass.getItemsInCollection();
    for (let i = 1; i < itemsInCollection + 1; i++) {
      let collectionItemObject = await this.collectionOfSchoolClass.getCollectionItem(i);
      let collectionItemData = await collectionItemObject.getFieldData(`${this.key}.Class.${i}`);
      pageData.push(collectionItemData);
    }

    return pageData;
  }

  async enterSchoolName(text){
    await this.schoolName.enterText(text);
  }

  async selectProvidesAutisticSupport(option){
    await this.providesAutisticSupport.selectOption(option);
  }

  async clickAddNewSchoolClassButton(){
    await this.collectionOfSchoolClass.clickAddNewButton();
  }

  async getCollectionOfSchoolClass(index){
    return await new Collection(this._schoolClassComplexCollectionID,new SchoolClassComplex()).getCollectionItem(index);
  }

  async selectSchoolRegionalCentre(option){
    await this.schoolRegionalCentre.selectOption(option)
  }

  async getFixedRadioListOrder(){
    return await this.schoolRegionalCentre.getOptions();
  }
}

class SchoolClassComplex  {

  async initialiseFields(collectionId, collectionOrderIndex){
    this.key = 'MySchool.Class';
    this.id = collectionId;

    //Main Fields
    this.className = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`,`MySchool.Class.${collectionOrderIndex}.ClassName`);
    this.classDegreeMultiSelectList = new CCDMultiSelectField(`${this.id} > ccd-field-write:nth-of-type(2) ccd-write-multi-select-list-field > div`); // CLASS REQUIRED FOR MULTI SELECT
    this.classNumber = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(3) input`,`MySchool.Class.${collectionOrderIndex}.ClassNumber`); // hidden (className='A team')

    //Class Members Collection
    this._classMembersComplex = new SchoolClassMembersComplex();
    this.classMembersCollectionID = `${this.id} #MySchool_Class_${collectionOrderIndex -1}_ClassMembers`;
    this.collectionoOfclassMembersComplex = new Collection(this.classMembersCollectionID,this._classMembersComplex);


    //ClassDetailsComplex ${this.id} ccd-field-write:nth-of-type(5)
    let classRankKey = `${this.key}.${collectionOrderIndex}.ClassDetails.ClassRanking`;
    this.classRanking = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(1) input`, classRankKey);

    let classBuildingNameKey = `${this.key}.${collectionOrderIndex}.ClassDetails.ClassLocation.Building.Name`;
    this.classBuilding = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) input`, classBuildingNameKey);
    // this.classBuilding = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) input`, classBuildingNameKey);


    let classFloorKey = `${this.key}.${collectionOrderIndex}.ClassDetails.ClassLocation.Building.Floor`;
    this.classFloor = new CCDFixedList(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) select`, classFloorKey);
    // this.classFloor = new CCDFixedList(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) select`, classFloorKey); //null

    let classTeacherKey = `${this.key}.${collectionOrderIndex}.ClassDetails.ClassTeacher`;
    // this.classTeacher = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) input`, classTeacherKey);
    this.classTeacher = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) input`, classTeacherKey);

  }

  async getFieldData(prependKey){
    let classNameData = await this.className.getFieldData();
    let classRankData = await this.classRanking.getFieldData();
    let classBuildingData = await this.classBuilding.getFieldData();
    let classFloorData = await this.classFloor.getFieldData();
    let classTeacherData = await this.classTeacher.getFieldData();

    let complexData = [classRankData, classBuildingData,classFloorData, classTeacherData, classNameData];

    let itemsInCollection = await this.collectionoOfclassMembersComplex.getItemsInCollection();
    for (let i = 1; i < itemsInCollection + 1; i++) {
      let membersCollectionObject = await this.getCollectionOfClassMembersComplex(i);
      let membersCollectionData = await membersCollectionObject.getFieldData(`${prependKey}.ClassMembers.${i}`);
      complexData.push(membersCollectionData);
    }

    //Flatten array
    return [].concat(...complexData);
  }

  async enterClassName(text){
    await this.className.enterText(text);
  }

  async enterClassNumber(number){
    await this.classNumber.enterNumber(number)
  }

  async enterClassTeacher(text){
    await this.classTeacher.enterText(text);
  }

  async selectDegreeOption(option){
    await this.classDegreeMultiSelectList.selectAnyOneElement(option);
  }

  async getClassDegreeMultiSelectOptions(){
    return await this.classDegreeMultiSelectList.getOptions();
  }


  //--- Class Members Collection ---
  async clickAddNewMembersButton(log){
    await this.collectionoOfclassMembersComplex.clickAddNewButton();
  }

  async getCollectionOfClassMembersComplex(collectionIndex){
    return await this.collectionoOfclassMembersComplex.getCollectionItem(collectionIndex);
  }
  //------------------------------


  //--- Class Details ---
  async enterClassRanking(text){
    await this.classRanking.enterText(text);
  }

  async enterClassBuilding(text){
    await this.classBuilding.enterText(text);
  }

  async selectClassFloor(dropdownOption){
    await this.classFloor.selectOption(dropdownOption)
  }

  async enterClassTeacher(text){
    await this.classTeacher.enterText(text);
  }
  //------------------------------



}

class SchoolClassMembersComplex {

  async initialiseFields(collectionId, collectionOrderIndex){
    this.id = collectionId;

    //Children complex
    this._childrenComplex = new SchoolClassMembersChildrenComplex();
    let collectionOfChildrenComplexID = this._generateCollectionOfChildrenComplexID(collectionId);
    this.collectionOfChildrenComplex = new Collection(collectionOfChildrenComplexID, this._childrenComplex);
  }

  _generateCollectionOfChildrenComplexID(schoolClassMembersComplexCollectionID){
    //snip last 2 chars
    let length = schoolClassMembersComplexCollectionID.length;
    let outputId = schoolClassMembersComplexCollectionID.substring(0,length -2);

    //append 'Children'
    outputId = outputId + '_Children';
    return outputId;
  }

  async getFieldData(prependKey){
    let complexData = [];

    let itemsInCollection = await this.collectionOfChildrenComplex.getItemsInCollection();
    for (let i = 1; i < itemsInCollection + 1; i++){
      let ChildCollectionObject = await this.getCollectionOfClassMemberChildrenComplex(i);
      let childCollectionData = await ChildCollectionObject.getFieldData(`${prependKey}.Children.${i}`);
      complexData.push(childCollectionData);
    }

    //Flatten array
    return [].concat(...complexData);
  }

  async clickAddNewChildrenButton(){
    await this.collectionOfChildrenComplex.clickAddNewButton();
  }

  async getCollectionOfClassMemberChildrenComplex(collectionIndex){
    return await this.collectionOfChildrenComplex.getCollectionItem(collectionIndex);
  }

}

class SchoolClassMembersChildrenComplex {

  async initialiseFields(collectionId, collectionOrderIndex){
    this.id = collectionId;

    this.childFullName = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`);
    this.childGenderDropdown = new CCDFixedList(`${this.id} > ccd-field-write:nth-of-type(2) select`);
    this.isAutistic = new CCDYesNoField(`${this.id} > ccd-field-write:nth-of-type(3)`);
    this.needsSupport = new CCDYesNoField(`${this.id} > ccd-field-write:nth-of-type(4)`);
    this.buildingAndStreet = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(6) ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(1) input`);
    this.autisticChildCaseRefNumber = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(7) input`);
  }

  async getFieldData(prependKey){
    let childFullNameData = await this.childFullName.getFieldData(`${prependKey}.ChildFullName`);
    let buildingAndStreetData = await this.buildingAndStreet.getFieldData(`${prependKey}.ChildAddress.AddressLine1`);
    let childGenderDropdownData = await this.childGenderDropdown.getFieldData(`${prependKey}.ChildGender`);
    let autisticChildCaseRefNumberData = await this.autisticChildCaseRefNumber.getFieldData(`${prependKey}.AutisticChildCaseNumber.CaseReference`);
    let isAutisticData = await this.isAutistic.getFieldData(`${prependKey}.IsAutistic`);
    let needsSupport = await this.needsSupport.getFieldData(`${prependKey}.NeedsSupport`);

    return Array.of(childFullNameData,buildingAndStreetData,childGenderDropdownData,autisticChildCaseRefNumberData,isAutisticData,needsSupport);
  }

  async enterChildFullName(text){
    await this.childFullName.enterText(text);
  }

  async enterBuildingAndStreet(text){
    await this.buildingAndStreet.enterText(text)
  }

  async selectIsAutistic(option){
    await this.isAutistic.selectOption(option);
  }

  async selectChildGender(optionText){
    await this.childGenderDropdown.selectOption(optionText);
  }

  async enterAutisticChildCaseRefNumber(text){
    await this.autisticChildCaseRefNumber.enterText(text)
  }

}

module.exports = CreateSchoolPage;
