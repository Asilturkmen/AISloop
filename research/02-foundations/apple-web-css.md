# Apple's own web apps: measured CSS values

How Apple itself carries its design language to the web, measured from the computed styles of Apple's public web apps. The HIG gives almost no geometry (see [hig-digest/README.md](../hig-digest/README.md), "Cross-cutting findings"); this file fills that gap with evidence.

Values only. No Apple CSS is reproduced; short property/value pairs and a few custom-property names are quoted as facts so a finding can be traced (D-008).

---

## 1. Method

- **Date:** 2026-11-19.
- **Browser:** Microsoft Edge (Chromium) on Windows, driven by `playwright-core` 1.63 (`tools/node_modules`). Helper scripts lived in a scratch folder outside the repo.
- **Viewports:** 1440×900 and 390×844, each with `colorScheme: light` and `dark`. The 390 runs used `isMobile`, `hasTouch` and an iPhone Safari user agent (the App Store app page aborts with that UA, so it was re-run with only the viewport). Extra width checks at 768, 1024, 1920 and 2560.
- **What was read:** `getComputedStyle` on visible elements (including pseudo-elements and shadow DOM), aggregated by frequency; custom properties declared in same-origin stylesheets, grouped by selector and media/supports condition; targeted probes on named elements; `:hover` via real pointer hover; focus via real `Tab` presses; menus, popovers and a modal opened by clicking. No login anywhere.
- **Region:** requests came from Turkey; US storefront URLs were used. A country-picker banner and an upsell banner were removed from the DOM before measuring.
- **Verification:** about 120 private screenshots in `research/_private/02-foundations/apple-web-css/` (git-ignored, D-003). I looked at the ones that matter (Music New/album/modal/context menu, App Store Today, Maps search, nav hovers, focus rings) to confirm the right element was measured.

**Pages measured**

| Site | Pages |
|---|---|
| Apple Music | `/us/browse` (redirects to `/us/new`), an album page, an artist page (U2), search (`?term=radiohead`) |
| Apple Podcasts | `/us/browse` (redirects to `/us/new`), show page (The Daily), episode page |
| App Store | `/us/iphone/today`, a Today story, `/us/iphone/charts`, an app page (WhatsApp) |
| Apple Maps (beta) | home, search results (`?query=coffee`, San Francisco) |
| Developer | `developer.apple.com/documentation/swiftui/view`, HIG `…/human-interface-guidelines/buttons` |
| Marketing (contrast only) | `www.apple.com/apple-music/` |

**Markings**

- **MEASURED**: a computed value read from a rendered element.
- **DECLARED**: the value of a custom property in Apple's stylesheet (may not be visible on the page measured).
- **INFERRED**: our reading or suggestion.

**Important caveat: Chromium vs Safari.** Music, Podcasts and the App Store have a branch for browsers that do *not* support the Apple system-font keyword (an `@supports not (font: -apple-system-body)` block). Edge took that branch, so the text colours measured here are slightly stronger than what Safari users see. Both sets are listed in §4.2.

---

## 2. Per-site summary

### 2.1 Music, Podcasts and the App Store: one system

The three apps share one token sheet: **481 of ~586 `:root` custom properties are identical** across them (MEASURED by diffing). They differ almost only in key colour, page background and a few app-specific tokens. The token names mirror Apple's native semantic names (`systemPrimary`, `systemSecondary`, `labelDivider`, `systemGray2`–`6`, `systemStandardThinMaterial…`, each with `-vibrant`, `-onLight`, `-onDark` and `_IC` increased-contrast variants), and every set has a dark and a `prefers-contrast: more` override. They also share breakpoints: **484, 1000, 1260, 1580, 1940 px** (plus 415, 739, 767.32).

**Apple Music (web).**
- Desktop: a 260 px translucent sidebar (light grey glass) next to a white page, with no top toolbar. The page title ("New", 34/40 bold) sits in the content.
- The floating player is a 668×56 glass pill at the bottom.
- Lists are 55 px track rows with 40 px artwork and 1 px separators. Shelves scroll horizontally.
- Album pages tint the whole page and sidebar from the artwork.
- **The key colour is black, not red:** buttons such as Sign In and Preview are black pills (white in dark mode). Accent blue (`#007aff`, cyan `#5ac8f5` in dark) appears only on sidebar icons and the selected mobile search scope.
- Mobile: a 52 px translucent top bar with a hamburger menu, and a floating mini player. **No bottom tab bar.**

**Apple Podcasts (web).** Same shell as Music.
- Key colour purple `#7224d8` (dark `#9c5af2`). It is used for the Sign In pill, the selected sidebar icon (other icons are monochrome), play-time pills and the focus ring.
- Episode lists are full-width rows (~152 px with 90 px art) separated by 1 px lines. Hovering a row shows a 6 px-radius plate that extends past the row edges.

**App Store (web).**
- Same shell and sidebar width (260 px), but a different skin:
  - grey page `#f5f5f7` (dark `#151515`);
  - an almost opaque sidebar with a stronger border (1 px at 15%);
  - 32 px nav rows with a 6 px radius;
  - all sidebar icons blue;
  - white or opaque cards with radius 17 px (Today) or 24 px (charts, reviews) and a soft 0 3px 9px shadow.
- It is the only one of the three with declared radius tokens: **5 / 9 / 17 / 24 px** (`--global-border-radius-xsmall … xlarge`).
- Blue `#007aff` is used for "View" buttons on a 6% blue tint and does not change in dark mode.
- Separators are opaque `systemGray4` (`#d1d1d6`, dark `#3a3a3c`), not alpha.
- Mobile: a 44 px opaque white top bar with a shadow and a hamburger menu.

### 2.2 Apple Maps (beta)

