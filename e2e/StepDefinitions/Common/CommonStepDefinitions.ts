import { Given, When, Then } from '#e2e/Fixtures/FixturesBDD.ts';
import { getCurrentUserData } from '#utils/dataGenerator';

Then('there are no errors in console', ({ basePage }) => {
  basePage.checkForCriticalConsoleErrors();
});

Given('user has landed on the homepage', async ({ basePage }) => {
  await basePage.visitSUT();
});

When('user clicks on {string} button', async ({ basePage }, buttonText: string) => {
  await basePage.clickButtonByText(buttonText);
});

Then('{string} text is {string}', async ({ basePage }, elementText: string, state: string) => {
  await basePage.validateTextVisibility(elementText, state);
});

When(
  'user clicks on {string} on the navigation bar',
  async ({ navigationBar }, navItem: string) => {
    await navigationBar.clickNavBarItemByName(navItem);
  }
);

When('user clicks on {string} link', async ({ basePage }, linkText: string) => {
  await basePage.clickLinkByText(linkText);
});

Then(
  'logged in as {string} text is {string} at the navigation bar',
  async ({ navigationBar }, username: string, state: string) => {
    await navigationBar.validateLoggedInAsText(username, state);
  }
);

Then(
  'logged in as generated name text is {string} at the navigation bar',
  async ({ navigationBar }, state: string) => {
    const userData = getCurrentUserData();
    await navigationBar.validateLoggedInAsText(userData.fullName, state);
  }
);
