@functional @caseView
Feature: Set of scenarios testing case view functionality

  Background:
    Given the definition sheet 'CaseTypeTab' looks like this
      | CaseTypeID | TabID            | TabLabel          | TabDisplayOrder | CaseFieldID          | TabFieldDisplayOrder | TabShowCondition                 |
      | Tabs       | History          | History           | 1               | CaseHistory          | 1                    |                                  |
      | Tabs       | Tab2             | Tab2              | 3               | TextField4           | 3                    |                                  |
      | Tabs       | Tab2             | Tab2              | 3               | TextField3           | 2                    |                                  |
      | Tabs       | Tab2             | Tab2              | 3               | TextField2           | 1                    |                                  |
      | Tabs       | Tab1             | Tab1              | 2               | TextField1           | 1                    |                                  |
      | Tabs       | Tab3             | Tab3              | 4               | ConditionalText      | 3                    |                                  |
      | Tabs       | Tab3             | Tab3              | 4               | ConditionalFixedList | 3                    |                                  |
      | Tabs       | Tab3             | Tab3              | 4               | ConditionalYesNo     | 3                    |                                  |
      | Tabs       | ConditionalTab1  | Conditional Tab 1 | 5               | TextField5           | 1                    | ConditionalText="showmethemoney" |
      | Tabs       | ConditionalTab2  | Conditional Tab 2 | 6               | TextField6           | 1                    | ConditionalFixedList="TRUE"      |
      | Tabs       | ConditionalTab3  | Conditional Tab 3 | 7               | TextField7           | 1                    | ConditionalYesNo="Yes"           |

    Given I have logged in

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
