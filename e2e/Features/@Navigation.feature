@skip
Feature: Website Navigation
              As a user
              I want to navigate between different pages
  So that I can access all sections of the website

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        
        Scenario: TC7 - Verify Test Cases page is accessible
             When the user clicks on "Test Cases" button
             Then the user is navigated to the test cases page successfully
