# Token rationale: where every value in `tokens/tokens.css` comes from

Phase 2, step 1 (see [PLAN.md](PLAN.md)). Drafted 2026-11-22. This file explains the token draft group by group, records the contrast check, recommends an icon set and lists the taste questions for the round-2 board. The tokens are a draft until the board and the example page have tested them.

Files: [`tokens/tokens.css`](../../tokens/tokens.css) (the values), [`tokens/tailwind.preset.js`](../../tokens/tailwind.preset.js) (Tailwind mapping, `var()` references only).

## How to read the tables

**Source** says where a value comes from:

| Mark | Meaning | File |
|---|---|---|
| HIG | Stated in Apple's Human Interface Guidelines | [hig-digest/](../hig-digest/README.md) |
| Native | Measured on screenshots of Apple's shipping apps | [native-measurements.md](native-measurements.md) |
| Web | Measured on Apple's public web apps (values as facts, no code copied) | [apple-web-css.md](apple-web-css.md) |
| DocC | Read in Apple's open-source Swift-DocC-Render (Apache 2.0) | [docc-render.md](docc-render.md) |
| Owner | `preferences.md` or a default in `PLAN.md` | [preferences.md](../../preferences.md) |
| WCAG | WCAG 2.2 AA, which wins where Apple is looser (PLAN default) | — |
| **INFERRED** | Our choice: no source gives the number, or we deliberately depart from one | — |

Unit assumption (from the HIG digest): 1 Apple pt = 1 CSS px. Type is in rem (16 px root) so browser text settings work; geometry is in px.

---

## 1. Structure

