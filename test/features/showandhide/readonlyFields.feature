@functional @conditional @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given the following definition for 'case fields in events'
      | Event         | Case Event   | ID                   | Display context | Field show condition                        |
      | createCase    | createCase   | MaritalStatusField   | Optional        |                                             |
      | approveCase   | approveCase  | MaritalStatusField   | READONLY        | TextField="never show marital status field" |
      | approveCase   | approveCase  | TextFieldShowHide15  | Optional        | MaritalStatusField="MARRIAGE"               |
    Given I have logged in

  Scenario: shows a page when Show Condition uses a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with 'Single' fixed list item
    And I start the event 'Approve a case'
    And the 'Conditional Page 1 - Approve a case' page should be displayed
    When I move forward 2 pages
    And the 'Conditional Page 4 - Approve a case' page should be displayed

  Scenario: hides a page when Show Condition uses a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with 'Marriage' fixed list item
    And I start the event 'Approve a case'
    When I move forward 2 pages
    And the 'Conditional Page 3 - Approve a case' page should be displayed

  Scenario: shows a field when Show Condition uses a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with 'Marriage' fixed list item
    And I start the event 'Approve a case'
    When I move forward 3 pages
    Then verify the field with label 'Text Field ShowHide 15' is visible

  Scenario: hides a field when Show Condition uses a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with 'Single' fixed list item
    And I start the event 'Approve a case'
    When I move forward 3 pages
    Then verify the field with label 'Text Field ShowHide 15' is not visible

