@functional @cya
Feature:

  Background:
    Given I have logged in
    And I have a case with 3 pages


  Scenario: navigate to correct page via Check Your Answers 'change' link
    Given I am on the check your answers page
    When I click the change link
    Then I am navigated back to the page containing the field

  Scenario: can change field value via Check Your Answers 'change' link
    Given I am on the check your answers page
    And I click the change link
    When I change the value of the field
    Then the new value will be shown in Check Your Answers

