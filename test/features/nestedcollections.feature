@nestedcollection
Feature: Set of scenarios to test collection of complex table view

  Background:
    Given I have logged in
    And a case type containing a collection of complex types exists

  Scenario: Nested Collection data on Case Details page not visible by default
    Given I have submitted a case with nested collection data
    Then the 'Address Line 2' field will NOT be visible on the 'Details' tab

  Scenario: Clicking accordion on nested collection data view in Case Details shows data
    Given I have submitted a case with nested collection data
    When I click on its first accordion on the 'Details' tab
    Then the following fields will be visible:
      | Address Line 2 |
      | Address Line 3 |
      | Country        |
