# Typography

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Typography | https://developer.apple.com/design/human-interface-guidelines/typography (JSON: `.../tutorials/data/design/human-interface-guidelines/typography.json`) | 2026-11-19 |
| Accessibility (text sizes) | https://developer.apple.com/design/human-interface-guidelines/accessibility | 2026-11-19 |
| Labels (label colours) | https://developer.apple.com/design/human-interface-guidelines/labels | 2026-11-19 |

Page change log: last change 2025-12-16 ("emphasized weights" column added to every text-style table). Earlier: 2025-03-07 expanded Dynamic Type guidance.

## 2. Key principles (paraphrased)

- **Legibility first.** Each platform has a recommended default and a minimum text size; follow them for system and custom fonts alike. Thin custom fonts need to be set larger than the minimums.
- **Avoid light weights.** With the system font, stick to Regular, Medium, Semibold and Bold; Ultralight, Thin and Light are hard to read, especially at small sizes.
- **Hierarchy through weight, size and colour,** and keep that hierarchy intact when the user changes text size.
- **Few typefaces.** Mixing many families blurs hierarchy and makes an interface look inconsistent.
- **Use the built-in text styles.** A text style bundles weight, size and leading per text-size setting. Together they form the hierarchy, and they scale with Dynamic Type. Emphasis is made by a "bold" trait (emphasized weight), not by inventing new sizes.
- **Leading is a tool.** Looser leading helps long passages and wide columns; tighter leading helps fit text into height-limited rows. Do not use tight leading for three or more lines.
- **Text-size changes are a layout problem, not just a font problem.** At large sizes: wrap instead of truncate, stack items that were side by side, reduce column count, keep the most important content at the top, and grow meaningful icons along with the text. Not everything must grow (e.g. tab titles).
- **System fonts are not to be embedded**; request them from the system (the developer note says to use the system font design constants rather than bundling the fonts).
- **Tracking varies with size.** The system font adjusts letter-spacing at every point size automatically; mock-ups may need the tracking table applied manually.
- **macOS has no Dynamic Type.** Instead, macOS offers "dynamic system font variants" (control content, label, menu, menu bar, message, palette, title bar, tooltip, user document, monospaced user document, bold system, system) so custom text can match standard controls.

## 3. Concrete values

### 3.1 Default and minimum text size (VERIFIED, Typography and Accessibility pages)

| Platform | Default size | Minimum size |
|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt |
| macOS | 13 pt | 10 pt |
| tvOS | 29 pt | 23 pt |
| visionOS | 17 pt | 12 pt |
| watchOS | 16 pt | 12 pt |

Accessibility page adds: let people enlarge text by **at least 200%** (140% on watchOS).

### 3.2 iOS / iPadOS text styles at the default size "Large" (VERIFIED)

Footnote on the page: point sizes assume 144 ppi for @2x and 216 ppi for @3x designs.

| Style | Weight | Size (pt) | Leading (pt) | Leading ratio (computed) | Emphasized weight |
|---|---|---|---|---|---|
| Large Title | Regular | 34 | 41 | 1.206 | Bold |
| Title 1 | Regular | 28 | 34 | 1.214 | Bold |
| Title 2 | Regular | 22 | 28 | 1.273 | Bold |
| Title 3 | Regular | 20 | 25 | 1.250 | Semibold |
| Headline | Semibold | 17 | 22 | 1.294 | Semibold |
| Body | Regular | 17 | 22 | 1.294 | Semibold |
| Callout | Regular | 16 | 21 | 1.313 | Semibold |
| Subhead | Regular | 15 | 20 | 1.333 | Semibold |
| Footnote | Regular | 13 | 18 | 1.385 | Semibold |
| Caption 1 | Regular | 12 | 16 | 1.333 | Semibold |
| Caption 2 | Regular | 11 | 13 | 1.182 | Semibold |

Note: titles are **Regular** weight by default; "bold large titles" in Apple apps come from the emphasized (Bold) variant, not from the base style.

### 3.3 iOS / iPadOS: all Dynamic Type sizes, size / leading in pt (VERIFIED)

Weights are the same at every size (all Regular except Headline = Semibold; emphasized weights as in 3.2).

| Style | xSmall | Small | Medium | **Large (default)** | xLarge | xxLarge | xxxLarge |
|---|---|---|---|---|---|---|---|
| Large Title | 31/38 | 32/39 | 33/40 | **34/41** | 36/43 | 38/46 | 40/48 |
| Title 1 | 25/31 | 26/32 | 27/33 | **28/34** | 30/37 | 32/39 | 34/41 |
| Title 2 | 19/24 | 20/25 | 21/26 | **22/28** | 24/30 | 26/32 | 28/34 |
| Title 3 | 17/22 | 18/23 | 19/24 | **20/25** | 22/28 | 24/30 | 26/32 |
| Headline | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 |
| Body | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 |
| Callout | 13/18 | 14/19 | 15/20 | **16/21** | 18/23 | 20/25 | 22/28 |
| Subhead | 12/16 | 13/18 | 14/19 | **15/20** | 17/22 | 19/24 | 21/28 |
| Footnote | 12/16 | 12/16 | 12/16 | **13/18** | 15/20 | 17/22 | 19/24 |
| Caption 1 | 11/13 | 11/13 | 11/13 | **12/16** | 14/19 | 16/21 | 18/23 |
| Caption 2 | 11/13 | 11/13 | 11/13 | **11/13** | 13/18 | 15/20 | 17/22 |

