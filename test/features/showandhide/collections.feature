@functional @showandhide @broken
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in collections

  Background:
    Given the following definition for 'case fields'
      | ID       | Path                                 | FieldType       | Field show condition               |
      | MySchool | Class.ClassName                      | Text            |                                    |
      | MySchool | Class.ClassNumber                    | Number          | MySchool.Class.ClassName="A team"  |
    Given I have logged in

  Scenario: shows complex element nested in collections when showCondition uses data from the element in a collection on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'A team'
    Then verify the field with label 'Class number' is visible

  Scenario: hides complex element nested in collections when showCondition uses data from the element in a collection on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'B team'
    Then verify the field with label 'Class number' is not visible
