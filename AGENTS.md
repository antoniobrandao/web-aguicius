# AGENTS.md

This website is a view onto the **Casa Digital platform**: it reads the business's content from the platform's API and posts the leads its forms collect back to it. The business edits that content, and works those leads, in the Casa Digital backoffice — not in this repository.

The platform publishes its own integration contract, generated from the code that serves the API, so this file deliberately does not restate any of it. A second copy here would be a second thing to keep in step, and the copy that goes stale is always the one furthest from the code.

## This site

Fill this in before building anything, and keep it current as decisions are made. The platform's contract describes what every site on the platform can do; this section is the only record of what *this* site is meant to be, and an agent that skips it will invent a structure nobody asked for.

Record decisions here, never business data. Names, contacts, addresses, opening hours, services, products, projects, values and legal text all come from the API and must never be written down in this repo.

| | |
| --- | --- |
| **Kind of site** | _Company landing page / corporate site / portfolio / service catalogue / other_ |
| **The business** | _Who they are and what they do, in a sentence — enough to judge a design decision_ |
| **Goal** | _The one thing a visitor should end up doing: request a quote, make contact, browse past work, find the shop_ |
| **Audience** | _Who is visiting, and what they already know_ |
| **Pages** | _The routes this site has, and what each is for_ |
| **Language** | _e.g. European Portuguese, single locale_ |
| **Production domain** | _e.g. `https://example.pt`_ |
| **Design direction** | _Tone, references, any brand constraints_ |
| **Resources used** | _Which platform resources this site actually renders. A resource nobody renders needs no cache entry, only a tag on the invalidation receiver_ |
| **Out of scope** | _Deliberate exclusions, so they do not get "fixed" later_ |

## For agents: read the platform's contract before writing integration code

Start with "This site" above — it says what you are building. If it is still unfilled, ask the person you are working with and write their answers in rather than guessing.

Then fetch **`https://casadigital.pt/llms.txt`** and follow it. It is a short index linking to the full integration contract, the OpenAPI description and the JSON Schema of every content resource. `https://casadigital.pt/llms-full.txt` is the same material in a single fetch.

Those documents are the single source of truth for everything about this integration: what the site is allowed to do, what each resource contains, how to cache it, how to submit a lead, which files arrive as URLs, and how to accept a cache-invalidation push. **Never guess a field name, payload shape, limit or error code, and never hand-copy a field list into this repo without checking it there first.**

If something in this repository contradicts those documents, the documents are right.

## For the person setting this up

Two environment variables and one message to send. The contract documents each in full; this is the checklist.

1. **Ask Casa Digital for this site's `SITE_API_KEY`** and set it in the environment. It both authenticates the request and identifies the business, so it stays server-side and never reaches the browser.
2. **Generate a `REVALIDATE_SECRET`** — any opaque random string, e.g. `openssl rand -base64 32` — and set it in the **deployed** environment, not only in `.env.local`; the platform calls the live site. Recommended rather than required, but registering the endpoint without setting the variable is worse than not registering it at all: every push is then rejected with a 401 instead of quietly not happening.
3. **Send Casa Digital the public URL of this site's `/api/revalidate` endpoint along with that secret**, so the invalidation push can be registered for this business. Until that happens the endpoint is never called, and an edit in the backoffice appears whenever the site's own cache interval expires — 300 seconds here — instead of within seconds.

`CASADIGITAL_API_URL` is optional and only needed to point the site at a local platform instance; it defaults to production.

Nothing else is required: no database, no storage token, no email or SMS provider. If a feature seems to need one, it is a platform feature rather than a website feature, and the backoffice already provides it.

## Where the integration lives in this repo

`src/lib/content/` — one module reading the API, one wrapping each read in a cache, one Zod mirror of the payloads, one mapping payloads onto the view types the components use. Derive anything mechanical (a `tel:` URI from a phone number, a formatted price from an amount) there, so components never format business data themselves.

The pages, routing, layout, copy and SEO metadata of this site are this repository's own business. Business data never is — read it from the API so that editing it in the backoffice actually changes the site.