Larger accessibility sizes (size/leading, pt):

| Style | AX1 | AX2 | AX3 | AX4 | AX5 |
|---|---|---|---|---|---|
| Large Title | 44/52 | 48/57 | 52/61 | 56/66 | 60/70 |
| Title 1 | 38/46 | 43/51 | 48/57 | 53/62 | 58/68 |
| Title 2 | 34/41 | 39/47 | 44/52 | 50/59 | 56/66 |
| Title 3 | 31/38 | 37/44 | 43/51 | 49/58 | 55/65 |
| Headline | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Body | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Callout | 26/32 | 32/39 | 38/46 | 44/52 | 51/60 |
| Subhead | 25/31 | 30/37 | 36/43 | 42/50 | 49/58 |
| Footnote | 23/29 | 27/33 | 33/40 | 38/46 | 44/52 |
| Caption 1 | 22/28 | 26/32 | 32/39 | 37/44 | 43/51 |
| Caption 2 | 20/25 | 24/30 | 29/35 | 34/41 | 40/48 |

Observation (computed): from Large to AX5, Body grows 17 → 53 pt (×3.1) while Large Title grows 34 → 60 pt (×1.8). Small text grows faster than large text, so the scale compresses at big sizes.

### 3.4 macOS built-in text styles (VERIFIED; macOS has no Dynamic Type)

Footnote on the page: point sizes assume 144 ppi for @2x designs.

| Style | Weight | Size (pt) | Line height (pt) | Ratio (computed) | Emphasized weight |
|---|---|---|---|---|---|
| Large Title | Regular | 26 | 32 | 1.231 | Bold |
| Title 1 | Regular | 22 | 26 | 1.182 | Bold |
| Title 2 | Regular | 17 | 22 | 1.294 | Bold |
| Title 3 | Regular | 15 | 20 | 1.333 | Semibold |
| Headline | **Bold** | 13 | 16 | 1.231 | Heavy |
| Body | Regular | 13 | 16 | 1.231 | Semibold |
| Callout | Regular | 12 | 15 | 1.250 | Semibold |
| Subheadline | Regular | 11 | 14 | 1.273 | Semibold |
| Footnote | Regular | 10 | 13 | 1.300 | Semibold |
| Caption 1 | Regular | 10 | 13 | 1.300 | Medium |
| Caption 2 | **Medium** | 10 | 13 | 1.300 | Semibold |

Differences worth noticing: macOS Headline is Bold (iOS: Semibold); macOS Caption 2 is Medium; macOS Body is 13 vs iOS 17 (4 pt smaller, ~24%).

### 3.5 Tracking (letter-spacing), SF Pro, iOS / iPadOS / visionOS and macOS (VERIFIED; the macOS table is identical except for tiny rounding differences at 52–53 pt)

Selected rows (full table on the page goes 6–96 pt):

| Size (pt) | Tracking (1/1000 em) | Tracking (pt) | As CSS `letter-spacing` (computed) |
|---|---|---|---|
| 10 | +12 | +0.12 | 0.012em |
| 11 | +6 | +0.06 | 0.006em |
| 12 | 0 | 0 | 0 |
| 13 | −6 | −0.08 | −0.006em |
| 15 | −16 | −0.23 | −0.016em |
| 16 | −20 | −0.31 | −0.020em |
| 17 | −26 | −0.43 | −0.026em |
| 20 | −23 | −0.45 | −0.023em |
| 22 | −12 | −0.26 | −0.012em |
| 24 | +3 | +0.07 | 0.003em |
| 26 | +8 | +0.22 | 0.008em |
| 28 | +14 | +0.38 | 0.014em |
| 34 | +12 | +0.40 | 0.012em |
| 40 | +10 | +0.37 | 0.010em |
| 60 | +4 | +0.26 | 0.004em |
| 80+ | 0 | 0 | 0 |

The page also gives full tables for SF Pro Rounded, New York, SF Compact and SF Compact Rounded. The page notes not every app expresses tracking in 1/1000 em.

### 3.6 Values the page does NOT give

- No paragraph spacing, no maximum line length / measure, no heading margins.
- No font-weight numbers (100–900); only names.
- No type scale for iPadOS separate from iOS (they share the table).

