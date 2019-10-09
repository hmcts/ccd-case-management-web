@functional
Feature: Set of scenarios to test functionality of media viewer when the document link is clicked

  Background:
    Given I have logged in

  Scenario: create a case with PNG image uploaded and test with media viewer
    Given a case type to upload a PNG image exists
    When I create the case
    And I navigate to tab 'Details'
    And I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with JPG image uploaded and test with media viewer
    Given a case type to upload a JPG image exists
    When I create the case
    And I navigate to tab 'Details'
    And I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with TIF image uploaded and test with media viewer
    Given a case type to upload a TIF image exists
    When I create the case
    And I navigate to tab 'Details'
    And I click the document link
    Then the media viewer is opened in a new tab
    And the document content is not visible in the new tab

  Scenario: create a case with PDF document uploaded and test with media viewer
    Given a case type to upload a PDF document exists
    When I create the case
    And I navigate to tab 'Details'
    And I click the document link
    Then the media viewer is opened in a new tab
    And the document content is visible in the new tab

  Scenario: create a case with DOC uploaded and test with media viewer
    Given a case type to upload a DOC exists
    When I create the case
    And I navigate to tab 'Details'
    And I click the document link
    Then the media viewer is opened in a new tab
    And the document content is not visible in the new tab
