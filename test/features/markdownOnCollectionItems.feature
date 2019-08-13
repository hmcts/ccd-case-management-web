@markdownoncollections @functional
Feature: Set of scenarios to test markdown on collection items

  Background:
    Given I have logged in

    @interpolation
  Scenario: Label refers to collection of nested complex data items on Case Details page
    Given a case type containing a collection of nested complex types exists
    And I have submitted a case with nested collection data containing 2 items
    Then the 'School classes: Class: Analytical Maths is taught in building: Maths Institute on floor: THREE by teacher: Smith and is ranked: 10\. The school name is: Technical University\s+School classes: Class: Discrete Maths is taught in building: Maths Institute on floor: ONE by teacher: Brown and is ranked: 8\. The school name is: Technical University' label will be visible on the 'My School Details' tab
