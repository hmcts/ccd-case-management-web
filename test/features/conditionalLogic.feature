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
    When I click the Continue button
    Then the field with labelText 'Complex Type 1' is visible

  @OrAndNotEqualsLogic
  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue1'
    When I click the Continue button
    Then the field 'fixed-list' is NOT visible

  @OrAndNotEqualsLogic
  Scenario: Case View field show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue1'
    When I click the Continue button
    Then the field with labelText 'Complex Type 2' is visible

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide OR condition using case Text Field value
    Given a case type containing conditionals exists for OR event
    And I navigate to the case creation form page
    And populate field 'TextField4' with value 'orValue1'
    When I click the Continue button
    Then I will be on the 'Conditional Page 2 - Create a case OR' page

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide NOT condition using case Text Field value
    Given a case type containing conditionals exists for NOT event
    And I navigate to the case creation form page
    And populate field 'TextField6' with value 'orValue4'
    When I click the Continue button
    Then I will be on the 'Conditional Page 2 - Create a case NOT' page

  @OrAndNotEqualsLogic
  Scenario: Case View field hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And  populate field 'TextField9' with value 'orValue2'
    When I click the Continue button
    Then the field with labelText 'Complex Type 1' is visible

  @OrAndNotEqualsLogic
  Scenario: Case View field hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue5'
    When I click the Continue button
    Then the field 'fixed-list' is NOT visible

  @OrAndNotEqualsLogic
  Scenario: Event page show and hide AND condition using case Text Field value
    Given a case type containing conditionals exists for AND event
    And I navigate to the case creation form page
    And populate field 'TextField8' with value 'orValue1'
    And populate field 'TextField9' with value 'orValue3'
    When I click the Continue button
    Then I will be on the 'Conditional Page 2 - Create a case AND' page

  @RDM-4622
  Scenario: Field show/hide condition works when an event contains a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with fixed list item
    When I start the event 'Approve a case'
    Then The fixed list item is hidden

  @RDM-4622
  Scenario: Page Show Condition works when an event contains a read only field value from a previous event
    Given a case type containing conditionals exists
    And I have created a case with fixed list item
    And I start the event 'Approve a case'
    When I move forward 2 pages
    And the 'Conditional Page 3 - Approve a case' page should be displayed

  Scenario: completed non-conditional fields and completed shown conditional fields are required on a mandatory complex type to submit a case
    Given a case type containing conditional mandatory complex type exists
    And I do meet the condition for showing fields on the complex type that are conditional
    When I populate the non-conditional fields and the shown conditional fields on the complex type
    Then I can submit the case

  Scenario: only completed non-conditional fields but not hidden fields are required on a mandatory complex type to submit a case
    Given a case type containing conditional mandatory complex type exists
    And I do NOT meet the condition for showing fields on the complex type that are conditional
    When I populate the non-conditional fields on the complex type
    Then I can submit the case

  Scenario: completed non-conditional fields and incomplete shown conditional fields on a mandatory complex type prevent a case from being submitted
    Given a case type containing conditional mandatory complex type exists
    And I do meet the condition for showing fields on the complex type that are conditional
    When I populate the non-conditional fields but NOT the shown conditional fields on the complex type
    Then I CANNOT submit the case

  Scenario: completed non-conditional fields and completed shown condition fields are required on a mandatory collection of complex types to submit a case
    Given a case type containing conditional mandatory collection of complex types exists
    And I do meet the condition for showing fields on the collection of complex types that are conditional
    When I populate the non-conditional fields and the shown conditional fields on the collection of complex types
    Then I can submit the case

  Scenario: only completed non-conditional fields but not hidden fields are required on a mandatory collection of complex types to submit a case
    Given a case type containing conditional mandatory collection of complex types exists
    And I do NOT meet the condition for showing fields on the collection of complex types that are conditional
    When I populate the non-conditional fields on the collection of complex types
    Then I can submit the case

  Scenario: completed non-conditional fields and incomplete shown conditional fields on a mandatory collection of   complex type prevent a case from being submitted
    Given a case type containing conditional mandatory collection of complex types exists
    And I do meet the condition for showing fields on the collection of complex types that are conditional
    When I populate the non-conditional fields but NOT the shown conditional fields on the collection of complex types
    Then I CANNOT submit the case
    
  @RDM-4781
  Scenario: PageShowCondition - should not clear further pages fields after finding next page
    Given a case type containing conditionals exists
    And I navigate to the case creation form page
    And populate field 'Text' with value 'page3'
    When I click the Continue button
    And populate field 'Text' with value 'page4'
    And I click the Continue button
    And populate field 'Text' with value 'valueToCheck'
    And I move forward 5 pages
    Then The text field 'TextField5' contains value 'valueToCheck'
