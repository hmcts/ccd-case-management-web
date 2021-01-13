@functional @showandhide
Feature: Hide and show of basic fields

  Background:
    Given the following definition for 'case fields in events'
      | Event         | ID                   | Display context | Field show condition           |
      | createCase    | TextField            | Mandatory       |                                |
      | createCase    | TextFieldOptional    | Optional        |                                |
      | createCase    | TextField2           | Optional        | TextField="showmethemoney"     |
      | createCase    | TextFieldShowHide13  | Optional        | TextFieldOptional="showme"     |
      | approveCase   | TextFieldShowHide13  | Optional        | TextFieldOptional="showme"     |
      | approveCase   | TextFieldShowHide14  | Optional        | TextFieldOptional="dontshowme" |
    Given I have logged in
    And a case type containing show and hide functionality exists

  Scenario Outline: field on same page appears when hide and show condition is met
    Given I start createCase event
    And there is an '<fieldType>' field on page1
    And a conditional text field on the same page is hidden
    When I complete the show condition to show the field
    Then a conditional text field on the same page is displayed

    Examples:
      | fieldType       |
      | Mandatory text  |
      | Optional text   |

  Scenario Outline: field on same page hides when hide and show condition is not met
    Given I start createCase event
    And there is an '<fieldType>' field on page1 with a matching show condition
    And a conditional text field on the same page is displayed
    When I complete the show condition to hide the field
    Then a conditional text field on the same page is hidden

    Examples:
      | fieldType       |
      | Mandatory text  |
      | Optional text   |

    @broken
  Scenario: field on the same page visible when show & hide condition is met based on the Readonly field
    Given I have created a case with text fields
    When I start the event 'Approve a case'
    Then verify the field with label 'Text Field ShowHide 13' is visible

  Scenario: field on the same page not visible when show & hide condition is not met based on the Readonly field
    Given I have created a case with text fields
    When I start the event 'Approve a case'
    Then verify the field with label 'Text Field ShowHide 14' is not visible
