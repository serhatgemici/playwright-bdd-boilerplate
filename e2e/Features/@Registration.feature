Feature: User Registration
              As a new visitor
              I want to register an account on AutomationExercise
  So that I can access all website features

        Background:
            Given user has landed on the homepage
             When user clicks on "Signup / Login" on the navigation bar
             Then "New User Signup!" text is "visible"

        @smoke
        Scenario: TC1 - Register a new user successfully
             When user enters signup name as "Serhat"
              And user enters signup email address as "serhat@example.com"
              And user clicks on "Signup" button
             Then "ENTER ACCOUNT INFORMATION" text is "visible"
             When user selects title as "Mr."
              And user enters name as "Serhat Filan"
              And user enters password as "password123"
              And user selects date of birth as "1", "January", "1990"
              And user selects the "newsletter" checkbox
              And user selects the "special offers" checkbox

              And user enters first name as "Serhat"
              And user enters last name as "Filan"
              And user enters company as "Example Inc."
              And user enters address as "123 Main St"
              And user enters address2 as "Apt 4B"
              And user selects country as "United States"
              And user enters state as "California"
              And user enters city as "Los Angeles"
              And user enters zipcode as "90001"
              And user enters mobile number as "+1234567890"
          
              And user clicks on "Create Account" button
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks on "Continue" link
             Then logged in as "Serhat Filan" text is "visible" at the navigation bar
             When user clicks on "Delete Account" link
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks on "Continue" link

        @negative @skip
        Scenario: TC5 - Register user with an already registered email address
             When user enters a name and an already registered email address
              And user clicks "Signup" button
             Then the error message "Email Address already exist!" is "visible"
