import { expect, Page, Locator } from '@playwright/test';

import BasePage from '#e2e/Pages/BasePage';

class CookieConsentOverlay {
  page: Page;
  basePage: BasePage;
  cookieConsentDialogHeading: Locator;
  ablehnenEinstellungenButton: Locator;
  acceptAllButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // PAGE OBJECTS
    this.basePage = new BasePage(page);

    // LOCATORS
    this.cookieConsentDialogHeading = page.getByRole('heading', { name: 'Cookie Settings' });
    this.ablehnenEinstellungenButton = page.getByTestId('uc-more-button');
    this.acceptAllButton = page.getByRole('button', { name: 'Accept All' });

    // PROPERTIES
    // List properties here
  }

  // METHODS
  async clickAcceptAll(): Promise<void> {
    await this.acceptAllButton.click();
  }

  async validateCookieConsentDailogState(dialogState: string): Promise<void> {
    if (dialogState === 'displayed') {
      await this.validateCookieConsentDialogDisplayed();
    } else if (dialogState === 'not displayed') {
      await this.validateCookieConsentDialogClosed();
    } else {
      throw new Error(
        `Invalid state: ${dialogState}. Valid states are "displayed" or "not displayed".`
      );
    }
  }

  async validateCookieConsentDialogDisplayed(): Promise<void> {
    await expect(this.cookieConsentDialogHeading).toBeVisible();
  }

  async validateCookieConsentDialogClosed(): Promise<void> {
    await this.cookieConsentDialogHeading.waitFor({ state: 'hidden' });
  }
}

export default CookieConsentOverlay;
