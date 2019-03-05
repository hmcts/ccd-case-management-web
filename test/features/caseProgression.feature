@caseProgression
Feature: Set of scenarios to test case creation and case progression

  Background:
    Given I have logged in
    And a case with Case Progression functionality exists

  Scenario: Case can be created
    When I create the case
    Then the latest History event should be 'Create a case'
    And the Details table should show 'End State' as 'Case created'
    And the available actions should be:
      | progress to state1   |
      | update current state |

  Scenario: Case can be progressed
    Given I have navigated to a case in the state 'Case created'
    When I select and submit the event 'progress to state1'
    Then the latest History event should be 'progress to state1'
    And the Details table should show 'End State' as 'State1'
    And the available actions should be:
      | progress to state2   |
      | update current state |

  Scenario: Case remains in the same state after being updated
    Given I have navigated to a case in the state 'Case created'
    And the available actions should be:
      | progress to state1   |
      | update current state |
    When I select and submit the event 'update current state'
    Then the latest History event should be 'update current state'
    And the Details table should show 'End State' as 'Case created'
    And the available actions should be:
      | progress to state1   |
      | update current state |