A different codebase with two token layers:
1. iOS-style semantic colours (`--label #000`, `--secondary-label #3c3c4399`, `--separator-color #3c3c432e`, fills `#7676801f`, `#78788029`, `#74748014`);
2. Apple's "apl" web design-system tokens (§4.9). These are the richest declared geometry anywhere: radii 4/8/12/16/24, spacing 2–72, durations 50–1250 ms, easing curves and elevation shadows.

UI:
- A 211 px glass sidebar (white 80%, `blur(50px)`).
- A 420 px glass results card (white 60%) holding opaque white 16 px-radius result platters.
- 46 px nav rows (radius 12) with 30 px icon tiles (radius 9).
- 36 px map controls (44 px on mobile) grouped in a 12 px-radius blurred stack.
- Mobile: the card becomes a bottom sheet with radius 12 12 0 0.
- This is the most iOS-like of the sites (iOS label colours, filled icon tiles, 16 px platters).

### 2.3 Developer documentation and the HIG site (DocC)

The swift-docc-render code is studied by another researcher; this section only records rendered values.
- Long-form reading layout: **17/25 SF Pro Text with −0.374 px tracking**, a 740 px text column, a 200 px navigator (HIG) with 32 px rows (radius 6).
- Opaque greys (`#1d1d1f`, `#6e6e73`, `#86868b`) and opaque 1 px separators `#d2d2d7` (dark `#424245`).
- Asides and code blocks: radius 15 px on `#f5f5f7`.
- Dark mode is pure black `#000`.
- No glass or shadows in the content.

### 2.4 Marketing contrast (apple.com/apple-music)

- Black page in both colour schemes (no dark-mode switch).
- 70–88 px "SF Pro Plus Expanded" headlines, 17 px body with tracking.
- 980 px pill buttons 44–56 px tall; 18 px-radius tiles.
- `saturate(1.8) blur(20px)` local nav.
- Slow reveal motion (0.5–0.9 s).

**None of these values appear in the app UIs.** Marketing is a separate design language and should not be mixed into app tokens.

---

## 3. Typography

### 3.1 The declared text-style scale (Music, Podcasts, App Store, DECLARED)

The shared sheet declares macOS text styles with exact sizes and line-height ratios. Line heights below are computed (size × ratio), all integers.

| Style | Size / line height | Regular | Emphasized | "tall" leading | "short" leading |
|---|---|---|---|---|---|
| header | 34 / 40 | 400 | 700 | — | — |
| large-title | 26 / 32 | 400 | 700 | 34 | 30 |
| title-1 | 22 / 26 | 400 | 700 | 28 | 24 |
| title-2 | 17 / 22 | 400 | 700 | 24 | 20 |
| title-3 | 15 / 20 | 400 | 600 | 22 | 18 |
| headline | 13 / 16 | 700 | 800 | 18 | 14 |
| body | 13 / 16 | 400 | 600 | 18 | 14 |
| callout | 12 / 15 | 400 | 600 | 17 | 13 |
| subhead | 11 / 14 | 400 | 600 | 16 | 12 |
| footnote | 10 / 13 | 400 | 600 | 15 | 11 |
| caption-1 / caption-2 | 10 / 13 | 400 / 500 | 500 / 600 | 15 | 11 |

- Weight variants -medium/-semibold/-bold/-heavy (500/600/700/800) exist for every style.
- Navigation text: 14/20 at ≥ 484 px, 16/22 below.
- A separate editorial scale for marketing-like content scales up at 1000/1260/1580 px (e.g. headline-super 48 → 64 → 80, intro 19 → 21, body-reduced 14/20). It is rarely seen in the app UI.
- Font stack: `-apple-system, BlinkMacSystemFont, Apple Color Emoji, SF Pro, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`. On Windows the SF Pro web font loads from apple.com; we cannot do the same (D-003).
- **No letter-spacing anywhere in the app UIs** (computed `normal`), except App Store titles (−0.5 px at 26 px, −0.68 px at 34 px ≈ −0.02 em).

### 3.2 Type actually used (MEASURED, 1440 unless noted)

| Role | Value | Site · element |
|---|---|---|
| Page title | 34/40 w700 | Music `h1` "New"; App Store Today card title |
| Page title (smaller) | 26/32 w700, −0.5 px | App Store `h1` "Today" |
| Detail title | 26/30 w700 + subtitle 26/30 w400 | Music album header; Podcasts episode `h1` 26/30 w700 |
| Detail title, mobile | 22/26 w700, subtitle 20/24 | Music album at 390 |
| Hero title | 22/26 w700 | Podcasts show hero; Maps panel header 22/30 w700 |
| Section / shelf title | **17/22 w700** | Music, Podcasts, App Store (every shelf) |
| Card title | 17/22 w400 (+ 17/22 secondary subtitle) | Music editorial card |
| List-row title, large | 15/20 w600 | Podcasts episode title; App Store lockup title; Maps result title 16/21 w600 |
| List-row title | **13/16 w400** | Music track and album rows |
| List-row subtitle | **12/15 w400 secondary** | Music, Podcasts, App Store lockups |
| Artwork caption | 12/15 w400 (title primary, subtitle secondary) | Music and Podcasts lockups under artwork |
| Eyebrow | 11/14 w600 secondary, uppercase | Music editorial card; Podcasts dates; App Store badges 11–12 w600 |
| Description text | 13/18 w400 secondary | Music album notes; App Store app description 13/18 primary |
| Modal prose | 15/22 w400 | Music "more" modal |
| Sidebar item | 14/20 w400, selected **w600** | Music, Podcasts |
| Sidebar item | 15/20 w400, selected w500 | App Store |
| Sidebar item, mobile | 16/22 (Music), 17/22, selected w700 (App Store) | — |
| Sidebar section header | 10/13 w600 secondary | App Store "Categories" |
| Buttons | 15/20 w600 (Music pill, desktop); 17/22 w600 (mobile); 13/18 w700 (App Store View); 13 w600 (Podcasts play pill); 14 w400 (Sign In) | — |
| Menu item | 13/16 w400 | Music context menu |
| Search field | 13 px desktop, **16 px mobile** (iOS no-zoom size) | Music; Maps mobile 17 |
| Mobile scope tabs | 13/18 w600 | Music search |
| Docs body | 17/25, −0.374 px | HIG, developer docs |
| Docs headings | h1 48/52 w700 (mobile 32/36); abstract 28/32 w400; h2 32/36 w700; h3 28/32 w600; h4 24/28 w600 | HIG |
| Docs navigator | 14/18 #6e6e73, hover #1d1d1f, current w600 | HIG |
| Docs code | SF Mono 15/25 (listing), 17/25 (inline) | developer docs |
| Maps secondary | 14/19 rgba(60,60,67,0.6) | Maps result category |

