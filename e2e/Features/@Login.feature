@skip
Feature: User Login and Logout
              As a registered user
              I want to log in and out of my account
  So that I can securely access and exit my account

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        @smoke
        Scenario: TC2 - Login with correct email and password
             When the user clicks on "Signup / Login" button
             Then "Login to your account" text is visible
             When the user enters a correct email address and password
              And the user clicks "login" button
             Then "Logged in as username" text is visible at the top
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible

        @negative
        Scenario: TC3 - Login with incorrect email and password
             When the user clicks on "Signup / Login" button
             Then "Login to your account" text is visible
             When the user enters an incorrect email address and password
              And the user clicks "login" button
             Then the error message "Your email or password is incorrect!" is visible

        @smoke
        Scenario: TC4 - Logout user
             When the user clicks on "Signup / Login" button
             Then "Login to your account" text is visible
             When the user enters a correct email address and password
              And the user clicks "login" button
             Then "Logged in as username" text is visible at the top
             When the user clicks "Logout" button
             Then the user is navigated to the login page
