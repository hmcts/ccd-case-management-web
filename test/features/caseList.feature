@functional @caseList
Feature: Set of Scenarios testing the functionality of the Case List table

  Background:
    Given I have logged in

  Scenario: A Case Reference column in case list results has hyphens every 4 digits
    Given a case type exists with case reference configured in the case list results
    And there are cases listed on the case list page for that case type
    Then the case reference is displayed in the case list results with hyphens
