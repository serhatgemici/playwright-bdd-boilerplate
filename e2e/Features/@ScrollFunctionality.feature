@skip
Feature: Scroll Functionality
              As a user
              I want to scroll up and down the page
  So that I can navigate through all content on the home page

        Background:
            Given the user has landed on the homepage

       
        Scenario: TC25 - Scroll up using the Arrow button after scrolling down
             When the user scrolls down the page to the bottom
             Then "SUBSCRIPTION" text is "visible" in the footer
             When the user clicks the arrow button at the bottom right to scroll up
             Then the page is scrolled up
              And "Full-Fledged practice website for Automation Engineers" text is "visible" on screen

        
        Scenario: TC26 - Scroll up manually without using the Arrow button
             When the user scrolls down the page to the bottom
             Then "SUBSCRIPTION" text is "visible" in the footer
             When the user scrolls up the page to the top manually
             Then the page is scrolled up
              And "Full-Fledged practice website for Automation Engineers" text is "visible" on screen
