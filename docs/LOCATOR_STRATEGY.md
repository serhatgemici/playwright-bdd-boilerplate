# Locator Strategy Guide

## Current Architecture: Centralized Locator Management

**STATUS**: This project implements a **Locator Factory Pattern** with centralized selector management while using working CSS selectors due to environment constraints (no dev team access for test-ids or semantic improvements).

## Guiding Principles

### 1. **Centralized Locator Management**

All locators are managed through factory classes with constants, ensuring single source of truth and easy maintenance.

### 2. **Working Selectors First**

In environments without dev team access, we prioritize working selectors that don't break tests over ideal semantic locators.

### 3. **Clean Architecture Despite Constraints**

Even with CSS selectors, we maintain excellent code organization through factory patterns and constants management.

## Current Implementation: Locator Factory Pattern

### 🏭 **BuyPageLocatorFactory.ts Structure**

```typescript
// ✅ CENTRALIZED SELECTORS - Single source of truth
export const SELECTORS = {
  TIER_SWITCHER: '[data-test="adaptive-switcher__switcher"]',
  BILLING_SWITCHER: '[data-test="billing-term-switcher"]',
  PRODUCT_CARD: '[data-test^="product-card-"]',
  AI_PRO_CHECKBOX: '[data-test="ai-pro-checkbox"]',
  ADAPTIVE_SWITCHER: '[data-test="adaptive-switcher__radio-input"]',
} as const;

// ✅ LOCATOR FACTORY CLASS - Centralized creation logic
export class Locators {
  constructor(private page: Page) {}

  // Common locators used across products
  createTierSwitcher(): Locator {
    return this.page.locator(SELECTORS.TIER_SWITCHER);
  }

  createAiProCheckbox(parentCard: Locator): Locator {
    return parentCard.locator(SELECTORS.AI_PRO_CHECKBOX);
  }

  // Product-specific locator creation
  createIdeaLocators() {
    return {
      tierSwitcher: this.createTierSwitcher(),
      billingSwitcher: this.page.locator(SELECTORS.BILLING_SWITCHER),
      ideaUltimateCard: this.page.locator('[data-test="product-card-II-Commercial"]'),
      allProductsPackCard: this.page.locator('[data-test="product-card-AP-Commercial"]'),
    };
  }

  createRustRoverLocators() {
    // Specific patterns for RustRover due to DOM structure
    const rustRoverCards = this.page.locator(
      'div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div'
    );
    return {
      tierSwitcher: this.createTierSwitcher(),
      billingRadioGroup: this.page.locator('[data-test="billing-type-radio-group"]'),
      nonCommercialCard: rustRoverCards.nth(0),
      commercialCard: rustRoverCards.nth(1),
      allProductsPackCard: rustRoverCards.nth(2),
      rustPluginCard: rustRoverCards.nth(3),
    };
  }

  createCLionLocators() {
    return {
      billingSwitcher: this.page.locator(SELECTORS.BILLING_SWITCHER),
      nonCommercialCard: this.page.locator(
        '[data-test="non-commercial-product-buy-card-CLion-Non-Commercial"]'
      ),
      commercialCard: this.page.locator('[data-test="product-card-CL-Personal"]'),
      allProductsPackCard: this.page.locator('[data-test="product-card-AP-Personal"]'),
      downloadButton: this.page.locator('[data-test="download-button"]'),
    };
  }
}
```

### ✅ **Usage in Page Objects**

```typescript
export class IdeaBuyPage extends BaseBuyPage {
  private readonly tierSwitcher: Locator;
  private readonly billingSwitcher: Locator;
  private readonly ideaUltimateCard: Locator;
  private buyPageLocators: buyPageLocatorFactory.Locators;

  constructor(page: Page) {
    super(page);

    // ✅ Initialize locator factory
    this.buyPageLocators = new buyPageLocatorFactory.Locators(page);
    const ideaLocators = this.buyPageLocators.createIdeaLocators();

    // ✅ Assign locators from factory
    this.tierSwitcher = ideaLocators.tierSwitcher;
    this.billingSwitcher = ideaLocators.billingSwitcher;
    this.ideaUltimateCard = ideaLocators.ideaUltimateCard;

    // ✅ Use utility methods for complex locators
    this.ideaUltimateAiProCheckbox = this.buyPageLocators.createAiProCheckbox(
      this.ideaUltimateCard
    );
  }
}
```

## Architecture Benefits

### 🎯 **Single Source of Truth**

- **All selectors** defined in SELECTORS constants
- **Changes** require updates in only one place
- **Consistency** across all page objects

### 🔧 **Centralized Logic**

