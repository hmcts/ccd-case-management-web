@nestedcollection @functional
Feature: Set of scenarios to test collection of complex table view

  Background:
    Given the following definition for 'case fields'
      | ID                     | Path         | FieldType  |
      | CollectionComplexField | AddressLine1 | Text       |
      | CollectionComplexField | AddressLine2 | Text       |
      | CollectionComplexField | AddressLine3 | Text       |
      | CollectionComplexField | Country      | Text       |

    Given I have logged in

  Scenario: Nested Collection data on Case Details page not visible by default when accordion is collapsed
    Given a case type containing a collection of complex types exists
    And I have submitted a case with nested collection data
    Then the 'Address Line 2' field will NOT be visible on the 'Collection of Complex' tab

    @broken
  Scenario: Clicking accordion on nested collection data view in Case Details shows datas
    Given a case type containing a collection of complex types exists
    And I have submitted a case with nested collection data
    When I click on its first accordion on the 'Collection of Complex' tab
    Then the following fields will be visible:
      | Address Line 2 |
      | Address Line 3 |
      | Country        |
      | Second Line 1  |
    And the following fields will NOT be visible:
      | ZipCode        |
      | Second Line 2  |

      @broken
  Scenario: Clicking accordion on nested collection data view in Case Details shows datas
    Given a case type containing conditional data of collection of complex types exists
    And I have submitted a case with conditional nested collection data
    When I click on its first accordion on the 'Collection of Complex' tab
    Then the following fields will be visible:
      | Address Line 2 |
      | Address Line 3 |
      | Country        |
      | ZipCode        |
      | Second Line 1  |
      | Second Line 2  |

        @broken
  Scenario: Complex Type data within a Collection of Complex Type is displayed
    Given a case type containing a collection of complex types containing complex exists
    And I have submitted a case with a collection of complex with a complex data
    When I click on its first accordion on the 'Company Details' tab
    Then the following fields will be visible:
      | Address Line 1 |
      | Address Line 2 |
      | Address Line 3 |
      | Country        |
