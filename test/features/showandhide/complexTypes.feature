@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in complex types

  Background:
    Given I have logged in

  Scenario: shows complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'Yes'
    Then the field with label 'Is the child autistic?' is visible

  Scenario: hides complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'No'
    Then the field with label 'Is the child autistic?' is not visible
