@BugFix-4622
Feature: RDM-4622

  Background:
    Given I have logged in

  Scenario: Page Show Condition for read only case event field
    Given I have created a case with fixed list item
    When I progress to the next event which contains read-only value of the selected fixed list value
    And The fixed list item is hidden on the first page
    And The next page's show condition is based on the value of the hidden readonly fixed list item
    And I navigate to the next page
    Then The page that satisfies show condition of the fixed list item value is displayed