**Reading (INFERRED):** the app pages use the **macOS** scale (13 px body) on desktop and move only navigation, inputs and buttons up to iOS sizes (16–17 px) on phones. Long-form documentation uses 17 px. Music uses one size for primary and secondary text in a row and separates them by colour alone (12/15 both).

---

## 4. Colour

### 4.1 Backgrounds by layer (MEASURED)

| Layer | Light | Dark | Site |
|---|---|---|---|
| Page | `#ffffff` | **`#1f1f1f`** | Music, Podcasts |
| Page | **`#f5f5f7`** | **`#151515`** | App Store |
| Page | `#ffffff` | `#000000` | HIG, developer docs |
| Page | `#000` (no switch) | `#000` | marketing |
| Sidebar (glass) | rgba(245,245,247,0.55) | rgba(38,38,40,0.60) | Music, Podcasts |
| Sidebar | rgba(60,60,67,0.03) | rgba(235,235,245,0.03) | App Store |
| Sidebar (glass) | rgba(255,255,255,0.80) | rgba(0,0,0,0.60) | Maps |
| Floating panel (glass) | rgba(255,255,255,0.60) | rgba(0,0,0,0.60) | Maps results card |
| Card on page | `#fff` (0.92) on `#f5f5f7` | rgba(255,255,255,0.10) | App Store Today list card |
| Card, tinted | rgba(0,0,0,0.05) | rgba(255,255,255,0.05) | App Store review and privacy cards |
| Card, tinted | rgba(0,0,0,0.10) | rgba(255,255,255,0.10) | Podcasts review card; Music top search result |
| Platter on glass | `#fff` | rgba(0,0,0,0.40) | Maps result |
| Modal | `#fff`, scrim rgba(0,0,0,0.45) | same scrim | Music description modal |
| Popover | `#f5f5f7`, border 1 px rgba(0,0,0,0.10) | — | App Store platform picker |
| Code / aside | `#f5f5f7` | rgb(50,50,50) | HIG |
| Footer band | `#f2f2f2` | `#323232` | App Store; Music `#fbfbfb` (DECLARED) |
| Mobile top bar | glass as sidebar | glass | Music |
| Mobile top bar | `#fff` + shadow | `#2e2e2e` | App Store |

DECLARED elevated and grouped greys in the shared sheet: `systemGroupedBackgroundSecondary` `#fff` / `#2c2c2e`; `opaqueShelfBG` `#f2f2f2` / `#2b2b2b`; `shelfBG` black 5% / white 5%; `pageBG-dark` `#1f1f1f`.

### 4.2 Text levels

| Level | Safari, light (DECLARED) | Chromium, light (MEASURED) | Safari, dark (DECLARED) | Chromium, dark (MEASURED) | Increased contrast, light (DECLARED) |
|---|---|---|---|---|---|
| Primary | black 85% (`#000000d9`) | black **88%** | white 85% | white **92%** | black 100% |
| Secondary | black 50% | black **56%** | white 55% | white **64%** | black 76% |
| Tertiary | black 25% | black **48%** | white 25% | white **40%** | black 56% |
| Quaternary | black 10% | — | white 10% | — | black 35% |
| Quinary | black 5% | — | white 5% | — | black 10% |

Computed contrast:
- Black 56% on white = **4.95:1** (passes AA), but Safari's 50% = 3.95:1 (fails).
- White 64% on `#1f1f1f` = 7.4:1.
- The Chromium branch reads like a deliberate contrast fix.
- Docs and marketing use opaque greys instead: primary `#1d1d1f`, secondary `#6e6e73` (5.1:1), dark `#f5f5f7` / `#86868b`.
- Maps uses iOS label colours: secondary rgba(60,60,67,0.6) (3.4:1 on white, below AA); dark rgba(235,235,245,0.6).

### 4.3 Accent and key colour

| Site | Key colour light / dark | Where it appears |
|---|---|---|
| Music | black 85% / white 85% (`#000` / `#fff` in Chromium) | Primary pills (Sign In, Preview), selected states |
| Music (secondary accent) | `#007aff` / **`#5ac8f5`** | All sidebar icons; selected mobile scope tab (filled) |
| Podcasts | `#7224d8` / `#9c5af2`; rollover `#4200a8` / `#d997ff`; pressed `#5103b7` / `#ca88ff` | Sign In pill, selected sidebar icon only, play pills (text), links, focus ring |
| App Store | `#007aff` / `#007aff` (unchanged); rollover `#0045b7`, pressed `#005cd7`, IC `#0040dd` | All sidebar icons, View buttons (text on a 6% tint), "more" links, focus |
| Maps | `#007aff` (links), apl accent `#0071e3` / `#2997ff` | Selected nav icon tile (filled), links, focus outline |
| Docs | links `#0066cc` / `#2997ff` | Inline links |

