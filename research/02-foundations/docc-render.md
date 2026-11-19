# Swift-DocC-Render: Apple's open-source web UI, read as design data

Round 02 (foundations), source study. Read 2026-11-19.

Markers used below:
- **VERIFIED**: read directly in the source at the commit named below (file path given).
- **COMPUTED**: our own arithmetic on verified values (WCAG 2 contrast, alpha compositing, px → ratio).
- **INFERRED**: our reading or opinion; not stated in the source.

## 1. What the project is

| Item | Value |
|---|---|
| Repository | https://github.com/swiftlang/swift-docc-render (formerly `apple/swift-docc-render`; the old URL redirects) |
| Commit read | `2b63cab97d090e61c28cc6c92e26df84a32b97c6`, committed 2026-11-04 (shallow clone, nothing installed or built) |
| What it is | The Vue 2 single-page app that renders DocC documentation archives (Swift/Xcode docs, swift.org docs, any DocC-built site). Content arrives as "Render JSON"; this app draws the nav bar, the adjustable navigator sidebar, topic pages, cards, asides, code listings, Quick Navigation (search) and tutorials. |
| Style system | SCSS (≈3,050 lines in `src/styles/`) plus scoped `<style>` blocks in ~258 `.vue` components. Colours are CSS custom properties; type, spacing, breakpoints, radii are SCSS variables and maps compiled into the CSS. |
| Theming hook | A site may ship `theme-settings.json`; `src/utils/themes.js` flattens its `theme` object into CSS custom properties on `<body>` (e.g. `theme.colors.text` → `--colors-text`, `theme["border-radius"]` → `--border-radius`, `{light, dark}` pairs resolved by the current scheme). Most components read `var(--colors-X, var(--color-X))`, so the theme wins over the defaults. |

**Important caveat (INFERRED, high confidence):** what is in this repository is the *default* theme. Apple's own sites that run DocC (developer.apple.com/documentation, swift.org) layer their own theme (fonts, accent, radii, the `--color-type-icon-*` colours that are referenced but never defined here) on top. So this file tells us how Apple engineers *structure* a design system for the web, and gives many concrete layout/type numbers, but its colour and font defaults are deliberately generic and are **not** Apple's branded values. The branded values on Apple's live sites are covered by the sibling file `apple-web-css.md`.

## 2. Licence and what AISloop must do

### 2.1 What the files say (VERIFIED)

- `LICENSE.txt`: Apache License 2.0, followed by the Swift project's **Runtime Library Exception** (lets compiled binaries skip attribution; irrelevant to us, we ship no binaries).
- Every source file carries this header:
  `Copyright (c) 2021 Apple Inc. and the Swift project authors` / `Licensed under Apache License v2.0 with Runtime Library Exception` / pointers to `https://swift.org/LICENSE.txt` and `https://swift.org/CONTRIBUTORS.txt`.
- `NOTICE.txt`: names "The Swift-DocC-Render Project", links the repository, repeats `Copyright (c) 2021 Apple Inc. and the Swift project authors` and the Apache 2.0 pointer, then lists third-party dependencies (Vue.js, vue-router, core-js, Highlight.js, IntersectionObserver polyfill, PortalVue, highlightjs-pkl). Those dependency notices only matter if we copy those dependencies, which we won't.
- Apache 2.0 §6: the licence grants **no trademark rights** (Apple, Swift, DocC names only for describing origin).

### 2.2 What AISloop needs (INFERRED; not legal advice)

| How we use it | Obligation |
|---|---|
| **Values only** (numbers in our own tables or tokens: "body 17px / 25px", "nav 52px", "blur 20px saturate 180%") | Numbers and measurements are facts, not expression, so Apache 2.0 obligations arguably don't attach. Per D-008 we still attribute: cite the repo, commit and file path next to the value, as this file does. |
| **Short snippets or adapted CSS/SCSS** in AISloop files (e.g. the `visuallyhidden` mixin, the keyboard-focus pattern) | Apache 2.0 §4 applies to that part: (a) ship a copy of the Apache 2.0 licence in the repo (e.g. `LICENSES/Apache-2.0.txt`); (b) mark modified files ("Modified by AISloop"); (c) keep the copyright line `Copyright (c) 2021 Apple Inc. and the Swift project authors`; (d) include the relevant NOTICE attribution, i.e. "Contains code from The Swift-DocC-Render Project, https://github.com/swiftlang/swift-docc-render", in a `NOTICE` or `THIRD_PARTY_NOTICES.md`. Put `SPDX-License-Identifier: Apache-2.0` on snippet blocks or files. The rest of AISloop stays MIT; MIT and Apache 2.0 coexist fine. |
| **Whole files** | Same as above; avoid, we don't need them. |

Recommended practice: **tables of values with source paths; no pasted code in the rulebook.** If a snippet is ever needed in an example page, do the four steps above once, repo-wide.

## 3. How the token system is built (VERIFIED, `src/styles/`)

- `_core.scss` imports helpers that emit no CSS: `core/_vars.scss` (spacing, sizes), `core/_typography.scss` + `core/typography/*` (type scale), `core/_colors.scss` (base palette map + `prefers-dark` mixin), `core/colors/_light.scss` and `_dark.scss` (mixins that set ~200 `--color-*` properties), `core/_breakpoints.scss`, `core/_helpers.scss` (focus, blur, truncation, safe areas), `core/_nav.scss`, `core/_buttons.scss`. A theme can override any `!default` variable via `~theme/styles/_theme_vars.scss`.
- `_base.scss` emits global CSS: reset, typography, syntax colours, skip link, keyframes, and `base/_colors.scss` which applies the light mixin to `body` and the dark mixin under the dark conditions.
- **Two-layer colour model.** A small base palette (`$base-colors`: ~22 names like `figure-gray`, `fill-secondary`, each `{light, dark}`) feeds ~200 **semantic** properties named by component and role (`--color-aside-note-border`, `--color-nav-uiblur-stuck`, `--color-code-line-highlight`). Naming: **`figure-*` = foreground (text, icons), `fill-*` = backgrounds.** Components only use semantic names.
- **Type scale as a map of `size_lineheight[_weight]` keys** (`17_25`, `48_52`, `21_25_semibold`), then named *styles* (`body`, `headline-reduced`, `card-title-large`) that pick a key per breakpoint (`large` / `medium` / `small`). The mixin `font-styles(name)` emits `font-size` in rem, **unitless line-height**, weight, family, wrapped in max-width media queries.
- `html` font-size is **17px** (`$body-font-size`), so `rem()` and `em()` convert px by dividing by 17: `rem(52px)` = 3.0588rem = 52px at default zoom.

