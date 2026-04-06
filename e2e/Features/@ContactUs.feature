@skip
Feature: Contact Us Form
              As a website visitor
              I want to submit the Contact Us form
  So that I can send enquiries to the website team

        Background:
            Given user has landed on the homepage

        @smoke
        Scenario: TC6 - Submit Contact Us form successfully
             When user clicks on "Contact Us" button
             Then "GET IN TOUCH" text is "visible"
             When user enters name, email, subject and message
              And user uploads a file
              And user clicks "Submit" button
              And user clicks "OK" on the alert dialog
             Then the success message "Success! Your details have been submitted successfully." is "visible"
             When user clicks the "Home" button
             Then user is landed on the home page successfully
