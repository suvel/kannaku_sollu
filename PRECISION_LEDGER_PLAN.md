# Reskin Kannaku Sollu with the "Precision Ledger" design system + complete PWA setup

## Context

The user approved a "Precision Ledger" style guide (Stitch design system, published earlier as an artifact) for their bill-splitter app, and asked to implement it as the actual UI of the existing React PWA at `t:\project\kannaku_sollu`, replacing the app's current look.

The app is a Create React App (react-scripts 5.0.1, React 19.2.8) single-page wizard (no router — 4 steps shown/hidden via CSS + scroll, driven by `MainApp.js`'s `showStep` state). Styling today is per-component Sass with **no shared design-tokens file**: colors are hardcoded and duplicated across 6+ files as 4 different step-accent colors (teal/pink/navy/black). There is also no web font loaded (system font stack only), and the PWA scaffolding is incomplete — `manifest.json` is still unedited CRA boilerplate, referenced icon files (`logo192.png`, `logo512.png`, `favicon.ico`) don't exist in `public/`, and no service worker is registered anywhere (`src/index.js` has zero service-worker code, not even the default `unregister()` call).

User decisions already confirmed:
1. **Step accents → full monochrome.** Drop the 4-color system; steps are black by default, and the currently-active step gets the Precision Ledger green accent (`#006c49`).
2. **Complete the PWA setup** (manifest rebrand, missing icons, service worker registration), not just a visual pass.
3. **Light mode only** — no dark-mode variant needed.
4. Font: self-host **Inter** via `@fontsource/inter` (offline-safe for a PWA, not a Google Fonts CDN link).

Business logic (`functions/calculateTotal.js`, `entity/*`, `context/AppProvider.js`, `Step4.js`'s `generateBill()` text generator) must not be touched — only the markup/CSS around it.

---

## 1. Design tokens — new `src/styles/tokens.css`, loaded via `index.css`

Create `src/styles/tokens.css` defining all Precision Ledger values as CSS custom properties on `:root`. **CSS custom properties, not SCSS variables**, because the 18+ component `.scss` files today have zero shared imports (each compiles independently through its own `.js`), and custom properties resolve at the browser/cascade level — every component's plain `.scss` can reference `var(--token)` immediately with no per-file `@use` wiring, which is a strictly additive, low-risk change versus touching 18+ files' import statements.

Wire it in with a single line: `@import "./styles/tokens.css";` at the top of `src/index.css` (already the one global stylesheet, loaded once from `index.js`).

Tokens to define:
- **Color**: `--color-background: #f9f9ff`, `--color-surface-container-lowest: #ffffff`, `--color-surface-container-low: #f3f3fa`, `--color-surface-container: #ededf4`, `--color-surface-container-high: #e8e7ee`, `--color-surface-container-highest: #e2e2e9`, `--color-on-surface: #1a1b20`, `--color-on-surface-variant: #4c4546`, `--color-outline: #7e7576`, `--color-outline-variant: #c6c6cd`, `--color-primary: #000000`, `--color-on-primary: #ffffff`, `--color-secondary: #006c49`, `--color-secondary-container: #9af2c5`, `--color-on-secondary-container: #0c714d`, `--color-tertiary: #131b2e`, `--color-tertiary-tint: #dae2fc`, `--color-error: #ba1a1a`, `--color-error-container: #ffdad6`.
- **Type**: `--font-family-base` (Inter + system fallback tail), and per-style scalars for `headline-lg` (30/700/36/-0.02em), `headline-md` (24/600/32/-0.01em), `body-lg` (16/400/24), `body-md` (14/400/20), `data-mono` (14/600/20, applied with `font-variant-numeric: tabular-nums`), `label-bold` (12/600/16/0.05em/uppercase), `label-xs` (10/600/12) — as individual `--fs-*`/`--lh-*`/`--fw-*`/`--ls-*` properties per style (no CSS shorthand custom property spans multiple longhands).
- **Radius**: `--radius-sm: 2px`, `--radius: 4px`, `--radius-md: 6px`, `--radius-lg: 8px`, `--radius-xl: 12px`, `--radius-full: 9999px`.
- **Spacing**: `--space-container-margin: 1rem`, `--space-inline-gap: 0.75rem`, `--space-card-padding: 1.25rem`, `--space-stack-gap: 1.5rem`, `--space-section-margin: 2rem`.
- **Elevation**: `--shadow-sm: 0 1px 2px rgba(19,27,46,.08), 0 1px 1px rgba(19,27,46,.05)` (used sparingly, receipt card only, per spec).

Also create `src/styles/_mixins.scss` (real Sass, `@use`'d only by the 2-3 files that need it) with:
- `dashed-divider` — `border-bottom: 1px dashed var(--color-outline-variant)`.
- `receipt-notch($diameter: 8px, $spacing: 16px)` — the repeating `radial-gradient` perforation strip for the receipt card's bottom edge.

## 2. Fonts (`@fontsource/inter`)

1. `npm install @fontsource/inter`.
2. In `src/index.js`, import `@fontsource/inter/400.css`, `/600.css`, `/700.css` (before `./index.css`) — covers every weight the type scale uses.
3. `--font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;` in tokens.css (keep the existing system stack as fallback tail).
4. In `src/index.css`, point `body { font-family: ... }` at `var(--font-family-base)`, and add `body { background: var(--color-background); color: var(--color-on-surface); }` (nothing sets a global background today).

## 3. Shared primitives first — `Button`, `Modal`, `Form`

Fix these before touching any screen, since Step1-4 and all 3 "Add" modals inherit from them.

**`Button.scss`** currently has no real colors of its own — every parent file (`Step.scss`, `Step4.scss`, each `Add*Modal.scss`) sets `.btn.solid { background: $stepN-color }` locally. Make `Button.scss` the single owner:
- `.solid`: `background: var(--color-primary); color: var(--color-on-primary); border-radius: var(--radius-xl);`
- `.outlined`: redefine to match the spec's "Action/Add" button — `background: transparent; border: 2px dashed var(--color-outline-variant); color: var(--color-on-surface-variant);` with `&:hover { border-color: var(--color-secondary); color: var(--color-secondary); }`.
- Drop the `filter: drop-shadow(...)` (spec has no shadow on standard buttons).
- **Required audit**: grep every `variant="outlined"` call site (`RefreshButton.js` uses it; check `Step4.js`'s Re-print button and any others) to confirm the new dashed "add" styling reads correctly there — it's a semantic shift from today's plain white-bg outlined button. If any call site is a mismatch, give it a `customClass` override rather than adding a 3rd variant.
- Once Button owns its own colors, delete the now-redundant `.btn.solid { background: $stepN-color }` / `.btn.outlined { ... }` overrides from `Step.scss`, `Step4.scss`, and the 3 `Add*Modal.scss` files.

**`Modal.scss`**: `border-radius: var(--radius-xl)`, add `background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant);` at the container level (background currently comes from each per-modal file's step color — centralize it here instead), and replace the raw `box-shadow` with a modal-appropriate shadow (e.g. `0 4px 12px rgba(19,27,46,.15)` — distinct from `--shadow-sm`, which the spec reserves for receipt cards specifically).

**`Form.scss`** currently assumes a dark modal background (`color: #fff` on title/labels) — invert now that modals are light:
- `.form__title` → `var(--color-on-surface)`, `headline-md` tokens.
- `.col label` → `var(--color-on-surface-variant)`.
- **Composite input pattern**: give `input, select` a real border (`1px solid var(--color-outline-variant); border-radius: var(--radius-md); background: var(--color-surface-container-lowest)`) instead of `border: 0`. For the floating-label look (uppercase micro-label overlapping the top border like a fieldset legend), set `.col { position: relative }` and float the `label` with `position: absolute; top: -8px; left: 10px; background: var(--color-surface-container-lowest); padding: 0 4px; font-size: var(--fs-label-xs); text-transform: uppercase; letter-spacing: var(--ls-label-bold);` — this is CSS-only since `label` already precedes `input` as a direct sibling inside `.col`, no `Form.js` JSX changes needed.

Once these three are done, the 3 `Add*Modal.scss` files just need their local `$stepN-color` var + background rule deleted (background now inherited from `Modal.scss`); their fixed pixel dimensions (426×356/249/315) stay untouched.

## 4. `Table.scss`

No changes to `Table.js` (preserve the exact `columns`/`data`/`Cell` prop API and dual-render desktop-table / mobile-list structure — it's mid-edit with uncommitted responsive work already in progress).

- Desktop `table`: `border: 1px solid var(--color-outline-variant); border-radius: var(--radius-lg); background: var(--color-surface-container-lowest);`. Row-separator cell borders (`td` only, not `th`) switch to dashed (`border-bottom: 1px dashed var(--color-outline-variant)`) for the receipt-line-item feel; outer border and header underline stay solid.
- `th`: apply `label-bold` tokens (uppercase, tracked) — column headers are already authored uppercase in `Step1.js`'s `columns` config, so this is a pure CSS pickup.
- Mobile `.table-list-item`: `border: 1px solid var(--color-outline-variant); border-radius: var(--radius-lg); background: var(--color-surface-container-lowest); padding: var(--space-card-padding);`. `&__row` divider → dashed `var(--color-outline-variant)`. `&__value` (numeric columns like PRICE) gets `data-mono` tokens (`tabular-nums`, 600 weight).

## 5. Step wizard — monochrome + active-step green accent

Verified in `MainApp.js`/`Step.js`: `MainApp.js` passes `currentStep={showStep}` into `<Step number={step.no} ...>`, and `Step.js` already computes `currentStep == number` for its "What Next" button — this is the exact comparison needed for the active-step class, just not currently exposed as one.

**`Step.js`**: add `const isActive = currentStep === number;` and append `isActive ? "is-active" : ""` to the root `className` (currently `` `step step${number}` ``).

**`Step.scss`**: delete the 4 `$stepN-color` vars and the 4 `.step.stepN { .step__no / .step__main }` color blocks entirely. Replace with:
- `.step__no { background: var(--color-primary); color: var(--color-on-primary); border-radius: var(--radius-lg); }` (monochrome default).
- `.step.is-active .step__no { background: var(--color-secondary); }` — the single green-accent hook.
- `.step.is-active .step__next-action .btn.solid { background: var(--color-secondary); }` (the active step's CTA also picks up the accent).
- `.step__main { border-bottom: 1px solid var(--color-outline-variant); }` (swap the hardcoded `#0000001c`); drop the colored left-border treatment (`border-left: 3px solid $stepN-color`) in favor of the flatter bordered-card look consistent with the rest of the system.
- `.step__desc` maps to `headline-md` tokens (24px/600 is a close match to the current literal 24px).

**`Step1.scss` / `Step2.scss` / `Step3.scss`**: delete each file's local `$stepN-color` declaration (including `Step3.scss`'s pre-existing bug where it's mis-named `$step2-color` holding the navy value) — pure subtraction now that Button/Step own their own colors.

## 6. Step4 — the receipt card

This is the centerpiece of the reskin (`Step4.js`'s `generateBill()` produces a single plain-text string rendered in `#bill-text`, copied via `document.execCommand("copy")` — that mechanism must not change).

**`Step4.scss`**:
- `.bill-pint__text`: replace `border: 2px solid; border-radius: 10px;` with `background: var(--color-surface-container-lowest); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);` — this is the one place the spec's sparingly-used shadow applies.
- Apply `font-variant-numeric: tabular-nums;` plus `data-mono` sizing to the whole block (the text mixes labels and numbers in one string, so per-token tabular-nums on the full block is how the receipt-numeral feel is achieved without restructuring `generateBill()`'s output).
- Add the notch/perforation strip along the bottom edge via the `receipt-notch` mixin (`::after` pseudo-element — no new DOM node needed).
- **Header bar**: add one small new sibling element above `#bill-text` (e.g. `<div className="bill-print__header">Receipt</div>`), styled as a solid `var(--color-secondary)` bar with white text — this matches the receipt-card mockup in the approved style guide (colored header + dashed line items). This is the one deliberate, minor JSX addition in the whole plan (new sibling only — `#bill-text`'s own internals and copy mechanism are untouched).
- **Scope note**: true per-line dashed dividers *inside* the receipt (between each member/product line) would require restructuring `generateBill()`'s single-string output into mapped JSX rows, which risks the copy-to-clipboard mechanism and touches logic the user asked not to change. **Not doing this now** — ship the outer card treatment (border, radius, shadow, notch, tabular-nums) without interior dividers; note it as a possible future follow-up if the user wants it.
- Delete the `.btn.solid { background: $step4-color }` / `.btn.outlined { ... }` overrides (Button.scss now owns these).

## 7. App shell / header

**`App.scss`**: `.header` becomes a fixed top bar — `height: 64px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--color-outline-variant); background: var(--color-surface-container-lowest); position: sticky; top: 0; z-index: 10;` (sticky works well with the app's existing `scrollIntoView`-based step navigation). `.container` gets `background: var(--color-background)`.

**`BrandLogo.scss`**: keep the existing raster logo (`src/asset/brand/logo.png`) and its 250px/160px responsive sizing exactly as-is (regenerating brand artwork is out of scope) — only adjust for vertical centering inside the new 64px bar if not already implied by `.header`'s flex rules.

## 8. Minor components

- **`RemoveBtn.scss`**: repoint to `var(--color-error)` (a destructive action fits the spec's semantic-color intent).
- **`RefreshButton.scss`**: verify it has no independent color override; if so, delete it so it inherits Button's new dashed-outline default.
- **`WelcomeModal.scss`, `VariableExpressionInput.scss`**: no JS/interaction changes — repoint hardcoded borders/backgrounds/text colors to the equivalent tokens (`outline-variant` borders, `surface-container-lowest` backgrounds, `on-surface`/`on-surface-variant` text). `VariableExpressionInput`'s absolutely-positioned input-over-select combo keeps its exact positioning math.
- **`MainApp.scss`** is empty (0 bytes) — leave it that way unless a rule doesn't fit `App.scss`.

Emoji usage (🍎🍪🚬 product icons, "🤷‍♀️" copy, "🔁 Refresh", "❌" remove) is core app data/established microcopy, not decoration — preserve all of it exactly.

## 9. PWA completion

**`public/manifest.json`** — full rebrand:
```json
{
  "short_name": "Kannaku Sollu",
  "name": "Kannaku Sollu — Bill Splitter",
  "description": "Split bills and expenses among friends",
  "icons": [
    { "src": "logo192.png", "type": "image/png", "sizes": "192x192", "purpose": "any" },
    { "src": "logo512.png", "type": "image/png", "sizes": "512x512", "purpose": "any" }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#f9f9ff"
}
```
Drop the `favicon.ico` entry — two valid PNG sizes (192/512) already satisfy Chrome/Lighthouse installability without needing `.ico` tooling that doesn't exist in this repo.

**Icons**: generate `public/logo192.png` and `public/logo512.png` from the existing `src/asset/brand/logo.png` (478×112 wide wordmark — not square, so a naive scale-to-square would distort it). This needs an external image tool not currently in the repo's toolchain (e.g. ImageMagick or the `sharp` npm package run via `npx`, as a one-time manual step, not wired into `npm run build`): composite the wordmark centered on a square `#000000` canvas (matches `theme_color`) at 192×192 and 512×512. `index.html`'s existing `apple-touch-icon` link already points at `logo192.png` — no href change needed, just generating the file fixes the dangling reference.

**`public/index.html`**: fix the generic `<meta name="description" content="Web site created using create-react-app">` to something real (e.g. "Kannaku Sollu — split bills and expenses among friends"). `<title>` and `theme-color` are already correct, no change needed.

**Service worker** — confirmed `src/index.js` has zero service-worker code today (not even a default `unregister()` call):
1. Add `src/serviceWorkerRegistration.js` — the standard CRA `cra-template-pwa` boilerplate (register/registerValidSW/checkValidServiceWorker/unregister, using `navigator.serviceWorker.register`). `react-scripts 5.0.1` already wires `workbox-webpack-plugin` precaching into `npm run build` automatically — no custom Workbox config needed.
2. In `src/index.js`, import it and call `serviceWorkerRegistration.register()` after `root.render(<App />)`.

## 10. Order of operations

1. **Foundation** (no visual change yet): `tokens.css`, `_mixins.scss`, wire the `@import`, install `@fontsource/inter` + import weights + add SW registration scaffold. `npm start`, confirm nothing breaks.
2. **Shared primitives**: `Button.scss` (+ outlined-variant audit), `Modal.scss`, `Form.scss`.
3. **`Table.scss`**.
4. **`Step.scss` + `Step.js` active-state wiring**, then `Step1/2/3.scss` (delete legacy vars).
5. **Modal children**: `AddProductModal.scss`, `AddMemberModal.scss`, `AddToBillModal.scss`, `WelcomeModal.scss`, `VariableExpressionInput.scss`.
6. **`Step4.scss` + small `Step4.js` header-bar addition** (most design-open, done once the token vocabulary is established).
7. **`App.scss` header bar + `BrandLogo` centering**.
8. **`RemoveBtn.scss` / `RefreshButton.scss`** minor token swaps.
9. **PWA**: generate icons, rebrand `manifest.json`, fix `index.html` description, wire up `serviceWorkerRegistration.js`.

## 11. Verification

1. `npm start` — click through the full flow: Welcome modal → Step 1 add/remove product (check both desktop table and ≤768px mobile card-list views, and the composite-input floating labels in the modal) → Step 2 add/remove member → Step 3 add a share via `AddToBillModal`/`VariableExpressionInput` (confirm `1x🍎+2x🚬`-style input still works, totals still computed via untouched `calculateTotal.js`) → Step 4 confirm receipt card renders (border/shadow/notch/header bar), "Copy" still copies the exact plain text (paste to verify), "Re-print" works.
2. Confirm the active step shows the green badge and it moves correctly as `handelGoingNxtStep` advances; inactive/completed steps stay black.
3. Resize to ≤768px at every step and re-check each responsive breakpoint still collapses correctly (grid, table→list, form rows, button stretch, modal `90vw`/`85vh`).
4. Confirm Inter loads (DevTools → Network, `.woff2` from `@fontsource`, not 404/blocked).
5. `npm run build && npx serve -s build` — DevTools → Application: manifest shows correct name/colors/icons with no load errors, service worker registers/activates; run a Lighthouse PWA audit and confirm installability now passes.
6. Grep all `.scss` for leftover hardcoded hex colors or old `$stepN-color` names to confirm no stray un-tokenized colors remain.
7. Confirm zero diff in `functions/calculateTotal.js` (including the pre-existing stray `debugger;`, left untouched), `entity/*`, `functions/generateArrProducts.js`, `functions/generateArrMembers.js`, `functions/getUniqueId.js`, and `context/AppProvider.js`.