- System colours DECLARED in the shared sheet are the **pre-2025** iOS values: red `#ff3b30`, orange `#ff9500`, green `#28cd41`, blue `#007aff`; dark red `#ff453a`, dark blue `#0a84ff`. The HIG now documents blue as `#0088FF`.
- Every system colour also has `-vibrant` and `_IC` variants.
- Contrast: `#007aff` on white = 4.0:1 and on `#f5f5f7` = 3.7:1. The App Store's 13 px bold blue "View" text is therefore below AA. Podcasts purple on white = 7.1:1.

### 4.4 Interaction states (MEASURED)

| State | Value | Site · element |
|---|---|---|
| Sidebar hover | **no background change** | Music, Podcasts, App Store nav items (screenshots confirm) |
| Sidebar hover | rgba(0,0,0,0.04), 0.1 s ease-out | Maps nav rows (same as selected) |
| Sidebar hover | text #6e6e73 → #1d1d1f, 0.15 s ease-in | HIG navigator |
| Sidebar selected | rgba(31,31,31,0.04) / rgba(255,255,255,0.05) + label w600 | Music |
| Sidebar selected | rgba(60,60,67,0.10) / rgba(235,235,245,0.10) + label w500 | App Store |
| Sidebar selected | rgba(0,0,0,0.04), filled blue icon tile | Maps |
| List-row hover | rgba(0,0,0,0.06) / rgba(255,255,255,0.06); row separators fade out | Music album rows |
| List-row hover | plate `#f2f2f2` / `#2b2b2b`, radius 6, extends about 25–29 px beyond the row | Podcasts episodes |
| Artwork hover | overlay rgba(51,51,51,0.30) fades in; play and more buttons appear | Music, Podcasts, App Store event cards |
| Card hover | adds shadow 0 5px 15px + 0 2px 6px rgba(0,0,0,0.05), scale ~1.01, 0.14 s ease-out | Maps result platter |
| Tinted button hover | accent 6% → 10% (dark 8% → 13%), 0.14 s → 0.21 s ease-out | App Store View |
| Icon button hover | rgba(0,0,0,0.04) → 0.08 | Maps sidebar toggle |
| Pill hover (marketing) | `#f5f5f7` → `#fff` | apple.com |
| Text selection | black 16% / white 24% (Music); accent (Podcasts) | DECLARED |
| Segmented control | track rgba(118,118,128,0.12) / 0.24; thumb `#fff` / `#636366` | DECLARED (Music) |

---

## 5. Radii

| Value | Where (MEASURED) |
|---|---|
| 4 px | App Store search field (!); Music small cover in editorial card; Music player icon buttons |
| 5 px | Music 40 px track artwork; Podcasts 90 px episode artwork; Music 56 px mobile search artwork |
| 6 px | App Store nav items; HIG/DocC navigator rows; Music context menu; Podcasts row hover plate; Maps brand link |
| 7 px | Music/Podcasts artwork 144–260 px |
| 8 px | **Music/Podcasts nav items** (36 px rows); Music top-search card |
| 9 px | Maps 30 px icon tiles and toggle button; Music mobile search field |
| 10 px | Music 270 px detail artwork; editorial cards (540 px); **modal dialog**; App Store privacy card |
| 12 px | Maps photos, map-control group, nav rows; HIG filter field; App Store popover items |
| 13 px | App Store Today card inner artwork (card 17 − 4 px border) |
| 14 px | App Store popover; Podcasts 28 px play pill; Podcasts review card |
| 15 px | DocC code blocks and asides |
| 16 px | **Maps result platters, search field, pills**; Music mobile scope tabs (32 px tall = pill) |
| 17 px | **App Store Today and event cards** |
| 18 px | marketing tiles |
| 24 px | **App Store chart cards, review cards**; Music album pill (36 px tall = pill) |
| 25% | App Store app icons (approximation of the squircle) |
| 50% | every circular icon button (28–36 px) |
| 980 / 1000 px | every pill button (Sign In, View, floating player, desktop search field, marketing CTAs) |

**DECLARED scales:**
- App Store: 5 / 9 / 17 / 24.
- Maps (apl): 4 / 8 / 12 / 16 / 24, plus circle 100%.

**Nesting (MEASURED):**
- App Store Today card 17 px with a 4 px border holds 13 px inner artwork. That is concentric (17 − 4 = 13).
- The App Store popover (14 px radius, 8 px padding) holds 12 px items. That is not concentric.
- Maps platters (16) sit inside a square-edged glass card.

**Size rule (INFERRED):** radius grows with object size: ~5 px at 40 px, 7 px at 150–260 px, 10 px at 270–540 px, 16–24 px for content cards.

---

## 6. Spacing and sizes

