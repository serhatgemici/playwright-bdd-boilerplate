# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/Features/@Registration.feature.spec.js >> User Registration >> TC1 - Register a new user successfully
- Location: .features-gen/e2e/Features/@Registration.feature.spec.js:12:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Logged in as Amanda Taylor')
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByText('Logged in as Amanda Taylor')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e5]:
      - link [ref=e8] [cursor=pointer]:
        - /url: /
        - img [ref=e9]
      - list [ref=e12]:
        - listitem [ref=e13]:
          - link [ref=e14] [cursor=pointer]:
            - /url: /
            - generic [ref=e15]: 
            - text: Home
        - listitem [ref=e16]:
          - link [ref=e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=e18]: 
            - text: Products
        - listitem [ref=e19]:
          - link [ref=e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=e21]: 
            - text: Cart
        - listitem [ref=e22]:
          - link [ref=e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=e24]: 
            - text: Signup / Login
        - listitem [ref=e25]:
          - link [ref=e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=e27]: 
            - text: Test Cases
        - listitem [ref=e28]:
          - link [ref=e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=e30]: 
            - text: API Testing
        - listitem [ref=e31]:
          - link [ref=e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=e33]: 
            - text: Video Tutorials
        - listitem [ref=e34]:
          - link [ref=e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=e36]: 
            - text: Contact us
  - generic [ref=e40]:
    - heading [level=2] [ref=e41]: Account Created!
    - paragraph [ref=e42]:
      - text: Congratulations! Your new account has been successfully created!
      - link [ref=e43] [cursor=pointer]:
        - img [ref=e45]
        - text: How-To, DIY & Expert Content
    - paragraph [ref=e47]:
      - text: You can now take advantage of member privileges to enhance your online
      - link [ref=e48] [cursor=pointer]:
        - /url: "#"
        - img [ref=e49]
        - text: shopping
      - text: experience with us.
    - link [ref=e52] [cursor=pointer]:
      - /url: /
      - text: Continue
  - contentinfo [ref=e53]:
    - generic [ref=e58]:
      - heading [level=2] [ref=e59]: Subscription
      - generic [ref=e60]:
        - textbox [ref=e61]:
          - /placeholder: Your email address
        - button [ref=e62] [cursor=pointer]:
          - generic [ref=e63]: 
        - paragraph [ref=e64]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=e68]: Copyright © 2021 All rights reserved
  - text: 
  - insertion [ref=e70]:
    - generic [ref=e73]:
      - heading [level=2] [ref=e75]: Discover more
      - link [ref=e76] [cursor=pointer]:
        - generic [ref=e77]: Subscription service management
        - img [ref=e79]
      - link [ref=e81] [cursor=pointer]:
        - generic [ref=e82]: Online shopping tutorials
        - img [ref=e84]
      - link [ref=e86] [cursor=pointer]:
        - generic [ref=e87]: Performance testing tools
        - img [ref=e89]
  - insertion [ref=e91]:
    - iframe [ref=e94]:
      - iframe [ref=f51e1]:
        - generic [ref=f53e3]:
          - link "Blood Sugar Above 100? Try This Tonight Blood Sugar Above 100? Try This Tonight Rivo OPEN" [ref=f53e4] [cursor=pointer]:
            - /url: https://tracenep.admaster.cc/ju/ic?tn=2ce2e6e33746b4224011d22068a89c02&trackingid=98e9906b5b56a3b5b7e4a7f21a491dc0&acid=35661&data=tYADMHcfawy7stSrwCUViOfPFcUlAAeaqTSI_-EQxHTR6-hDWTcKCHtGQHrBgzFE3ZoowNBLP7_-BHpQqfzmWY29PttlwihyyzzUTfWXEG8l2tZv-AQMHJR0JIncYvECsZswbfYN9mEQfb1YgQQzxAZcOjOkSyTx62lhPNbWKXYsWwvXaSt6yhc71LAXFtFCzNLlQ0enIX4RwfE_estgwQ7BsI1VbSmBB1kAKDwBaDxduzrJ_Yv9V3qZjGjO9b1Uj6jA3nAgYTLYL4oTByST5p27DAKzco8Pi90_aBqhJClC9lsRUMwtHrY_8-mUwdry6MsywDf2olG-q36Njo5LmLQhD0Ss2q9jXJUB_w4bROBDwajyo9yTWf3AcDh5fuvEFlzOfks-SXdmBnvPef-himdSvy-HyCeTnSuaWI2-rRc6kNmybWP9_TKq9Z8yD3BRxwrjJkDNnyAV1y4tECIDrebqgcA13lrn5vcbwpmWWbNLwfdstR27N96zou7G3xYkqSgnEdcUWPj0q2DJEQIu5wdqxtyR8h0DKcIkuKuYBy_2ULCLOplyrm1gcPSZ3GH_i9md7bvJ1zrdssIMVp2dErb_GWR6msCv6vT3LJ6GChsTCoe6k-mPULVHE3IEEpO_iX0b1GbTOGhFLkz1THxNuzmS5oxYDO_Ua9CKi34ZVCz076hbEP3L9elLpZEaGWtj0BWi5xLk211GQ8qSGPB882PYTSDXDDnfuR0tzM9WgCyv8zaSypQvwAkXg0p0eND4yIpug8rKI8VdMSuNMV2dtYb330ejTJzdGy2-rgtjzSYeAqhefQ6f8NN2gGUPjtPTMTXj1fGhlSNqWAEIcR1Cb76eUHxhuDAUIHw0vp2htyZTpBhwD8FVQJQmfjVnYBk5ES62jSgU-YB7PPlzB39qt0Nc14Hzbw87V8NZwrS9CYg6n_SG6i5jG5qvYiSdyafTbur8fPZznq9VcIh6JuXsCQ6wldwLkoTFV1c4OtEMPCNuh4LujH6bdCAyHG-BzrZtk9DsH-PvfDCCVkIM_D3i6UpBDK44ASNjTzyyvVOfGh6CKVemE8bvsGg-KNdzzbmz4Aq9-y0E96kkTslf8Md8uYznt-qpOyhWlMfI6PRUI00XWWfbAUAX-ApqTgDmll8Q-tIVgWGlSaA7nmFkOJx4TTF6KVzWPUu3T6Iqi50799IU9MG5En96hLNbQbPGSU9Z8Pd7hGsvm25BFSo9zonf1_2QWFsWssBYYh7vJoaPufs-eNkg7p2lvYbpp7viDWQW4FIDMroiATSwggamnk_ffTQ_pVExqVf0vkm02Y029yuJjl9cz_FpNIdiRW5kzDTtmBEEcCtRyCLgAoMjTi9tx0UsrbRT7hr5pvjgswloyKegTh9jocYCiPHe07KTA_1Usj4ZuedhGlv46Kehi9D01ZbxNpEUQ87RvVQzP9BYpHocsX1KO65N8pRoI6MvKezu_4xmDjCfl9tRfF-BSODWIwVe--ktX5QmETpVjchEOc6qFaVn4UAKHdYX1yLL3t3C4M5HdSsr8vBW3IxWfb5FQnFLESW1RszdKJrA6P91GwZc3le-SfLzRhG6e-zW5FeBqDF3FfJ2Yu_O_bdFUbGiUkWpRw5_iRoIL7sSqLs8gbKWPWgulX9H-ZrYjmvBNntNZaKgeh9GmrQZb5s_xNKIHixF0BEtG3SQ6z5S6tiELkP4pY1WzSGyzxR7yyEOrI5fFbZ5DBPny4kID2caVC4D6ugdvdL6vsM8l6ujhTgzSVrc10f0Fl4tOp3-ulblqcmwUSbRjjSuHlxLdtnuTfqvvFgIV9uINK2y4HwJTtqDrDW7e41IjyKwDYy_6rKkT59u2_GeHMFj6su1SNvadgeX1cZ61nwZ2-w-O7sItRwpUfsFcoDrE4z3_8spoy-IB7BVCKYTLEBkN_Htuo6y6M6yoeR1C4KAHO0BbLgLQ-MtJrBcfoxC2_fji9exbhDMDyrGiKCmNqepVAetLz0eml65hU7Ja7EeuNgCB_PL_8QyLAkdz4N11v5at4SRQNwCW5FQ&uid=mid_no_ip_6d4b8d1b8bae488349859b9720186ad8&mguid=&ap=0.039608&tid=106&gprice=ILZkfgYyZxdnCXU0RMdIsCDnIWHKadtCGvby6e-GPIE&campaignid=5228450&c_sync=0&google_click_url=https://adclick.g.doubleclick.net/aclk%3Fsa%3DL%26ai%3DCUCFYFrotaoSWH6TY6tkP492H-QSltoSEe8z8yrWgE8CNtwEQASD9tJ6VAWCVAsgBCagDAcgDAqoE6gFP0Hg2i8hO2S3Qc3XIQGi2HPeOmwY8sxNW5Z01XxTu8JjWf2y7qEkmvyU8QQ7-rAlizRca-ohiuuwFmqB6_Dv-wGg_Wrd7PtqYyNHHpQpqjqhCKhbgSdgO-Qpa8LnWXSafclX3OB2g5nTXxO-BrS_NrSGM9kSLS7qj6BuuAVse7n-W5nsxfc-uRcZmaJIuzoerlU1r-XBxrIhhmFnduXUYWmExRyygfamo1DxhmeZz3MVXgDL18NVNpPTF7XrOBzlJ2c-kpgnpd0fGhRTSjL6YNH3oYPW18GC2jLo_nNJZQJWBBCkwqUNIodKABsKgo8LvmL6IxwGgBiGoB5PYsQKoB5TYsQKoB5XYsQKoB6a-G6gHltgbqAeqm7ECqAf_nrECqAffn7ECqAetvrECqAe_07EC2AcA0ggyCJHhgFAQATIIq4uAgKCAgAo6D4BAgICAgICUqIgCqIOAEEi9_cE6WN_c5-WDhZUDYAD6CwIIAYAMAaoNAkRF6g0TCLr-5-WDhZUDFSSsOgUd4-4hT4gOCdAVAYAXAbIXBBgMUAE%26num%3D1%26sig%3DAOD64_0Bt6wmwJyGpTNNT5ejT3Zy5fgcjA%26client%3Dca-pub-1677597403311019%26adurl%3D
            - img "Blood Sugar Above 100? Try This Tonight" [ref=f53e5]
            - generic [ref=f53e6]:
              - generic [ref=f53e7]:
                - generic [ref=f53e8]: Blood Sugar Above 100? Try This Tonight
                - generic [ref=f53e9]: Rivo
              - generic [ref=f53e11]: OPEN
          - link "ad" [ref=f53e12] [cursor=pointer]:
            - /url: //www.admaster.cc/privacy
            - img [ref=f53e13]
