@eventSelector @caseView @functional
Feature: Set of Scenarios to test Event Selector component on Case View page

  Background:
    Given I have logged in

  Scenario: For a case with multiple events the Event Selector is present on the case list page
    Given a case with multiple events exists
    When I have navigated to a case in the state 'Case created'
    Then the Event Selector component is present

  Scenario: For a case with no more events the Event Selector is not present on the case list page
    Given a case with a single event exists
    When I have navigated to a case in the state 'Case created'
    Then the Event Selector component is not present

  Scenario: An event can be selected in the Event Selector dropdown
    Given a case with multiple events exists
    When I have navigated to a case in the state 'Case created'
    Then I am able to select an event in the Event Selector component

