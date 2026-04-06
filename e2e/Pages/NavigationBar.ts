import { expect, Page, Locator } from '@playwright/test';

import BasePage from '#e2e/Pages/BasePage';

class NavigationBar {
  page: Page;
  // External page objects properties declarations
  basePage: BasePage;
  // Locator properties declarations
  readonly header: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signUpLoginLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // External page objects initializations
    this.basePage = new BasePage(page);

    // Locator properties initializations & assignments
    this.header = page.locator('header');
    this.logo = page.getByRole('img', { name: 'Website for automation practice' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.signUpLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.testCasesLink = page.getByRole('link', { name: 'Test Cases' });
    this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  }

  // METHODS

  async clickNavBarItemByName(name: string) {
    const navBarItem = this.page.getByRole('link', { name });
    await navBarItem.click();
  }

  async validateLoggedInAsText(username: string, state: string) {
    const loggedInAsText = this.page.getByText(`Logged in as ${username}`);
    if (state === 'visible') {
      await expect(loggedInAsText).toBeVisible();
    } else if (state === 'not visible') {
      await expect(loggedInAsText).not.toBeVisible();
    } else {
      throw new Error(`Invalid state: ${state}. Expected "visible" or "not visible".`);
    }
  }
}

export default NavigationBar;