- **Complex locator creation** handled by factory methods
- **Product-specific patterns** encapsulated in factory
- **Reusable utilities** for common elements (AI Pro checkbox, download links)

### 📈 **Maintainability**

- **Selector updates** centralized in factory
- **New products** follow established patterns
- **Clear organization** with dedicated factory class

## Current Locator Patterns by Product

### IntelliJ IDEA Patterns

```typescript
// ✅ Clean data-test attributes
'[data-test="product-card-II-Commercial"]'; // IDEA Ultimate card
'[data-test="product-card-AP-Commercial"]'; // All Products Pack card
'[data-test="billing-term-switcher"]'; // Billing switcher
```

### RustRover Patterns

```typescript
// ✅ Structural selectors where necessary (due to DOM structure)
const rustRoverCards = page.locator('div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div');
const nonCommercialCard = rustRoverCards.nth(0); // First card
const commercialCard = rustRoverCards.nth(1); // Second card

// ✅ Specific data-test for unique elements
('[data-test="billing-type-radio-group"]'); // RustRover billing options
```

### CLion Patterns

```typescript
// ✅ Product-specific data-test attributes
'[data-test="non-commercial-product-buy-card-CLion-Non-Commercial"]';
'[data-test="product-card-CL-Personal"]';
'[data-test="product-card-AP-Personal"]';
'[data-test="download-button"]';
```

## Constants Management Integration

### 🗂️ **BuyPageConstants.ts Integration**

```typescript
// UI text constants for validation
export const UI_TEXT = {
  BUY_BUTTON: 'Buy',
  GET_QUOTE_BUTTON: 'Get quote',
  DOWNLOAD_BUTTON: 'Download',
} as const;

// Aria snapshot filenames
export const ARIA_SNAPSHOTS = {
  IDEA_COMMON_TIER_SWITCHER: 'idea-common-tier-switcher.aria.yml',
  RUSTROVER_BILLING_TYPE_RADIO_GROUP: 'rustrover-billing-type-radio-group.aria.yml',
  CLION_BILLING_TERM_SWITCHER: 'clion-billing-term-switcher.aria.yml',
} as const;
```

### ✅ **Usage with Locator Factory**

```typescript
// Locator from factory + Constants for validation
const buyButton = ideaLocators.ideaUltimateCard.getByRole('link', {
  name: buyPageConstants.UI_TEXT.BUY_BUTTON,
});

// Aria snapshot validation with constants
await this.validateAriaSnapshot(
  this.tierSwitcher,
  buyPageConstants.ARIA_SNAPSHOTS.IDEA_COMMON_TIER_SWITCHER
);
```

## Best Practices with Current Architecture

### ✅ **DO (Current Implementation)**

#### Use Centralized Locator Factory

```typescript
// ✅ CORRECT - All locators from factory
export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.locatorFactory = new buyPageLocatorFactory.Locators(page);
    const locators = this.locatorFactory.createProductLocators();
    this.mainCard = locators.mainCard; // From factory
  }
}
```

#### Use SELECTORS Constants

```typescript
// ✅ CORRECT - All selectors in constants
export const SELECTORS = {
  TIER_SWITCHER: '[data-test="adaptive-switcher__switcher"]',
  PRODUCT_CARD: '[data-test^="product-card-"]'
} as const;

// Usage in factory
createTierSwitcher(): Locator {
  return this.page.locator(SELECTORS.TIER_SWITCHER);
}
```

#### Document Selector Rationale

```typescript
// ✅ CORRECT - Document why specific selectors are used
createRustRoverLocators() {
  // Using nth-child pattern due to RustRover DOM structure - no unique test-ids available
  const cards = this.page.locator('div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div');
  return {
    nonCommercialCard: cards.nth(0),  // First card position stable
    commercialCard: cards.nth(1)      // Second card position stable
  };
}
```

### ❌ **DON'T (Anti-patterns)**

#### Don't Scatter Locators Across Files

```typescript
// ❌ BAD - Locators in multiple places
export class ProductPage {
  constructor(page: Page) {
    this.card1 = page.locator('[data-test="card-1"]'); // Scattered
    this.card2 = page.locator('[data-test="card-2"]'); // Scattered
  }
}
```

#### Don't Hardcode Selectors

```typescript
// ❌ BAD - Hardcoded selectors
const button = page.locator('[data-test="some-button"]'); // Should be in SELECTORS

// ✅ CORRECT - Use constants
const button = page.locator(SELECTORS.SOME_BUTTON);
```

#### Don't Create Complex Selectors Without Documentation

```typescript
// ❌ BAD - Complex selector without explanation
page.locator('div > section:nth-child(3) > div.card > button:first-child');

// ✅ CORRECT - Document complex patterns
// Using complex selector due to no test-ids - validated with product team as stable
page.locator(SELECTORS.COMPLEX_BUTTON_PATTERN);
```

