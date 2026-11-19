# Native measurements: geometry and colour of Apple's shipping apps

Measured 2026-11-19 from the private screenshot set in `research/_private/01-taste-calibration/apple-ios/` and `apple-macos/` (manifest ids are cited below; the images themselves stay private, D-003). No Apple UI kit was opened (D-008). Every number here is **MEASURED** from pixels unless marked **INFERRED**. The point of this file is to fill the gaps the HIG leaves (see `research/hig-digest/layout.md` §3: "not given" for margins, radii, row heights and spacing).

Pixel crops used to check edge detection are in `research/_private/02-foundations/measure/` (git-ignored).

---

## 1. Method

**Tools.** Node 24 with `pngjs` and `jpeg-js` in a scratch folder outside the repo. Small scripts read pixels and:

- **Edges**: scan a row or column for colour runs; an edge is placed at sub-pixel precision by summing anti-aliasing coverage between the two flat colours (or the alpha channel when the image has a transparent surround).
- **Corner radius**: for a rounded rectangle on a flat background, find where the curve crosses the 45° diagonal from the corner. For a circular arc that inset is `r · (1 − 1/√2)`, so `r45 = inset / 0.2929`. A least-squares circle fit over the whole curve was run as a cross-check; the two agree within ±1 px wherever the background is flat. Apple's continuous ("squircle") corners start curving earlier than a circle; `r45` is the radius of the CSS `border-radius` circle that matches the corner at its visual middle, which is what a web token needs.
- **Text size**: the sub-pixel height of flat-topped capitals (H, N, T, E, D, F, digits) summed from per-row ink coverage, divided by SF Pro's cap-height ratio (≈ 0.705 em). Calibration: on the @3x iPhone renders, 17 pt Body measured 35.94 px = 17.00 pt and 13 pt Footnote measured 27.65 px = 13.07 pt, so the method is good to about ±0.3 pt on sharp @3x images and ±1 pt on soft, downscaled ones. Large titles consistently read 33.2–33.4 pt; they are almost certainly the 34 pt Large Title (the bold display cut seems to have a marginally lower cap height), so read them as 34.
- **Colour**: direct pixel samples in flat regions; text colours as the histogram mode of the ink pixels in a word.
- Each value was taken from as many independent instances as the set allows. Where only one instance exists, `n = 1` says so.

**Scale (px per pt), per image.** All values below are converted to points with the scale stated here.

| Image group | Scale used | How the scale was established | Confidence |
|---|---|---|---|
| iPhone App Store renders 1290×2796 (`ios-notes-list-light`, `ios-notes-note-light`, `ios-reminders-*-light`) | **3.000** (430 pt wide) | Resolution = iPhone Pro Max @3x; Body text measured exactly 17.0 pt | high |
| HIG iPhone images 536 px wide (`ios-calendar-newevent-*`, `ios-notes-formatsheet-*`) | **1.333** (402 pt wide) | Body cap 15.97 px = 17 pt at 1.332 | high |
| iPhone User Guide images 490×1008 with device frame (`ios-settings-root-light`, `ios-music-library-light`) | **1.132** (393 pt wide) | Screen opening 445 px; toggle and row pitch consistent; text too soft to calibrate better | medium (±2 %, ±1 px = ±0.9 pt) |
| iPad App Store renders 2752×2064 / 2732×2048 (`ipados-notes-threecolumn-light`, `ipados-reminders-today-light`) | **2.000** | Resolution = iPad Pro @2x; Body cap 24.05 px = 17.06 pt | high |
| macOS images (all) | **per image, from 13 pt body labels** (cap 9.16 pt) | macOS images are scaled renders (HIG and Support images are not exactly @1x or @2x). Measured scales: System Settings 1.58, Mail compose 1.59, Reminders sheet 1.52, Save dialog 1.45, Calendar popover 1.31, Mail (macOS 27 marketing) 1.157, Finder 1.17, Notes 1.15, Menu 2.00 | medium: ±3–5 % on each macOS value |

**macOS scale cross-check.** With the 13 pt-body scale, the traffic-light buttons come out at 13.2–14.3 pt in five independent images (centre pitch 22.4–23 pt), and the Mail reading pane's Helvetica 12 body text (the Mail default) gives the same scale within 4 %. That consistency is the evidence for the scale. It also means the window controls in current macOS are about **14 pt**, not the 12 pt of older releases (DERIVED, not verified by Apple text). If the 13 pt assumption were wrong, every macOS length below would shift by the same factor; ratios between macOS values do not depend on it.

