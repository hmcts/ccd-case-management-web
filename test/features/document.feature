@search @functional
Feature: Set of scenarios to test functionality of media viewer when the document link is clicked

  Background:
    Given I have logged in

  Scenario: create a case with PNG image uploaded and test with media viewer
    Given a case type with a PNG image uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with JPG image uploaded and test with media viewer
    Given a case type with a JPG image uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with GIF image uploaded and test with media viewer
    Given a case type with a GIF image uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with TIF image uploaded and test with media viewer
    Given a case type with a TIF image uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is not visible in the new tab

  Scenario: create a case with PDF document uploaded and test with media viewer
    Given a case type with a PDF document uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with DOC uploaded and test with media viewer
    Given a case type with a DOC type document uploaded
    And I create the case
    And I navigate to tab 'Details'
    When I click the document link
    Then the media viewer is opened in a new tab
    And the document content is not visible in the new tab
