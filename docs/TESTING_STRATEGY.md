# Testing Strategy and Architecture

## Overview

This test automation framework follows modern best practices for maintainable, scalable, and business-focused test automation.

## Architecture Principles

### 1. **Inheritance-Based Design Pattern**

- **BasePage.ts** provides core functionality for ALL page objects
- **BaseBuyPage.ts** extends BasePage with buy-page specific abstractions
- **Product pages** (IdeaBuyPage, RustRoverBuyPage, CLionBuyPage) extend BaseBuyPage
- Every page MUST extend appropriate base to avoid code duplication

```typescript
// ✅ CORRECT - Proper inheritance chain
BasePage → BaseBuyPage → IdeaBuyPage
BasePage → BaseBuyPage → RustRoverBuyPage
BasePage → BaseBuyPage → CLionBuyPage
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
- Product-specific factory methods (createIdeaLocators, createRustRoverLocators)
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

### 5. **Business-Focused BDD**

- Scenarios express business value, not technical implementation
- Gherkin uses domain language that stakeholders understand
- Focus on user journeys and outcomes

## Page Object Structure

```
e2e/
├── Pages/
│   ├── BasePage.ts                    # Core page functionality
│   ├── BuyPage.ts                     # Factory and convenience methods
│   ├── CookieConsentDialog.ts         # Cookie dialog handling
├── Components/
│   ├── BaseBuyPage.ts                 # Abstract buy page with contracts
│   ├── IdeaBuyPage.ts                 # IntelliJ IDEA implementation
│   ├── RustRoverBuyPage.ts            # RustRover implementation
│   ├── CLionBuyPage.ts                # CLion implementation
├── Constants/
│   ├── BuyPageConstants.ts            # Product constants, UI text, aria snapshots
│   ├── CommonConstants.ts             # Shared constants
├── LocatorFactories/
│   ├── BuyPageLocatorFactory.ts       # Centralized locator management
└── Data/
    └── aria/                          # ARIA snapshot files for validation
```

### Inheritance Hierarchy

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
class IdeaBuyPage extends BaseBuyPage {
  // Implements all abstract methods for IDEA-specific behavior
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
    createIdeaLocators() {
      // IDEA-specific locator creation
    }

    createRustRoverLocators() {
      // RustRover-specific locator creation
    }
  }
}
```

## Testing Strategy

### Test Pyramid

1. **Unit Tests** (Not in this framework - handled by dev teams)
2. **Integration Tests** (API testing - future scope)
3. **E2E Tests** (This framework - critical user journeys)

### Test Categories

- **@smoke** - Critical functionality that must always work
- **@business-critical** - Core business flows
- **@functional** - Feature-specific functionality
- **@accessibility** - Inclusive design validation
- **@performance** - User experience validation

### Error Handling Strategy

- Automatic retries for flaky network conditions
- Clear error messages with debugging context
- Screenshot capture on failures
- Allure reporting for detailed analysis

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

### ADR-005: Business-Focused Gherkin

**Decision:** Write scenarios from user perspective, not technical implementation
**Rationale:** Better stakeholder communication, focus on business value
**Consequences:** More work to align with business stakeholders

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

1. **Follow inheritance patterns** - All pages must extend BasePage or BaseBuyPage
2. **Implement abstract methods** - Buy pages must implement all required validation methods
3. **Use locator factory** - Get all locators from BuyPageLocatorFactory, never create directly
4. **Update SELECTORS constants** - When selectors change, update centralized constants
5. **Write business-focused scenarios** - Focus on user value, not technical implementation

### For New Team Members

1. **Study inheritance hierarchy** - Understand BasePage → BaseBuyPage → Product page chain
2. **Review abstract method contracts** - Know what methods must be implemented
3. **Use locator factory pattern** - Never hardcode selectors, always use factory
4. **Follow existing patterns** - Look at IdeaBuyPage as reference implementation
5. **Read comprehensive documentation** - Review WRITING_NEW_TESTS.md before starting

### For Developers (When Collaboration Available)

1. **Add test-ids for complex interactions** where CSS selectors are brittle
2. **Consider accessibility** when building UI components
3. **Communicate UI changes** that might affect test stability
4. **Review semantic HTML** to enable better locator strategies

## Scaling Strategy

### Adding New Product Pages

1. **Extend BaseBuyPage** - Never extend BasePage directly for buy pages
2. **Implement abstract methods** - All three validation methods must be implemented
3. **Add to locator factory** - Create new product-specific locator creation method
4. **Update BuyPageFactory** - Add factory method for new product page instantiation
5. **Add constants** - Update BuyPageConstants with product-specific data

### Current Architecture Benefits

- **Zero code duplication** - Inheritance eliminates repeated code
- **Enforced consistency** - Abstract methods ensure all pages implement required functionality
- **Centralized maintenance** - Locator factory makes selector updates easy
- **Type safety** - TypeScript catches missing implementations at compile time
- **Clear structure** - Inheritance hierarchy makes codebase navigation intuitive

### Adding New Test Types

1. **Performance tests**: Lighthouse integration using existing page objects
2. **Accessibility tests**: axe-core integration with current ARIA snapshots
3. **Visual regression**: Playwright screenshots with existing locator patterns
4. **API tests**: Separate test suites maintaining same architectural principles

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

- **Inheritance Usage**: All buy pages extend BaseBuyPage ✅
- **Abstract Method Coverage**: All required methods implemented ✅
- **Locator Centralization**: All selectors in factory constants ✅
- **Zero Duplication**: No repeated code across page objects ✅
- **Type Safety**: Compilation catches missing implementations ✅
