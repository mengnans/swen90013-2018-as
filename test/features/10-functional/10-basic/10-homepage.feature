Feature: Landing page

    # As a user
    # When I come to Ask Izzy
    # I want to see a landing page with information and a link to click through
    # So that I can understand what Ask Izzy provides


    Scenario: Visit home page
        When I visit /
        Then I should see "Ask Izzy"