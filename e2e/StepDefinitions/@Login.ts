import { When } from '#e2e/Fixtures/FixturesBDD.ts';

When('user enters login email as {string}', async ({ loginPage }, email: string) => {
  await loginPage.emailInput.fill(email);
});

When('user enters login password as {string}', async ({ loginPage }, password: string) => {
  await loginPage.passwordInput.fill(password);
});
