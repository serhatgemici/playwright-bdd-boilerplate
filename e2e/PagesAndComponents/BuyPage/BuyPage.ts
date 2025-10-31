import { expect, Page, Locator } from '@playwright/test';
import { readAriaSnapshot } from 'utils/readAriaSnapshot';
import * as buyPageLocatorFactory from './BuyPageLocatorFactory';
import * as buyPageConstants from './BuyPageConstants';
import * as commonConstants from '../Common/CommonConstants';

type TierType = (typeof buyPageConstants.TIER_TYPES)[keyof typeof buyPageConstants.TIER_TYPES];
type BillingTerm =
  (typeof buyPageConstants.BILLING_TERMS)[keyof typeof buyPageConstants.BILLING_TERMS];

class BuyPage {
  page: Page;
  private buyPageLocators: buyPageLocatorFactory.Locators;
  commonAdaptiveSwitcherLocator!: (labels: string[]) => Locator;
  billingTypeRadioGroupLocator!: Locator;
  ideaProductCardLocator!: (productCardTitle: string) => Locator;
  rustRoverProductCardLocators!: Locator;
  cLionNonCommercialProductCardLocator!: Locator;
  cLionCommercialProductCardLocator!: Locator;
  cLionAllProductsPackProductCardLocator!: Locator;
  cLionNonCommercialProductCardDownloadButtonLocator!: Locator;
  rustRoverProductCardLocatorMapper!: (cardTitle: string) => Locator;
  cLionProductCardLocatorMapper!: (cardTitle: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyPageLocators = new buyPageLocatorFactory.Locators(page);

    // Initialize all locators from factory
    const buyPageLocators = this.buyPageLocators.createAllLocators();
    Object.assign(this, buyPageLocators);
  }

  // METHODS
  async validateHeading(headingText: string) {
    await expect(this.page.locator('h1')).toHaveText(headingText);
  }

