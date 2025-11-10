# Testing Strategy and Architecture

## Overview

This test automation framework follows modern best practices for maintainable, scalable, and business-focused test automation using a **Common Fixtures Architecture** that provides BDD-style step definitions as reusable Playwright fixtures.

## 🆕 **Common Fixtures Architecture**

The framework now uses a **two-layer fixture system** that maintains BDD readability while leveraging plain Playwright performance:

### **Layer 1: CommonFixtures (Base Layer)**

- Contains step definitions used across ALL test domains
- `givenUserIsOnPage()`, `whenUserAcceptsCookies()`, `thenThereAreNoErrorsInConsole()`
- Inherited automatically by all domain-specific fixtures

### **Layer 2: Domain-Specific Fixtures (Extension Layer)**

- Extends CommonFixtures with domain-specific step definitions
- `ProductPurchaseJourneyFixtures`, `AccountManagementFixtures`, etc.
- Maintains BDD-like syntax: `thenTierSwitcherIsValidated(productName)`

### **Key Benefits**

- ✅ **BDD-Style Readability**: `givenUserIsOnPage(pageSlug)` reads like traditional Cucumber steps
- ✅ **Better Performance**: Plain Playwright fixtures (no Cucumber overhead)
- ✅ **Full Type Safety**: TypeScript autocompletion and error checking
- ✅ **Maximum Reusability**: Common steps shared across all test domains
- ✅ **Easy Extension**: Add new domains that automatically inherit common functionality

## Architecture Principles

### 1. **Inheritance-Based Design Pattern**

- **BasePage.ts** provides core functionality for ALL page objects
- **BaseBuyPage.ts** extends BasePage with buy-page specific abstractions
- **Product pages** (ProductABuyPage, ProductBBuyPage, ProductCBuyPage) extend BaseBuyPage
- Every page MUST extend appropriate base to avoid code duplication

```typescript
// ✅ CORRECT - Proper inheritance chain
BasePage → BaseBuyPage → ProductABuyPage
BasePage → BaseBuyPage → ProductBBuyPage
BasePage → BaseBuyPage → ProductCBuyPage
```

### 2. **Abstract Method Contracts**

- BaseBuyPage defines abstract methods that MUST be implemented
- Ensures consistent behavior across all product pages
- Eliminates code duplication while enforcing standards

```typescript
// Abstract methods every buy page must implement
abstract validateCommonTierSwitcher(): Promise<void>;
abstract validateBillingTermSwitcher(): Promise<void>;
abstract validateDefaultStateOfProductCards(): Promise<void>;
```

### 3. **Centralized Locator Management**

- **BuyPageLocatorFactory** provides all locators via factory pattern
- **SELECTORS constants** centralize all CSS selectors
- Product-specific factory methods (createProductALocators, createProductBLocators)
- Single source of truth for locator logic

### 4. **Current Locator Strategy (Environment-Constrained)**

Due to no development team access, we use:

1. **Working CSS selectors** - Prioritize stability and reliability
2. **data-test attributes** - When available in existing DOM
3. **Structural selectors** - nth-child patterns when necessary
4. **Text-based locators** - For content validation

**Future ideal order (when dev team access available):**

1. **getByRole()** - Most semantic, accessible
2. **getByTestId()** - Stable, test-specific
3. **getByText()** - Business-readable content
4. **getByLabel()** - Form elements

### 5. **Common Fixtures Architecture with Clean Separation**

- **Clean Architecture**: Step definitions (pure functions) separate from fixture configuration
- **Two-layer system**: CommonFixtures + Domain-specific extensions
- **Step Functions**: Pure business logic in StepDefinitions/ folder
- **Fixture Configuration**: Dependency injection and setup in Fixtures/ folder
- **Parameterized functions**: `givenUserIsOnPage(pageSlug)` with full type safety
- **Performance optimized**: Plain Playwright without Cucumber overhead

### 6. **Business-Focused Testing**

- Test scenarios express business value, not technical implementation
- Step definitions use domain language that stakeholders understand
- Focus on user journeys and outcomes with BDD-like readability

## Project Structure

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

### **Common Fixtures Hierarchy with Clean Architecture**

