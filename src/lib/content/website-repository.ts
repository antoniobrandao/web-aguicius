import { ObjectId } from "mongodb";
import type { Types } from "mongoose";

import { defaultWebsiteContent } from "@/content/default-website";
import { connectMongoose } from "@/lib/mongoose/client";
import {
  AssetModel,
  LocationModel,
  NavigationModel,
  PageModel,
  ServiceModel,
  SiteModel,
  SiteSettingsModel,
  ValueModel,
  type PageDocument,
} from "@/lib/mongoose/models";

import { PAGE_KEYS } from "./constants";
import { websiteContentSchema, type WebsiteContent } from "./website-schema";
import type {
  AguiciusWebsiteContent,
  LoadedWebsiteContent,
} from "./website-types";

type SiteIdentity = {
  _id: Types.ObjectId;
  key: string;
  name: string;
  domain?: string;
  status?: "draft" | "active" | "archived";
};

type PageKey = (typeof PAGE_KEYS)[number];

export function getSiteKey() {
  return process.env.SITE_KEY ?? "aguicius_website";
}

function normalizeContent(data: unknown): AguiciusWebsiteContent {
  const parsed = websiteContentSchema.parse(data);

  return {
    ...parsed,
    services: parsed.services.map((service) => ({
      ...service,
      image:
        service.image && typeof service.image === "object"
          ? service.image
          : {
              alt: `${service.title} Aguicius`,
            },
    })),
  };
}

function toObjectId(value?: string) {
  return value && ObjectId.isValid(value) ? new ObjectId(value) : undefined;
}

function stringifyId(value: unknown) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value instanceof ObjectId) return value.toHexString();
  if (typeof value === "object" && "toString" in value) return String(value);
  return undefined;
}

function normalizeLocations(content: AguiciusWebsiteContent) {
  const firstPrimaryIndex = content.locations.findIndex(
    (location) => location.primary,
  );
  const primaryIndex = firstPrimaryIndex >= 0 ? firstPrimaryIndex : 0;

  return content.locations.map((location, index) => ({
    ...location,
    primary: index === primaryIndex,
    order: index,
  }));
}

function decomposePage(pageKey: PageKey, page: unknown) {
  if (pageKey === "home" || typeof page !== "object" || page === null) {
    return {
      seo: undefined,
      hero: undefined,
      content: page,
    };
  }

  const { seo, hero, ...content } = page as Record<string, unknown>;

  return {
    seo,
    hero,
    content,
  };
}

function composePage(page: PageDocument) {
  if (page.pageKey === "home") {
    return page.content;
  }

  return {
    seo: page.seo,
    hero: page.hero,
    ...(page.content as Record<string, unknown>),
  };
}

export async function resolveSite(): Promise<SiteIdentity> {
  await connectMongoose();
  const site = await SiteModel.findOne({ key: getSiteKey() }).lean<SiteIdentity>();

  if (!site) {
    throw new Error(`Site "${getSiteKey()}" was not found.`);
  }

  return site;
}

async function upsertSite(content: AguiciusWebsiteContent) {
  await connectMongoose();
  const key = getSiteKey();
  const metadataBase = content.site.seo.metadataBase;
  const domain = metadataBase ? new URL(metadataBase).hostname : undefined;

  await SiteModel.updateOne(
    { key },
    {
      $set: {
        key,
        name: content.site.name,
        domain,
        status: "active",
      },
    },
    { upsert: true },
  );

  return resolveSite();
}

async function ensureSiteFromSettings(siteSettings: WebsiteContent["site"]) {
  await connectMongoose();
  const key = getSiteKey();
  const domain = siteSettings.seo.metadataBase
    ? new URL(siteSettings.seo.metadataBase).hostname
    : undefined;

  await SiteModel.updateOne(
    { key },
    {
      $set: {
        key,
        name: siteSettings.name,
        domain,
        status: "active",
      },
    },
    { upsert: true },
  );

  return resolveSite();
}