| Decision | Value | Source | Why |
|---|---|---|---|
| Format | Plain CSS custom properties, no build step; Tailwind preset reads them via `var()` | D-007 | Framework-agnostic web first; one source of truth |
| Theme switch | Light on `:root`; dark under `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`, repeated on `:root[data-theme="dark"]`; `:root[data-theme="light"]` forces `color-scheme: light` | HIG (follow the system), Owner (theme follows system; a project may add a toggle), DocC (Light/Dark/Auto with Auto default) | The system wins by default; a page toggle still works in both directions. The check found that without the explicit `color-scheme: light`, a forced-light page under a dark system would draw dark form controls and scrollbars, so that rule was added. |
| Increased contrast | `@media (prefers-contrast: more)` for light, for system dark and for forced dark | HIG (four variants per colour) | Apple defines light, dark, IC light, IC dark for every colour; DocC ships none, the Apple web apps ship all four |
| Density | `:root` and `[data-density="comfortable"]` = iOS scale; `[data-density="compact"]` = macOS / Apple-web scale. Works on any element (e.g. a compact inspector inside a comfortable page). Font shorthands are rebuilt on `[data-density]` so nested densities resolve correctly (verified). | Owner (two presets, a project picks one) | Density is per project, not global (p01) |
| **Default density** | **Comfortable** | INFERRED | It is the only preset that is safe without knowing the project: it works with touch and at phone width, its 17 px body matches iOS Body and Apple's long-form web text (DocC 17/25), and it survives 200% zoom. Compact (13 px) is excellent for dense desktop tools with a fine pointer, which is exactly where Apple's own desktop web apps use it, but on a phone, or rendered in Segoe UI or Roboto instead of SF, 13 px reads small. So compact is a deliberate project choice, not the fallback. |
| Touch override | Under `(pointer: coarse)`: `--hit-min` 44 px in every density; compact input text 16 px | HIG 44 pt, WCAG 2.5.8; iOS Safari zooms into fields under 16 px (Web: Apple's search fields switch 13 → 16 px on phones) | A compact project still gets touch-safe targets and no zoom-on-focus |

---

## 2. Typography

### 2.1 Families and weights

| Token | Value | Source | Why |
|---|---|---|---|
| `--font-sans` | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif` + emoji fonts | HIG (don't embed system fonts), digest T1 | Apple devices render SF because it is the OS font; others get their own UI font. Apple's fonts are never embedded or named (licence). |
| `--font-mono` | `ui-monospace, Menlo, Consolas, "Liberation Mono", monospace` | digest T2, minus the Apple font name | `ui-monospace` gives SF Mono on Apple devices without naming it |
| `--font-serif` | `ui-serif, Georgia, "Times New Roman", serif` | digest T2, minus the Apple font name | For reading content only, if a project wants a serif voice |
| `--weight-*` | 400 / 500 / 600 / 700 | HIG (Regular, Medium, Semibold, Bold; no light weights) | macOS Headline's emphasized "Heavy" (800) is capped at 700, per the brief |

### 2.2 Text styles

Size / leading in px; all in rem in the file. Tracking is the HIG tracking-table value for that size (§2.3).

| Style | Comfortable (iOS "Large") | Compact (macOS) | Weight (comfortable · compact) | Emphasized | Source |
|---|---|---|---|---|---|
| large-title | 34 / 41 | 26 / 32 | 700 · 700 | — | HIG tables; weight = emphasized, see below |
| title-1 | 28 / 34 | 22 / 26 | 700 · 700 | — | HIG |
| title-2 | 22 / 28 | 17 / 22 | 700 · 700 | — | HIG |
| title-3 | 20 / 25 | 15 / 20 | 600 · 600 | — | HIG |
| headline | 17 / 22 | 13 / 16 | 600 · 700 | 600 · 700 | HIG (macOS Headline is Bold) |
| body | 17 / 22 | 13 / 16 | 400 | 600 | HIG |
| callout | 16 / 21 | 12 / 15 | 400 | 600 | HIG |
| subheadline | 15 / 20 | 11 / 14 | 400 | 600 | HIG |
| footnote | 13 / 18 | **11 / 14** (macOS 10 / 13) | 400 | 600 | HIG; floor INFERRED |
| caption-1 | 12 / 16 | **11 / 14** (macOS 10 / 13) | 400 | 600 · 500 | HIG; floor INFERRED |
| caption-2 | 11 / 13 | **11 / 14** (macOS 10 / 13) | 400 · 500 | 600 | HIG; floor INFERRED |
| prose | 17 / 25 | 13 / 18 | 400 | — | DocC 17/25; Web description text 13/18 |
| field (input text) | 17 | 13 (16 on touch) | — | — | HIG body; iOS no-zoom size |

Notes:
- **Title weights are bold by default (INFERRED).** The HIG's base weight for titles is Regular with Bold as the "emphasized" variant, but Apple's apps and web apps render page and section titles bold (Native: Large Title measured bold; Web: 34/40 w700 page titles, 17/22 w700 shelf titles). DocC uses regular titles. The bold default follows what people see in Apple software; regular stays available via `--weight-regular`. This is on the board (§7).
- **11 px floor in compact (INFERRED).** macOS sets footnote and captions at 10 pt; the digest (T6) recommends never going below 11 px on the web. Footnote and caption 1–2 therefore share one size and differ by weight and colour, which is also how macOS treats them (all 10/13).
- **Prose leading.** The HIG warns against tight leading for three or more lines; the text-style leading (1.29 for body) is for UI rows, so paragraphs get their own looser tokens.
- Verified in Edge: every style computes to the values above in both themes and both densities; a `data-density="compact"` element inside a comfortable page resolves body to 13/16.

### 2.3 Tracking (letter-spacing)

| Token | Values | Source | Why |
|---|---|---|---|
| `--text-*-tracking` | Comfortable: +0.012em (34), +0.014em (28), −0.012em (22), −0.023em (20), −0.026em (17), −0.020em (16), −0.016em (15), −0.006em (13), 0 (12), +0.006em (11). Compact: +0.008em (26), −0.012em (22), −0.026em (17), −0.016em (15), −0.006em (13), 0 (12), +0.006em (11) | HIG tracking table (1/1000 em ÷ 1000) | The table describes how SF is spaced at each size |
| `--tracking-scale` | 1 (multiplies every value above; 0 turns tracking off) | INFERRED | The table is tuned for SF. Two unknowns remain: whether Safari already applies SF's size-specific tracking to `system-ui` (which would double it), and how it looks on Segoe UI or Roboto. Apple's web apps set no letter-spacing; Apple's developer documentation renders its 17 px body at −0.022em (Web), close to the table. The values are small (at most 0.44 px at 17 px), and one switch removes them if a Mac test shows doubling. |
| Display tracking | −0.015em / −0.01em / −0.005em | INFERRED | The table goes to 0 at 80 pt and is slightly positive at 40–60 pt for SF. Big expressive headlines in fallback fonts read loose at 0, so we set them slightly tight. Not multiplied by the switch (a design choice, not the SF table). |

### 2.4 Display scale (landing and product pages, D-009)

Measured in Edge at 390 px and 1440 px viewports.

| Token | Value | 390 px → 1440 px | Leading · weight | Source | Why |
|---|---|---|---|---|---|
| `--text-display-1-*` | `clamp(2.75rem, 1.5rem + 5.2vw, 6rem)` | 44 → 96 px | 1.05 · 700 | Web: apple.com headlines 70–88 px; DocC headline 48/52 → 32/36 (leading 1.08) | Hero headline. Size range INFERRED, to be set on the board. |
| `--text-display-2-*` | `clamp(2rem, 1.25rem + 3vw, 4rem)` | 32 → 63 px | 1.08 · 700 | DocC heading scale 32–48 | Section headline |
| `--text-display-3-*` | `clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)` | 24 → 40 px | 1.15 · 600 | DocC h3 28/32, card titles semibold | Sub-section, tile headline |
| `--text-lead-*` | `clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)` | 19 → 24 px | 1.4 · 400 | DocC intro 21/29, 19/27 small | Intro paragraph under a headline |
| `--text-eyebrow-*` | `clamp(1rem, 0.9rem + 0.4vw, 1.3125rem)` | 16 → 20 px | 1.25 · 600 | DocC eyebrow 19–21 px | Kicker above a headline |

The rem term in every `clamp()` keeps WCAG 1.4.4 text resize working (a pure `vw` size would ignore zoom).

---

## 3. Colour

All values are ours unless the source column says otherwise; they were tuned with the contrast script (§6). Light greys keep Apple's slight cool tint (#f2f2f7 family); dark greys are neutral, like the Apple web apps.

### 3.1 Background layers

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--color-bg` | #ffffff | **#1f1f1f** | Web (Music, Podcasts page #1f1f1f); Owner (layered dark greys, not black, as default) | Page and window content. Black is kept for the board (§7). |
| `--color-bg-secondary` | #f5f5f7 | #2a2a2a | Web (App Store page #f5f5f7); Native (macOS settings box #f7f7f7 on white) | A box or inset group on the page |
| `--color-bg-tertiary` | #ebebf0 | #363636 | INFERRED (one step further on each ladder) | A group inside a group; in dark, groups inside sheets |
| `--color-bg-grouped` | #f2f2f7 | #1f1f1f | Native (iOS grouped page #f2f2f7; in iOS dark, grouped and plain page are the same colour) | Page behind inset-grouped lists |
| `--color-bg-grouped-item` | #ffffff | #2a2a2a | Native (white cards; #2c2c2e on #1c1c1e dark) | The cards on a grouped page |
| `--color-bg-elevated` | #ffffff | #2c2c2c | HIG (elevated surfaces are brighter in dark mode); values INFERRED | Sheets, popovers, menus, dialogs |
| `--color-bg-sidebar` | #f0f0f3 | #282828 | Native (macOS sidebar #ededed light, #292929 dark; iPad #f1f2f3) | Opaque sidebar; wallpaper tint deliberately left out |

