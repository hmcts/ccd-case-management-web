@smoke @login
Feature: Login Scenarios

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
   #| case list results |

  @broken
  Scenario: I can log out and login as another user
    Given I have logged in
    When I have logged out
    And I have logged in as 'auto.test.cnp+fe.judge@gmail.com'
    Then I should see CCD case list page
