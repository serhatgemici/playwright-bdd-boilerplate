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
             When user enters signup name as "random"
              And user enters signup email address as "random"
              And user clicks on "Signup" button
             Then "ENTER ACCOUNT INFORMATION" text is "visible"
             When user selects title as "Mr."
              And user enters name as "random"
              And user enters password as "random"
              And user selects date of birth as "random"
              And user selects the "newsletter" checkbox
              And user selects the "special offers" checkbox

              And user enters first name as "random"
              And user enters last name as "random"
              And user enters company as "random"
              And user enters address as "random"
              And user enters address2 as "random"
              And user selects country as "random"
              And user enters state as "random"
              And user enters city as "random"
              And user enters zipcode as "random"
              And user enters mobile number as "random"
          
              And user clicks on "Create Account" button
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks on "Continue" link
             Then logged in as text displays the full name of the user correctly

        @smoke
        Scenario: TC2 - Delete a registered account
            Given random user created by api call
              And user is logged in as "api_created_user"
              And logged in as text displays the full name of the user correctly
             When user clicks on "Delete Account" link
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks on "Continue" link

        @negative
        Scenario: TC5 - Attempting to register a new user with an already registered email address
             When user enters signup name as "Serhat"
              And user enters signup email address as "serhat@example.com"
              And user clicks on "Signup" button
             Then "Email Address already exist!" text is "visible"
