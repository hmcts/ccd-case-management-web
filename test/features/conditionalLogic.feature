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
