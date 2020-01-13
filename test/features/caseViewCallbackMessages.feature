@functional @caseViewCallbackMessages
Feature: Set of scenarios to test callback warnings or errors triggered on CaseView screen

  Background:
    Given the following definition for 'events'
      | ID                               | Name                          | Pre condition sate | Post condition state |
      | createCase                       | Create a case                 |                    | CaseCreated          |
      | triggerCallbackWarningSingular   | Trigger callback warning      | CaseCreated        | AfterEvent           |
      | triggerCallbackWarningMultiple   | Trigger callback warnings     | CaseCreated        | AfterEvent           |
      | triggerCallbackErrorSingular     | Trigger callback error        | CaseCreated        | AfterEvent           |
      | triggerCallbackErrorMultiple     | Trigger callback errors       | CaseCreated        | AfterEvent           |
      | triggerCallbackErrorsAndWarnings | Trigger callback errs + warns | CaseCreated        | AfterEvent           |
    Given the following definition for 'states'
      | ID          | Name         |
      | CaseCreated | Case created |
      | AfterEvent  | After Event  |

    Given I have logged in
    And a case with CaseView Callback functionality exists

  Scenario: Callback warning displayed when start event triggers single warning
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback warning'
    Then the callback error or warnings bar will be visible
    And the callback validation error summary is displayed
    And the following callback warnings are shown:
      | Warning: W1 |
    And the go button is enabled and has been renamed 'Ignore Warning and Go'

  Scenario: Callback warnings displayed when start event triggers multiple warnings
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback warnings'
    Then the callback error or warnings bar will be visible
    And the callback validation error summary is displayed
    And the following callback warnings are shown:
      | Warnings: W1 |
      | Warnings: W2 |
    And the go button is enabled and has been renamed 'Ignore Warning and Go'

  Scenario: Callback error displayed when start event triggers single error
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback error'
    Then the callback error or warnings bar will be visible
    And the callback validation error summary is displayed
    And the following callback errors are shown:
      | Error: E1 |
    And the go button is disabled

  Scenario: Callback errors displayed when start event triggers multiple errors
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback errors'
    Then the callback error or warnings bar will be visible
    And the callback validation error summary is displayed
    And the following callback errors are shown:
      | Errors: E1 |
      | Errors: E2 |
    And the go button is disabled

  Scenario: Callback errors and warnings displayed when start event triggers multiple errors and warnings
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback errs + warns'
    Then the callback error or warnings bar will be visible
    And the callback validation error summary is displayed
    And the following callback errors are shown:
      | Errors and warnings: E1 |
      | Errors and warnings: E2 |
    And the following callback warnings are shown:
      | Errors and warnings: W1 |
      | Errors and warnings: W2 |
    And the go button is disabled

  Scenario: Starting event twice will ignore callback warnings generated when start event triggers single warning
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback warning'
    # NB: second attempt to start/submit event: i.e. 'Ignore warning and go'
    When I select and submit the event 'Trigger callback warning'
    And I navigate to tab 'History'
    Then no callback errors or warnings are shown
    And the latest History event should be 'Trigger callback warning'
    And the Details table should show 'End State' as 'After Event'

  Scenario: Starting event twice will ignore callback warnings generated when start event triggers multiple warnings
    Given I have navigated to a case in the state 'Case created'
    And I select and start the event 'Trigger callback warnings'
    # NB: second attempt to start/submit event: i.e. 'Ignore warning and go'
    When I select and submit the event 'Trigger callback warnings'
    And I navigate to tab 'History'
    Then no callback errors or warnings are shown
    And the latest History event should be 'Trigger callback warnings'
    And the Details table should show 'End State' as 'After Event'
