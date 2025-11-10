import { test } from '../Fixtures/ProductPurchaseJourneyFixtures';

test.describe('Product Purchase Journey Tests', () => {
  const testData = [
    {
      caseId: 'C1',
      productName: 'idea',
      pageSlug: 'idea/buy/',
      title: 'Subscription Options and Pricing',
    },
    {
      caseId: 'C2',
      productName: 'cLion',
      pageSlug: 'clion/buy/',
      title: 'Subscription Plans',
    },
    {
      caseId: 'C3',
      productName: 'rustRover',
      pageSlug: 'rust/buy/',
      title: 'Subscription Plans',
    },
  ];

  test.describe('Buy page validations', () => {
    testData.forEach(({ caseId, productName, pageSlug, title }) => {
      test(`${caseId}: Validating default state of the "${productName}" buy page`, async ({
        givenUserIsOnPage,
        andCookieConsentDialogIs,
        whenUserAcceptsCookies,
        andHeadingDisplays,
        thenTierSwitcherIsValidated,
        thenBillingTermSwitcherIsValidated,
        thenProductCardsAreValidated,
        thenThereAreNoErrorsInConsole,
      }) => {
        // BDD-style step-by-step execution using parameterized fixtures
        await givenUserIsOnPage(pageSlug);
        await andCookieConsentDialogIs('displayed');
        await whenUserAcceptsCookies();
        await andCookieConsentDialogIs('not displayed');
        await andHeadingDisplays(title);
        await thenTierSwitcherIsValidated(productName);
        await thenBillingTermSwitcherIsValidated(productName);
        await thenProductCardsAreValidated(productName);
        await thenThereAreNoErrorsInConsole();
      });
    });
  });
});