| Measure | Value | Site |
|---|---|---|
| Sidebar width | **260 px** (≥ 767 px); 33.9 vw (484–767); top bar below 484 | Music, Podcasts, App Store |
| Sidebar width | 211 px; results card 420 px | Maps |
| Sidebar width | 200 px (HIG), resizable | DocC |
| Sidebar inner inset | list padding 36 / 12 / 0 / 20 → rows at x = 20, 227 px wide | Music |
| Sidebar inner inset | rows at x = 25, 209 px wide | App Store |
| Sidebar inner inset | rows inset 10 px, 190 px wide | Maps |
| Nav row height | **36 px** (4 px gap, 40 px pitch), inner 28 px, icon 24 px; mobile 44 px | Music, Podcasts |
| Nav row height | **32 px** (2 px gap), mobile 40 px; icon 18×24 | App Store |
| Nav row height | 46 px with 30 px icon tile | Maps |
| Nav row height | 32 px | DocC navigator |
| Top bar, mobile | 52 px (Music), 44 px (App Store) | — |
| Docs bars | global nav 44 px (48 mobile) + doc nav 52 px (48 mobile) | developer.apple.com |
| Content gutter | **40 px** (≥ 1000 px), **25 px** below | Music, Podcasts, App Store |
| Content gutter | 20 px panel padding; mobile cards 16 px from edges | Maps |
| Content gutter | ~24.4 px at 390 (6.25%) | DocC, marketing |
| Content max-width | none (fluid to 2560) | Music |
| Content max-width | ~1600 px (INFERRED from 2560-wide run) | App Store |
| Content max-width | 740 px text column; 980–1180 px total layout | DocC |
| Page-title block | h1 at y = 32 with 28 px section top padding | Music |
| Page-title block | 11 px vertical padding | App Store |
| Shelf grid gap | 24 px row / 20 px column (desktop), 10 px column (390) | Music |
| Shelf item | editorial 2-up = 50% − 10 px; artwork 204 px at 1440, 144 px at 390 | Music |
| Track row | **55 px** (40 px art, 12 px art–text gap, 7.5 px vertical padding) | Music shelves |
| Album song row | **46 px** desktop, 54 px mobile | Music |
| Search result row (mobile) | 77 px, 56 px circular art, padding 10/11 | Music |
| Episode row | ~152 px, padding 10 px, 90 px art | Podcasts |
| App lockup row | 48 px icon, title + subtitle | App Store |
| Context menu | 185 px wide, **32 px items**, 10 px side padding | Music |
| Popover menu | 211 px wide, 8 px padding, 32 px items | App Store |
| Modal | 691 × 572 at 1440, 30 px content padding | Music |
| Card padding | 16 px (Today list card); 20 px (reviews); 30 px (privacy) | App Store |
| Card padding | 16 px vertical, 20–23 px text inset | Maps platter |
| Card padding | 16 px | DocC aside |
| Pill button, desktop | 36 px tall, 12 px side padding | Music |
| Pill button, mobile | 48 px tall | Music |
| Pill button, small | 32 px, padding 7/16 (charts 28 px) | App Store View |
| Pill button, small | 28 px | Podcasts play pill |
| Pill button | 36 px | Podcasts "Latest Episode", padding 0/22 |
| Pill button | 33 px, padding 6/12 | Maps filter pills |
| Pill button | 44 px (11/21) and 56 px (17/30); small 24 px (3/10) | marketing |
| Icon buttons | 28–30 px circles (more, share) | Music |
| Icon buttons | 30 px (radius 9 or circle) | Maps |
| Icon buttons | 36 px | map controls, Podcasts follow |
| Icon buttons | 44 px | Maps mobile controls; App Store hamburger |
| Search field | 38 px pill, 500 px wide (desktop) | Music |
| Search field | 38 px, radius 9 (mobile) | Music |
| Search field | 32 px, radius 4 | App Store |
| Search field | 46 px, radius 16 | Maps |
| Search field | 40 px, radius 12 | DocC filter |
| Primary actions gap | 12 px (desktop), 14 px (mobile) | Music album |

DECLARED spacing scale (Maps, apl): **2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 72**, plus a 4 px-step scale 0–128.

---

## 7. Separators

| Value | Where (MEASURED) |
|---|---|
| 1 px rgba(0,0,0,0.15) / rgba(255,255,255,0.10) | Music track-row separators (on `::after`, spanning artwork and text); Podcasts episode rows; Music context-menu item dividers |
| 1 px rgba(0,0,0,0.11) | Music album song rows (hidden on hover) |
| 1 px rgba(0,0,0,0.05) / rgba(255,255,255,0.05) | Music/Podcasts sidebar right edge |
| 1 px rgba(0,0,0,0.10) | Music sidebar footer top edge |
| 1 px rgba(0,0,0,0.15) / rgba(255,255,255,0.10) | App Store sidebar right edge |
| 1 px `#d1d1d6` / `#3a3a3c` (opaque systemGray4) | App Store section divider |
| 1 px `#d2d2d7` / `#424245` | DocC section rules, sidebar edge, filter border |
| 1 px rgba(29,29,31,0.20) / rgba(66,66,69,0.95) | DocC nav bar bottom keyline |
| 1 px rgba(118,118,128,0.12) / 0.24 | Maps sidebar edge |
| 1 px rgba(60,60,67,0.30) | Maps filter-pill outline |
| 1 px rgba(255,255,255,0.24) | marketing local-nav keyline |

DECLARED:
- `labelDivider` = black 15% / white 10%; IC black 30%.
- A hairline variant `0.5px solid labelDivider`.
- Maps `--separator-color` `#3c3c432e` (= rgba(60,60,67,0.18), iOS separator).
- App Store `--defaultLine: systemGray4`.

**Reading (INFERRED):** separators are always 1 px CSS. Media apps use 10–15% alpha so they work over tinted pages; the App Store and docs use opaque grey. Separators run the full width of the row (no inset to the text start) on all sites measured.

---

## 8. Materials (backdrop-filter)

| Element | Filter | Background light / dark | Site |
|---|---|---|---|
| Sidebar; floating player; mobile top bar; follow button | saturate(2.2) blur(16px) | rgba(245,245,247,0.55) / rgba(38,38,40,0.60) | Music, Podcasts |
| Context menu | blur(60px) saturate(2.1) (dark 2.2) | rgba(246,246,246,0.72) / rgba(40,40,40,0.70); inset 0 0 0 1px white 20% | Music |
| Play/more buttons over artwork | saturate(1.6) blur(60px) | rgba(40,40,40,0.40) | Music |
| Play/more buttons over artwork | saturate(1.9) blur(60px) | rgba(246,246,246,0.48) | Podcasts |
| Hero play pill | blur(30px) saturate(1.8) | rgba(40,40,40,0.70) | Podcasts |
| Video badge | blur(45px) | rgba(0,0,0,0.45) | Podcasts |
| "View" button over artwork | saturate(1.8) blur(10px) | rgba(255,255,255,0.25) | App Store |
| Text protection on Today card | blur(34px) brightness(0.95) saturate(1.6) contrast(1.1) | rgba(0,0,0,0.18) | App Store |
| App header backdrop | blur(100px) saturate(1.5) | — | App Store app page |
| Sidebar | blur(50px) | rgba(255,255,255,0.80) / rgba(0,0,0,0.60) | Maps |
| Results card | blur(50px) | rgba(255,255,255,0.60) / rgba(0,0,0,0.60) | Maps |
| Map controls | blur(15px) | rgba(255,255,255,0.80) / rgba(0,0,0,0.60) | Maps |
| Local nav | saturate(1.8) blur(20px) | black | marketing |

