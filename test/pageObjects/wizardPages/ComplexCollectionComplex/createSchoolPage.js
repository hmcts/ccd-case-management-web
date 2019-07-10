let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');
let CCDFixedList = require('../../ccd-components/fields/ccdFixedList.js');
let Collection = require('../../ccd-components/fields/ccdCollection.js');
let CCDYesNoField = require('../../ccd-components/fields/ccdYesNoField.js');
let Button = require('../../webdriver-components/button.js');
// let SchoolClassComplex = require('./schoolClassComplex');

class CreateSchoolPage extends CreateCaseWizardPage {

  //This entire page in a complex type
  //School Complex
  constructor() {
    super();
    this.id = 'MySchool_MySchool';
    this.schoolName = new CCDStringField('#MySchool_Name','MySchool.Name');
    this.providesAutisticSupport = new CCDYesNoField('#MySchool_ProvidesAutisticChildrenSupport');
    this._schoolClassComplexCollectionID = '#MySchool_Class' ;
    this.collectionOfSchoolClass = new Collection('#MySchool_Class',null);
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

}

class SchoolClassComplex  {

  async initialiseFields(collectionId, collectionOrderIndex){
    this.id = collectionId;

    //Main Fields
    this.className = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`);
    this.classNumber = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(2) input`); // hidden (className='A team')
    // `${this.id} > ccd-field-write:nth-of-type(3) input`; // CLASS REQUIRED FOR MULTI SELECT

    //Class Members Collection
    this._classMembersComplex = new SchoolClassMembersComplex();
    this.classMembersCollectionID = `${this.id} #MySchool_Class_${collectionOrderIndex -1}_ClassMembers`;
    this.collectionoOfclassMembersComplex = new Collection(this.classMembersCollectionID,this._classMembersComplex);


    //ClassDetailsComplex ${this.id} ccd-field-write:nth-of-type(5)
    this.classRanking = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(1) input`);
    this.classBuilding = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) input`);
    this.classFloor = new CCDFixedList(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(2) select`);
    this.classTeacher = new CCDStringField(`${this.id} ccd-field-write:nth-of-type(5) > div > ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(3) input`);

  }

  async enterClassName(text){
    await this.className.enterText(text);
  }

  async enterClassNumber(number){
    await this.classNumber.enterNumber(number)
  }

  //--- Class Members Collection ---
  async clickAddNewMembersButton(log){
    console.log(log)
    console.log('current id for this SchoolClassComplex is' + this.id);
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
    await this.classFloor.selectFromDropdownByText(dropdownOption)
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
    return
  }

  _generateCollectionOfChildrenComplexID(schoolClassMembersComplexCollectionID){
    //snip last 2 chars
    let length = schoolClassMembersComplexCollectionID.length;
    let outputId = schoolClassMembersComplexCollectionID.substring(0,length -2);

    //append 'Children'
    outputId = outputId + '_Children';
    console.log(outputId);
    return outputId;
  }

  async clickAddNewChildrenButton(){
    console.log('clickAddNewChildrenButton')
    await this.collectionOfChildrenComplex.clickAddNewButton();
  }

  async getCollectionOfClassMemberChildrenComplex(collectionIndex){
    return await this.collectionOfChildrenComplex.getCollectionItem(collectionIndex);
  }


}

class SchoolClassMembersChildrenComplex {

  async initialiseFields(collectionId, collectionOrderIndex){
    this.id = collectionId;

    this.childFullName = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(2) input`);
    this.buildingAndStreet = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(3) ccd-write-complex-type-field > div > ccd-field-write:nth-of-type(4) input`);
    this.childGenderDropdown = new CCDFixedList(`${this.id} > ccd-field-write:nth-of-type(4) select`);
    this.autisticChildCaseRefNumber = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(6) input`);
    this.isAutistic = new CCDYesNoField(`${this.id} > ccd-field-write:nth-of-type(5)`);
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
    await this.childGenderDropdown.selectFromDropdownByText(optionText);
  }

  async enterAutisticChildCaseRefNumber(text){
    await this.autisticChildCaseRefNumber.enterText(text)
  }

}

module.exports = CreateSchoolPage;