### 3.2 Labels

| Token | Light | Dark | IC light | IC dark | Source | Why |
|---|---|---|---|---|---|---|
| `--color-label` | black 88% | white 92% | black 100% | white 100% | Web (Chromium branch 88% / 92%; IC 100%) | ≥ 14:1 light, ≥ 10.5:1 dark on every layer |
| `--color-label-secondary` | black **58%** | white 64% | black 72% | white 78% | Web (56% / 64%); raised by us | Apple's Safari value (50%) is 3.95:1 and fails; 56% fails on the grey layers. 58% passes 4.5:1 on every layer, including hover and selection fills (min 4.86). |
| `--color-label-tertiary` | black 45% | white 40% | black 60% | white 62% | Web (48% / 40%); INFERRED | ≥ 3:1 everywhere. **Non-essential text only**: disabled controls, unavailable items (HIG Labels page), decorative metadata. Not for placeholders that carry meaning. In IC it reaches 4.5:1. |
| `--color-label-quaternary` | black 22% | white 20% | black 40% | white 40% | HIG (watermark text); INFERRED values | ~1.7–1.9:1. Watermarks and decoration only, never information. |

Alpha labels (instead of opaque greys) keep the same relationship on every layer, which is why the Apple web apps use them.

### 3.3 Separators and control borders

