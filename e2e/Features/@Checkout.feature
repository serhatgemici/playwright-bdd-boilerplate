@skip
Feature: Order Checkout and Payment
              As a user
              I want to checkout and place an order
  So that I can purchase products successfully

        Background:
            Given user has landed on the homepage

        
        Scenario: TC14 - Place order: Register during checkout
             When user adds products to the cart
              And user clicks "Cart" button
             Then the cart page is displayed
             When user clicks "Proceed To Checkout"
              And user clicks "Register / Login" button
              And user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks "Continue" button
             Then "Logged in as username" text is "visible" at the top
             When user clicks "Cart" button
              And user clicks "Proceed To Checkout" button
             Then the Address Details and Review Your Order section are "visible"
             When user enters a description in the comment text area and clicks "Place Order"
              And user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is "visible"
             When user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks "Continue" button

        
        Scenario: TC15 - Place order: Register before checkout
             When user clicks "Signup / Login" button
              And user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks "Continue" button
             Then "Logged in as username" text is "visible" at the top
             When user adds products to the cart
              And user clicks "Cart" button
             Then the cart page is displayed
             When user clicks "Proceed To Checkout"
             Then the Address Details and Review Your Order section are "visible"
             When user enters a description in the comment text area and clicks "Place Order"
              And user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is "visible"
             When user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks "Continue" button

        
        Scenario: TC16 - Place order: Login before checkout
             When user clicks "Signup / Login" button
              And user enters email, password and clicks "Login" button
             Then "Logged in as username" text is "visible" at the top
             When user adds products to the cart
              And user clicks "Cart" button
             Then the cart page is displayed
             When user clicks "Proceed To Checkout"
             Then the Address Details and Review Your Order section are "visible"
             When user enters a description in the comment text area and clicks "Place Order"
              And user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is "visible"
             When user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks "Continue" button

        
        Scenario: TC23 - Verify address details on the checkout page
             When user clicks "Signup / Login" button
              And user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks "Continue" button
             Then "Logged in as username" text is "visible" at the top
             When user adds products to the cart
              And user clicks "Cart" button
             Then the cart page is displayed
             When user clicks "Proceed To Checkout"
             Then the delivery address matches the address entered during account registration
              And the billing address matches the address entered during account registration
             When user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks "Continue" button

        
        Scenario: TC24 - Download invoice after placing an order
             When user adds products to the cart
              And user clicks "Cart" button
             Then the cart page is displayed
             When user clicks "Proceed To Checkout"
              And user clicks "Register / Login" button
              And user fills all details in Signup and creates an account
             Then "ACCOUNT CREATED!" text is "visible"
             When user clicks "Continue" button
             Then "Logged in as username" text is "visible" at the top
             When user clicks "Cart" button
              And user clicks "Proceed To Checkout" button
             Then the Address Details and Review Your Order section are "visible"
             When user enters a description in the comment text area and clicks "Place Order"
              And user enters payment details: Name on Card, Card Number, CVC, Expiration date
              And user clicks "Pay and Confirm Order" button
             Then the success message "Your order has been placed successfully!" is "visible"
             When user clicks "Download Invoice" button
             Then the invoice is downloaded successfully
             When user clicks "Continue" button
              And user clicks "Delete Account" button
             Then "ACCOUNT DELETED!" text is "visible"
              And user clicks "Continue" button