**Images excluded or down-weighted.** `ios-mail-inbox-light`, `ios-messages-*` (cropped from App Store composites, scale unknown); `ios-weather-location-light` (device on a canvas); `macos-finder-window-anatomy-*` (diagram; its text and traffic lights imply different scales, so used only for colour); `macos-window-states-*` (three windows composited at three different scales; only the Notes window was used, scaled by its own text); `macos-menu-icon-grouping-*` (HIG says rendered larger; its text gives exactly @2x, used at 2.0); `macos-pages-*`, `macos-keynote-*`, `macos-numbers-*` (text and traffic lights disagree on scale, so only proportions used); the marketing JPEGs (compression blurs edges by ~1 px).

---

## 2. iOS / iPadOS: measured values

`n` = number of independent instances; "src" = manifest ids (prefix `ios-`/`ipados-` dropped where obvious).

### 2.1 iPhone layout

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Side margin of inset-grouped cards, 430 pt-wide phone | **20 pt** | 19.6–20.0 | 4 | notes-list, reminders-newsheet, reminders-home (cards and tile grid) | equals the trailing inset of separators |
| Side margin, 393/402 pt-wide phone | **16 pt** | 15.5–16.0 | 3 | settings-root (both sides), calendar-newevent-dark | margin follows device width: 16 pt on standard phones, 20 pt on Pro Max |
| Grouped card corner radius | **26 pt** | 25.3–27.6 | 8 cards | notes-list (4 corners: 25.3), reminders-newsheet (25.7–26.0), reminders-home (26.0), calendar-newevent-dark (26.0), settings-root (25.8–27.6, soft) | the shape fits a circle almost exactly at @3x |
| A card one row tall | 51.3 pt tall with 26 pt corners | — | 1 | reminders-newsheet ("Notes & URL") | the radius stays 26, so a one-row card is nearly a capsule |
| Row height, one line (with toggle, glyph or 29 pt tile) | **52 pt** | 51.8–53.7 | 3 images, 11 rows | reminders-newsheet (51.8), settings-root (52.1 × 6 rows), calendar-newevent-dark (53.7 × 4, rows with value capsules) | |
| Row height, title + subtitle, no leading icon | **59 pt** | 59.0–60.5 | 2 images, 9 rows | notes-list (59.0 × 4), ipados-notes (59.5–60.5) | |
| Row height, title + subtitle with leading glyph | 68 pt | — | 1 image, 2 rows | reminders-newsheet (Date, Time) | |
| Row height with a 32 pt circular icon | 62 pt one line; 72 pt two lines | 61.5–62.5; 72.3 | 1 image, 6 rows | reminders-home | |
| Settings icon tile | **29 pt** square | 28.3–29.1 | 3 | settings-root | soft image, ±1 pt |
| Settings icon tile radius | 7.3 pt (≈ 0.25 × size) | — | 1 | settings-root | |
| Leading inset of the icon tile from card edge | ≈ 15 pt | — | 1 | settings-root | |
| Row icon (Reminders list circle) | 32 pt, 20 pt inside the card edge | — | 1 | reminders-home | text starts 69 pt from card edge |
| Separator thickness | renders as a hairline: 2–3 device px of #e3e3e4–#e7e7e8 on white at @3x (≈ 1 pt of a very light grey, or 1 device px of UIKit's #c6c6c8) | — | 4 | notes-list, reminders-newsheet, calendar-newevent-light/dark | |
| Separator leading inset | **= start of the row's text** (27.2 pt with a small leading glyph gutter; 56.6 pt after a 29 pt tile; 64 pt after a glyph) | — | 3 | notes-list, settings-root, reminders-newsheet | never starts under the icon |
| Separator trailing inset | **= the screen margin** (19.7 / 16.3 / 20 pt) | 16.3–20 | 3 | notes-list, settings-root, reminders-newsheet | separators stop short of the card's right edge |
| Gap between grouped cards, no header | **35 pt** (Settings) | 35.3 (× 2) | 1 | settings-root | |
| Gap between stacked field cards in a sheet | 8 pt | — | 1 | reminders-newsheet | form fields, not sections |
| Card bottom → next card top, with a section header | 56–60 pt | 56.3–60.3 | 2 | reminders-newsheet, notes-list | |
| Section header baseline → card top | **14 pt** | 14.0–14.6 | 2 | reminders-newsheet, notes-list | |
| Large title → first card (title baseline to card top) | 16 pt | — | 1 | settings-root | |
| Large title position | cap top 133 pt / baseline 156 pt from screen top under a 44 pt button row; baseline 148 pt with no button row | — | 2 | notes-list, settings-root | |
| Tile grid (Reminders smart lists) | tiles 191 × 80 pt, radius 16 pt, **8 pt gaps** both ways | 15.9 radius | 1 image, 6 tiles | reminders-home | |
| Value → disclosure chevron gap | ≈ 14 pt | 13.7–15.5 | 2 | reminders-home, settings-root | chevron ≈ 7 pt wide; its right edge 19–23 pt from the card edge |
| Thumbnail in a two-line row | 38 pt square, vertically centred | — | 1 image, 3 rows | notes-list | |

