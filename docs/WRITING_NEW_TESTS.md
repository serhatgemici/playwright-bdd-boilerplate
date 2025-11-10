# Writing New Tests - Developer Guide

This guide explains how to add new tests, pages, and components to the Playwright BDD boilerplate project using the **Common Fixtures Architecture**. Follow these patterns to maintain consistency and code quality.

> **🚨 CRITICAL: All page objects MUST extend BasePage (or domain-specific base classes that extend BasePage) to inherit common functionality and avoid code duplication. Never create standalone page classes without proper inheritance.**

## 🏗️ **NEW: Common Fixtures Architecture**

This project now uses a **Common Fixtures Architecture** that provides BDD-style step definitions as reusable Playwright fixtures. This replaces traditional Cucumber step definitions while maintaining the same readable, parameterized syntax.

### **Key Benefits**

- ✅ **BDD-like Syntax**: `givenUserIsOnPage(pageSlug)` reads like Cucumber steps
- ✅ **Better Performance**: Plain Playwright fixtures (no Cucumber overhead)
- ✅ **Type Safety**: Full TypeScript support with autocompletion
- ✅ **Reusability**: Common steps shared across all test domains
- ✅ **Extensibility**: Easy to create domain-specific fixture extensions

## 📁 Project Structure Overview

```
e2e/
├── Data/
│   └── aria/                                      # ARIA snapshot files for validation
├── Features/
│   └── ProductPurchaseJourneyTests.spec.ts        # 🆕 .spec.ts test files
├── Fixtures/                                      # 🆕 BDD-style fixture configuration
│   ├── CommonFixtures.ts                          # 🆕 Base layer - fixture configuration & DI
│   └── ProductPurchaseJourneyFixtures.ts          # 🆕 Extension layer - domain fixture configuration
├── PagesAndComponents/                            # Clean inheritance hierarchy
│   ├── Common/
│   │   ├── BasePage.ts                            # Core page functionality (ALL pages extend this)
│   │   └── CommonConstants.ts                     # Shared constants
│   ├── BuyPage/
│   │   ├── BaseBuyPage.ts                         # Abstract base with method contracts
│   │   ├── IdeaBuyPage.ts                         # IntelliJ IDEA implementation
│   │   ├── RustRoverBuyPage.ts                    # RustRover implementation
│   │   ├── CLionBuyPage.ts                        # CLion implementation
│   │   ├── BuyPageFactory.ts                      # Factory and convenience methods
│   │   ├── BuyPageConstants.ts                    # UI text, product codes, ARIA snapshots
│   │   └── BuyPageLocatorFactory.ts               # Centralized locator management
│   └── CookieConsentDialog/
│       ├── CookieConsentDialog.ts                 # Cookie dialog handling
│       ├── CookieConsentDialogConstants.ts        # UI text, product codes, ARIA snapshots
│       └── CookieConsentDialogLocatorFactory.ts   # Centralized locator management
└── StepDefinitions/                               # 🆕 CLEAN ARCHITECTURE: Pure step definition functions
    ├── CommonStepDefinitions.ts                   # 🆕 Common step functions (imported by CommonFixtures)
    └── ProductPurchaseJourneyStepDefinitions.ts   # 🆕 Domain step functions (imported by domain fixtures)
```

## �️ **MANDATORY INHERITANCE PATTERN**

### **⚠️ Critical Rule: Every Page Must Extend BasePage**

All page objects in this project MUST follow a proper inheritance hierarchy to avoid code duplication and ensure consistency:

