# Token rationale: where every value in `tokens/tokens.css` comes from

Phase 2, step 1 (see [PLAN.md](PLAN.md)). Drafted 2026-11-22; revised the same day after [critique-1.md](critique-1.md) (what changed and why: §10). This file explains the token draft group by group, records the contrast check, recommends an icon set and lists the taste questions for the round-2 board. The tokens are a draft until the board and the example page have tested them.

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
| Theme switch | Light on `:root` and on any `[data-theme="light"]`; dark under `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`, repeated on any `[data-theme="dark"]`; `[data-theme="light"]` forces `color-scheme: light` | HIG (follow the system), Owner (theme follows system; a project may add a toggle), DocC (Light/Dark/Auto with Auto default) | The system wins by default; a page toggle still works in both directions. The check found that without the explicit `color-scheme: light`, a forced-light page under a dark system would draw dark form controls and scrollbars, so that rule was added. |
| Theme islands | `data-theme` works on any element, like `data-density` (critique T-M1). Derived colours (accent hover, pressed, tint; glass) are declared on `:root, [data-theme]` so an island computes them from its own accent. `:where([data-theme]:not(:root)) { color: var(--color-label) }` re-resolves the island's text colour with zero specificity. `:root[data-theme="dark"]` is listed beside `[data-theme="dark"]` only for specificity, so the light increased-contrast block cannot win on the page element. | Web (apple.com gives a local nav the dark look over dark heroes); DocC (a "dark island" token set for heroes and video modals) | A nav over a dark hero, a dark media band or a dark product tile, inside a light page. Verified: a dark island under a light system and a light island under a dark system resolve all 59 colour tokens (derived included) exactly like the full theme, with and without increased contrast, with the right `color-scheme` and text colour. An island still needs its own background. |
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
| `--text-display-1-*` | `clamp(2.75rem, 1.5rem + 4.6vw, 5.5rem)` | 44 → 88 px | 1.05 · 700 | Web: apple.com headlines 70–88 px; DocC headline 48/52 → 32/36 (leading 1.08) | Hero headline. Maximum lowered from 96 to 88 px to stay inside Apple's measured range (critique T-m3: at 96 px in Segoe UI Bold the headline turned blunt and needed three lines). Still a board question. |
| `--text-display-2-*` | `clamp(2rem, 1.25rem + 3vw, 4rem)` | 32 → 63 px | 1.08 · 700 | DocC heading scale 32–48 | Section headline |
| `--text-display-3-*` | `clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)` | 24 → 40 px | 1.15 · 600 | DocC h3 28/32, card titles semibold | Sub-section, tile headline |
| `--text-lead-*` | `clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)`, tracking −0.01em | 19 → 24 px | 1.4 · 400 | DocC intro 21/29, 19/27 small; tracking INFERRED | Intro paragraph under a headline. Tracking token added so every style ships one (critique T-m2). |
| `--text-eyebrow-*` | `clamp(1rem, 0.9rem + 0.4vw, 1.3125rem)`, tracking 0 | 16 → 20 px | 1.25 · 600 | DocC eyebrow 19–21 px | Kicker above a headline |

The rem term in every `clamp()` keeps WCAG 1.4.4 text resize working (a pure `vw` size would ignore zoom).

---

## 3. Colour

All values are ours unless the source column says otherwise; they were tuned with the contrast script (§6). Light greys keep Apple's slight cool tint (#f2f2f7 family); dark greys are neutral, like the Apple web apps.

