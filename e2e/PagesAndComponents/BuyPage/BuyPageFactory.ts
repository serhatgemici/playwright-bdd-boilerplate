import { Page } from '@playwright/test';
import { BaseBuyPage } from './BaseBuyPage';
import { IdeaBuyPage } from './IdeaBuyPage';
import { RustRoverBuyPage } from './RustRoverBuyPage';
import { CLionBuyPage } from './CLionBuyPage';
import * as commonConstants from '../Common/CommonConstants';

/**
 * Factory for creating appropriate Buy Page instances
 * provides type-safe page object creation
 */
export class BuyPageFactory {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  createBuyPage(productName: string): BaseBuyPage {
    switch (productName) {
      case commonConstants.PRODUCT_NAMES.IDEA:
        return new IdeaBuyPage(this.page);
      case commonConstants.PRODUCT_NAMES.RUSTROVER:
        return new RustRoverBuyPage(this.page);
      case commonConstants.PRODUCT_NAMES.CLION:
        return new CLionBuyPage(this.page);
      default:
        throw new Error(
          `Unsupported product: ${productName}. Valid products are: ${Object.values(commonConstants.PRODUCT_NAMES).join(', ')}`
        );
    }
  }
}
