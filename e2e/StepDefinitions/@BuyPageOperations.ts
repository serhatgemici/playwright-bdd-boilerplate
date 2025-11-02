import { Then } from '#e2e/Fixtures/FixturesBDD.ts';

Then('heading displays {string}', async ({ basePage }, headingText: string) => {
  await basePage.validateHeading(headingText);
});

Then(
  'common tier switcher is validated on {string} buy page',
  async ({ buyPageFactory }, productName: string) => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateCommonTierSwitcher(productName);
  }
);

Then(
  'billing term switcher is validated on {string} buy page',
  async ({ buyPageFactory }, productName: string) => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateBillingTermSwitcher(productName);
  }
);

Then(
  'product cards are validated on {string} buy page in default state',
  async ({ buyPageFactory }, productName: string) => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateDefaultStateOfProductCards(productName);
  }
);
