# AGENTS.md

This website gets its business content from the **Casa Digital platform** and sends the leads its forms collect back to it. The business edits that content, and works those leads, in the Casa Digital backoffice. This file is the standing brief for any agent working in this repository.

## Before writing integration code, read the platform's own docs

Fetch **`https://casadigital.pt/llms.txt`**. It is a short index that links to everything an agent needs: the full integration contract (`/api/v1/integration.md`), the OpenAPI description, and the JSON Schema of every content resource. `https://casadigital.pt/llms-full.txt` is the same material in a single fetch.

Those documents are generated from the code that serves the API, so they are always current. **Use them as the source of truth for field names, payload shapes, limits and error codes — never guess, and never hand-copy a field list into this repo without checking it.**

## What this site is allowed to do

Two operations, both authenticated with `Authorization: Bearer <SITE_API_KEY>`:

1. **Read this business's content** — `GET https://casadigital.pt/api/v1/<resource>`, one resource per request: `settings`, `services`, `products`, `caseStudies`, `locations`, `values`, `legal`. The key identifies the business, so there is no id to pass and no way to read anyone else's data.
2. **Create a lead** — `POST https://casadigital.pt/api/v1/leads`, with `formType: "quote" | "contact"`. Every form on the site should go through this, so enquiries land in the business's CRM instead of an inbox.

Files the business uploaded (service images, case-study attachments) arrive inside the content as absolute URLs. Use them directly as an image or link source — no key, no proxy, nothing to sign. Allow the URL's host in your image optimiser.

## Build the revalidation endpoint (do not skip this)

The site must **expose** `POST /api/revalidate`. After the business saves something in the backoffice, the platform calls it with the names of the resources that changed, and the site drops just those caches — that is what makes an edit show up in seconds instead of whenever your cache happens to expire. Skip it and the business will conclude the backoffice is broken.

The platform documents the whole thing, with a complete route handler you can copy, under "Cache invalidation: the endpoint your site must expose" in `https://casadigital.pt/api/v1/integration.md`. Read that section rather than inventing the protocol. In short: verify `Authorization: Bearer <REVALIDATE_SECRET>` and answer 401 otherwise, read `{ "tags": [...] }` from the body, reject a tag that is not one of the resource names with a 400 rather than ignoring it, invalidate those tags, and return 2xx.

Two things a person has to do, not an agent:

1. Invent a long random `REVALIDATE_SECRET` and set it in this site's environment.
2. Send Casa Digital the endpoint's public URL and that secret, so the push can be registered for this business. Until that happens the endpoint is simply never called.

Treat the push as an optimisation, never a guarantee: it is best effort, at most once, with no retries. Keep a slow revalidation interval underneath it as the safety net.

## Environment

| Env var | Purpose |
| --- | --- |
| `CASADIGITAL_API_URL` | Base URL of the platform. Defaults to `https://casadigital.pt`. |
| `SITE_API_KEY` | This site's key, issued by Casa Digital. Authenticates *and* identifies the business. |
| `REVALIDATE_SECRET` | Shared secret for this site's `POST /api/revalidate`. You choose it, then give it to Casa Digital along with the endpoint's URL. |

Those three are the whole configuration. This site needs no database, no storage token and no email or SMS provider: if a feature seems to need one, it is a platform feature, not a website feature.

## Rules

- **The pages are yours; the business data is not.** Which pages exist, how they are routed, laid out and worded, and all SEO metadata belong in this repository. Names, contacts, addresses, opening hours, services, products, case studies, values and legal texts come from the API — never hardcode them, or the business will edit them in the backoffice and nothing will change.
- **Cache each resource yourself and invalidate on push.** The platform deliberately does not cache responses for you. Give each resource its own cache entry and tag, plus a slow interval as a safety net.
- **Missing content is normal, not an error.** A business that has not filled a section in yet gets a valid response with empty values. Render an empty state; never crash and never show a placeholder that looks like real content.
- **Never let the platform take the site down.** If a read fails, log it and fall back to the empty state so the rest of the page still renders.
- **Ignore fields you do not know.** Within a major contract version new fields may appear. Compare the major of the response's `version` against the one you built against and log loudly if it moved.
- **Spam protection is yours.** Every accepted lead creates a CRM record, so put a honeypot or similar in front of every form and validate fields before posting.
- **Keep the key server-side.** It is never exposed to the browser, never in a `NEXT_PUBLIC_` variable, never in client-side fetches.

## What the business gets, and can ask you for

Worth knowing when scoping work, because these are already paid for and need no code here: editing all of the above content, a leads pipeline with notifications on new enquiries, file uploads, and their own legal texts. Anything in that list is a backoffice feature — build the site to surface it, not to reimplement it.

## Where the integration lives in this repo

`src/lib/content/` — one module reading the API, one wrapping each read in a cache, one Zod mirror of the payloads, one mapping payloads onto the view types the components use. Derive anything mechanical (a `tel:` URI from a phone number, a formatted price from an amount) there, so components never format business data themselves.
