@caseView
Feature: Set of scenarios testing case view functionality

  Background:
    Given I have logged in

  Scenario: case reference visible on case view
    Then the case reference will be visible and formatted well

  Scenario: tabs visible on case view
    Then the success case created bar will be visible
    And the following tabs will be visible:
      | History             |
      | Tab1                |
      | Tab2                |
      | Tab3                |
      | Conditional Tab 1   |
      | Conditional Tab 2   |
      | Conditional Tab 3   |

  Scenario: tab fields visible on case view
    When I navigate to tab 'Tab2'
    Then the following fields will be visible:
      | Text Field 2        |
      | Text Field 3        |
      | Text Field 4        |

  @functional
  Scenario: print button visible on case view
    When a case type containing every field type exists
    And I create the case
    Then the print button will be visible

  @functional
  Scenario: print button not visible on case view
    When a case with Case Progression functionality exists
    And I create the case
    Then the print button will not be visible
