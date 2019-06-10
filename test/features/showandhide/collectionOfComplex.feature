@functional @showandhide
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in collections of complex

  Background:
    Given I have logged in

  Scenario: shows element when showCondition uses data from the element in a collection of complex on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassMember IsAutistic field set to 'Yes'
    Then the field with label 'Does the child needs support?' is visible

  Scenario: hides element when showCondition uses data from the element in a collection of complex on the same page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassMember IsAutistic field set to 'No'
    Then the field with label 'Does the child needs support?' is not visible


