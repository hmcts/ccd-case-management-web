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

  @OrAndNotEqualsLogic
  Scenario: Case View field hide OR condition using case Text Field value
    Given a case type containing conditionals exists for OR event
    And I navigate to the case creation form page
    And populate field 'TextField4' with value 'orValue4'
    When I click continue button
    Then the field with labelText 'Complex Type 1' is visible

  @OrAndNotEqualsLogic
  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue1'
    When I click continue button
    Then the field 'fixed-list' is NOT visible

  @OrAndNotEqualsLogic
  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue1'
    When I click continue button
    Then the field with labelText 'Complex Type 2' is visible

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide OR condition using case Text Field value
    Given a case type containing conditionals exists for OR event
    And I navigate to the case creation form page
    And populate field 'TextField4' with value 'orValue1'
    When I click continue button
    Then I will be on the 'Conditional Page 2 - Create a case OR' page

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue4'
    When I click continue button
    Then I will be on the 'Conditional Page 2 - Create a case NOT' page

  @OrAndNotEqualsLogic
  Scenario: Case View field hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And  populate field 'TextField9' with value 'orValue2'
    When I click continue button
    Then the field with labelText 'Complex Type 1' is visible

  @OrAndNotEqualsLogic
  Scenario: Case View field hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue5'
    When I click continue button
    Then the field 'fixed-list' is NOT visible

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue3'
    When I click continue button
    Then I will be on the 'Conditional Page 2 - Create a case AND' page
