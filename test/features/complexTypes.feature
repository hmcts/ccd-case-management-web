@functional @complexcollections @showandhide
Feature: Set of scenarios testing show & hide functionality and conditional logic

  Background:
    Given I have logged in

  Scenario: limits the complex type using the EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the 'Create school' page contains the following fields:
      | field                                                                             | value              | hidden |
      | MySchool.Name                                                                     | Busy Bees          | false  |
      | MySchool.Class.1.ClassName                                                        | A team             | false  |
      | MySchool.Class.1.ClassMembers.1.Children.1.ChildFullName                          | Joe Kember         | false  |
      | MySchool.Class.1.ClassMembers.1.Children.1.ChildAddress.AddressLine1              | 150 Boyson Road    | false  |
      | MySchool.Class.1.ClassMembers.1.Children.1.NeedsSupport                           |                    | false  |
      | MySchool.Class.1.ClassMembers.1.Children.1.IsAutistic                             |                    | false  |
      | MySchool.Class.1.ClassMembers.1.Children.1.AutisticChildCaseNumber.CaseReference  | 1111222233334444   | false  |


  Scenario: overrides the complex type data using the definition file EventToComplexTypes sheet
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the fields should have label, hint text and displayContext updated

