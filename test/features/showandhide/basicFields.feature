@functional @showandhide
Feature: Hide and show of basic fields

  Background:
    Given I have logged in

  Scenario Outline: fields on the same page visible when show & hide condition is met based on mandatory and optional fields
    Given a case type containing conditionals exists
    And I start createCase event
    And the field with label '<expectedLabel>' is not visible
    When I enter '<value>' into the text field with id '<fieldId>'
    Then verify the field with label '<expectedLabel>' is visible

    Examples:
      | value            | fieldId           | expectedLabel          |
      | showmethemoney   | TextField         | Text Field 2           |
      | showme           | TextFieldOptional | Text Field ShowHide 13 |

  Scenario Outline: fields on the same page NOT visible when show & hide condition is NOT met based on mandatory and optional fields
    Given a case type containing conditionals exists
    And I start createCase event
    And the field with label '<expectedLabel>' is not visible
    When I enter '<value>' into the text field with id '<fieldId>'
    Then verify the field with label '<expectedLabel>' is not visible

    Examples:
      | value                | fieldId           | expectedLabel          |
      | dontshowmethemoney   | TextField         | Text Field 2           |
      | dontshowme           | TextFieldOptional | Text Field ShowHide 13 |

  Scenario: field on the same page visible when show & hide condition is met based on the Readonly field
    Given a case type containing conditionals exists
    And I have created a case with text fields
    When I start the event 'Approve a case'
    Then verify the field with label 'Text Field ShowHide 13' is visible

  Scenario: field on the same page not visible when show & hide condition is not met based on the Readonly field
    Given a case type containing conditionals exists
    And I have created a case with text fields
    When I start the event 'Approve a case'
    Then verify the field with label 'Text Field ShowHide 14' is not visible