## 4. Colours

### 4.1 Base palette (VERIFIED, `src/styles/core/_colors.scss`; hex COMPUTED from the `rgb()` values)

| Base name | Role | Light | Dark |
|---|---|---|---|
| figure-gray | primary text | `#000000` | `#FFFFFF` |
| figure-gray-secondary | secondary text | `#666666` | `#CCCCCC` |
| figure-gray-tertiary | tertiary text | `#666666` | `#B0B0B0` |
| figure-gray-secondary-alt / figure-light-gray | alt secondary, aside borders | `#666666` | `#B0B0B0` |
| figure-blue | links, hover, accent text | `#3366FF` | `#0099FF` |
| figure-red | error, warning border | `#FF0000` | `#FF3333` |
| figure-orange | deprecated | `#CC3300` | `#FF6600` |
| figure-green | valid, additions | `#008000` | `#009900` |
| fill | page background | `#FFFFFF` | `#000000` |
| fill-secondary | code background, CTA, quick nav | `#F7F7F7` | `#161616` |
| fill-tertiary | tags, hero fallback, article background | `#F0F0F0` | `#2A2A2A` |
| fill-quaternary | (single value) | `#282828` | `#282828` |
| fill-gray | grid lines, borders, dropdown border | `#CCCCCC` | `#575757` |
| fill-gray-secondary | aside backgrounds | `#F5F5F5` | `#222222` |
| fill-gray-tertiary | table borders, skeletons, hover | `#F0F0F0` | `#424242` |
| fill-gray-quaternary | **selected sidebar row** | `#F0F0F0` | `#424242` |
| fill-blue | **button background**, focus border | `#0000FF` | `#0066FF` |
| fill-light-blue-secondary | | `#D1D1FF` | `#004EC4` |
| fill-red-secondary | warning aside, form error bg | `#FFF0F5` | `#330000` |
| fill-orange-secondary | deprecated aside | `#FFFAF6` | `#472400` |
| fill-green-secondary | form valid bg | `#F0FFF0` | `#003300` |

Observations (COMPUTED / INFERRED): almost every value is a multiple of `0x33` (the old web-safe palette: `#3366FF`, `#0099FF`, `#CC3300`, `#FF6600`, `#666`, `#CCC`). Grays are **pure neutral** (R = G = B), unlike Apple's slightly blue system grays. Dark mode starts from **pure black** `#000`, with the article body at `#111111` and elevated surfaces at `#161616` / `#222` / `#2A2A2A`.

### 4.2 Key semantic tokens (VERIFIED, `core/colors/_light.scss`, `_dark.scss`; composites COMPUTED)

| Token | Light | Dark | Notes |
|---|---|---|---|
| `--color-text` | `#000` | `#FFF` | |
| `--color-text-background` | `#FFF` | `#000` | page |
| `--color-article-body-background` | `#FFF` | `rgb(17,17,17)` `#111111` | dark body is lifted off black |
| `--color-secondary-label` / `--color-eyebrow` | `#666` | `#CCC` | |
| `--color-link` | `#3366FF` | `#0099FF` | |
| `--color-grid` (separators, borders) | `#CCC` | `#575757` | used as `1px solid` everywhere (`$generic-border-style`) |
| `--color-code-background` | `#F7F7F7` | `#161616` | |
| `--color-code-line-highlight` | figure-blue @ 8% → `#E7EBF8` on code bg | figure-blue @ 8% → `#142029` | 4px left bar in `--color-figure-blue` |
| `--color-button-background` / hover / active | `#0000FF` / `#3366FF` / `#3366FF` | `#0066FF` / `#0099FF` / `#0066FF` | text `#FFF`; the tokens point at `fill-blue` / `figure-blue`, so they follow the scheme |
| `--color-focus-color` | `rgba(0,125,250,0.6)` | same | see §10 |
| `--color-focus-border-color` | `#0000FF` | `#0066FF` | border of focused inputs |
| `--color-navigator-item-hover` | `#0000FF` @ 5% → `#F2F2FF` | `#0066FF` @ 50% → `#003380` on black | dark hover is strong |
| `--color-nav-keyline` | `#000` @ 20% → `#CCC` | `#424242` @ 95% | nav bottom hairline |
| `--color-nav-sticking-expanded-keyline` | `#000` @ 10% → `#E6E6E6` | `#424242` @ 70% | hairline once the bar is stuck |
| `--color-nav-uiblur-stuck` | `#FFF` @ 70% | `#2A2A2A` @ 70% | translucent bar behind `backdrop-filter` |
| `--color-nav-uiblur-expanded` / `--color-nav-stuck` | `#FFF` @ 90% | `#2A2A2A` @ 90% | |
| `--color-link-block-card-border` | `#000` @ 4% | `#FFF` @ 25% → `#404040` | card image border |
| `--color-card-shadow` | `#000` @ 4% | `#FFF` @ 4% | defined but **never used** as a shadow in this repo |
| `--color-dropdown-background` | `#FFF` @ 80% | `#FFF` @ 10% | |
| Generic modal backdrop | `rgba(0,0,0,0.4)` | same | `GenericModal.vue` |
| Nav overlay (mobile menu open) | `rgba(51,51,51,0.4)` | same | `NavBase.vue` |
| Standard modal container, dark | — | `rgb(29,29,31)` `#1D1D1F` | the only appearance of Apple's familiar near-black |
| `--color-syntax-highlighted` | `rgba(0,113,227,0.2)` | `rgba(0,113,227,0.6)` | `#0071E3`; INFERRED: the same blue as apple.com's marketing links/buttons |

Asides (callouts) are **grayscale except warning and deprecated** (VERIFIED, `_light.scss`):

| Aside kind | Text | Background (light / dark) | Left border (light / dark) |
|---|---|---|---|
| note, tip, important, experiment | `#000` / `#FFF` | `#F5F5F5` / `#222` | `#666` / `#B0B0B0` |
| warning | same | `#FFF0F5` / `#330000` | `#FF0000` / `#FF3333` |
| deprecated | same | `#FFFAF6` / `#472400` | `#CC3300` / `#FF6600` |

"Standard" page colours (for hero tints, VERIFIED): light pastels `#FFC2C2` red, `#FFCC99` orange, `#FFE0A3` yellow, `#99CCFF` blue, `#99CCCC` green, `#CCCCFF` purple; dark `#8B0000`, `#8B4000`, `#8F7200`, `#002D75`, `#023B2D`, `#512B55`.

