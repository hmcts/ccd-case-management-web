@search @functional
Feature: Set of scenarios to test functionality of search filters on the search page

  Background:
    Given I have logged in

  Scenario: selecting the jurisdiction search drop down changes the main banner title to that jurisdiction name
    Given I am on the search page
    And the banner title matches that of the currently selected jurisdiction
    When I change the jurisdiction search drop down option
    Then the banner title matches that of the currently selected jurisdiction

  Scenario: dynamic search filters are displayed for all data types
    Given a case type containing every field type exists
    And I am on the search page
    When I select the 'Case type' drop down option for dynamic filters
    Then a dynamic filter of every datatype will be displayed

  Scenario: reset button clears drop down options and removes all dynamic filters
    Given a case type containing every field type exists
    And I am on the search page and selected case type
    And I have filled out the search filters including dynamic filters
    When I click the 'Reset' button
    Then The search dropdowns will be empty
    And there will be no dynamic search filters visible

  Scenario: apply button submits search options and returns results list
    Given a case type containing every field type exists
    And I create the case
    And I am on the search page and selected case type
    And I have filled out the search filters
    When I click the 'Apply' button
    Then the search result table will be displayed

#   @stickysearch
#   Scenario: navigating away from search and back again via browser back saves search filters inputs
#     Given a case type containing every field type exists
#     And I create the case
#     And I am on the search page and selected case type
#     And I have submitted a search
#     And I navigate to a case
#     When I click the browser back button
#     Then the initial search filter values will be displayed

#     @stickysearch
#   Scenario: navigating away from search and back again via search link saves search filters inputs
#     Given I am on the search page
#     And I have submitted a search
#     And I navigate to a case
#     When I click the 'search' link
#     Then the initial search filter values will be displayed