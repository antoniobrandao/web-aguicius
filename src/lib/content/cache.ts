// One cache tag per Site API resource, so a change to one resource does not
// invalidate the rest. The backoffice pushes the tag names it changed to
// POST /api/revalidate after a save.
//
// Every resource name the contract defines belongs here, including the ones this
// site does not read yet: the receiver rejects an unknown tag with a 400, so a
// missing name turns a save on the platform into a failed push.

export const CONTENT_TAGS = [
  "settings",
  "services",
  "products",
  "projects",
  "locations",
  "values",
  "legal",
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

export function isContentTag(value: unknown): value is ContentTag {
  return typeof value === "string" && CONTENT_TAGS.includes(value as ContentTag);
}
