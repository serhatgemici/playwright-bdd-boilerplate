import { When } from '#e2e/Fixtures/FixturesBDD.ts';

When('user enters signup name as {string}', async ({ loginPage }, name: string) => {
  await loginPage.signupNameInput.fill(name);
});

When('user enters signup email address as {string}', async ({ loginPage }, email: string) => {
  await loginPage.signupEmailInput.fill(email);
});

When('user selects title as {string}', async ({ signUpPage }, title: string) => {
  await signUpPage.selectTitleAs(title);
});

When('user enters name as {string}', async ({ signUpPage }, name: string) => {
  await signUpPage.enterName(name);
});

When('user enters password as {string}', async ({ signUpPage }, password: string) => {
  await signUpPage.enterPassword(password);
});

When(
  'user selects date of birth as {string}, {string}, {string}',
  async ({ signUpPage }, day: string, month: string, year: string) => {
    await signUpPage.selectDateOfBirth(day, month, year);
  }
);

When('user selects the {string} checkbox', async ({ signUpPage }, checkboxName: string) => {
  if (checkboxName === 'newsletter') {
    await signUpPage.toggleNewsletterCheckbox();
  } else if (checkboxName === 'special offers') {
    await signUpPage.toggleSpecialOffersCheckbox();
  }
});

When('user enters first name as {string}', async ({ signUpPage }, firstName: string) => {
  await signUpPage.firstNameInput.fill(firstName);
});

When('user enters last name as {string}', async ({ signUpPage }, lastName: string) => {
  await signUpPage.lastNameInput.fill(lastName);
});

When('user enters company as {string}', async ({ signUpPage }, company: string) => {
  await signUpPage.companyInput.fill(company);
});

When('user enters address as {string}', async ({ signUpPage }, address: string) => {
  await signUpPage.addressInput.fill(address);
});

When('user enters address2 as {string}', async ({ signUpPage }, address2: string) => {
  await signUpPage.address2Input.fill(address2);
});

When('user selects country as {string}', async ({ signUpPage }, country: string) => {
  await signUpPage.countrySelect.selectOption(country);
});

When('user enters state as {string}', async ({ signUpPage }, state: string) => {
  await signUpPage.stateInput.fill(state);
});

When('user enters city as {string}', async ({ signUpPage }, city: string) => {
  await signUpPage.cityInput.fill(city);
});

When('user enters zipcode as {string}', async ({ signUpPage }, zipcode: string) => {
  await signUpPage.zipcodeInput.fill(zipcode);
});

When('user enters mobile number as {string}', async ({ signUpPage }, mobileNumber: string) => {
  await signUpPage.mobileNumberInput.fill(mobileNumber);
});
