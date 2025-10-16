Feature: JetBrains Buy page tests
              As a prospective customer, I want to quickly verify the Buy page works, So that I can start a purchase journey

        @smoke @non-functional @no-payment
        Scenario Outline: Validating default state of the "<productName>" buy page
            Given user is on the "<pageSlug>" page
              And cookie consent dialog is "displayed"
             When user accepts all cookies
             Then cookie consent dialog is "not displayed"
              And heading displays "<title>"
              And common tier switcher is validated on "<productName>" buy page
              And billing term switcher is validated on "<productName>" buy page
              And product cards are validated on "<productName>" buy page in default state
              And there are no errors in console
        Examples:
                  | caseId | productName | pageSlug   | title                            |
                  | C1     | idea        | idea/buy/  | Subscription Options and Pricing |
                  | C2     | cLion       | clion/buy/ | Subscription Plans               |
                  | C3     | rustRover   | rust/buy/  | Subscription Plans               |

        @smoke @functional @no-payment @skip
        Scenario Outline: "<caseId>" Clicking buy button on "<productEdition>" product card and getting redirected to shop login page
            Given user is on the "<pageSlug>" page
              And cookie consent dialog is "displayed"
              And user accepts all cookies
              And cookie consent dialog is "not displayed"
             When user selects tier as "<tier>" for "<productEdition>"
              And user selects billing term as "<billingTerm>"
              And user clicks buy button on the "<productEdition>" card
             Then user gets redirected to shop login page
        Examples:
                  | caseId | pageSlug   | tier               | productEdition         | billingTerm     |
                  | C4     | idea/buy/  | For Organizations  | IntelliJ IDEA Ultimate | Yearly billing  |
                  | C5     | idea/buy/  | For Organizations  | IntelliJ IDEA Ultimate | Monthly billing |
                  | C6     | idea/buy/  | For Individual Use | IntelliJ IDEA Ultimate | Yearly billing  |
                  | C7     | idea/buy/  | For Individual Use | IntelliJ IDEA Ultimate | Monthly billing |
                  | C8     | idea/buy/  | For Organizations  | All Products Pack      | Yearly billing  |
                  | C9     | idea/buy/  | For Organizations  | All Products Pack      | Monthly billing |
                  | C10    | idea/buy/  | For Individual Use | All Products Pack      | Yearly billing  |
                  | C11    | idea/buy/  | For Individual Use | All Products Pack      | Monthly billing |
                  | C12    | clion/buy/ | Organizations      | CLion Commercial       | Yearly billing  |
                  | C13    | clion/buy/ | Organizations      | CLion Commercial       | Monthly billing |
                  | C14    | clion/buy/ | Individuals        | CLion Commercial       | Yearly billing  |
                  | C15    | clion/buy/ | Individuals        | CLion Commercial       | Monthly billing |
                  | C16    | clion/buy/ | Organizations      | All Products Pack      | Yearly billing  |
                  | C17    | clion/buy/ | Organizations      | All Products Pack      | Monthly billing |
                  | C18    | clion/buy/ | Individuals        | All Products Pack      | Yearly billing  |
                  | C19    | clion/buy/ | Individuals        | All Products Pack      | Monthly billing |
                  | C20    | rust/buy/  | For Organizations  | RustRover Commercial   | Yearly billing  |
                  | C21    | rust/buy/  | For Organizations  | RustRover Commercial   | Monthly billing |
                  | C22    | rust/buy/  | For Individual Use | RustRover Commercial   | Yearly billing  |
                  | C23    | rust/buy/  | For Individual Use | RustRover Commercial   | Monthly billing |
                  | C24    | rust/buy/  | For Organizations  | All Products Pack      | Yearly billing  |
                  | C25    | rust/buy/  | For Organizations  | All Products Pack      | Monthly billing |
                  | C26    | rust/buy/  | For Individual Use | All Products Pack      | Yearly billing  |
                  | C27    | rust/buy/  | For Individual Use | All Products Pack      | Monthly billing |

        @smoke @functional @no-payment @skip
        Scenario Outline: "<caseId>" Changing the tier from "<initialTier>" to "<targetTier>" and validating UI updates for "<productName>" "<productEdition>"
            Given user is on the "<pageSlug>" page
              And cookie consent dialog is "displayed"
              And user accepts all cookies
              And cookie consent dialog is "not displayed"
             When user switches to "<targetTier>" on the "<productEdition>" product card
             Then available product cards for "<productName>" for "<targetTier>" tier are displayed
              And pricing reflects the "<targetTier>" tier selection on the "<productEdition>" product card

             When user switches from "<targetTier>" to initial tier on the "<productEdition>" product card
             Then available product cards for "<productName>" for initial tier are displayed
              And pricing reflects the initial tier selection on the "<productEdition>" product card
        Examples:
                  | caseId | productName | pageSlug   | initialTier        | targetTier         | productEdition         |
                  | C28    | idea        | idea/buy/  | For Organizations  | For Individual Use | IntelliJ IDEA Ultimate |
                  | C29    | idea        | idea/buy/  | For Organizations  | For Individual Use | All Products Pack      |
                  | C30    | cLion       | clion/buy/ | Individuals        | Organizations      | CLion Commercial       |
                  | C31    | cLion       | clion/buy/ | Individuals        | Organizations      | All Products Pack      |
                  | C32    | rustRover   | rust/buy/  | For Individual Use | For Organizations  | RustRover Commercial   |
                  | C33    | rustRover   | rust/buy/  | For Individual Use | For Organizations  | All Products Pack      |

        @smoke @functional @no-payment @skip
        Scenario Outline: "<caseId>" Changing the billing term from "<initialBillingTerm>" to "<targetBillingTerm>" and validating UI updates for "<productName>" "<productEdition>"
            Given user is on the "<pageSlug>" page
              And cookie consent dialog is "displayed"
              And user accepts all cookies
              And cookie consent dialog is "not displayed"
             When user selects "<targetBillingTerm>" on the "<productEdition>" product card
             Then pricing reflects the "<targetBillingTerm>" billing term selection on the "<productEdition>" product card

             When user selects initial billing term on the "<productEdition>" product card
             Then pricing reflects the initial billing term selection on the "<productEdition>" product card
        Examples:
                  | caseId | productName | pageSlug   | initialBillingTerm | targetBillingTerm | productEdition         |
                  | C34    | idea        | idea/buy/  | Yearly billing     | Monthly billing   | IntelliJ IDEA Ultimate |
                  | C35    | idea        | idea/buy/  | Yearly billing     | Monthly billing   | All Products Pack      |
                  | C36    | cLion       | clion/buy/ | Monthly billing    | Yearly billing    | CLion Commercial       |
                  | C37    | cLion       | clion/buy/ | Monthly billing    | Yearly billing    | All Products Pack      |
                  | C38    | rustRover   | rust/buy/  | Yearly billing     | Monthly billing   | RustRover Commercial   |
                  | C39    | rustRover   | rust/buy/  | Yearly billing     | Monthly billing   | All Products Pack      |

        @smoke @functional @no-payment @skip
        Scenario Outline: "<caseId>" Toggling JetBrains AI Pro add-on and validating pricing updates for "<productName>" "<productEdition>"
            Given user is on the "<pageSlug>" page
              And cookie consent dialog is "displayed"
              And user accepts all cookies
              And cookie consent dialog is "not displayed"
             When user toggles the Supercharge with JetBrains AI Pro checkbox on "<productEdition>" product card
             Then price updates to include the add-on pricing on "<productEdition>" product card

             When user toggles the Supercharge with JetBrains AI Pro checkbox on "<productEdition>" product card
             Then price updates to exclude the add-on pricing on "<productEdition>" product card
        Examples:
                  | caseId | productName | pageSlug   | productEdition         |
                  | C40    | idea        | idea/buy/  | IntelliJ IDEA Ultimate |
                  | C41    | cLion       | clion/buy/ | CLion Commercial       |
                  | C42    | rustRover   | rust/buy/  | RustRover Commercial   |
