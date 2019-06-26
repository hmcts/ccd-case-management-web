@functional @showandhide
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in collections of complex

  Background:
    Given the definition sheet 'CaseField' looks like this
      | CaseTypeID               | ID       | FieldType |
      | ComplexCollectionComplex | MySchool | School    |
    Given the definition sheet 'ComplexTypes' looks like this
      | ID          | ListElementCode                 | FieldType       | FieldTypeParameter |
      | Child       | IsAutistic                      | YesOrNo         |                    |
      | Child       | NeedsSupport                    | YesOrNo         |                    |
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
      | SchoolClass | createSchool | MySchool    | Class.ClassMembers.Children.NeedsSupport | MySchool.ProvidesAutisticChildrenSupport="Yes" AND MySchool.Class.ClassMembers.Children.IsAutistic="Yes" |

    Given I have logged in

  Scenario: shows element when showCondition uses data from the element in a collection of complex on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassMember IsAutistic field set to 'Yes'
    Then verify the field with label 'Does the child needs support?' is visible

  Scenario: hides element when showCondition uses data from the element in a collection of complex on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassMember IsAutistic field set to 'No'
    Then verify the field with label 'Does the child needs support?' is not visible


