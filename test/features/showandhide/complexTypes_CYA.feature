@functional @complexcollections @showandhide @cya @broken
Feature: Set of scenarios testing show & hide on the CYA page using conditions based on fields in complex types

  Background:
    Given the following definition for 'case fields'
      | ID       | Path                                 | FieldType       | Field show condition                            |
      | MySchool | ProvidesAutisticChildrenSupport      | YesOrNo         |                                                 |
      | MySchool | Family.Children.Child.IsAutistic     | YesOrNo         | MySchool.ProvidesAutisticChildrenSupport="Yes"  |
    And I have logged in

  Scenario: Check Your Answers shows complex fields that were shown on a wizard page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'Yes'
    And I move forward 1 pages
    Then the following complex fields will be visible on CYA page:
      | Is the child autistic? |

  Scenario: Check Your Answers hides complex fields that were hidden on a wizard page
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'No'
    And I move forward 1 pages
    Then the following complex fields will NOT be visible on CYA page:
      | Is the child autistic? |
