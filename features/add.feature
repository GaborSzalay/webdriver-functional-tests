Feature: addition

  Scenario: small numbers
    Given User is on the simple calculator page
      And User enter 4 in A field
      And User enter 5 in B field
     When User press Add button
     Then The result should contain 9