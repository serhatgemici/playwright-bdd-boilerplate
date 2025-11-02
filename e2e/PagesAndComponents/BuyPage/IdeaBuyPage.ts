import { Page, Locator } from '@playwright/test';
import { BaseBuyPage } from './BaseBuyPage';
import * as buyPageConstants from './BuyPageConstants';
import * as commonConstants from '../Common/CommonConstants';
import * as buyPageLocatorFactory from './BuyPageLocatorFactory';

/**
 * IntelliJ IDEA Buy Page
 * Handles IDEA-specific buy page functionality
 */
export class IdeaBuyPage extends BaseBuyPage {
  private readonly tierSwitcher: Locator;
  private readonly billingSwitcher: Locator;
  private readonly ideaUltimateCard: Locator;
  private readonly allProductsPackCard: Locator;
  private readonly ideaUltimateAiProCheckbox: Locator;
  private readonly fullSuiteLink: Locator;
  private buyPageLocators: buyPageLocatorFactory.Locators;

  constructor(page: Page) {
    super(page);

    // Initialize locator factory and assign locators
    this.buyPageLocators = new buyPageLocatorFactory.Locators(page);
    const ideaLocators = this.buyPageLocators.createIdeaLocators();

    // Assign locators from factory
    this.tierSwitcher = ideaLocators.tierSwitcher;
    this.billingSwitcher = ideaLocators.billingSwitcher;
    this.ideaUltimateCard = ideaLocators.ideaUltimateCard;
    this.allProductsPackCard = ideaLocators.allProductsPackCard;
    this.ideaUltimateAiProCheckbox = this.buyPageLocators.createAiProCheckbox(
      this.ideaUltimateCard
    );
    this.fullSuiteLink = this.buyPageLocators.createFullSuiteLink(this.allProductsPackCard);
  }

  async validateIdeaTierSwitcher(): Promise<void> {
    await this.validateAriaSnapshot(
      this.tierSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.IDEA_COMMON_TIER_SWITCHER
    );
  }

  async validateIdeaBillingTermSwitcher(): Promise<void> {
    await this.validateAriaSnapshot(
      this.billingSwitcher,
      buyPageConstants.ARIA_SNAPSHOTS.IDEA_BILLING_TERM_SWITCHER
    );
  }

  async validateIdeaDefaultProductCards(): Promise<void> {
    await this.validateIdeaUltimateCard();
    await this.validateAllProductsPackCard();
  }

  // Implementation of abstract methods from BaseBuyPage
  async validateCommonTierSwitcher(_productName: string): Promise<void> {
    await this.validateIdeaTierSwitcher();
  }

  async validateBillingTermSwitcher(_productName: string): Promise<void> {
    await this.validateIdeaBillingTermSwitcher();
  }

  async validateDefaultStateOfProductCards(_productName: string): Promise<void> {
    await this.validateIdeaDefaultProductCards();
  }

  private async validateIdeaUltimateCard(): Promise<void> {
    // Validate card is visible
    await this.validateElementDisplayed(this.ideaUltimateCard, commonConstants.DISPLAYED);

    // Validate AI Pro checkbox
    await this.validateElementDisplayed(this.ideaUltimateAiProCheckbox, commonConstants.DISPLAYED);

    // Validate buy and quote links
    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.INTELLIJ_IDEA,
      buyPageConstants.TIER_TYPES.COMMERCIAL,
      buyPageConstants.BILLING_TERMS.YEARLY
    );
    await this.validateProductCardBuyLink(this.ideaUltimateCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.ideaUltimateCard, itemCode);
  }

  private async validateAllProductsPackCard(): Promise<void> {
    await this.validateElementDisplayed(this.allProductsPackCard, commonConstants.DISPLAYED);
    await this.validateElementDisplayed(this.fullSuiteLink, commonConstants.DISPLAYED);

    const itemCode = this.generateItemCode(
      buyPageConstants.PRODUCT_CODES.ALL_PRODUCTS_PACK,
      buyPageConstants.TIER_TYPES.COMMERCIAL,
      buyPageConstants.BILLING_TERMS.YEARLY
    );
    await this.validateProductCardBuyLink(this.allProductsPackCard, itemCode);
    await this.validateProductCardGetQuoteLink(this.allProductsPackCard, itemCode);
  }

  private generateItemCode(productCode: string, tierType: string, billingTerm: string): string {
    const tierKey = tierType === buyPageConstants.TIER_TYPES.COMMERCIAL ? 'C' : 'P';
    const billingKey = billingTerm === buyPageConstants.BILLING_TERMS.YEARLY ? 'Y' : 'M';
    return `${tierKey}:N:${productCode}:${billingKey}`;
  }
}
