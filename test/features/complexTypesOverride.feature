@functional @complexcollections @showandhide
Feature: Set of scenarios testing complexTypes override

  Background:
    Given the following definition for 'case fields'
      | ID          | Path                             | FieldType   | FieldTypeParameter | Label                                |
      | MySchool    | Number                           | Number      |                    | School number                        |
      | MySchool    | Name                             | Text        |                    | School name                          |
      | MySchool    | ProvidesAutisticChildrenSupport  | YesOrNo     |                    | School supports autistic children    |
      | MySchool    | Class                            | Collection  | SchoolClass        | School class                         |
      | SchoolClass | ClassName                        | Text        |                    | Class name                           |
      | SchoolClass | ClassNumber                      | Number      |                    | Class number                         |
      | SchoolClass | ClassMembers                     | Collection  | Family             | Class members (collection)           |
      | Family      | MotherFullName                   | Text        |                    | Mother Full Name                     |
      | Family      | FatherAge                        | Text        |                    | Mother Age                           |
      | Family      | FatherFullName                   | Text        |                    | Father Full Name                     |
      | Family      | FatherAge                        | Text        |                    | Father Age                           |
      | Family      | FamilyAddress                    | AddressUK   |                    | Family Address                       |
      | Family      | Children                         | Collection  | Child              | Children (collection label)          |
      | Child       | ChildFullName                    | Text        |                    | Child Full Name                      |
      | Child       | ChildGender                      | FixedList   | gender             | Child Gender                         |
      | Child       | ChildDOB                         | Date        |                    | Child date of Birth                  |
      | Child       | ChildAddress                     | AddressUK   |                    | Child address                        |
      | Child       | IsAutistic                       | YesOrNo     |                    | Is the child autistic?               |
      | Child       | NeedsSupport                     | YesOrNo     |                    | Does the child needs support?        |
      | Child       | AutisticChildCaseNumber          | CaseLink    |                    | Autistic child case number reference |

    Given the following definition for 'complex case fields overrides'
      | Id       | Path                                                              | Display context | Label                     | Hint text            | Field show condition                            |
      | MySchool | Name                                                              | MANDATORY       |                           |                      |                                                 |
      | MySchool | ProvidesAutisticChildrenSupport                                   | MANDATORY       |                           |                      |                                                 |
      | MySchool | Class.ClassName                                                   | MANDATORY       |                           |                      |                                                 |
      | MySchool | Class.ClassNumber                                                 | OPTIONAL        |                           |                      | MySchool.Class.ClassName="A team"               |
      | MySchool | Class.ClassMembers.Children.IsAutistic                            | OPTIONAL        |                           |                      | MySchool.ProvidesAutisticChildrenSupport="Yes"  |
      | MySchool | Class.ClassMembers.Children.ChildFullName                         | MANDATORY       | Child full name (UPDATED) | Child hint (UPDATED) |                                                 |
      | MySchool | Class.ClassMembers.Children.ChildGender                           | MANDATORY       |                           |                      |                                                 |
      | MySchool | Class.ClassMembers.Children.ChildAddress.AddressLine1             | OPTIONAL        |                           |                      |                                                 |
      | MySchool | Class.ClassMembers.Children.NeedsSupport                          | OPTIONAL        |                           |                      |                                                 |
      | MySchool | Class.ClassMembers.Children.AutisticChildCaseNumber.CaseReference | OPTIONAL        |                           |                      |                                                 |
    Given I have logged in

  Scenario: filters the complex type fields using the Event to Complex Type override feature
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then only the fields defined in EventToComplexTypes sheet should be visible

  Scenario: overrides the complex type data using the Event to Complex Type override feature
    Given a case type containing Complex and Collection types exists
    When I populate the form with the school data
    Then the fields should have label, hint text and displayContext updated