### 2.2 iPhone controls and chrome

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Glass circle buttons in the top bar | **44 pt** | 43.5–45.5 | 4 | notes-list (44.3), reminders-newsheet (45.5 incl. rim), calendar-newevent-dark (44.3), notes-formatsheet (43.5–44) | |
| Their position | outer edge ≈ 19 pt from the screen edge; centre 82 pt below the top on a Pro Max | 18.8–19 | 2 | notes-list, reminders-newsheet | sits 1 pt outside the card margin |
| Grouped icon capsule in the top bar (3 icons) | 159 × 45 pt | — | 1 | reminders-home | right edge at the 20 pt margin |
| Bottom search field | **48 pt tall, capsule** | 47.7–48.6 | 2 | notes-list (317.5 pt wide), settings-root (soft) | |
| Bottom bar inset | ≈ 27 pt from the screen sides, ≈ 25 pt above the bottom edge | — | 1 | notes-list | further in than content (follows the display corners) |
| Compose / floating circle button | **48 pt** (bottom bar) ; 49.5 pt (Reminders "+" floating button) | 48–49.5 | 2 | notes-list, reminders-home | gap between search pill and button 10.8 pt |
| Tab bar (floating capsule) | **62 pt tall**, inset 20 pt from both sides | 61.4 | 1 | music-library (soft, ±1 pt) | |
| Tab bar selected-item pill | ≈ 84 × 52–53 pt capsule, ≈ 4 pt inside the bar | — | 1 | music-library | |
| Mini player above the tab bar | 48 pt tall, same width as the tab bar, ≈ 9 pt gap | — | 1 | music-library | |
| Small centred title | **17 pt semibold**, vertically centred on the 44 pt buttons | — | 1 (+1 dark) | reminders-newsheet, calendar-newevent | |
| Sheet top corner radius (large detent, full width) | **38 pt** | 35.9–38.1 | 3 | reminders-newsheet (37.8), calendar-newevent-dark (38.1), notes-formatsheet top (35.9) | |
| Sheet top at large detent | 59 pt below the screen top | — | 1 | reminders-newsheet | |
| Floating (non-modal) sheet | inset **8 pt** from left, right and bottom; bottom corners ≈ 55 pt; top corners ≈ 36 pt | 7.9–8.3 inset | 1 | notes-formatsheet | bottom corners follow the display corners |
| Sheet header buttons | 44 pt circles, centre ≈ 42 pt below sheet top, ≈ 19 pt from the edge | — | 2 | reminders-newsheet, notes-formatsheet | |
| Sheet grabber | not visible in any image | — | 0 | — | |
| Toggle (switch) | **63 × 28 pt** | 62.7–63.8 × 28–29 | 3 | reminders-newsheet, calendar-newevent-dark, settings-root | knob is a pill ≈ 37–39 × 22–24 pt, ≈ 2.7 pt inside the track |
| Segmented control (sheet) | 33 pt tall capsule; selected segment 26 pt tall, 3.4 pt inside | — | 1 | calendar-newevent | |
| Value capsules (date/time pickers in rows) | ≈ 39 pt tall capsules | — | 1 | calendar-newevent-dark | |
| Inline chip inside a card ("Title: …") | 34 pt capsule, 10 pt from the card side | — | 1 | reminders-newsheet | |

### 2.3 iPhone text (cap-height method)

| Role | Measured | n | Source | Matching HIG style |
|---|---|---|---|---|
| Large title | 33.2–33.4 pt, bold | 3 | notes-list, settings-root, ipados-reminders-today | Large Title 34 (emphasized) |
| Body / row title | 17.0 pt (regular and semibold) | 5 | reminders-newsheet, notes-list, ipados-reminders-today | Body / Headline 17 |
| Section header (Notes) | 20 pt bold, primary colour | 2 | notes-list | Title 3 emphasized |
| Section header (Reminders sheet, iPad Reminders) | 17 pt semibold grey; 15 pt semibold grey on iPad | 2 | reminders-newsheet, ipados-reminders-today | Headline / Subheadline |
| Row subtitle | 13.0 pt (Reminders); 13.8–14.1 pt (Notes) | 3 | reminders-newsheet, notes-list | Footnote 13 / between Footnote and Subheadline |
| Footer under a group | 13 pt grey | 1 | reminders-newsheet | Footnote |

