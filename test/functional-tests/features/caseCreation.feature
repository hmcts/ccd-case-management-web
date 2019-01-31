@smoke
Feature: Set of scenario's covering functionality of case creation

  Scenario: Create new case button navigates to Create a Case page
    Given I have logged in
    When I click the 'Create new case' button
    Then I will be navigated to the 'Create Case' page

  Scenario: Create new case button navigates to Create a Case page
    Given I have logged in
    When I click the 'Create Case' link
    Then I will be navigated to the 'Create Case' page
