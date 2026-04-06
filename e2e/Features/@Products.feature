@skip
Feature: Products Browsing and Search
              As a user
              I want to browse, search and view products
  So that I can find items I want to purchase

        Background:
            Given the user launches the browser
              And the user navigates to "http://automationexercise.com"
             Then the home page is visible successfully

        @smoke
        Scenario: TC8 - Verify All Products and product detail page
             When the user clicks on "Products" button
             Then the user is navigated to the ALL PRODUCTS page successfully
              And the products list is visible
             When the user clicks "View Product" for the first product
             Then the user is landed on the product detail page
              And the product details are visible: product name, category, price, availability, condition, brand

        @smoke
        Scenario: TC9 - Search for a product
             When the user clicks on "Products" button
             Then the user is navigated to the ALL PRODUCTS page successfully
             When the user enters a product name in the search input and clicks the search button
             Then "SEARCHED PRODUCTS" text is visible
              And all products related to the search are visible

       
        Scenario: TC18 - View category products
             When the categories are visible on the left side bar
              And the user clicks on "Women" category
              And the user clicks on a sub-category link under "Women" category, for example: Dress
             Then the category page is displayed and text "WOMEN - TOPS PRODUCTS" is confirmed
             When the user clicks on any sub-category link of "Men" category on the left side bar
             Then the user is navigated to that category page

        
        Scenario: TC19 - View and browse Brand products
             When the user clicks on "Products" button
             Then Brands are visible on the left side bar
             When the user clicks on any brand name
             Then the user is navigated to the brand page
              And the brand products are displayed
             When the user clicks on any other brand link on the left side bar
             Then the user is navigated to that brand page and can see products

        
        Scenario: TC20 - Search products and verify cart persistence after login
             When the user clicks on "Products" button
             Then the user is navigated to the ALL PRODUCTS page successfully
             When the user enters a product name in the search input and clicks the search button
             Then "SEARCHED PRODUCTS" text is visible
              And all products related to the search are visible
             When the user adds the searched products to cart
              And the user clicks "Cart" button
             Then the added products are visible in the cart
             When the user clicks "Signup / Login" button and submits login details
              And the user navigates to the Cart page again
             Then the products are still visible in the cart after login


        Scenario: TC21 - Add a review on a product
             When the user clicks on "Products" button
             Then the user is navigated to the ALL PRODUCTS page successfully
             When the user clicks "View Product" button
             Then "Write Your Review" text is visible
             When the user enters name, email and review text
              And the user clicks "Submit" button
             Then the success message "Thank you for your review." is visible
