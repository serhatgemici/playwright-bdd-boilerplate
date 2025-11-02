# Playwright BDD Test Automation Framework

> A clean, scalable test automation framework using [playwright-bdd](https://vitalets.github.io/playwright-bdd/#/) with inheritance-based architecture and centralized locator management.

## 🏗️ Architecture Overview

This framework implements a **clean inheritance hierarchy** with **abstract method contracts** and **centralized locator management** to eliminate code duplication and ensure consistent behavior across all test implementations.

### Key Architectural Patterns

- **Inheritance Chain**: `BasePage` → `BaseBuyPage` → Product-specific pages
- **Abstract Method Contracts**: Enforced implementation of validation methods
- **Locator Factory Pattern**: Centralized management via `BuyPageLocatorFactory`
- **Constants Management**: UI text, product codes, and ARIA snapshots in dedicated files

## 📚 Documentation

Comprehensive guides are available in the `docs/` folder:

- **[Writing New Tests](docs/WRITING_NEW_TESTS.md)** - Complete guide for creating new tests with inheritance patterns
- **[Testing Strategy](docs/TESTING_STRATEGY.md)** - Architecture principles and team guidelines
- **[Locator Strategy](docs/LOCATOR_STRATEGY.md)** - Centralized locator management and best practices
- **[Refactoring Summary](docs/REFACTORING_SUMMARY.md)** - Evolution of the codebase architecture

## Prerequisites

1. **[Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)** (required)
2. **[Java JDK](https://www.oracle.com/java/technologies/downloads/)** (optional for tests, required for Allure reports)
3. **[Allure Report](https://allurereport.org/docs/install/)** (optional for tests, required for displaying reports)

## 🚀 Getting Started

### Opening The Project

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
npm run open:dev:watch
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
- **environment**: `dev`, `stage`, `local` (currently all point to `https://www.jetbrains.com`)
- **option**: Additional parameters like `watch` or `report`

Examples:

```bash
npm run test:dev:report    # Headless with report
npm run open:dev:watch     # Interactive with file watching
```

## 🏗️ Project Architecture

### Inheritance-Based Structure

```
e2e/
├── Data/
│   └── aria/                                    # ARIA snapshot files for validation
├── Features/
│   └── @BuyPageOperations.feature               # BDD feature files
├── Fixtures/
│   └── FixturesBDD.ts                           # Test fixtures
├── PagesAndComponents/                          # Clean inheritance hierarchy
│   ├── Common/
│   │   ├── BasePage.ts                          # Core page functionality (ALL pages extend this)
│   │   └── CommonConstants.ts                   # Shared constants
│   ├── BuyPage/
│   │   ├── BaseBuyPage.ts                       # Abstract base with method contracts
│   │   ├── IdeaBuyPage.ts                       # IntelliJ IDEA implementation
│   │   ├── RustRoverBuyPage.ts                  # RustRover implementation
│   │   ├── CLionBuyPage.ts                      # CLion implementation
│   │   ├── BuyPageFactory.ts                    # Factory and convenience methods
│   │   ├── BuyPageConstants.ts                  # UI text, product codes, ARIA snapshots
│   │   └── BuyPageLocatorFactory.ts             # Centralized locator management
│   └── CookieConsentDialog/
│       └── CookieConsentDialog.ts               # Cookie dialog handling
└── StepDefinitions/
    ├── @BuyPageOperations.ts                    # Feature-specific step definitions
    └── Common/
        └── CommonStepDefinitions.ts             # Shared step definitions
```

### Architecture Principles

#### 🔗 **Inheritance Chain (Zero Code Duplication)**

```typescript
BasePage                    // e2e/PagesAndComponents/Common/BasePage.ts
    ↓                       // Core functionality for ALL pages
BaseBuyPage                 // e2e/PagesAndComponents/BuyPage/BaseBuyPage.ts
    ↓                       // Abstract buy page contracts
IdeaBuyPage                 // e2e/PagesAndComponents/BuyPage/IdeaBuyPage.ts
RustRoverBuyPage            // e2e/PagesAndComponents/BuyPage/RustRoverBuyPage.ts
CLionBuyPage                // e2e/PagesAndComponents/BuyPage/CLionBuyPage.ts
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

### Legacy Structure (For Reference)

The following structure shows the full project layout:

```
playwright-bdd-boilerplate/
├── .features-gen/              # Generated spec files
├── allure-report/              # Generated reports
├── allure-results/             # Test results
├── docs/                       # 📚 Comprehensive documentation
│   ├── WRITING_NEW_TESTS.md
│   ├── TESTING_STRATEGY.md
│   ├── LOCATOR_STRATEGY.md
│   └── REFACTORING_SUMMARY.md
├── e2e/                        # Test implementation (see above)
├── test-results/               # Playwright test results
└── utils/                      # Helper utilities
    └── readAriaSnapshot.ts
```

## 📋 Page Object Guidelines

### ✅ **DO (Current Architecture)**

#### Extend Appropriate Base Classes

```typescript
// ✅ CORRECT - All buy pages extend BaseBuyPage
export class IdeaBuyPage extends BaseBuyPage {
  constructor(page: Page) {
    super(page);
    // Implementation...
  }
}
```

#### Use Locator Factory

```typescript
// ✅ CORRECT - Get locators from factory
this.locatorFactory = new buyPageLocatorFactory.Locators(page);
const locators = this.locatorFactory.createIdeaLocators();
```

#### Implement Abstract Methods

```typescript
// ✅ CORRECT - All abstract methods implemented
async validateCommonTierSwitcher(): Promise<void> {
  // IDEA-specific implementation
}
```

### ❌ **DON'T (Anti-patterns)**

#### Don't Skip Inheritance

```typescript
// ❌ BAD - Skips inheritance chain
export class ProductPage extends Page {
  // Missing BasePage functionality
}
```

#### Don't Create Locators Directly

```typescript
// ❌ BAD - Hardcoded selectors scattered
const card = page.locator('[data-test="some-card"]');
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

### Custom Tags

Tags can be applied at multiple levels:

- **Feature** level
- **Rule** level
- **Scenario** level
- **Scenario Outline** level
- **Examples** level

Examples: `@smoke`, `@business-critical`, `@functional`, `@accessibility`

### Tag Filtering

Use logical operators for flexible test execution:

```bash
# Run only smoke tests
TAGS="@smoke" npm run test:dev

# Run all tests except extras
TAGS="not @extras" npm run test:dev

# Run smoke OR functional tests
TAGS="@smoke or @functional" npm run test:dev

# Run business-critical AND not extras
TAGS="@business-critical and not @extras" npm run test:dev
```

### Smart Tags

- **`@skip`** - Skip specific tests
- **`@only`** - Run only tagged tests (useful for debugging)

## 🚀 Getting Started for New Team Members

1. **Read Documentation** - Start with [Writing New Tests](docs/WRITING_NEW_TESTS.md)
2. **Understand Architecture** - Review [Testing Strategy](docs/TESTING_STRATEGY.md)
3. **Learn Locator Patterns** - Study [Locator Strategy](docs/LOCATOR_STRATEGY.md)
4. **Follow Examples** - Look at existing `IdeaBuyPage.ts` as reference implementation
5. **Maintain Inheritance** - Always extend `BasePage` or `BaseBuyPage` appropriately

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
