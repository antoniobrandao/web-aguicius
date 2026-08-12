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

// The only page-shaped content the platform holds. This site's pages, their copy
// and their metadata live in this repository.
export const LEGAL_DOCUMENT_KEYS = ["terms", "privacy"] as const;

export type ContentIconKey = (typeof CONTENT_ICON_KEYS)[number];
export type ServiceTier = (typeof SERVICE_TIERS)[number];
export type LegalDocumentKey = (typeof LEGAL_DOCUMENT_KEYS)[number];
