import { When, Before } from '#e2e/Fixtures/FixturesBDD.ts';
import { clearCurrentUserData } from '#utils/dataGenerator';

Before(async () => {
  clearCurrentUserData();
});

When('user enters signup name as {string}', async ({ loginPage }, name: string) => {
  await loginPage.fillSignupName(name);
});

When('user enters signup email address as {string}', async ({ loginPage }, email: string) => {
  await loginPage.fillSignupEmail(email);
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

When('user selects date of birth as {string}', async ({ signUpPage }, dob: string) => {
  await signUpPage.selectDateOfBirthAs(dob);
});

When(
  'user selects date of birth as {string}, {string}, {string}',
  async ({ signUpPage }, day: string, month: string, year: string) => {
    await signUpPage.selectDateOfBirth(day, month, year);
  }
);

When('user selects the {string} checkbox', async ({ signUpPage }, checkboxName: string) => {
  await signUpPage.toggleCheckbox(checkboxName);
});

When('user enters first name as {string}', async ({ signUpPage }, firstName: string) => {
  await signUpPage.fillFirstName(firstName);
});

When('user enters last name as {string}', async ({ signUpPage }, lastName: string) => {
  await signUpPage.fillLastName(lastName);
});

When('user enters company as {string}', async ({ signUpPage }, company: string) => {
  await signUpPage.fillCompany(company);
});

When('user enters address as {string}', async ({ signUpPage }, address: string) => {
  await signUpPage.fillAddress(address);
});

When('user enters address2 as {string}', async ({ signUpPage }, address2: string) => {
  await signUpPage.fillAddress2(address2);
});

When('user selects country as {string}', async ({ signUpPage }, country: string) => {
  await signUpPage.selectCountry(country);
});

When('user enters state as {string}', async ({ signUpPage }, state: string) => {
  await signUpPage.fillState(state);
});

When('user enters city as {string}', async ({ signUpPage }, city: string) => {
  await signUpPage.fillCity(city);
});

When('user enters zipcode as {string}', async ({ signUpPage }, zipcode: string) => {
  await signUpPage.fillZipcode(zipcode);
});

When('user enters mobile number as {string}', async ({ signUpPage }, mobileNumber: string) => {
  await signUpPage.fillMobileNumber(mobileNumber);
});