DECLARED material ladder (shared sheet, light / dark):

| Material | Light | Dark |
|---|---|---|
| ultrathin | `#f6f6f6` 36% | `#282828` 40% |
| thin | 48% | 50% |
| medium | 60% | 60% |
| thick | 72% | 70% |
| ultrathick | 84% | 80% |

Other declared values:
- header material: white 80% / `#1e1e1e` 80%;
- toolbar: `#fdfdfd` 80% / `#3c3c3c` 80%;
- "glass": `#f5f5f7` 55% / `#262628` 60%;
- each material has an opaque `-inactive` fallback (`#f0f0f0` / `#282828`) and an opaque `_IC` value.
- DocC declares a stuck-nav material of white 70% / `#1d1d1f` 70%.

**Reading (INFERRED):**
- Glass appears only on chrome and controls that float over content (sidebar, player, menus, map UI, buttons over artwork), never on content cards. This matches HIG rule 2.
- Light glass is ~55–80% white, with saturation 1.6–2.2 and blur 16 px (bars) to 50–60 px (menus, panels).
- Every material has an opaque fallback for increased contrast.

---

## 9. Shadows

| Value | Where (MEASURED) |
|---|---|
| 5 layers: 0 1px 1px a.01, 0 2px 2px a.01, 0 4px 4px a.02, 0 8px 8px a.03, 0 14px 14px a.03 (same in dark) | Music/Podcasts artwork tiles: an almost invisible lift |
| 0 10px 20px rgba(0,0,0,0.10) + inner 0 3px 10px 0.19 (dark 0.30 / 0.32) | Music album and episode detail artwork |
| 0 10px 40px rgba(0,0,0,0.10) (dark 0.20) | Music floating player; desktop search field; mobile mini player |
| 0 8px 40px rgba(0,0,0,0.25) (dark 0.55) | Music context menu |
| **0 3px 9px rgba(0,0,0,0.08)** (DECLARED `--shadow-small`) | App Store Today cards, chart cards, event cards (same in dark) |
| 10px 10px 10px rgba(0,0,0,0.10) | App Store platform popover |
| 0 1px 2px rgba(0,0,0,0.10) | App Store mobile top bar |
| 0 −2px 20px + 0 0 12px rgba(0,0,0,0.10) | Maps floating map controls |
| 0 5px 15px + 0 2px 6px rgba(0,0,0,0.05) | Maps result platter, hover only |
| 10px 1px 5px rgba(0,0,0,0.024) | Maps results card edge |
| 0 5px 15px rgba(0,0,0,0.08) | Music mobile search circular artwork |
| none | DocC/HIG content, marketing, modals (scrim only) |

DECLARED Maps (apl) elevation:
- raised: 0 2px 4px 0.12 + 0 2px 12px 0.08;
- elevated: 0 2px 8px 0.12 + 0 2px 16px 0.08;
- floating: 0 2px 8px 0.12 + 0 2px 24px 0.08.

Music also declares `dialogShadowColor` black 25% / 55%.

**Reading (INFERRED):** shadows are rare and soft (5–10% alpha) on content. Strong shadows (25–55%) are reserved for menus that float above everything. Dark mode keeps or raises the shadow alpha instead of dropping it.

---

## 10. Motion

| Duration · easing | Property | Site · element |
|---|---|---|
| **0.1 s ease-in** | opacity | Music/Podcasts/App Store artwork fade-in (DECLARED as the global transition) |
| 0.1 s linear | margin, width | Music page frame on sidebar change |
| 0.1 s ease-out | background-color | Maps nav rows, icon buttons |
| 0.14 s ease-out → 0.21 s on hover-out | background-color | App Store View button |
| 0.14 s ease-out | all | Maps result platter hover |
| 0.15 s ease | background-color | Podcasts filter button |
| 0.15 s / 0.05 s linear | opacity, transform | Podcasts skip controls |
| 0.15 s ease-in | color | HIG navigator links |
| 0.175 s ease-in | background-color | App Store popover items |
| 0.2 s ease-out | transform | Music play button press; Maps pills |
| 0.2 s ease-out | color | Podcasts speed control |
| **0.21 s ease-out / ease-in** | translate, filter, color, backdrop-filter, radius | App Store (chevrons, badges, title colour, card protection layer) |
| 0.25 s ease-in-out | width, height, left | Maps tray and map resize, carousel |
| **0.3 s cubic-bezier(0.215, 0.61, 0.355, 1)** | padding-inline-end | Music/Podcasts player bar and sections when the queue drawer opens |
| 0.3 s ease-in | width | DocC sidebar collapse |
| 0.35–0.5 s ease-out | custom gradient props | App Store Today card gradient |
| 0.4 s cubic-bezier(0.4, 0, 0.2, 1) | transform | App Store mobile header |
| 0.32 s cubic-bezier(0.4, 0, 0.6, 1) | color | global nav (developer, marketing) |
| 0.5 s cubic-bezier(0.28, 0.11, 0.32, 1) | background, color | DocC nav bar; marketing local nav 0.24 s |
| 0.5 s ease (+ 0.3/0.6 s delay), 0.9 s opacity | transform | marketing scroll reveals |
| 2.5 s ease | pulse animation | DocC loading skeleton |