```typescript
// Step Definition Functions (Pure Business Logic)
// StepDefinitions/CommonStepDefinitions.ts
export async function givenUserIsOnPage(basePage: BasePage, pageSlug: string): Promise<void>
export async function andCookieConsentDialogIs(dialog: CookieConsentDialog, state: string): Promise<void>
export async function whenUserAcceptsCookies(dialog: CookieConsentDialog): Promise<void>
export async function thenThereAreNoErrorsInConsole(basePage: BasePage): Promise<void>
export async function andHeadingDisplays(basePage: BasePage, title: string): Promise<void>
    ↓ imported by
// Fixture Configuration (Dependency Injection & Setup)
// CommonFixtures.ts
export type CommonFixtures = {
  // Core page objects
  basePage: BasePage;
  cookieConsentDialog: CookieConsentDialog;

  // Common BDD-style step definition fixtures
  givenUserIsOnPage: (pageSlug: string) => Promise<void>;
  andCookieConsentDialogIs: (dialogState: string) => Promise<void>;
  whenUserAcceptsCookies: () => Promise<void>;
  thenThereAreNoErrorsInConsole: () => Promise<void>;
  andHeadingDisplays: (expectedTitle: string) => Promise<void>;
};

// Extension layer - Domain-specific extensions
// ProductPurchaseJourneyFixtures.ts
export type ProductPurchaseJourneyFixtures = CommonFixtures & {
  // Domain-specific page objects
  buyPageFactory: BuyPageFactory;

  // Domain-specific step definition fixtures
  thenTierSwitcherIsValidated: (productName: string) => Promise<void>;
  thenBillingTermSwitcherIsValidated: (productName: string) => Promise<void>;
  thenProductCardsAreValidated: (productName: string) => Promise<void>;
};

// Usage in tests - Mix common + domain-specific steps
test('buy page validation', async ({
  givenUserIsOnPage, // From CommonFixtures (inherited)
  whenUserAcceptsCookies, // From CommonFixtures (inherited)
  thenTierSwitcherIsValidated, // From ProductPurchaseJourneyFixtures
}) => {
  await givenUserIsOnPage('buy/productA');
  await whenUserAcceptsCookies();
  await thenTierSwitcherIsValidated('productA');
});
```

### Page Object Inheritance Hierarchy

```typescript
// Base layer - Core functionality
class BasePage {
  // Common page methods: navigation, waiting, etc.
}

// Abstract layer - Buy page contracts
abstract class BaseBuyPage extends BasePage {
  // Abstract methods all buy pages must implement
  abstract validateCommonTierSwitcher(): Promise<void>;
  abstract validateBillingTermSwitcher(): Promise<void>;
  abstract validateDefaultStateOfProductCards(): Promise<void>;

  // Common helper methods
  protected async validateProductCardBuyLink(card: Locator): Promise<void> {
    // Shared buy link validation logic
  }
}

// Implementation layer - Product-specific pages
class ProductABuyPage extends BaseBuyPage {
  // Implements all abstract methods for Product A-specific behavior
}
```

### Locator Factory Pattern

```typescript
// Centralized locator management
export class BuyPageLocatorFactory {
  export const SELECTORS = {
    TIER_SWITCHER: '[data-test="adaptive-switcher__switcher"]',
    PRODUCT_CARD: '[data-test^="product-card-"]'
    // All selectors in one place
  } as const;

  export class Locators {
    createProductALocators() {
      // Product A-specific locator creation
    }

    createRustRoverLocators() {
      // RustRover-specific locator creation
    }
  }
}
```

## Testing Strategy

### **Common Fixtures Approach**

#### **Writing Tests with BDD-Style Fixtures**

```typescript
// Example: ProductPurchaseJourneyTests.spec.ts
import { test } from '../Fixtures/ProductPurchaseJourneyFixtures';

test.describe('Product Purchase Journey', () => {
  test('should validate complete Product A buy page flow', async ({
    // Common step definitions (inherited automatically from CommonFixtures)
    givenUserIsOnPage,
    andCookieConsentDialogIs,
    whenUserAcceptsCookies,
    andHeadingDisplays,
    thenThereAreNoErrorsInConsole,

    // Domain-specific step definitions (from ProductPurchaseJourneyFixtures)
    thenTierSwitcherIsValidated,
    thenBillingTermSwitcherIsValidated,
    thenProductCardsAreValidated,
  }) => {
    // BDD-style test execution with full type safety
    await givenUserIsOnPage('buy/productA');
    await andCookieConsentDialogIs('displayed');
    await whenUserAcceptsCookies();
    await andHeadingDisplays('Product A Premium');
    await thenTierSwitcherIsValidated('productA');
    await thenBillingTermSwitcherIsValidated('productA');
    await thenProductCardsAreValidated('productA');
    await thenThereAreNoErrorsInConsole();
  });
});
```

