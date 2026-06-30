# Mongoose Models

Target data model for the platform. This replaces the current single-collection
snapshot approach (`{MONGODB_COLLECTION}` holding full `WebsiteContent`
documents). There are **no content snapshots and no `ContentRevision`
collection** in this model. Content is normalized into one collection per
entity.

## Architecture

- One shared MongoDB database for all websites.
- Normalized: one collection per entity (`services`, `locations`, `pages`, ...).
- Every document is scoped to a website by `siteId` (an `ObjectId` reference to
  `sites`).
- Binary files live in Vercel Blob. Mongo only stores file metadata in `assets`.
- The public site reads the entity collections and composes them into the
  existing `AguiciusWebsiteContent` shape at the data-access layer, so the
  rendering components do not need to change.

### Why normalized (and not snapshots)

- Some clients will need large, queryable collections (e.g. portfolio items,
  products, posts). A per-entity collection with proper indexes scales; a single
  document holding the whole site does not.
- Per-entity editing, ordering, and pagination become trivial.

Trade-off being accepted: dropping snapshots removes the built-in
version-history/rollback. If rollback is needed later, add an append-only
`audit log` per entity rather than reintroducing whole-site snapshots.

## Conventions

- **Tenant scoping:** every content document has `siteId: ObjectId` plus a
  compound index starting with `siteId`. Do not query without it.
- **Current site resolution:** runtime configuration should provide a stable
  `SITE_KEY` such as `aguicius`. The data-access layer resolves that once:

  ```ts
  const site = await Site.findOne({ key: process.env.SITE_KEY });
  ```

  `MONGODB_COLLECTION` belongs to the old single-collection architecture and
  should not be used by this normalized model.
- **Single source of validation:** Zod (in `src/lib/content/website-schema.ts`)
  is the authority for content shape and enums. Mongoose schemas stay
  intentionally thin. Shared enums (icons, tiers, page keys) come from one
  shared constants module imported by both Zod and Mongoose so they cannot
  drift.
- **Slugs** are unique per site, not globally.
- **Denormalize for render, reference for integrity:** image fields store both
  an `assetId` reference and a denormalized copy of the fields needed to render
  (`pathname`, `alt`, `width`, `height`) so reads never need a join.
- **Singleton writes:** singleton entities (`SiteSettings`, `Navigation`) are
  written with `updateOne({ siteId }, { $set: data }, { upsert: true })`.

## Site

Registry of websites. The `siteId` foreign key everywhere points here.

```ts
const SiteSchema = new Schema(
  {
    key: { type: String, required: true, unique: true }, // "aguicius"
    name: { type: String, required: true },
    domain: String,
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "active",
    },
  },
  { timestamps: true },
);
```

## SiteSettings

Singleton per site (global company info, contacts, schedule, social, default
SEO). No address here — addresses live in `locations`.

```ts
const SiteSettingsSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, unique: true },
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
  { timestamps: true },
);
```

`seo` here is the default/fallback SEO for app-level metadata and for pages that
do not provide their own SEO fields.

## Navigation

Singleton per site. Header and footer links embedded, since they are small and
always read together.

```ts
const LinkSchema = new Schema(
  {
    label: String,
    href: String,
    cta: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const NavigationSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, unique: true },
    header: [LinkSchema],
    footerCompany: [LinkSchema],
  },
  { timestamps: true },
);
```

## Location

Repeatable. The `primary` location supplies the main address shown on the
homepage, footer, and contact page.

```ts
const LocationSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
    slug: { type: String, required: true },
    city: { type: String, required: true },
    lines: [{ type: String, required: true }],
    mapsSearchUrl: String,
    mapEmbedUrl: String,
    primary: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

LocationSchema.index({ siteId: 1, slug: 1 }, { unique: true });

// Enforce a single primary location per site at the DB level.
LocationSchema.index(
  { siteId: 1, primary: 1 },
  { unique: true, partialFilterExpression: { primary: true } },
);
```

## Service

Repeatable business offering. `icon` and `tier` enums are imported from the
shared constants module (same source Zod uses).

```ts
import { CONTENT_ICON_KEYS, SERVICE_TIERS } from "@/lib/content/constants";

const ServiceSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, enum: CONTENT_ICON_KEYS, required: true },
    image: {
      assetId: { type: Schema.Types.ObjectId, ref: "Asset" },
      pathname: String, // denormalized for render
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
  { timestamps: true },
);

ServiceSchema.index({ siteId: 1, slug: 1 }, { unique: true });
ServiceSchema.index({ siteId: 1, tier: 1, order: 1 });
```

## Page

