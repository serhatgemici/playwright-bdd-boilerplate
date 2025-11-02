import { test as base, createBdd } from 'playwright-bdd';

import BasePage from '#e2e/PagesAndComponents/Common/BasePage';
import CookieConsentDialog from '#e2e/PagesAndComponents/CookieConsentDialog/CookieConsentDialog';
import { BuyPageFactory } from '#e2e/PagesAndComponents/BuyPage/BuyPageFactory';

type Fixtures = {
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;
  buyPageFactory: BuyPageFactory;
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
  buyPageFactory: async ({ page }, use) => {
    const buyPageFactory = new BuyPageFactory(page);
    await use(buyPageFactory);
  },
});

export const { Given, When, Then } = createBdd(test);
export const expect = base.expect;
