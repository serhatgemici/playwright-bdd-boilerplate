import { test as base } from '@playwright/test';

import BasePage from '#e2e/PagesAndComponents/Common/BasePage';
import CookieConsentDialog from '#e2e/PagesAndComponents/CookieConsentDialog/CookieConsentDialog';

/**
 * Common BDD-style step definitions that can be reused across all test domains
 * These are the foundational steps that most test scenarios will need
 */

// Common Step Definition: Given user is on the page
async function givenUserIsOnPage(basePage: BasePage, pageSlug: string) {
  await test.step(`**GIVEN** user is on the "${pageSlug}" page`, async () => {
    await basePage.navigateTo(pageSlug);
  });
}

// Common Step Definition: Cookie consent dialog state validation
async function thenCookieConsentDialogIs(
  cookieConsentDialog: CookieConsentDialog,
  dialogState: string
) {
  await test.step(`**AND** cookie consent dialog is "${dialogState}"`, async () => {
    await cookieConsentDialog.validateCookieConsentDailogState(dialogState);
  });
}

// Common Step Definition: When user accepts cookies
async function whenUserAcceptsCookies(cookieConsentDialog: CookieConsentDialog) {
  await test.step('**WHEN** user accepts all cookies', async () => {
    await cookieConsentDialog.clickAcceptAll();
  });
}

// Common Step Definition: Console error check
async function thenThereAreNoErrorsInConsole(basePage: BasePage) {
  await test.step('**THEN** there are no errors in console', () => {
    basePage.checkForCriticalConsoleErrors();
  });
}

// Common Step Definition: Heading validation
async function andHeadingDisplays(basePage: BasePage, expectedTitle: string) {
  await test.step(`**AND** heading displays "${expectedTitle}"`, async () => {
    await basePage.validateHeading(expectedTitle);
  });
}

export type CommonFixtures = {
  // Core page objects
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;

  // Common BDD-style step definition fixtures
  givenUserIsOnPage: (pageSlug: string) => Promise<void>;
  thenCookieConsentDialogIs: (dialogState: string) => Promise<void>;
  whenUserAcceptsCookies: () => Promise<void>;
  thenThereAreNoErrorsInConsole: () => Promise<void>;
  andHeadingDisplays: (expectedTitle: string) => Promise<void>;
};

export const test = base.extend<CommonFixtures>({
  // BASIC PAGE FIXTURES
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

  cookieConsentDialog: async ({ page }, use) => {
    const cookieConsentDialog = new CookieConsentDialog(page);
    await use(cookieConsentDialog);
  },

  // COMMON BDD-STYLE STEP DEFINITION FIXTURES
  givenUserIsOnPage: async ({ basePage }, use) => {
    await use(async (pageSlug: string) => {
      await givenUserIsOnPage(basePage, pageSlug);
    });
  },

  thenCookieConsentDialogIs: async ({ cookieConsentDialog }, use) => {
    await use(async (dialogState: string) => {
      await thenCookieConsentDialogIs(cookieConsentDialog, dialogState);
    });
  },

  whenUserAcceptsCookies: async ({ cookieConsentDialog }, use) => {
    await use(async () => {
      await whenUserAcceptsCookies(cookieConsentDialog);
    });
  },

  thenThereAreNoErrorsInConsole: async ({ basePage }, use) => {
    await use(async () => {
      await thenThereAreNoErrorsInConsole(basePage);
    });
  },

  andHeadingDisplays: async ({ basePage }, use) => {
    await use(async (expectedTitle: string) => {
      await andHeadingDisplays(basePage, expectedTitle);
    });
  },
});

export const expect = base.expect;
