@caseProgression
Feature: Set of scenarios to test case creation and case progression

  Background:
    Given I have logged in
    And a case with Case Progression functionality exists

  Scenario: Case can be created
    When I create the case
    And I navigate to tab 'history'
    Then the latest History event should be 'Create a case'
    And the Details table should show 'End State' as 'Case created'
    And the available actions should be:
      | progress to state1   |
      | update current state |

  Scenario: Case can be progressed
    Given I have navigated to a case in the state 'Case created'
    When I select and submit the event 'progress to state1'
    And I navigate to tab 'history'
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
    And I navigate to tab 'history'
    Then the latest History event should be 'update current state'
    And the Details table should show 'End State' as 'Case created'
    And the available actions should be:
      | progress to state1   |
      | update current state |

    @timeline
  Scenario: Event History timeline is populated on a new event
    Given I have navigated to a case in the state 'Case created'
    When I select and submit the event 'progress to state1'
    And I navigate to tab 'history'
    Then the Event History Timeline should show the following ordered events:
      | progress to state1 |
      | Create a case      |

    @timeline
  Scenario: Selecting a Event History event updates the Details box
    Given I have navigated to a case in the state 'Case created'
    And I select and submit the event 'progress to state1'
    And I navigate to tab 'history'
    And the details box shows the following
      | End State   | State1               |
      | Event       | progress to state1   |
    When I select the 'Create a case' event in the Event timeline
    Then the details box shows the following
      | End State | Case created        |
      | Event     | Create a case       |

