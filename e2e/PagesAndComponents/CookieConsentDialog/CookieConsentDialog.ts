import { expect, Page, Locator } from '@playwright/test';
import BasePage from '../Common/BasePage';
import * as cookieConsentDialogLocatorFactory from './CookieConsentDialogLocatorFactory';
import * as commonConstants from '../Common/CommonConstants';

class CookieConsentOverlay {
  page: Page;
  // External page objects properties declarations
  basePage: BasePage;
  private cookieConsentDialogLocators: cookieConsentDialogLocatorFactory.Locators;
  // Locator properties declarations
  readonly cookieConsentDialogHeading!: Locator;
  readonly acceptAllButton!: Locator;

  constructor(page: Page) {
    this.page = page;

    // External page objects initializations
    this.basePage = new BasePage(page);

    // Initialize locator factory and assign locators
    this.cookieConsentDialogLocators = new cookieConsentDialogLocatorFactory.Locators(page);
    const cookieConsentDialogLocators = this.cookieConsentDialogLocators.createAllLocators();
    Object.assign(this, cookieConsentDialogLocators);
  }

  // METHODS
  async clickAcceptAll(): Promise<void> {
    await this.acceptAllButton.click();
  }

  async validateCookieConsentDailogState(dialogState: string): Promise<void> {
    if (dialogState === commonConstants.DISPLAYED) {
      await this.validateCookieConsentDialogDisplayed();
    } else if (dialogState === commonConstants.NOT_DISPLAYED) {
      await this.validateCookieConsentDialogClosed();
    } else {
      throw new Error(
        `Invalid state: ${dialogState}. Valid states are "${commonConstants.DISPLAYED}" or "${commonConstants.NOT_DISPLAYED}".`
      );
    }
  }

  async validateCookieConsentDialogDisplayed(): Promise<void> {
    await expect(this.cookieConsentDialogHeading).toBeVisible();
  }

  async validateCookieConsentDialogClosed(): Promise<void> {
    await this.cookieConsentDialogHeading.waitFor({
      state: commonConstants.HIDDEN,
    });
  }
}

export default CookieConsentOverlay;
