import { Given, When, Then } from '#e2e/Fixtures/FixturesBDD.ts';

When('cookie consent dialog is {string}', async ({ cookieConsentDialog }, dialogState: string) => {
  await cookieConsentDialog.validateCookieConsentDailogState(dialogState);
});

Given('user is on the {string} page', async ({ basePage }, pageSlug: string) => {
  await basePage.navigateTo(pageSlug);
});

When('user accepts all cookies', async ({ cookieConsentDialog }) => {
  await cookieConsentDialog.clickAcceptAll();
});

Then('there are no errors in console', ({ basePage }) => {
  basePage.checkForCriticalConsoleErrors();
});
