@skip
Feature: JetBrains Product Purchase Journey
              As a software developer
              I want to explore and purchase JetBrains development tools
  So that I can improve my productivity and code quality

        Background:
            Given I am a prospective customer visiting the JetBrains website
              And I accept the cookie consent to proceed

        @smoke @business-critical
        Scenario Outline: Exploring available subscription options for <product>
            Given I am interested in "<product>" development tools
             When I visit the "<product>" pricing page
             Then I should see clear pricing information for my needs
              And I should be able to compare different subscription options
              And I should see appropriate billing terms for my budget planning
    
        Examples:
                  | product       |
                  | IntelliJ IDEA |
                  | CLion         |
                  | RustRover     |

        @functional @purchase-flow
        Scenario: Starting a purchase as an individual developer
            Given I am an individual developer interested in "IntelliJ IDEA"
             When I visit the "IntelliJ IDEA" pricing page
              And I select "For Individual Use" pricing tier
              And I choose "Yearly billing" for cost savings
              And I click "Buy" for "IntelliJ IDEA Ultimate"
             Then I should be redirected to the secure checkout process
              And I should see the correct pricing in my cart

        @functional @enterprise-purchase
        Scenario: Exploring enterprise pricing options
            Given I represent an organization evaluating development tools
             When I visit the "CLion" pricing page
              And I select "For Organizations" pricing tier
              And I choose "Monthly billing" for flexibility
              And I click "Get quote" for "CLion Commercial"
             Then I should be redirected to the enterprise sales process
              And I should see options to discuss volume pricing

        @accessibility @inclusive-design
        Scenario: Ensuring pricing information is accessible
            Given I am a developer with accessibility needs
             When I visit any product pricing page
             Then pricing information should be clearly structured
              And interactive elements should be keyboard accessible
              And screen readers should be able to interpret the content

        @performance @user-experience
        Scenario: Fast and responsive pricing pages
            Given I am browsing on various devices
             When I visit product pricing pages
             Then pages should load quickly across different network speeds
              And pricing comparisons should be easily viewable on mobile devices