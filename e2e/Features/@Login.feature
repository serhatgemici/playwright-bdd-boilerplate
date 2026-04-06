@skip
Feature: User Login and Logout
              As a registered user
              I want to log in and out of my account
  So that I can securely access and exit my account

        Background:
            Given user has landed on the homepage
             When user clicks on "Signup / Login" button
             Then "Login to your account" text is "visible"

        @smoke
        Scenario: TC2 - Login with correct email and password
             When user enters a correct email address and password
              And user clicks "login" button
             Then "Logged in as username" text is "visible" at the top
             When user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"

        @negative
        Scenario: TC3 - Login with incorrect email and password
             When user enters an incorrect email address and password
              And user clicks "login" button
             Then the error message "Your email or password is incorrect!" is "visible"

        @smoke
        Scenario: TC4 - Logout user
             When user enters a correct email address and password
              And user clicks "login" button
             Then "Logged in as username" text is "visible" at the top
             When user clicks "Logout" button
             Then user is navigated to the login page
