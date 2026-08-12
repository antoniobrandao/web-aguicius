// One cache tag per Site API resource, so a change to one resource does not
// invalidate the rest. The backoffice pushes the tag names it changed to
// POST /api/revalidate after a save.

export const CONTENT_TAGS = [
  "settings",
  "services",
  "locations",
  "values",
  "legal",
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

export function isContentTag(value: unknown): value is ContentTag {
  return typeof value === "string" && CONTENT_TAGS.includes(value as ContentTag);
}
