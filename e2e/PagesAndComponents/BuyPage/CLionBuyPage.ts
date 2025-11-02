import { Page, Locator } from '@playwright/test';
import { BaseBuyPage } from './BaseBuyPage';
import * as buyPageConstants from './BuyPageConstants';
import * as commonConstants from '../Common/CommonConstants';
import * as buyPageLocatorFactory from './BuyPageLocatorFactory';

/**
 * CLion Buy Page
 * Handles CLion-specific buy page functionality
 */
export class CLionBuyPage extends BaseBuyPage {
  private readonly billingSwitcher: Locator;
  private readonly nonCommercialCard: Locator;
  private readonly commercialCard: Locator;
  private readonly allProductsPackCard: Locator;
  private readonly downloadButton: Locator;
  private readonly tierSwitcher: Locator;
  private readonly aiProCheckbox: Locator;
  private readonly commercialTierSwitcher: Locator;
  private readonly allPackTierSwitcher: Locator;
  private buyPageLocators: buyPageLocatorFactory.Locators;

  constructor(page: Page) {
    super(page);

    // Initialize locator factory and assign locators
    this.buyPageLocators = new buyPageLocatorFactory.Locators(page);
    const cLionLocators = this.buyPageLocators.createCLionLocators();

    // Assign locators from factory
    this.billingSwitcher = cLionLocators.billingSwitcher;
    this.nonCommercialCard = cLionLocators.nonCommercialCard;
    this.commercialCard = cLionLocators.commercialCard;
    this.allProductsPackCard = cLionLocators.allProductsPackCard;
    this.downloadButton = cLionLocators.downloadButton;

    // Initialize common locators
    this.tierSwitcher = this.buyPageLocators.createTierSwitcher();
    this.aiProCheckbox = this.buyPageLocators.createAiProCheckbox(this.commercialCard);

    // Initialize tier switchers for cards
    const adaptiveSwitcherSelector = this.buyPageLocators.getAdaptiveSwitcherSelector();
    this.commercialTierSwitcher = this.commercialCard.locator(adaptiveSwitcherSelector);
    this.allPackTierSwitcher = this.allProductsPackCard.locator(adaptiveSwitcherSelector);
  }

  async validateCLionTierSwitcher(): Promise<void> {
    // CLion doesn't have a tier switcher - it should not be visible
    await this.validateElementDisplayed(this.tierSwitcher, commonConstants.NOT_DISPLAYED);
  }

  async validateCLionBillingTermSwitcher(): Promise<void> {
    await this.validateAriaSnapshot(
      this.billingSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.CLION_BILLING_TERM_SWITCHER
    );
  }

  async validateCLionDefaultProductCards(): Promise<void> {
    await this.validateNonCommercialCard();
    await this.validateCommercialCard();
    await this.validateAllProductsPackCard();
    await this.validateTierSwitchersOnCards();
  }

  // Implementation of abstract methods from BaseBuyPage
  async validateCommonTierSwitcher(): Promise<void> {
    await this.validateCLionTierSwitcher();
  }

  async validateBillingTermSwitcher(): Promise<void> {
    await this.validateCLionBillingTermSwitcher();
  }

  async validateDefaultStateOfProductCards(): Promise<void> {
    await this.validateCLionDefaultProductCards();
  }

  private async validateNonCommercialCard(): Promise<void> {
    await this.validateElementDisplayed(this.nonCommercialCard, commonConstants.DISPLAYED);

    // Validate download button for non-commercial use - using original selector
    await this.validateElementDisplayed(this.downloadButton, commonConstants.DISPLAYED);
  }

  private async validateCommercialCard(): Promise<void> {
    await this.validateElementDisplayed(this.commercialCard, commonConstants.DISPLAYED);

    // Validate AI Pro checkbox
    await this.validateElementDisplayed(this.aiProCheckbox, commonConstants.DISPLAYED);

    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.CLION,
      buyPageConstants.TIER_TYPES.PERSONAL,
      buyPageConstants.BILLING_TERMS.MONTHLY
    );
    await this.validateProductCardBuyLink(this.commercialCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.commercialCard, itemCode);
  }

  private async validateAllProductsPackCard(): Promise<void> {
    await this.validateElementDisplayed(this.allProductsPackCard, commonConstants.DISPLAYED);

    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.ALL_PRODUCTS_PACK,
      buyPageConstants.TIER_TYPES.PERSONAL,
      buyPageConstants.BILLING_TERMS.MONTHLY
    );
    await this.validateProductCardBuyLink(this.allProductsPackCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.allProductsPackCard, itemCode);
  }

  private async validateTierSwitchersOnCards(): Promise<void> {
    await this.validateAriaSnapshot(
      this.commercialTierSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.CLION_COMMERCIAL_PRODUCT_CARD_TIER_SWITCHER
    );
    await this.validateAriaSnapshot(
      this.allPackTierSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.CLION_COMMERCIAL_PRODUCT_CARD_TIER_SWITCHER
    );
  }

  private generateItemCode(productCode: string, tierType: string, billingTerm: string): string {
    const tierKey = tierType === buyPageConstants.TIER_TYPES.COMMERCIAL ? 'C' : 'P';
    const billingKey = billingTerm === buyPageConstants.BILLING_TERMS.YEARLY ? 'Y' : 'M';
    return `${tierKey}:N:${productCode}:${billingKey}`;
  }
}