Syntax colours (VERIFIED, `_light.scss` / `_dark.scss`): light keywords `rgb(173,61,164)`, strings `rgb(209,47,27)`, comments `rgb(112,127,140)`, type declarations `rgb(3,99,140)`, numbers `rgb(39,42,216)`; dark keywords `rgb(255,122,178)`, strings `rgb(255,129,112)`, comments `rgb(127,140,152)`, types `rgb(107,223,255)`. INFERRED: these appear to be Xcode's "Default (Light)" / "Default (Dark)" editor theme colours (from memory, not checked against Xcode here).

### 4.3 High contrast

**There is none.** No `prefers-contrast`, no `forced-colors`, no increased-contrast variants anywhere in `src/` (VERIFIED by search). The palette has two columns, not Apple's four.

### 4.4 Contrast of the defaults (COMPUTED, WCAG 2)

| Pair | Ratio |
|---|---|
| Text `#000` on `#FFF` / `#FFF` on `#111` | 21.0 / 18.9 |
| Secondary `#666` on `#FFF` / `#CCC` on `#000` | 5.74 / 13.1 |
| Link `#3366FF` on `#FFF` | 4.68 (passes AA) |
| Link `#0099FF` on `#000` / on `#111` | 7.00 / 6.29 |
| Button text `#FFF` on `#0000FF` / hover `#3366FF` / dark `#0066FF` / dark hover `#0099FF` | 8.59 / 4.68 / 4.83 / 3.00 |
| Red `#FF0000` on `#FFF` | 4.00 (fails AA for small text) |
| Grid `#CCC` on `#FFF` (non-text) | 1.61 (fine for decorative separators, too low for control borders under WCAG 1.4.11) |
| Code line numbers: `#666` hard-coded (`light-color`) on dark code bg `#161616` | **3.15** (a dark-mode bug: the number colour does not switch) |
| Syntax comment light `#707F8C` on `#F7F7F7` | 3.84 (below AA) |
| Focus ring `rgba(0,125,250,.6)` over white → `#66B1FC` | **2.27** against white (below the 3:1 WCAG 2.4.13 target) |

### 4.5 Comparison with the HIG system colours (`research/hig-digest/color.md` §3.1, §3.3)

**No value matches.** (VERIFIED by comparing tables.)

| Role | DocC-Render default (light / dark) | HIG system colour (light / dark) |
|---|---|---|
| Blue (link / accent) | `#3366FF` / `#0099FF`; buttons `#0000FF` / `#0066FF` | Blue `#0088FF` / `#0091FF` (IC light `#1E6EF4`) |
| Focus blue | `#007DFA` @ 60% | (no web value; macOS keyboard focus indicator colour unnamed) |
| Red | `#FF0000` / `#FF3333` | `#FF383C` / `#FF4245` |
| Orange | `#CC3300` / `#FF6600` | `#FF8D28` / `#FF9230` (IC light `#C55300`) |
| Green | `#008000` / `#009900` | `#34C759` / `#30D158` (IC light `#008932`) |
| Light neutral fills | `#F7F7F7`, `#F5F5F5`, `#F0F0F0` (neutral) | Gray 6 `#F2F2F7`, Gray 5 `#E5E5EA` (blue-tinted) |
| Dark elevated surfaces | `#111`, `#161616`, `#222`, `#2A2A2A`, `#424242` | Gray 6 dark `#1C1C1E`, Gray 5 `#2C2C2E`, Gray 4 `#3A3A3C` |

INFERRED: DocC-Render's defaults behave more like Apple's *increased-contrast* column than the default one: its blue/red/orange/green are darker than the HIG fills so they work as **text** on white (green `#008000` 5.14:1, orange `#CC3300` 5.20:1, blue `#3366FF` 4.68:1), which mirrors the HIG digest's finding that default HIG colours are fills, not text colours.

### 4.6 How appearance is switched (VERIFIED)

- Three-way setting **Light / Dark / Auto** (`components/ColorSchemeToggle.vue`, order Light, Dark, Auto; Auto offered only if `matchMedia('(prefers-color-scheme: …)')` works). Default is Auto (`stores/AppStore.js`), persisted in localStorage (`utils/settings.js`).
- The choice lands on `<body data-color-scheme="light|dark|auto">`. `base/_colors.scss` sets `color-scheme: light dark` on body (forced to one value when chosen) so scrollbars and form controls follow; applies light tokens to `body`; dark tokens under `[data-color-scheme="dark"]` **inside `@media screen`**, and under `@media screen and (prefers-color-scheme: dark)` for `auto`. The `screen` wrapper means **print is always light**.
- Component-level dark overrides use the `prefers-dark` mixin (`core/_colors.scss`), which emits both selectors the same way.
- `App.vue` also listens to `matchMedia('(prefers-color-scheme: dark)')` so theme-settings colours given as `{light, dark}` pairs swap live.
- A separate "dark island" token set (`--color-nav-dark-*`, `.theme-dark`, `ButtonLink.is-dark`, `GenericModal` `theme-dark`) lets a component be dark inside a light page (tutorial heroes, video modals).

## 5. Typography

### 5.1 Families and global settings (VERIFIED)

| Item | Value | File |
|---|---|---|
| Sans stack | `'Helvetica Neue', 'Helvetica', 'Arial', sans-serif` (overridable via `--typography-html-font`) | `core/typography/_font-style-utils.scss` |
| Mono stack | `var(--typography-html-font-mono, (Menlo, monospace))` | same |
| Weights used | 400 normal, **600 semibold** (the emphasis weight; `b, strong` = 600), 700 only for "on this page" parent items and minimized titles | same, `base/_typography.scss` |
| Root size | `html` 17px; body = `body` style 17px / 25px | `core/_typography.scss` |
| Rendering | `font-synthesis: none; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; font-feature-settings 'kern'` on body and form controls | `base/_typography.scss` |
| Letter-spacing | **none.** The type map supports a `letter-spacing` attribute, but no style sets one; `code` forces `letter-spacing: 0` | `_font-attributes.scss` |
| Quotes | `quotes: "“" "”"`, `ja-JP` gets 「」 | `base/_typography.scss` |
| Links | colour only; underline on hover, and always for `.inline-link` (comment cites WCAG 2.2 failure F73) | `base/_typography.scss` |
| No `system-ui` / `-apple-system` | the default never asks for the platform font | — |

