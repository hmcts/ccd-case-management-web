@functional @caseView
Feature: Set of scenarios testing case view functionality

  Background:
    Given the following definition for 'tab case fields'
      | ID               | Label             | Tab Display order   | CaseFieldID          | Field Display order | Tab show condition               |
      | History          | History           | 1                   | CaseHistory          | 1                   |                                  |
      | Tab2             | Tab2              | 3                   | TextField4           | 3                   |                                  |
      | Tab2             | Tab2              | 3                   | TextField3           | 2                   |                                  |
      | Tab2             | Tab2              | 3                   | TextField2           | 1                   |                                  |
      | Tab1             | Tab1              | 2                   | TextField1           | 1                   |                                  |
      | Tab3             | Tab3              | 4                   | ConditionalText      | 3                   |                                  |
      | Tab3             | Tab3              | 4                   | ConditionalFixedList | 3                   |                                  |
      | Tab3             | Tab3              | 4                   | ConditionalYesNo     | 3                   |                                  |
      | ConditionalTab1  | Conditional Tab 1 | 5                   | TextField5           | 1                   | ConditionalText="showmethemoney" |
      | ConditionalTab2  | Conditional Tab 2 | 6                   | TextField6           | 1                   | ConditionalFixedList="TRUE"      |
      | ConditionalTab3  | Conditional Tab 3 | 7                   | TextField7           | 1                   | ConditionalYesNo="Yes"           |

    Given I have logged in

    @broken
  Scenario: case reference visible on case view
    Given a case containing Tabs functionality exists
    And I create the case
    Then the case reference will be visible and formatted well

  Scenario: tabs visible on case view
    Given a case containing Tabs functionality exists
    And I create the case
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
    Given a case containing Tabs functionality exists
    And I create the case
    When I navigate to tab 'Tab2'
    Then the following fields will be visible:
      | Text Field 2        |
      | Text Field 3        |
      | Text Field 4        |

  Scenario: print button visible on case view when configured
    Given a case type with the print button configured exist
    And I create the case
    Then the print button will be visible

  Scenario: print button not visible on case view by default
    Given a case with the print button not configured exists
    And I create the case
    Then the print button will not be visible
