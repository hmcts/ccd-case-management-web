@functional
Feature: Authorisation for Complex Types allows fine grained access to sub fields based on roles

  Background:
    Given I have logged in

  Scenario:
    Given a case type containing Complex Type Authorisation exists
    And I start the case creation for complex authorisation case
    Then only the fields defined in AuthorisationComplexTypes sheet for CREATE should be visible

  Scenario:
    Given a case type containing Complex Type Authorisation exists
    And I create the case with Complex Type Authorisation
    And I navigate to tab 'My School Details'
    Then the 'School name' field will be visible on the 'My School Details' tab
    Then the 'School supports autistic children' field will NOT be visible on the 'My School Details' tab
    And the available actions should be:
      | Modify case |
      | Close case  |

  Scenario:
    Given a case type containing Complex Type Authorisation exists
    And I create the case with Complex Type Authorisation
    And I select and submit the event Modify Case
    Then only the fields defined in AuthorisationComplexTypes sheet for UPDATE should be editable

# Currently not possible to query complex search result field, case view controls should be enough for now
#    Scenario:
#      Given I am on the case list page and selected CaseType CRUDComplex
#      Then the school number is NOT displayed in the case list results
