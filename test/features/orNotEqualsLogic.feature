@OrAndNotEqualsLogic
Feature: Set of Scenarios testing the functionality of the OR, AND, NOT Equals logic

  Background:
    Given I have logged in

  Scenario: Case View field hide OR condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case OR'
    When populate field 'TextField4' with value 'orValue4'
    And submit create a case and navigate to next 'check your answers' page
    Then the field with labelText 'Complex Type 1' is visible

  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case NOT'
    When populate field 'TextField6' with value 'orValue1'
    And submit create a case and navigate to next 'check your answers' page
    Then the field 'fixed-list' is NOT visible

  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case NOT'
    When populate field 'TextField6' with value 'orValue1'
    And submit create a case and navigate to next 'check your answers' page
    Then the field with labelText 'Complex Type 2' is visible

  Scenario: Event page show and hide OR condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case OR'
    When populate field 'TextField4' with value 'orValue1'
    And submit create a case and navigate to next 'Conditional Page 2' page
    Then the page 'Conditional Page 2 - Create a case OR' should display

  Scenario: Event page show and hide NOT condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case NOT'
    When populate field 'TextField6' with value 'orValue4'
    And submit create a case and navigate to next 'Conditional Page 2' page
    Then the page 'Conditional Page 2 - Create a case NOT' should display

  Scenario: Case View field hide AND condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case AND'
    When populate field 'TextField8' with value 'orValue1'
    And  populate field 'TextField9' with value 'orValue2'
    And submit create a case and navigate to next 'check your answers' page
    Then the field with labelText 'Complex Type 1' is visible

  Scenario: Case View field hide AND condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case AND'
    When populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue5'
    And submit create a case and navigate to next 'check your answers' page
    Then the field 'fixed-list' is NOT visible

  Scenario: Event page show and hide AND condition using case Text Field value
    Given I am on the case creation form page for case type 'Conditionals' and event 'Create a case AND'
    When populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue3'
    And submit create a case and navigate to next 'Conditional Page 2' page
    Then the page 'Conditional Page 2 - Create a case AND' should display
