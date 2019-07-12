@unit
Feature: poc for new collection page object component and demo the use of new step - this file can be deleted before final merge

  Background:
    And I have logged in


  Scenario: Test for complex in collection
    Given I have a case with a simple collection of complex
    And I navigate to the case creation form page
    When I successfully fill out 2 collection items
    Then the 'Collection of complex type' page contains the following fields:
      | field                               | value              |
      | 1.Address.AddressLine1AddressLine1  | 102 Petty France   |
      | 1.Address.AddressLine1AddressLine2  | St James Park      |
      | 1.Address.AddressLine1AddressLine3  |                    |
      | 1.Address.Country                   | UK                 |
      | 2.Address.AddressLine1AddressLine1  | 70 Massingberd way |
      | 2.Address.AddressLine1AddressLine2  | Tooting            |
      | 2.Address.AddressLine1AddressLine3  |                    |
      | 2.Address.Country                   | UK                 |


  Scenario: Test for basic complex
    Given a case type containing every field type exists
    And I navigate to the case creation form page
    When I successfully fill out the complex type
    Then the 'Data Field Types' page contains the following fields:
      | field                               | value          |  hidden  |
      | Address.AddressLine1AddressLine1    | 5a Westway     |  false   |
      | Address.AddressLine1AddressLine2    | Raynes Park    |  false   |
      | Address.AddressLine1AddressLine3    |                |  false   |
      | Address.Country                     | UK             |  false   |



  Scenario: POC scenario for new step on conditionals
    Given a case type containing show and hide functionality exists
    When I enter 'showmethemoney' into the 'text' field
    Then the 'Conditional Page 1' page contains the following fields:
      | field         | value          |  hidden  |
      | TextField2    |                |  false   |


  Scenario: POC scenario for new step on conditionals
    Given a case type containing show and hide functionality exists
    Given I start createCase event
    When I enter 'dontshowmethemoney' into the 'text' field
    Then the 'Conditional Page 1' page contains the following fields:
      | field         | value          |  hidden  |
      | TextField2    |                |  true    |

  @poc
  Scenario: Refactoring of the create school page / event
    Given a case type containing Complex and Collection types exists
    When I navigate to the case creation form page
    Then I am able to fill out data on the school form
    And I can data regarding the form page
