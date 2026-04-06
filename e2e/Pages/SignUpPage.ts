import { Page, Locator } from '@playwright/test';

import BasePage from '#e2e/Pages/BasePage';

class SignUpPage {
  page: Page;
  // External page objects properties declarations
  basePage: BasePage;
  // Locator properties declarations
  readonly titleRadioButtons: (title: string) => Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly dayOfBirthSelect: Locator;
  readonly monthOfBirthSelect: Locator;
  readonly yearOfBirthSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // External page objects initializations
    this.basePage = new BasePage(page);

    // Locator properties initializations & assignments
    this.titleRadioButtons = (title: string) => page.getByRole('radio', { name: title });
    this.nameInput = page.getByTestId('name');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.dayOfBirthSelect = page.getByTestId('days');
    this.monthOfBirthSelect = page.getByTestId('months');
    this.yearOfBirthSelect = page.getByTestId('years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    this.firstNameInput = page.getByTestId('first_name');
    this.lastNameInput = page.getByTestId('last_name');
    this.companyInput = page.getByTestId('company');
    this.addressInput = page.getByTestId('address');
    this.address2Input = page.getByTestId('address2');
    this.countrySelect = page.getByTestId('country');
    this.stateInput = page.getByTestId('state');
    this.cityInput = page.getByTestId('city');
    this.zipcodeInput = page.getByTestId('zipcode');
    this.mobileNumberInput = page.getByTestId('mobile_number');
  }

  // METHODS
  async selectTitleAs(title: string): Promise<void> {
    const titleOption = this.titleRadioButtons(title);
    await titleOption.click();
  }

  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.dayOfBirthSelect.selectOption(day);
    await this.monthOfBirthSelect.selectOption(month);
    await this.yearOfBirthSelect.selectOption(year);
  }

  async toggleNewsletterCheckbox(): Promise<void> {
    await this.newsletterCheckbox.click();
  }

  async toggleSpecialOffersCheckbox(): Promise<void> {
    await this.specialOffersCheckbox.click();
  }
}

export default SignUpPage;