### 3.1 Background layers

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--color-bg` | #ffffff | **#1f1f1f** | Web (Music, Podcasts page #1f1f1f); Owner (layered dark greys, not black, as default) | Page and window content. Black is kept for the board (§7). |
| `--color-bg-secondary` | #f5f5f7 | **#303030** | Web (App Store page #f5f5f7); Native (macOS settings box #f7f7f7 on white; iOS dark card #2c2c2e on #1c1c1e) | A box or inset group on the page |
| `--color-bg-tertiary` | #ebebf0 | **#424242** | INFERRED (one step further on each ladder) | A group inside a group; in dark, groups inside sheets |
| `--color-bg-grouped` | #f2f2f7 | #1f1f1f | Native (iOS grouped page #f2f2f7; in iOS dark, grouped and plain page are the same colour) | Page behind inset-grouped lists |
| `--color-bg-grouped-item` | #ffffff | **#303030** | Native (white cards; #2c2c2e on #1c1c1e dark) | The cards on a grouped page |
| `--color-bg-elevated` | #ffffff | **#393939** | HIG (elevated surfaces are brighter in dark mode); values INFERRED | Sheets, popovers, menus, dialogs |
| `--color-bg-sidebar` | #f0f0f3 | #282828 | Native (macOS sidebar #ededed light, #292929 dark against content #1e1e1e; iPad #f1f2f3) | Opaque sidebar; wallpaper tint deliberately left out |

**Dark ladder (revised after critique T-M2).** The first draft packed sidebar, cards and elevated surfaces into #282828–#2c2c2c, 1.00–1.03:1 apart, so a window, its sidebar and the frame around it merged. The ladder now climbs in even steps of about 0.035 in OKLab lightness: page #1f1f1f → sidebar #282828 → cards #303030 → elevated #393939 → group-in-a-group #424242, each neighbour 1.12–1.15:1 from the next (similar to Apple's own gaps: iOS card on page #1c1c1e → #2c2c2e, macOS content → sidebar #1e1e1e → #292929). Rule in the CSS comments: in dark mode never place `bg` or `bg-grouped` on `bg-secondary`; a darker surface inside a lighter one reads as a hole.

### 3.2 Labels

| Token | Light | Dark | IC light | IC dark | Source | Why |
|---|---|---|---|---|---|---|
| `--color-label` | black 88% | white 92% | black 100% | white 100% | Web (Chromium branch 88% / 92%; IC 100%) | ≥ 14:1 light, ≥ 8.8:1 dark on every layer (above the HIG 7:1 target) |
| `--color-label-secondary` | black **58%** | white 64% | black 72% | white 78% | Web (56% / 64%); raised by us | Apple's Safari value (50%) is 3.95:1 and fails; 56% fails on the grey layers. 58% passes 4.5:1 on every layer, including hover and selection fills (min 4.86). |
| `--color-label-tertiary` | black 45% | white **42%** | black 60% | white 62% | Web (48% / 40%); INFERRED | ≥ 3:1 everywhere. **Non-essential text only**: disabled controls, unavailable items (HIG Labels page), decorative metadata. Not for placeholders that carry meaning. In IC it reaches 4.5:1. |
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
| `--color-control-track` | rgb(120 120 128) at 20% | same grey at 24% | Native (iOS segmented track #e3e3e8 light; switch off-track #e4e4e4 light, #3b3b3d dark); Web (segmented track 12% / 24%) | Track of a segmented control, off-track of a switch. IC 32%. (Critique T-M3.) |
| `--color-control-thumb` | #ffffff | **#636363** | Native (iOS thumb #ffffff light, #6c6c71 dark); critique suggested #636366 | Selected segment, switch knob. Always lighter than the track: in dark the first draft's pages fell back to the card colour, which was darker than the track and read as a hole. Neutral #636363 instead of #636366 to keep the dark ladder one hue. Dark thumb against track: 2.06 / 1.69 / 1.52:1 on page / card / elevated (required ≥ 1.4 and lighter, our threshold; the selected segment also gets the heavier label weight). IC dark #7a7a7a. |
| `--shadow-control-thumb` | 1px ring 4% + 0 1px 3px 12% | none | Native (light thumbs carry a soft shadow; dark ones do not) | Light: the white thumb on a pale track (1.27:1) is drawn by its shadow, as on iOS. IC light raises the ring to 30%; IC dark adds a 30% white ring. |

### 3.5 Accent, focus

| Token | Light | Dark | IC light | IC dark | Source | Why |
|---|---|---|---|---|---|---|
| `--color-accent` (fill) | **#0a6ee8** | **#0070ee** | #0259c2 | #0070ee | Owner (Apple-like blue, used as a fill); values INFERRED | Apple's #007aff and #0088ff give white text only 4.0 and 3.5:1. Ours is a little deeper so white button labels pass 4.5:1 (4.76 / 4.61). Dark cannot be lighter without failing white text, and in IC dark it cannot be darker without falling under 3:1 against the page, so it stays put. |
| `--color-accent-hover` / `-pressed` | accent mixed 12% / 22% with black | same rule | — | — | Web (App Store rollover and pressed are darker); INFERRED | `color-mix()` so they follow any rebrand. White text gets stronger (5.7–9.1:1). |
| `--color-accent-tint` | accent at 12% | same rule | — | — | Web (tinted "View" button 6–10%) | Background of a tinted (secondary) button |
| `--color-on-accent` | #ffffff | #ffffff | — | — | — | Text and icons on the accent fill |
| `--color-accent-text` | **#055fcc** | **#77b6fe** | #0449a0 | #bedcff | Web (docs links #0066cc / #2997ff); INFERRED values | Links and accent-coloured text. ≥ 5.0:1 light, ≥ 4.7:1 dark on every layer (lightened from #5ca9ff for the lighter #424242 layer) and on the tint; ≥ 7:1 in IC. Not for text on glass (critique: 3.2–4.1:1 over dark content); keep glass text at `--color-label`. |
| `--color-focus-ring` | = accent | = accent-text | = accent | = accent-text | Web (ring in the accent); WCAG 1.4.11 | ≥ 4.0:1 against every layer |
| Accent fill as a UI shape | | | | | WCAG 1.4.11 | **Revised.** Required ≥ 3:1 against the page and the sidebar, where the fill alone marks a selection (selected sidebar row, prominent button): light 4.76 / 4.19, dark 3.57 / 3.20. On cards and elevated surfaces in dark it is now 2.86 / 2.50 (2.18 on tertiary): white text on the accent can only pass 4.5:1 if the accent stays dark, and the spread ladder made those surfaces lighter, so both cannot hold. There the state is carried by the indicator on the fill (white switch knob, check mark or label, 4.61:1 on the fill), which is what WCAG 1.4.11 asks for; the fill-against-surface ratio is reported as info. A rebrand with a lighter accent would need dark text on it. |
| `--focus-ring-width` / `-offset` | 3 px / 2 px | | | | Web (4 px ring at 60% alpha); DocC (keyboard-only rings); INFERRED | Apple's 60%-alpha ring is 2.3:1 on white. A solid ring with a 2 px gap passes 3:1 and stays visible around an accent-filled button. Use with `:focus-visible`. |

### 3.6 Meaningful colours

Fill = HIG 2025 system colour (VERIFIED values). Text = ours: the HIG hue moved in OKLCH lightness until it passes on **every** layer (light and dark: 4.5:1; increased contrast: 7:1). Where the HIG fill already passes, the text token points at the fill.

| Colour | Fill light · dark | Text light · dark | Fill IC light · dark | Text IC light · dark |
|---|---|---|---|---|
| red | #ff383c · #ff4245 | #d30725 · #ff9189 | #e9152d · #ff6165 | #9f061a · #ffcbc8 |
| orange | #ff8d28 · #ff9230 | #b04a03 · #fe9741 | #c55300 · #ffa056 | #843603 · #feceac |
| yellow | #ffcc00 · #ffd600 | #905f05 · = fill | #a16a00 · #fedf43 | #6c4603 · = fill |
| green | #34c759 · #30d158 | #057a2d · = fill | #008932 · #4ad968 | #035b20 · #67f380 |
| teal | #00c3d0 · #00d2e0 | #057388 · = fill | #008198 · #3bddec | #035565 · #50ecfb |
| blue | #0088ff · #0091ff | #0c60e5 · #6eb4fe | #1e6ef4 · #5cb8ff | #0246b0 · #b5ddff |
| indigo | #6155f5 · #6d7cff | #564ade · #9aabff | #564ade · #a7aaff | #4631c6 · #d2d5ff |
| purple | #cb30e0 · #db34f2 | #ac2abe · #f088ff | #b02fc2 · #ea8dff | #870797 · #f5c9ff |
| pink | #ff2d55 · #ff375f | #d10443 · #ff9098 | #e7124d · #ff8ac4 | #9e0431 · #ffc9e1 |

Why: HIG light colours are fills, not text colours (only indigo reaches 4.5:1 on white); several HIG dark colours fail on our grey layers. The dark text values were lightened again after the ladder was spread (the #424242 layer is the binding one), so in dark mode they are paler than the fills; the fills stay HIG-saturated. Owner: colour that carries meaning in small elements is liked, colour as a page wash is not; so these are for tags, events, status dots and charts. Mint, cyan and brown were left out to keep the brief's nine; they can be added the same way. The palette blue is for meaning; interaction uses the accent.

### 3.7 Overlays

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--color-scrim` | black 40% | black 50% | DocC 0.4, Web 0.45 | Behind modal sheets; dark needs more to read over a grey page (INFERRED) |
| `--color-media-dim` | black 35% | black 35% | HIG (35% dark dimming behind clear glass over bright media) | Only for controls floating over photos and video |
| `--color-on-media` | #ffffff | same | critique T-m1 | Text on photos and video; the image does not change with the theme, so neither does this |
| `--color-on-media-secondary` | white 86% | same | critique T-m1 | Secondary lines on media |
| `--color-media-scrim` | black 45% | same | critique T-m1; INFERRED | Under **large** text on a photo: white over a 45% scrim on a pure white pixel is 3.35:1 (passes 3:1 for large text only) |
| `--color-media-scrim-strong` | black 62% | same | INFERRED (computed) | Under body-size text, links and secondary lines: white 6.20:1 and white 86% 5.10:1 even over a pure white pixel. Added because the critique's single 45% scrim leaves secondary text at 2.9:1 over bright pixels (its own P-B3 failure). Text on media is checked against the brightest pixel under it. |

