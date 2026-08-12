# Aguicius

Website for Aguicius, a Portuguese transport and services company.

This repo owns the website: its pages, its structure, its layout, its copy and its
metadata. The business it presents — identity and contacts, services, locations,
company values and legal text — is managed by the client in the Casa Digital
dashboard and read over the authenticated Site API.

That split is the point. Adding a page, renaming a route, rewording a heading or
tuning a meta description is a change here, with no platform involvement. The
platform never knows what this website looks like.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack, React Compiler)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css` and `src/app/frontend.css`
- **shadcn/ui**-style primitives, brand-styled under `src/components/site/ui/`
- **Zod 4** mirroring the Casa Digital content contract
- **Montserrat** via `next/font`, **lucide-react** icons and inline brand SVGs

## Layout

```
src/
  app/
    (site)/                  # public pages: home, sobre-nos, servicos,
                             # contactos, orcamento, termos, privacidade
    api/quote/               # lead submission proxy
    api/revalidate/          # cache invalidation, called by the dashboard
    api/blob/[...pathname]/  # image proxy, keeps asset URLs same-origin
  components/                # layout, home, about, services, contact, legal, forms, shared
  content/site.ts            # this site's pages, nav, hero copy and metadata
  content/design-copy.ts     # this design's layout and section copy
  lib/content/
    resources.ts             # Zod mirror of the Site API contract
    api.ts                   # authenticated fetch per resource
    content.ts               # cached reads, one cache tag per resource
    cache.ts                 # cache tag names
    adapters.ts              # content to view types
    types.ts                 # view types
```

## Business data vs design copy

The split matters when deciding where a string belongs.

**Business data** comes from the dashboard: the client edits it and it appears
here. Anything true of the business rather than of this website is business data.

**Site content** lives in `src/content/site.ts`: which pages exist, their titles,
their meta descriptions, their hero copy and the navigation menus. Metadata is
static, exported per route the ordinary Next.js way.

**Design copy** lives in `src/content/design-copy.ts`: band headings, stat
framing, button labels, section intros. It is scaffolding this particular design
needs in order to present the business data. Another client's site has a
different design and therefore different copy, which is why the platform does not
model any of it.

## Content fetching

One request per resource, so each route fetches only what it renders:

```ts
import { getLegal, getServices, getSettings } from "@/lib/content/content";
```

Each resource is cached under its own tag with a 300 second fallback interval. On
a content save, the dashboard posts the changed tags to `/api/revalidate` so edits
appear immediately.

**There is no bundled fallback content.** A resource that is empty or unreachable
renders as an empty state and logs the reason, so an unfinished site and a broken
integration both leave the site standing without inventing content. Every section
is guarded, so a page with no services or no location renders without those
blocks rather than failing.

## Environment

```
SITE_API_KEY         # this site's Casa Digital API key (sk_…)
CASADIGITAL_API_URL  # platform base URL, defaults to https://casadigital.pt
REVALIDATE_SECRET    # shared secret for POST /api/revalidate
```

`SITE_API_KEY` is server-only and must never be exposed through a
`NEXT_PUBLIC_` variable. The quote form posts to the same-origin `/api/quote`
route, which forwards to the platform, so the key never reaches the browser.

## Commands

```bash
npm run dev         # development server
npm run build       # production build
npm run lint        # eslint
```

## Contract changes

The schemas in `src/lib/content/resources.ts` mirror the platform contract,
published as JSON Schema at `GET /api/content-schema`. `src/lib/content/api.ts`
compares the contract major version on every response and logs loudly on a
mismatch, which is the signal to update these schemas. This site is built against
contract 3.x.

## Notes

- `design-extract-output/` holds design-extraction artifacts from the original
  visual reference. It is excluded from the build and from typechecking.
- When pointing a local server at a different tenant, clear `.next` first:
  cache keys are not tenant-scoped, because a deployment only ever serves one.
