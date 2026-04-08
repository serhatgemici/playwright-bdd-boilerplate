import { test as base, createBdd } from 'playwright-bdd';

import BasePage from '#e2e/Pages/BasePage';
import NavigationBar from '#e2e/Pages/NavigationBar.ts';
import LoginPage from '#e2e/Pages/LoginPage.ts';
import SignUpPage from '#e2e/Pages/SignUpPage.ts';
import type { AccountData } from '#utils/types';

type Ctx = {
  randomAccountData?: AccountData;
};

type Fixtures = {
  basePage: BasePage;
  navigationBar: NavigationBar;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  ctx: Ctx;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
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
  ctx: async ({}, use) => {
    await use({});
  },
});

export const { Given, When, Then, Before } = createBdd(test);
export const expect = base.expect;