DECLARED Maps (apl) motion:
- times 0, 50, 100, 150 … 550 ms (50 ms steps), then 750, 1000, 1250 ms;
- curves: default cubic-bezier(0.12, 0.55, 0.19, 1); heavy-in (0.03, 0, 0.31, 1); heavy-out (0.64, 0, 0.85, 1); fade linear.

Reduced-motion and contrast queries present (count of rules):

| Site | prefers-reduced-motion | prefers-contrast | pointer: coarse | hover: hover |
|---|---|---|---|---|
| Music | 16 | 90 | 18 | 13 |
| Podcasts | 9 | 74 | — | — |
| App Store | 5 | 11 | — | — |
| Maps | 1 | 70 | — | — |
| DocC | 2 | — | — | — |

**Reading (INFERRED):** app interactions run 100–210 ms. Ease-in is used for fades and appearances (opacity, colour), ease-out for hover and press feedback. Only layout changes (drawers, trays) take 250–300 ms. Nothing in the app UIs bounces or overshoots.

---

## 11. Focus

| Site | Focus style (MEASURED with Tab) |
|---|---|
| Music | outline none; **box-shadow 0 0 0 4px rgba(0,122,255,0.6)**, dark rgba(10,132,255,0.6). Follows the element radius (pill, 8 px row, circle). Search input: outline 4px solid same colour, offset −1px. |
| Podcasts | same 4 px ring in the key colour: rgba(114,36,216,0.6) / rgba(156,90,242,0.6) |
| App Store | same 4 px ring rgba(0,122,255,0.6) in both modes; search field gets it too |
| Developer / HIG | outline 2px solid `#0071e3` offset −7px (global nav links); 4px solid rgba(0,125,250,0.6) offset −7px (buttons); DocC declares focus colour rgba(0,125,250,0.6) |
| Maps | outline 1px solid `#007aff` / `#0a84ff`, offset 0–1px (nav, links); 2px solid offset 2px (back button); mobile controls box-shadow 0 0 0 2px `#007cff` |
| Marketing | outline 2px solid `#0071e3`, offsets 0–3px |

**Reading (INFERRED):** Apple's app pages use one focus ring: 4 px, accent colour at 60% alpha, drawn as a box-shadow so it follows the corner radius. It only appears for keyboard focus (focus-visible).

---

## 12. Patterns

### 12.1 Strong evidence (repeats across sites or is declared as a system)

1. **One shared token system** for Music, Podcasts and the App Store (481 identical root tokens), with per-app key colour. Every colour has light, dark and increased-contrast variants.
2. **macOS text styles on desktop web:** 13/16 body, 12/15 secondary, 11/14 eyebrow, 15/20, 17/22 section title, 22/26, 26/32, 34/40 page title. No letter-spacing in the apps. Phones raise only nav, inputs and buttons to 16–17 px.
3. **Section titles 17/22 bold**, used identically on all three media apps.
4. **Text hierarchy by alpha:** primary 85–88%, secondary 50–56%, tertiary 25–48%. Rows often use one size for primary and secondary text and separate them by colour alone.
5. **Sidebar:** 260 px, 32–36 px rows, 6–8 px radius, neutral grey selection fill (4–10%) with a heavier label weight; **no hover fill**; accent only in icons.
6. **Pill buttons everywhere** (radius 980–1000 px or half the height): 28, 32, 36, 44 or 48 px tall.
7. **Focus ring:** 4 px at 60% of the accent (Music, Podcasts, App Store, developer site).
8. **Separators:** 1 px at ~10–15% alpha (or opaque grey ~`#d1d1d6`), full row width.
9. **Glass only on floating chrome:** saturate 1.6–2.2 with blur 16 px (bars) or 50–60 px (menus, panels), 55–80% tinted fill, opaque fallbacks.
10. **Dark app pages are dark grey, not black:** `#1f1f1f` (Music, Podcasts) and `#151515` (App Store). Docs and marketing use `#000`.
11. **Short motion:** 0.1 s ease-in fades, 0.14–0.21 s ease-out hovers, about 0.3 s for layout; no spring overshoot.
12. **Breakpoints 484 / 1000 / 1260 / 1580 px** (shared sheet); gutters 25 → 40 px at 1000.
13. **No bottom tab bar on the phone web.** All three media apps use a top bar (44–52 px) plus a hamburger menu; Maps uses a bottom sheet. This differs from the HIG tab-bar rule (hig-digest rule 10).

### 12.2 One-offs and site-specific choices

- App Store search field: 32 px tall, radius 4 px (other fields are 38–46 px with radius 9–16 or pills). Its computed font is Arial, an apparent bug.
- Music uses black as its key colour, with blue/cyan icons. Podcasts uses purple sparingly. The App Store uses blue everywhere, unchanged in dark mode.
- App Store titles use negative tracking (−0.02 em); nothing else in the apps does.
- The Podcasts row hover plate overhangs the row by about 25–29 px.
- App Store popover radii are not concentric (14 outer, 8 padding, 12 inner).
- Maps uses iOS label greys (rgba(60,60,67,0.6)) that fail AA on white.
- The App Store "View" button text (`#007aff` on a tinted grey page) is ~3.7:1.
- Album and artist pages tint the page from the artwork (`has-theme-override`), including the secondary text colour (e.g. rgb(223,200,200)).
- Music artwork uses a 5-layer barely visible shadow; the App Store uses a single 0 3px 9px at 8%.

---

## 13. Candidate tokens (all INFERRED, for discussion)

Proposals built from the evidence above. They are not decided; the owner votes (D-006).