```typescript
// ✅ CORRECT - Extends BasePage directly
export class SimpleComponentPage extends BasePage {
  constructor(page: Page) {
    super(page); // Inherits all common functionality
  }

  async validateComponent(): Promise<void> {
    // Use inherited methods from BasePage
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    await this.validateAriaSnapshot(element, 'snapshot.aria.yml');
  }
}

// ✅ CORRECT - Extends domain-specific base (which extends BasePage)
export class IdeaBuyPage extends BaseBuyPage {
  // BaseBuyPage extends BasePage
  constructor(page: Page) {
    super(page); // Inherits BasePage + BaseBuyPage functionality
  }

  async validateSpecificFeature(): Promise<void> {
    // Use inherited methods from BasePage
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    // Use inherited methods from BaseBuyPage
    await this.validateProductCardBuyLink(card, itemCode);
  }
}

// ❌ WRONG - Standalone class without inheritance
export class BadPage {
  constructor(private page: Page) {}

  async validateComponent(): Promise<void> {
    // This duplicates functionality already in BasePage!
    await expect(element).toBeVisible(); // ❌ Code duplication
  }
}

// ❌ WRONG - Creating unnecessary instance instead of inheritance
export class AlsoBadPage extends BasePage {
  private basePage: BasePage; // ❌ Don't do this!

  constructor(page: Page) {
    super(page);
    this.basePage = new BasePage(page); // ❌ Redundant instance
  }

  async validateComponent(): Promise<void> {
    await this.basePage.validateElementDisplayed(element, status); // ❌ Use 'this' instead
  }
}
```

### **✅ Clean Architecture Benefits**

Following proper inheritance provides:

- **Zero Code Duplication**: Common methods inherited, not duplicated
- **Consistent API**: All pages use the same validation methods
- **Easier Maintenance**: Fix a bug once in BasePage, all pages benefit
- **Type Safety**: Proper TypeScript inheritance and polymorphism
- **Clear Hierarchy**: BasePage → Domain Base → Specific Implementation

## �🆕 Adding a New Page Domain

When adding a completely new page or feature area, follow this structure:

### 1. Create Domain Folder

Create a new folder under `e2e/PagesAndComponents/` for your domain:

```
e2e/PagesAndComponents/
└── YourNewPage/                    # Example: ProductPage, CheckoutPage
    ├── BaseYourNewPage.ts          # Abstract base class (if multiple variants)
    ├── YourNewPageConstants.ts     # Domain-specific constants
    ├── YourNewPageFactory.ts       # Factory for creating instances
    ├── YourNewPageLocatorFactory.ts # Centralized locator management
    └── SpecificYourNewPage.ts      # Specific implementations
```

### 2. Constants File Structure

Create `YourNewPageConstants.ts` with this pattern:

```typescript
// UI Text constants for button/link text matching
export const UI_TEXT = {
  BUTTON_NAME: 'Button Text',
  LINK_NAME: 'Link Text',
  HEADING: 'Page Heading',
} as const;

// Product/feature codes
export const FEATURE_CODES = {
  FEATURE_A: 'FEATURE_A',
  FEATURE_B: 'FEATURE_B',
} as const;

// Aria snapshot filenames
export const ARIA_SNAPSHOTS = {
  MAIN_COMPONENT: 'your-page-main-component.aria.yml',
  SUB_COMPONENT: 'your-page-sub-component.aria.yml',
} as const;

// Domain-specific types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
```

### 3. Locator Factory Pattern

Create `YourNewPageLocatorFactory.ts`:

```typescript
import { Page, Locator } from '@playwright/test';
import * as yourNewPageConstants from './YourNewPageConstants';

// Centralized CSS selectors
export const SELECTORS = {
  MAIN_CONTAINER: '[data-testid="main-container"]',
  BUTTON_PRIMARY: '[data-testid="primary-button"]',
  COMPONENT_LIST: '[data-testid="component-list"]',
} as const;

// Main locator factory class
export class Locators {
  constructor(private page: Page) {}

  // Common locators used across variants
  createMainContainer(): Locator {
    return this.page.locator(SELECTORS.MAIN_CONTAINER);
  }

  createPrimaryButton(): Locator {
    return this.page.locator(SELECTORS.BUTTON_PRIMARY);
  }

  // Product/variant-specific locator creation
  createVariantALocators() {
    return {
      container: this.createMainContainer(),
      specificElement: this.page.locator('[data-testid="variant-a-element"]'),
    };
  }

  createVariantBLocators() {
    return {
      container: this.createMainContainer(),
      specificElement: this.page.locator('[data-testid="variant-b-element"]'),
    };
  }

  // Utility methods for dynamic locators
  createDynamicElement(identifier: string): Locator {
    return this.page.locator(`[data-testid="${identifier}"]`);
  }
}
```

### 4. Base Page Pattern

Create `BaseYourNewPage.ts` (if you have multiple variants):

