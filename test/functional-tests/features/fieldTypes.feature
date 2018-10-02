Feature: Set of scenarios to check we can read and write to all field data types when creating a case

  Scenario: Fields are displayed on create case form page
    Given I have logged in
    And a case type containing every field type exists
    When I navigate to the case creation form page
    Then I should see the following case types displayed:
      | Text      |
      | TextArea  |
      | Number    |
      | Address   |
      | Money-gbp |
      | Collection|
      | Complex   |
      | Date      |
      | Document  |
      | Email     |
      | Fixed-List|
      | Phone UK  |
      | Yes-No    |
      | Payment   |
