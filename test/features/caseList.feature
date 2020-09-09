@functional @caseList
Feature: Set of Scenarios testing the functionality of the Case List table

  Background:
    Given I have logged in

  Scenario: Notification box displayed when searching for a case type that contains no cases
    Given a case type without any cases exists
    When I search for this Case Type on the workbasket filters
    Then a box stating No Cases Found is displayed

  Scenario: A Case Reference column in case list results has hyphens every 4 digits
    Given the following definition for 'case fields'
      | ID          | Display context |
      | TextField   | Optional        |

    Given a case type exists with case reference configured in the case list results
    And there are cases listed on the case list page for that case type
    Then the case reference is displayed in the case list results with hyphens

  Scenario: Case list results table displays case field values
    Given a case type exists with case fields configured in the case list results
    And I have created a case for the caseType with data
    When I search for that case by case reference
    Then the list table displays the following:
      | Text Field | TextAreaField | DateField   | PhoneField  | NumberField | YesNoField | MarritalStatus | MoneyField    | EmailField   | MultiSelectField |
      | qwerty     | area text     | 10 Oct 2010 | 07777777777 | 123         | No         | Widow          | £20.00        | 123@test.com | Manchester       |

  @interpolation
  Scenario: Case list results displays label fields and interpolation
    Given a case type exists with a label configured in the case list results
    And I have created a case for the caseType with data
    When I search for that case by case reference
    Then the list table displays the following:
      | Text Field | LabelData                      |
      | qwerty     | LabelData: textField is qwerty |

  @pagination
  Scenario: Next and previous buttons appear appropriately based on pagination position selected
    Given I am on case list page
    And there are more than 1 page of results
    And I am on page 1 of results
    And the 'Previous' button will not be displayed on pagination
    And I navigate to page 2 of results
    And the 'Previous' button will be displayed on pagination
    And the 'Next' button will be displayed on pagination
    When I am on the last page of results
    Then the 'Next' button will not be displayed on pagination

  @pagination
  Scenario: Clicking Next/Previous button will navigate to respective next/previous page and show that page selected on pagination
    Given I am on case list page
    And there are more than 1 page of results
    And I am on page 1 of results
    And I click the pagination 'Next' button
    And I will see a different page of results
    And page '2' will be selected on the pagination
    And I click the pagination 'Previous' button
    And I will see a different page of results
    Then page '1' will be selected on the pagination

  @pagination
  Scenario: Clicking 2 button on pagination will navigate to 2nd page and show 2 page selected on pagination
    Given I am on case list page
    And there are more than 1 page of results
    When I click the pagination '2' button
    Then I will see a different page of results
    And page '2' will be selected on the pagination

  @pagination @broken
  Scenario: display three dots (...) at beginning or end of pagination if there are 8 or more pages
    Given I am on case list page
    And there are more than 8 page of results
    And I am on page 1 of results
    And three dots will be displayed after page 6 on the pagination
    When I am on the last page of results
    Then three dots will be displayed after page 1 on the pagination

  # marked as broken until related data-store api and definition-store api changes are (development) merged into master
  @broken
  Scenario: Workbasket results with sort order
    Given a workbasket sort order case type exists with case fields configured in the case list results
    And I have created a case for the caseType with data
    When I search for this Case Type on the workbasket filters
    Then the results should be sorted by 'Text Field' in the 'ascending' order
