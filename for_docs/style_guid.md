# Precision Ledger — Design System & Component Library

**Version:** 1.0
**Font:** Inter (Google Fonts), Material Symbols Outlined for icons

Precision Ledger blends technical brutalism with modern systematic utility to provide a clear-cut digital paper trail for financial splitting.

---

## 01. Color Palette

### Core / Frequently Used

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#000000` | Primary text / high-contrast actions |
| `on-primary` | `#ffffff` | Text/icons on primary surfaces |
| `secondary` (Primary Action) | `#006C49` | Brand action color, links, highlights |
| `on-secondary` | `#ffffff` | Text/icons on secondary surfaces |
| `secondary-container` | `#9af2c5` | Secondary container fill |
| `on-secondary-container` | `#0c714d` | Text/icons on secondary container |
| `success-green` | `#006c49` | Success states |
| `error` | `#ba1a1a` | Errors / alerts |
| `on-error` | `#ffffff` | Text/icons on error surfaces |
| `error-container` | `#ffdad6` | Error container fill |
| `on-error-container` | `#93000a` | Text/icons on error container |
| `background` / `surface` (Surface Bright) | `#f9f9ff` | Page background |
| `on-background` / `on-surface` | `#1a1b20` | Primary text on background |
| `deep-navy` | `#131b2e` | Accent / dark navy |

### Surfaces

| Token | Hex |
|---|---|
| `surface-dim` | `#d9d9e0` |
| `surface-bright` | `#f9f9ff` |
| `surface-container-lowest` | `#ffffff` |
| `surface-container-low` (Surface Container) | `#ededf4`* |
| `surface-container` | `#ededf4` |
| `surface-container-high` | `#e8e7ee` |
| `surface-container-highest` | `#e2e2e9` |
| `surface-variant` | `#e2e2e9` |
| `on-surface-variant` | `#4c4546` |
| `surface-tint` | `#5e5e5e` |
| `inverse-surface` | `#2f3035` |
| `inverse-on-surface` | `#f0f0f7` |

\* Note: `surface-container-low` and `surface-container` share the same hex (`#ededf4`) in the source config.

### Outline

| Token | Hex |
|---|---|
| `outline` | `#7e7576` |
| `outline-variant` | `#c6c6cd` |

### Primary Fixed Variants

| Token | Hex |
|---|---|
| `primary-fixed` | `#e2e2e2` |
| `primary-fixed-dim` | `#c6c6c6` |
| `on-primary-fixed` | `#1b1b1b` |
| `on-primary-fixed-variant` | `#474747` |
| `primary-container` | `#1b1b1b` |
| `on-primary-container` | `#848484` |
| `inverse-primary` | `#c6c6c6` |

### Secondary Fixed Variants

| Token | Hex |
|---|---|
| `secondary-fixed` | `#9df4c8` |
| `secondary-fixed-dim` | `#81d8ad` |
| `on-secondary-fixed` | `#002113` |
| `on-secondary-fixed-variant` | `#005236` |

### Tertiary

| Token | Hex |
|---|---|
| `tertiary` | `#000000` |
| `tertiary-container` | `#131b2e` |
| `on-tertiary` | `#ffffff` |
| `on-tertiary-container` | `#7c839b` |
| `tertiary-fixed` | `#dae2fc` |
| `tertiary-fixed-dim` | `#bec6e0` |
| `on-tertiary-fixed` | `#131b2e` |
| `on-tertiary-fixed-variant` | `#3f465b` |

---

## 02. Typography (Inter)

All type scales are registered as both `fontFamily` and `fontSize` Tailwind tokens (use `font-{name} text-{name}` together).