### 5.2 Type scale (VERIFIED, `core/typography/_font-styles.scss`, `_font-attributes.scss`; ratios COMPUTED)

Breakpoint columns: **L** ≥ 1251px (no query), **M** ≤ 1250px, **S** ≤ 735px. Values are px size / px line-height; weight 400 unless "sb" (600).

| Style | L | M | S | Used for |
|---|---|---|---|---|
| headline | 48/52 (1.083) | 40/44 | 32/36 | big page heroes |
| headline-reduced | 40/44 (1.10) | 32/36 | 28/32 | **documentation `h1` / page title** |
| heading-2 | 32/40 | 28/36 | 24/32 | |
| heading-2-reduced | 32/36 (1.125) | 28/32 | 24/28 | **doc `h2`, section titles ("Topics")** |
| documentation-h3 | 28/32 (1.143) | 24/28 | 21/25 | `h3` |
| documentation-h4 | 24/28 sb | 21/25 sb | — | `h4` |
| documentation-h5 | 22/26 sb | 20/24 sb | 18/26 sb | `h5` |
| documentation-h6 | 17/25 sb | — | — | `h6` |
| label | 24/28 | 21/25 | — | content-table section titles |
| eyebrow | 24/28 | 21/25 | — | |
| eyebrow-reduced | 21/25 | — | 19/23 | eyebrow above page title ("Framework", "Class") |
| intro / body-large | 21/29 (1.381) | — | 19/27 | lead paragraphs, search input text |
| **body** | **17/25 (1.471)** | — | — | running text, sidebar rows, buttons |
| body-tight | 17/21 (1.235) | — | — | |
| documentation-declaration-link | 17/25 | — | — | |
| documentation-aside-name | 17/26 sb | — | — | aside label ("Note") |
| body-reduced | 14/20 (1.429) | — | — | secondary text, empty states |
| body-reduced-tight | 14/18 (1.286) | — | — | on-this-page links, tags, search result paths |
| documentation-caption | 14/21 | — | — | figure captions |
| documentation-nav | 14/21 | — | — | doc nav bar menu |
| caption / badge | 12/16 (1.333) | — | — | badges, appearance toggle |
| aside-label, step-number | 12/16 sb | — | — | |
| documentation-code-listing | 15/25 Menlo (1.667) | — | — | code blocks |
| documentation-code-listing-number | 12/18 Menlo | — | — | line numbers |
| code-preview | 12/22 Menlo | — | — | tutorials |
| nav-title | 19/27 (nav scope) | — | — | |
| nav-title-large | 21/25 sb | — | 17/17 sb | **doc nav bar title** |
| nav-menu | 12/12 | — | 14/14 | nav menu items |
| tabnav-link | 14/14 | — | — | tabs |
| card-eyebrow-large | 17/21 sb | 14/18 sb | 14/18 sb | |
| card-title-large | 21/25 sb | 17/21 sb | 17/21 sb | |
| card-title-small | 17/21 sb | 14/18 sb | 17/21 sb | |
| card-content-large / small | 17/25, 14/18 | 14/18 | 14/18 | |
| form-default-text | 17/21 | — | — | inputs |

Pattern (COMPUTED): display sizes use **tight leading (1.08–1.15)**, reading text **loose leading (1.43–1.47)**, code **looser still (1.67)**. Only **semibold** carries emphasis in headings h4–h6, cards, labels; h1–h3 are **regular weight** at large sizes. Each heading steps down by one scale step per breakpoint rather than scaling fluidly.

Comparison with HIG (`hig-digest/typography.md` §3): DocC body = 17px like iOS Body 17pt, but leading is 25 vs 22 (1.47 vs 1.29): web reading text is set looser. iOS Large Title is 34/41 **bold**; DocC page titles are 40/44 **regular**.

## 6. Spacing (VERIFIED; px unless noted; 1rem = 17px)

| Token / place | Value | File |
|---|---|---|
| Stacked margin small | `0.4em` | `base/_typography.scss` |
| Stacked margin large (default gap after p, list, heading) | `0.8em` (13.6px at 17px) | same |
| Stacked margin xlarge (before code, figures, asides, tables) | `1.6em` | same |
| Heading after a paragraph or list | `margin-top: 1.6em` | same |
| List indent | `em(20px)` = 1.176em | same |
| Param spacing | `rem(28px)` | same |
| Code block padding | `8px 14px`; with line numbers `14px 0`; line number padding `0 1rem 0 8px` | `base/_typography.scss`, `core/_vars.scss` |
| Section spacing (between page sections) | 40px | `core/_vars.scss` |
| Content-table section spacing | 2.353rem (= 40px) | same |
| Article stacked margins | 40 / 20 | same |
| Grid gap for card rows | 20px (`--col-gap` default) | `ContentNode/Row.vue` |
| Tutorials section spacing | 80px | `core/_vars.scss` |
| Page side padding, small viewport | 20px | same |
| Page side padding, with sidebar (large) | 80px | same |
| Doc hero padding | 40px top/bottom (60px "short hero") | `DocumentationHero.vue` |
| Nav bar side padding | rem(22px), small rem(16px), both `max()`ed with safe-area insets | `core/_nav.scss`, `NavBase.vue` |
| Nav menu item gap | rem(24px); settings gap rem(10px) | same |
| Sidebar horizontal spacing | 10px base, 20px large, 5px small; head-wrapper 5px vertical | `core/_vars.scss`, `BaseNavigatorCardItem.vue` |
| Sidebar nesting indent per level | 15px (10 + 5) | `BaseNavigatorCardItem.vue` |
| Sidebar filter area | 15px 20px padding, 71px tall (60px on medium) | `NavigatorCard.vue` |
| Card details padding | 17px (large card links 25.5px); eyebrow/content margin 4px | `core/_vars.scss`, `Card.vue` |
| Aside padding | rem(16px) | `ContentNode/Aside.vue` |
| Button padding | rem(4px) rem(15px); min-width rem(30px) | `core/_buttons.scss` |
| Tab spacing | 30px between tabs, 6px link padding, 4px margins; 25px below the bar | `TabnavItem.vue`, `Tabnav.vue` |
| Table cells | rem(10px) | `ContentNode/Table.vue` |
| Modal (standard) | 60px container padding (small: 50px 30px), 20px around | `GenericModal.vue` |
| "Quick look" compact mode | margins 0.667em / 1em, code padding `7px 12px`, aside `0.667rem 1rem` | `DocumentationTopic.vue` |

