@search @functional
Feature: Set of scenarios to test functionality of media viewer when the document link is clicked

  Background:
    Given I have logged in

  Scenario: create a case with document upload
    Given a case type containing every field type exists
    And I create the case
    And I navigate to tab 'Details'
    Then I click the document link to open media in new tab

