@functional
Feature: Set of scenario's covering update functionality with a second user on a created case data

  Background:
    Given I have logged in as 'auto.test.cnp+fe.judge@gmail.com'

    @broken
  Scenario: updates an element in a collection
    Given a case type with questions and answers exists
    And I have submitted a case with question and judge notes collection data containing 1 item each
    And I have logged out
    And I have logged in as 'auto.test.cnp+fejunior@gmail.com'
    And I search for that case by case reference
    And I click on the case link
    When I start the event 'Add Q&A'
    And verify the field with label 'Please double check' is visible
    And I populate the answer field and submit the event
    Then I navigate to tab 'Notes'
    And the following field values will be visible:
      | Please double check       |
    And I navigate to tab 'qanda'
    And the following field values will be visible:
      | Are you ready?  |
      | Yes!            |
