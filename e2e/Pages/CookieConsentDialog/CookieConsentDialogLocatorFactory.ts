import { Page, Locator } from '@playwright/test';
import { COOKIE_CONSENT_DIALOG_TEXTS } from './CookieConsentDialogConstants';

export class Locators {
  constructor(private page: Page) {}

  // Create all locators at once
  createAllLocators() {
    return {
      cookieConsentDialogHeading: this.createCookieConsentDialogHeading(),
      acceptAllButton: this.createAcceptAllButton(),
    };
  }

  createCookieConsentDialogHeading(): Locator {
    return this.page.getByRole('heading', {
      name: COOKIE_CONSENT_DIALOG_TEXTS.HEADING,
    });
  }

  createAcceptAllButton(): Locator {
    return this.page.getByRole('button', {
      name: COOKIE_CONSENT_DIALOG_TEXTS.ACCEPT_ALL_BUTTON,
    });
  }
}
