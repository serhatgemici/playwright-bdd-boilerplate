import { Before, Given, When } from '#e2e/Fixtures/FixturesBDD.ts';
import { generateRandomUserData } from '#utils/dataGenerator';
import type { AccountData } from '#utils/types';

const getRandomAccountData = (ctx: { randomAccountData?: AccountData }): AccountData => {
  if (!ctx.randomAccountData) {
    throw new Error(
      'No random account data available. Run "random user created by api call" first.'
    );
  }

  return ctx.randomAccountData;
};

Before(({ ctx }) => {
  ctx.randomAccountData = generateRandomUserData();
});

Given('random user created by api call', async ({ signUpPage, ctx }) => {
  await signUpPage.createRandomUserViaApi(ctx.randomAccountData);
});

Given('user is logged in as {string}', async ({ loginPage, ctx }, userAlias: string) => {
  if (userAlias !== 'api_created_user') {
    throw new Error(`Unsupported login alias: ${userAlias}`);
  }

  const randomAccountData = getRandomAccountData(ctx);
  await loginPage.login(randomAccountData.email, randomAccountData.password);
});

When('user enters signup name as {string}', async ({ loginPage, ctx }, name: string) => {
  if (name === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await loginPage.fillSignupName(randomAccountData.firstname);
  } else {
    await loginPage.fillSignupName(name);
  }
});

When('user enters signup email address as {string}', async ({ loginPage, ctx }, email: string) => {
  if (email === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await loginPage.fillSignupEmail(randomAccountData.email);
  } else {
    await loginPage.fillSignupEmail(email);
  }
});

When('user selects title as {string}', async ({ signUpPage, ctx }, title: string) => {
  if (title === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.selectTitleAs(randomAccountData.title);
  } else {
    await signUpPage.selectTitleAs(title);
  }
});

When('user enters name as {string}', async ({ signUpPage, ctx }, name: string) => {
  if (name === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.enterName(randomAccountData.name);
  } else {
    await signUpPage.enterName(name);
  }
});

When('user enters password as {string}', async ({ signUpPage, ctx }, password: string) => {
  if (password === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.enterPassword(randomAccountData.password);
  } else {
    await signUpPage.enterPassword(password);
  }
});

When('user selects date of birth as {string}', async ({ signUpPage, ctx }, dob: string) => {
  if (dob === 'random') {
    const { birth_date, birth_month, birth_year } = getRandomAccountData(ctx);
    await signUpPage.selectDateOfBirth(birth_date, birth_month, birth_year);
    return;
  }
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

When('user enters first name as {string}', async ({ signUpPage, ctx }, firstName: string) => {
  if (firstName === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillFirstName(randomAccountData.firstname);
  } else {
    await signUpPage.fillFirstName(firstName);
  }
});

When('user enters last name as {string}', async ({ signUpPage, ctx }, lastName: string) => {
  if (lastName === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillLastName(randomAccountData.lastname);
  } else {
    await signUpPage.fillLastName(lastName);
  }
});

When('user enters company as {string}', async ({ signUpPage, ctx }, company: string) => {
  if (company === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillCompany(randomAccountData.company);
  } else {
    await signUpPage.fillCompany(company);
  }
});

When('user enters address as {string}', async ({ signUpPage, ctx }, address: string) => {
  if (address === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillAddress(randomAccountData.address1);
  } else {
    await signUpPage.fillAddress(address);
  }
});

When('user enters address2 as {string}', async ({ signUpPage, ctx }, address2: string) => {
  if (address2 === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillAddress2(randomAccountData.address2);
  } else {
    await signUpPage.fillAddress2(address2);
  }
});

When('user selects country as {string}', async ({ signUpPage, ctx }, country: string) => {
  if (country === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.selectCountry(randomAccountData.country);
  } else {
    await signUpPage.selectCountry(country);
  }
});

When('user enters state as {string}', async ({ signUpPage, ctx }, state: string) => {
  if (state === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillState(randomAccountData.state);
  } else {
    await signUpPage.fillState(state);
  }
});

When('user enters city as {string}', async ({ signUpPage, ctx }, city: string) => {
  if (city === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillCity(randomAccountData.city);
  } else {
    await signUpPage.fillCity(city);
  }
});

When('user enters zipcode as {string}', async ({ signUpPage, ctx }, zipcode: string) => {
  if (zipcode === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillZipcode(randomAccountData.zipcode);
  } else {
    await signUpPage.fillZipcode(zipcode);
  }
});

When('user enters mobile number as {string}', async ({ signUpPage, ctx }, mobileNumber: string) => {
  if (mobileNumber === 'random') {
    const randomAccountData = getRandomAccountData(ctx);
    await signUpPage.fillMobileNumber(randomAccountData.mobile_number);
  } else {
    await signUpPage.fillMobileNumber(mobileNumber);
  }
});
