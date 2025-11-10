import { test } from '@playwright/test';

import { BuyPageFactory } from '#e2e/PagesAndComponents/BuyPage/BuyPageFactory';

/**
 * Product Purchase Journey specific BDD-style step definition functions
 * These are domain-specific step definitions that work with buy page functionality
 *
 * Benefits of separating step definitions:
 * - Keeps fixture files clean and focused on configuration
 * - Makes step definitions reusable and testable
 * - Easier to maintain and extend domain-specific logic
 * - Clear separation between fixture setup and business logic
 */

// Buy Page Specific Step Definition: Then tier switcher is validated
export async function thenTierSwitcherIsValidated(
  buyPageFactory: BuyPageFactory,
  productName: string
): Promise<void> {
  await test.step(`**THEN** common tier switcher is validated on "${productName}" buy page`, async () => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateCommonTierSwitcher(productName);
  });
}

// Buy Page Specific Step Definition: Then billing term switcher is validated
export async function thenBillingTermSwitcherIsValidated(
  buyPageFactory: BuyPageFactory,
  productName: string
): Promise<void> {
  await test.step(`**THEN** billing term switcher is validated on "${productName}" buy page`, async () => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateBillingTermSwitcher(productName);
  });
}

// Buy Page Specific Step Definition: Then product cards are validated
export async function thenProductCardsAreValidated(
  buyPageFactory: BuyPageFactory,
  productName: string
): Promise<void> {
  await test.step(`**THEN** product cards are validated on "${productName}" buy page in default state`, async () => {
    const productPage = buyPageFactory.createBuyPage(productName);
    await productPage.validateDefaultStateOfProductCards(productName);
  });
}
