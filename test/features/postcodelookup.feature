@functional @postcode
Feature: Set of scenarios to check we can read and write to all field data types when creating a case

  Background:
    Given I have logged in

  Scenario: Postcode field is displayed on create case form page
    Given a case type containing every field type exists
    When I navigate to the case creation form page
    Then I should see a 'address' field

  Scenario: Post code search brings up a list of addresses for a given postcode
    Given a case type containing every field type exists
    When I enter a postcode 'WD61SY' and click find address
    Then I should see a '12' addresses populated in the address list

  Scenario: Select a address from a list of postcode address list.
    Given a list of addresses listed for postcode 'WD61SY'
    When I Select a option '2' from the list
    Then I should expect 'addressLine1' is populated using the selected address
    And  I should expect 'addressLine2' is populated using the selected address

  Scenario: Enter a wrong postcode value
    Given a case type containing every field type exists
    When I enter a postcode 'INVALID' and click find address
    Then I should expect address list to be empty