## Migration Strategy

### Current State: Factory Pattern ✅ COMPLETE

- [x] **Centralized locator management** via BuyPageLocatorFactory
- [x] **SELECTORS constants** for all CSS selectors
- [x] **Product-specific factory methods** (createIdeaLocators, etc.)
- [x] **Utility methods** for complex locators (createAiProCheckbox)
- [x] **Single source of truth** for all locator logic

### Phase 1: Gradual Semantic Enhancement (FUTURE)

When dev team collaboration becomes available:

1. **Replace factory selectors** with semantic equivalents
2. **Maintain factory structure** but upgrade selectors
3. **Test semantic changes** incrementally
4. **Document improvements** in factory methods

### Phase 2: Full Semantic Implementation (FUTURE)

- **Enhanced factory methods** using semantic locators
- **Accessibility testing** integration
- **Performance improvements** from semantic queries

## Ideal Locator Strategy (Future Goal)

### 🥇 **Tier 1: Semantic Role-Based Locators (FUTURE GOAL)**

```typescript
// 🎯 IDEAL - When dev team collaboration becomes available
page.getByRole('button', { name: 'Buy Now' });
page.getByRole('heading', { level: 1 });
page.getByRole('article'); // for product cards
page.getByRole('navigation');
page.getByRole('main');
```

**When to use:** When you have dev team access to ensure proper semantic HTML structure.

### 🥈 **Tier 2: Test-Specific Locators (FUTURE GOAL)**

```typescript
// 🎯 IDEAL - When dev team can add test-ids
page.getByTestId('product-card-idea-ultimate');
page.getByTestId('billing-switcher');
page.getByTestId('tier-selector');
```

**When to use:** When dev team can add dedicated test-ids to the application.

## Troubleshooting Current Architecture

### When Selectors Break

1. **Check SELECTORS constants** - update centralized definitions
2. **Update factory methods** - modify creation logic if needed
3. **Test all products** - ensure changes don't break other implementations
4. **Document changes** - update comments explaining new patterns

### Debugging Factory Issues

```typescript
// Add debugging to factory methods
createIdeaLocators() {
  const locators = {
    tierSwitcher: this.page.locator(SELECTORS.TIER_SWITCHER),
    ideaCard: this.page.locator('[data-test="product-card-II-Commercial"]')
  };

  // Add debugging context
  console.log('IDEA locators created:', Object.keys(locators));
  return locators;
}
```

## Integration with Constants

### Locator Factory + Constants Pattern

```typescript
// BuyPageLocatorFactory.ts - Locator creation
export class Locators {
  createAiProCheckbox(parentCard: Locator): Locator {
    return parentCard.locator(SELECTORS.AI_PRO_CHECKBOX);
  }
}

// BuyPageConstants.ts - UI text validation
export const UI_TEXT = {
  AI_PRO_LABEL: 'Supercharge with JetBrains AI Pro',
} as const;

// Usage in page objects
const checkbox = this.locatorFactory.createAiProCheckbox(this.ideaCard);
await expect(checkbox).toHaveText(buyPageConstants.UI_TEXT.AI_PRO_LABEL);
```

## Team Communication About Architecture

### With Stakeholders

- **Explain benefits**: "Centralized locator management ensures easy maintenance"
- **Show quality**: "Single source of truth prevents duplication and errors"
- **Plan improvements**: "Ready to upgrade to semantic locators when dev access available"

### Documentation Standards

```typescript
// Always document factory method purposes
/**
 * Creates locators specific to RustRover buy page
 * Uses nth-child pattern due to DOM structure limitations
 * @returns Object with all RustRover-specific locators
 */
createRustRoverLocators() {
  // Implementation with comments explaining patterns
}
```

## Working with Current Environment Constraints

### ⚠️ **Environment Reality**

- No access to development team for adding test-ids
- No ability to improve semantic HTML structure
- Must work with existing DOM structure
- Stability and working tests prioritized over ideal practices

### 🔧 **Current Working Selectors**

```typescript
// ✅ WORKING - Current implementation due to environment constraints
page.locator('[data-test="adaptive-switcher__switcher"]');
page.locator('[data-test^="product-card-"]');
page.locator('div.wt-row.wt-row_align-items_stretch.wt-row_size_m > div').nth(0);
page.locator('[data-test="non-commercial-product-buy-card-CLion-Commercial"]');
```

**Why we use these:** These selectors work in our current environment and are managed through the centralized factory pattern.

````

**When to use:** When the content is stable and business-meaningful.

