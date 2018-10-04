Feature: Login Scenarios

  Scenario: User successfully logs into CCD with correct credentials
    Given I am on the CCD login page
    When I login with correct credentials
    Then I should see CCD case list page
