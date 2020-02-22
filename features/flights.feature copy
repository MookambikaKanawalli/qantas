Feature: flights booking

    @e2e
    Scenario: flights booking +ve sceanrio
        Given Dan is planning to book flights from Php travels page
        When he search for the available flights
            | from | to  | adults | child | infant |
            | SYD  | BNE | 2      | 2     | 2      |
        Then he should see search results
        When he selects the first search result to book
        And completes the booking
        Then he should get booking INVOICE with flight details


    @e2e
    Scenario: flights booking -ve sceanrio -> invalid TO
        Given Dan is planning to book flights from Php travels page
        When he search for the available flights
            | from | to     | adults | child | infant |
            | SYD  | BNEEEE | 2      | 2     | 2      |
        Then he should see search results
        When he selects the first search result to book
        And completes the booking
        Then he should get booking INVOICE with flight details


    @e2e
    Scenario: flights booking -ve sceanrio -> invalid FROM
        Given Dan is planning to book flights from Php travels page
        When he search for the available flights
            | from     | to  | adults | child | infant |
            | BLRRRRRR | DEL | 2      | 2     | 2      |
        Then he should see search results
        When he selects the first search result to book
        And completes the booking
        Then he should get booking INVOICE with flight details