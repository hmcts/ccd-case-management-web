@functional @showandhide
Feature: Hide and show of basic fields different types

  Background:
    Given the definition sheet 'CaseEventToFields' looks like this
      | CaseTypeID   | CaseEventID   | CaseFieldID          | DisplayContext  | FieldShowCondition                     |
      | Conditionals | createCase    | TextField            | Mandatory       |                                        |
      | Conditionals | createCase    | TextFieldOptional    | Optional        |                                        |
      | Conditionals | createCase    | TextAreaField        | Optional        |                                        |
      | Conditionals | createCase    | DateField            | Optional        |                                        |
      | Conditionals | createCase    | AddressUKField       | Optional        |                                        |
      | Conditionals | createCase    | PhoneField           | Optional        |                                        |
      | Conditionals | createCase    | NumberField          | Optional        |                                        |
      | Conditionals | createCase    | YesNoField           | Optional        |                                        |
      | Conditionals | createCase    | MoneyField           | Optional        |                                        |
      | Conditionals | createCase    | EmailField           | Optional        |                                        |
      | Conditionals | createCase    | MultiSelectField     | Optional        |                                        |
      | Conditionals | createCase    | MaritalStatusField   | Optional        |                                        |
      | Conditionals | createCase    | TextField2           | Optional        | TextField="showmethemoney"             |
      | Conditionals | createCase    | TextFieldShowHide13  | Optional        | TextAreaField="showme"                 |
      | Conditionals | createCase    | TextFieldShowHide3   | Optional        | DateField="2011-11-26"                 |
      | Conditionals | createCase    | TextFieldShowHide4   | Optional        | AddressUKField.AddressLine1="Ferry Rd" |
      | Conditionals | createCase    | TextFieldShowHide5   | Optional        | PhoneField="07777777777"               |
      | Conditionals | createCase    | TextFieldShowHide6   | Optional        | NumberField="42"                       |
      | Conditionals | createCase    | TextFieldShowHide7   | Optional        | YesNoField="Yes"                       |
      | Conditionals | createCase    | TextFieldShowHide8   | Optional        | MaritalStatusField="WIDOW"             |
      | Conditionals | createCase    | TextFieldShowHide9   | Optional        | MoneyField="9912"                      |
      | Conditionals | createCase    | TextFieldShowHide10  | Optional        | EmailField="test@test.com"             |
      | Conditionals | createCase    | TextFieldShowHide11  | Optional        | MultiSelectField="CARDIFF"             |
      | Conditionals | createCase    | TextFieldShowHide12  | Optional        | TextFieldOptional="showme"             |
    And I have logged in
    And a case type containing conditionals exists

  Scenario Outline: fields on the same page visible when show & hide condition is met
    When I enter '<value>' into the '<fieldType>' field
    Then verify the field with label '<expectedLabel>' is visible

  Examples:
    | value            | fieldType     | expectedLabel          |
    | showmethemoney   | text          | Text Field 2           |
    | showme           | textarea      | Text Field ShowHide 3  |
    | 26112011         | date          | Text Field ShowHide 4  |
    | Ferry Rd         | address       | Text Field ShowHide 5  |
    | 07777777777      | phone-uk      | Text Field ShowHide 6  |
    | 42               | number        | Text Field ShowHide 7  |
    | Yes              | yes-no        | Text Field ShowHide 8  |
    | WIDOW            | fixed-list    | Text Field ShowHide 9  |
    | 99.12            | money-gbp     | Text Field ShowHide 10 |
    | test@test.com    | email         | Text Field ShowHide 11 |
    | CARDIFF          | multi-select  | Text Field ShowHide 12 |


  Scenario Outline: fields on the same page NOT visible when show & hide condition is NOT met
    When I enter '<value>' into the '<fieldType>' field
    Then verify the field with label '<expectedLabel>' is not visible

  Examples:
    | value                 | fieldType     | expectedLabel          |
    | dontshowmethemoney    | text          | Text Field 2           |
    | dontshowme            | textarea      | Text Field ShowHide 3  |
    | 11112011              | date          | Text Field ShowHide 4  |
    | Invalid Ferry Rd      | address       | Text Field ShowHide 5  |
    | 1107777777777         | phone-uk      | Text Field ShowHide 6  |
    | 11                    | number        | Text Field ShowHide 7  |
    | No                    | yes-no        | Text Field ShowHide 8  |
    | SINGLE                | fixed-list    | Text Field ShowHide 9  |
    | 11.12                 | money-gbp     | Text Field ShowHide 10 |
    | invalidtest@test.com  | email         | Text Field ShowHide 11 |
    | OXFORD                | multi-select  | Text Field ShowHide 12 |
