@skip
Feature: Shopping Cart Management
              As a user
              I want to manage items in my shopping cart
  So that I can prepare my order before checkout

        Background:
            Given the user has landed on the homepage

        @smoke
        Scenario: TC12 - Add multiple products to cart
             When the user clicks "Products" button
              And the user hovers over the first product and clicks "Add to cart"
              And the user clicks "Continue Shopping" button
              And the user hovers over the second product and clicks "Add to cart"
              And the user clicks "View Cart" button
             Then both products are added to the cart
              And their prices, quantities and total prices are verified

        
        Scenario: TC13 - Verify product quantity in cart
             When the user clicks "View Product" for any product on the home page
             Then the product detail page is opened
             When the user increases the quantity to 4
              And the user clicks "Add to cart" button
              And the user clicks "View Cart" button
             Then the product is displayed in the cart with a quantity of 4

        
        Scenario: TC17 - Remove a product from the cart
             When the user adds products to the cart
              And the user clicks "Cart" button
             Then the cart page is displayed
             When the user clicks the "X" button for the specific product
             Then the product is removed from the cart

        
        Scenario: TC22 - Add a product to cart from Recommended Items
             When the user scrolls to the bottom of the page
             Then "RECOMMENDED ITEMS" section is visible
             When the user clicks "Add To Cart" on a recommended product
              And the user clicks "View Cart" button
             Then the recommended product is displayed in the cart page
