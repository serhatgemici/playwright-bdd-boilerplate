import { createBdd } from 'playwright-bdd';
import { test } from '#e2e/Fixtures/FixturesBDD.js';

const { Then } = createBdd(test);

Then('heading displays {string}', async ({ buyPage }, headingText: string) => {
  await buyPage.validateHeading(headingText);
});

Then(
  'common tier switcher is validated on {string} buy page',
  async ({ buyPage }, productName: string) => {
    await buyPage.validateCommonTierSwitcher(productName);
  }
);

Then(
  'billing term switcher is validated on {string} buy page',
  async ({ buyPage }, productName: string) => {
    await buyPage.validateBillingTermSwitcher(productName);
  }
);

Then(
  'product cards are validated on {string} buy page in default state',
  async ({ buyPage }, productName: string) => {
    await buyPage.validateDefaultStateOfProductCards(productName);
  }
);
