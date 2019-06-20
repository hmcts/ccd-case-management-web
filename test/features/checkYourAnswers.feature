@functional @cya
Feature: Set of scenarios to test functionality of the Check Your Answers page

  Background:
    Given the definition sheet 'CaseEvent' looks like this
      | CaseTypeID    | ID             | Label       | FieldType         |
      | MultiplePages | TextFieldFName | First Name  | Text              |
      | MultiplePages | TextFieldMName | Middle Name | Text              |
      | MultiplePages | TextFieldLName | Last Name   | Text              |
      | MultiplePages | Age            | Age         | Number            |
      | MultiplePages | CaseHistory    | History     | CaseHistoryViewer |
    Given the definition sheet 'CaseEventToFields' looks like this
      | CaseTypeID    | CaseEventID   | CaseFieldID    | DisplayContext  | PageID          | PageLabel                     |
      | MultiplePages | createCase    | TextFieldFName | Optional        | MuliFormPage1   | Case Multiple Pages: Page 1/3 |
      | MultiplePages | createCase    | TextFieldMName | Optional        | MuliFormPage2   | Case Multiple Pages: Page 2/3 |
      | MultiplePages | createCase    | TextFieldLName | Optional        | MuliFormPage3   | Case Multiple Pages: Page 3/3 |
      | MultiplePages | addExtraInf   | Age            | Optional        | EventSingleOage | Cadd extra details page 1/1   |
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