INFERRED: spacing is **type-relative** (em multiples of the line) inside prose and **fixed px multiples of 10/20/40/80** for layout. There is no single 4/8 grid.

## 7. Radii (VERIFIED)

| Element | Radius | File |
|---|---|---|
| **Everything by default** (`$border-radius` and its aliases nano/tiny/small/large/big) | `var(--border-radius, 4px)` | `core/_vars.scss` |
| Buttons | `var(--button-border-radius, 4px)` | `core/_buttons.scss`, `ButtonLink.vue` |
| Code listings, declarations | `var(--code-border-radius, 4px)`; 6px in compact mode | `CodeListing.vue`, `DocumentationTopic.vue` |
| Asides | `var(--aside-border-radius, 4px)`; 6px compact | `Aside.vue` |
| Cards, card covers, modals | `$big-border-radius` = 4px | `Card.vue`, `CardCover.vue`, `GenericModal.vue` |
| Search field | 4px inner, `calc(4px + 1px)` = 5px outer focus wrapper | `FilterInput.vue` |
| Tag chips (search filters) | rem(14px) (pill) | `Filter/Tag.vue` |
| Appearance toggle | outer 4px, inner segment 2px | `ColorSchemeToggle.vue` |
| Badges | `var(--badge-border-radius, 1px)` | `Badge.vue` |
| Skeleton bars / icon placeholders | 4px / 2px | `LoadingNavigatorItem.vue` |
| Custom scrollbar thumb | 10px | `core/_helpers.scss` |
| Pager dots, clear button | 50% / 100% | `Pager.vue`, `FilterInput.vue` |

INFERRED: one radius for the whole system, with each component exposing its own CSS variable so a theme can round it. The default is **small and square-ish**, the opposite of today's large concentric iOS radii.

## 8. Breakpoints and widths (VERIFIED, `core/_breakpoints.scss`, `utils/breakpoints.js`, `AdjustableSidebarWidth.vue`)

| Scope | Name | Range | Content width |
|---|---|---|---|
| default | xlarge | ≥ 1920 | 1536 |
| default | large | ≥ 1251 | **980** |
| default | medium | 736–1250 | **692** |
| default | small | 320–735 | 280/320 = **87.5%** |
| default | xsmall | 245–320 | 215 |
| nav | large | ≥ 1024 | 980 |
| nav | medium | 768–1023 | — |
| nav | small | 320–767 | — |

| Layout value | px | Notes |
|---|---|---|
| Content column with sidebar | max 820 (980 − 2×80 padding) below 1251, 980 from 1251, **1080 from 1500** | `breakpoint-dynamic-sidebar-content` |
| Full-width container max | 1920 (side borders appear at ≥ 1920) | `DocumentationLayout.vue` |
| Sidebar width | default 400 (CSS start 250); 543 on ultra-wide; min 30%, max 40% (large) / 50% (medium) of `min(window, 1521)` | `AdjustableSidebarWidth.vue` |
| Sidebar resize handle | 5px, `col-resize` cursor, `fill-gray-tertiary` on hover | same |
| Sidebar collapses to overlay | below 1024 (nav medium): full-width fixed panel sliding in from the leading edge | same |
| "On this page" column | 192 | `core/_vars.scss` |
| Quick Navigation modal | max 800 wide, 160 top margin; result list max rem(450); preview pane **61.8%** (golden ratio) | `DocumentationLayout.vue`, `QuickNavigationModal.vue` |
| Grid | 12 columns (`$total-columns`) | `core/_vars.scss` |

Quirks: the SCSS medium breakpoint ends at **1250px** but the JS copy and several comments still say **1068px**, so between 1069 and 1250 the CSS and the JS `BreakpointEmitter` disagree (VERIFIED). INFERRED: 980 / 692 / 87.5% and 735 / 1068 are the classic apple.com marketing grid; DocC inherited them.

## 9. Layers (z-index) (VERIFIED)

| Layer | z-index | File |
|---|---|---|
| Skip-navigation link when focused | 100000 | `core/_helpers.scss` (`showonfocus`) |
| Generic modal (Quick Navigation, video) | 11000 | `GenericModal.vue` |
| Modal close button | 9999 | same |
| Mobile sidebar overlay | 9998 (`$nav-z-index + 1`) | `AdjustableSidebarWidth.vue` |
| Sticky nav bar | 9997 | `core/_nav.scss` |
| Pager arrows, breadcrumb overflow menu | 42 | `Pager.vue`, `HierarchyCollapsedItems.vue` |
| Local stacking inside components | −1 … 10 | various |

Plus a helper `new-stacking-context` (`filter: blur(0px)`) instead of z-index for code listings.

## 10. Motion (VERIFIED unless marked)

| What | Duration | Easing | File |
|---|---|---|---|
| Hover colour/background changes (resize handle, quick-nav button, on-this-page links) | 0.15s | ease-in / default | various |
| Sidebar overlay slide (mobile), staggered child fade | `--nav-transition-duration: 0.15s` | ease-in slide, linear fade; each child delayed `index × 0.15s + 0.15s` | `DocumentationLayout.vue`, `AdjustableSidebarWidth.vue` |
| Tree chevron rotate | 0.15s | ease-in | `NavigatorCardItem.vue` |
| Card hover lift | 160ms | ease-out, `transform: scale(1.007)` | `Card.vue` |
| Tab content cross-fade, copy button reveal, tag hover | 0.2s | ease-in-out | `TabNavigator.vue`, `CodeListing.vue`, `Tag.vue` |
| Sidebar hide/show (large) | 0.3s | ease-in (width) | `core/_vars.scss`, `AdjustableSidebarWidth.vue` |
| Nav menu chevron flip | 0.3s | linear | `core/_nav.scss` |
| Nav menu tray open (small screens) | 0.4s max-height, delay 0.2s | ease-in | `core/_nav.scss` |
| Nav menu items appear | 0.5s, opacity + transform | ease | `NavMenuItemBase.vue` |
| Nav overlay dim | 0.7s, delay 0.2s | `cubic-bezier(0.07, 1.06, 0.27, 0.95)` (slight overshoot) | `NavBase.vue`, `core/_nav.scss` |
| Pager page slide | 0.5s | ease-in-out; `scroll-snap` + `scroll-behavior: smooth` | `Pager.vue` |
| Skeleton rows | `pulse` 2.5s infinite, opacity 0→1→1→0, stagger 0.3s per row, start after 1s delay | ease | `LoadingNavigatorItem.vue`, `base/_keyframes.scss` |
| Nav bar background when it starts sticking | `$nav-bg-transition-timing: 0s` (instant) | — | `core/_nav.scss` |