  async validateCommonTierSwitcher(productName: string) {
    switch (productName) {
      case commonConstants.PRODUCT_NAMES.IDEA: {
        await this.validateCommonAdaptiveSwitcher(
          [...buyPageConstants.TIER_LABELS],
          'idea-common-tier-switcher.aria.yml'
        );
        break;
      }
      case commonConstants.PRODUCT_NAMES.RUSTROVER: {
        await this.validateCommonAdaptiveSwitcher(
          [...buyPageConstants.TIER_LABELS],
          'rustrover-common-tier-switcher.aria.yml'
        );
        break;
      }
      case commonConstants.PRODUCT_NAMES.CLION: {
        await expect(
          this.commonAdaptiveSwitcherLocator([...buyPageConstants.TIER_LABELS])
        ).not.toBeVisible();
        break;
      }
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "${commonConstants.PRODUCT_NAMES.IDEA}", "${commonConstants.PRODUCT_NAMES.RUSTROVER}", or "${commonConstants.PRODUCT_NAMES.CLION}".`
        );
    }
  }

  async validateBillingTermSwitcher(productName: string) {
    switch (productName) {
      case commonConstants.PRODUCT_NAMES.IDEA:
        await this.validateCommonAdaptiveSwitcher(
          [...buyPageConstants.BILLING_LABELS],
          'idea-billing-term-switcher.aria.yml'
        );
        break;
      case commonConstants.PRODUCT_NAMES.RUSTROVER:
        await this.validateBillingTypeRadioGroup('rustrover-billing-type-radio-group.aria.yml');
        break;
      case commonConstants.PRODUCT_NAMES.CLION:
        await this.validateCommonAdaptiveSwitcher(
          [...buyPageConstants.BILLING_LABELS],
          'clion-billing-term-switcher.aria.yml'
        );
        break;
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "${commonConstants.PRODUCT_NAMES.IDEA}", "${commonConstants.PRODUCT_NAMES.RUSTROVER}", or "${commonConstants.PRODUCT_NAMES.CLION}".`
        );
    }
  }

  async validateCommonAdaptiveSwitcher(labels: string[], ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(this.commonAdaptiveSwitcherLocator(labels)).toMatchAriaSnapshot(snapshot);
  }

  async validateBillingTypeRadioGroup(ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(this.billingTypeRadioGroupLocator).toBeVisible();
    await expect(this.billingTypeRadioGroupLocator).toMatchAriaSnapshot(snapshot);
  }

  async validateElementDisplayed(locator: Locator, state: string) {
    if (state === commonConstants.DISPLAYED) {
      await expect(locator).toBeVisible();
    } else if (state === commonConstants.NOT_DISPLAYED) {
      await expect(locator).toBeHidden();
    } else {
      throw new Error(
        `Invalid state: ${state}. Valid states are "${commonConstants.DISPLAYED}" or "${commonConstants.NOT_DISPLAYED}".`
      );
    }
  }

  async validateDefaultStateOfProductCards(productName: string) {
    switch (productName) {
      case commonConstants.PRODUCT_NAMES.IDEA:
        await this.validateIdeaProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE,
          buyPageConstants.TIER_TYPES.COMMERCIAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        await this.validateIdeaProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK,
          buyPageConstants.TIER_TYPES.COMMERCIAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        break;
      case commonConstants.PRODUCT_NAMES.RUSTROVER:
        await this.validateRustRoverProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_NON_COMMERCIAL,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        await this.validateRustRoverProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        await this.validateRustRoverProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        await this.validateRustRoverProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.RUST_PLUGIN,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.YEARLY
        );
        break;
      case commonConstants.PRODUCT_NAMES.CLION:
        await this.validateCLionProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.CLION_NON_COMMERCIAL,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.MONTHLY
        );
        await this.validateCLionProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.CLION_COMMERCIAL,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.MONTHLY
        );
        await this.validateCLionProductCard(
          buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK,
          buyPageConstants.TIER_TYPES.PERSONAL,
          buyPageConstants.BILLING_TERMS.MONTHLY
        );
        break;
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "${commonConstants.PRODUCT_NAMES.IDEA}", "${commonConstants.PRODUCT_NAMES.RUSTROVER}", or "${commonConstants.PRODUCT_NAMES.CLION}".`
        );
    }
  }

  async validateIdeaProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!Object.values(buyPageConstants.TIER_TYPES).includes(tierType as TierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are "${buyPageConstants.TIER_TYPES.COMMERCIAL}" or "${buyPageConstants.TIER_TYPES.PERSONAL}".`
      );
    }
    if (!Object.values(buyPageConstants.BILLING_TERMS).includes(billingTerm as BillingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are "${buyPageConstants.BILLING_TERMS.MONTHLY}" or "${buyPageConstants.BILLING_TERMS.YEARLY}".`
      );
    }

    const card = this.ideaProductCardLocator(cardTitle);
    await this.validateProductCardCommons(card, tierType, billingTerm, cardTitle);
  }

  async validateRustRoverProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!Object.values(buyPageConstants.TIER_TYPES).includes(tierType as TierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are ${buyPageConstants.TIER_TYPES.COMMERCIAL} or ${buyPageConstants.TIER_TYPES.PERSONAL}.`
      );
    }
    if (!Object.values(buyPageConstants.BILLING_TERMS).includes(billingTerm as BillingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are ${buyPageConstants.BILLING_TERMS.MONTHLY} or ${buyPageConstants.BILLING_TERMS.YEARLY}.`
      );
    }

    const card = this.rustRoverProductCardLocatorMapper(cardTitle);
    await this.validateProductCardCommons(card, tierType, billingTerm, cardTitle);
  }

  async validateCLionProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!Object.values(buyPageConstants.TIER_TYPES).includes(tierType as TierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are ${buyPageConstants.TIER_TYPES.COMMERCIAL} or ${buyPageConstants.TIER_TYPES.PERSONAL}.`
      );
    }
    if (!Object.values(buyPageConstants.BILLING_TERMS).includes(billingTerm as BillingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are ${buyPageConstants.BILLING_TERMS.MONTHLY} or ${buyPageConstants.BILLING_TERMS.YEARLY}.`
      );
    }

    const card = this.cLionProductCardLocatorMapper(cardTitle);
    await this.validateProductCardCommons(card, tierType, billingTerm, cardTitle);

    await this.validateClionProductCardTierSwitchers(
      'clion-commercial-product-card-tier-switcher.aria.yml'
    );
  }

  getProductShortCode(cardTitle: string): string {
    // maps card title to product code ('II', 'RR', 'CL' or 'ALL')
    switch (cardTitle) {
      case buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE:
        return 'II';
      case buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK:
        return 'ALL';
      case buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL:
        return 'RR';
      case buyPageConstants.PRODUCT_CARD_TITLES.CLION_COMMERCIAL:
        return 'CL';
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are ${buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE}, ${buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL}, ${buyPageConstants.PRODUCT_CARD_TITLES.CLION_COMMERCIAL}, or ${buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK}.`
        );
    }
  }

  async validateProductCardCommons(
    card: Locator,
    tierType: string,
    billingTerm: string,
    cardTitle: string
  ) {
    if (
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE ||
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.CLION_COMMERCIAL
    ) {
      await expect(
        card.getByRole('checkbox', { name: 'Supercharge with JetBrains AI Pro' })
      ).toBeVisible();
    }

    // validate the download link for RustRover non-commercial use
    if (cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_NON_COMMERCIAL) {
      await expect(card.locator('div:nth-child(4) > a')).toHaveAttribute('href', '/rust/download/'); // TODO: Could be improved with a unique data-testid attribute in the future
    }

    // validate the download link for CLion Non-Commercial use
    if (cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.CLION_NON_COMMERCIAL) {
      await expect(this.cLionNonCommercialProductCardDownloadButtonLocator).toHaveAttribute(
        'href',
        '/clion/download/'
      );
    }

    // validate buy and get quote links
    if (
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.RUSTROVER_COMMERCIAL ||
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK ||
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.INTELLIJ_IDEA_ULTIMATE ||
      cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.CLION_COMMERCIAL
    ) {
      const productCode = this.getProductShortCode(cardTitle);
      const itemCode = this.generateItemCode(
        productCode,
        tierType as TierType,
        billingTerm as BillingTerm
      );
      await this.validateProductCardBuyLink(card, itemCode);
      await this.validateProductCardGetQuoteLink(card, itemCode);
    }

    if (cardTitle === buyPageConstants.PRODUCT_CARD_TITLES.ALL_PRODUCTS_PACK) {
      await expect(card.getByRole('link', { name: 'full suite' })).toHaveAttribute('href', '/all/');
    }
  }

  async validateClionProductCardTierSwitchers(ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(
      this.cLionCommercialProductCardLocator.locator(
        buyPageLocatorFactory.SELECTORS.ADAPTIVE_SWITCHER
      )
    ).toMatchAriaSnapshot(snapshot);
    await expect(
      this.cLionAllProductsPackProductCardLocator.locator(
        buyPageLocatorFactory.SELECTORS.ADAPTIVE_SWITCHER
      )
    ).toMatchAriaSnapshot(snapshot);
  }

  async validateProductCardBuyLink(card: Locator, itemCode: string) {
    await expect(card.getByRole('link', { name: 'Buy' })).toHaveAttribute(
      'href',
      new RegExp(`shop\\/buy\\?item=${itemCode}`)
    );
  }

  async validateProductCardGetQuoteLink(card: Locator, itemCode: string) {
    await expect(card.getByRole('link', { name: 'Get quote' })).toHaveAttribute(
      'href',
      new RegExp(`shop\\/quote\\?item=${itemCode}`)
    );
  }

  generateItemCode(productCode: string, tierType: TierType, billingTerm: BillingTerm): string {
    // generates item code in the format of {tierKey}:N:{productCode}:{billingKey} for get quote and buy links on product cards
    const tierKey = this.getTierKey(tierType);
    const billingKey = this.getBillingKey(billingTerm);
    return `${tierKey}:N:${productCode}:${billingKey}`;
  }

  getTierKey(tierType: TierType): 'C' | 'P' {
    // maps tier type to key 'C' for commercial, 'P' for personal
    return tierType === buyPageConstants.TIER_TYPES.COMMERCIAL ? 'C' : 'P';
  }

  getBillingKey(billingTerm: BillingTerm): 'Y' | 'M' {
    // maps billing term to key 'Y' for yearly, 'M' for monthly
    return billingTerm === buyPageConstants.BILLING_TERMS.YEARLY ? 'Y' : 'M';
  }
}

export default BuyPage;
