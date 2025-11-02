import { expect, Page, Locator } from '@playwright/test';
import BasePage from '../Common/BasePage';
import * as buyPageConstants from './BuyPageConstants';
import * as commonConstants from '../Common/CommonConstants';

/**
 * Base class for all Buy Page implementations
 * Contains common functionality shared across all product buy pages
 */
export abstract class BaseBuyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Buy page specific helper methods
  protected async validateProductCardBuyLink(card: Locator, itemCode: string): Promise<void> {
    await expect(
      card.getByRole('link', { name: buyPageConstants.UI_TEXT.BUY_BUTTON })
    ).toHaveAttribute('href', new RegExp(`shop\\/buy\\?item=${itemCode}`));
  }

  protected async validateProductCardGetQuoteLink(card: Locator, itemCode: string): Promise<void> {
    await expect(
      card.getByRole('link', { name: buyPageConstants.UI_TEXT.GET_QUOTE_BUTTON })
    ).toHaveAttribute('href', new RegExp(`shop\\/quote\\?item=${itemCode}`));
  }

  getSupportedProducts(): string[] {
    return Object.values(commonConstants.PRODUCT_NAMES);
  }

  // Convenience methods for common validation operations
  abstract validateCommonTierSwitcher(productName: string): Promise<void>;
  abstract validateBillingTermSwitcher(productName: string): Promise<void>;
  abstract validateDefaultStateOfProductCards(productName: string): Promise<void>;
}