### Test Pyramid

1. **Unit Tests** (Not in this framework - handled by dev teams)
2. **Integration Tests** (API testing - future scope)
3. **E2E Tests** (This framework - critical user journeys using Common Fixtures)

### Test Categories & Tagging Strategy

- **Domain-Focused Tests**: Use domain-specific fixtures (`ProductPurchaseJourneyFixtures`)
- **Cross-Domain Tests**: Use CommonFixtures for tests that span multiple domains
- **Smoke Tests**: Critical functionality using fastest fixture combinations
- **Accessibility Tests**: ARIA snapshot validation integrated into fixtures

### Benefits of Common Fixtures Approach

- ✅ **Clean Architecture**: Step definitions (pure functions) separate from fixtures (configuration)
- ✅ **Better Performance**: Plain Playwright (no Cucumber parsing overhead)
- ✅ **Type Safety**: Full TypeScript autocompletion and compile-time checks
- ✅ **Reusability**: Common steps automatically available to all domains
- ✅ **Maintainability**: Update step logic in one place, all fixtures benefit
- ✅ **Testability**: Step functions can be unit tested independently
- ✅ **Separation of Concerns**: Business logic in StepDefinitions/, DI/config in Fixtures/
- ✅ **BDD Readability**: Maintains business-friendly step definition syntax

### Error Handling Strategy

- Automatic retries for flaky network conditions
- Clear error messages with debugging context
- Screenshot capture on failures
- Allure reporting for detailed analysis
- Enhanced debugging with `test.step()` wrapping in fixtures

## Architectural Decision Records (ADRs)

### ADR-001: Inheritance-Based Architecture

**Decision:** Implement clean inheritance hierarchy with BasePage → BaseBuyPage → Product pages
**Rationale:**

- Eliminates code duplication across product pages
- Enforces consistent behavior through abstract method contracts
- Provides shared functionality while allowing product-specific customization
  **Consequences:**
- More structured codebase with clear responsibilities
- Every new page must follow inheritance pattern
- Abstract methods must be implemented by all product pages

### ADR-002: Centralized Locator Factory Pattern

**Decision:** Use BuyPageLocatorFactory with SELECTORS constants for all locator management
**Rationale:**

- Single source of truth for all locators eliminates duplication
- SELECTORS constants make maintenance easier when selectors change
- Factory pattern provides clean API for product-specific locator creation
  **Consequences:**
- All pages must use locator factory instead of creating locators directly
- Selector changes require updates only in constants file
- More organized but slightly more complex setup

### ADR-003: Abstract Method Contracts for Buy Pages

**Decision:** Define abstract methods in BaseBuyPage that all product pages must implement
**Rationale:**

- Ensures consistent validation behavior across all product pages
- Prevents missing implementations of critical functionality
- Makes code more maintainable and predictable
  **Consequences:**
- All buy pages must implement: validateCommonTierSwitcher, validateBillingTermSwitcher, validateDefaultStateOfProductCards
- Compilation fails if abstract methods not implemented
- Clearer contracts but more rigid structure

### ADR-004: Working CSS Selectors Over Ideal Practices

**Decision:** Use proven CSS selectors instead of semantic locators due to environment constraints
**Rationale:**

- No access to development team to add test-ids or improve semantic HTML
- Stability and working tests prioritized over ideal locator practices
- Current selectors work reliably in production environment
  **Consequences:**
- Must maintain working selectors even if not ideal
- Future migration needed when dev team access becomes available
- Documentation includes both current reality and future goals

### ADR-005: Common Fixtures Architecture Over Traditional BDD

**Decision:** Implement BDD-style step definitions as Playwright fixtures instead of traditional Cucumber approach
**Rationale:**

- Better performance (no Cucumber parsing overhead)
- Full TypeScript support with autocompletion and compile-time checking
- Better reusability through fixture inheritance
- Easier debugging with standard Playwright tools
- Maintains BDD readability while improving maintainability

**Consequences:**

- New tests use fixture architecture (`.spec.ts`) instead of Gherkin (`.feature`)
- Step definitions implemented as parameterized fixture functions
- Two-layer architecture: CommonFixtures (base) + Domain Extensions
- Backward compatibility maintained for existing BDD tests
- Gradual migration path from traditional BDD to fixtures

