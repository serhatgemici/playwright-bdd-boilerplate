import { Page, Locator } from '@playwright/test';
import { BaseBuyPage } from './BaseBuyPage';
import * as buyPageConstants from './BuyPageConstants';
import * as commonConstants from '../Common/CommonConstants';
import * as buyPageLocatorFactory from './BuyPageLocatorFactory';

/**
 * RustRover Buy Page
 * Handles RustRover-specific buy page functionality
 */
export class RustRoverBuyPage extends BaseBuyPage {
  private readonly tierSwitcher: Locator;
  private readonly billingRadioGroup: Locator;
  private readonly rustRoverProductCards: Locator;
  private readonly nonCommercialCard: Locator;
  private readonly commercialCard: Locator;
  private readonly allProductsPackCard: Locator;
  private readonly rustPluginCard: Locator;
  private readonly rustRoverDownloadLink: Locator;
  private buyPageLocators: buyPageLocatorFactory.Locators;

  constructor(page: Page) {
    super(page);

    // Initialize locator factory and assign locators
    this.buyPageLocators = new buyPageLocatorFactory.Locators(page);
    const rustRoverLocators = this.buyPageLocators.createRustRoverLocators();

    // Assign locators from factory
    this.tierSwitcher = rustRoverLocators.tierSwitcher;
    this.billingRadioGroup = rustRoverLocators.billingRadioGroup;
    this.rustRoverProductCards = rustRoverLocators.rustRoverProductCards;
    this.nonCommercialCard = rustRoverLocators.nonCommercialCard;
    this.commercialCard = rustRoverLocators.commercialCard;
    this.allProductsPackCard = rustRoverLocators.allProductsPackCard;
    this.rustPluginCard = rustRoverLocators.rustPluginCard;
    this.rustRoverDownloadLink = this.buyPageLocators.createRustRoverDownloadLink(
      this.nonCommercialCard
    );
  }

  async validateRustRoverTierSwitcher(): Promise<void> {
    await this.validateAriaSnapshot(
      this.tierSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.RUSTROVER_COMMON_TIER_SWITCHER
    );
  }

  async validateRustRoverBillingTermSwitcher(): Promise<void> {
    await this.validateElementDisplayed(this.billingRadioGroup, commonConstants.DISPLAYED);
    await this.validateAriaSnapshot(
      this.billingRadioGroup,
      buyPageConstants.ARIA_SNAPSHOTS.RUSTROVER_BILLING_TYPE_RADIO_GROUP
    );
  }

  async validateRustRoverDefaultProductCards(): Promise<void> {
    await this.validateNonCommercialCard();
    await this.validateCommercialCard();
    await this.validateAllProductsPackCard();
    await this.validateRustPluginCard();
  }

  // Implementation of abstract methods from BaseBuyPage
  async validateCommonTierSwitcher(): Promise<void> {
    await this.validateRustRoverTierSwitcher();
  }

  async validateBillingTermSwitcher(): Promise<void> {
    await this.validateRustRoverBillingTermSwitcher();
  }

  async validateDefaultStateOfProductCards(): Promise<void> {
    await this.validateRustRoverDefaultProductCards();
  }

  private async validateNonCommercialCard(): Promise<void> {
    await this.validateElementDisplayed(this.nonCommercialCard, commonConstants.DISPLAYED);

    // Validate download link for non-commercial use
    await this.validateElementDisplayed(this.rustRoverDownloadLink, commonConstants.DISPLAYED);
  }

  private async validateCommercialCard(): Promise<void> {
    await this.validateElementDisplayed(this.commercialCard, commonConstants.DISPLAYED);

    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.RUSTROVER,
      buyPageConstants.TIER_TYPES.PERSONAL,
      buyPageConstants.BILLING_TERMS.YEARLY
    );
    await this.validateProductCardBuyLink(this.commercialCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.commercialCard, itemCode);
  }

  private async validateAllProductsPackCard(): Promise<void> {
    await this.validateElementDisplayed(this.allProductsPackCard, commonConstants.DISPLAYED);

    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.ALL_PRODUCTS_PACK,
      buyPageConstants.TIER_TYPES.PERSONAL,
      buyPageConstants.BILLING_TERMS.YEARLY
    );
    await this.validateProductCardBuyLink(this.allProductsPackCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.allProductsPackCard, itemCode);
  }

  private async validateRustPluginCard(): Promise<void> {
    await this.validateElementDisplayed(this.rustPluginCard, commonConstants.DISPLAYED);
    // Add specific validations for Rust Plugin card
  }

  private generateItemCode(productCode: string, tierType: string, billingTerm: string): string {
    const tierKey = tierType === buyPageConstants.TIER_TYPES.COMMERCIAL ? 'C' : 'P';
    const billingKey = billingTerm === buyPageConstants.BILLING_TERMS.YEARLY ? 'Y' : 'M';
    return `${tierKey}:N:${productCode}:${billingKey}`;
  }
}
