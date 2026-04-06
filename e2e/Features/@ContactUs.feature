@skip
Feature: Contact Us Form
              As a website visitor
              I want to submit the Contact Us form
  So that I can send enquiries to the website team

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        @smoke
        Scenario: TC6 - Submit Contact Us form successfully
             When the user clicks on "Contact Us" button
             Then "GET IN TOUCH" text is visible
             When the user enters name, email, subject and message
              And the user uploads a file
              And the user clicks "Submit" button
              And the user clicks "OK" on the alert dialog
             Then the success message "Success! Your details have been submitted successfully." is visible
             When the user clicks the "Home" button
             Then the user is landed on the home page successfully