```typescript
import { expect, Page, Locator } from '@playwright/test';
import BasePage from '../Common/BasePage'; // ✅ ALWAYS extend BasePage
import * as yourNewPageConstants from './YourNewPageConstants';

/**
 * ✅ CORRECT: Extends BasePage to inherit common functionality
 * All domain-specific base classes must extend BasePage
 */
export abstract class BaseYourNewPage extends BasePage {
  constructor(page: Page) {
    super(page); // ✅ Inherits all BasePage functionality
  }

  // Domain-specific helper methods for this page type
  protected async validatePrimaryAction(element: Locator): Promise<void> {
    // ✅ Use inherited methods from BasePage
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    await expect(element).toBeEnabled();
  }

  protected async validateDomainSpecificElement(element: Locator): Promise<void> {
    // ✅ Mix domain logic with inherited BasePage methods
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    await this.validateAriaSnapshot(element, yourNewPageConstants.ARIA_SNAPSHOTS.MAIN_COMPONENT);
  }

  // Abstract methods that specific implementations must provide
  abstract validateMainComponent(): Promise<void>;
  abstract performPrimaryAction(): Promise<void>;
  abstract validateDefaultState(): Promise<void>;
}
```

### 5. Specific Implementation

Create specific page implementations like `VariantAYourNewPage.ts`:

```typescript
import { Page, Locator } from '@playwright/test';
import { BaseYourNewPage } from './BaseYourNewPage'; // ✅ Extend domain base
import * as yourNewPageConstants from './YourNewPageConstants';
import * as commonConstants from '../Common/CommonConstants';
import * as yourNewPageLocatorFactory from './YourNewPageLocatorFactory';

/**
 * ✅ CORRECT: Clean inheritance chain
 * VariantAYourNewPage → BaseYourNewPage → BasePage
 */
export class VariantAYourNewPage extends BaseYourNewPage {
  private readonly mainContainer: Locator;
  private readonly primaryButton: Locator;
  private locatorFactory: yourNewPageLocatorFactory.Locators;

  constructor(page: Page) {
    super(page); // ✅ Inherits full chain: BasePage + BaseYourNewPage

    // Initialize locator factory
    this.locatorFactory = new yourNewPageLocatorFactory.Locators(page);
    const variantLocators = this.locatorFactory.createVariantALocators();

    // Assign locators from factory
    this.mainContainer = variantLocators.container;
    this.primaryButton = this.locatorFactory.createPrimaryButton();
  }

  // Implementation of abstract methods from BaseYourNewPage
  async validateMainComponent(): Promise<void> {
    // ✅ Use inherited method from BasePage via inheritance chain
    await this.validateElementDisplayed(this.mainContainer, commonConstants.DISPLAYED);
  }

  async performPrimaryAction(): Promise<void> {
    await this.primaryButton.click();
  }

  async validateDefaultState(): Promise<void> {
    await this.validateMainComponent();
    // ✅ Use inherited method from BasePage
    await this.validateElementDisplayed(this.primaryButton, commonConstants.DISPLAYED);

    // ✅ Use inherited method from BaseYourNewPage
    await this.validatePrimaryAction(this.primaryButton);
  }

  // Private methods specific to this variant
  private async validateVariantSpecificFeature(): Promise<void> {
    // ✅ Mix inherited methods with variant-specific logic
    await this.validateElementDisplayed(this.mainContainer, commonConstants.DISPLAYED);
    await this.validateAriaSnapshot(
      this.mainContainer,
      yourNewPageConstants.ARIA_SNAPSHOTS.VARIANT_A_SPECIFIC
    );
  }
}
```

### 6. Factory Pattern

Create `YourNewPageFactory.ts`:

```typescript
import { Page } from '@playwright/test';
import { BaseYourNewPage } from './BaseYourNewPage';
import { VariantAYourNewPage } from './VariantAYourNewPage';
import { VariantBYourNewPage } from './VariantBYourNewPage';
import * as commonConstants from '../Common/CommonConstants';

export class YourNewPageFactory {
  constructor(private page: Page) {}

  createPage(variant: string): BaseYourNewPage {
    switch (variant) {
      case commonConstants.VARIANT_NAMES.VARIANT_A:
        return new VariantAYourNewPage(this.page);
      case commonConstants.VARIANT_NAMES.VARIANT_B:
        return new VariantBYourNewPage(this.page);
      default:
        throw new Error(`Unsupported variant: ${variant}`);
    }
  }

  getSupportedVariants(): string[] {
    return Object.values(commonConstants.VARIANT_NAMES);
  }
}
```

