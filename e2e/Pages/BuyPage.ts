import { expect, Page, Locator } from '@playwright/test';
import { readAriaSnapshot } from '../../utils/readAriaSnapshot';

const BILLING_LABELS = ['Monthly billing', 'Yearly billing'];
const TIER_LABELS = ['For Individual Use', 'For Organizations'];

const DISPLAYED = 'displayed';
const NOT_DISPLAYED = 'not displayed';

// Product Card Titles
const INTELLIJ_IDEA_ULTIMATE = 'IntelliJ IDEA Ultimate';
const RUSTROVER_NON_COMMERCIAL = 'RustRover non-commercial use';
const RUSTROVER_COMMERCIAL = 'RustRover';
const CLION_NON_COMMERCIAL = 'CLion Non-Commercial';
const CLION_COMMERCIAL = 'CLion Commercial';
const RUST_PLUGIN = 'Rust Plugin';
const ALL_PRODUCTS_PACK = 'All Products Pack';

type TierType = 'commercial' | 'personal';
type BillingTerm = 'monthly' | 'yearly';

class BuyPage {
  page: Page;
  commonAdaptiveSwitcherLocator: (labels: string[]) => Locator;
  billingTypeRadioGroup: Locator;
  ideaProductCard: (productCardTitle: string) => Locator;
  rustRoverProductCards: Locator;
  cLionNonCommercialProductCard: Locator;
  cLionCommercialProductCard: Locator;
  cLionAllProductsPackProductCard: Locator;
  cLionNonCommercialProductCardDownloadButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // LOCATORS
    this.commonAdaptiveSwitcherLocator = (labels: string[]) =>
      this.page
        .locator('[data-test="adaptive-switcher__switcher"]')
        .filter({ has: this.page.getByRole('button', { name: labels[0] }) })
        .filter({ has: this.page.getByRole('button', { name: labels[1] }) })
        .first(); // TODO: This could have a unique data-testid attribute in the future
    this.billingTypeRadioGroup = this.page.locator('[data-rs-internal="radio-button-list__menu"]');
    this.ideaProductCard = (productCardTitle: string) =>
      this.page
        .locator('[data-test^="product-card-"]')
        .filter({
          has: this.page
            .locator('[data-test^="product-name"]')
            .filter({ hasText: productCardTitle }),
        })
        .first(); // TODO: This could have a unique data-testid attribute in the future
    this.rustRoverProductCards = this.page.locator(
      'div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div'
    ); // TODO: This could have a unique data-testid attribute in the future
    this.cLionNonCommercialProductCard = this.page.locator(
      '[data-test="non-commercial-product-buy-card-CLion-Non-Commercial"]'
    );
    this.cLionCommercialProductCard = this.page.locator(
      '[data-test="non-commercial-product-buy-card-CLion-Commercial"]'
    );
    this.cLionAllProductsPackProductCard = this.page
      .locator('[data-test="sticky-tag-wrapper"]')
      .filter({
        has: this.page
          .locator('[data-test^="product-name"]')
          .filter({ hasText: 'All Products Pack' }),
      })
      .first(); // TODO: This could have a unique data-testid attribute in the future
    this.cLionNonCommercialProductCardDownloadButton =
      this.cLionNonCommercialProductCard.locator('[data-test="button"]');
  }

  // METHODS
  async validateHeading(headingText: string) {
    await expect(this.page.locator('h1')).toHaveText(headingText);
  }

  async validateCommonTierSwitcher(productName: string) {
    switch (productName) {
      case 'idea': {
        await this.validateCommonAdaptiveSwitcher(
          TIER_LABELS,
          'idea-common-tier-switcher.aria.yml'
        );
        break;
      }
      case 'rustRover': {
        await this.validateCommonAdaptiveSwitcher(
          TIER_LABELS,
          'rustrover-common-tier-switcher.aria.yml'
        );
        break;
      }
      case 'cLion': {
        await expect(this.commonAdaptiveSwitcherLocator(TIER_LABELS)).not.toBeVisible();
        break;
      }
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "idea", "rustRover", or "cLion".`
        );
    }
  }

  async validateBillingTermSwitcher(productName: string) {
    switch (productName) {
      case 'idea':
        await this.validateCommonAdaptiveSwitcher(
          BILLING_LABELS,
          'idea-billing-term-switcher.aria.yml'
        );
        break;
      case 'rustRover':
        await this.validateBillingTypeRadioGroup('rustrover-billing-type-radio-group.aria.yml');
        break;
      case 'cLion':
        await this.validateCommonAdaptiveSwitcher(
          BILLING_LABELS,
          'clion-billing-term-switcher.aria.yml'
        );
        break;
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "idea", "rustRover", or "cLion".`
        );
    }
  }

  async validateCommonAdaptiveSwitcher(labels: string[], ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(this.commonAdaptiveSwitcherLocator(labels)).toMatchAriaSnapshot(snapshot);
  }

  async validateBillingTypeRadioGroup(ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(this.billingTypeRadioGroup).toBeVisible();
    await expect(this.billingTypeRadioGroup).toMatchAriaSnapshot(snapshot);
  }

  async validateElementDisplayed(locator: Locator, state: string) {
    if (state === DISPLAYED) {
      await expect(locator).toBeVisible();
    } else if (state === NOT_DISPLAYED) {
      await expect(locator).toBeHidden();
    } else {
      throw new Error(
        `Invalid state: ${state}. Valid states are "${DISPLAYED}" or "${NOT_DISPLAYED}".`
      );
    }
  }

  async validateDefaultStateOfProductCards(productName: string) {
    switch (productName) {
      case 'idea':
        await this.validateIdeaProductCard(INTELLIJ_IDEA_ULTIMATE, 'commercial', 'yearly');
        await this.validateIdeaProductCard(ALL_PRODUCTS_PACK, 'commercial', 'yearly');
        break;
      case 'rustRover':
        await this.validateRustRoverProductCard(RUSTROVER_NON_COMMERCIAL, 'personal', 'yearly');
        await this.validateRustRoverProductCard(RUSTROVER_COMMERCIAL, 'personal', 'yearly');
        await this.validateRustRoverProductCard(ALL_PRODUCTS_PACK, 'personal', 'yearly');
        await this.validateRustRoverProductCard(RUST_PLUGIN, 'personal', 'yearly');
        break;
      case 'cLion':
        await this.validateCLionProductCard(CLION_NON_COMMERCIAL, 'personal', 'monthly');
        await this.validateCLionProductCard(CLION_COMMERCIAL, 'personal', 'monthly');
        await this.validateCLionProductCard(ALL_PRODUCTS_PACK, 'personal', 'monthly');
        break;
      default:
        throw new Error(
          `Invalid product name: ${productName}. Valid product names are "idea", "rustRover", or "cLion".`
        );
    }
  }

  async validateIdeaProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!['commercial', 'personal'].includes(tierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are "commercial" or "personal".`
      );
    }
    if (!['monthly', 'yearly'].includes(billingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are "monthly" or "yearly".`
      );
    }

    const card = this.ideaProductCard(cardTitle);
    await this.validateProductCardCommons(card, tierType, billingTerm, cardTitle);
  }

  async validateRustRoverProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!['commercial', 'personal'].includes(tierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are "commercial" or "personal".`
      );
    }
    if (!['monthly', 'yearly'].includes(billingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are "monthly" or "yearly".`
      );
    }

    const card = this.rustRoverProductCardLocatorMapper(cardTitle);
    await this.validateProductCardCommons(card, tierType, billingTerm, cardTitle);
  }

  async validateCLionProductCard(cardTitle: string, tierType: string, billingTerm: string) {
    if (!['commercial', 'personal'].includes(tierType)) {
      throw new Error(
        `Invalid tier type: ${tierType}. Valid tier types are "commercial" or "personal".`
      );
    }
    if (!['monthly', 'yearly'].includes(billingTerm)) {
      throw new Error(
        `Invalid billing term: ${billingTerm}. Valid billing terms are "monthly" or "yearly".`
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
      case INTELLIJ_IDEA_ULTIMATE:
        return 'II';
      case ALL_PRODUCTS_PACK:
        return 'ALL';
      case RUSTROVER_COMMERCIAL:
        return 'RR';
      case CLION_COMMERCIAL:
        return 'CL';
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are ${INTELLIJ_IDEA_ULTIMATE}, ${RUSTROVER_COMMERCIAL}, ${CLION_COMMERCIAL}, or ${ALL_PRODUCTS_PACK}.`
        );
    }
  }

  rustRoverProductCardLocatorMapper(cardTitle: string): Locator {
    switch (cardTitle) {
      case RUSTROVER_NON_COMMERCIAL:
        return this.rustRoverProductCards.nth(0);
      case RUSTROVER_COMMERCIAL:
        return this.rustRoverProductCards.nth(1);
      case ALL_PRODUCTS_PACK:
        return this.rustRoverProductCards.nth(2);
      case RUST_PLUGIN:
        return this.rustRoverProductCards.nth(3);
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are "RustRover non-commercial use", "RustRover", or "All Products Pack".`
        );
    }
  }

  cLionProductCardLocatorMapper(cardTitle: string): Locator {
    switch (cardTitle) {
      case 'CLion Non-Commercial':
        return this.cLionNonCommercialProductCard;
      case 'CLion Commercial':
        return this.cLionCommercialProductCard;
      case 'All Products Pack':
        return this.cLionAllProductsPackProductCard;
      default:
        throw new Error(
          `Invalid card title: ${cardTitle}. Valid card titles are "CLion Non-Commercial", "CLion Commercial", or "All Products Pack".`
        );
    }
  }

  async validateProductCardCommons(
    card: Locator,
    tierType: string,
    billingTerm: string,
    cardTitle: string
  ) {
    if (cardTitle === INTELLIJ_IDEA_ULTIMATE || cardTitle === CLION_COMMERCIAL) {
      await expect(
        card.getByRole('checkbox', { name: 'Supercharge with JetBrains AI Pro' })
      ).toBeVisible();
    }

    // validate the download link for RustRover non-commercial use
    if (cardTitle === RUSTROVER_NON_COMMERCIAL) {
      await expect(card.locator('div:nth-child(4) > a')).toHaveAttribute('href', '/rust/download/'); // TODO: Could be improved with a unique data-testid attribute in the future
    }

    // validate the download link for CLion Non-Commercial use
    if (cardTitle === CLION_NON_COMMERCIAL) {
      await expect(this.cLionNonCommercialProductCardDownloadButton).toHaveAttribute(
        'href',
        '/clion/download/'
      );
    }

    // validate buy and get quote links
    if (
      cardTitle === RUSTROVER_COMMERCIAL ||
      cardTitle === ALL_PRODUCTS_PACK ||
      cardTitle === INTELLIJ_IDEA_ULTIMATE ||
      cardTitle === CLION_COMMERCIAL
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

    if (cardTitle === 'All Products Pack') {
      await expect(card.getByRole('link', { name: 'full suite' })).toHaveAttribute('href', '/all/');
    }
  }

  async validateClionProductCardTierSwitchers(ariaFileName: string) {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(
      this.cLionCommercialProductCard.locator('[data-test="adaptive-switcher__switcher"]')
    ).toMatchAriaSnapshot(snapshot);
    await expect(
      this.cLionAllProductsPackProductCard.locator('[data-test="adaptive-switcher__switcher"]')
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
    return tierType === 'commercial' ? 'C' : 'P';
  }

  getBillingKey(billingTerm: BillingTerm): 'Y' | 'M' {
    // maps billing term to key 'Y' for yearly, 'M' for monthly
    return billingTerm === 'yearly' ? 'Y' : 'M';
  }
}

export default BuyPage;
