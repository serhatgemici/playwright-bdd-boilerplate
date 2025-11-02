# Writing New Tests - Developer Guide

This guide explains how to add new tests, pages, and components to the Playwright BDD boilerplate project. Follow these patterns to maintain consistency and code quality.

> **🚨 CRITICAL: All page objects MUST extend BasePage (or domain-specific base classes that extend BasePage) to inherit common functionality and avoid code duplication. Never create standalone page classes without proper inheritance.**

## 📁 Project Structure Overview

```
e2e/
├── Data/                           # Test data and aria snapshots
│   └── aria/                       # Aria snapshot files (.aria.yml)
├── Features/                       # Gherkin feature files (.feature)
├── Fixtures/                       # Playwright fixtures for dependency injection
│   └── FixturesBDD.ts              # Main fixture definitions
├── PagesAndComponents/             # Page Object Model implementation
│   ├── Common/                     # Shared components and utilities
│   │   ├── BasePage.ts             # Base class for all pages
│   │   └── CommonConstants.ts      # Cross-application constants
│   ├── BuyPage/                    # Buy page domain folder
│   │   ├── BaseBuyPage.ts          # Abstract base for buy pages
│   │   ├── BuyPageConstants.ts     # Domain-specific constants
│   │   ├── BuyPageFactory.ts       # Factory for creating buy page instances
│   │   ├── BuyPageLocatorFactory.ts # Centralized locator management
│   │   ├── IdeaBuyPage.ts          # Product-specific implementation
│   │   ├── RustRoverBuyPage.ts     # Product-specific implementation
│   │   └── CLionBuyPage.ts         # Product-specific implementation
│   └── CookieConsentDialog/        # Cookie consent component folder
│       └── CookieConsentDialog.ts  # Component implementation
└── StepDefinitions/                # Step definition files
    ├── Common/                     # Shared step definitions
    │   └── CommonStepDefinitions.ts
    └── @BuyPageOperations.ts       # Domain-specific steps
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

## 🔧 Adding New Fixtures

When you create new page objects, add them to the fixtures for dependency injection:

### Update `FixturesBDD.ts`

```typescript
import { test as base, createBdd } from 'playwright-bdd';
import BasePage from '#e2e/PagesAndComponents/Common/BasePage';
import { YourNewPageFactory } from '#e2e/PagesAndComponents/YourNewPage/YourNewPageFactory';

type Fixtures = {
  basePage: BasePage;
  yourNewPageFactory: YourNewPageFactory; // Add your new fixture
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  yourNewPageFactory: async ({ page }, use) => {
    const yourNewPageFactory = new YourNewPageFactory(page);
    await use(yourNewPageFactory);
  },
});
```

## 📝 Writing Step Definitions

Create step definitions in `StepDefinitions/YourNewPageOperations.ts`:

```typescript
import { Given, When, Then } from '#e2e/Fixtures/FixturesBDD.ts';

// Use factory pattern for variant-specific operations
Then(
  'main component is validated on {string} page variant',
  async ({ yourNewPageFactory }, variant: string) => {
    const page = yourNewPageFactory.createPage(variant);
    await page.validateMainComponent();
  }
);

// Direct fixture usage for simple operations
When('user performs primary action', async ({ yourNewPageFactory }, variant: string) => {
  const page = yourNewPageFactory.createPage(variant);
  await page.performPrimaryAction();
});
```

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

## ✅ Best Practices Checklist

When creating new tests, ensure you:

- [ ] **🚨 CRITICAL: Extend BasePage** - Every page object MUST extend BasePage or a domain base that extends BasePage
- [ ] **❌ Never create BasePage instances** - Use inheritance, not composition with separate BasePage instances
- [ ] **Create dedicated folder** for each new page domain
- [ ] **Define constants** for all hardcoded strings, selectors, and values
- [ ] **Use locator factory** to centralize and reuse locators
- [ ] **Implement abstract methods** if extending base classes
- [ ] **Add fixtures** for new page objects in `FixturesBDD.ts`
- [ ] **Write step definitions** that use the factory pattern
- [ ] **Store aria snapshots** in the `Data/aria/` folder
- [ ] **Use common constants** instead of hardcoded values
- [ ] **Follow naming conventions** (PascalCase for classes, camelCase for methods)
- [ ] **Call inherited methods via 'this'** - Never create separate instances of parent classes

## 🎯 Quick Start Template

Use this template for rapid page creation:

```bash
# 1. Create folder structure
mkdir e2e/PagesAndComponents/YourNewPage

# 2. Create required files
touch e2e/PagesAndComponents/YourNewPage/YourNewPageConstants.ts
touch e2e/PagesAndComponents/YourNewPage/YourNewPageLocatorFactory.ts
touch e2e/PagesAndComponents/YourNewPage/BaseYourNewPage.ts
touch e2e/PagesAndComponents/YourNewPage/YourNewPageFactory.ts
touch e2e/PagesAndComponents/YourNewPage/SpecificYourNewPage.ts

# 3. Create step definitions
touch e2e/StepDefinitions/YourNewPageOperations.ts

# 4. Create feature file
touch e2e/Features/YourNewPageFeature.feature
```

Then follow the patterns shown above to implement each file!

## 🤝 Getting Help

- Check existing implementations in `BuyPage/` folder for reference
- Review `CommonConstants.ts` for available shared values
- Look at `BasePage.ts` for inherited methods
- Examine existing step definitions for pattern examples

Happy testing! 🚀