## 4. Do / Don't (as Apple states it, paraphrased)

**Do**
- Follow the per-platform default and minimum sizes.
- Prefer Regular, Medium, Semibold, Bold.
- Use the built-in text styles; use the emphasized (bold) trait for an extra level.
- Keep the visual hierarchy the same at every text size; keep primary elements near the top.
- Let labels wrap to as many lines as needed at large sizes; switch side-by-side layouts to stacked layouts; reduce columns.
- Grow important interface icons with the text.
- Match symbol weight to adjacent text weight.

**Don't**
- Don't use Ultralight, Thin or Light weights for UI text.
- Don't mix many typefaces.
- Don't truncate text in scrollable areas unless people can open the full text elsewhere.
- Don't use tight leading for three or more lines.
- Don't embed the system fonts.
- Don't scale every element when text grows (e.g. tab titles don't need to).

## 5. Web translation

Unit assumption (INFERRED): **1 Apple pt = 1 CSS px** at 100% zoom. Basis: Apple's pt is a logical unit (the spec table assumes 144 ppi at @2x, i.e. 2 device pixels per pt), and Safari's CSS px on iPhone/iPad/Mac also maps to one logical point (devicePixelRatio 2 or 3). Verify on device.

| # | Web rule | Status |
|---|---|---|
| T1 | Font stack: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif` (+ emoji fonts). Never `@font-face` SF Pro / SF Mono / New York. Apple devices render SF because it is the OS font. | Not embedding: VERIFIED (HIG + font licence, see `research/01-taste-calibration/sources.md` §4.1). Stack: INFERRED |
| T2 | Monospace: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`; serif (NY-like): `ui-serif, "New York", Georgia, serif`. Naming a locally installed font in a stack is not distribution, but don't rely on it. | INFERRED |
| T3 | Two type scales as tokens: **iOS scale** (body 17px/22px) and **macOS scale** (body 13px/16px) from tables 3.2 and 3.4. AISloop must pick one as default (see open questions). | Values VERIFIED; choice INFERRED |
| T4 | Express sizes in `rem` so browser text-size settings work (17px = 1.0625rem, 13px = 0.8125rem at a 16px root). Express line-height as px-equivalent rem or as the computed unitless ratios above. | INFERRED |
| T5 | Weight mapping: Regular 400, Medium 500, Semibold 600, Bold 700, Heavy 800. | INFERRED (standard OpenType convention; Apple gives names only) |
| T6 | Minimum text size: 11px if following iOS, 10px if following macOS. Recommend never below 11px on the web. | Numbers VERIFIED; web floor INFERRED |
| T7 | Tracking: `letter-spacing` = (1/1000 em value)/1000 em, e.g. body 17px → −0.026em; 34px title → +0.012em. **Only correct for SF.** Applied to Segoe UI or Roboto it may look wrong. Also unknown whether Safari already applies SF's built-in tracking for `system-ui` (if so, adding it again doubles it). Must be tested before becoming a rule. | Values VERIFIED; web behaviour UNKNOWN |
| T8 | Dynamic Type has no general web equivalent. On iOS Safari, `font: -apple-system-body` (and `-apple-system-headline`, etc.) follows the user's text-size setting. Elsewhere, rem + browser zoom is the substitute. WCAG 1.4.4 (resize text to 200%) matches Apple's "at least 200%". | `-apple-system-*`: VERIFIED (WebKit 2015, see sources.md §4.2). 200% match: VERIFIED both sides |
| T9 | At large text sizes / narrow widths: wrap, stack and reduce columns via container or media queries. Avoid `text-overflow: ellipsis` in scroll areas unless the full text is reachable. | Guidance VERIFIED; CSS mapping INFERRED |
| T10 | Optical sizes: SF on Apple devices switches Text/Display designs automatically by size (`font-optical-sizing: auto` is the CSS default). Nothing to do. | Apple behaviour VERIFIED; CSS mapping INFERRED |
| T11 | macOS "dynamic system font variants" (menu, tooltip, title bar fonts) have no web keyword. Map them to fixed tokens (e.g. menu = body 13px, tooltip ≈ 11px). Tooltip size is not given by the HIG. | INFERRED |

## 6. Open questions for the owner

1. **Default scale: iOS (17px body) or macOS (13px body)?** Or a middle web scale (e.g. 15–16px body) that keeps Apple's ratios? 13px reads small for general web audiences; 17px makes dense tools feel airy.
2. Should titles default to Apple's **Regular** base weight, or to the **Bold emphasized** variant that Apple's own apps use for large titles?
3. Apply SF tracking values on the web at all? Only on Apple devices? (Needs a test page in Safari and Chrome on Mac.)
4. Keep New York (serif) as an allowed secondary voice for reading content, or sans only?
5. Support the `-apple-system-body` iOS keyword for real Dynamic Type on iPhone, or keep one rem-based scale everywhere?
