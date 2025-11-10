import { test } from '@playwright/test';

import BasePage from '#e2e/PagesAndComponents/Common/BasePage';
import CookieConsentDialog from '#e2e/PagesAndComponents/CookieConsentDialog/CookieConsentDialog';

/**
 * Common BDD-style step definition functions
 * These are pure functions that can be reused across all test domains
 *
 * Benefits of separating step definitions:
 * - Keeps fixture files clean and focused on configuration
 * - Makes step definitions reusable and testable
 * - Easier to maintain and extend
 * - Clear separation of concerns
 */

// Common Step Definition: Given user is on the "<pageSlug>" page
export async function givenUserIsOnPage(basePage: BasePage, pageSlug: string): Promise<void> {
  await test.step(`**GIVEN** user is on the "${pageSlug}" page`, async () => {
    await basePage.navigateTo(pageSlug);
  });
}

// Common Step Definition: And cookie consent dialog is "<displayed/not displayed>"
export async function andCookieConsentDialogIs(
  cookieConsentDialog: CookieConsentDialog,
  dialogState: string
): Promise<void> {
  await test.step(`**AND** cookie consent dialog is "${dialogState}"`, async () => {
    await cookieConsentDialog.validateCookieConsentDailogState(dialogState);
  });
}

// Common Step Definition: When user accepts all cookies
export async function whenUserAcceptsCookies(
  cookieConsentDialog: CookieConsentDialog
): Promise<void> {
  await test.step('**WHEN** user accepts all cookies', async () => {
    await cookieConsentDialog.clickAcceptAll();
  });
}

// Common Step Definition: Then there are no errors in console
export async function thenThereAreNoErrorsInConsole(basePage: BasePage): Promise<void> {
  await test.step('**THEN** there are no errors in console', () => {
    basePage.checkForCriticalConsoleErrors();
  });
}

// Common Step Definition: And heading displays "<expectedTitle>"
export async function andHeadingDisplays(basePage: BasePage, expectedTitle: string): Promise<void> {
  await test.step(`**AND** heading displays "${expectedTitle}"`, async () => {
    await basePage.validateHeading(expectedTitle);
  });
}
