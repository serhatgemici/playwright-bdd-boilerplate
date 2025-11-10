import { test as base } from '@playwright/test';

import BasePage from '#e2e/PagesAndComponents/Common/BasePage';
import CookieConsentDialog from '#e2e/PagesAndComponents/CookieConsentDialog/CookieConsentDialog';
import {
  givenUserIsOnPage,
  andCookieConsentDialogIs,
  whenUserAcceptsCookies,
  thenThereAreNoErrorsInConsole,
  andHeadingDisplays,
} from '../StepDefinitions/CommonStepDefinitions';

/**
 * Common Fixtures Architecture - Base Layer
 *
 * This fixture provides:
 * - Core page objects used across all domains
 * - BDD-style step definition fixtures for common scenarios
 * - Foundation that all domain-specific fixtures extend
 *
 * Step definitions are imported from CommonStepDefinitions.ts to keep this file focused
 * on fixture configuration and dependency injection.
 */

export type CommonFixtures = {
  // Core page objects
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;

  // Common BDD-style step definition fixtures
  givenUserIsOnPage: (pageSlug: string) => Promise<void>;
  andCookieConsentDialogIs: (dialogState: string) => Promise<void>;
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

  andCookieConsentDialogIs: async ({ cookieConsentDialog }, use) => {
    await use(async (dialogState: string) => {
      await andCookieConsentDialogIs(cookieConsentDialog, dialogState);
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
