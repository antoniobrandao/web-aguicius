import type { PageKey } from "./constants";

// One cache tag per Site API resource, so a change to one resource does not
// invalidate the rest. The backoffice pushes the tag names it changed to
// POST /api/revalidate after a save.

export const CONTENT_TAGS = [
  "settings",
  "navigation",
  "services",
  "locations",
  "values",
  "pages",
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

export function isContentTag(value: unknown): value is ContentTag {
  return typeof value === "string" && CONTENT_TAGS.includes(value as ContentTag);
}

// Pages carry both the shared "pages" tag and a per-page tag, so the backoffice
// can invalidate every page at once while a single page can still be targeted.
export function pageTag(pageKey: PageKey) {
  return `page:${pageKey}` as const;
}
