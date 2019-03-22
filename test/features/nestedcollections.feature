@nestedcollection
Feature: Set of scenarios to test functionality of create case filters in case creation

  Background:
    Given I have logged in

  Scenario Outline: submitting the Create case filters will navigate to the create case wizard page
    Then I click the 'Create a case' button
    And I select jurisdiction '<jurisdiction>' and casetype '<casetype>' and event '<event>'
    When I click the 'Start' button
    Then I fill nested collections data
    Then the 'Address' field will NOT be visible on the 'Reference Collection' tab
    Then I click on its first accordian
    Then the 'Address' field will be visible on the 'Reference Collection' tab
    Then the 'Address Line 1' field will be visible on the 'Reference Collection' tab
    Then the 'Address Line 2' field will be visible on the 'Reference Collection' tab
    Then the 'Address Line 3' field will be visible on the 'Reference Collection' tab
    Then the 'Country' field will be visible on the 'Reference Collection' tab
    Examples:
      | jurisdiction| casetype             | event        |
      | Auto Test 1 | All Field Data Types | Create a case|
