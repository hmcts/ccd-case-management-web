@functional @conditional @continueButton
Feature: Hide and show of mandatory field should reflect in a 'Continue' button being enabled/disabled

  Background:
    Given the following definition for 'case fields'
      | ID                            | Display context | Field show condition                                   |
      | TextFieldOptionalButtonTest   | Optional        |                                                        |
      | TextFieldMandatoryButtonTest  | Mandatory       | TextFieldOptionalButtonTest="showmemandatorytextfield" |
    And a case type containing conditionals exists
    And I have logged in
    And I start createCase event
    And there is an 'Mandatory text' field on page1 with a text 'anytext'

    @broken
  Scenario: Continue button enabled and clickable when conditional mandatory field is shown and any text entered
    Given there is an 'Text Field Optional Continue Button test' field on page1 with a matching show condition
    And a conditional text field on the same page is displayed
    When I complete the conditional field
    Then the 'Continue' button will be enabled

  Scenario: Continue button disabled when conditional mandatory field is shown and no text entered
    And there is an 'Text Field Optional Continue Button test' field on page1 with a matching show condition
    And a conditional text field on the same page is displayed
    Then the 'Continue' button will be disabled

  Scenario: Continue button enabled and clickable when conditional mandatory field is hidden
    Given a case type containing conditionals exists
    And there is an 'Text Field Optional Continue Button test' field on page1
    And a conditional text field on the same page is hidden
    Then the 'Continue' button will be enabled
