# E-commerce Test Automation Framework

> An innovative test automation framework combining **BDD readability** with **Playwright performance** through revolutionary Common Fixtures Architecture. Features inheritance-based page objects, centralized locator management, and BDD-style step definitions without Cucumber overhead.

## ⚠️ Important Disclaimer

**This is an educational and demonstration framework** showcasing advanced test automation architectural patterns. The framework is designed to be **generic and adaptable** to any e-commerce website, though the current examples demonstrate testing patterns using a specific site for illustration purposes only.

- 🎯 **Purpose**: Demonstrate innovative Common Fixtures Architecture and clean testing patterns
- 🔧 **Focus**: Technical architecture and reusable testing frameworks, not site-specific functionality
- 📚 **Educational**: Showcases best practices in test automation design and implementation
- ⚖️ **Legal**: This is independent work not affiliated with or endorsed by any specific company
- 🌐 **Generic**: Framework designed to work with any e-commerce site through configuration

**Trademark Notice**: All product names, logos, and brands mentioned are property of their respective owners. Use of these names is for demonstration purposes only and does not imply any affiliation, endorsement, or relationship.

## 🏗️ Architecture Overview

This framework implements a **two-layer Common Fixtures system** that delivers BDD-style test readability with full Playwright performance, type safety, and developer experience.

### 🆕 Common Fixtures Architecture (BDD-Style Approach)

- **Two-Layer Fixture System**: `CommonFixtures` (base) + Domain Extensions (e.g., `ProductPurchaseJourneyFixtures`)
- **BDD-Style Step Definitions**: `givenUserIsOnPage()`, `whenUserAcceptsCookies()`, `thenTierSwitcherIsValidated()`
- **Automatic Inheritance**: Domain fixtures inherit ALL common steps automatically
- **Full Type Safety**: Complete autocompletion and compile-time validation
- **Zero Cucumber Overhead**: Pure Playwright performance with BDD readability

### Key Architectural Patterns

- **Common Fixtures Pattern**: Two-layer system with base + domain-specific extensions
- **Clean Step Definition Architecture**: Pure functions separated from fixture configuration
- **Inheritance Chain**: `BasePage` → `BaseBuyPage` → Product-specific pages
- **Abstract Method Contracts**: Enforced implementation of validation methods
- **Locator Factory Pattern**: Centralized management via `BuyPageLocatorFactory`
- **Constants Management**: UI text, product codes, and ARIA snapshots in dedicated files
- **Separation of Concerns**: Step definitions (business logic) separate from fixtures (DI/config)

## 📚 Documentation

Comprehensive guides are available in the `docs/` folder:

- **[Writing New Tests](docs/WRITING_NEW_TESTS.md)** - Complete guide for Common Fixtures Architecture and inheritance patterns
- **[Testing Strategy](docs/TESTING_STRATEGY.md)** - Common Fixtures strategy, architecture principles, and team guidelines
- **[Locator Strategy](docs/LOCATOR_STRATEGY.md)** - Centralized locator management integrated with Common Fixtures
- **[Refactoring Summary](docs/REFACTORING_SUMMARY.md)** - Evolution to Common Fixtures Architecture and achievements

## Prerequisites

