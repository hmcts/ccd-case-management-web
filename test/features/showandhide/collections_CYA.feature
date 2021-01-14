@functional @showandhide @cya @broken
Feature: Hide and show of basic fields in collections on the Check Your Answers page

  Background:
    Given the following definition for 'case fields'
      | ID       | Path                                 | FieldType       | Field show condition               |
      | MySchool | Class.ClassName                      | Text            |                                    |
      | MySchool | Class.ClassNumber                    | Number          | MySchool.Class.ClassName="A team"  |
    And I have logged in

  Scenario: Check Your Answers shows complex field nested in collections when showCondition uses data from the element in a collection
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'A team'
    And I move forward 1 pages
    Then the following complex fields will be visible on CYA page:
      | Class number |

  Scenario: Check Your Answers hides complex field nested in collections when showCondition uses data from the element in a collection
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a ClassName field set to 'B team'
    And I move forward 1 pages
    Then the following complex fields will NOT be visible on CYA page:
      | Class number |
