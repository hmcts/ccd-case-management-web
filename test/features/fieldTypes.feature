@functional @fields
Feature: Set of scenarios to check we can read and write to all field data types when creating a case

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
    Given I have logged in

    @broken
  Scenario Outline: Fields are displayed on create case form page
    Given a case type containing every field type exists
    When I navigate to the case creation form page
    Then I should see a '<dataType>' field

    Examples:
      | dataType |
      | Text      |
      | TextArea  |
      | Number    |
      | Money-gbp |
      | Date      |
      | Document  |
      | Email     |
      | Fixed-List|
      | Phone-UK  |
      | Yes-No    |
      | Collection|
      | Complex   |

  Scenario Outline: Fields are displayed on create case form page
    And a case type containing every field type exists
    And I have filled out the '<dataType>' field
    When I navigate to the 'check your answers' form page
    Then I should see my value displayed

    Examples:
      | dataType  |
      | Text      |
      | TextArea  |
      | Number    |
      | Money-gbp |
      | Date      |
      | Email     |
     #| Fixed-List|
      | Phone-UK   |
      | Yes-No    |

    @collection
    Examples:
      | dataType  |
      | Collection|

    #needs AllDataTypes case type deleted from AAT
    @complex @broken
    Examples:
      | dataType  |
      | Complex   |


    @dynamicfixedlist @broken
  Scenario: Dynamic fixed list is populated with values from AboutToStart Callback
    Given a case type containing a Dynamic Fixed List field exists
    When I navigate to the case creation form page
    Then the Dynamic list is populated with the following values
      |--Select a value--|
      | List 1|
      | List 2|
      | List 3|
      | List 4|
      | List 5|
      | List 6|
      | List 7|

  @dynamicfixedlist @broken
  Scenario: Dynamic fixed list is populated with values from MidEvent Callback
    Given a case type containing a Dynamic Fixed List field exists
    When I navigate to multiple pages case type form pages
    Then the Dynamic list is populated with the following values
      |--Select a value--|
      | List 1|
      | List 2|
      | List 3|
      | List 4|
      | List 5|
      | List 6|
      | List 7|

  @dynamicfixedlist @broken
  Scenario: Dynamic fixed list is populated with values from MidEvent Callback when case is being updated
    Given a case type containing a Dynamic Fixed List field exists
    And I create a case with a dynamic fixed list
    When I start the event 'Add Details'
    Then the Dynamic list is populated with the following values
      |--Select a value--|
      | List 1|
      | List 2|
      | List 3|
      | List 4|
      | List 5|
      | List 6|
      | List 7|

    @validation @broken
  Scenario: Validation: cannot progress to next page without filling in mandatory field
    Given a case with a Mandatory field exists
    When I do not fill in the Mandatory field
    Then the 'Continue' button will be disabled

    @validation
  Scenario: Validation: string cannot be entered into a number field
    Given a case type containing every field type exists
    When I enter 'iamastring' into the 'number' field
    Then no text will appear in the number field

    @validation @broken
  Scenario: Validation: invalid phone number is not accepted
    Given a case type containing every field type exists
    And I enter '11111111111' into the 'phone-uk' field
    When I click the Continue button
    Then there will be validation errors
    And the 'Continue' button will be disabled

    @validation
  Scenario: Validation: invalid email is not accepted
    Given a case type containing every field type exists
    And I enter 'invalidemail.com' into the 'email' field
    When I click the Continue button
    Then there will be validation errors
    And the 'Continue' button will be disabled

    @validation
  Scenario: Validation: invalid Money amount is not accepted
    Given a case type containing every field type exists
    And I enter '-1' into the 'money-gbp' field
    Then there will be a field validation error
    And the 'Continue' button will be disabled

    @validation
  Scenario: Validation: invalid date is not accepted
    Given a case type containing every field type exists
    And I enter '01201990' into the 'date' field
    When I click the Continue button
    Then there will be validation errors
    And the 'Continue' button will be disabled

    @validation @regex
  Scenario: Validation: breaking REGEX validation stops progression of a case
    Given a case type containing a regex validated field exists
    When I enter 'lowercaseisinvalid' into the 'text' field
    Then the 'Continue' button will be disabled

    @validation @bug
  Scenario: Validation: can continue after correcting Phone UK validation failure
    Given a case type containing every field type exists
    And I have a validation error from invalid 'phone-uk'
    When I re-enter '07777777777' into the 'phone-uk' field
    Then I can navigate to the next page

    @validation @bug
  Scenario: Validation: can continue after correcting email validation failure
    Given a case type containing every field type exists
    And I have a validation error from invalid 'email'
    When I re-enter 'valid@email.com' into the 'email' field
    Then I can navigate to the next page

    @validation @bug
  Scenario: Validation: can continue after correcting Date validation failure
    Given a case type containing every field type exists
    And I have a validation error from invalid 'date'
    When I re-enter '19091989' into the 'date' field
    Then I can navigate to the next page

    @validation
  Scenario: Validation: can continue after correcting Money validation failure
    Given a case type containing every field type exists
    And I have a validation error from invalid 'money-gbp'
    When I re-enter '20' into the 'money-gbp' field
    Then there will be no validation errors
    And I can navigate to the next page

    @validation @bug @regex
  Scenario: Validation: can continue after correcting REGEX validation failure
    Given a case type containing a regex validated field exists
    And I have a validation error from invalid 'regex'
    When I re-enter 'UPPERCASEISVALID' into the 'text' field
    Then I can navigate to the next page