async function replaceNormalizedWebsiteContent(
  content: AguiciusWebsiteContent,
) {
  const parsed = normalizeContent(content);
  const site = await upsertSite(parsed);
  const siteId = site._id;

  await SiteSettingsModel.updateOne(
    { siteId },
    {
      $set: {
        siteId,
        ...parsed.site,
      },
    },
    { upsert: true },
  );

  await NavigationModel.updateOne(
    { siteId },
    {
      $set: {
        siteId,
        header: parsed.navigation.header.map((link, order) => ({
          ...link,
          order,
        })),
        footerCompany: parsed.navigation.footerCompany.map((link, order) => ({
          ...link,
          order,
        })),
      },
    },
    { upsert: true },
  );

  const locations = normalizeLocations(parsed);
  await Promise.all(
    locations.map((location) =>
      LocationModel.updateOne(
        { siteId, slug: location.slug },
        { $set: { siteId, ...location } },
        { upsert: true },
      ),
    ),
  );
  await LocationModel.deleteMany({
    siteId,
    slug: { $nin: locations.map((location) => location.slug) },
  });

  await Promise.all(
    parsed.services.map(async (service, order) => {
      const assetId = toObjectId(service.image?.assetId);
      if (service.image?.pathname) {
        await AssetModel.updateOne(
          { siteId, pathname: service.image.pathname },
          {
            $set: {
              siteId,
              pathname: service.image.pathname,
              alt: service.image.alt,
              width: service.image.width,
              height: service.image.height,
              deletedAt: null,
            },
            $setOnInsert: {
              contentType: "image/*",
              size: 0,
            },
          },
          { upsert: true },
        );
      }

      return ServiceModel.updateOne(
        { siteId, slug: service.slug },
        {
          $set: {
            siteId,
            ...service,
            order,
            image: service.image
              ? {
                  ...service.image,
                  assetId,
                }
              : undefined,
          },
        },
        { upsert: true },
      );
    }),
  );
  await ServiceModel.deleteMany({
    siteId,
    slug: { $nin: parsed.services.map((service) => service.slug) },
  });

  await Promise.all(
    parsed.values.map((value, order) =>
      ValueModel.updateOne(
        { siteId, slug: value.slug },
        { $set: { siteId, ...value, order } },
        { upsert: true },
      ),
    ),
  );
  await ValueModel.deleteMany({
    siteId,
    slug: { $nin: parsed.values.map((value) => value.slug) },
  });

  await Promise.all(
    PAGE_KEYS.map((pageKey) => {
      const page = parsed.pages[pageKey];
      const decomposed = decomposePage(pageKey, page);

      return PageModel.updateOne(
        { siteId, pageKey },
        {
          $set: {
            siteId,
            pageKey,
            ...decomposed,
          },
        },
        { upsert: true },
      );
    }),
  );

  return parsed;
}

export async function saveWebsiteSettingsDocument(input: {
  site: WebsiteContent["site"];
  values: WebsiteContent["values"];
}) {
  const site = await ensureSiteFromSettings(input.site);
  const siteId = site._id;

  await SiteSettingsModel.updateOne(
    { siteId },
    { $set: { siteId, ...input.site } },
    { upsert: true },
  );

  await Promise.all(
    input.values.map((value, order) =>
      ValueModel.updateOne(
        { siteId, slug: value.slug },
        { $set: { siteId, ...value, order } },
        { upsert: true },
      ),
    ),
  );
  await ValueModel.deleteMany({
    siteId,
    slug: { $nin: input.values.map((value) => value.slug) },
  });
}

export async function saveNavigationDocument(
  navigation: WebsiteContent["navigation"],
) {
  const site = await resolveSite();
  const siteId = site._id;

  await NavigationModel.updateOne(
    { siteId },
    {
      $set: {
        siteId,
        header: navigation.header.map((link, order) => ({ ...link, order })),
        footerCompany: navigation.footerCompany.map((link, order) => ({
          ...link,
          order,
        })),
      },
    },
    { upsert: true },
  );
}

export async function savePageDocument(
  pageKey: PageKey,
  page: WebsiteContent["pages"][PageKey],
) {
  const site = await resolveSite();
  const decomposed = decomposePage(pageKey, page);

  await PageModel.updateOne(
    { siteId: site._id, pageKey },
    {
      $set: {
        siteId: site._id,
        pageKey,
        ...decomposed,
      },
    },
    { upsert: true },
  );
}

export async function saveLocationDocument(input: {
  originalSlug?: string;
  location: WebsiteContent["locations"][number];
}) {
  const site = await resolveSite();
  const siteId = site._id;
  const existing = input.originalSlug
    ? await LocationModel.findOne({ siteId, slug: input.originalSlug }).lean()
    : null;

  if (input.location.primary) {
    await LocationModel.updateMany({ siteId }, { $set: { primary: false } });
  }

  if (input.originalSlug && input.originalSlug !== input.location.slug) {
    await LocationModel.deleteOne({ siteId, slug: input.originalSlug });
  }

  const order =
    typeof existing?.order === "number"
      ? existing.order
      : await LocationModel.countDocuments({ siteId });

  await LocationModel.updateOne(
    { siteId, slug: input.location.slug },
    {
      $set: {
        siteId,
        ...input.location,
        order,
      },
    },
    { upsert: true },
  );
}

export async function deleteLocationDocument(slug: string) {
  const site = await resolveSite();
  await LocationModel.deleteOne({ siteId: site._id, slug });
}