```

# Test source

```ts
  1  | import { expect, Page, Locator } from '@playwright/test';
  2  | 
  3  | import BasePage from '#e2e/Pages/BasePage';
  4  | 
  5  | class NavigationBar {
  6  |   page: Page;
  7  |   // External page objects properties declarations
  8  |   basePage: BasePage;
  9  |   // Locator properties declarations
  10 |   readonly header: Locator;
  11 |   readonly logo: Locator;
  12 |   readonly homeLink: Locator;
  13 |   readonly productsLink: Locator;
  14 |   readonly cartLink: Locator;
  15 |   readonly signUpLoginLink: Locator;
  16 |   readonly testCasesLink: Locator;
  17 |   readonly apiTestingLink: Locator;
  18 |   readonly contactUsLink: Locator;
  19 | 
  20 |   constructor(page: Page) {
  21 |     this.page = page;
  22 | 
  23 |     // External page objects initializations
  24 |     this.basePage = new BasePage(page);
  25 | 
  26 |     // Locator properties initializations & assignments
  27 |     this.header = page.locator('header');
  28 |     this.logo = page.getByRole('img', { name: 'Website for automation practice' });
  29 |     this.homeLink = page.getByRole('link', { name: 'Home' });
  30 |     this.productsLink = page.getByRole('link', { name: 'Products' });
  31 |     this.cartLink = page.getByRole('link', { name: 'Cart' });
  32 |     this.signUpLoginLink = page.getByRole('link', { name: 'Signup / Login' });
  33 |     this.testCasesLink = page.getByRole('link', { name: 'Test Cases' });
  34 |     this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
  35 |     this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  36 |   }
  37 | 
  38 |   // METHODS
  39 | 
  40 |   async clickNavBarItemByName(name: string) {
  41 |     const navBarItem = this.page.getByRole('link', { name });
  42 |     await navBarItem.click();
  43 |   }
  44 | 
  45 |   async validateLoggedInAsText(fullName: string) {
  46 |     const loggedInAsText = this.page.getByText(`Logged in as ${fullName}`);
> 47 |     await expect(loggedInAsText).toBeVisible();
     |                                  ^ Error: expect(locator).toBeVisible() failed
  48 |   }
  49 | }
  50 | 
  51 | export default NavigationBar;
  52 | 
```