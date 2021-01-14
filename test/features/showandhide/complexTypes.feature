@functional @complexcollections @showandhide @broken
Feature: Set of scenarios testing show & hide functionality using conditions based on fields in complex types

  Background:
    Given the following definition for 'case fields'
      | ID       | Path                                 | FieldType       | Field show condition                            |
      | MySchool | ProvidesAutisticChildrenSupport      | YesOrNo         |                                                 |
      | MySchool | Family.Children.Child.IsAutistic     | YesOrNo         | MySchool.ProvidesAutisticChildrenSupport="Yes"  |
    Given I have logged in

  Scenario: shows complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'Yes'
    Then verify the field with label 'Is the child autistic?' is visible

  Scenario: hides complex element nested in collections when showCondition uses top element data
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data with a support YesOrNo field set to 'No'
    Then verify the field with label 'Is the child autistic?' is not visible
