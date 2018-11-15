@smoke
Feature: Login Scenarios

  @smoke
  Scenario: User successfully logs into CCD with correct credentials
    Given I am on the CCD login page
    When I login with correct credentials
    Then I should see CCD case list page


  Scenario Outline: Case list results visible when user successfully logs into CCD
    Given I am on the CCD login page
    When I login with correct credentials
    Then I should see the '<component>' on the CCD case list page

  Examples:
    | component         |
    | filters           |
    | banners           |
    | case list results |



