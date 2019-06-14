@functional @fixedListOrder
Feature: Set of scenarios to test functionality of the order of fixed list

  Scenario: Correct order of fixed list items is displayed

    Given the definition sheet 'ComplexTypes' looks like this
      | ID                    |  ListElementCode      | FieldType             | FieldTypeParameter    |
      | School                |  SchoolRegionalCentre | FixedRadioList        | regionalCentreEnum    |
      | School                |  Class                | Collection	          | SchoolClass           |
      | SchoolClass	          |  ClassDetails         | SchoolClassDetails    |                       |
      | SchoolClass           |  ClassMandatoryFor    | MultiSelectList	      | classMandatoryForEnum |
      | SchoolClassDetails    |  ClassLocation	      | SchoolClassLocation   |                       |
      | SchoolClassLocation   |  Building	          | SchoolBuildingDetails |                       |
      | SchoolBuildingDetails |  Floor                | FixedList             | floorEnum             |
    And the definition sheet 'FixedList' looks like this
      | ID                    |  ListElementCode      | ListElement           | DisplayOrder
      | mandatoryClassForEnum |  MSc	              | Master of Science	  | 4                     |
      | mandatoryClassForEnum |  ScD	              | Doctor of Science	  |                       |
      | mandatoryClassForEnum |  BSc                  | Bachelor of Science   | 2                     |
      | regionalCentreEnum    |  CARDIFF              | Cardiff               | 5                     |
      | regionalCentreEnum	  |  MANCHESTER           | Manchester            | 2                     |
      | regionalCentreEnum	  |  OXFORD               | Oxford                |                       |
      | floorEnum             |  ONE                  | One                   | 2                     |
      | floorEnum             |  TWO                  | Two                   | 4                     |
      | floorEnum             |  THREE                | Three                 | 5                     |
      | floorEnum             |  FOUR                 | Four                  | 7                     |
    And a case type containing a collection of nested complex types exists
    And I start the event 'Create school'
    Then the page contains the following fields
      | field                                                           | displayOrder   |
      | MySchool.SchoolRegionalCentre.MANCHESTER                        | 1              |
      | MySchool.SchoolRegionalCentre.CARDIFF                           | 2              |
      | MySchool.SchoolRegionalCentre.OXFORD                            | 3              |
      | MySchool.Class.ClassMandatoryFor.BsC                            | 1              |
      | MySchool.Class.ClassMandatoryFor.MSc                            | 2              |
      | MySchool.Class.ClassMandatoryFor.ScD                            | 3              |
      | MySchool.Class.ClassDetails.ClassLocation.Building.Floor.ONE    | 1              |
      | MySchool.Class.ClassDetails.ClassLocation.Building.Floor.TWO    | 2              |
      | MySchool.Class.ClassDetails.ClassLocation.Building.Floor.THREE  | 3              |
      | MySchool.Class.ClassDetails.ClassLocation.Building.Floor.FOUR   | 4              |