### 2.4 iPad

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Sidebar width | 280–320 pt | 280, 320 | 2 | ipados-notes-threecolumn (280), ipados-reminders-today (320) | |
| Sidebar row pitch | **44 pt** | — | 1 image, 10 rows | ipados-notes-threecolumn | |
| Sidebar selection | **44 pt capsule** (radius 22), inset **16 pt** from both sidebar edges | — | 1 | ipados-notes-threecolumn | |
| Content margin in the detail pane | **20 pt** | — | 1 | ipados-reminders-today | separators run margin to margin |
| List column (middle of three) | 340 pt; divider 1 pt (#e7e7e8) | — | 1 | ipados-notes-threecolumn | |
| List selection | 60 pt tall, radius **20 pt**, inset 16 pt from column edge | — | 1 | ipados-notes-threecolumn | rounded rect, not a capsule |
| Glass toolbar buttons | 44–45 pt circles, **11.5 pt apart** when separate | — | 1 image, 5 buttons | ipados-notes-threecolumn | |
| Tag chips | 34 pt tall, radius 8 pt, 8 pt gaps, 16 pt inset | — | 1 | ipados-notes-threecolumn | |
| Detail title (Notes) | 28 pt bold | 1 | ipados-notes-threecolumn | Title 1 emphasized |

---

## 3. macOS: measured values

All values use the per-image 13 pt-body scale from §1 (±3–5 %). Images are macOS 27 (Support guides, 2026 marketing) unless marked "26" (HIG).

### 3.1 Window and toolbar

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Window corner radius, sidebar attached to the window edge | **17 pt** | 17.0–17.4 | 4 | finder-icon-view, finder-list-preview, finder-gallery (17.4), notes-three-column (17.0), system-settings-menu-bar (17.2); mail marketing (≈17, busy background) | alpha-channel edges, very clean |
| Window corner radius, floating (inset) sidebar or no sidebar | **25–27 pt** | 24.7–26.6 | 3 | reminders-smart-list-sheet (26.6, macOS 27), mail-compose (25.3, macOS 26), window-states Notes window (24.7, macOS 26) | two clusters; see "Varies" |
| Traffic lights | ≈ 14 pt diameter, ≈ 22.5–23 pt centre pitch, red button ≈ 18.5–19 pt from the left edge, vertically centred in the toolbar | 13.2–14.3; 22.4–23.5 | 6 | settings, compose, reminders sheet, finder-list, notes, mail marketing | DERIVED from the 13 pt scale |
| Toolbar height (window top to content) | **≈ 51 pt** | 50–53 | 3 | mail-compose (50), mail marketing (51.4), finder-list (≈ 52) | |
| Toolbar item height (glass capsule or circle) | **36 pt** | 35–36.7 | 4 | mail-compose (36; Send circle 36), finder-list (36.7), system-settings (36), mail marketing search field (35 + 3 pt focus ring) | |
| Toolbar item inset from window top | 7–8.5 pt | — | 3 | compose (7.2), settings (8.2), finder (8.5) | |
| Selected segment inside a toolbar capsule | 28.6 pt tall, 4 pt inside the 36 pt capsule | — | 1 | finder-list (view switcher) | |
| Toolbar button at the window corner | 7.3–7.5 pt from the top and right edges | — | 1 | mail-compose (Send) | concentric with the window corner (§5) |
| Toolbar title | 15 pt bold | 2 | system-settings ("Menu Bar"), finder-list ("Documents — Local") | |

### 3.2 Sidebar

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Sidebar width | varies: 162–287 pt | 162, 204, 214.5, 287 | 4 | finder-list (162), mail marketing (204), system-settings (214.5), reminders-smart-list-sheet (287) | content-dependent |
| Floating sidebar inset from window edges | **8 pt** | 7.9–8.9 | 1 image, 2 edges | reminders-smart-list-sheet | |
| Floating sidebar corner radius | 16.8 pt | — | 1 | reminders-smart-list-sheet | low contrast under a sheet dim; ±1.5 pt |
| Sidebar row height | **32 pt** | 30.9–32.5 | 4 | system-settings (31.6), finder-list (32.5), mail marketing (31.5), notes (≈ 31) | |
| Selected-row pill height | = row height (32 pt) | 30.9–32.5 | 4 | same | |
| Selected-row pill inset from sidebar edges | **10 pt** | 9.5–10.7 | 3 | system-settings (9.5 both sides), finder-list (10.3–10.7), mail marketing (9.5) | |
| Selected-row pill radius | **8 pt** | 7.5–8.1 | 2 | system-settings (8.1), mail marketing (7.5–8.0) | rounded rect, not a capsule |
| Sidebar section header ("Favorites", "iCloud") | **11 pt** semibold, grey | 10–11.2 | 4 | finder-list, save-dialog, mail marketing, system-settings | |
| Sidebar icon tile (System Settings) | 20 pt | 20–20.5 | 1 image, 2 tiles | system-settings | radius ≈ 3 pt (soft, low confidence) |
| Sidebar search field (System Settings) | 28.5 pt tall capsule | — | 1 | system-settings | |

### 3.3 Content, lists and forms

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Content padding (sidebar edge or window edge to grouped content) | **20 pt** | 19.6–20 | 3 | system-settings (both sides), reminders sheet (20 pt) | |
| Finder list row (striped) | **20 pt** pitch | 20–20.5 | 1 image, 25 rows | finder-list-preview | selected row 20 pt tall, radius 8 pt, inset 10.5–11 pt, solid blue |
| Mail message list row (4 lines) | **79 pt** | 78.7–81 | 2 | mail marketing (78.7), mail-inbox user guide (≈ 81, soft) | selected row radius 9.2 pt, inset 12.5 pt |
| Notes list row (3 lines + folder) | ≈ 67 pt | — | 1 | notes-three-column | |
| System Settings grouped box radius | **12 pt** | 12.2 | 1 image (3 boxes) | system-settings | |
| Settings row height, label + trailing control | **37 pt** | 36–37.6 | 2 boxes, 4 rows | system-settings | 43 pt with a 20 pt app icon |
| Gap between grouped boxes | 10 pt | — | 1 | system-settings | |
| Settings row padding / separator inset | **10 pt** both sides; separator 1 device px (#ebebeb on #f7f7f7) | — | 1 image, 8 rows | system-settings | text and controls align to the same 10 pt inset |
| Settings label / control alignment | label leading, control trailing, both at the 10 pt inset | — | 1 | system-settings | |
| Classic form (sheets, dialogs) | right-aligned labels with a colon; **8–10 pt** from label to control | 8–10 | 2 | reminders-smart-list-sheet, save-dialog | |
| Push button height | **24 pt** | 23.4–24.0 | 4 | system-settings (2), reminders sheet (Cancel, OK) | |
| Push button radius | ≈ 6–7 pt (rounded rect, ≈ 0.27 × height) | 5.7–7.5 | 3 | reminders sheet, system-settings | not a capsule |
| Gap between Cancel and OK | 12.5 pt | — | 1 | reminders sheet | |
| Segmented control | 24 pt tall, radius ≈ 6 pt | — | 1 | reminders sheet | |
| Text field | 24 pt (+ 3 pt focus ring outside) | — | 1 | reminders sheet | |
| Pop-up button (small, in rule rows) | 20 pt, radius 5 pt | — | 1 | reminders sheet | 22 pt for the main "List Type" pop-up |
| Switch (System Settings) | 36 × 16 pt | 35.5–36 × 16–16.5 | 2 | system-settings | small size; iOS is 63 × 28 |
| Inspector width (iWork) | ≈ 18 % of window width; 235–275 pt depending on scale | — | 3 | pages, keynote, numbers | scale unresolved (§1), low confidence |

### 3.4 Popover, menu, sheet

| Value | Median | Range | n | Source images | Notes |
|---|---|---|---|---|---|
| Popover corner radius | **20 pt** | — | 1 | calendar-event-popover-glass | from the diagonal against a dark wallpaper |
| Popover width (Calendar event) | 303 pt | — | 1 | same | |
| Cards inside the popover | radius 12.6 pt, inset 10 pt from popover edge, 36 pt tall single-field cards | — | 1 image, 5 cards | same | |
| Menu corner radius | **12 pt** | 11.7–12.1 | 1 image, 2 corners | menu-icon-grouping (26, @2x) | 1 pt white rim |
| Menu row height | **24 pt** | — | 1 image, 6 rows | same | |
| Menu side padding / separator inset | 16.5 pt | — | 1 | same | separator 1 pt #e0e0e0, 17.5 pt from neighbouring row centres |
| Sheet corner radius (macOS) | **25 pt** | 25.3 | 1 | reminders-smart-list-sheet | sheet padding 20 pt |

### 3.5 macOS text

| Role | Measured | n | Notes |
|---|---|---|---|
| Body, sidebar and list labels | 13 pt (calibration value) | all | |
| Toolbar / window title | 15 pt bold | 2 | |
| Secondary, section headers, explanatory text | 11 pt | 5 | |
| Popover event title | 17 pt | 1 | |
| Calendar day header ("April 1, 2026") | ≈ 33 pt bold | 1 | larger than the HIG macOS Large Title (26) |
| Notes note title | ≈ 20 pt bold | 1 | soft image |

---

## 4. Colour samples (hex, sRGB as stored in the PNG)

Renders are not colour-managed proofs; treat ±2 per channel as noise. "Wallpaper-tinted" means a translucent surface picks up the desktop picture.

### 4.1 iOS / iPadOS

| Layer | Light | Dark | Source images |
|---|---|---|---|
| Grouped page background | #f2f2f7 (HIG renders), #f2f2f6 (App Store renders) | #000000 behind sheets; sheet/grouped #1c1c1e | calendar-newevent-light/dark, notes-list, reminders-newsheet |
| Sheet background | #f2f2f7 | #1c1c1e | calendar-newevent |
| Grouped card | #ffffff | #2c2c2e | notes-list, reminders-newsheet, calendar-newevent |
| Separator inside a card | #e3e3e4–#e7e7e8 (@3x), #f3f3f4 (1.33x) | #363638 on #2c2c2e | notes-list, reminders-newsheet, calendar-newevent |
| Value capsule / chip in a row | #eeeeef | #3e3e41 | reminders-newsheet, calendar-newevent |
| Segmented track / selected segment | #e3e3e8 / #ffffff | #313136 / #6c6c71 | calendar-newevent |
| Toggle on / off track | #35c759 / #e4e4e4 | — / #3b3b3d | reminders-newsheet, calendar-newevent-light/dark |
| Primary text | #000000 | #ffffff | notes-list, calendar-newevent |
| Secondary text on white | #8a8a8e (≈ 60 % of #3c3c43 over white) | #9f9fa5 on #2c2c2e | notes-list, calendar-newevent |
| Secondary text on grouped background | #85858a | — | reminders-newsheet (section header, footer) |
| Placeholder text | #c5c5c7 | — | reminders-newsheet |
| Link / value tint (blue) | #0088fe | — | reminders-newsheet |
| iPad sidebar | #ecebe5, #e5e9ed (wallpaper-tinted); Music: #f1f2f3 | Music: #25272a | ipados-notes, ipados-reminders, ipados-music-sidebar |
| iPad sidebar selection | #d8d6d0 grey capsule (Notes); #ffffff capsule (Music) | #36393c (Music) | same |

### 4.2 macOS

| Layer | Light | Dark | Source images |
|---|---|---|---|
| Content background | #ffffff | #1e1e1e (Notes, window-states); #212320 (save dialog, wallpaper-tinted) | window-states, notes-toolbar-more-menu, save-dialog |
| Sidebar | #ededed (Settings), #eceded (Finder), #e3e3e2 (save dialog), #f7f7f7 (inactive window) | #292929 (save dialog), #2b2a28 (inactive, tinted), #252525 (diagram) | system-settings, finder-list, save-dialog, window-states, finder-window-anatomy |
| Grouped box on content (Settings) | #f7f7f7 on #ffffff | — | system-settings |
| Sidebar selection, window focused | accent fill #2f6eed (Settings) | — | system-settings |
| Sidebar selection, neutral | #e2e2e2 on #eceded (Finder); #e1e9f1 tinted (save dialog) | #2b3239 (save dialog) | finder-list, save-dialog |
| List selection | accent #2a62d9 / #2962d9 (Finder, save dialog); neutral #dddddd (Mail) | #2558ca | finder-list, save-dialog, mail marketing |
| Separators / column dividers | #ebebeb (1 device px) | #333531 | system-settings, save-dialog |
| Push button fill | #e4e4e4–#ededed | #31332f | system-settings, save-dialog |
| Default (accent) button | #3478f6 (save dialog), #007aff (Reminders sheet) | #3478f6 | save-dialog, reminders sheet |
| Secondary label | #808080 ("Save As:"); #999999–#9a9a9a (dates) | #808080; #7d7c7d | save-dialog, window-states |
| Sidebar section header | #7c7c79–#808080 | #908f8d | window-states, save-dialog |
| Placeholder | #bfbfbf | #595a57 | save-dialog |
| Sheet surface / window dim behind a sheet | #ffffff / #cccccc | #212224 / #101010 | notes-whats-new-sheet |
| Toolbar glass capsule over white | #f4f4f4–#fbfbfb | #1a1a1a over black | finder-window-anatomy |
| Menu panel over white | #f3f3f4 with 1 pt white rim | — | menu-icon-grouping |

---

## 5. Concentricity check (WWDC25 rule: inner radius = outer radius − inset)

| Nested pair | Outer r | Inset | Predicted inner | Measured inner | Verdict | Source |
|---|---|---|---|---|---|---|
| macOS window → Send button in the toolbar corner | 25.3 | 7.3–7.5 | 17.9 | 18.0 (36 pt circle) | **holds exactly** | mail-compose |
| macOS toolbar capsule → selected view segment | 18.3 | 4 | 14.3 | 14.3 (28.6 pt pill) | holds | finder-list |
| macOS window → floating sidebar | 26.6 | 8.2 | 18.4 | 16.8 | holds within 1.6 pt | reminders sheet |
| iOS tab bar capsule → selected tab pill | 30.7 | ≈ 4 | 26.7 | ≈ 26.5 | holds | music-library |
| iOS segmented track → selected segment | 16.5 | 3.4 | 13.1 | 13.1 | holds | calendar-newevent |
| iOS toggle track → knob | 14 | ≈ 2.7 | 11.3 | ≈ 11–12 | holds | reminders-newsheet |
| iOS grouped card → inline chip | 26 | 10 (side) | 16 | 17 (capsule) | holds within 1 pt | reminders-newsheet |
| iOS display corner → floating sheet | ≈ 62 (display, not measured) | 8 | ≈ 54 | ≈ 55 | consistent | notes-formatsheet |
| macOS popover → field card | 20 | 10 | 10 | 12.6 | **inner is larger** | calendar popover |
| macOS field card → pop-up button | 12.6 | 10 | 2.6 | 6.3 | **inner is much larger** | calendar popover |

**Verdict:** the rule holds where shapes sit close to their container (capsules in capsules, a button in a window corner, a sheet in the display) — usually to within 1 pt. It does **not** hold for deep nesting with a large inset: Apple keeps small controls at their own minimum radius (≈ 6 pt on macOS) rather than shrinking them towards zero. Practical form: `inner = max(outer − inset, own minimum)`, and capsules stay capsules.

---

## 6. Patterns (consistent across images)

- **8 pt** recurs as the "tight" gap: iOS tile grid gaps, stacked form cards in a sheet, floating sheet inset from the display, macOS floating sidebar inset from the window, toolbar items from the window top (7–8.5).
- **Margins are 16 or 20 pt** and depend on available width: 16 pt on 393–402 pt phones, 20 pt on the 430 pt phone and in iPad detail panes and macOS content areas. Separators end at the same margin.
- **44 pt** is the iPhone/iPad glass button and the iPad sidebar row; **36 pt** is the macOS toolbar item; **24 pt** is the regular macOS control (button, segmented, text field) and the macOS menu row; **32 pt** is the macOS sidebar row. Roughly: macOS control ≈ 0.55 × iOS control.
- **iOS grouped cards: radius 26 pt**, white on #f2f2f7 (light) / #2c2c2e on #1c1c1e (dark). A one-row card keeps radius 26 and therefore looks almost like a capsule.
- **iOS rows: 52 pt** one line, **59–60 pt** title + subtitle; text, not icons, defines where separators start.
- **Selection on macOS sidebars is a rounded rect** (8 pt radius, 10 pt inset, full row height); on iPad it is a **capsule** (44 pt, 16 pt inset). Lists use a rounded selection inset from the column edge (macOS 8–9 pt radius, iPad 20 pt).
- **Sheets**: iOS top corners ≈ 38 pt; macOS sheet ≈ 25 pt; macOS popover 20 pt; macOS menu 12 pt; macOS grouped box 12 pt; macOS push button ≈ 6–7 pt. Radius shrinks as the surface gets smaller and denser.
- **Hairlines**: every separator is the thinnest line the display can draw, in a very light grey (on white ≈ #e5e5e7 at 1 pt, or #c6c6c8 at 1 device px).
- **Text**: body 17 (iOS) / 13 (macOS); secondary 13 (iOS) / 11 (macOS); titles 34 bold (iOS large), 17 semibold (iOS inline), 15 bold (macOS toolbar title). These match the HIG text-style tables in `hig-digest/typography.md`.

## 7. Varies (do not hard-code a single Apple value)

- **macOS window radius**: ≈ 17 pt on windows whose sidebar is attached to the window edge (Finder, Notes, System Settings, Mail in the macOS 27 guides), ≈ 25–27 pt on windows with a floating sidebar (Reminders, macOS 27) and on the macOS 26 HIG images (Mail compose, Notes). Could be a style difference or a version difference; the set cannot separate the two.
- **Sidebar width** (macOS 162–287 pt, iPad 280–320 pt): content-driven.
- **Row heights in lists** follow content: 20 pt (Finder) to 79 pt (Mail, four lines) on macOS; 52–72 pt on iOS depending on lines and icon size.
- **Section spacing on iOS**: 35 pt between header-less Settings groups; 56–60 pt card-to-card when a header sits between; 8 pt between stacked field cards.
- **Section header style on iOS**: Notes uses 20 pt bold primary; Reminders 17 pt semibold grey; iPad Reminders 15 pt semibold grey.
- **Sidebar tint**: iPad and macOS sidebars are translucent and pick up the wallpaper (#ecebe5 warm, #e5e9ed cool, #ededed neutral).
- **Large-title top offset** depends on whether a button row sits above it (baseline 148 vs 156 pt).

---

## 8. Candidate web tokens (all INFERRED; 1 pt → 1 CSS px as in the HIG digest)

These are starting points for the foundations boards, not decisions.

```css
:root {
  /* spacing */
  --space-tight: 8px;          /* tile gaps, floating-panel inset, stacked fields */
  --space-row-x-dense: 10px;   /* macOS-style row padding / separator inset */
  --space-margin-compact: 16px;/* < ~400px wide */
  --space-margin: 20px;        /* phones ≥ 430px, panes, desktop content */
  --space-section: 35px;       /* gap between header-less groups (iOS Settings) */
  --space-header-to-group: 14px;

  /* radii */
  --radius-group: 26px;        /* iOS inset-grouped card */
  --radius-group-dense: 12px;  /* macOS grouped box, menu */
  --radius-sheet-top: 38px;    /* iOS sheet */
  --radius-sheet-dense: 25px;  /* macOS sheet */
  --radius-popover: 20px;
  --radius-tile: 16px;         /* iOS tile cards */
  --radius-selection: 8px;     /* macOS sidebar/list selection */
  --radius-selection-touch: 20px; /* iPad list selection */
  --radius-control: 6px;       /* macOS push button, segmented, pop-up */
  --radius-icon-tile: 25%;     /* settings icon tiles */
  --radius-capsule: 9999px;

  /* sizes */
  --row-touch: 52px;           /* one-line row, touch */
  --row-touch-2line: 60px;
  --row-pointer: 32px;         /* sidebar row, pointer density */
  --row-pointer-list: 20px;    /* dense table row */
  --row-pointer-form: 37px;    /* settings row with trailing control */
  --control-touch: 44px;       /* circle buttons */
  --control-touch-bar: 48px;   /* bottom search field, compose */
  --control-pointer: 24px;     /* push button, segmented, text field */
  --control-pointer-toolbar: 36px;
  --toolbar-pointer: 52px;
  --tabbar-touch: 62px;
  --switch-touch: 63px 28px;
  --icon-tile-touch: 29px;
  --icon-tile-pointer: 20px;

  /* light colours */
  --bg-grouped: #f2f2f7;
  --bg-surface: #ffffff;
  --bg-sidebar: #ededed;
  --bg-group-on-white: #f7f7f7;
  --bg-fill-control: #e9e9eb;          /* between #e4e4e4 and #eeeeef */
  --bg-selection-neutral: #e2e2e2;     /* on #ededed sidebar */
  --separator: #e5e5e7;                /* 1px on white (measured #e3e3e4–#e7e7e8) */
  --text-secondary: #8a8a8e;
  --text-tertiary: #c5c5c7;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-grouped: #1c1c1e;
    --bg-base: #000000;
    --bg-surface: #2c2c2e;               /* card on grouped */
    --bg-content-dense: #1e1e1e;         /* macOS window content */
    --bg-sidebar: #292929;
    --bg-fill-control: #3e3e41;
    --separator: #363638;                /* measured on #2c2c2e */
    --text-secondary: #9f9fa5;
  }
}
```

Notes on the tokens: the separator token rounds the measured rendered greys (#e3e3e4–#e7e7e8) to one value; Apple's own semantic colours (in `hig-digest/color.md`) should win where they exist. Wallpaper-tinted sidebar colours are deliberately replaced with a neutral grey. A web page has no window chrome, so window radius, traffic lights and toolbar height only matter if AISloop decides to style app-like panels.

---

## 9. Could not measure

- **Sheet grabber** (iOS): no image shows one.
- **iPhone tab bar at high resolution**: only the 1.13× User Guide image shows a tab bar; its values are ±1 pt.
- **Absolute macOS scale**: no image carries an Apple-stated macOS length that could anchor the scale independently (the 24 pt menu bar appears only on notched-MacBook marketing shots, where the bar is taller). All macOS lengths rest on the 13 pt body-text assumption (§1).
- **macOS inspector width**: the three iWork images disagree on scale; only the ≈ 18 % proportion is solid.
- **macOS popover arrow**: Liquid Glass popovers in the set have no arrow.
- **Separator thickness in device pixels**: all renders are resampled, so the true 1 px hairline cannot be seen directly; only its rendered weight.
- **Dark-mode iOS grouped page with cards side by side at @3x**: dark samples come from 1.33× HIG images only.
- **Icon tile radius on macOS**: tiles are 32 px soft renders; the 3 pt reading is unreliable.
- **Motion, blur radius and glass refraction**: not measurable from still images.
