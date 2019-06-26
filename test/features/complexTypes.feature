@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given I have logged in

  Scenario: limits the complex type using the EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then only the fields defined in EventToComplexTypes sheet should be visible

  Scenario: overrides the complex type data using the definition file EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the fields should have label, hint text and displayContext updated
