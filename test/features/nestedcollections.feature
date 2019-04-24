@nestedcollection
Feature: Set of scenarios to test functionality of create case filters in case creation

  Background:
    Given I have logged in
    And a case type containing every field type exists

  Scenario: Nested Collection data on Case Details page not visible by default
    Given I have submitted a case with nested collection data
    Then the 'Address' field will NOT be visible on the 'Reference Collections' tab

  Scenario: Clicking accordion on nested collection data view in Case Details shows data
    Given I have submitted a case with nested collection data
    When I click on its first accordion
    Then the following fields will be visible on the 'Reference Collections' tab
      | Address        |
      | Address Line 1 |
      | Address Line 2 |
      | Address Line 3 |
      | Country        |


