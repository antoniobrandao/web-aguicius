import { z } from "zod";

import { CONTENT_ICON_KEYS, PAGE_KEYS, SERVICE_TIERS } from "./constants";

// Mirror of the casadigital Site API resource contract (JSON Schema available at
// GET /api/content-schema). The platform owns design-agnostic business data only;
// this site's layout and section copy live in src/content/design-copy.ts.
//
// Every field is optional or defaulted, which is deliberate: a site whose content
// has not been authored yet must still validate and render an empty state.

const linkSchema = z.object({
  label: z.string().default(""),
  href: z.string().default(""),
  cta: z.boolean().optional(),
});

export const settingsSchema = z.object({
  name: z.string().default(""),
  tagline: z.string().default(""),
  description: z.string().default(""),
  phone: z.string().default(""),
  phoneHref: z.string().default(""),
  email: z.string().default(""),
  whatsapp: z.string().default(""),
  appUrl: z.string().default(""),
  schedule: z
    .array(
      z.object({
        days: z.string().default(""),
        hours: z.string().default(""),
      }),
    )
    .default([]),
  social: z
    .object({
      facebook: z.string().default(""),
      instagram: z.string().default(""),
      linkedin: z.string().default(""),
      x: z.string().default(""),
      youtube: z.string().default(""),
    })
    .prefault({}),
  seo: z
    .object({
      metadataBase: z.string().default(""),
      defaultTitle: z.string().default(""),
      titleTemplate: z.string().default(""),
      defaultDescription: z.string().default(""),
    })
    .prefault({}),
});

export const navigationSchema = z.object({
  header: z.array(linkSchema).default([]),
  footerCompany: z.array(linkSchema).default([]),
});

export const serviceSchema = z.object({
  slug: z.string(),
  title: z.string().default(""),
  icon: z.enum(CONTENT_ICON_KEYS),
  image: z
    .object({
      assetId: z.string().optional(),
      pathname: z.string().default(""),
      alt: z.string().default(""),
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
    })
    .optional(),
  tier: z.enum(SERVICE_TIERS),
  short: z.string().default(""),
  description: z.string().default(""),
  bullets: z.array(z.string()).default([]),
});

// Map URLs are authored in the dashboard and end up in an iframe src and an
// anchor href, so they are constrained to known map providers rather than
// trusted as-is. Anything else is dropped to an empty string, which the
// components already treat as "no map".
const MAP_URL_HOSTS = ["google.com", "www.google.com", "maps.google.com", "maps.app.goo.gl"];

const mapUrlSchema = z
  .string()
  .default("")
  .transform((value) => {
    if (!value) return "";

    let url: URL;
    try {
      url = new URL(value);
    } catch {
      console.error(`[content] Ignoring malformed map URL: ${value}`);
      return "";
    }

    if (url.protocol !== "https:" || !MAP_URL_HOSTS.includes(url.hostname)) {
      console.error(`[content] Ignoring map URL from an unexpected host: ${value}`);
      return "";
    }

    return url.toString();
  });

export const locationSchema = z.object({
  slug: z.string(),
  city: z.string().default(""),
  lines: z.array(z.string()).default([]),
  mapsSearchUrl: mapUrlSchema,
  mapEmbedUrl: mapUrlSchema,
  primary: z.boolean().default(false),
});

export const valueSchema = z.object({
  slug: z.string(),
  title: z.string().default(""),
  description: z.string().default(""),
});

export const pageSchema = z.object({
  seo: z
    .object({
      title: z.string().default(""),
      description: z.string().default(""),
    })
    .prefault({}),
  hero: z
    .object({
      eyebrow: z.string().default(""),
      title: z.string().default(""),
      description: z.string().default(""),
    })
    .prefault({}),
  sections: z
    .array(
      z.object({
        title: z.string().default(""),
        body: z.string().default(""),
      }),
    )
    .default([]),
});

export const servicesSchema = z.array(serviceSchema);
export const locationsSchema = z.array(locationSchema);
export const valuesSchema = z.array(valueSchema);

export type Settings = z.infer<typeof settingsSchema>;
export type Navigation = z.infer<typeof navigationSchema>;
export type ServiceContent = z.infer<typeof serviceSchema>;
export type LocationContent = z.infer<typeof locationSchema>;
export type ValueContent = z.infer<typeof valueSchema>;
export type PageContent = z.infer<typeof pageSchema>;
export type PageKey = (typeof PAGE_KEYS)[number];

// Safe empty values for a site whose content has not been authored yet, or when
// the platform is unreachable. Parsing an empty object fills every default.
export const emptySettings = (): Settings => settingsSchema.parse({});
export const emptyNavigation = (): Navigation => navigationSchema.parse({});
export const emptyPage = (): PageContent => pageSchema.parse({});