### 🚫 **Tier 4: Structural Locators (AVOID)**

```typescript
// ❌ FRAGILE - Avoid these
page.locator('.product-card:nth-child(2)');
page.locator('div > span:nth-child(4) > a');
page.locator('#pricing-section .btn-primary');
````

**When to use:** Only as an absolute last resort when no other option works.

## Best Practices

### ✅ **DO**

#### Use Semantic Combinations

```typescript
// Combine semantic locators for precision
const productCard = page
  .getByRole('article')
  .filter({ has: page.getByText('IntelliJ IDEA Ultimate') });
const buyButton = productCard.getByRole('button', { name: 'Buy' });
```

#### Use Meaningful Variable Names

```typescript
// Clear intent and purpose
const subscriptionTierSelector = page.getByRole('radiogroup', { name: 'Pricing Tier' });
const monthlyBillingOption = page.getByRole('radio', { name: 'Monthly billing' });
```

#### Filter with Semantic Context

```typescript
// Use business context to filter
const commercialPricingCard = page
  .getByRole('article')
  .filter({ has: page.getByText('For Organizations') });
```

### ❌ **DON'T**

#### Don't Use Brittle CSS Selectors

```typescript
// ❌ BAD - Will break with UI changes
page.locator('div:nth-child(4) > a');
page.locator('.pricing-card .btn:first-child');
```

#### Don't Use Implementation Details

```typescript
// ❌ BAD - Couples tests to implementation
page.locator('[class*="ProductCard_container"]');
page.locator('[data-component="PricingWidget"]');
```

#### Don't Use Invisible Content

```typescript
// ❌ BAD - Not accessible to users
page.locator('[aria-hidden="true"]');
page.locator('.sr-only'); // screen reader only content
```

## Common Patterns

### Product Cards

```typescript
// Pattern for finding specific product cards
const findProductCard = (productName: string) =>
  page.getByRole('article').filter({
    has: page.getByText(productName),
  });

// Usage
const ideaCard = findProductCard('IntelliJ IDEA Ultimate');
const buyButton = ideaCard.getByRole('button', { name: 'Buy' });
```

### Form Interactions

```typescript
// Clear form field identification
const emailField = page.getByLabel('Email address');
const subscriptionType = page.getByRole('combobox', { name: 'Subscription type' });
const agreeCheckbox = page.getByRole('checkbox', { name: 'I agree to terms' });
```

### Navigation Elements

```typescript
// Semantic navigation
const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
const breadcrumbs = page.getByRole('navigation', { name: 'Breadcrumb' });
const pagination = page.getByRole('navigation', { name: 'Pagination' });
```

## Working with Developers

### Request Test IDs for Complex Cases

When semantic locators aren't sufficient, request specific test IDs:

```typescript
// Request from developers
<button data-testid="add-to-cart-idea-ultimate">Buy IntelliJ IDEA</button>
<div data-testid="pricing-calculator">...</div>
```

### Advocate for Accessibility

Help developers improve accessibility by using semantic locators:

```typescript
// This test will fail if accessibility is poor
const submitButton = page.getByRole('button', { name: 'Submit order' });
// Forces developers to ensure proper button roles and accessible names
```

## Error Handling

### Provide Context in Failures

```typescript
async findProductCard(productName: string): Promise<Locator> {
  const card = page.getByRole('article')
    .filter({ has: page.getByText(productName) });

  // Add helpful error context
  await expect(card,
    `Could not find product card for "${productName}". Available products: ${await this.getAvailableProducts()}`
  ).toBeVisible();

  return card;
}
```

### Handle Multiple Matches Gracefully

```typescript
// Be specific when multiple elements might match
const primaryBuyButton = page.getByRole('button', { name: 'Buy' }).first(); // or .last() or .nth(index)

// Better: be more specific
const ideaBuyButton = page
  .getByRole('article')
  .filter({ has: page.getByText('IntelliJ IDEA') })
  .getByRole('button', { name: 'Buy' });
```

## Migration Strategy

### Phase 1: New Code

- All new page objects must use Tier 1-2 locators
- No new CSS selectors without architectural approval

### Phase 2: Legacy Updates

- Replace brittle selectors during regular maintenance
- Prioritize high-failure rate selectors
- Update one page object at a time

### Phase 3: Developer Collaboration

- Regular reviews with development team
- Request test-ids for complex components
- Share accessibility improvements from test feedback

## Tools and Resources

### Playwright Locator Generator

```bash
# Generate locators interactively
npx playwright codegen <url>
```

### Accessibility Inspector

Use browser dev tools to understand accessible names and roles.

### Testing Playground

Validate locator strategies: https://testing-playground.com/
