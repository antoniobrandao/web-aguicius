# AGENTS.md

A customer-facing website built from the Casa Digital client-site template. One deployment per customer, on the customer's own domain.

**This app is a pure view.** It holds no database credentials and no integration secrets: no MongoDB, no blob token, no SMS provider, no email provider. Everything it shows or records goes through the Casa Digital Site API, authenticated with this site's API key, which alone identifies the tenant. If a feature seems to need a secret or a direct database read, it belongs on the platform side instead.

Only three env vars, and there should never be a fourth:

| Env var | Purpose |
| --- | --- |
| `CASADIGITAL_API_URL` | Base URL of the Site API (defaults to `https://casadigital.pt`; point it at a local casadigital.pt in dev). |
| `SITE_API_KEY` | This site's API key, issued by the platform. Authenticates *and* identifies the tenant. |
| `REVALIDATE_SECRET` | Shared secret the backoffice uses to push cache invalidation to `POST /api/revalidate`. |

## How content flows

- `src/lib/content/api.ts` reads one resource per request (`GET /api/v1/{settings,services,locations,values,legal}`) and validates the payload against the local Zod contract in `src/lib/content/resources.ts`. It also warns when the API's contract major version stops matching `EXPECTED_CONTRACT_MAJOR` (`5`). The `products` and `caseStudies` resources exist on the platform and are not consumed here yet; ignoring a resource is fine, a stale major is not.
- `src/lib/content/adapters.ts` maps a resource onto the view types in `types.ts`. Anything mechanical the platform refuses to store twice is derived here — the `tel:` URI comes from the display phone, for instance — so components never format business data themselves.
- `src/lib/content/content.ts` wraps each read in its own cache entry and tag, with a 5-minute interval as a safety net. **An unavailable resource degrades to its empty value and logs — it never throws**, so a brand-new site and an unreachable platform both leave the site standing.
- `POST /api/revalidate` drops only the tags the backoffice reports as changed. Tag names live in `src/lib/content/cache.ts` and must stay in step with the platform's resource names.
- Images arrive as absolute `image.url` values on the platform's public blob CDN and are used directly as an `<Image src>`; that host is allowed in `next.config.ts` `images.remotePatterns`. There is no proxy route and no API key involved in serving a file.
- The quote and contact forms post to `/api/quote` and `/api/contact` (honeypot + full field validation), which forward to `POST /api/v1/leads` with a `formType`. The platform files the lead and notifies the tenant; this app never emails or texts anyone itself.

Content shape is the platform's contract, not this repo's invention: `GET /api/content-schema/docs` on the API host is the authoritative reference, and `/api-docs` documents the endpoints. Page structure, copy, layout and metadata **are** this repo's business — the platform knows nothing about them.

The platform itself (backoffice, Site API, database, and the architecture of the whole system) lives in the separate `casadigital.pt` repository; read its `AGENTS.md` before changing anything that crosses the API boundary.

Stack: Next.js (App Router), React, Tailwind 4, Zod.
