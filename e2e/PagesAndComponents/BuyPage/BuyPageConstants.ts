// Product Card Titles
export const PRODUCT_CARD_TITLES = {
  INTELLIJ_IDEA_ULTIMATE: 'IntelliJ IDEA Ultimate',
  RUSTROVER_NON_COMMERCIAL: 'RustRover non-commercial use',
  RUSTROVER_COMMERCIAL: 'RustRover',
  CLION_NON_COMMERCIAL: 'CLion Non-Commercial',
  CLION_COMMERCIAL: 'CLion Commercial',
  RUST_PLUGIN: 'Rust Plugin',
  ALL_PRODUCTS_PACK: 'All Products Pack',
} as const;

// Product Codes for item code generation
export const PRODUCT_CODES = {
  INTELLIJ_IDEA: 'II',
  RUSTROVER: 'RR',
  CLION: 'CL',
  ALL_PRODUCTS_PACK: 'ALL',
} as const;

// Billing and Tier Labels
export const BILLING_LABELS = ['Monthly billing', 'Yearly billing'] as const;
export const TIER_LABELS = ['For Individual Use', 'For Organizations'] as const;

// Common UI Text
export const UI_TEXT = {
  AI_PRO_CHECKBOX: 'Supercharge with JetBrains AI Pro',
  FULL_SUITE_LINK: 'full suite',
  BUY_BUTTON: 'Buy',
  GET_QUOTE_BUTTON: 'Get quote',
} as const;

// Tier Types
export const TIER_TYPES = {
  COMMERCIAL: 'commercial',
  PERSONAL: 'personal',
} as const;

// Billing Terms
export const BILLING_TERMS = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

// Aria Snapshot File Names
export const ARIA_SNAPSHOTS = {
  // IDEA aria snapshots
  IDEA_COMMON_TIER_SWITCHER: 'idea-common-tier-switcher.aria.yml',
  IDEA_BILLING_TERM_SWITCHER: 'idea-billing-term-switcher.aria.yml',

  // RustRover aria snapshots
  RUSTROVER_COMMON_TIER_SWITCHER: 'rustrover-common-tier-switcher.aria.yml',
  RUSTROVER_BILLING_TYPE_RADIO_GROUP: 'rustrover-billing-type-radio-group.aria.yml',

  // CLion aria snapshots
  CLION_BILLING_TERM_SWITCHER: 'clion-billing-term-switcher.aria.yml',
  CLION_COMMERCIAL_PRODUCT_CARD_TIER_SWITCHER:
    'clion-commercial-product-card-tier-switcher.aria.yml',
} as const;
