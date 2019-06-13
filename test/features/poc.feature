Feature:

  @poc
  Scenario: poc for new step idea
    Then the page contains the following fields
      | field         |value          |  hidden  |
      | TextField1    |blah           |  false   |
      | TextField2    |               |  true    |
      | addressLine1  |Petty France   |  false   |
      | Country       |uk             |  false   |
      | Postcode      |               |  false   |
