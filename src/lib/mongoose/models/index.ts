import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

import {
  CONTENT_ICON_KEYS,
  LEAD_STATUSES,
  PAGE_KEYS,
  SERVICE_TIERS,
  SITE_STATUSES,
} from "@/lib/content/constants";

const { model, models } = mongoose;

const LinkSchema = new Schema(
  {
    label: String,
    href: String,
    cta: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

export const SiteSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    domain: String,
    status: {
      type: String,
      enum: SITE_STATUSES,
      default: "active",
    },
  },
  { timestamps: true, collection: "sites" },
);

export const SiteSettingsSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      unique: true,
    },
    name: String,
    tagline: String,
    description: String,
    phone: String,
    phoneHref: String,
    email: String,
    whatsapp: String,
    appUrl: String,
    schedule: [
      {
        days: String,
        hours: String,
      },
    ],
    social: {
      facebook: String,
      instagram: String,
      youtube: String,
    },
    seo: {
      metadataBase: String,
      defaultTitle: String,
      titleTemplate: String,
      defaultDescription: String,
    },
  },
  { timestamps: true, collection: "siteSettings" },
);

export const NavigationSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      unique: true,
    },
    header: [LinkSchema],
    footerCompany: [LinkSchema],
  },
  { timestamps: true, collection: "navigation" },
);

export const LocationSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    slug: { type: String, required: true },
    city: { type: String, required: true },
    lines: [{ type: String, required: true }],
    mapsSearchUrl: String,
    mapEmbedUrl: String,
    primary: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "locations" },
);

LocationSchema.index({ siteId: 1, slug: 1 }, { unique: true });
LocationSchema.index(
  { siteId: 1, primary: 1 },
  { unique: true, partialFilterExpression: { primary: true } },
);

export const ServiceSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, enum: CONTENT_ICON_KEYS, required: true },
    image: {
      assetId: { type: Schema.Types.ObjectId, ref: "Asset" },
      pathname: String,
      alt: String,
      width: Number,
      height: Number,
    },
    tier: { type: String, enum: SERVICE_TIERS, required: true },
    short: String,
    description: String,
    bullets: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "services" },
);

ServiceSchema.index({ siteId: 1, slug: 1 }, { unique: true });
ServiceSchema.index({ siteId: 1, tier: 1, order: 1 });

export const PageSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    pageKey: { type: String, enum: PAGE_KEYS, required: true },
    seo: {
      title: String,
      description: String,
    },
    hero: {
      eyebrow: String,
      title: String,
      description: String,
    },
    content: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, collection: "pages" },
);

PageSchema.index({ siteId: 1, pageKey: 1 }, { unique: true });

export const ValueSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "values" },
);

ValueSchema.index({ siteId: 1, slug: 1 }, { unique: true });

export const AssetSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    pathname: { type: String, required: true },
    url: String,
    originalName: String,
    contentType: String,
    size: Number,
    width: Number,
    height: Number,
    blurDataURL: String,
    alt: String,
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "assets" },
);

AssetSchema.index({ siteId: 1, pathname: 1 }, { unique: true });
AssetSchema.index({ siteId: 1, createdAt: -1 });

export const LeadSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
      required: true,
      index: true,
    },
    name: String,
    email: String,
    phone: String,
    serviceSlug: String,
    originDestination: String,
    message: String,
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
    },
  },
  { timestamps: true, collection: "leads" },
);

LeadSchema.index({ siteId: 1, status: 1, createdAt: -1 });
LeadSchema.index({ siteId: 1, createdAt: -1 });

export type SiteDocument = InferSchemaType<typeof SiteSchema>;
export type SiteSettingsDocument = InferSchemaType<typeof SiteSettingsSchema>;
export type NavigationDocument = InferSchemaType<typeof NavigationSchema>;
export type LocationDocument = InferSchemaType<typeof LocationSchema>;
export type ServiceDocument = InferSchemaType<typeof ServiceSchema>;
export type PageDocument = InferSchemaType<typeof PageSchema>;
export type ValueDocument = InferSchemaType<typeof ValueSchema>;
export type AssetDocument = InferSchemaType<typeof AssetSchema>;
export type LeadDocument = InferSchemaType<typeof LeadSchema>;

export const SiteModel = (models.Site ??
  model("Site", SiteSchema)) as Model<SiteDocument>;

export const SiteSettingsModel = (models.SiteSettings ??
  model("SiteSettings", SiteSettingsSchema)) as Model<SiteSettingsDocument>;

export const NavigationModel = (models.Navigation ??
  model("Navigation", NavigationSchema)) as Model<NavigationDocument>;

export const LocationModel = (models.Location ??
  model("Location", LocationSchema)) as Model<LocationDocument>;

export const ServiceModel = (models.Service ??
  model("Service", ServiceSchema)) as Model<ServiceDocument>;

export const PageModel = (models.Page ??
  model("Page", PageSchema)) as Model<PageDocument>;

export const ValueModel = (models.Value ??
  model("Value", ValueSchema)) as Model<ValueDocument>;

export const AssetModel = (models.Asset ??
  model("Asset", AssetSchema)) as Model<AssetDocument>;

export const LeadModel = (models.Lead ??
  model("Lead", LeadSchema)) as Model<LeadDocument>;