## Quality Gates

### Code Quality

- ESLint + Prettier for consistent formatting
- TypeScript for type safety
- Inheritance patterns enforced (every page extends appropriate base)
- Abstract method contracts ensure complete implementations
- Centralized locator management via factory pattern
- Maximum complexity per method to maintain readability

### Test Quality

- All scenarios must express clear business value
- No technical implementation details in Gherkin
- Working CSS selectors prioritized for stability
- Comprehensive validation through abstract method contracts
- ARIA snapshot validation for accessibility compliance

## Team Guidelines

### For QA Engineers

#### **Common Fixtures Requirements**

1. **Use Common Fixtures first** - Import from CommonFixtures for simple tests
2. **Extend for domain-specific needs** - Create domain fixtures that extend CommonFixtures
3. **Follow BDD-style naming** - `givenUserIsOnPage()`, `whenUserAcceptsCookies()`, `thenFeatureIsValidated()`
4. **Wrap in test.step()** - All fixture functions should use `test.step()` for better reporting
5. **Maintain type safety** - Always extend CommonFixtures type for domain-specific fixtures

#### **Page Object Requirements**

1. **Follow inheritance patterns** - All pages must extend BasePage or BaseBuyPage
2. **Implement abstract methods** - Buy pages must implement all required validation methods
3. **Use locator factory** - Get all locators from BuyPageLocatorFactory, never create directly
4. **Update SELECTORS constants** - When selectors change, update centralized constants

### For New Team Members

#### **Learning Path**

1. **Study CommonStepDefinitions.ts** - Understand pure step definition functions (business logic)
2. **Study CommonFixtures.ts** - Understand the base layer fixture configuration
3. **Examine ProductPurchaseJourneyStepDefinitions.ts** - Domain-specific step definition functions
4. **Examine ProductPurchaseJourneyFixtures.ts** - See how to extend common fixtures with domain steps
5. **Review ProductPurchaseJourneyTests.spec.ts** - Study real-world fixture usage patterns
6. **Study page object hierarchy** - Understand BasePage → BaseBuyPage → Product page chain
7. **Use fixture templates** - Follow templates in WRITING_NEW_TESTS.md

#### **Quick Start Checklist**

- [ ] Understand clean architecture: step definitions (pure functions) separate from fixtures (config)
- [ ] Understand two-layer fixture system (Common + Domain)
- [ ] Know when to use CommonFixtures vs domain-specific fixtures
- [ ] Can create step definition functions in StepDefinitions/ folder
- [ ] Can create fixture configuration that imports step functions
- [ ] Can create new domain fixture by extending CommonFixtures
- [ ] Understands BDD-style step definition naming conventions
- [ ] Can write tests using destructured fixture parameters

### For Developers (When Collaboration Available)

1. **Add test-ids for complex interactions** where CSS selectors are brittle
2. **Consider accessibility** when building UI components
3. **Communicate UI changes** that might affect test stability
4. **Review semantic HTML** to enable better locator strategies

## Scaling Strategy

### **Adding New Test Domains**

#### **Creating New Domain Fixtures**

1. **Create step definition functions** - `YourNewDomainStepDefinitions.ts` with pure functions
2. **Create domain fixture file** - `YourNewDomainFixtures.ts`
3. **Import step functions** - `import { thenYourFeatureIsValidated } from '../StepDefinitions/YourNewDomainStepDefinitions'`
4. **Extend CommonFixtures** - `export type YourFixtures = CommonFixtures & { ... }`
5. **Import from CommonFixtures** - `import { test as baseTest, type CommonFixtures } from './CommonFixtures'`
6. **Configure fixture wiring** - Connect step functions with page objects via fixtures
7. **Export consistent API** - Always export `test` and `expect`

#### **Example New Domain Implementation**