---

## 4. Materials, shadows

### 4.1 Materials (chrome only)

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--material-bar` (tint) | rgb(250 250 252 / 0.72) | rgb(38 38 38 / 0.72) | Owner (start from Apple web, about `saturate(180%) blur(20px)`); Web (bars 55–80% tint); DocC (70%) | Top bars, toolbars, tab bars |
| `--material-bar-backdrop` | `saturate(180%) blur(20px)` | same | Owner, DocC, Web (marketing local nav) | |
| `--material-menu` (tint) | rgb(246 246 248 / 0.82) | rgb(57 57 57 / 0.82) (follows the new elevated #393939) | Web (menus 70–72% with blur 50–60 px); INFERRED (thicker for legibility) | Menus, popovers, floating sidebars: surfaces that hold more text (HIG: thicker material where text sits) |
| `--material-menu-backdrop` | `saturate(180%) blur(40px)` | same | Web (50–60 px); INFERRED | |
| `--material-*-solid` | #fafafc / #f6f6f8 | #262626 / #393939 | Web (every material has an opaque fallback) | Used automatically under `prefers-reduced-transparency: reduce`, `prefers-contrast: more`, and when `backdrop-filter` is unsupported (verified in Edge) |

Rules carried in the comments: glass only on chrome (HIG, Owner: liked on bars and toolbars, disliked on content tiles and tall panels); never text on an unblurred translucent layer; use both `backdrop-filter` and `-webkit-backdrop-filter`; text on glass stays `--color-label` with monochrome icons (critique P-B4: accent text on the light bar over a dark hero measured 3.2–4.1:1). Over a dark hero, give the bar the dark theme with `data-theme="dark"` instead of the light glass (critique P-M1).

Worst case before blur (info, from the check): secondary text on the light bar over pure black content is 4.17:1, on the dark bar over pure white content 3.56:1 (dark menu 3.82:1). Blur averages real content toward the middle, but this is why the comment says to keep bars to primary labels and icons. Glass strength is on the board.

### 4.2 Shadows

| Token | Light | Dark | Source | Why |
|---|---|---|---|---|
| `--shadow-raised` | 0 1px 2px 5%, 0 2px 8px 6% | 30% / 30% | Web (App Store cards 0 3px 9px 8%) | Rare: a card that must lift off the page |
| `--shadow-floating` | 0 2px 6px 6%, 0 10px 30px 10% | 1px white ring 6% + 30% / 40% | Web (floating player 0 10px 40px 10%, dark 20%) | Floating controls, small popovers, a window shown on a page. The dark rim was added after critique T-m4 (a floating window lost its edge in dark). IC adds a 30% ring in both themes. |
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
| `--pad-row-y` | 9 · 4 (10 on touch in compact) | INFERRED: `(row-height − control-height-sm) / 2` | Vertical row padding (critique T-M4). A row with `min-height: var(--row-height)` and this padding stays exactly on token whether it holds text or a small control (52 = 34 + 2 × 9; 32 = 24 + 2 × 4). Computed, so it follows the touch override. |
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
| `--switch-width` × `--switch-height` | 63 × 28 | 36 × 20 | Native (iOS 26 switch 63 × 28 with a ~37 × 24 pill knob; macOS small switch 36 × 16) | Added after critique P-m7 (the page hard-coded switch ratios). Comfortable follows the current iOS measurement, not the older 51 × 31. Compact height raised from 16 to 20 (INFERRED); extend the hit area to `--hit-min`. |
| Touch override (compact) | — | rows 24 / 32 / 32 / 28 → 44 | WCAG 2.5.8 + HIG 44 pt (critique T-m5) | Under `(pointer: coarse)` compact dense, list, sidebar and menu rows become 44 px, so a compact project is still touch-safe without each component remembering `max()`. Verified in a mobile context. |

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

**Other checks in the same run, all passing (revision 1):**
- The stylesheet parses: 26 rules, 544 of 544 declarations survive CSSOM parsing.
- `data-theme="light"` under a dark system resolves to exactly the light tokens (and `color-scheme: light`); `data-theme="dark"` under a light system resolves to exactly the system-dark tokens; the same for both increased-contrast combinations.
- Theme islands: a `data-theme="dark"` element inside a light page and a `data-theme="light"` element inside a dark page resolve all 59 colour tokens (derived accent hover, pressed, tint and glass included) exactly like the full theme, with and without increased contrast; the island's `color-scheme` and text colour follow.
- No attribute = comfortable; type values per density as in §2.2, identical in light and dark; nested compact resolves 13/16; `--tracking-scale: 0` removes tracking; display-1 is 44 px at 390 and 88 px at 1440; lead tracking −0.01em.
- `--pad-row-y` computes to 9 px (comfortable) and 4 px (compact); switches 63 × 28 and 36 × 20.
- In a mobile touch context, compact `--hit-min` and all compact row heights become 44 px, `--pad-row-y` 10 px, and an input's text 16 px.
- Reduced transparency and increased contrast make the glass opaque with `backdrop-filter: none`; reduced motion sets `--motion-scale: 0` and `--duration-xlong` to 0.2 s.
- The Tailwind preset references 200 tokens, all declared in `tokens.css`, with no literal values; a Tailwind 3.4 build of sample classes produced the expected `var()` output. (The build caught a name collision: `shadow-control-thumb` also matched the `control-thumb` colour and turned into a coloured shadow, so the shadow utility is `shadow-thumb`.)

**Result: every required pair passes in all four modes.** Minimums over all layers:

| Mode | label | secondary | tertiary | quaternary | accent-text | white on accent | focus ring | accent as UI (page, sidebar) | control border | palette text | thumb vs track |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | 14.31 | 5.07 | 3.26 | 1.68 | 5.03 | 4.76 | 4.01 | 4.19 | 3.31 | 4.62 | 1.27 (shadow) |
| Dark | 8.81 | 5.23 | 3.20 | 1.80 | 4.74 | 4.61 | 4.74 | 3.20 | 3.27 | 4.61 | 1.52 |
| Light IC | 17.67 | 8.47 | 5.44 | 2.79 | 7.07 | 6.54 | 5.50 | 5.75 | 5.60 | 7.01 | 1.48 (shadow) |
| Dark IC | 10.05 | 6.88 | 5.02 | 3.05 | 7.12 | 4.61 | 7.12 | 3.20 | 5.31 | 7.00 | 1.96 |

Tight spots to know about: dark tertiary labels on the #424242 layer (3.20); dark accent text on that layer (4.74); dark palette text at 4.61 on it by design; the dark accent fill on cards and elevated surfaces (2.86 / 2.50, info, see §3.5).

### 6.1 Full matrices

Layers: page = `bg`, secondary, tertiary, grouped, grouped item, elevated, sidebar. A dot means the pair is not meaningful. In the accent-fill row only page and sidebar are required; the other values are info (§3.5).

**Light**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 16.56 | 15.41 | 14.31 | 15.09 | 16.56 | 16.56 | 14.85 |
| label-secondary (4.5) | 5.32 | 5.20 | 5.07 | 5.16 | 5.32 | 5.32 | 5.13 |
| label-tertiary (3, non-essential) | 3.35 | 3.31 | 3.26 | 3.29 | 3.35 | 3.35 | 3.28 |
| label-quaternary (none, decorative) | 1.69 | 1.69 | 1.68 | 1.68 | 1.69 | 1.69 | 1.68 |
| accent-text (4.5) | 5.97 | 5.49 | 5.03 | 5.35 | 5.97 | 5.97 | 5.25 |
| focus-ring (3) | 4.76 | 4.37 | 4.01 | 4.27 | 4.76 | 4.76 | 4.19 |
| accent fill as UI (3 on page, sidebar; info elsewhere) | 4.76 | · | 4.01 | · | 4.76 | 4.76 | 4.19 |
| border-control (3) | 3.35 | 3.31 | · | · | 3.35 | 3.35 | · |

**Dark**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 14.09 | 11.42 | 8.81 | 14.09 | 11.42 | 10.06 | 12.68 |
| label-secondary (4.5) | 7.46 | 6.40 | 5.23 | 7.46 | 6.40 | 5.80 | 6.92 |
| label-tertiary (3, non-essential) | 4.01 | 3.67 | 3.20 | 4.01 | 3.67 | 3.44 | 3.85 |
| label-quaternary (none, decorative) | 1.91 | 1.90 | 1.80 | 1.91 | 1.90 | 1.85 | 1.92 |
| accent-text (4.5) | 7.78 | 6.23 | 4.74 | 7.78 | 6.23 | 5.45 | 6.96 |
| focus-ring (3) | 7.78 | 6.23 | 4.74 | 7.78 | 6.23 | 5.45 | 6.96 |
| accent fill as UI (3 on page, sidebar; info elsewhere) | 3.57 | · | 2.18 | · | 2.86 | 2.50 | 3.20 |
| border-control (3) | 3.77 | 3.47 | · | · | 3.47 | 3.27 | · |

**Light, increased contrast**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 21.00 | 19.29 | 17.67 | 18.82 | 21.00 | 21.00 | 18.46 |
| label-secondary (4.5) | 9.23 | 8.86 | 8.47 | 8.75 | 9.23 | 9.23 | 8.66 |
| label-tertiary (4.5) | 5.74 | 5.60 | 5.44 | 5.55 | 5.74 | 5.74 | 5.52 |
| label-quaternary (none, decorative) | 2.85 | 2.82 | 2.79 | 2.81 | 2.85 | 2.85 | 2.80 |
| accent-text (7) | 8.52 | 7.82 | 7.17 | 7.63 | 8.52 | 8.52 | 7.49 |
| focus-ring (3) | 6.54 | 6.01 | 5.50 | 5.86 | 6.54 | 6.54 | 5.75 |
| accent fill as UI (3 on page, sidebar; info elsewhere) | 6.54 | · | 5.50 | · | 6.54 | 6.54 | 5.75 |
| border-control (3) | 5.74 | 5.60 | · | · | 5.74 | 5.74 | · |

**Dark, increased contrast**

| Foreground (required) | page | secondary | tertiary | grouped | grouped item | elevated | sidebar |
|---|---|---|---|---|---|---|---|
| label (7) | 16.48 | 13.20 | 10.05 | 16.48 | 13.20 | 11.55 | 14.74 |
| label-secondary (4.5) | 10.44 | 8.68 | 6.88 | 10.44 | 8.68 | 7.75 | 9.53 |
| label-tertiary (4.5) | 7.09 | 6.11 | 5.02 | 7.09 | 6.11 | 5.56 | 6.59 |
| label-quaternary (none, decorative) | 3.77 | 3.47 | 3.05 | 3.77 | 3.47 | 3.27 | 3.63 |
| accent-text (7) | 11.67 | 9.35 | 7.12 | 11.67 | 9.35 | 8.18 | 10.44 |
| focus-ring (3) | 11.67 | 9.35 | 7.12 | 11.67 | 9.35 | 8.18 | 10.44 |
| accent fill as UI (3 on page, sidebar; info elsewhere) | 3.57 | · | 2.18 | · | 2.86 | 2.50 | 3.20 |
| border-control (3) | 6.72 | 5.83 | · | · | 5.83 | 5.31 | · |

### 6.2 Other pairs

| Pair | Light | Dark | Light IC | Dark IC | Required |
|---|---|---|---|---|---|
| white on accent | 4.76 | 4.61 | 6.54 | 4.61 | 4.5 |
| white on accent-hover | 5.85 | 5.69 | 7.82 | 5.69 | 4.5 |
| white on accent-pressed | 7.00 | 6.82 | 9.08 | 6.82 | 4.5 |
| accent-text on accent-tint (over page) | 5.07 | 6.99 | 7.07 | 10.49 | 4.5 (IC 7) |
| label-secondary on fill-hover over page / sidebar | 5.16 / 4.97 | 6.63 / 6.07 | 8.44 / 7.89 | 8.12 / 7.30 | 4.5 |
| label-secondary on fill-selected over page / sidebar | 5.06 / 4.86 | 6.04 / 5.51 | 7.82 / 7.29 | 6.40 / 5.79 | 4.5 |
| palette text, worst of 9 colours on worst layer | 4.62 | 4.61 | 7.01 | 7.00 | 4.5 (IC 7) |
| control-thumb on control-track over page / card / elevated | 1.27 (all) | 2.06 / 1.69 / 1.52 | 1.48 (all) | 2.58 / 2.16 / 1.96 | dark ≥ 1.4 and thumb lighter; light: shadow draws the thumb |
| on-media on media-scrim, over a pure white pixel | 3.35 | 3.35 | 3.35 | 3.35 | 3 (large text only) |
| on-media on media-scrim-strong, over a pure white pixel | 6.20 | 6.20 | 6.20 | 6.20 | 4.5 |
| on-media-secondary on media-scrim-strong, over a pure white pixel | 5.10 | 5.10 | 5.10 | 5.10 | 4.5 |
| label-secondary on bar solid / menu solid | 5.26 / 5.21 | 7.05 / 5.80 | 9.05 / 8.89 | 9.74 / 7.75 | 4.5 |
| label on bar glass over white / black content (before blur) | 16.15 / 8.77 | 5.41 / 14.63 | glass is opaque in IC | glass is opaque in IC | info |
| label-secondary on bar glass over white / black content | 5.28 / 4.17 | 3.56 / 7.65 | — | — | info |
| label-secondary on menu glass over white / black content | 5.23 / 4.56 | 3.82 / 6.48 | — | — | info |

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
3. **Dark base:** dark grey #1f1f1f (current default) against black #000, same app screen in dark mode. (With a black base the ladder above it would shift down by the same steps.)
4. **Glass strength:** bar tint 72% with 20 px blur (current) against a lighter 55% (Apple Music) and a heavier 85%, over the same scrolled content.
5. **Landing headline scale:** hero headline up to 88 px (current, the top of Apple's measured range) against ~72 px and ~104 px, with the same image and copy; and tight (−0.015em) against neutral tracking.
6. **Title weight:** bold large and section titles (current, as in Apple's apps) against regular-weight titles (HIG base weight, DocC).
7. **Card roundness in comfortable density:** 26 px (iOS grouped card, current) against a softer-web 16–20 px, same grouped list.
8. *(Optional)* **Icon set:** Phosphor against Lucide at 1.5 px in the same toolbar and sidebar.

## 9. Open checks (not taste)

- **Tracking on Safari:** test on a Mac whether Safari already applies SF's size-specific tracking to `system-ui`. If it does, set `--tracking-scale: 0`. Edge on Windows was the only browser used here.
- **Hairlines:** the 1 px CSS separator is 2 device px on Retina, heavier than the native 1-device-px line; the 12% alpha compensates. Confirm on a Retina screen in the example page (step 2).
- **Comfortable menu and popover radii** (20 / 26 px) are not measured; check them on the example page.
- **Dark accent:** white on the dark accent passes at 4.61; against the page and sidebar the fill passes 3:1, on lighter dark surfaces it relies on its indicator (§3.5). A rebrand to a lighter hue needs dark text on the fill; re-run the check for any new accent.
- **Dark ladder on real screens:** the 1.12–1.15:1 steps are computed; confirm on the example page (critique crops) that window, sidebar and frame now separate on a typical laptop panel.

---

## 10. Revision 1 (after critique-1.md, 2026-11-22)

Only the token findings were applied; page findings belong to the example page.

| Finding | Change | Old → new |
|---|---|---|
| T-M1 theme scoping | `data-theme` works on any element; derived colours and the text colour re-resolve on the island (§1) | `:root` only → `:root` + any `[data-theme]` |
| T-M2 dark steps too close | Even dark ladder (§3.1) | sidebar #282828 → #282828 (kept); secondary #2a2a2a → **#303030**; grouped-item #2a2a2a → **#303030**; elevated #2c2c2c → **#393939**; tertiary #363636 → **#424242**; page and grouped #1f1f1f (kept). Neighbours 1.00–1.03:1 → 1.12–1.15:1 |
| (follows T-M2) | Retuned for the lighter layers | dark tertiary label 40% → 42%; dark accent-text #5ca9ff → #77b6fe; IC dark accent-text #9ccaff → #bedcff; dark palette text and IC dark palette text lightened (§3.6); dark menu glass tint/solid follow the new elevated (#2c2c2c → #393939) |
| T-M3 selected thumb | New `--color-control-track`, `--color-control-thumb`, `--shadow-control-thumb` (§3.4) | — → light #ffffff on 20% grey + soft shadow; dark #636363 on 24% grey, no shadow |
| T-M4 vertical row padding | New `--pad-row-y`, computed (§5.1) | — → 9 px / 4 px (10 px compact on touch) |
| T-m1 media tokens | New `--color-on-media`, `--color-on-media-secondary`, `--color-media-scrim`, `--color-media-scrim-strong` (§3.7) | — → #fff, white 86%, black 45%, black 62% |
| T-m2 lead tracking | New `--text-lead-tracking` (and `--text-eyebrow-tracking`) | — → −0.01em (eyebrow 0) |
| T-m3 display maximum | `--text-display-1-size` (§2.4) | 96 px → 88 px max |
| T-m4 dark floating rim | `--shadow-floating` dark gets a 1 px white ring at 6%; IC 30% in both themes | no rim → rim |
| T-m5 touch rows | Compact rows become 44 px under `(pointer: coarse)` (§5.3) | 24–32 px → 44 px on touch |
| P-m7 switch ratios | New `--switch-width`, `--switch-height` (§5.3) | — → 63 × 28 / 36 × 20 |
| Glass note | Comment: text on glass stays `--color-label` | — |

**Where we departed from the critique, and why**
- **Dark ladder values.** The critique suggested #2c2c2e / #333335 / #3a3a3c with sidebar #282828. Those mix cool-tinted greys into a neutral ladder and still leave sidebar against cards at 1.05:1. We used neutral greys in even OKLab steps instead, which separates every neighbour by at least 1.12:1.
- **Thumb colour.** #636363 instead of #636366, to keep the dark ladder one hue; same lightness.
- **Row padding.** The critique proposed 11 px comfortable. With a 34 px small control in a 52 px row, 11 px makes a 56 px row, so we derive the padding as (row − small control) / 2 = 9 px, which keeps rows on token with or without a control.
- **Media scrim.** A single 45% scrim (critique T-m1) leaves body-size and secondary text below 4.5:1 over bright pixels (white 3.35:1, white 86% 2.91:1 over a white pixel), which is the critique's own P-B3 failure. We kept 45% for large type and added a 62% strong scrim for body text.
- **Accent fill against raised dark surfaces.** Spreading the ladder costs this pair (now 2.86 on cards, 2.50 on elevated). We did not darken the surfaces back, because the critique's main point (separable layers) matters more and WCAG 1.4.11 is met by the indicator on the fill (§3.5). Recorded here so nobody re-tightens one without seeing the other.
- **Switch size.** The page's 50 × 30 matched older iOS (51 × 31); our token follows the current iOS 26 measurement in native-measurements.md (63 × 28).
