import { test as baseTest, type CommonFixtures } from './CommonFixtures';

import { BuyPageFactory } from '#e2e/PagesAndComponents/BuyPage/BuyPageFactory';
import { IdeaBuyPage } from '#e2e/PagesAndComponents/BuyPage/IdeaBuyPage';
import { RustRoverBuyPage } from '#e2e/PagesAndComponents/BuyPage/RustRoverBuyPage';
import { CLionBuyPage } from '#e2e/PagesAndComponents/BuyPage/CLionBuyPage';
import {
  thenTierSwitcherIsValidated,
  thenBillingTermSwitcherIsValidated,
  thenProductCardsAreValidated,
} from '../StepDefinitions/ProductPurchaseJourneyStepDefinitions';

/**
 * Product Purchase Journey Fixtures - Extension Layer
 *
 * This fixture provides:
 * - Product-specific page objects (BuyPageFactory, product buy pages)
 * - Domain-specific BDD-style step definition fixtures
 * - Automatic inheritance of ALL CommonFixtures step definitions
 *
 * Step definitions are imported from ProductPurchaseJourneyStepDefinitions.ts to keep
 * this file focused on fixture configuration and dependency injection.
 */

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
