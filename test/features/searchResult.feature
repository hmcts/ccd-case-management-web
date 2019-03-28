@searchResult @functional
Feature: Set of scenarios to test functionality of search result list

    Background:
        Given I have logged in

    Scenario: loading te results table will display correct result count    
        Given I am on the search results page
        When I have performed a search
        Then I see cases listed in the results table
        And I see table header with correct result count
    
    Scenario: click on sorting icon on the first column will sort the results in descending order 
        Given I am on the search results page 
        And I have some cases listed in the results table
        When I click on sorting icon on the first column
        Then the results of the page should be sorted in the descending order

    Scenario: click on the case link will navigate to the details page 
        Given I am on the search results page
        And I have some cases listed in the results table
        When I click on the case link
        Then I see case details page

    Scenario: loading results with more than 25 items will display 2 pages 
        Given I am on the search results page
        And I have more than 25 results 
        When I click on page link 2
        Then I see results of the second page
        And I see table header with page 2 result count