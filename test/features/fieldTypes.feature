@functional @fields
Feature: Set of scenarios to check we can read and write to all field data types when creating a case

  Background:
    Given I have logged in

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


    @validation
  Scenario: Validation: cannot progress to next page without filling in mandatory field
    Given a case with a Mandatory field exists
    When I do not fill in the Mandatory field
    Then the 'Continue' button will be disabled

    @validation
  Scenario: Validation: string cannot be entered into a number field
    Given a case type containing every field type exists
    When I enter 'iamastring' into the 'number' field
    Then no text will appear in the number field








