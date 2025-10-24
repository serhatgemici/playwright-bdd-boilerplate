import { test as base } from 'playwright-bdd';

import BasePage from '#e2e/Pages/BasePage';
import CookieConsentDialog from '#e2e/Pages/CookieConsentDialog';
import BuyPage from '#e2e/Pages/BuyPage';

export const test = base.extend<{
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;
  buyPage: BuyPage;
}>({
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
export const expect = base.expect;
