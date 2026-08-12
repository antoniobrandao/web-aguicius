// Content vocabulary shared with the casadigital Site API contract. Keep these in
// step with GET /api/content-schema; nothing else here is platform state.

export const CONTENT_ICON_KEYS = [
  "truck",
  "wrench",
  "packageCheck",
  "hammer",
  "boxes",
  "warehouse",
  "arrowDownToLine",
  "zap",
  "clock",
  "shieldCheck",
] as const;

export const SERVICE_TIERS = ["primary", "featured", "secondary"] as const;

export const PAGE_KEYS = [
  "home",
  "about",
  "services",
  "contact",
  "quote",
  "terms",
  "privacy",
] as const;

export type ContentIconKey = (typeof CONTENT_ICON_KEYS)[number];
export type ServiceTier = (typeof SERVICE_TIERS)[number];
export type PageKey = (typeof PAGE_KEYS)[number];
