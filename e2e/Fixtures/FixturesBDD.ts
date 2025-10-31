import { test as base, createBdd } from 'playwright-bdd';

import BasePage from '#e2e/Pages/Common/BasePage';
import CookieConsentDialog from '#e2e/Pages/CookieConsentDialog/CookieConsentDialog';
import BuyPage from '#e2e/Pages/BuyPage/BuyPage';

type Fixtures = {
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;
  buyPage: BuyPage;
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
});

export const { Given, When, Then } = createBdd(test);
export const expect = base.expect;
