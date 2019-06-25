@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given the definition sheet 'CaseField' looks like this
      | CaseTypeID               | ID       | FieldType |
      | ComplexCollectionComplex | MySchool | School    |
    Given the definition sheet 'ComplexTypes' looks like this
      | ID          | ListElementCode                 | FieldType       | FieldTypeParameter | ElementLabel                         |
      | Child       | ChildFullName                   | Text            |                    | Child Full Name                      |
      | Child       | ChildGender                     | FixedList       | gender             | Child Gender                         |
      | Child       | ChildDOB                        | Date            |                    | Child date of Birth                  |
      | Child       | ChildAddress                    | AddressUK       |                    | Child address                        |
      | Child       | IsAutistic                      | YesOrNo         |                    | Is the child autistic?               |
      | Child       | NeedsSupport                    | YesOrNo         |                    | Does the child needs support?        |
      | Child       | AutisticChildCaseNumber         | CaseLink        |                    | Autistic child case number reference |
      | Family      | MotherFullName                  | Text            |                    | Mother Full Name                     |
      | Family      | MotherAge                       | Text            |                    | Mother Age                           |
      | Family      | FatherFullName                  | Text            |                    | Father Full Name                     |
      | Family      | FatherAge                       | Text            |                    | Father Age                           |
      | Family      | Children                        | Collection      | Child              | Children (collection label)          |
      | Family      | FamilyAddress                   | AddressUK       |                    | Family Address                       |
      | SchoolClass | ClassName                       | Text            |                    | Class name                           |
      | SchoolClass | ClassNumber                     | Number          |                    | Class number                         |
      | SchoolClass | ClassMembers                    | Collection      | Family             | Class members (collection)           |
      | School      | Number                          | Number          |                    | School number                        |
      | School      | Name                            | Text            |                    | School name                          |
      | School      | ProvidesAutisticChildrenSupport | YesOrNo         |                    | School supports autistic children    |
      | School      | Class                           | Collection      | SchoolClass        | School clas                          |
    Given the definition sheet 'EventToComplexTypes' looks like this
      | ID	        | CaseEventID  | CaseFieldId | ListElementCode                                                   | EventElementLabel         | EventHintText        | FieldShowCondition                              |
      | SchoolClass | createSchool | MySchool    | Name                                                              |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | ProvidesAutisticChildrenSupport                                   |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassName                                                   |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassNumber                                                 |                           |                      | MySchool.Class.ClassName="A team"               |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.IsAutistic                            |                           |                      | MySchool.ProvidesAutisticChildrenSupport="Yes"  |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.ChildFullName                         | Child full name (UPDATED) | Child hint (UPDATED) |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.ChildGender                           |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.ChildAddress.AddressLine1             |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.NeedsSupport                          |                           |                      |                                                 |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.AutisticChildCaseNumber.CaseReference |                           |                      |                                                 |
    Given I have logged in

  Scenario: limits the complex type using the EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then only the fields defined in EventToComplexTypes sheet should be visible

  Scenario: overrides the complex type data using the definition file EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the fields should have label, hint text and displayContext updated
