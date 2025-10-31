import { Page, Locator } from '@playwright/test';
import { PRODUCT_CARD_TITLES } from './BuyPageConstants';

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
} as const;

export class Locators {
  constructor(private page: Page) {}

  // Create all locators at once
  createAllLocators() {
    const cLionNonCommercialProductCard = this.createCLionNonCommercialProductCard();
    const rustRoverProductCards = this.createRustRoverProductCards();
    const cLionCommercialProductCard = this.createCLionCommercialProductCard();
    const cLionAllProductsPackProductCard = this.createCLionAllProductsPackProductCard();

    return {
      commonAdaptiveSwitcherLocator: this.createCommonAdaptiveSwitcherLocator.bind(this),
      billingTypeRadioGroupLocator: this.createBillingTypeRadioGroup(),
      ideaProductCardLocator: this.createIdeaProductCard.bind(this),
      rustRoverProductCardLocators: rustRoverProductCards,
      cLionNonCommercialProductCardLocator: cLionNonCommercialProductCard,
      cLionCommercialProductCardLocator: cLionCommercialProductCard,
      cLionAllProductsPackProductCardLocator: cLionAllProductsPackProductCard,
      cLionNonCommercialProductCardDownloadButtonLocator:
        this.createCLionNonCommercialProductCardDownloadButton(cLionNonCommercialProductCard),
      rustRoverProductCardLocatorMapper: (cardTitle: string) =>
        this.rustRoverProductCardLocatorMapper(cardTitle, rustRoverProductCards),
      cLionProductCardLocatorMapper: (cardTitle: string) =>
        this.cLionProductCardLocatorMapper(
          cardTitle,
          cLionNonCommercialProductCard,
          cLionCommercialProductCard,
          cLionAllProductsPackProductCard
        ),
    };
  }

  createCommonAdaptiveSwitcherLocator(labels: string[]): Locator {
    return this.page
      .locator(SELECTORS.ADAPTIVE_SWITCHER)
      .filter({ has: this.page.getByRole('button', { name: labels[0] }) })
      .filter({ has: this.page.getByRole('button', { name: labels[1] }) })
      .first();
  }

  createBillingTypeRadioGroup(): Locator {
    return this.page.locator(SELECTORS.BILLING_RADIO_GROUP);
  }

  createIdeaProductCard(productCardTitle: string): Locator {
    return this.page
      .locator(SELECTORS.PRODUCT_CARD)
      .filter({
        has: this.page.locator(SELECTORS.PRODUCT_NAME).filter({ hasText: productCardTitle }),
      })
      .first();
  }

  createRustRoverProductCards(): Locator {
    return this.page.locator(SELECTORS.RUST_ROVER_CARDS);
  }

  createCLionNonCommercialProductCard(): Locator {
    return this.page.locator(SELECTORS.CLION_NON_COMMERCIAL_CARD);
  }

  createCLionCommercialProductCard(): Locator {
    return this.page.locator(SELECTORS.CLION_COMMERCIAL_CARD);
  }

  createCLionAllProductsPackProductCard(): Locator {
    return this.page
      .locator(SELECTORS.STICKY_TAG_WRAPPER)
      .filter({
        has: this.page.locator(SELECTORS.PRODUCT_NAME).filter({ hasText: 'All Products Pack' }),
      })
      .first();
  }

  createCLionNonCommercialProductCardDownloadButton(
    cLionNonCommercialProductCard: Locator
  ): Locator {
    return cLionNonCommercialProductCard.locator(SELECTORS.BUTTON);
  }

  rustRoverProductCardLocatorMapper(cardTitle: string, rustRoverProductCards: Locator): Locator {
    switch (cardTitle) {
      case PRODUCT_CARD_TITLES.RUSTROVER_NON_COMMERCIAL:
        return rustRoverProductCards.nth(0);
      case PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL:
        return rustRoverProductCards.nth(1);
      case PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK:
        return rustRoverProductCards.nth(2);
      case PRODUCT_CARD_TITLES.RUST_PLUGIN:
        return rustRoverProductCards.nth(3);
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are ${PRODUCT_CARD_TITLES.RUSTROVER_NON_COMMERCIAL}, ${PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL}, ${PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK}, or ${PRODUCT_CARD_TITLES.RUST_PLUGIN}.`
        );
    }
  }

  cLionProductCardLocatorMapper(
    cardTitle: string,
    cLionNonCommercialProductCard: Locator,
    cLionCommercialProductCard: Locator,
    cLionAllProductsPackProductCard: Locator
  ): Locator {
    switch (cardTitle) {
      case PRODUCT_CARD_TITLES.CLION_NON_COMMERCIAL:
        return cLionNonCommercialProductCard;
      case PRODUCT_CARD_TITLES.CLION_COMMERCIAL:
        return cLionCommercialProductCard;
      case PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK:
        return cLionAllProductsPackProductCard;
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are ${PRODUCT_CARD_TITLES.CLION_NON_COMMERCIAL}, ${PRODUCT_CARD_TITLES.CLION_COMMERCIAL}, or ${PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK}.`
        );
    }
  }
}