| Token | Size / Line height | Letter spacing | Weight | Sample usage |
|---|---|---|---|---|
| `headline-lg` | 30px / 36px | -0.02em | 700 (Bold) | Page/section hero titles |
| `headline-md` | 24px / 32px | -0.01em | 600 (Semi-Bold) | Card/section headings |
| `body-lg` | 16px / 24px | — | 400 (Regular) | Intro / lead paragraphs |
| `body-md` | 14px / 20px | — | 400 (Regular) | Standard body copy |
| `label-bold` | 12px / 16px | 0.05em | 600 (Semi-Bold) | Buttons, labels, uppercase tags |
| `label-xs` | 10px / 12px | — | 600 (Semi-Bold) | Micro labels, captions |
| `data-mono` | 14px / 20px | — | 600 (Semi-Bold) | Monetary/numeric values |

---

## 03. Design Principles

1. **Vertical Efficiency** — Content stacks logically to minimize lateral eye movement on narrow screens.
2. **Clear CTA** — High-contrast solid elements guide the user toward finalization.
3. **Emoji Core** — Data is paired with expressive icons/emoji to soften the technical brutality.

---

## 04. Layout Tokens

### Border Radius

| Token | Value |
|---|---|
| `DEFAULT` | 0.125rem |
| `lg` | 0.25rem |
| `xl` | 0.5rem |
| `full` | 0.75rem |

### Spacing

| Token | Value | Usage |
|---|---|---|
| `container-margin` | 1rem | Page/container horizontal padding |
| `inline-gap` | 0.75rem | Gap between inline/grid items |
| `card-padding` | 1.25rem | Padding inside cards |
| `stack-gap` | 1.5rem | Vertical gap between stacked elements |
| `section-margin` | 2rem | Margin between major sections |

### Shell Structure

- **Header**: fixed top, full width, 64px (`h-16`) height, bottom border, content constrained to `max-w-[768px]` centered, shows app title and a running total (`$0.00`) in a pill.
- **Main**: `max-w-[768px]` centered, `pt-24 pb-32` to clear the fixed header/nav.
- **Bottom Nav**: fixed bottom, full width, 80px (`h-20`) height, top border, 4 tabs (Products, Members, Split, Summary) with the active tab (Split) highlighted via `text-secondary` + rounded pill background.

---

## 05. Component Library

### Grid Cards (Members / Products)
Square cards on a dotted "canvas" background, each with:
- Top-right dismiss (`close`) icon button (turns error-red on hover)
- Large emoji avatar/icon (`text-3xl`)
- Bold label (name/title)
- Secondary line: either a monospace price (`text-secondary`) for products, or a role/subtitle for members

### Buttons & Controls
- **Primary button**: solid `bg-primary` / `text-on-primary`, full width, uppercase bold label, `active:scale-95` press feedback (e.g. "Finalize Ledger")
- **Secondary/dashed button**: `border-2 border-dashed`, hover turns `border-secondary` / `text-secondary`, used for add/create actions (e.g. "Add New Entry" with a leading `add` icon)
- **Pill Stepper**: horizontal row of rounded bars (`h-1.5 w-8`) — filled (`bg-secondary`) for completed/current steps, muted (`bg-surface-variant`) for upcoming steps

### Expression Creator (Composite Input)
A card representing a dynamic split rule:
- Header bar with label ("Dynamic Split Logic") and an info icon
- Row showing item emoji → arrow → assigned member chips (emoji + name, monospace font)
- Amount input: `$` prefix, monospace value, "PER HEAD" suffix label, focus ring in `secondary` color

### Receipt Component
A narrow (`max-w-sm`) card simulating a printed receipt:
- Colored header (`bg-secondary`) with "Transaction Summary" label and a reference number (headline style)
- Line items (label + monospace amount) separated by dashed dividers
- Footer with a notch/perforated cut effect (`clip-path` polygon) showing "TOTAL DUE" and the final monospace amount in `secondary` color

---

## Notes on Source File

This document was generated from [`style_guid.html`](style_guid.html), a static Tailwind CDN prototype used to preview the design tokens and components listed above. The HTML file includes a `tailwind.config` block (colors, border radius, spacing, font family/size scales) plus live-rendered examples of each component described here.
