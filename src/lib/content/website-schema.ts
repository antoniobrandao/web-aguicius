import { z } from "zod";

import { CONTENT_ICON_KEYS, SERVICE_TIERS } from "./constants";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const emptyableUrlSchema = z.union([z.string().url(), z.literal("")]);
const emptyableEmailSchema = z.union([z.string().email(), z.literal("")]);

const pageHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const contentIconSchema = z.enum(CONTENT_ICON_KEYS);

export const websiteContentSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    phone: z.string(),
    phoneHref: z.string(),
    email: emptyableEmailSchema,
    whatsapp: emptyableUrlSchema,
    appUrl: emptyableUrlSchema,
    schedule: z.array(
      z.object({
        days: z.string().min(1),
        hours: z.string().min(1),
      }),
    ),
    social: z.object({
      facebook: emptyableUrlSchema,
      instagram: emptyableUrlSchema,
      youtube: emptyableUrlSchema,
    }),
    seo: z.object({
      metadataBase: z.string().url(),
      defaultTitle: z.string().min(1),
      titleTemplate: z.string().min(1),
      defaultDescription: z.string().min(1),
    }),
  }),
  navigation: z.object({
    header: z.array(linkSchema.extend({ cta: z.boolean().optional() })),
    footerCompany: z.array(linkSchema),
  }),
  services: z.array(
    z.object({
      slug: z.string().regex(/^[a-z0-9][a-z0-9-_]*$/),
      title: z.string().min(1),
      icon: contentIconSchema,
      image: z
        .object({
          assetId: z.string().optional(),
          pathname: z.string().optional(),
          alt: z.string().min(1),
          width: z.number().int().positive().optional(),
          height: z.number().int().positive().optional(),
        })
        .optional(),
      tier: z.enum(SERVICE_TIERS),
      short: z.string().min(1),
      description: z.string().min(1),
      bullets: z.array(z.string().min(1)).optional(),
    }),
  ),
  values: z.array(
    z.object({
      slug: z.string().regex(/^[a-z0-9][a-z0-9-_]*$/),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  locations: z.array(
    z.object({
      slug: z.string().regex(/^[a-z0-9][a-z0-9-_]*$/),
      city: z.string().min(1),
      lines: z.array(z.string().min(1)),
      mapsSearchUrl: z.string().url().optional(),
      mapEmbedUrl: z.string().url().optional(),
      primary: z.boolean().optional(),
    }),
  ),
  pages: z.object({
    home: z.object({
      hero: z.object({
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        highlight: z.string().min(1),
        description: z.string().min(1),
        primaryCta: ctaSchema,
        secondaryCta: ctaSchema,
        stats: z.array(
          z.object({
            value: z.string().min(1),
            label: z.string().min(1),
          }),
        ),
      }),
      servicesIntro: pageHeroSchema.pick({
        eyebrow: true,
        title: true,
        description: true,
      }),
      reserveCta: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        button: ctaSchema,
      }),
      installations: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        button: ctaSchema,
        highlights: z.array(z.string().min(1)),
      }),
      moreServicesIntro: pageHeroSchema.pick({
        eyebrow: true,
        title: true,
        description: true,
      }),
      aboutBand: z.object({
        statValue: z.string().min(1),
        statLabel: z.string().min(1),
        lead: z.string().min(1),
        body: z.string().min(1),
        cta: ctaSchema,
      }),
      locationIntro: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    }),
    about: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      story: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
      locationsIntro: pageHeroSchema.pick({
        eyebrow: true,
        title: true,
        description: true,
      }),
      valuesIntro: pageHeroSchema.pick({ eyebrow: true, title: true }),
      ctaBand: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        primary: ctaSchema,
        secondary: ctaSchema,
      }),
    }),
    services: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      secondaryIntro: pageHeroSchema.pick({
        eyebrow: true,
        title: true,
        description: true,
      }),
      ctaBand: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        primary: ctaSchema,
        secondary: ctaSchema,
      }),
    }),
    contact: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      formIntro: pageHeroSchema.pick({
        eyebrow: true,
        title: true,
        description: true,
      }),
    }),
    quote: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      perks: z.array(
        z.object({
          icon: contentIconSchema,
          title: z.string().min(1),
          description: z.string().min(1),
        }),
      ),
      sidebarHeading: z.string().min(1),
    }),
    terms: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      sections: z.array(
        z.object({
          title: z.string().min(1),
          body: z.string().min(1),
        }),
      ),
    }),
    privacy: z.object({
      seo: seoSchema,
      hero: pageHeroSchema,
      sections: z.array(
        z.object({
          title: z.string().min(1),
          body: z.string().min(1),
        }),
      ),
    }),
  }),
});

export type WebsiteContent = z.infer<typeof websiteContentSchema>;
export type WebsiteService = WebsiteContent["services"][number];
export type WebsiteLocation = WebsiteContent["locations"][number];
export type WebsiteValue = WebsiteContent["values"][number];
