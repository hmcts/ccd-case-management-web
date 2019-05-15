@caseFilters @functional
Feature: Set of scenarios to test functionality of create case filters in case creation

    Background:
        Given I have logged in
        And a case type containing every field type exists

    Scenario: submitting the Create case filters will navigate to the create case wizard page
        And I have filled out the create case filters
        When I click the 'Start' button
        Then I will be navigated to 'Create Case' wizard form page

#       all pass
    Scenario Outline: dynamic search filters are displayed for all data types
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
            | Fixed-List  | Marrital Status Field                                              | --Select a value--,Marriage,Civil Partnership,Single,Widow |
            | Money-GBP   | Money Field                                                        |                                                            |
            | Document    | Document Field                                                     |                                                            |
            | Multi-Select| Multi Select Field,Cardiff,Manchester,Oxford                       |                                                            |
            | Email       | Email Field                                                        |                                                            |



    Scenario: reset button switches case type to the workbasket default
    Scenario: reset button clears a fields contents

    Scenario: apply button submits search options and returns results list
        Given a case exists
        And I am on the case list page
        And I have filled out the filters
        When I click the 'Apply' button
        Then the search result table will be displayed
