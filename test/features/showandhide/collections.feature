@functional @showandhide
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in collections

  Background:
    Given the definition sheet 'CaseField' looks like this
      | CaseTypeID               | ID       | FieldType |
      | ComplexCollectionComplex | MySchool | School    |
    Given the definition sheet 'ComplexTypes' looks like this
      | ID          | ListElementCode                 | FieldType   | FieldTypeParameter |
      | SchoolClass | ClassName                       | Text        |                    |
      | SchoolClass | ClassNumber                     | Number      |                    |
      | School      | Class                           | Collection  | SchoolClass        |
    Given the definition sheet 'CaseEventToFields' looks like this
      | CaseTypeID               | CaseEventID  | CaseFieldID | DisplayContext | PageID                    |
      | ComplexCollectionComplex | createSchool | MySchool    | COMPLEX        | SingleFormPageWithComplex |
    Given the definition sheet 'EventToComplexTypes' looks like this
      | ID	        | CaseEventID  | CaseFieldId | ListElementCode   | FieldShowCondition                |
      | SchoolClass | createSchool | MySchool    | Name              |                                   |
      | SchoolClass | createSchool | MySchool    | Class.ClassName   |                                   |
      | SchoolClass | createSchool | MySchool    | Class.ClassNumber | MySchool.Class.ClassName="A team" |

    Given I have logged in

  Scenario: shows complex element nested in collections when showCondition uses data from the element in a collection on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'A team'
    Then verify the field with label 'Class number' is visible

  Scenario: hides complex element nested in collections when showCondition uses data from the element in a collection on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'B team'
    Then verify the field with label 'Class number' is not visible