One document per fixed page key. Common fields (`seo`, `hero`) are typed because
every page has them; the page-specific body lives in `content` and is validated
by the per-page Zod schema in the app layer. Keep all page-specific structure
inside `content` — do not pull individual sections out into typed Mongoose
fields, to avoid split validation.

```ts
import { PAGE_KEYS } from "@/lib/content/constants";

const PageSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
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
  { timestamps: true },
);

PageSchema.index({ siteId: 1, pageKey: 1 }, { unique: true });
```

Note: `pages` is a fixed, known set today. It lives in its own collection so it
can later grow into truly dynamic/repeatable pages (e.g. blog posts) without a
schema change.

Composition rule: `content` must exclude `seo` and `hero`. The read model
reconstructs the app-facing page object like this:

```ts
pages[page.pageKey] = {
  seo: page.seo,
  hero: page.hero,
  ...page.content,
};
```

This avoids storing `seo` and `hero` twice.

## Value

If you keep "values" (company values) as content, model them like services:

```ts
const ValueSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ValueSchema.index({ siteId: 1, slug: 1 }, { unique: true });
```

## Asset

Repeatable, never shared across sites. Stores metadata for files uploaded to
Vercel Blob. Binary stays in Blob.

```ts
const AssetSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
    pathname: { type: String, required: true }, // Vercel Blob pathname
    url: String,
    originalName: String,
    contentType: String,
    size: Number,
    width: Number, // optional, set for images when known
    height: Number, // optional, set for images when known
    blurDataURL: String, // optional placeholder for next/image
    alt: String,
    deletedAt: { type: Date, default: null }, // soft delete; Blob cleanup can be async
  },
  { timestamps: true },
);

AssetSchema.index({ siteId: 1, pathname: 1 }, { unique: true });
AssetSchema.index({ siteId: 1, createdAt: -1 });
```

Write semantics: assets are written with **upsert by `{ siteId, pathname }`**,
not blind insert. Re-uploading to the same stable pathname (Blob
`allowOverwrite: true`) must update the existing asset document, not create a
duplicate or throw on the unique index.

On replacement, update at least:

- `url`
- `originalName`
- `contentType`
- `size`
- `width`
- `height`
- `alt`
- `updatedAt`

Preserve the original `createdAt`.

Soft-delete convention: active asset queries include `deletedAt: null`.

There is intentionally no `usedBy` back-reference. In a normalized model the
forward reference (`service.image.assetId`) is the source of truth; maintaining
reverse links on every edit is error-prone. Orphan detection, if ever needed, is
a batch job that scans entities for referenced `assetId`s.

## Lead

Future quote/contact submissions. The current project may still send to
Web3Forms, but a platform CMS should have a place to persist leads if a client
requests inbox/status features.

```ts
const LeadSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, ref: "Site", required: true, index: true },
    name: String,
    email: String,
    phone: String,
    serviceSlug: String,
    originDestination: String,
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "archived"],
      default: "new",
    },
  },
  { timestamps: true },
);

LeadSchema.index({ siteId: 1, status: 1, createdAt: -1 });
LeadSchema.index({ siteId: 1, createdAt: -1 });
```

## Read model

The public site does not consume these collections directly in components. A
data-access layer loads the entities for a `siteId` and composes them into the
existing `AguiciusWebsiteContent` shape (validated with the existing Zod schema),
then caches the composed result with the `website-content` tag. This keeps the
rendering components unchanged and gives one cached read per request.

```
load(siteId): { siteSettings, navigation, services[], locations[], values[], pages[] }
  -> compose -> AguiciusWebsiteContent
  -> validate (Zod)
  -> cache (tag: website-content)
```

## Save flow

Per edited entity, upsert its own document(s). There is no whole-site snapshot.

1. Authorize (backoffice session).
2. Validate the edited entity with Zod.
3. Resolve `siteId` from `SITE_KEY`.
4. Upsert the entity document(s) scoped by `siteId`.
   - Singleton entities use `updateOne({ siteId }, { $set: data }, { upsert: true })`.
   - Repeatable entities use a stable key such as `{ siteId, slug }` or `{ siteId, pageKey }`.
5. For image fields: upload to Blob, upsert the `Asset`, store `assetId` +
   denormalized render fields on the entity.
6. Invalidate the `website-content` cache tag.

Multi-entity saves that must be consistent (rare here) should use a MongoDB
transaction. Single-entity edits do not need one.

## Scale notes

- Large/queryable content types (products, posts, gallery items) get their own
  collection following the `Service` pattern: `siteId` scope, unique slug per
  site, `order`, plus whatever query indexes the feature needs.
- Always lead compound indexes with `siteId`.
- Pagination and sorting use `order` and/or `createdAt`; make sure read code
  actually sorts by them.
