@functional @conditional @showandhide @run
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given the following definition for 'complex case fields'
      | ID       | CaseEvent    | Path                    | Display Context | Field show condition                   |
      | MySchool | createSchool | Class.ClassMandatoryFor | MANDATORY       |                                        |
      | MySchool | updateSchool | Class.ClassMandatoryFor | READONLY        | Name="alwaysHideThisField"             |
      | MySchool | updateSchool | Class.ClassName         | OPTIONAL        | MySchool.Class.ClassMandatoryFor="MSc" |
    Given I have logged in

  Scenario: shows a field when Show Condition uses a readonly nested in complex field value from a previous event
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a degree field set to 'MSc'
    And I submit the case
    And I start the event 'Update school'
    Then verify the field with label 'Class name' is visible

  Scenario: hides a field when Show Condition uses a readonly nested in complex field value from a previous event
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a degree field set to 'BSc'
    And I submit the case
    And I start the event 'Update school'
    Then verify the field with label 'Class name' is not visible
