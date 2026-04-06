@skip
Feature: Newsletter Subscription
              As a user
              I want to subscribe to the newsletter
  So that I can receive updates and offers

        Background:
            Given the user has landed on the homepage

        
        Scenario: TC10 - Verify subscription from the Home page
             When the user scrolls down to the footer
             Then "SUBSCRIPTION" text is "visible" in the footer
             When the user enters an email address in the subscription input and clicks the arrow button
             Then the success message "You have been successfully subscribed!" is "visible"

       
        Scenario: TC11 - Verify subscription from the Cart page
             When the user clicks "Cart" button
              And the user scrolls down to the footer
             Then "SUBSCRIPTION" text is "visible" in the footer
             When the user enters an email address in the subscription input and clicks the arrow button
             Then the success message "You have been successfully subscribed!" is "visible"