## 🆕 **Common Fixtures Architecture**

### **Understanding the Two-Layer System**

The project uses a **two-layer fixture system** for maximum reusability:

#### **Layer 1: CommonFixtures.ts (Base Layer)**

Contains step definitions that are used across ALL test domains:

```typescript
// Available common step definitions
givenUserIsOnPage(pageSlug: string)                    // Navigation
thenCookieConsentDialogIs(dialogState: string)         // Cookie consent validation
whenUserAcceptsCookies()                               // Cookie acceptance
thenThereAreNoErrorsInConsole()                        // Console error checking
andHeadingDisplays(expectedTitle: string)              // Page heading validation
```

#### **Layer 2: Domain-Specific Fixtures (Extension Layer)**

Extends CommonFixtures and adds domain-specific step definitions:

```typescript
// Example: ProductPurchaseJourneyFixtures.ts extends CommonFixtures
export type ProductPurchaseJourneyFixtures = CommonFixtures & {
  // Domain-specific fixtures
  buyPageFactory: BuyPageFactory;
  thenTierSwitcherIsValidated: (productName: string) => Promise<void>;
  thenBillingTermSwitcherIsValidated: (productName: string) => Promise<void>;
  // ... inherits ALL CommonFixtures automatically
};
```

### **Creating New Domain-Specific Fixtures**

When adding a new test domain (e.g., Account Management, Settings), follow this clean architecture pattern:

#### **1. Create Step Definition Functions (`YourNewDomainStepDefinitions.ts`)**

```typescript
// StepDefinitions/YourNewDomainStepDefinitions.ts
import { test } from '@playwright/test';
import { YourNewPageFactory } from '#e2e/PagesAndComponents/YourNewPage/YourNewPageFactory';

/**
 * Pure step definition functions for your domain
 * These contain the business logic for domain-specific test steps
 */

export async function thenYourDomainValidationPasses(
  pageFactory: YourNewPageFactory,
  validationType: string
): Promise<void> {
  await test.step(`**THEN** ${validationType} validation passes in your domain`, async () => {
    const page = pageFactory.createPage(validationType);
    await page.validateSpecificBehavior(validationType);
  });
}
```

#### **2. Create Fixture Configuration (`YourNewDomainFixtures.ts`)**

```typescript
// Fixtures/YourNewDomainFixtures.ts
import { test as baseTest, type CommonFixtures } from './CommonFixtures';
import { YourNewPageFactory } from '#e2e/PagesAndComponents/YourNewPage/YourNewPageFactory';
import { thenYourDomainValidationPasses } from '../StepDefinitions/YourNewDomainStepDefinitions';

/**
 * Your New Domain Fixtures - Extension Layer
 *
 * This fixture provides:
 * - Domain-specific page objects
 * - Domain-specific BDD-style step definition fixtures
 * - Automatic inheritance of ALL CommonFixtures step definitions
 *
 * Step definitions are imported from YourNewDomainStepDefinitions.ts to keep
 * this file focused on fixture configuration and dependency injection.
 */

// Extend CommonFixtures with your domain-specific fixtures
export type YourNewDomainFixtures = CommonFixtures & {
  // Domain-specific page objects
  yourNewPageFactory: YourNewPageFactory;

  // Domain-specific step definition fixtures
  thenYourDomainValidationPasses: (validationType: string) => Promise<void>;
  // ALL CommonFixtures inherited automatically ✅
};

export const test = baseTest.extend<YourNewDomainFixtures>({
  // DOMAIN-SPECIFIC PAGE FIXTURES
  yourNewPageFactory: async ({ page }, use) => {
    const yourNewPageFactory = new YourNewPageFactory(page);
    await use(yourNewPageFactory);
  },

  // DOMAIN-SPECIFIC STEP DEFINITION FIXTURES
  thenYourDomainValidationPasses: async ({ yourNewPageFactory }, use) => {
    await use(async (validationType: string) => {
      await thenYourDomainValidationPasses(yourNewPageFactory, validationType);
    });
  },
});

export const expect = baseTest.expect;
```

