@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given I have logged in

  Scenario: limits the complex type using the EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
#    Then only the fields defined in EventToComplexTypes sheet should be visible
    Then the 'create school' page has the following fields:
      | field                                                                             | value              |
      | MySchool.Name                                                                     | 102 Petty France   |
      | MySchool.Class.1.ClassName                                                        | 102 Petty France   |
      | MySchool.Class.1.ClassMembers.1.Children.1.ChildFullName                          | 102 Petty France   |
      | MySchool.Class.1.ClassMembers.1.Children.1.ChildAddress.AddressLine1              | 102 Petty France   |
      | MySchool.Class.1.ClassMembers.1.Children.1.NeedsSupport                           | 102 Petty France   |
      | MySchool.Class.1.ClassMembers.1.Children.1.IsAutistic                             | 102 Petty France   |
      | MySchool.Class.1.ClassMembers.1.Children.1.AutisticChildCaseNumber.CaseReference  | 102 Petty France   |


  Scenario: overrides the complex type data using the definition file EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the fields should have label, hint text and displayContext updated
