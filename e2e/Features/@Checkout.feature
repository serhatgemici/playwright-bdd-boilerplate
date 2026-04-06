@skip
Feature: Order Checkout and Payment
              As a user
              I want to checkout and place an order
  So that I can purchase products successfully

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        
        Scenario: TC14 - Place order: Register during checkout
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks "Proceed To Checkout"
              And the user clicks "Register / Login" button
              And the user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is visible
             When the user clicks "Continue" button
             Then "Logged in as username" text is visible at the top
             When the user clicks "Cart" button
              And the user clicks "Proceed To Checkout" button
             Then the Address Details and Review Your Order section are visible
             When the user enters a description in the comment text area and clicks "Place Order"
              And the user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And the user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is visible
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button

        
        Scenario: TC15 - Place order: Register before checkout
             When the user clicks "Signup / Login" button
              And the user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is visible
             When the user clicks "Continue" button
             Then "Logged in as username" text is visible at the top
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks "Proceed To Checkout"
             Then the Address Details and Review Your Order section are visible
             When the user enters a description in the comment text area and clicks "Place Order"
              And the user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And the user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is visible
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button

        
        Scenario: TC16 - Place order: Login before checkout
             When the user clicks "Signup / Login" button
              And the user enters email, password and clicks "Login" button
             Then "Logged in as username" text is visible at the top
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks "Proceed To Checkout"
             Then the Address Details and Review Your Order section are visible
             When the user enters a description in the comment text area and clicks "Place Order"
              And the user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And the user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is visible
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button

        
        Scenario: TC23 - Verify address details on the checkout page
             When the user clicks "Signup / Login" button
              And the user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is visible
             When the user clicks "Continue" button
             Then "Logged in as username" text is visible at the top
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks "Proceed To Checkout"
             Then the delivery address matches the address entered during account registration
              And the billing address matches the address entered during account registration
             When the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button

        
        Scenario: TC24 - Download invoice after placing an order
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks "Proceed To Checkout"
              And the user clicks "Register / Login" button
              And the user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is visible
             When the user clicks "Continue" button
             Then "Logged in as username" text is visible at the top
             When the user clicks "Cart" button
              And the user clicks "Proceed To Checkout" button
             Then the Address Details and Review Your Order section are visible
             When the user enters a description in the comment text area and clicks "Place Order"
              And the user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And the user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is visible
             When the user clicks "Download Invoice" button
             Then the invoice is downloaded successfully
             When the user clicks "Continue" button
              And the user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is visible
              And the user clicks "Continue" button
