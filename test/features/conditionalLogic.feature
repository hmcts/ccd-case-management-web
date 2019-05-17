@functional @conditional @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given I have logged in

  Scenario: field NOT visible when show & hide condition is NOT met
    Given a case type containing conditionals exists
    When I enter 'dontshowmethemoney' into the 'text' field
    Then the field with label 'Text Field 2' is not visible

  Scenario: field visible when show & hide condition is met
    Given a case type containing conditionals exists
    When I enter 'showmethemoney' into the 'text' field
    Then the field with label 'Text Field 2' is visible

  Scenario: grey bar display when show & hide condition is met
    Given a case type containing conditionals exists
    When I enter 'showmethemoney' into the 'text' field
    Then the field with label 'Text Field 2' is visible with grey bar
    And I click the Continue button
    And the field with label 'Text Field 3' is visible without grey bar

  Scenario: page NOT visible when show & hide condition is NOT met
    Given a case type containing conditionals exists
    And I enter 'dontshowmethemoney' into the 'text' field
    When I click the Continue button
    Then I will not be on the 'Conditional Page 2 - Create a case' page

  Scenario: page visible when show & hide condition is met
    Given a case type containing conditionals exists
    And I enter 'showmethemoney' into the 'text' field
    When I click the Continue button
    Then I will be on the 'Conditional Page 2 - Create a case' page

  Scenario: tab visible when show & hide condition is met
    Given a case type containing conditionals exists
    And I enter 'showmethemoney' into the 'text' field
    When I Submit the case
    Then the following tabs will be visible:
      | History |
      | Conditional Tab 1   |

  Scenario: tab NOT visible when show & hide condition is NOT met
    Given a case type containing conditionals exists
    And I enter 'dontshowmethemoney' into the 'text' field
    When I Submit the case
    Then the following tabs will be visible:
      | History |

  Scenario: field in tab visible when show & hide condition is met
    Given a case type containing conditionals exists
    When I meet the condition for showing the field in the tab
    Then the 'Text Field 3' field will be visible on the 'Conditional Tab 1' tab

  Scenario: field in tab NOT visible when show & hide condition is NOT met
    Given a case type containing conditionals exists
    When I do NOT meet the condition for showing the field in the tab
    Then the 'Text Field 3' field will NOT be visible on the 'Conditional Tab 1' tab

  @bugfix @RDM-4622
  Scenario: Page Show Condition works for read only field in previous event
    Given a case type containing conditionals exists
    And I have created a case with fixed list item
    And I progress to the next event 'Approve a case'
    And this event contains a read only value of the fixed list from the previous event
    And The fixed list item is hidden on the first page
    When I continue to the 3rd page
    And the 'Conditional Page 3 - Approve a case' page should be displayed as a result of the fixed list show condition