#### **3. Write Tests Using Your Domain Fixtures**

```typescript
import { test } from '../Fixtures/YourNewDomainFixtures';

test.describe('Your New Domain Tests', () => {
  test('should validate complete flow', async ({
    // ✅ Common step definitions (inherited automatically)
    givenUserIsOnPage,
    andCookieConsentDialogIs,
    whenUserAcceptsCookies,
    andHeadingDisplays,
    thenThereAreNoErrorsInConsole,

    // ✅ Domain-specific step definitions
    thenYourDomainValidationPasses,
  }) => {
    // Use common steps for setup
    await givenUserIsOnPage('your/page');
    await andCookieConsentDialogIs('displayed');
    await whenUserAcceptsCookies();
    await andHeadingDisplays('Your Page Title');

    // Use domain-specific steps for validation
    await thenYourDomainValidationPasses('specificValidation');

    // Use common cleanup
    await thenThereAreNoErrorsInConsole();
  });
});
```

### **Benefits of This Clean Architecture**

#### **🎯 Separation of Concerns**

- **Step Definition Files**: Pure functions containing business logic
- **Fixture Files**: Configuration and dependency injection setup
- **Page Object Files**: UI interaction and locator management

#### **🔄 Reusability & Maintainability**

- **Step definitions** can be unit tested independently
- **Fixtures** can be easily modified without affecting business logic
- **Page objects** remain focused on UI interactions

#### **📈 Scalability**

- Adding new domains requires minimal code changes
- Common functionality is shared automatically
- Type safety prevents runtime errors during development

### **Available Fixtures by Layer**

#### **CommonFixtures (Base Layer) - Available to ALL domains:**

| **Fixture Method**                | **BDD Step Equivalent**                         | **Usage**          |
| --------------------------------- | ----------------------------------------------- | ------------------ |
| `givenUserIsOnPage(pageSlug)`     | `Given('user is on the {string} page', ...)`    | Navigation         |
| `andCookieConsentDialogIs(state)` | `And('cookie consent dialog is {string}', ...)` | Cookie validation  |
| `whenUserAcceptsCookies()`        | `When('user accepts all cookies', ...)`         | Cookie acceptance  |
| `thenThereAreNoErrorsInConsole()` | `Then('there are no errors in console', ...)`   | Console checking   |
| `andHeadingDisplays(title)`       | Custom common validation                        | Heading validation |

#### **ProductPurchaseJourneyFixtures (Extension Layer) - Inherits ALL common + adds:**

| **Fixture Method**                            | **Usage**                   |
| --------------------------------------------- | --------------------------- |
| `thenTierSwitcherIsValidated(product)`        | Buy page tier validation    |
| `thenBillingTermSwitcherIsValidated(product)` | Buy page billing validation |
| `thenProductCardsAreValidated(product)`       | Buy page cards validation   |

## 🆚 **Migration Guide: Traditional vs Common Fixtures**

### **Traditional Approach (Before) ❌**

```typescript
// OLD: Traditional Cucumber-style step definitions with separate files
// StepDefinitions/Common/CommonStepDefinitions.ts
Given('user is on the {string} page', async ({ basePage }, pageSlug: string) => {
  await basePage.navigateTo(pageSlug);
});

When('user accepts all cookies', async ({ cookieConsentDialog }) => {
  await cookieConsentDialog.clickAcceptAll();
});

// Usage in tests required importing step definitions separately
test('traditional test', () => {
  Given('user is on the "buy/idea" page');
  When('user accepts all cookies');
  Then('there are no errors in console');
});
```

### **New: Common Fixtures Architecture (Recommended) ✅**

```typescript
// NEW: BDD-style step definitions as Playwright fixtures
import { test } from '../Fixtures/CommonFixtures';

test('should demonstrate new fixture approach', async ({
  givenUserIsOnPage,
  whenUserAcceptsCookies,
  thenThereAreNoErrorsInConsole,
}) => {
  // Same readable BDD-style syntax, better performance & type safety
  await givenUserIsOnPage('buy/idea');
  await whenUserAcceptsCookies();
  await thenThereAreNoErrorsInConsole();
});
```

**Why Switch?**

