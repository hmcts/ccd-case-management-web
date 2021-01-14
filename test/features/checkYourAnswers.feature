@functional @cya
Feature: Set of scenarios to test functionality of the Check Your Answers page

  Background:
    Given the following definition for 'case fields in events'
      | Event         | ID             | FieldType       | Display context | Page id         | Page label                    |
      | createCase    | TextFieldFName | Text            | Optional        | MuliFormPage1   | Case Multiple Pages: Page 1/3 |
      | createCase    | TextFieldMName | Text            | Optional        | MuliFormPage2   | Case Multiple Pages: Page 2/3 |
      | createCase    | TextFieldLName | Text            | Optional        | MuliFormPage3   | Case Multiple Pages: Page 3/3 |
      | addExtraInf   | Age            | Number          | Optional        | EventSingleOage | Cadd extra details page 1/1   |
    Given I have logged in
    And I have a case with 3 pages


  Scenario: navigate to correct page via Check Your Answers 'change' link
    Given I am on the check your answers page
    When I click the change link
    Then I am navigated back to the page containing the field

  Scenario: can change field value via Check Your Answers 'change' link
    Given I am on the check your answers page
    And I click the change link
    When I change the value of the field
    Then the new value will be shown in Check Your Answers

