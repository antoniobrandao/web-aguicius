# Design Language: Aguicius – Peça o seu orçamento

> Extracted from `https://aguicius.com` on June 18, 2026
> 396 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#850064` | rgb(133, 0, 100) | hsl(315, 100%, 26%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#6c6d74` | hsl(233, 4%, 44%) | 541 |
| `#ffffff` | hsl(0, 0%, 100%) | 153 |
| `#2d2e33` | hsl(230, 6%, 19%) | 86 |
| `#b4b5ba` | hsl(230, 4%, 72%) | 20 |
| `#e5e5e7` | hsl(240, 4%, 90%) | 5 |
| `#242427` | hsl(240, 4%, 15%) | 2 |
| `#808080` | hsl(0, 0%, 50%) | 2 |
| `#414141` | hsl(0, 0%, 25%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#303033`, `#414141`, `#850064`

### Text Colors

Text color palette: `#6c6d74`, `#2d2e33`, `#ffffff`, `#b4b5ba`, `#242427`, `#303033`, `#808080`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#6c6d74` | text, border | 541 |
| `#ffffff` | background, text, border | 153 |
| `#2d2e33` | text, border, background | 86 |
| `#b4b5ba` | text, border | 20 |
| `#e5e5e7` | border | 5 |
| `#242427` | background, text | 2 |
| `#808080` | text | 2 |
| `#414141` | background | 1 |
| `#850064` | background | 1 |

## Typography

### Font Families

- **Montserrat** — used for all (396 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 128px | 8rem | 400 | 128px | normal | h2, strong, p |
| 48px | 3rem | 400 | 57.6px | normal | h2 |
| 36px | 2.25rem | 400 | 46.8px | normal | h3 |
| 32px | 2rem | 500 | 53px | 2px | a |
| 28px | 1.75rem | 400 | 45.5px | normal | a, img |
| 20px | 1.25rem | 500 | 28px | 2px | h2, span, div, p |
| 16px | 1rem | 400 | 26px | normal | html, head, meta, link |
| 11px | 0.6875rem | 500 | 17.875px | 2px | a, div, svg, rect |

### Heading Scale

```css
h2 { font-size: 128px; font-weight: 400; line-height: 128px; }
h2 { font-size: 48px; font-weight: 400; line-height: 57.6px; }
h3 { font-size: 36px; font-weight: 400; line-height: 46.8px; }
h2 { font-size: 20px; font-weight: 500; line-height: 28px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: 26px; }
```

### Font Weights in Use

`400` (345x), `500` (50x), `700` (1x)

## Spacing

**Base unit:** 5px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-5 | 5px | 0.3125rem |
| spacing-40 | 40px | 2.5rem |
| spacing-70 | 70px | 4.375rem |
| spacing-140 | 140px | 8.75rem |
| spacing-180 | 180px | 11.25rem |
| spacing-200 | 200px | 12.5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| full | 50px | 1 |

## CSS Custom Properties

### Other

```css
--uk-breakpoint-s: 640px;
--uk-breakpoint-m: 960px;
--uk-breakpoint-l: 1200px;
--uk-breakpoint-xl: 1600px;
--uk-leader-fill-content: .;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| sm | 480px | min-width |
| sm | 599px | max-width |
| sm | 600px | min-width |
| sm | 639px | max-width |
| sm | 640px | min-width |
| md | 781px | max-width |
| md | 782px | min-width |
| 959px | 959px | max-width |
| lg | 960px | min-width |
| 1199px | 1199px | max-width |
| 1200px | 1200px | min-width |
| 2xl | 1500px | min-width |
| 2xl | 1599px | max-width |
| 2xl | 1600px | max-width |

## Transitions & Animations

**Easing functions:** `[object Object]`

**Durations:** `0.1s`, `0.2s`

### Common Transitions

```css
transition: all;
transition: color 0.1s ease-in-out, opacity 0.1s ease-in-out;
transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out, background-position 0.1s ease-in-out, border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out, top 0.1s ease-in-out;
```

### Keyframe Animations

**spin**
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**blink**
```css
@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
```

**uk-spinner-rotate**
```css
@keyframes uk-spinner-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}
```

**uk-spinner-dash**
```css
@keyframes uk-spinner-dash {
  0% { stroke-dashoffset: 88px; }
  50% { stroke-dashoffset: 22px; transform: rotate(135deg); }
  100% { stroke-dashoffset: 88px; transform: rotate(450deg); }
}
```

**uk-fade**
```css
@keyframes uk-fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**uk-fade-top**
```css
@keyframes uk-fade-top {
  0% { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**uk-fade-bottom**
```css
@keyframes uk-fade-bottom {
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**uk-fade-left**
```css
@keyframes uk-fade-left {
  0% { opacity: 0; transform: translateX(-100%); }
  100% { opacity: 1; transform: translateX(0px); }
}
```

**uk-fade-right**
```css
@keyframes uk-fade-right {
  0% { opacity: 0; transform: translateX(100%); }
  100% { opacity: 1; transform: translateX(0px); }
}
```

**uk-fade-top-small**
```css
@keyframes uk-fade-top-small {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (9 instances)

```css
.button {
  background-color: rgb(48, 48, 51);
  color: rgb(45, 46, 51);
  font-size: 11px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (7 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (49 instances)

```css
.link {
  color: rgb(108, 109, 116);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (19 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgb(108, 109, 116);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Modals (1 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Dropdowns (12 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgba(255, 255, 255, 0.4);
  padding-top: 8px;
}
```

### Switches (2 instances)

```css
.switche {
  border-radius: 0px;
  border-color: rgb(45, 46, 51);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 8 instances, 4 variants

**Variant 1** (1 instance)

```css
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 0px 20px 0px 20px;
  border-radius: 0px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 11px;
  font-weight: 500;
```

**Variant 2** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(45, 46, 51);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(45, 46, 51);
  font-size: 11px;
  font-weight: 500;
```

**Variant 3** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(36, 36, 39);
  padding: 10px 25px 10px 25px;
  border-radius: 0px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 32px;
  font-weight: 500;
```

**Variant 4** (2 instances)

```css
  background: rgb(48, 48, 51);
  color: rgb(255, 255, 255);
  padding: 0px 20px 0px 20px;
  border-radius: 0px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 11px;
  font-weight: 500;
```

### Card — 3 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(108, 109, 116);
  padding: 40px 40px 40px 40px;
  border-radius: 0px;
  border: 1px solid rgb(229, 229, 231);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(108, 109, 116);
  padding: 40px 40px 40px 40px;
  border-radius: 0px;
  border: 0px none rgb(108, 109, 116);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(108, 109, 116);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 1px solid rgb(229, 229, 231);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**0 grid containers** and **60 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1600px | 40px |
| 100% | 0px |
| 870px | 0px |
| 900px | 40px |

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 20x |
| row/wrap | 40x |

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 3 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#303033` | 13.16:1 | AAA |
| `#242427` | `#ffffff` | 15.48:1 | AAA |

## Design System Score

**Overall: 91/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 100/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 85/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 50/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance

**Issues:**
- 258 !important rules — prefer specificity over overrides
- 97% of CSS is unused — consider purging
- 23549 duplicate CSS declarations

## Z-Index Map

**3 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,1000 | div.u.k.-.o.f.f.c.a.n.v.a.s, button.u.k.-.o.f.f.c.a.n.v.a.s.-.c.l.o.s.e. .u.k.-.i.c.o.n. .u.k.-.c.l.o.s.e |
| dropdown | 990,990 | div.u.k.-.n.a.v.b.a.r.-.c.e.n.t.e.r |
| base | 0,0 | div.t.m.-.p.a.g.e, ul.u.k.-.s.l.i.d.e.s.h.o.w.-.i.t.e.m.s, a.e.l.-.l.i.n.k. .u.k.-.b.u.t.t.o.n. .u.k.-.b.u.t.t.o.n.-.t.e.x.t |

## SVG Icons

**6 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| sm | 1 |
| md | 5 |

**Icon colors:** `rgb(108, 109, 116)`, `#000`, `rgb(45, 46, 51)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Montserrat | self-hosted | 100, 200, 300, 400, 500, 600, 700, 800, 900 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 2 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 4.46:1 (1x), 3.06:1 (1x)

## Motion Language

**Feel:** smooth · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |

### Easing Families

- **ease-in-out** (28 uses) — `ease`

## Component Anatomy

### button — 8 instances

**Slots:** label
**Variants:** link · primary
**Sizes:** large

| variant | count | sample label |
|---|---|---|
| link | 5 | VER MAIS |
| primary | 3 | AQUI |

### card — 5 instances

**Slots:** heading
**Sizes:** large

## Brand Voice

**Tone:** neutral · **Pronoun:** third-person · **Headings:** unknown (tight)

### Top CTA Verbs

- **reserve** (3)
- **ver** (1)
- **aqui** (1)
- **mais** (1)
- **contactos** (1)
- **abrir** (1)

### Button Copy Patterns

- "reserve já" (3×)
- "ver mais" (1×)
- "aqui" (1×)
- "mais serviços" (1×)
- "contactos" (1×)
- "abrir no mapa" (1×)

## Page Intent

**Type:** `landing` (confidence 0.45)

## Section Roles

Reading order (top→bottom): nav → nav

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | nav | — | 0.9 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.145 |
| Shadow profile | none |
| Avg shadow blur | 0px |
| Max radius | 50px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `mixed` (confidence 0.15)
**Counts:** total 2, svg 1, icon 1, screenshot-like 0, photo-like 0
**Dominant aspect:** ultra-wide
**Radius profile on images:** square

## Component Library

**Detected:** `bootstrap` (confidence 0.6)

Evidence:
- bootstrap utility hits: 3

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Montserrat` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