Reduced motion (VERIFIED): only three places react. `Card.vue` drops the hover scale under `prefers-reduced-motion: reduce`; `Pager.vue` drops the page transition under `(prefers-reduced-motion)`; `Asset.vue` stops autoplaying videos (JS `matchMedia`). **Not covered:** the infinite skeleton pulse, sidebar slide, nav tray, chevrons, smooth scrolling.

INFERRED: motion is short (mostly 150–300ms), mostly **ease-in**, and used for state changes only; there is no entrance choreography on page load.

## 11. Focus (VERIFIED, `App.vue`, `core/_helpers.scss`, components)

| Item | Value |
|---|---|
| When rings show | **keyboard only.** `App.vue` adds `.fromkeyboard` to `#app` on the first `keydown`, removes it on `mousedown`. All focus styles hang off that class (`on-keyboard-focus` mixins). Pre-dates `:focus-visible`; same intent. |
| Default ring | `outline: 4px solid rgba(0,125,250,0.6); outline-offset: 1px` (`focus-outline`) |
| Rounded controls (buttons, tags, quick-nav button) | `box-shadow: 0 0 0 4px rgba(0,125,250,0.6); outline: none` (`focus-shadow`) |
| Inputs/dropdowns | same shadow + `border-color: var(--color-fill-blue)` (`focus-shadow-form-element`) |
| Search field | `box-shadow: 0 0 0 3pt` focus colour, border turns fill-blue |
| Sidebar rows | ring drawn **inside** the row: `outline-offset: -4px` on the row's rounded background |
| Tabs | `outline-offset: -1px` |
| Skip link | visually hidden; on focus becomes a 44px-tall link in figure-blue, z 100000 |
| Visually hidden | `clip` + `clip-path: inset(0 0 99.9% 99.9%)`, 1×1px |

Contrast of the ring against white is 2.27:1 (COMPUTED, §4.4).

## 12. Materials (VERIFIED, `core/_helpers.scss`, `NavBase.vue`)

The only translucency in the app is the **sticky nav bar once it is stuck or open**:
`backdrop-filter: saturate(180%) blur(20px)` over `rgba(255,255,255,0.7)` (light) or `rgba(42,42,42,0.7)` (dark), opaque fallbacks at 90% when `backdrop-filter` is unsupported (`@supports`). At the top of the page the bar is the page colour with a hairline keyline under the 980px content width; when stuck, the keyline goes full-width and lighter (10% black). Shadows: essentially none (one 3px runtime-preview shadow in tutorials, one `0 1px 4px -1px` dropdown shadow).

## 13. Components

Each entry: file path(s) in the repo, then the values that define the look.

### 13.1 Nav bar — `src/components/NavBase.vue`, `src/styles/core/_nav.scss`, `src/components/DocumentationTopic/DocumentationNav.vue`
- Sticky, `top: 0`, height **52px** (48px below 768), z 9997. Content max 980px, side padding 22px (16px small) or the safe-area inset, whichever is larger.
- Background: page colour (`--color-nav-background: var(--color-fill)` on doc pages); stuck/open: blurred translucent white/graphite (§12). 1px keyline `#000` @ 20% under content width; full width @ 10% when stuck.
- Title: nav-title-large **21/25 semibold** (17/17 semibold small). Menu links 14/21, `--color-nav-link-color` (`#000`), hover figure-blue `#3366FF`; current link non-interactive.
- Below 1024: grid `pre-title | title | actions` over a collapsible full-width menu tray (max-height transition 0.4s), 12px chevron made of two 1.5px bars rotated ±40°, flips on open; items get 42px min height and top borders.
- Sidebar toggle icon 19px with 5px padding; hover background `fill-gray-quaternary`.

### 13.2 Navigator / sidebar — `src/components/AdjustableSidebarWidth.vue`, `src/components/Navigator/BaseNavigatorCard.vue`, `NavigatorCard.vue`, `BaseNavigatorCardItem.vue`, `NavigatorCardItem.vue`, `src/constants/sidebar.js`
- Resizable column (default 400px, 30–40% of width), separated from content by `1px solid var(--color-grid)`; sticky below the nav, full viewport height minus 52px. Hide/show animates width 0.3s ease-in. Below 1024 it becomes a full-width overlay that slides in (0.15s).
- **Row height 32px** (fixed for virtual scrolling), text **body 17/25 regular, `#000`**, ellipsis truncation; 15px indent per level; 10px chevron rotating 90° in 0.15s; 16px type icon with 7px gap.
- Row background is an inner rounded rect (4px) with 20px side margins: **selected = `fill-gray-quaternary` (`#F0F0F0` / `#424242`), gray, not accent**; hover = blue @ 5% (`#F2F2FF`) light / `#0066FF` @ 50% dark.
- Group headers: `figure-gray-tertiary`, semibold, not clickable.
- Technology title row at top: label-reduced 19/23 semibold.
- Filter field pinned at the bottom (71px area, top border), "filter on top" variant exists. Empty state 14/20 in tertiary gray.
- Loading: skeleton bars 12px tall, 4px radius, `fill-gray-tertiary`, pulsing.

### 13.3 Buttons — `src/components/ButtonLink.vue`, `src/styles/core/_buttons.scss`, `src/components/ContentNode/CodeListing.vue` (copy button)
- One filled style: background `#0000FF` (`--color-button-background`), text white, **17/25 body**, padding 4px 15px, min-width 30px, radius 4px, no border; hover `#3366FF`; active `#3366FF` (dark: rest `#0066FF`, hover `#0099FF`, active `#0066FF`); disabled **opacity 0.32**; focus ring as box-shadow.
- Copy button on code: 1.5em square, `fill-gray-tertiary`, radius 4px, hidden until the code block is hovered (`(hover: hover)`), always visible on touch; success shows a blue checkmark, failure a red cross.
- INFERRED: no secondary/bordered/plain button tiers exist; secondary actions are links.

