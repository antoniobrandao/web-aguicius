import type { z } from "zod";

import { telHref } from "./adapters";
import { itemsOf, linkOf, settingOf, textOf, type Blocks } from "./blocks";
import {
  locationsSchema,
  servicesSchema,
  settingsSchema,
  valuesSchema,
  type LocationContent,
  type ServiceContent,
  type ValueContent,
} from "./resources";
import type { Cta, SectionIntro, SiteSettings } from "./types";

// Block values this site reads in more than one place: section intros, and the
// business content a block is bound to (a `setting` or a `collection` field of
// casadigital.blocks.json).
//
// Bound content is served by GET /api/v1/blocks exactly as the resource's own
// endpoint returns it, so it goes through the same Zod mirror as the direct
// read. Every reader answers undefined when the block does not serve the field
// (not synced yet, read failed, unexpected shape), and the caller then uses the
// resource it read itself. An empty array is different: the owner chose to show
// nothing there.

function boundCollection<Schema extends z.ZodType<unknown[]>>(
  blocks: Blocks,
  key: string,
  id: string,
  schema: Schema,
): z.infer<Schema> | undefined {
  const served = itemsOf<unknown>(blocks, key, id);
  if (!served) return undefined;

  const parsed = schema.safeParse(served);
  return parsed.success ? parsed.data : undefined;
}

export function boundServices(blocks: Blocks, key: string, id: string): ServiceContent[] | undefined {
  return boundCollection(blocks, key, id, servicesSchema);
}

export function boundLocations(blocks: Blocks, key: string, id: string): LocationContent[] | undefined {
  return boundCollection(blocks, key, id, locationsSchema);
}

export function boundValues(blocks: Blocks, key: string, id: string): ValueContent[] | undefined {
  return boundCollection(blocks, key, id, valuesSchema);
}

/**
 * The business settings as one block shows them. A block declares a `setting`
 * field under the same id everywhere on this site (`phone`, `email`, `name`,
 * `description`, `app`, `facebook`, `instagram`, `youtube`, `schedule`); each one
 * the block serves replaces the value read from /api/v1/settings, and the rest
 * are left as they were.
 */
export function boundSite(site: SiteSettings, blocks: Blocks, key: string): SiteSettings {
  const setting = (id: string, current: string) => settingOf(blocks, key, id) ?? current;
  const phone = setting("phone", site.phone);
  const schedule = settingsSchema.shape.schedule.safeParse(itemsOf<unknown>(blocks, key, "schedule"));

  return {
    ...site,
    name: setting("name", site.name),
    description: setting("description", site.description),
    email: setting("email", site.email),
    app: setting("app", site.app),
    phone,
    phoneHref: telHref(phone),
    social: {
      ...site.social,
      facebook: setting("facebook", site.social.facebook),
      instagram: setting("instagram", site.social.instagram),
      youtube: setting("youtube", site.social.youtube),
    },
    schedule: schedule.success && schedule.data.length ? schedule.data : site.schedule,
  };
}

/** A section's `eyebrow`, `title` and `description` fields, each falling back to this site's copy. */
export function introOf(blocks: Blocks, key: string, fallback: SectionIntro): Required<SectionIntro> {
  return {
    eyebrow: textOf(blocks, key, "eyebrow", fallback.eyebrow ?? ""),
    title: textOf(blocks, key, "title", fallback.title),
    description: textOf(blocks, key, "description", fallback.description ?? ""),
  };
}

/** A call-to-action band's fields (`title`, `description`, `primary`, `secondary`). */
export function ctaBandOf(
  blocks: Blocks,
  key: string,
  fallback: { title: string; description: string; primary: Cta; secondary: Cta },
) {
  return {
    title: textOf(blocks, key, "title", fallback.title),
    description: textOf(blocks, key, "description", fallback.description),
    primary: linkOf(blocks, key, "primary", fallback.primary),
    secondary: linkOf(blocks, key, "secondary", fallback.secondary),
  };
}

/** One text of a saved list item; empty when the owner left it blank. */
export function itemText(item: unknown, id: string): string {
  const value = item && typeof item === "object" ? (item as Record<string, unknown>)[id] : undefined;
  return typeof value === "string" && value.trim() ? value : "";
}

/** The link `id` of a saved list item, or undefined unless both its label and target are filled. */
export function itemLink(item: unknown, id: string): Cta | undefined {
  const value = item && typeof item === "object" ? (item as Record<string, unknown>)[id] : undefined;
  if (!value || typeof value !== "object") return undefined;

  const { label, href } = value as { label?: unknown; href?: unknown };
  return typeof label === "string" && label.trim() && typeof href === "string" && href.trim()
    ? { label, href }
    : undefined;
}
