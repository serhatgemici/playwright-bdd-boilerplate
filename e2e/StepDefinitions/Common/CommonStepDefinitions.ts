import { createBdd } from "playwright-bdd";
import { test } from '#e2e/Fixtures/FixturesBDD.ts'

const { Given, When, Then } = createBdd(test);

When('cookie consent dialog is {string}', async ({ cookieConsentDialog }, dialogState ) => {
    await cookieConsentDialog.validateCookieConsentDailogState(dialogState);
});

Given('user is on the {string} page', async ({ basePage }, pageSlug ) => {
  await basePage.navigateTo(pageSlug);
});

When('user accepts all cookies', async ({ cookieConsentDialog }) => {
  await cookieConsentDialog.clickAcceptAll();
});

Then('there are no errors in console', async ({ basePage }) => {
  basePage.checkForCriticalConsoleErrors();
});