### 13.4 Cards and link cards — `src/components/Card.vue`, `CardCover.vue`, `src/components/DocumentationTopic/TopicsLinkCardGrid.vue`, `TopicsLinkCardGridItem.vue`, `src/components/ContentNode/Row.vue`
- Card: radius 4px, overflow hidden, no border, no shadow; details padding 17px on `--color-card-background` (page colour); eyebrow 14/18 semibold secondary-alt gray, title semibold 17/21 (large 21/25), body 14/18 (large 17/25); "link" row at the bottom underlines on card hover.
- Hover: `scale(1.007)` in 160ms ease-out; removed under reduced motion.
- Cover heights: small 235 (163 medium), large 359 (249 medium), 227 on small screens.
- Topic link cards: image area **16:9**, 1px border `#000` @ 4% (`#FFF` @ 25% dark), icon fallback 80px on `fill-gray-quaternary`. Grid: **3 columns compact / 2 columns detailed**, 20px gap, 1 column on small; paged (6 or 4 per page) with a scroll-snapping pager, 3em round controls and 0.65em dots.
- "Floating" card style: transparent background, no side padding.

### 13.5 Asides (callouts) — `src/components/ContentNode/Aside.vue`, colours in `core/colors/_light.scss`
- Background fill + **6px leading border** (other sides 0), radius 4px, padding 16px, label 17/26 semibold above text, `break-inside: avoid`.
- Kinds: note, tip, important, experiment are **all the same gray**; warning red; deprecated orange (table in §4.2). No icons.

### 13.6 Tabs — `src/components/Tabnav.vue`, `TabnavItem.vue`, `src/components/ContentNode/TabNavigator.vue`
- Text tabs, no pills: 14/14, inactive `--color-secondary-label` (`#666`), active `--color-text` with a **1px underline in text colour** drawn over the 1px `--color-grid` baseline that runs under all tabs; 30px between tabs. Content cross-fades 0.2s. Vertical variant puts tabs in a 30% column.

### 13.7 Search / Quick Navigation — `src/components/Navigator/QuickNavigationModal.vue`, `QuickNavigationButton.vue`, `src/components/Filter/FilterInput.vue`, `Filter/Tag.vue`, `src/components/GenericModal.vue`
- Opened from a small bordered button next to the sidebar filter (1px grid border, 4px radius, hover `fill-tertiary`) or by the keyboard: `/`, or Shift+Cmd+O, the Xcode "Open Quickly" shortcut (`DocumentationLayout.vue`).
- Full-screen modal over `rgba(0,0,0,0.4)`, panel max 800px, 160px from the top, on `fill-secondary`, 1px grid border, 4px radius; focus adds the 4px ring.
- Input text body-large **21/29**; magnifier rem(17px), turns blue while typing; clear button 12px circle.
- Results: rows 40px tall, 10px 15px padding, name + path (14/18 secondary) with type icon; hover/focus background = navigator hover blue. Preview pane 61.8% wide with a 1px leading border.
- Filter tags: pill (14px radius) on `fill-tertiary`, 14/18 text, hover/active turns `fill-blue` with white text.

### 13.8 Code listings — `src/components/ContentNode/CodeListing.vue`, `CollapsibleCodeListing.vue`, `CodeListingFilename.vue`, `src/components/DocumentationTopic/ContentNode.vue`, `PrimaryContent/DeclarationSource.vue`, `src/styles/core/_vars.scss`
- Block: `fill-secondary` (`#F7F7F7` / `#161616`), **1px `--color-grid` border**, radius 4px, padding 8px 14px, Menlo **15/25**, `tab-size` 4, horizontal scroll (no wrap) unless wrapping is enabled (`--wrap-ch`).
- Line numbers 12/18 mono, `#666` (also in dark, see §4.4), right-aligned, min 2em, not selectable.
- Highlighted lines: figure-blue @ 8% background + 4px figure-blue left bar.
- Filename above: 16/19 (14/20 small), secondary label colour.
- Declarations (API signatures): same box, line-height 25px.
- Inline code: transparent background by default (`--color-inline-code-background: transparent`), Menlo, no padding unless themed.

### 13.9 Badges — `src/components/Badge.vue`
- 12/16 text, padding 2px 4px, **1px radius**, inline after titles with 5px leading margin.
- Light: default white on black, beta white on `#666`, deprecated white on `#CC3300`; dark mode inverts (black text on white / `#B0B0B0` / `#FF6600`). Page-title tags use the same colours as text, no fill (`Hero/Title.vue`).

### 13.10 Other useful pieces
- **Appearance toggle** (`ColorSchemeToggle.vue`): segmented control, 12/16 text, 1px border in button blue, 1px inner padding, segments min 42px, selected segment filled blue with white text, 4px/2px radii.
- **On this page** (`OnThisPageNav.vue`): 192px column, 14/18 links in secondary gray, active item in text colour, 5px vertical margins, colour transition 0.15s; parent items bold.
- **Breadcrumbs** (`Hero/HierarchyItem.vue`): "/" separators with 5px spacing; items truncate to `9rem × (6 − position)`; more than 5 collapse into a menu.
- **Doc hero** (`Hero/DocumentationHero.vue`, `Hero/Title.vue`): band in `fill-tertiary` (or a theme/standard colour), 40px padding, a 250px type icon at 15% opacity on the trailing side (hidden on small), eyebrow 21/25 secondary above a 40/44 regular title.
- **Tables** (`ContentNode/Table.vue`): 1px `fill-gray-tertiary` cell borders, outer border hidden, 10px padding, semibold headers.
- **Section titles** (`ContentTable.vue`): 32/36 with a 1px grid rule above and 40px spacing.
- **Footer** (`Footer.vue`): 1px top rule, 20px vertical margin.
- **Hover hygiene** (`core/_helpers.scss`): `hover-state-fix-scrolling-mobile` uses `any-hover` so touch devices show the state on focus instead of sticking; `-webkit-tap-highlight-color: transparent` on custom controls; `safe-area-*` helpers with `max()`.

## 14. What makes it feel Apple (INFERRED)

Our analysis. The colours and fonts in this repo are generic; the Apple feel comes from structure and restraint:

1. **One reading size, set generously.** Body is 17px with 25px leading, and the sidebar, buttons and inputs use the same 17px. Few sizes, applied consistently, instead of 13–14px "app chrome" text.
2. **Big quiet titles.** Page titles are 40px **regular** with 1.1 leading; emphasis elsewhere is **semibold (600), never bold**. No letter-spacing tricks, `font-synthesis: none`, antialiased rendering.
3. **Colour is almost only for links and the single primary action.** Text is pure black/white, secondary text one gray, callouts gray, selection gray. Red and orange appear only for warning and deprecated.
4. **Hairlines, not boxes.** 1px grid lines separate sidebar, sections, tables and code; no shadows, no gradients, 4px corners; cards are flat with a 4% border.
5. **The bar becomes glass only when needed.** The nav bar is solid at rest and turns to `saturate(180%) blur(20px)` translucency only once content scrolls under it, with the hairline lightening.
6. **Fixed reading widths.** Content snaps to 980 / 692 / 87.5%, the apple.com rhythm, instead of stretching fluidly.
7. **Small, fast, purposeful motion.** 150–300ms, ease-in, mostly hover and disclosure; the card "lift" is a 0.7% scale.
8. **Considerate details.** Keyboard-only focus rings, a skip link, safe-area insets, touch-aware hover, print always light, a three-way Light/Dark/Auto choice that defaults to the system, localised quotes, RTL via logical properties.