1. **[Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)** (required)
2. **[Java JDK](https://www.oracle.com/java/technologies/downloads/)** (optional for tests, required for Allure reports)
3. **[Allure Report](https://allurereport.org/docs/install/)** (optional for tests, required for displaying reports)

## 🌐 Framework Adaptability

This framework is designed to be **easily adaptable** to any e-commerce website:

- **Configurable Target URLs**: Simple environment configuration for any e-commerce site
- **Generic Product Models**: Replace example products with your own catalog
- **Flexible Page Objects**: Inherit from base classes and implement for your specific UI
- **Reusable Step Definitions**: Common e-commerce patterns (cart, checkout, product selection)
- **Modular Architecture**: Plug-and-play components for different site structures

## 🚀 Getting Started

### Opening The Project

The `qa.code-workspace` file contains required configurations and plugins for VS Code to recognize and link feature files & step definitions. Open the project from this file in VS Code and accept the prompt for installing required extensions. This setup enables seamless navigation between feature files and step definitions.

### Installation

1. Open the project using the `qa.code-workspace` file, then open Terminal and navigate to project root

2. Install node modules:

```bash
npm i
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## 🧪 Running Tests

### Interactive Mode (Recommended for Development)

```bash
npm run open:dev
```

This will:

- Generate spec files from feature files and place them in `.features.gen` directory
- Start the [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer-intro)
- Watch for file changes and reload code automatically

Click the play button to run tests. Use **Ctrl + C** in terminal to terminate execution.

### Headless Mode with Reports

```bash
npm run test:dev:report
```

This runs tests in headless mode, generates Allure reports, and serves them in your browser.

### Available Commands

Commands follow the pattern: `action:environment:option`

- **action**: `test` (headless) or `open` (interactive)
- **environment**: `dev`, `stage`, `local` (configurable target URLs for any e-commerce site)
- **option**: Additional parameters like `report`

Examples:

```bash
npm run test:dev:report    # Headless with report
npm run open:dev           # Interactive with file watching
```

## 🏗️ Project Architecture

### Common Fixtures + Inheritance-Based Structure

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
│   │   ├── ProductABuyPage.ts                     # Product A implementation (example)
│   │   ├── ProductBBuyPage.ts                     # Product B implementation (example)
│   │   ├── ProductCBuyPage.ts                     # Product C implementation (example)
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

### Architecture Principles

#### 🆕 **Two-Layer Common Fixtures System with Clean Step Definition Architecture**

```typescript
// Step Definition Functions (Pure Business Logic)
StepDefinitions/
├── CommonStepDefinitions.ts                    // Pure functions for common steps
│   ├── givenUserIsOnPage(basePage, pageSlug)
│   ├── whenUserAcceptsCookies(cookieDialog)
│   └── thenThereAreNoErrorsInConsole(basePage)
└── ProductPurchaseJourneyStepDefinitions.ts   // Pure functions for domain steps
    ├── thenTierSwitcherIsValidated(factory, product)
    └── thenBillingTermSwitcherIsValidated(factory, product)
    ↓
// Fixture Configuration (Dependency Injection & Setup)
Fixtures/
├── CommonFixtures.ts                          // Base layer fixture configuration
│   ├── Imports step functions from StepDefinitions/
│   ├── Configures page objects (basePage, cookieDialog)
│   └── Wires step functions with page objects via fixtures
└── ProductPurchaseJourneyFixtures.ts         // Extension layer configuration
    ├── Extends CommonFixtures (inherits ALL automatically ✅)
    ├── Imports domain step functions from StepDefinitions/
    └── Configures domain-specific page objects & step fixtures
```

#### 🔗 **Page Object Inheritance Chain (Zero Code Duplication)**

```typescript
BasePage                    // e2e/PagesAndComponents/Common/BasePage.ts
    ↓                       // Core page functionality for ALL pages
BaseBuyPage                 // e2e/PagesAndComponents/BuyPage/BaseBuyPage.ts
    ↓                       // Abstract buy page contracts for any e-commerce site
ProductABuyPage             // e2e/PagesAndComponents/BuyPage/ProductABuyPage.ts
ProductBBuyPage             // e2e/PagesAndComponents/BuyPage/ProductBBuyPage.ts
ProductCBuyPage             // e2e/PagesAndComponents/BuyPage/ProductCBuyPage.ts
```

#### 📋 **Abstract Method Contracts**

Every buy page MUST implement:

```typescript
abstract validateCommonTierSwitcher(): Promise<void>;
abstract validateBillingTermSwitcher(): Promise<void>;
abstract validateDefaultStateOfProductCards(): Promise<void>;
```

#### 🏭 **Centralized Locator Factory**

- All selectors defined in `SELECTORS` constants
- Product-specific locator creation methods
- Single source of truth for locator management
- Integrated with Common Fixtures for seamless usage

## 🆕 Common Fixtures Usage Guide

### ✅ **DO (Common Fixtures Architecture)**

#### Writing Tests with Common Fixtures

```typescript
// ✅ CORRECT - Use domain-specific fixtures (get common + domain automatically)
import { test } from '../Fixtures/ProductPurchaseJourneyFixtures';

test('buy page validation', async ({
  // Common step definitions (inherited automatically from CommonFixtures)
  givenUserIsOnPage,
  whenUserAcceptsCookies,
  thenThereAreNoErrorsInConsole,

  // Domain-specific step definitions (from ProductPurchaseJourneyFixtures)
  thenTierSwitcherIsValidated,
  thenBillingTermSwitcherIsValidated,
}) => {
  // BDD-style test execution with full type safety
  await givenUserIsOnPage('buy/productA');
  await whenUserAcceptsCookies();
  await thenTierSwitcherIsValidated('productA');
  await thenThereAreNoErrorsInConsole();
});
```

#### Creating New Domain Fixtures

```typescript
// ✅ STEP 1: Create pure step definition functions
// StepDefinitions/NewDomainStepDefinitions.ts
export async function thenNewDomainValidationPasses(domainPage: DomainPage): Promise<void> {
  await test.step('**THEN** new domain validation passes', async () => {
    await domainPage.validateDomainSpecificBehavior();
  });
}

// ✅ STEP 2: Create fixture configuration that extends CommonFixtures
// Fixtures/NewDomainFixtures.ts
import { test as baseTest, type CommonFixtures } from './CommonFixtures';
import { thenNewDomainValidationPasses } from '../StepDefinitions/NewDomainStepDefinitions';

export type NewDomainFixtures = CommonFixtures & {
  // Domain-specific fixtures
  thenNewDomainValidationPasses: () => Promise<void>;
  // ALL CommonFixtures inherited automatically ✅
};

export const test = baseTest.extend<NewDomainFixtures>({
  thenNewDomainValidationPasses: async ({ domainPage }, use) => {
    await use(async () => await thenNewDomainValidationPasses(domainPage));
  },
});
```

#### Using Page Object Inheritance

```typescript
// ✅ CORRECT - All product pages extend BaseBuyPage
export class ProductABuyPage extends BaseBuyPage {
  constructor(page: Page) {
    super(page);
    // Product-specific implementation...
  }
}
```

### ❌ **DON'T (Anti-patterns)**

#### Don't Skip Common Fixtures Inheritance

```typescript
// ❌ BAD - Missing inheritance from CommonFixtures
export type DomainFixtures = {
  // Missing CommonFixtures inheritance
  // Have to redefine common steps manually
};
```

#### Don't Skip Page Object Inheritance

```typescript
// ❌ BAD - Skips inheritance chain
export class ProductPage extends Page {
  // Missing BasePage functionality
}
```

## 📊 Test Reports

### Allure Reporting

The framework uses Allure for comprehensive test reporting with detailed execution information, screenshots, and debugging context.

#### Manual Report Generation

1. **Run tests to generate results:**

```bash
npm run test:dev
```

This creates an `allure-results` folder in the project root.

2. **Generate the report:**

```bash
allure generate allure-results -o allure-report --clean
```

This creates the `allure-report` folder.

3. **Open the report:**

```bash
allure open allure-report
```

## 🏷️ Test Tagging Strategy

### Playwright Native Tags

Tags are applied using Playwright's native `test()` function with the `@` annotation pattern in test descriptions:

```typescript
// Apply tags in test descriptions
test('@smoke @business-critical buy page validation', async ({ ... }) => {
  // Test implementation
});

test('@functional @accessibility cookie consent validation', async ({ ... }) => {
  // Test implementation
});

test.describe('@smoke Critical User Journeys', () => {
  test('@business-critical Product A purchase flow', async ({ ... }) => {
    // Test implementation
  });
});
```

### Tag Categories

- **`@smoke`** - Critical functionality that must always work
- **`@business-critical`** - Core business workflows
- **`@functional`** - Feature-specific functional testing
- **`@accessibility`** - ARIA snapshot and accessibility validation
- **`@regression`** - Full regression suite testing
- **`@integration`** - Cross-component integration tests

### Tag Filtering with Playwright CLI

Use Playwright's native `--grep` flag for flexible test execution:

```bash
# Run only smoke tests
npx playwright test --grep "@smoke"

# Run business-critical tests
npx playwright test --grep "@business-critical"

# Run smoke OR functional tests
npx playwright test --grep "@smoke|@functional"

# Run business-critical AND not accessibility tests
npx playwright test --grep "@business-critical" --grep-invert "@accessibility"

# Run all tests except regression
npx playwright test --grep-invert "@regression"
```

### Smart Test Control

- **`test.skip()`** - Skip specific tests programmatically
- **`test.only()`** - Run only tagged tests (useful for debugging)
- **`test.describe.skip()`** - Skip entire test suites
- **`test.fixme()`** - Mark tests as known issues

```typescript
// Conditional skipping based on environment
test('@smoke login validation', async ({ ... }) => {
  test.skip(process.env.CI === 'true', 'Skipping in CI environment');
  // Test implementation
});

// Focus on specific test during development
test.only('@debug specific validation', async ({ ... }) => {
  // Only this test will run
});
```

## 🚀 Getting Started for New Team Members

### Quick Start with Common Fixtures

1. **📚 Read Documentation** - Start with [Writing New Tests](docs/WRITING_NEW_TESTS.md) for Common Fixtures guide
2. **🏗️ Understand Architecture** - Review [Testing Strategy](docs/TESTING_STRATEGY.md) for two-layer fixture system
3. **🎯 Study Examples** - Examine `ProductPurchaseJourneyTests.spec.ts` for real-world fixture usage
4. **📍 Learn Locator Patterns** - Study [Locator Strategy](docs/LOCATOR_STRATEGY.md) for centralized management
5. **🔄 Follow Patterns** - Use `CommonFixtures.ts` and `ProductPurchaseJourneyFixtures.ts` as templates

### Learning Path

1. **CommonStepDefinitions.ts** - Understand pure step definition functions (business logic)
2. **CommonFixtures.ts** - See how step functions are wired via fixtures (configuration)
3. **ProductPurchaseJourneyStepDefinitions.ts** - Domain-specific step definition functions
4. **ProductPurchaseJourneyFixtures.ts** - See how to extend CommonFixtures with domain steps
5. **ProductPurchaseJourneyTests.spec.ts** - Study fixture destructuring and usage patterns
6. **ProductABuyPage.ts** - Reference implementation for page object inheritance
7. **BaseBuyPage.ts** - Abstract contracts and inheritance patterns

### Key Concepts to Master

- ✅ **Clean Architecture**: Step definitions (pure functions) separate from fixtures (configuration)
- ✅ **Two-Layer Fixture System**: CommonFixtures (base) + Domain Extensions
- ✅ **Automatic Inheritance**: Domain fixtures get ALL common steps automatically
- ✅ **BDD-Style Syntax**: `givenUserIsOnPage()`, `whenUserAcceptsCookies()`, `thenTierSwitcherIsValidated()`
- ✅ **Separation of Concerns**: Business logic in StepDefinitions/, DI/config in Fixtures/
- ✅ **Type Safety**: Full autocompletion and compile-time validation
- ✅ **Page Object Inheritance**: Always extend `BasePage` or `BaseBuyPage` appropriately

## 🔧 Environment & Constraints

### Current Reality

- **Working CSS selectors** prioritized due to no development team access
- **Stable, proven selectors** maintained for reliability
- **Clean architecture** implemented despite selector constraints
- **Centralized locator management** ready for future semantic improvements

### Future Improvements

When development team collaboration becomes available:

- Migrate to semantic locators (`getByRole`, `getByTestId`)
- Add accessibility testing integration
- Implement test-id strategy for complex components

---

## 📞 Support

For questions about the framework architecture or writing new tests, refer to the comprehensive documentation in the `docs/` folder or review existing implementations as examples.
