@functional @fields
Feature: Set of scenarios to check we can read and write to all field data types when creating a case

  Background:
    Given I have logged in

  Scenario Outline: Fields are displayed on create case form page
    Given a case type containing every field type exists
    When I navigate to the case creation form page
    Then I should see a '<dataType>' field

    Examples:
      | dataType |
      | address |








