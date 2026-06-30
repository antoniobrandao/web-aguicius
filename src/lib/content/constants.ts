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

export const SITE_STATUSES = ["draft", "active", "archived"] as const;

export const LEAD_STATUSES = ["new", "contacted", "archived"] as const;

export type ContentIconKey = (typeof CONTENT_ICON_KEYS)[number];
export type ServiceTier = (typeof SERVICE_TIERS)[number];
export type PageKey = (typeof PAGE_KEYS)[number];
export type SiteStatus = (typeof SITE_STATUSES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
