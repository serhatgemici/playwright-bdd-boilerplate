Feature: User Login and Logout
              As a registered user
              I want to log in and out of my account
  So that I can securely access and exit my account

        Background:
            Given user has landed on the homepage
             When user clicks on "Signup / Login" on the navigation bar
             Then "Login to your account" text is "visible"

        @smoke
        Scenario: TC2 - Login with valid email and password
             When user enters login email as "serhat2@example.com"
              And user enters login password as "password123"
              And user clicks on "login" button
             Then logged in as "Serhat Filan" text is visible at the navigation bar


        @negative
        Scenario: TC3 - Login attempt with incorrect email and password
             When user enters login email as "incorrect@example.com"
              And user enters login password as "wrongpassword"
              And user clicks on "login" button
             Then "Your email or password is incorrect!" text is "visible"

        @smoke
        Scenario: TC4 - Logout user
             When user enters login email as "serhat2@example.com"
              And user enters login password as "password123"
              And user clicks on "login" button
             Then logged in as "Serhat Filan" text is visible at the navigation bar
             When user clicks on "Logout" on the navigation bar
             #Then user is navigated to the login page
