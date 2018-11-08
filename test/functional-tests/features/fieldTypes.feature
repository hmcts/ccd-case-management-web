@functional
Feature: Set of scenarios to check we can read and write to all field data types when creating a case

  Scenario Outline: Fields are displayed on create case form page
    Given I have logged in
    And a case type containing every field type exists
    When I navigate to the case creation form page
    Then I should see a '<dataType>' field

    Examples:
      | dataType |
      | Text      |
      | TextArea  |
      | Number    |
      | Money-gbp |
      | Date      |
      | Document  |
      | Email     |
      | Fixed-List|
      | Phone UK  |
      | Yes-No    |
      | Collection|
      | Complex   |

  Scenario Outline: Fields are displayed on create case form page
    Given I have logged in
    And a case type containing every field type exists
    And I have filled out the '<dataType>' field
    When I navigate to the 'check your answers' form page
    Then I should see my value displayed

    Examples:
      | dataType  |
      | Text      |
      | TextArea  |
      | Number    |
      | Money-gbp |
      | Date      |
      | Email     |
     #| Fixed-List|
      | Phone UK  |
      | Yes-No    |
#      | Collection| TODO
#      | Complex   | TODO





