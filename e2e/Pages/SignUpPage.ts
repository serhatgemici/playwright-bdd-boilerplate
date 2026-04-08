import { Page, Locator } from '@playwright/test';

import BasePage from '#e2e/Pages/BasePage';
import { generateRandomUserData } from '#utils/dataGenerator';
import { type AccountData } from '#utils/types';

const CREATE_ACCOUNT_SUCCESS_CODE = 201;
const CREATE_ACCOUNT_SUCCESS_MESSAGE = 'User created!';

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

  async selectDateOfBirthAs(value: string): Promise<void> {
    await this.selectDateOfBirth(value, value, value);
  }

  async toggleNewsletterCheckbox(): Promise<void> {
    await this.newsletterCheckbox.click();
  }

  async toggleSpecialOffersCheckbox(): Promise<void> {
    await this.specialOffersCheckbox.click();
  }

  async toggleCheckbox(name: string): Promise<void> {
    const checkboxMap: Record<string, () => Promise<void>> = {
      newsletter: () => this.toggleNewsletterCheckbox(),
      'special offers': () => this.toggleSpecialOffersCheckbox(),
    };
    await checkboxMap[name]();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillZipcode(zipcode: string): Promise<void> {
    await this.zipcodeInput.fill(zipcode);
  }

  async fillMobileNumber(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  async fillAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
  }

  async fillAddress2(address2: string): Promise<void> {
    await this.address2Input.fill(address2);
  }

  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption(country);
  }

  async fillState(state: string): Promise<void> {
    await this.stateInput.fill(state);
  }

  async fillCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  async createAccountViaApi(payload: AccountData): Promise<void> {
    const response = await this.page.request.post(
      'https://automationexercise.com/api/createAccount',
      {
        form: payload,
      }
    );

    const responseBody = (await response.json()) as {
      responseCode?: number;
      message?: string;
    };

    if (!response.ok()) {
      throw new Error(
        `createAccount API call failed with HTTP ${response.status()}: ${JSON.stringify(responseBody)}`
      );
    }

    // Endpoint may return HTTP 200 while exposing API-level code in response body.
    const apiResponseCode = responseBody.responseCode ?? response.status();
    if (
      apiResponseCode !== CREATE_ACCOUNT_SUCCESS_CODE ||
      responseBody.message !== CREATE_ACCOUNT_SUCCESS_MESSAGE
    ) {
      throw new Error(`Unexpected createAccount response: ${JSON.stringify(responseBody)}`);
    }
  }

  async createRandomUserViaApi(userData?: AccountData): Promise<void> {
    const payload = userData ?? generateRandomUserData();
    await this.createAccountViaApi(payload);
  }
}

export default SignUpPage;
