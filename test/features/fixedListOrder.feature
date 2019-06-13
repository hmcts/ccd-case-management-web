@functional @fixedListOrder
Feature: Set of scenarios to test functionality of the order of fixed list

  Scenario Outline: Correct order of fixed list items is displayed

    # Definition setup
    #  Complex Types
    #  | fieldId               |  ListElementCode      | FieldType             | FieldTypeParameter
    #  | School                |  SchoolRegionalCentre | FixedRadioList        | regionalCentreEnum
    #  | School                |  Class                | Collection	           | SchoolClass
    #  | SchoolClass	       |  ClassDetails         | SchoolClassDetails    |
    #  | SchoolClassDetails	   |  ClassLocation	       | SchoolClassLocation   |
    #  | SchoolClassLocation   |  ClassMandatoryFor	   | MultiSelectList	   | mandatoryClassForEnum
    #  | SchoolClassLocation   |  Building	           | SchoolBuildingDetails |
    #  | SchoolBuildingDetails |  Floor                | FixedList             | floorEnum
    #  Fixed Lists
    #  | id                    |  ListElementCode      | ListElement           | DisplayOrder
    #  | mandatoryClassForEnum |  MSc	               | Master of Science	   | 4
    #  | mandatoryClassForEnum |  ScD	               | Doctor of Science	   |
    #  | mandatoryClassForEnum |  BSc                  | Bachelor of Science   | 2
    #  | regionalCentreEnum    |  CARDIFF              | Cardiff               | 5
    #  | regionalCentreEnum	   |  MANCHESTER           | Manchester            | 2
    #  | regionalCentreEnum	   |  OXFORD               | Oxford                |
    #  | floorEnum             |  ONE                  | One                   | 2
    #  | floorEnum             |  TWO                  | Two                   | 4
    #  | floorEnum             |  THREE                | Three                 | 5
    #  | floorEnum             |  FOUR                 | Four                  | 7

    Given a case type containing a collection of nested complex types exists
    Then school should have regional centre field as a fixed radio list with the following order '<listItemsOrder>':
      | listItemsOrder  |
      | MANCHESTER      |
      | CARDIFF         |
      | OXFORD          |
    And school class location should have the mandatory for field as a multiselect list with options in the following order '<listItemsOrder>':
      | listItemsOrder  |
      | BSc             |
      | MSc             |
      | ScD             |
    And school class location building should have the floor field as a fixed list with options in the following order '<listItemsOrder>':
      | listItemsOrder  |
      | ONE             |
      | TWO             |
      | THREE           | 
      | FOUR           | 


