@nestedcollection @functional
Feature: Set of scenarios to test collection of complex table view

  Background:
    Given I have logged in

  Scenario: Nested Collection data on Case Details page not visible by default when accordion is collapsed
    Given a case type containing a collection of complex types exists
    And I have submitted a case with nested collection data
    Then the 'Address Line 2' field will NOT be visible on the 'Collection of Complex' tab

  Scenario: Clicking accordion on nested collection data view in Case Details shows datas
    Given a case type containing a collection of complex types exists
    And I have submitted a case with nested collection data
    When I click on its first accordion on the 'Collection of Complex' tab
    Then the following fields will be visible:
      | Address Line 2 |
      | Address Line 3 |
      | Country        |

  Scenario: Complex Type data within a Collection of Complex Type is displayed
    Given a case type containing a collection of complex types containing complex exists
    And I have submitted a case with a collection of complex with a complex data
    When I click on its first accordion on the 'Company Details' tab
    Then the following fields will be visible:
      | Name ▲         |
      | Address Line 1 |
      | Address Line 2 |
      | Address Line 3 |
      | Country        |
