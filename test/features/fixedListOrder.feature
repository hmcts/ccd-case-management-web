@functional @fixedListOrder
Feature: Set of scenarios to test functionality of the order of fixed list

  Background:
    Given I have logged in
    And the following definition for 'case fields'
      | ID                    | FieldType            |
      | MySchool              | School               |
    And the following definition for 'complex types'
      | ID                    | ListElementCode      | FieldType             | FieldTypeParameter    |
      | School                | SchoolRegionalCentre | FixedRadioList        | regionalCentreEnum    |
      | School                | Class                | Collection            | SchoolClass           |
      | SchoolClass           | ClassDetails         | SchoolClassDetails    |                       |
      | SchoolClass           | ClassMandatoryFor    | MultiSelectList       | classMandatoryForEnum |
      | SchoolClassDetails    | ClassLocation        | SchoolClassLocation   |                       |
      | SchoolClassLocation   | Building             | SchoolBuildingDetails |                       |
      | SchoolBuildingDetails | Floor                | FixedList             | floorEnum             |
    And the following definition for 'fixed lists'
      | ID                    | ListElementCode      | ListElement           | DisplayOrder          |
      | mandatoryClassForEnum | MSc                  | Master of Science     | 4                     |
      | mandatoryClassForEnum | ScD                  | Doctor of Science     |                       |
      | mandatoryClassForEnum | BSc                  | Bachelor of Science   | 2                     |
      | regionalCentreEnum    | CARDIFF              | Cardiff               | 5                     |
      | regionalCentreEnum    | MANCHESTER           | Manchester            | 2                     |
      | regionalCentreEnum    | OXFORD               | Oxford                |                       |
      | floorEnum             | ONE                  | One                   | 2                     |
      | floorEnum             | TWO                  | Two                   | 4                     |
      | floorEnum             | THREE                | Three                 | 5                     |
      | floorEnum             | FOUR                 | Four                  | 7                     |

  Scenario: Correct order of fixed list items is displayed
    Given a case type containing a collection of nested complex types exists
    And I navigate to the case creation form page
    And I click on add collection item button
      Then the 'fixed-radio-list' list is in the following order:
      | Manchester    |
      | Cardiff       |
      | Oxford        |
    Then the 'multi-select' list is in the following order:
      | BSc           |
      | MSc           |
      | ScD           |
    Then the 'fixed-list' list is in the following order:
      | --Select a value-- |
      | One                |
      | Two                |
      | Three              |
      | Four               |