| Token | Light | Dark | IC light / dark | Source | Why |
|---|---|---|---|---|---|
| `--color-separator` | black 12% | white 12% | 26% / 30% | Native (~#e5e5e7 on white ≈ 10%); Web (11–15% black, 10% white) | 1 CSS px lines; translucent works on tinted surfaces. Decorative, no contrast minimum. |
| `--color-separator-opaque` | #dfdfe2 | #3a3a3a | #c2c2c6 / #626262 | Web (App Store opaque systemGray4; DocC #d2d2d7) | Equal to the translucent line over the page; crisper on flat surfaces |
| `--color-border-control` | black 45% | white 40% | 60% / 60% | WCAG 1.4.11; INFERRED | For a control whose border is its only outline (e.g. a field on a plain page): ≥ 3:1. Apple's fill-style fields don't need it. |

### 3.4 Fills and states

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--color-fill` … `-quaternary` | rgb(120 120 128) at 20 / 16 / 12 / 8% | same grey at 36 / 30 / 24 / 18% | Web (Maps fills 8 / 12 / 16%, segmented track 12% / 24%); strongest step and dark steps INFERRED | Tracks, grey buttons, segmented controls, value capsules |
| `--color-fill-hover` | black 5% | white 6% | Web (Music rows 6%, Maps 4%) | Row and button hover; IC 8% / 10% |
| `--color-fill-selected` | black 8% | white 10% | Web (Music 4%, App Store 10%); Native (Finder #e2e2e2 on #ededed) | Neutral (grey) selection; the accent selection uses `--color-accent`. Which one is per project (p06). IC 14% / 18%. |

### 3.5 Accent, focus

| Token | Light | Dark | IC light | IC dark | Source | Why |
|---|---|---|---|---|---|---|
| `--color-accent` (fill) | **#0a6ee8** | **#0070ee** | #0259c2 | #0070ee | Owner (Apple-like blue, used as a fill); values INFERRED | Apple's #007aff and #0088ff give white text only 4.0 and 3.5:1. Ours is a little deeper so white button labels pass 4.5:1 (4.76 / 4.61). Dark cannot be lighter without failing white text, and in IC dark it cannot be darker without falling under 3:1 against the page, so it stays put. |
| `--color-accent-hover` / `-pressed` | accent mixed 12% / 22% with black | same rule | — | — | Web (App Store rollover and pressed are darker); INFERRED | `color-mix()` so they follow any rebrand. White text gets stronger (5.7–9.1:1). |
| `--color-accent-tint` | accent at 12% | same rule | — | — | Web (tinted "View" button 6–10%) | Background of a tinted (secondary) button |
| `--color-on-accent` | #ffffff | #ffffff | — | — | — | Text and icons on the accent fill |
| `--color-accent-text` | **#055fcc** | **#5ca9ff** | #0449a0 | #9ccaff | Web (docs links #0066cc / #2997ff); INFERRED values | Links and accent-coloured text. ≥ 5.0:1 light, ≥ 4.9:1 dark on every layer and on the tint; ≥ 7:1 in IC. |
| `--color-focus-ring` | = accent | = accent-text | = accent | = accent-text | Web (ring in the accent); WCAG 1.4.11 | ≥ 4.0:1 against every layer |
| `--focus-ring-width` / `-offset` | 3 px / 2 px | | | | Web (4 px ring at 60% alpha); DocC (keyboard-only rings); INFERRED | Apple's 60%-alpha ring is 2.3:1 on white. A solid ring with a 2 px gap passes 3:1 and stays visible around an accent-filled button. Use with `:focus-visible`. |

### 3.6 Meaningful colours

Fill = HIG 2025 system colour (VERIFIED values). Text = ours: the HIG hue moved in OKLCH lightness until it passes on **every** layer (light and dark: 4.5:1; increased contrast: 7:1). Where the HIG fill already passes, the text token points at the fill.

| Colour | Fill light · dark | Text light · dark | Fill IC light · dark | Text IC light · dark |
|---|---|---|---|---|
| red | #ff383c · #ff4245 | #d30725 · #fd7770 | #e9152d · #ff6165 | #9f061a · #feb2ae |
| orange | #ff8d28 · #ff9230 | #b04a03 · = fill | #c55300 · #ffa056 | #843603 · #ffb681 |
| yellow | #ffcc00 · #ffd600 | #905f05 · = fill | #a16a00 · #fedf43 | #6c4603 · = fill |
| green | #34c759 · #30d158 | #057a2d · = fill | #008932 · #4ad968 | #035b20 · #52e06e |
| teal | #00c3d0 · #00d2e0 | #057388 · = fill | #008198 · #3bddec | #035565 · = fill |
| blue | #0088ff · #0091ff | #0c60e5 · #4da4fd | #1e6ef4 · #5cb8ff | #0246b0 · #8eccff |
| indigo | #6155f5 · #6d7cff | #564ade · #8899fd | #564ade · #a7aaff | #4631c6 · #bdc1fe |
| purple | #cb30e0 · #db34f2 | #ac2abe · #eb6bfd | #b02fc2 · #ea8dff | #870797 · #f0aeff |
| pink | #ff2d55 · #ff375f | #d10443 · #ff7381 | #e7124d · #ff8ac4 | #9e0431 · #feaed3 |

Why: HIG light colours are fills, not text colours (only indigo reaches 4.5:1 on white); several HIG dark colours fail on our grey layers (red 3.5, purple 3.3 on #363636). Owner: colour that carries meaning in small elements is liked, colour as a page wash is not; so these are for tags, events, status dots and charts. Mint, cyan and brown were left out to keep the brief's nine; they can be added the same way. The palette blue is for meaning; interaction uses the accent.

### 3.7 Overlays

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--color-scrim` | black 40% | black 50% | DocC 0.4, Web 0.45 | Behind modal sheets; dark needs more to read over a grey page (INFERRED) |
| `--color-media-dim` | black 35% | black 35% | HIG (35% dark dimming behind clear glass over bright media) | Only for controls floating over photos and video |

---

## 4. Materials, shadows

### 4.1 Materials (chrome only)

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--material-bar` (tint) | rgb(250 250 252 / 0.72) | rgb(38 38 38 / 0.72) | Owner (start from Apple web, about `saturate(180%) blur(20px)`); Web (bars 55–80% tint); DocC (70%) | Top bars, toolbars, tab bars |
| `--material-bar-backdrop` | `saturate(180%) blur(20px)` | same | Owner, DocC, Web (marketing local nav) | |
| `--material-menu` (tint) | rgb(246 246 248 / 0.82) | rgb(44 44 44 / 0.82) | Web (menus 70–72% with blur 50–60 px); INFERRED (thicker for legibility) | Menus, popovers, floating sidebars: surfaces that hold more text (HIG: thicker material where text sits) |
| `--material-menu-backdrop` | `saturate(180%) blur(40px)` | same | Web (50–60 px); INFERRED | |
| `--material-*-solid` | #fafafc / #f6f6f8 | #262626 / #2c2c2c | Web (every material has an opaque fallback) | Used automatically under `prefers-reduced-transparency: reduce`, `prefers-contrast: more`, and when `backdrop-filter` is unsupported (verified in Edge) |

Rules carried in the comments: glass only on chrome (HIG, Owner: liked on bars and toolbars, disliked on content tiles and tall panels); never text on an unblurred translucent layer; use both `backdrop-filter` and `-webkit-backdrop-filter`.

Worst case before blur (info, from the check): secondary text on the light bar over pure black content is 4.17:1, on the dark bar over pure white content 3.56:1. Blur averages real content toward the middle, but this is why the comment says to keep bars to primary labels and icons. Glass strength is on the board.

### 4.2 Shadows

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--shadow-raised` | 0 1px 2px 5%, 0 2px 8px 6% | 30% / 30% | Web (App Store cards 0 3px 9px 8%) | Rare: a card that must lift off the page |
| `--shadow-floating` | 0 2px 6px 6%, 0 10px 30px 10% | 30% / 40% | Web (floating player 0 10px 40px 10%, dark 20%) | Floating controls, small popovers |
| `--shadow-overlay` | 1px ring 5% + 0 12px 40px 18% | 1px white ring 8% + 55% | Web (menus 25% / 55%; 1 px rims on menus) | Menus, sheets: what floats above everything. IC raises the ring to 30%. |

Why: shadows on Apple content are rare and soft; strong shadows are reserved for menus. Dark mode keeps or raises shadow alpha (Web), and the faint light ring marks floating edges that a dark shadow cannot. Exact values INFERRED.

---

## 5. Space, layout, sizes, radii, motion

### 5.1 Spacing

| Token | Value | Source | Why |
|---|---|---|---|
| `--space-2` … `--space-80` | 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 px | Native (8, 12, 16, 20 recur), Web (Maps scale 2–72), DocC (20 / 40 / 80) | One scale; consistent spacing matters more than decoration (Owner, observed) |
| `--gap-control` | 12 px | HIG (about 12 pt around bezeled controls) | |
| `--gap-borderless` | 24 px | HIG (about 24 pt around borderless controls) | |
| `--pad-row-x` | 16 · **10** | Native (iOS row inset ~16; macOS settings rows and separators 10) | Off-scale 10 kept on purpose: it is the measured macOS value |
| `--pad-group` | 16 · 10 | Native | Padding inside a grouped card |
| `--pad-panel` | 20 · 20 | Native (iPad detail pane 20; macOS content 20) | |
| `--gap-group` | 32 · 12 | Native (iOS Settings 35; macOS settings boxes 10), rounded to the scale | INFERRED rounding |

(· separates comfortable · compact.)

### 5.2 Layout

| Token | Value | Source | Why |
|---|---|---|---|
| `--gutter` | `clamp(16px, 4vw, 40px)`: 16 px at 390, 20 px at 500, 40 px from 1000 | Native (margins 16 / 20 by width); Web (gutters 25 → 40 at 1000 px); HIG (decide by width, not device) | Width-driven, so the same in both densities |
| `--width-prose` | 68ch | digest L5 (65–75ch); DocC 740 px column at 17 px | `ch` follows the element's font, so it adapts to density. INFERRED |
| `--width-content-narrow` / `--width-content` / `--width-content-wide` | 692 / 980 / 1180 px | DocC (apple.com grid 692 / 980; widest layout 1180) | Fixed reading widths are part of the Apple feel (DocC analysis) |
| `--bar-height` | 52 px | Native (macOS toolbar ~51); Web (mobile top bar 52); DocC (nav 52) | Same in both densities |
| `--bar-item-height` | 44 · 36 | Native (iOS glass buttons 44; macOS toolbar items 36) | |
| `--sidebar-width` | 280 · 220 | Native (iPad 280–320; macOS 162–287, System Settings 214); Web 260 | INFERRED within the measured ranges |
| `--inspector-width` | 320 · 260 | Native (iWork inspector 235–275) | INFERRED |
| Breakpoints | not tokens | — | Custom properties cannot be used in media queries. Candidates for the foundation rules: compact/regular at ~768 px, Apple web's 484 / 1000 / 1260. |

### 5.3 Sizes per density

| Token | Comfortable | Compact | Source | Why |
|---|---|---|---|---|
| `--hit-min` | 44 | 24 (44 on touch) | HIG 44 pt; WCAG 2.5.8 24 px (macOS allows 20, below WCAG) | |
| `--control-height-sm` / `--control-height` / `-lg` | 34 / 44 / 48 | 24 / 28 / 36 | Native (iOS chips 34, buttons 44, bottom field 48; macOS push button 24, toolbar item 36); HIG (macOS default control 28) | |
| `--row-height-dense` | 44 | 24 | Native (Finder 20, raised to the WCAG floor) | Tables |
| `--row-height` | 52 | 32 | Native (iOS one-line row 52; macOS sidebar 32) | |
| `--row-height-2line` | 60 | 44 | Native (iOS 59–60); Web (desktop two-line row 46) | INFERRED for compact |
| `--row-height-sidebar` | 44 | 32 | Native (iPad 44; macOS 32) | |
| `--row-height-menu` | 44 | 28 | Native (macOS menu 24); Web (32) | Compact INFERRED between the two |
| `--icon-size-sm` / `--icon-size` / `-lg` | 18 / 22 / 28 | 14 / 16 / 20 | digest I3 (17 px text → ~20–22 px icon; 13 px → ~16 px) | INFERRED |

### 5.4 Radii

| Token | Value | Source | Why |
|---|---|---|---|
| `--radius-xs` | 4 px | Web (small artwork, apl scale) | |
| `--radius-sm` | 6 px | Native (macOS push button 6–7); Web (nav rows 6) | Also `--radius-min` |
| `--radius-md` | 8 px | Native (macOS sidebar selection 8, iPad chips 8); Web (Music nav 8) | |
| `--radius-lg` | 12 px | Native (macOS grouped box 12, menu 12); Web (Maps 12) | |
| `--radius-xl` | 16 px | Native (iOS tiles 16); Web (Maps platters 16) | |
| `--radius-2xl` | 20 px | Native (macOS popover 20, iPad list selection 20) | |
| `--radius-3xl` | 26 px | Native (iOS grouped card 26; macOS sheet 25, window 25–27) | |
| `--radius-4xl` | 38 px | Native (iOS sheet top 38) | |
| `--radius-full` | 9999 px | Web (pills everywhere), Native (capsules) | |
| `--radius-min` | 6 px | Native §5 (small controls keep ~6 pt) | Floor of the concentric rule |

Roles per density:

| Role | Comfortable | Compact | Source |
|---|---|---|---|
| `--radius-control` | capsule | 8 px | Native (iOS buttons, fields, chips are capsules; macOS push button ~0.27 × height, 8 at 28 px) |
| `--radius-selection` | 20 px | 8 px | Native (iPad list selection 20, near-capsule at 44 px; macOS sidebar 8) |
| `--radius-group` | 26 px | 12 px | Native (iOS card 26; System Settings box 12) |
| `--radius-menu` | 20 px | 12 px | Native (macOS menu 12); comfortable **INFERRED, not measured** |
| `--radius-popover` | 26 px | 20 px | Native (macOS popover 20); comfortable **INFERRED, not measured** |
| `--radius-sheet` | 38 px | 26 px | Native (iOS sheet 38; macOS sheet 25) |

**Concentric rule** (in the CSS comments): a nested shape uses `inner = max(outer − padding, var(--radius-min))`, written as `max(calc(var(--radius-3xl) - var(--space-8)), var(--radius-min))`; capsules stay capsules. Source: WWDC25 rule, checked in native-measurements.md §5, where it holds within 1 pt for close nesting and breaks for deep nesting with large insets (Apple keeps ~6 pt), hence the floor.

### 5.5 Motion

| Token | Value | Source | Why |
|---|---|---|---|
| `--duration-micro` | 100 ms | Web (global 0.1 s fade) | Press feedback, small fade-ins |
| `--duration-short` | 150 ms | Web (hovers 0.14–0.15 s); DocC 0.15 s | Hover and colour |
| `--duration-medium` | 200 ms | Web (0.2–0.21 s); DocC 0.2 s | Chevrons, badges, popovers |
| `--duration-long` | 300 ms | Web (drawers 0.3 s); DocC sidebar 0.3 s | Layout changes |
| `--duration-xlong` | 400 ms | Web (mobile header 0.4 s); digest MO2 | Sheets, large panels |
| `--duration-expressive` | 700 ms | Web (marketing reveals 0.5–0.9 s) | Landing pages only |
| `--ease-out` | cubic-bezier(0.22, 0.61, 0.36, 1) | INFERRED (an ease-out cubic, close to the curve Apple web uses for drawers) | Default: appearing and responding |
| `--ease-in` | cubic-bezier(0.55, 0.06, 0.68, 0.19) | INFERRED | Leaving |
| `--ease-in-out` | cubic-bezier(0.45, 0, 0.55, 1) | INFERRED | Movement and resizing on screen |
| `--ease-emphasized` | cubic-bezier(0.16, 1, 0.3, 1) | INFERRED | Sheets and hero reveals: long settle, **no overshoot** (no y value above 1) |
| `--motion-scale` | 1; 0 under reduced motion | HIG (Reduce Motion: replace movement with fades) | Multiply translate/scale distances by it |
| Reduced motion | long, xlong, expressive → 200 ms; fades keep working | HIG; digest MO1 (don't zero durations when the fade carries meaning) | Verified in Edge |

Nothing bounces: the owner's brief and the Apple web evidence (no spring overshoot in app UIs) agree. A `linear()` spring was considered and left out (no fallback if unsupported).

---

## 6. Contrast check

**Method.** A Node script (scratchpad, not in the repo) loads `tokens.css` in Microsoft Edge through `playwright-core`, emulates `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion` and `prefers-reduced-transparency` over CDP, resolves every colour token through `getComputedStyle` (so `var()` and `color-mix()` are evaluated by the browser), alpha-composites translucent colours over their layer, and computes the WCAG 2 ratio. Thresholds: body text 4.5:1, primary label 7:1 (HIG target), large text and UI 3:1, increased-contrast accent and palette text 7:1, tertiary 3:1 (4.5:1 in IC), quaternary none.

**Other checks in the same run, all passing:**
- The stylesheet parses: 24 rules, 508 of 508 declarations survive CSSOM parsing.
- `data-theme="light"` under a dark system resolves to exactly the light tokens (and `color-scheme: light`); `data-theme="dark"` under a light system resolves to exactly the system-dark tokens; the same for both increased-contrast combinations.
- No attribute = comfortable; type values per density as in §2.2, identical in light and dark; nested compact resolves 13/16; `--tracking-scale: 0` removes tracking.
- In a mobile touch context, compact `--hit-min` becomes 44 px and an input's text 16 px.
- Reduced transparency and increased contrast make the bar material opaque with `backdrop-filter: none`; reduced motion sets `--motion-scale: 0` and `--duration-xlong` to 0.2 s.
- The Tailwind preset references 188 tokens, all declared in `tokens.css`, with no literal values; a Tailwind 3.4 build of sample classes produced the expected `var()` output.

**Result: every required pair passes in all four modes.** Minimums over all layers:

| Mode | label | secondary | tertiary | quaternary | accent-text | white on accent | focus ring | accent as UI | control border | palette text |
|---|---|---|---|---|---|---|---|---|---|---|
| Light | 14.31 | 5.07 | 3.26 | 1.68 | 5.03 | 4.76 | 4.01 | 4.19 | 3.31 | 4.62 |
| Dark | 10.50 | 6.00 | 3.34 | 1.87 | 4.93 | 4.61 | 4.93 | 3.03 | 3.56 | 4.62 |
| Light IC | 17.67 | 8.47 | 5.44 | 2.79 | 7.07 | 6.54 | 5.50 | 5.75 | 5.60 | 7.01 |
| Dark IC | 12.08 | 8.05 | 5.74 | 3.34 | 7.08 | 4.61 | 7.08 | 3.03 | 6.05 | 7.02 |

Tight spots to know about: the dark accent fill against the dark elevated surface (3.03:1, the window between "white text 4.5:1" and "3:1 against the page" is narrow); light palette text sits at 4.62 on the tertiary layer by design.

### 6.1 Full matrices

Layers: page = `bg`, secondary, tertiary, grouped, grouped item, elevated, sidebar. A dot means the pair is not meaningful (e.g. accent fill as a switch on a tertiary group).

**Light**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 16.56 | 15.41 | 14.31 | 15.09 | 16.56 | 16.56 | 14.85 |
| label-secondary (4.5) | 5.32 | 5.20 | 5.07 | 5.16 | 5.32 | 5.32 | 5.13 |
| label-tertiary (3, non-essential) | 3.35 | 3.31 | 3.26 | 3.29 | 3.35 | 3.35 | 3.28 |
| label-quaternary (none, decorative) | 1.69 | 1.69 | 1.68 | 1.68 | 1.69 | 1.69 | 1.68 |
| accent-text (4.5) | 5.97 | 5.49 | 5.03 | 5.35 | 5.97 | 5.97 | 5.25 |
| focus-ring (3) | 4.76 | 4.37 | 4.01 | 4.27 | 4.76 | 4.76 | 4.19 |
| accent fill as UI (3) | 4.76 | · | · | · | 4.76 | 4.76 | 4.19 |
| border-control (3) | 3.35 | 3.31 | · | · | 3.35 | 3.35 | · |

**Dark**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 14.09 | 12.37 | 10.50 | 14.09 | 12.37 | 12.05 | 12.68 |
| label-secondary (4.5) | 7.46 | 6.79 | 6.00 | 7.46 | 6.79 | 6.66 | 6.92 |
| label-tertiary (3, non-essential) | 3.77 | 3.59 | 3.34 | 3.77 | 3.59 | 3.56 | 3.63 |
| label-quaternary (none, decorative) | 1.91 | 1.91 | 1.87 | 1.91 | 1.91 | 1.91 | 1.92 |
| accent-text (4.5) | 6.73 | 5.86 | 4.93 | 6.73 | 5.86 | 5.70 | 6.02 |
| focus-ring (3) | 6.73 | 5.86 | 4.93 | 6.73 | 5.86 | 5.70 | 6.02 |
| accent fill as UI (3) | 3.57 | · | · | · | 3.11 | 3.03 | 3.20 |
| border-control (3) | 3.77 | 3.59 | · | · | 3.59 | 3.56 | · |

**Light, increased contrast**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 21.00 | 19.29 | 17.67 | 18.82 | 21.00 | 21.00 | 18.46 |
| label-secondary (4.5) | 9.23 | 8.86 | 8.47 | 8.75 | 9.23 | 9.23 | 8.66 |
| label-tertiary (4.5) | 5.74 | 5.60 | 5.44 | 5.55 | 5.74 | 5.74 | 5.52 |
| label-quaternary (none) | 2.85 | 2.82 | 2.79 | 2.81 | 2.85 | 2.85 | 2.80 |
| accent-text (7) | 8.52 | 7.82 | 7.17 | 7.63 | 8.52 | 8.52 | 7.49 |
| focus-ring (3) | 6.54 | 6.01 | 5.50 | 5.86 | 6.54 | 6.54 | 5.75 |
| accent fill as UI (3) | 6.54 | · | · | · | 6.54 | 6.54 | 5.75 |
| border-control (3) | 5.74 | 5.60 | · | · | 5.74 | 5.74 | · |

**Dark, increased contrast**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 16.48 | 14.35 | 12.08 | 16.48 | 14.35 | 13.97 | 14.74 |
| label-secondary (4.5) | 10.44 | 9.32 | 8.05 | 10.44 | 9.32 | 9.11 | 9.53 |
| label-tertiary (4.5) | 7.09 | 6.47 | 5.74 | 7.09 | 6.47 | 6.35 | 6.59 |
| label-quaternary (none) | 3.77 | 3.59 | 3.34 | 3.77 | 3.59 | 3.56 | 3.63 |
| accent-text (7) | 9.66 | 8.41 | 7.08 | 9.66 | 8.41 | 8.18 | 8.64 |
| focus-ring (3) | 9.66 | 8.41 | 7.08 | 9.66 | 8.41 | 8.18 | 8.64 |
| accent fill as UI (3) | 3.57 | · | · | · | 3.11 | 3.03 | 3.20 |
| border-control (3) | 6.72 | 6.16 | · | · | 6.16 | 6.05 | · |

### 6.2 Other pairs

| Pair | Light | Dark | Light IC | Dark IC | Required |
|---|---|---|---|---|---|
| white on accent | 4.76 | 4.61 | 6.54 | 4.61 | 4.5 |
| white on accent-hover | 5.85 | 5.69 | 7.82 | 5.69 | 4.5 |
| white on accent-pressed | 7.00 | 6.82 | 9.08 | 6.82 | 4.5 |
| accent-text on accent-tint (over page) | 5.07 | 6.05 | 7.07 | 8.68 | 4.5 (IC 7) |
| label-secondary on fill-hover over page / sidebar | 5.16 / 4.97 | 6.63 / 6.07 | 8.44 / 7.89 | 8.12 / 7.30 | 4.5 |
| label-secondary on fill-selected over page / sidebar | 5.06 / 4.86 | 6.04 / 5.51 | 7.82 / 7.29 | 6.40 / 5.79 | 4.5 |
| palette text, worst of 9 colours on worst layer | 4.62 | 4.62 | 7.01 | 7.02 | 4.5 (IC 7) |
| label-secondary on bar solid / menu solid | 5.26 / 5.21 | 7.05 / 6.66 | 9.05 / 8.89 | 9.74 / 9.11 | 4.5 |
| label on bar glass over white / black content (before blur) | 16.15 / 8.77 | 5.41 / 14.63 | glass is opaque in IC | glass is opaque in IC | info |
| label-secondary on bar glass over white / black content | 5.28 / 4.17 | 3.56 / 7.65 | — | — | info |
| label-secondary on menu glass over white / black content | 5.23 / 4.56 | 4.33 / 7.17 | — | — | info |

---

## 7. Icon set recommendation

SF Symbols cannot be used on the web (licence; HIG digest I1). Three open sets compared on what makes SF Symbols feel like SF Symbols: a weight ladder that matches the text weight, outline and fill drawn as pairs, hierarchical (layered) rendering, and optical sizes. Facts were read from the installed npm packages on 2026-11-22; the "feel" column is our judgement (INFERRED).

| | Phosphor (`@phosphor-icons/core` 2.1.1) | Lucide (`lucide-static` 1.77.0) | Heroicons (`heroicons` 2.2.0) |
|---|---|---|---|
| Licence | MIT | ISC | MIT |
| Coverage | 1,512 icons | ~2,100 distinct drawings (2,410 files incl. aliases) | 324 icons |
| Weights | 6 styles per icon: thin, light, regular, bold, **fill**, **duotone** | One stroke style; `stroke-width` adjustable | Outline and solid |
| Stroke at 24 px | regular 1.5 px (16 on a 256 grid); light 1.125; bold 2.25 | 2 px default, round caps and joins | 1.5 px outline |
| Outline + fill pairs | Yes, every icon | No filled variants | Yes |
| Hierarchical look | Duotone (second layer at reduced opacity) | No | No |
| Optical sizes | No (one drawing, scaled) | No | **Yes: 24 outline/solid, 20 mini, 16 micro** |
| Standard actions (share = box + arrow up, more = ellipsis, gear, trash, magnifier) | All present (`export`, `dots-three`, `gear`, `trash`, `magnifying-glass`) | All present (`share`, `ellipsis`, `settings`, `trash-2`, `search`) | Present, but gaps appear quickly in app UI |
| Feel next to SF (INFERRED) | Closest structure: weights follow text weight, outline/fill from one drawing like SF's variants. Slightly rounder and friendlier in places. | Clean and neutral; the 2 px default reads heavier than SF Regular; can be thinned to 1.5. | Calm and close to SF at 1.5 px, but too small a set for apps. |

**Recommendation: Phosphor.** It is the only set that reproduces the SF Symbols system rather than one look: regular beside regular and medium text, bold beside bold titles, fill for the selected tab or sidebar item (HIG: outline in toolbars and lists, fill for selection), duotone where Apple would use hierarchical rendering. MIT, 1,512 icons, packages for plain SVG, web components and the common frameworks. Use one weight per context, `currentColor`, and size icons with `--icon-size*`. **Runner-up: Lucide**, when a project needs breadth and only outlines (set `stroke-width` to 1.5). Heroicons is the most SF-like in calm, with real optical sizes, but 324 icons will run out in an app. Phosphor's own glyphs should be checked against the standard-action table (HIG digest `icons-and-symbols.md` §3.1) when the foundation rules are written. No icon files were added.

---

## 8. Open taste questions for the round-2 board

Only what taste decides; each to be shown as a like-for-like pair on the same screen and device class (owner's round-1 rules). Everything else above follows from page type, platform evidence or accessibility.

1. **Comfortable body size:** 17 px (iOS) or a slightly smaller web size such as 16 px, on the same settings screen.
2. **Accent:** our deeper blue (#0a6ee8, white labels pass AA) against Apple's brighter #0088ff (white labels only 3.5:1, so it would need bold, larger labels), on the same primary button and selected row; optionally a non-blue default.
3. **Dark base:** dark grey #1f1f1f (current default) against black #000, same app screen in dark mode.
4. **Glass strength:** bar tint 72% with 20 px blur (current) against a lighter 55% (Apple Music) and a heavier 85%, over the same scrolled content.
5. **Landing headline scale:** hero headline up to 96 px (current) against ~80 px and ~120 px, with the same image and copy; and tight (−0.015em) against neutral tracking.
6. **Title weight:** bold large and section titles (current, as in Apple's apps) against regular-weight titles (HIG base weight, DocC).
7. **Card roundness in comfortable density:** 26 px (iOS grouped card, current) against a softer-web 16–20 px, same grouped list.
8. *(Optional)* **Icon set:** Phosphor against Lucide at 1.5 px in the same toolbar and sidebar.

## 9. Open checks (not taste)

- **Tracking on Safari:** test on a Mac whether Safari already applies SF's size-specific tracking to `system-ui`. If it does, set `--tracking-scale: 0`. Edge on Windows was the only browser used here.
- **Hairlines:** the 1 px CSS separator is 2 device px on Retina, heavier than the native 1-device-px line; the 12% alpha compensates. Confirm on a Retina screen in the example page (step 2).
- **Comfortable menu and popover radii** (20 / 26 px) are not measured; check them on the example page.
- **Dark accent window:** white on the dark accent passes at 4.61, and the fill against the dark elevated surface at 3.03. A rebrand to a lighter hue will fail one of the two; re-run the check for any new accent.
