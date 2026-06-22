# Aguicius — Website clone

A faithful visual recreation of [aguicius.com](https://aguicius.com) (Portuguese
transport & logistics company), rebuilt with a modern, Tailwind + shadcn-oriented
architecture. The customer area ("Área do Cliente") is intentionally omitted.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** with design tokens extracted from the live site
- **shadcn/ui**-style primitives (Button, Card, Input, Textarea, Label, Accordion, Sheet)
- **Montserrat** via `next/font`
- **lucide-react** icons + inline brand SVGs

## Design tokens

Mapped from `../design-extract-output` into `src/app/globals.css`:

- Primary / brand magenta `#850064`
- Charcoal surfaces `#2d2e33` / `#303033` / `#242427`
- Flat, square material language (radius `0`), tight uppercase typography

## Structure

```
src/
  app/                     # routes (home, sobre-nos, servicos, contactos, orcamento, termos, privacidade)
  components/
    ui/                    # shadcn-style primitives, brand-styled
    layout/                # header, footer, nav, mobile nav, logo
    shared/                # container, section heading, page hero, service card, cta band
    home/                  # home page sections
    about/ services/ contact/ legal/   # page-specific sections
    forms/                 # quote form (client)
    icons/                 # inline social icons
  lib/
    site.ts                # site content: nav, services, contacts, locations
    utils.ts               # cn() helper
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Notes

- The quote form (`/orcamento`) is a client-side demo; wire it to an API route or
  email provider for production.
- Maps use Google Maps embeds; legal pages contain placeholder copy.