- 🚀 **Better Performance**: No Cucumber parsing overhead
- 🎯 **Full TypeScript**: Autocompletion, type checking, refactoring support
- 🔄 **Better Reusability**: Import fixtures across different test domains
- 📦 **Simpler Setup**: Pure Playwright, no additional BDD plugins needed
- 🛠️ **Easier Debugging**: Standard Playwright debugging tools work seamlessly

## 📊 Test Data Management

### Aria Snapshots

Store aria snapshots in `e2e/Data/aria/`:

```
e2e/Data/aria/
├── your-page-main-component.aria.yml
├── your-page-sub-component.aria.yml
└── your-page-variant-specific.aria.yml
```

Reference them in constants:

```typescript
export const ARIA_SNAPSHOTS = {
  MAIN_COMPONENT: 'your-page-main-component.aria.yml',
} as const;
```

## 🔄 Using Common Components

### ✅ Proper BasePage Inheritance

**CRITICAL**: All page objects must extend `BasePage` to inherit common functionality and avoid code duplication:

```typescript
import BasePage from '../Common/BasePage';

// ✅ CORRECT: Direct inheritance for simple pages
export class YourSimplePage extends BasePage {
  constructor(page: Page) {
    super(page); // ✅ Inherits all BasePage methods
  }

  async yourMethod(): Promise<void> {
    // ✅ Use inherited methods directly via 'this'
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    await this.validateAriaSnapshot(element, 'snapshot.aria.yml');
    await this.validateHeading('Page Title');
  }
}

// ✅ CORRECT: Chain inheritance for complex domains
export class YourComplexPage extends YourDomainBasePage {
  // YourDomainBasePage extends BasePage
  constructor(page: Page) {
    super(page); // ✅ Inherits BasePage + domain-specific methods
  }

  async complexValidation(): Promise<void> {
    // ✅ Use BasePage methods inherited through the chain
    await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
    // ✅ Use domain-specific methods from YourDomainBasePage
    await this.validateDomainSpecificFeature(element);
  }
}

// ❌ WRONG: Creating unnecessary instances
export class BadPage extends BasePage {
  private basePage: BasePage; // ❌ Don't create instances of classes you extend!

  constructor(page: Page) {
    super(page);
    this.basePage = new BasePage(page); // ❌ This is redundant and wrong
  }

  async badMethod(): Promise<void> {
    // ❌ WRONG: Using instance instead of inheritance
    await this.basePage.validateElementDisplayed(element, status);

    // ✅ CORRECT: Use inherited method directly
    await this.validateElementDisplayed(element, status);
  }
}
```

### Available Inherited Methods from BasePage

When you extend `BasePage`, you automatically get these methods:

```typescript
// Element validation methods
await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
await this.validateElementDisplayed(element, commonConstants.NOT_DISPLAYED);

// Aria snapshot validation
await this.validateAriaSnapshot(element, 'filename.aria.yml');

// Text and heading validation
await this.validateHeading('Expected Heading Text');

// Navigation and page actions
await this.navigateTo(url);
// ... and many more common methods
```

### Using Common Constants

Import and use cross-application constants instead of hardcoded values:

```typescript
import * as commonConstants from '../Common/CommonConstants';

// ✅ Use predefined constants
await this.validateElementDisplayed(element, commonConstants.DISPLAYED);
await this.validateElementDisplayed(element, commonConstants.NOT_DISPLAYED);

// ✅ Use product names from constants
if (productName === commonConstants.PRODUCT_NAMES.IDEA) {
  // Handle IDEA-specific logic
}
```

## ✅ **Best Practices Checklist**

When creating new tests with the Common Fixtures architecture, ensure you:

### **📋 Page Object Requirements**

- [ ] **🚨 CRITICAL: Extend BasePage** - Every page object MUST extend BasePage or a domain base that extends BasePage
- [ ] **❌ Never create BasePage instances** - Use inheritance, not composition with separate BasePage instances
- [ ] **Create dedicated folder** for each new page domain
- [ ] **Define constants** for all hardcoded strings, selectors, and values
- [ ] **Use locator factory** to centralize and reuse locators
- [ ] **Implement abstract methods** if extending base classes
- [ ] **Call inherited methods via 'this'** - Never create separate instances of parent classes

### **🏗️ Fixtures Architecture Requirements**

