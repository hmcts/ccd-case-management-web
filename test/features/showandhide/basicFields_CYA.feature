@functional @showandhide @cya
Feature: Hide and show of basic fields on the Check Your Answers page

  Background:
    Given the following definition for 'case fields in events'
      | Event         | ID                   | Display context | Field show condition           | Page show condition        |
      | createCase    | TextField            | Mandatory       |                                |                            |
      | createCase    | TextField2           | Optional        | TextField="showmethemoney"     |                            |
      | createCase    | MaritalStatusField   | Optional        |                                |                            |
      | createCase    | TextField3           | Optional        |                                | TextField="showmethemoney" |
      | createCase    | AddressComplex1      | Optional        | TextField3="showpage3"         | TextField3="showpage3"     |
    And I have logged in
    And a case type containing show and hide functionality exists

  Scenario: Check Your Answers hides fields that were hidden on a wizard page
    When I do NOT meet the condition for showing the field
    Then the following fields will be visible on CYA page:
      | Text Field      |
      | Marital Status  |
    And the following fields will NOT be visible on CYA page:
      | Text Field 2    |

  Scenario: Check Your Answers shows fields that were shown on a wizard page
    When I do meet the condition for showing the field
    Then the following fields will be visible on CYA page:
      | Text Field      |
      | Text Field 2    |
      | Marital Status  |
      | Text Field 3    |

  Scenario: Check Your Answers hides fields from a hidden wizard page
    When I do NOT meet the condition for showing the page
    Then the following fields will be visible on CYA page:
      | Text Field      |
      | Text Field 2    |
      | Marital Status  |
    And the following fields will NOT be visible on CYA page:
      | Address Complex |

  Scenario: Check Your Answers shows fields from a shown wizard page
    When I do meet the condition for showing the page
    Then the following fields will be visible on CYA page:
      | Text Field      |
      | Text Field 2    |
      | Marital Status  |
      | Text Field 3    |
      | Address Complex |
