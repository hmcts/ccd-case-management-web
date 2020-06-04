@search @functional
Feature: Set of scenarios to test functionality of search filters on the search page

  Background:
    Given the following definition for 'case fields'
      | ID               | Label              | FieldType         | FieldTypeParameter |
      | TextField        | Text Field         | Text              |                    |
      | TextAreaField    | Text Area          | TextArea          |                    |
      | DateField        | Date Field         | Date              |                    |
      | AddressField     | Address Field      | Address           |                    |
      | PhoneField       | Phone Field        | PhoneUK           |                    |
      | NumberField      | Number Field       | Number            |                    |
      | YesNoField       | Yes or No Field    | YesOrNo           |                    |
      | CollectionField  | Collection Field   | Collection        | Text               |
      | MarritalStatus   | Fixed List         | FixedList         | marritalStatusEnum |
      | MoneyField       | Money Field        | MoneyGBP          |                    |
      | DocumentField    | Document Field     | Document          |                    |
      | EmailField       | Email Field        | Email             |                    |
      | MultiSelectField | Multi Select Field | MultiSelectList   | regionalCentreEnum |
      | CaseHistory      | History            | CaseHistoryViewer |                    |
    Given the following definition for 'list types'
      | ID                 | ListElementCode      | ListElement       |
      | marritalStatusEnum | MARRIAGE             | Marriage          |
      | marritalStatusEnum | CIVIL_PARTNERSHIP    | Civil Partnership |
      | marritalStatusEnum | SINGLE	Single        |                   |
      | marritalStatusEnum | WIDOW                | Widow             |
      | regionalCentreEnum | CARDIFF              | Cardiff           |
      | regionalCentreEnum | MANCHESTER           | Manchester        |
      | regionalCentreEnum | OXFORD               | Oxford            |
      | gender             | MALE                 | Male              |
      | gender             | FEMALE               | Female            |
      | gender             | OTHER                | Other             |
      | boolean            | TRUE                 | true              |
      | boolean            | FALSE                | false             |
    Given I have logged in
    And a case type containing every field type exists


  @broken
  Scenario: selecting the jurisdiction search drop down changes the main banner title to that jurisdiction name
    Given I am on the search page
    And the banner title matches that of the currently selected jurisdiction
    When I change the jurisdiction search drop down option
    Then the banner title matches that of the currently selected jurisdiction

  Scenario Outline: dynamic search filters are displayed for all data types
    Given I am on the search page
    When I select the 'Case type' drop down option for dynamic filters
    Then I should see a '<dataType>' dynamic filter with '<labels>' labels and '<values>' values

    Examples:
      | dataType    | labels                                                             | values                                                     |
      | Text        | Text Field                                                         |                                                            |
      | TextArea    | Text Area                                                          |                                                            |
      | Date        | Date Field                                                         |                                                            |
      | Complex     | Address Field,Address Line 1,Address Line 2,Address Line 3,Country |                                                            |
      | Phone-UK    | Phone Field                                                        |                                                            |
      | Number      | Number Field                                                       |                                                            |
      | Yes-No      | Yes or No Field                                                    |                                                            |
      | Collection  | Collection Field                                                   |                                                            |
      | Fixed-List  | Marrital Status Field                                              | --Select a value--,Civil Partnership,Marriage,Single,Widow |
      | Money-GBP   | Money Field                                                        |                                                            |
      | Document    | Document Field                                                     |                                                            |
      | Multi-Select| Multi Select Field,Cardiff,Manchester,Oxford                       |                                                            |
      | Email       | Email Field                                                        |                                                            |

#  @broken #due to bug fix these tests are no longer valid
#  Scenario Outline: reset button clears drop down options and removes all dynamic filters
#    Given I am on the search page
#    And I have filled out the search filters including dynamic filters
#    When I click the 'Reset' button
#    Then I should not see a '<dataType>' dynamic filter
#
#    Examples:
#      | dataType    |
#      | TextArea    |
#      | Date        |
#      | Complex     |
#      | Phone-UK    |
#      | Number      |
#      | Yes-No      |
#      | Collection  |
#      | Fixed-List  |
#      | Money-GBP   |
#      | Document    |
#      | Multi-Select|
#      | Email       |
#      | Text        |

  Scenario: apply button submits search options and returns results list
    Given a case exists
    And I am on the search page
    And I have filled out the search filters
    When I click the 'Apply' button
    Then the search result table will be displayed

  @searchCaseList
  Scenario: loading the results table will display correct result count
    Given I am on the search page
    When I have performed a search
    Then I see cases listed in the results table
    And I see table header with correct result count

  @searchCaseList
  Scenario: click on sorting icon on the first column will sort the results in descending order
    Given I am on the search page
    And I have some cases listed in the results table
    When I click on sorting icon on the first column to 'descending'
    Then the results of the page should be sorted in the descending order

  @searchCaseList
  Scenario: click on the case link will navigate to the details page
    Given I am on the search page
    And I have some cases listed in the results table
    When I click on the case link
    Then I see case details page

  @searchCaseList
  Scenario: loading results with more than 25 items will display at least 2 pages
    Given I am on the search page
    And I have more than 25 results
    When I click on page link 2
    Then I see results of the second page
    And I see table header with page 2 result count
    And The '2' is selected on the Pagination control

#   @stickysearch
#   Scenario: navigating away from search and back again via browser back saves search filters inputs
#     Given a case type containing every field type exists
#     And a case exists
#     And I am on the search page
#     And I selected case type
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
