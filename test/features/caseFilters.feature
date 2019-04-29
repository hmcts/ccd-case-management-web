@caseFilters @functional
Feature: Set of scenarios to test functionality of create case filters in case creation

    Background:
        Given I have logged in
        And a case type containing every field type exists

    Scenario: submitting the Create case filters will navigate to the create case wizard page
        And I have filled out the create case filters
        When I click the 'Start' button
        Then I will be navigated to 'Create Case' wizard form page

#    todo @broken
    Scenario: selecting the jurisdiction search drop down changes the main banner title to that jurisdiction name
        And the banner title matches that of the currently selected jurisdiction
        When I change the jurisdiction search drop down option
        Then the banner title matches that of the currently selected jurisdiction

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


    @searchtest @run
    Scenario Outline: reset button clears drop down options and removes all dynamic filters
        And I have filled out the search filters including dynamic filters
        When I click the 'Reset' button
        Then I should not see a '<dataType>' dynamic filter

        Examples:
            | dataType    |
            | TextArea    |
#            | Date        |
#            | Complex     |
#            | Phone-UK    |
#            | Number      |
#            | Yes-No      |
#            | Collection  |s
#            | Fixed-List  |
#            | Money-GBP   |
#            | Document    |
#            | Multi-Select|
#            | Email       |

      # due to current functionality of system on aat when clicking reset button it switches to another default
      #case which happens to have a 'Text' dynamic filter and so will fail the test
#    @broken
#        Examples:
#            | dataType    |
#            | Text        |

    Scenario: apply button submits search options and returns results list
        Given a case exists
#        And I am on the search page todo change this
        And I have filled out the search filters
        When I click the 'Apply' button
        Then the search result table will be displayed