```typescript
// Step 1: Create pure step definition functions
// StepDefinitions/AccountManagementStepDefinitions.ts
export async function thenProfileIsUpdated(
  accountPageFactory: AccountPageFactory,
  field: string
): Promise<void> {
  await test.step(`**THEN** profile field "${field}" is updated`, async () => {
    const accountPage = accountPageFactory.createAccountPage();
    await accountPage.validateProfileField(field);
  });
}

// Step 2: Create fixture configuration
// Fixtures/AccountManagementFixtures.ts
import { test as baseTest, type CommonFixtures } from './CommonFixtures';
import { thenProfileIsUpdated } from '../StepDefinitions/AccountManagementStepDefinitions';

export type AccountManagementFixtures = CommonFixtures & {
  accountPageFactory: AccountPageFactory;
  thenProfileIsUpdated: (field: string) => Promise<void>;
};

export const test = baseTest.extend<AccountManagementFixtures>({
  accountPageFactory: async ({ page }, use) => {
    const factory = new AccountPageFactory(page);
    await use(factory);
  },

  thenProfileIsUpdated: async ({ accountPageFactory }, use) => {
    await use(async (field: string) => {
      await thenProfileIsUpdated(accountPageFactory, field);
    });
  },
});
```

### Adding New Product Pages

1. **Extend BaseBuyPage** - Never extend BasePage directly for buy pages
2. **Implement abstract methods** - All three validation methods must be implemented
3. **Add to locator factory** - Create new product-specific locator creation method
4. **Update BuyPageFactory** - Add factory method for new product page instantiation
5. **Add constants** - Update BuyPageConstants with product-specific data
6. **Update domain fixtures** - Add new product support to ProductPurchaseJourneyFixtures

### Current Architecture Benefits

#### **Common Fixtures Benefits**

- **Clean Architecture** - Step definitions (pure functions) separate from fixture configuration
- **BDD-Style Readability** - `givenUserIsOnPage()` reads like traditional Cucumber steps
- **Better Performance** - Plain Playwright without Cucumber parsing overhead
- **Maximum Reusability** - Common steps automatically inherited by all domains
- **Type Safety** - Full TypeScript autocompletion and compile-time checks
- **Easy Extension** - New domains inherit all common functionality automatically
- **Separation of Concerns** - Business logic in StepDefinitions/, DI/config in Fixtures/
- **Testability** - Step definition functions can be unit tested independently

#### **Page Object Benefits**

- **Zero code duplication** - Inheritance eliminates repeated code
- **Enforced consistency** - Abstract methods ensure all pages implement required functionality
- **Centralized maintenance** - Locator factory makes selector updates easy
- **Type safety** - TypeScript catches missing implementations at compile time
- **Clear structure** - Inheritance hierarchy makes codebase navigation intuitive

### Adding New Test Types

1. **New Domain Tests**: Create domain-specific fixtures extending CommonFixtures
2. **Cross-Domain Tests**: Use CommonFixtures directly for multi-domain scenarios
3. **Performance tests**: Lighthouse integration using fixture-wrapped page objects
4. **Accessibility tests**: axe-core integration with fixture-based ARIA validation
5. **Visual regression**: Playwright screenshots with fixture-based setup/teardown
6. **API tests**: Separate fixture files following same architectural principles

## Monitoring and Maintenance

### Continuous Improvement

- Monthly architecture review meetings
- Quarterly test strategy assessment
- Regular refactoring to maintain quality
- Performance monitoring and optimization

### Success Metrics

- Test execution time < 30 minutes for full suite
- Test flakiness < 5% (achieved through working CSS selectors)
- Zero code duplication across page objects (achieved through inheritance)
- 100% abstract method implementation coverage (enforced by TypeScript)
- Centralized locator management (achieved through factory pattern)
- Business stakeholder satisfaction with test coverage

### Architecture Quality Indicators

#### **Common Fixtures Architecture Quality**

- **Two-Layer System**: CommonFixtures + Domain Extensions implemented ✅
- **BDD-Style Readability**: Step definitions read like Cucumber steps ✅
- **Type Safety**: Full TypeScript integration with autocompletion ✅
- **Performance Optimized**: Plain Playwright without Cucumber overhead ✅
- **Maximum Reusability**: Common steps inherited by all domains ✅
- **Easy Extension**: New domains automatically get common functionality ✅

#### **Page Object Architecture Quality**

- **Inheritance Usage**: All buy pages extend BaseBuyPage ✅
- **Abstract Method Coverage**: All required methods implemented ✅
- **Locator Centralization**: All selectors in factory constants ✅
- **Zero Duplication**: No repeated code across page objects ✅
- **Type Safety**: Compilation catches missing implementations ✅

#### **Integration Quality**

- **Fixture-Page Integration**: Fixtures properly use page objects ✅
- **Constants Integration**: All hardcoded strings eliminated ✅
- **Factory Pattern Usage**: Consistent object creation patterns ✅
- **Documentation Alignment**: All docs reflect Common Fixtures approach ✅