export async function saveServiceDocument(input: {
  originalSlug?: string;
  service: WebsiteContent["services"][number];
}) {
  const site = await resolveSite();
  const siteId = site._id;
  const existing = input.originalSlug
    ? await ServiceModel.findOne({ siteId, slug: input.originalSlug }).lean()
    : null;

  if (input.originalSlug && input.originalSlug !== input.service.slug) {
    await ServiceModel.deleteOne({ siteId, slug: input.originalSlug });
  }

  const order =
    typeof existing?.order === "number"
      ? existing.order
      : await ServiceModel.countDocuments({ siteId });
  const assetId = toObjectId(input.service.image?.assetId);

  await ServiceModel.updateOne(
    { siteId, slug: input.service.slug },
    {
      $set: {
        siteId,
        ...input.service,
        order,
        image: input.service.image
          ? {
              ...input.service.image,
              assetId,
            }
          : undefined,
      },
    },
    { upsert: true },
  );
}

export async function deleteServiceDocument(slug: string) {
  const site = await resolveSite();
  await ServiceModel.deleteOne({ siteId: site._id, slug });
}

export async function seedDefaultWebsiteContent() {
  const content = await replaceNormalizedWebsiteContent(defaultWebsiteContent);
  return {
    content,
    source: "mongo" as const,
  };
}

export async function getLatestWebsiteContent(): Promise<LoadedWebsiteContent> {
  const site = await resolveSite();
  const siteId = site._id;

  const [
    settings,
    navigation,
    services,
    locations,
    values,
    pageDocuments,
  ] = await Promise.all([
    SiteSettingsModel.findOne({ siteId }).lean(),
    NavigationModel.findOne({ siteId }).lean(),
    ServiceModel.find({ siteId }).sort({ order: 1, createdAt: 1 }).lean(),
    LocationModel.find({ siteId }).sort({ order: 1, createdAt: 1 }).lean(),
    ValueModel.find({ siteId }).sort({ order: 1, createdAt: 1 }).lean(),
    PageModel.find({ siteId }).lean<PageDocument[]>(),
  ]);

  if (!settings || !navigation) {
    throw new Error(`Site "${site.key}" is missing normalized content.`);
  }

  const pagesByKey = new Map<PageKey, PageDocument>(
    pageDocuments.map((page) => [page.pageKey as PageKey, page]),
  );

  const pages = PAGE_KEYS.reduce((accumulator, pageKey) => {
    const page = pagesByKey.get(pageKey);
    return {
      ...accumulator,
      [pageKey]: page
        ? composePage(page)
        : defaultWebsiteContent.pages[pageKey],
    };
  }, {} as WebsiteContent["pages"]);

  const content = normalizeContent({
    site: {
      name: settings.name,
      tagline: settings.tagline,
      description: settings.description,
      phone: settings.phone,
      phoneHref: settings.phoneHref,
      email: settings.email,
      whatsapp: settings.whatsapp,
      appUrl: settings.appUrl,
      schedule: settings.schedule ?? [],
      social: settings.social,
      seo: settings.seo,
    },
    navigation: {
      header: [...(navigation.header ?? [])]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(({ label, href, cta }) => ({ label, href, cta })),
      footerCompany: [...(navigation.footerCompany ?? [])]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(({ label, href }) => ({ label, href })),
    },
    services: services.map((service) => ({
      slug: service.slug,
      title: service.title,
      icon: service.icon,
      image: service.image
        ? {
            assetId: stringifyId(service.image.assetId),
            pathname: service.image.pathname,
            alt: service.image.alt ?? `${service.title} Aguicius`,
            width: service.image.width,
            height: service.image.height,
          }
        : undefined,
      tier: service.tier,
      short: service.short,
      description: service.description,
      bullets: service.bullets,
    })),
    values: values.map((value) => ({
      slug: value.slug,
      title: value.title,
      description: value.description,
    })),
    locations: locations.map((location) => ({
      slug: location.slug,
      city: location.city,
      lines: location.lines,
      mapsSearchUrl: location.mapsSearchUrl,
      mapEmbedUrl: location.mapEmbedUrl,
      primary: location.primary,
    })),
    pages,
  });

  return {
    content,
    source: "mongo",
  };
}

export async function getNormalizedContentSummary() {
  const site = await resolveSite();
  const siteId = site._id;
  const [services, locations, values, pages] = await Promise.all([
    ServiceModel.countDocuments({ siteId }),
    LocationModel.countDocuments({ siteId }),
    ValueModel.countDocuments({ siteId }),
    PageModel.countDocuments({ siteId }),
  ]);

  return {
    site,
    counts: {
      services,
      locations,
      values,
      pages,
    },
  };
}

export { normalizeContent };
