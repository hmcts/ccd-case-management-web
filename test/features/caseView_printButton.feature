@functional @caseView
Feature: Set of scenarios testing case view functionality

  Background:
    Given I have logged in

  Scenario: print button visible on case view when configured
    Given the definition sheet 'CaseType' looks like this
      | ID              | Name                 | PrintableDocumentsUrl                                                                     |
      | AllDataTypes2   | All Field Data Types | http://localhost:4452/callback/jurisdictions/AUTOTEST1/case-types/AllDataTypes2/documents |
      | CaseProgression | Case Progression | |

    Given a case type with the print button configured exist
    And I create the case
    Then the print button will be visible

  Scenario: print button not visible on case view by default
    Given the definition sheet 'CaseType' looks like this
      | ID              | Name                 | PrintableDocumentsUrl |
      | CaseProgression | Case Progression     |                       |
    Given a case with the print button not configured exists
    And I create the case
    Then the print button will not be visible
