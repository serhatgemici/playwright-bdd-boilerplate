import { test as base, createBdd } from 'playwright-bdd';

import BasePage from '#e2e/Pages/BasePage';
import CookieConsentDialog from '#e2e/Pages/CookieConsentDialog';
import BuyPage from '#e2e/Pages/BuyPage';
import NavigationBar from '#e2e/Pages/NavigationBar.ts';
import LoginPage from '#e2e/Pages/LoginPage.ts';
import SignUpPage from '#e2e/Pages/SignUpPage.ts';

type Fixtures = {
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;
  buyPage: BuyPage;
  navigationBar: NavigationBar;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  cookieConsentDialog: async ({ page }, use) => {
    const cookieConsentOverlay = new CookieConsentDialog(page);
    await use(cookieConsentOverlay);
  },
  buyPage: async ({ page }, use) => {
    const buyPage = new BuyPage(page);
    await use(buyPage);
  },
  navigationBar: async ({ page }, use) => {
    const navigationBar = new NavigationBar(page);
    await use(navigationBar);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
});

export const { Given, When, Then } = createBdd(test);
export const expect = base.expect;