- [ ] **Create domain-specific fixture files** that extend CommonFixtures
- [ ] **Import from CommonFixtures** - Always extend the base layer, never duplicate common steps
- [ ] **Use descriptive BDD-style method names** - `givenUserIsOnPage()`, `whenUserAcceptsCookies()`, `thenFeatureIsValidated()`
- [ ] **Wrap steps in test.step()** for better reporting and debugging
- [ ] **Type your fixture interfaces** - Extend `CommonFixtures` type for full type safety
- [ ] **Export consistent API** - Always export `test` and `expect` from your fixture files

### **📝 Test Writing Requirements**

- [ ] **Import from domain-specific fixtures** - Use the highest-level fixture that has what you need
- [ ] **Destructure fixtures in test parameters** - Get all needed step definitions in the test signature
- [ ] **Mix common + domain-specific steps** - Use common steps for setup, domain steps for validation
- [ ] **Store aria snapshots** in the `Data/aria/` folder
- [ ] **Use common constants** instead of hardcoded values
- [ ] **Follow naming conventions** (PascalCase for classes, camelCase for methods)

### **🔧 Architecture Compliance**

- [ ] **Never duplicate common step logic** - Reuse CommonFixtures, don't recreate basic steps
- [ ] **Keep domain separation clean** - Domain-specific logic in domain fixtures, common logic in CommonFixtures
- [ ] **Maintain backward compatibility** - When modifying CommonFixtures, ensure all extensions still work
- [ ] **Document new step definitions** - Add clear JSDoc comments explaining step purpose and parameters

## 🎯 **Quick Start Templates**

### **Template 1: New Domain Fixture File**

```bash
# 1. Create your new domain fixture file
touch e2e/Fixtures/YourNewDomainFixtures.ts
```

```typescript
// YourNewDomainFixtures.ts
import { test as baseTest, type CommonFixtures } from './CommonFixtures';
import { YourNewPageFactory } from '#e2e/PagesAndComponents/YourNewPage/YourNewPageFactory';

// Domain-specific step definitions
async function thenYourFeatureIsValidated(factory: YourNewPageFactory, variant: string) {
  await baseTest.step(`**THEN** your feature is validated on "${variant}" page`, async () => {
    const page = factory.createPage(variant);
    await page.validateYourFeature();
  });
}

// Extend CommonFixtures
export type YourNewDomainFixtures = CommonFixtures & {
  yourNewPageFactory: YourNewPageFactory;
  thenYourFeatureIsValidated: (variant: string) => Promise<void>;
};

export const test = baseTest.extend<YourNewDomainFixtures>({
  yourNewPageFactory: async ({ page }, use) => {
    await use(new YourNewPageFactory(page));
  },
  thenYourFeatureIsValidated: async ({ yourNewPageFactory }, use) => {
    await use(async (variant: string) => {
      await thenYourFeatureIsValidated(yourNewPageFactory, variant);
    });
  },
});

export const expect = baseTest.expect;
```

### **Template 2: New Test File**

```bash
# 1. Create your new test file in Features/
touch e2e/Features/YourNewDomainTests.spec.ts
```

```typescript
// YourNewDomainTests.spec.ts
import { test } from '../Fixtures/YourNewDomainFixtures';

test.describe('Your New Domain Tests', () => {
  test('should validate complete flow', async ({
    // Common steps (inherited automatically)
    givenUserIsOnPage,
    thenCookieConsentDialogIs,
    whenUserAcceptsCookies,
    andHeadingDisplays,
    thenThereAreNoErrorsInConsole,

    // Domain-specific steps
    thenYourFeatureIsValidated,
  }) => {
    await givenUserIsOnPage('your/page');
    await thenCookieConsentDialogIs('displayed');
    await whenUserAcceptsCookies();
    await andHeadingDisplays('Your Page Title');
    await thenYourFeatureIsValidated('variantA');
    await thenThereAreNoErrorsInConsole();
  });
});
```

### **Template 3: Page Object Structure**

```bash
# 1. Create page object folder structure
mkdir e2e/PagesAndComponents/YourNewPage

# 2. Create required files
touch e2e/PagesAndComponents/YourNewPage/YourNewPageConstants.ts
touch e2e/PagesAndComponents/YourNewPage/YourNewPageLocatorFactory.ts
touch e2e/PagesAndComponents/YourNewPage/BaseYourNewPage.ts
touch e2e/PagesAndComponents/YourNewPage/YourNewPageFactory.ts
touch e2e/PagesAndComponents/YourNewPage/SpecificYourNewPage.ts
```

