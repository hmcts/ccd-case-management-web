@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in complex types

  Background:
    Given the definition sheet 'CaseField' looks like this
      | CaseTypeID               | ID       | FieldType |
      | ComplexCollectionComplex | MySchool | School    |
    Given the definition sheet 'ComplexTypes' looks like this
      | ID          | ListElementCode                 | FieldType       | FieldTypeParameter |
      | Child       | IsAutistic                      | YesOrNo         |                    |
      | Family      | Children                        | Collection      | Child              |
      | SchoolClass | ClassMembers                    | Collection      | Family             |
      | School      | ProvidesAutisticChildrenSupport | YesOrNo         |                    |
      | School      | Class                           | Collection      | SchoolClass        |
    Given the definition sheet 'CaseEventToFields' looks like this
      | CaseTypeID               | CaseEventID  | CaseFieldID | DisplayContext | PageID                    |
      | ComplexCollectionComplex | createSchool | MySchool    | COMPLEX        | SingleFormPageWithComplex |
    Given the definition sheet 'EventToComplexTypes' looks like this
      | ID	        | CaseEventID  | CaseFieldId | ListElementCode                          | FieldShowCondition                                                                                       |
      | SchoolClass | createSchool | MySchool    | Name                                     |                                                                                                          |
      | SchoolClass | createSchool | MySchool    | ProvidesAutisticChildrenSupport          |                                                                                                          |
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.IsAutistic   | MySchool.ProvidesAutisticChildrenSupport="Yes"                                                           |

    Given I have logged in

  Scenario: shows complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'Yes'
    Then verify the field with label 'Is the child autistic?' is visible

  Scenario: hides complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'No'
    Then verify the field with label 'Is the child autistic?' is not visible
