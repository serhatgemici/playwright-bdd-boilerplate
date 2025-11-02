import { Page, Locator } from '@playwright/test';
import * as buyPageConstants from './BuyPageConstants';

// Selector Constants
export const SELECTORS = {
  ADAPTIVE_SWITCHER: '[data-test="adaptive-switcher__switcher"]',
  BILLING_RADIO_GROUP: '[data-rs-internal="radio-button-list__menu"]',
  PRODUCT_CARD: '[data-test^="product-card-"]',
  PRODUCT_NAME: '[data-test^="product-name"]',
  RUST_ROVER_CARDS: 'div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div',
  CLION_NON_COMMERCIAL_CARD: '[data-test="non-commercial-product-buy-card-CLion-Non-Commercial"]',
  CLION_COMMERCIAL_CARD: '[data-test="non-commercial-product-buy-card-CLion-Commercial"]',
  STICKY_TAG_WRAPPER: '[data-test="sticky-tag-wrapper"]',
  BUTTON: '[data-test="button"]',
  RUSTROVER_DOWNLOAD_LINK: 'div:nth-child(4) > a',
} as const;

export class Locators {
  constructor(private page: Page) {}

  // Create common locators used across multiple buy pages
  createCommonLocators() {
    return {
      tierSwitcher: this.createTierSwitcher(),
      billingSwitcher: this.createBillingSwitcher(),
      billingRadioGroup: this.createBillingRadioGroup(),
    };
  }

  // Create IDEA-specific locators
  createIdeaLocators() {
    return {
      ...this.createCommonLocators(),
      ideaUltimateCard: this.createIdeaProductCard(
        buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE
      ),
      allProductsPackCard: this.createIdeaProductCard(
        buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK
      ),
    };
  }

  // Create RustRover-specific locators
  createRustRoverLocators() {
    const rustRoverProductCards = this.createRustRoverProductCards();
    return {
      tierSwitcher: this.createTierSwitcher(),
      billingRadioGroup: this.createBillingRadioGroup(),
      rustRoverProductCards,
      nonCommercialCard: rustRoverProductCards.nth(0),
      commercialCard: rustRoverProductCards.nth(1),
      allProductsPackCard: rustRoverProductCards.nth(2),
      rustPluginCard: rustRoverProductCards.nth(3),
    };
  }

  // Create CLion-specific locators
  createCLionLocators() {
    const nonCommercialCard = this.createCLionNonCommercialCard();
    const allProductsPackCard = this.createCLionAllProductsPackCard();

    return {
      billingSwitcher: this.createBillingSwitcher(),
      nonCommercialCard,
      commercialCard: this.createCLionCommercialCard(),
      allProductsPackCard,
      downloadButton: this.createCLionDownloadButton(nonCommercialCard),
    };
  }

  // Common locator creation methods
  createTierSwitcher(): Locator {
    return this.page
      .locator(SELECTORS.ADAPTIVE_SWITCHER)
      .filter({ has: this.page.getByRole('button', { name: buyPageConstants.TIER_LABELS[0] }) })
      .filter({ has: this.page.getByRole('button', { name: buyPageConstants.TIER_LABELS[1] }) })
      .first();
  }

  createBillingSwitcher(): Locator {
    return this.page
      .locator(SELECTORS.ADAPTIVE_SWITCHER)
      .filter({ has: this.page.getByRole('button', { name: buyPageConstants.BILLING_LABELS[0] }) })
      .filter({ has: this.page.getByRole('button', { name: buyPageConstants.BILLING_LABELS[1] }) })
      .first();
  }

  createBillingRadioGroup(): Locator {
    return this.page.locator(SELECTORS.BILLING_RADIO_GROUP);
  }

  // IDEA-specific locator creation methods
  createIdeaProductCard(productCardTitle: string): Locator {
    return this.page
      .locator(SELECTORS.PRODUCT_CARD)
      .filter({
        has: this.page.locator(SELECTORS.PRODUCT_NAME).filter({ hasText: productCardTitle }),
      })
      .first();
  }

  // RustRover-specific locator creation methods
  createRustRoverProductCards(): Locator {
    return this.page.locator(SELECTORS.RUST_ROVER_CARDS);
  }

  // CLion-specific locator creation methods
  createCLionNonCommercialCard(): Locator {
    return this.page.locator(SELECTORS.CLION_NON_COMMERCIAL_CARD);
  }

  createCLionCommercialCard(): Locator {
    return this.page.locator(SELECTORS.CLION_COMMERCIAL_CARD);
  }

  createCLionAllProductsPackCard(): Locator {
    return this.page
      .locator(SELECTORS.STICKY_TAG_WRAPPER)
      .filter({
        has: this.page
          .locator(SELECTORS.PRODUCT_NAME)
          .filter({ hasText: buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK }),
      })
      .first();
  }

  createCLionDownloadButton(nonCommercialCard: Locator): Locator {
    return nonCommercialCard.locator(SELECTORS.BUTTON);
  }

  // Utility method for getting tier switcher selector (used for validation)
  getAdaptiveSwitcherSelector(): string {
    return SELECTORS.ADAPTIVE_SWITCHER;
  }

  // Utility method for creating AI Pro checkbox locator within any card
  createAiProCheckbox(cardLocator: Locator): Locator {
    return cardLocator.getByRole('checkbox', {
      name: buyPageConstants.UI_TEXT.AI_PRO_CHECKBOX,
    });
  }

  // Utility method for creating full suite link locator within any card
  createFullSuiteLink(cardLocator: Locator): Locator {
    return cardLocator.getByRole('link', {
      name: buyPageConstants.UI_TEXT.FULL_SUITE_LINK,
    });
  }

  // Utility method for creating RustRover download link within any card
  createRustRoverDownloadLink(cardLocator: Locator): Locator {
    return cardLocator.locator(SELECTORS.RUSTROVER_DOWNLOAD_LINK);
  }
}
