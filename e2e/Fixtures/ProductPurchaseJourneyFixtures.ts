import { test as baseTest, type CommonFixtures } from './CommonFixtures';

import { BuyPageFactory } from '#e2e/PagesAndComponents/BuyPage/BuyPageFactory';
import { IdeaBuyPage } from '#e2e/PagesAndComponents/BuyPage/IdeaBuyPage';
import { RustRoverBuyPage } from '#e2e/PagesAndComponents/BuyPage/RustRoverBuyPage';
import { CLionBuyPage } from '#e2e/PagesAndComponents/BuyPage/CLionBuyPage';

/**
 * Product Purchase Journey specific BDD-style step definitions
 * These extend the common fixtures and add buy page specific validations
 */

// Buy Page Specific Step Definition: Then tier switcher is validated
async function thenTierSwitcherIsValidated(buyPageFactory: BuyPageFactory, productName: string) {
  await baseTest.step(
    `**THEN** common tier switcher is validated on "${productName}" buy page`,
    async () => {
      const productPage = buyPageFactory.createBuyPage(productName);
      await productPage.validateCommonTierSwitcher(productName);
    }
  );
}

// Buy Page Specific Step Definition: Then billing term switcher is validated
async function thenBillingTermSwitcherIsValidated(
  buyPageFactory: BuyPageFactory,
  productName: string
) {
  await baseTest.step(
    `**THEN** billing term switcher is validated on "${productName}" buy page`,
    async () => {
      const productPage = buyPageFactory.createBuyPage(productName);
      await productPage.validateBillingTermSwitcher(productName);
    }
  );
}

// Buy Page Specific Step Definition: Then product cards are validated
async function thenProductCardsAreValidated(buyPageFactory: BuyPageFactory, productName: string) {
  await baseTest.step(
    `**THEN** product cards are validated on "${productName}" buy page in default state`,
    async () => {
      const productPage = buyPageFactory.createBuyPage(productName);
      await productPage.validateDefaultStateOfProductCards(productName);
    }
  );
}

// Extend CommonFixtures with Product Purchase Journey specific fixtures
export type ProductPurchaseJourneyFixtures = CommonFixtures & {
  // Product-specific page objects
  buyPageFactory: BuyPageFactory;
  ideaBuyPage: IdeaBuyPage;
  rustRoverBuyPage: RustRoverBuyPage;
  clionBuyPage: CLionBuyPage;

  // Buy Page specific step definition fixtures
  thenTierSwitcherIsValidated: (productName: string) => Promise<void>;
  thenBillingTermSwitcherIsValidated: (productName: string) => Promise<void>;
  thenProductCardsAreValidated: (productName: string) => Promise<void>;
};

export const test = baseTest.extend<ProductPurchaseJourneyFixtures>({
  // PRODUCT-SPECIFIC PAGE FIXTURES
  buyPageFactory: async ({ page }, use) => {
    const buyPageFactory = new BuyPageFactory(page);
    await use(buyPageFactory);
  },

  ideaBuyPage: async ({ page }, use) => {
    const ideaBuyPage = new IdeaBuyPage(page);
    await use(ideaBuyPage);
  },

  rustRoverBuyPage: async ({ page }, use) => {
    const rustRoverBuyPage = new RustRoverBuyPage(page);
    await use(rustRoverBuyPage);
  },

  clionBuyPage: async ({ page }, use) => {
    const clionBuyPage = new CLionBuyPage(page);
    await use(clionBuyPage);
  },

  // BUY PAGE SPECIFIC STEP DEFINITION FIXTURES
  thenTierSwitcherIsValidated: async ({ buyPageFactory }, use) => {
    await use(async (productName: string) => {
      await thenTierSwitcherIsValidated(buyPageFactory, productName);
    });
  },

  thenBillingTermSwitcherIsValidated: async ({ buyPageFactory }, use) => {
    await use(async (productName: string) => {
      await thenBillingTermSwitcherIsValidated(buyPageFactory, productName);
    });
  },

  thenProductCardsAreValidated: async ({ buyPageFactory }, use) => {
    await use(async (productName: string) => {
      await thenProductCardsAreValidated(buyPageFactory, productName);
    });
  },
});

export const expect = baseTest.expect;