| Token | Light | Dark | Evidence |
|---|---|---|---|
| `--text-primary` | rgba(0,0,0,0.88) | rgba(255,255,255,0.92) | Chromium branch of the Apple apps (16.5:1 / 14:1) |
| `--text-secondary` | rgba(0,0,0,0.56) | rgba(255,255,255,0.64) | passes AA (4.95:1 / 7.4:1); Safari's 0.50 fails |
| `--text-tertiary` | rgba(0,0,0,0.48) | rgba(255,255,255,0.40) | non-text or large text only (3.7:1 / 3.8:1) |
| `--bg-page` | `#ffffff` | `#1f1f1f` | Music, Podcasts |
| `--bg-page-grouped` | `#f5f5f7` | `#151515` | App Store |
| `--fill-selected` | rgba(60,60,67,0.10) | rgba(235,235,245,0.10) | App Store sidebar; Music uses 0.04–0.05 |
| `--fill-hover-row` | rgba(0,0,0,0.06) | rgba(255,255,255,0.06) | Music track list |
| `--fill-tinted-card` | rgba(0,0,0,0.05) | rgba(255,255,255,0.05) | App Store cards |
| `--separator` | 1px rgba(0,0,0,0.15) | 1px rgba(255,255,255,0.10) | `labelDivider` |
| `--separator-opaque` | `#d1d1d6` | `#3a3a3c` | App Store `systemGray4` |
| `--accent` | project choice; Apple uses `#007aff` / `#0a84ff` | — | §4.3 |
| `--focus-ring` | 0 0 0 4px accent @ 60% | same | §11 |
| `--material-bar` | rgba(245,245,247,0.55) + saturate(2.2) blur(16px) | rgba(38,38,40,0.60) | Music sidebar and player |
| `--material-menu` | rgba(246,246,246,0.72) + blur(60px) saturate(2.1) + inset 1px white 20% | rgba(40,40,40,0.70) | Music context menu |
| `--shadow-card` | 0 3px 9px rgba(0,0,0,0.08) | same | App Store |
| `--shadow-float` | 0 10px 40px rgba(0,0,0,0.10) | 0.20 | Music player, search |
| `--shadow-menu` | 0 8px 40px rgba(0,0,0,0.25) | 0.55 | Music menu |
| `--scrim` | rgba(0,0,0,0.45) | same | Music modal |

| Token | Value | Evidence |
|---|---|---|
| Type scale (desktop app) | 10/13, 11/14, 12/15, **13/16 body**, 15/20, 17/22, 22/26, 26/32, 34/40 | §3.1 |
| Type, reading | 17/25 body, −0.022 em | DocC |
| Type, mobile controls | 16–17 px (nav, inputs, buttons) | Music, App Store, Maps |
| Weights | 400 / 500 / 600 / 700 (800 only for emphasized headline) | §3.1 |
| Radius scale | 4, 6, 8, 10, 12, 16, 24, pill | union of App Store (5/9/17/24), Maps (4/8/12/16/24) and Music measurements |
| Radius: nav row / menu | 6–8 | Music 8, App Store 6, DocC 6 |
| Radius: thumbnail ≤ 48 px | 5 | Music, Podcasts |
| Radius: media tile / modal | 10 | Music |
| Radius: card | 16–24 | Maps 16, App Store 17/24 |
| Spacing scale | 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 | apl scale + the 40 px gutter |
| Sidebar | 260 px wide, rows 36 px (comfortable) or 32 px (compact), 4 px / 2 px gaps | §6 |
| Gutters | 25 px < 1000 px, 40 px ≥ 1000 px | shared sheet |
| Mobile top bar | 44–52 px | App Store / Music |
| List rows | 46 px (text + subtitle, desktop), 55 px (with 40 px thumbnail), 32 px menu items | Music |
| Controls | pill heights 28 / 32 / 36 (desktop), 44 / 48 (touch); fields 38 (desktop), 44–46 (touch) | §6 |
| Motion | fade 100 ms ease-in; hover 140–210 ms ease-out; layout 300 ms cubic-bezier(0.215, 0.61, 0.355, 1) | §10 |
| Breakpoints | 484, 1000, 1260 px | shared sheet |

---

## 14. Open questions

1. **Safari or Chromium alpha?** Apple's own Chromium values (0.88/0.56) pass AA; the Safari values (0.85/0.50) do not for secondary text. We suggest the Chromium set everywhere; confirm.
2. **Density:** Apple's desktop web uses the macOS 13 px body. Does AISloop follow that (dense, Mac-like) or the iOS 17 px, or switch at a breakpoint? This feeds open question 1 in hig-digest.
3. **Accent model:** a black key colour with blue icons (Music), a sparing brand colour (Podcasts), or blue everywhere (App Store)?
4. **Radius family:** small and tight (Music 5/7/8/10) or larger and softer (App Store 17/24, Maps 16)? They feel different; this needs a board.
5. **Separators:** alpha (works on tinted pages) or opaque grey (crisper on flat pages)?
6. **Glass sidebar** (Music/Maps) or nearly opaque sidebar (App Store)?
7. **Phone navigation:** Apple's own web apps use a top bar and hamburger, not the HIG bottom tab bar. Which does AISloop follow?
8. **System colour generation:** the web apps still ship pre-2025 values (`#007aff`); the HIG documents `#0088FF`. Which do our tokens use?
9. **Dark page grey:** `#1f1f1f` (Music) or `#151515` (App Store)? Both are app choices; `#000` is used only by docs and marketing.
10. **Not measured here:** sheets on phones (none reachable without login), toasts, form validation and toggles/switches (only declared colours), and the App Store chart-card hover. Maps' odd fractional font sizes (14.008, 15.997 px) come from rem scaling and were read as 14/16.