## 15. Candidate tokens for AISloop (INFERRED)

Starting points to put on a review board; none are decisions. "Keep" = take the DocC value; "Adapt" = take the structure, change the value.

| Area | Candidate | From DocC | Note |
|---|---|---|---|
| Base text | `--text-body: 17px / 25px` (1.47) | keep | matches iOS Body size; looser leading suits the web |
| Secondary text | `--text-reduced: 14px / 20px`, tight `14px / 18px` | keep | |
| Caption | `--text-caption: 12px / 16px` | keep | equals iOS Caption 1 |
| Lead | `--text-lead: 21px / 29px` (19/27 small) | keep | |
| Headings | `40/44`, `32/36`, `28/32`, `24/28 sb`, `22/26 sb`, `17/25 sb` stepping down one step per breakpoint | adapt | decide regular vs semibold titles (open question 4) |
| Code | `15px / 25px` mono | keep | |
| Weights | 400 + 600 only | keep | matches HIG advice to avoid light weights |
| Font stack | `system-ui, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif`; mono `ui-monospace, Menlo, monospace` | adapt | DocC's default omits the system font; we may not ship SF (D-003) but can ask for it |
| Prose rhythm | `0.4em / 0.8em / 1.6em` stacked margins | keep | |
| Layout spacing | `10, 20, 40, 80` px | keep | plus 15/17 where DocC uses them |
| Reading widths | 980 / 692 / 87.5% with breakpoints 1251 / 736 | keep | with sidebar: 820 → 980 → 1080 |
| Sidebar | width 250–400 (30–40%), **row 32px**, indent 15px, row inset 20px, selection gray | adapt | decide accent vs gray selection |
| Top bar | 52px (48 small), padding 22/16, glass `saturate(180%) blur(20px)` at 70% only when stuck | keep | ties to open question 2 (glass) |
| Hairline | `1px solid`; light `#000` @ 20% / `#CCC`, dark `#575757` | adapt | consider alpha-based separators |
| Radius | one variable, components override; DocC default 4px | adapt | likely larger for us; keep the single-variable pattern |
| Callout | 6px leading border + tinted fill, 16px padding, label semibold | keep | gray for neutral kinds |
| Focus | keyboard-only ring via `:focus-visible`, 4px, offset 1px, inset (−4px) in lists | adapt | use a ≥ 3:1 colour, not `rgba(0,125,250,.6)` |
| Motion | 150 / 200 / 300 / 400ms; hover lift `scale(1.007)` 160ms ease-out | keep | add reduced-motion everywhere |
| Disabled | opacity 0.32 | keep | |
| Overlays | backdrop `rgba(0,0,0,.4)`; layers bar < sidebar overlay < modal < skip link | keep | renumber to a small scale (e.g. 10/20/30/40) |
| Appearance | Light / Dark / Auto, default Auto, `color-scheme` set, print light | keep | answers open question 7 one way |
| Colour model | base palette (`figure-*` / `fill-*`) → semantic per-component tokens | keep the pattern | values from HIG digest (§4.5 shows DocC's are not Apple's) |
| Dark base | page `#000`, reading surface `#111`, elevated `#161616` / `#1D1D1F` / `#2A2A2A` | adapt | compare with HIG `#1C1C1E` on the board |

## 16. Differences from native apps and the HIG (VERIFIED facts, INFERRED judgements)

- **Colours:** none of the defaults are HIG system colours (§4.5). Button blue `#0000FF` is a pure RGB blue no Apple platform uses. Grays are neutral, HIG grays are blue-tinted.
- **Four variants vs two:** HIG asks for light, dark and increased-contrast light/dark; DocC ships only light and dark and ignores `prefers-contrast`.
- **Fonts:** Helvetica Neue / Arial, not the system font; no size-specific tracking (SF adjusts tracking by size).
- **Text size:** fixed px-derived rem with no Dynamic Type analogue beyond browser zoom; 17px body even in sidebars, where macOS uses ~13pt.
- **Selection:** sidebar selection is gray; macOS and iPadOS sidebars normally show the accent colour in the active window (INFERRED from the platforms, not from this repo).
- **Hover highlights** in the sidebar and search results have no native counterpart on iOS; macOS uses them sparingly.
- **Shapes:** 4px corners everywhere vs the large, concentric and capsule shapes of current Apple UI (Liquid Glass era); one filled button style only, no bordered/plain/glass tiers.
- **Navigation:** web patterns (breadcrumbs, collapsing top menu tray, resizable sidebar that becomes an overlay below 1024px). No tab bar on phones.
- **Material:** one blur recipe on one surface (nav bar); no layered glass, no vibrancy for text.
- **Motion:** CSS ease curves, mostly ease-in; no springs. Reduced motion only partly handled (§10), while the HIG asks to cut repeating animation such as the skeleton pulse.
- **Focus ring:** keyboard-only like macOS, but its 60%-alpha blue is 2.27:1 on white, weaker than an accessible web ring should be.
- **Accessibility details done well:** skip link, `visuallyhidden`, links underlined in prose (WCAG F73), print styles, RTL logical properties, safe-area insets, touch-aware hover.

## 17. Sources

| Source | Where | Read |
|---|---|---|
| swift-docc-render repository | https://github.com/swiftlang/swift-docc-render, commit `2b63cab` (2026-11-04) | 2026-11-19 |
| Licence and notice | `LICENSE.txt`, `NOTICE.txt` in the repository | 2026-11-19 |
| Style system | `src/styles/**` (all 29 SCSS files) | 2026-11-19 |
| Components | `src/components/**` (files named in §13), `src/App.vue`, `src/stores/AppStore.js`, `src/utils/{themes,theme-settings,breakpoints}.js`, `src/constants/{nav,sidebar,HeroColors}.js` | 2026-11-19 |
| Comparison baseline | `research/hig-digest/color.md`, `typography.md`, `motion.md`, `accessibility.md` | 2026-11-19 |
