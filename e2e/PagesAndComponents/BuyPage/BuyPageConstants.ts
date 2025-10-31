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

// Billing and Tier Labels
export const BILLING_LABELS = ['Monthly billing', 'Yearly billing'] as const;
export const TIER_LABELS = ['For Individual Use', 'For Organizations'] as const;

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
