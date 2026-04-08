import { Page, Locator } from '@playwright/test';

import BasePage from '#e2e/Pages/BasePage';

class LoginPage {
  page: Page;
  // External page objects properties declarations
  basePage: BasePage;
  // Locator properties declarations
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // External page objects initializations
    this.basePage = new BasePage(page);

    // Locator properties initializations & assignments
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.signupNameInput = page.getByTestId('signup-name');
    this.signupEmailInput = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
  }

  // METHODS
  async fillSignupName(name: string): Promise<void> {
    await this.signupNameInput.fill(name);
  }

  async fillSignupEmail(email: string): Promise<void> {
    await this.signupEmailInput.fill(email);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
