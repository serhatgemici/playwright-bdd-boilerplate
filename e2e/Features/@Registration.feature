@skip
Feature: User Registration
              As a new visitor
              I want to register an account on AutomationExercise
  So that I can access all website features

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        @smoke
        Scenario: TC1 - Register a new user successfully
             When the user clicks on "Signup / Login" button
             Then "New User Signup!" text is visible
             When the user enters a valid name and email address
              And the user clicks "Signup" button
             Then "ENTER ACCOUNT INFORMATION" text is visible
             When the user fills in account details: Title, Name, Email, Password, Date of birth
              And the user selects the "Sign up for our newsletter!" checkbox
              And the user selects the "Receive special offers from our partners!" checkbox
              And the user fills in address details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
              And the user clicks "Create Account" button
             Then "ACCOUNT CREATED!" text is visible
             When the user clicks "Continue" button
             Then "Logged in as username" text is visible at the top
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button

        @negative
        Scenario: TC5 - Register user with an already registered email
             When the user clicks on "Signup / Login" button
             Then "New User Signup!" text is visible
             When the user enters a name and an already registered email address
              And the user clicks "Signup" button
             Then the error message "Email Address already exist!" is visible
