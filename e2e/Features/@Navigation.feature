@skip
Feature: Website Navigation
              As a user
              I want to navigate between different pages
  So that I can access all sections of the website

        Background:
            Given user has landed on the homepage

        
        Scenario: TC7 - Verify Test Cases page is accessible
             When user clicks on "Test Cases" button
             Then user is navigated to the test cases page successfully