Then follow the page object patterns shown in the inheritance section above!

## 🎓 **Learning Path & Examples**

### **Study These Files (In Order)**

1. **`CommonStepDefinitions.ts`** - Pure step definition functions (business logic)
2. **`CommonFixtures.ts`** - Understanding the base layer fixture configuration
3. **`ProductPurchaseJourneyStepDefinitions.ts`** - Domain-specific step definition functions
4. **`ProductPurchaseJourneyFixtures.ts`** - How to extend CommonFixtures with domain steps
5. **`ProductPurchaseJourneyTests.spec.ts`** - Real-world fixture usage patterns
6. **`BuyPage/` folder** - Page object implementation patterns
7. **`BasePage.ts`** - Common methods available through inheritance

### **Example: From BDD Step to Fixture**

**Old Traditional Approach:**

```typescript
// Separate step definitions scattered across multiple files
// Required manual imports and setup for each test
Given('user is on the {string} page', async ({ basePage }, pageSlug) => {
  await basePage.navigateTo(pageSlug);
});
When('cookie consent dialog is {string}', async ({ dialog }, state) => {
  await dialog.validateState(state);
});
```

**New Fixture Approach:**

```typescript
// .spec.ts file
test('buy page validation', async ({
  givenUserIsOnPage, // From CommonFixtures
  andCookieConsentDialogIs, // From CommonFixtures
  whenUserAcceptsCookies, // From CommonFixtures
  thenTierSwitcherIsValidated, // From ProductPurchaseJourneyFixtures
}) => {
  await givenUserIsOnPage('buy/idea');
  await andCookieConsentDialogIs('displayed');
  await whenUserAcceptsCookies();
  await thenTierSwitcherIsValidated('idea');
});
```

**Benefits Gained:**

- ✅ Same readable BDD syntax
- ✅ Full TypeScript autocompletion
- ✅ Better performance (no Cucumber overhead)
- ✅ Easier debugging with Playwright tools
- ✅ Parameterized reusable functions

## 🤝 **Getting Help**

### **Reference Materials**

- **CommonStepDefinitions.ts** - Available common step definition functions
- **CommonFixtures.ts** - Base layer fixture configuration
- **ProductPurchaseJourneyStepDefinitions.ts** - Domain step definition functions
- **ProductPurchaseJourneyFixtures.ts** - Example of extending common fixtures
- **BuyPage/ folder** - Page object implementation patterns
- **BasePage.ts** - Inherited methods available to all pages
- **CommonConstants.ts** - Available shared values and constants

### **Common Questions**

**Q: Should I use CommonFixtures or create domain-specific fixtures?**

- Use **CommonFixtures** for simple tests that only need basic navigation/validation
- Use **Domain Fixtures** (like ProductPurchaseJourneyFixtures) for tests that need domain-specific validations

**Q: How do I add a new common step that all domains should use?**

- Add the step function to **CommonStepDefinitions.ts**
- Add the fixture configuration to **CommonFixtures.ts**
- All domain fixtures inherit it automatically

**Q: How do I add a domain-specific step?**

- Add the step function to **YourDomainStepDefinitions.ts**
- Add the fixture configuration to **YourDomainFixtures.ts**
- Import and use in your domain tests

**Q: Can I mix fixture approaches?**

- ✅ Yes! You can import and use both CommonFixtures and domain-specific fixtures as needed

**Q: What if I have existing traditional step definitions?**

- Use **Common Fixtures for new tests** (better performance, type safety, clean architecture)
- Existing traditional step definitions still work (backward compatibility)
- Gradually migrate traditional steps to Common Fixtures as you enhance tests

### **Migration Support**

- Traditional step definitions still work (in StepDefinitions/Common/ folder)
- **Common Fixtures architecture is preferred** for better performance, type safety, and clean separation
- You can gradually migrate existing tests to Common Fixtures approach
- Clean architecture benefits: Step definitions (pure functions) separate from fixtures (configuration)

Happy testing with the new Common Fixtures Architecture! 🚀
