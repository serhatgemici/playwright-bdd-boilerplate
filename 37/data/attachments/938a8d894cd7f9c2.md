# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/Features/@Login.feature.spec.js >> User Login and Logout >> TC3 - Login attempt with incorrect email and password
- Location: .features-gen/e2e/Features/@Login.feature.spec.js:19:3

# Error details

```
TimeoutError: locator.click: Timeout 4000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Signup / Login' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "This website is under heavy load (queue full)" [level=2] [ref=e2]
  - paragraph [ref=e3]: We're sorry, too many people are accessing this website at the same time. We're working on this problem. Please try again later.
```

# Test source

```ts
  1  | import { expect, Page, Locator } from '@playwright/test';
  2  | 
  3  | import BasePage from '#e2e/Pages/BasePage';
  4  | 
  5  | class NavigationBar {
  6  |   page: Page;
  7  |   // External page objects properties declarations
  8  |   basePage: BasePage;
  9  |   // Locator properties declarations
  10 |   readonly header: Locator;
  11 |   readonly logo: Locator;
  12 |   readonly homeLink: Locator;
  13 |   readonly productsLink: Locator;
  14 |   readonly cartLink: Locator;
  15 |   readonly signUpLoginLink: Locator;
  16 |   readonly testCasesLink: Locator;
  17 |   readonly apiTestingLink: Locator;
  18 |   readonly contactUsLink: Locator;
  19 | 
  20 |   constructor(page: Page) {
  21 |     this.page = page;
  22 | 
  23 |     // External page objects initializations
  24 |     this.basePage = new BasePage(page);
  25 | 
  26 |     // Locator properties initializations & assignments
  27 |     this.header = page.locator('header');
  28 |     this.logo = page.getByRole('img', { name: 'Website for automation practice' });
  29 |     this.homeLink = page.getByRole('link', { name: 'Home' });
  30 |     this.productsLink = page.getByRole('link', { name: 'Products' });
  31 |     this.cartLink = page.getByRole('link', { name: 'Cart' });
  32 |     this.signUpLoginLink = page.getByRole('link', { name: 'Signup / Login' });
  33 |     this.testCasesLink = page.getByRole('link', { name: 'Test Cases' });
  34 |     this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
  35 |     this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  36 |   }
  37 | 
  38 |   // METHODS
  39 | 
  40 |   async clickNavBarItemByName(name: string) {
  41 |     const navBarItem = this.page.getByRole('link', { name });
> 42 |     await navBarItem.click();
     |                      ^ TimeoutError: locator.click: Timeout 4000ms exceeded.
  43 |   }
  44 | 
  45 |   async validateLoggedInAsText(fullName: string) {
  46 |     const loggedInAsText = this.page.getByText(`Logged in as ${fullName}`);
  47 |     await expect(loggedInAsText).toBeVisible();
  48 |   }
  49 | }
  50 | 
  51 | export default NavigationBar;
  52 | 
```