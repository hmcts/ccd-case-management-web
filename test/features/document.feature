@search @functional
Feature: Set of scenarios to test functionality of media viewer when the document link is clicked

  Background:
    Given I have logged in

  Scenario: create a case with document upload
    Given a case type with a document upload file exists
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
