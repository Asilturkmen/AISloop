# Color

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Color | https://developer.apple.com/design/human-interface-guidelines/color (JSON `.../color.json`; RGB values are in the swatch images' alt text) | 2026-11-19 |
| Labels | https://developer.apple.com/design/human-interface-guidelines/labels | 2026-11-19 |
| Sidebars (accent on icons) | https://developer.apple.com/design/human-interface-guidelines/sidebars | 2026-11-19 |
| Buttons, Toolbars, Tab bars (Liquid Glass colour rules repeated) | `.../buttons`, `.../toolbars`, `.../tab-bars` | 2026-11-19 |

Change log: 2025-12-16 Liquid Glass guidance updated; **2025-06-09 system colour values updated** (the "unified" palette that ships with Liquid Glass); 2022-12-19 mint dark corrected.

## 2. Key principles (paraphrased)

- **One meaning per colour.** If a colour signals "interactive" (e.g. the brand colour on a borderless button), don't also use it for static text.
- **Every colour needs four variants:** light, dark, light + increased contrast, dark + increased contrast. Even single-appearance apps should define light and dark so Liquid Glass can adapt.
- **Never rely on colour alone** for state, interactivity or essential information; back it with text or shape. Remember cultural meanings (red = danger in some cultures, positive in others).
- **Don't hard-code system colour values.** The published numbers are references for design; real values change between releases and environments. Use the API (on the web: our own tokens).
- **Semantic, not literal.** Dynamic system colours are named by purpose (background level, label level, separator, link). Don't repurpose them (e.g. separator colour as text, secondary label colour as a background).
- **Colour on Liquid Glass is rare and deliberate.** Glass has no colour of its own; it picks up what's behind it. Tint is reserved for emphasis: status or the primary action. To emphasise a primary action, tint the **background** of the control, not its symbol or label. Don't tint the backgrounds of several controls. The system itself does this for prominent buttons such as Done.
- **Colourful content → monochrome chrome.** If the content layer is colourful, keep toolbars and tab bars monochromatic, or choose an accent that clearly differs. In apps whose content is mostly monochrome, using the brand colour as the accent is a good way to show identity.
- **Mind what scrolls under controls.** The resting state (top of the screen) must be clearly legible even if colourful content sometimes passes beneath bars.
- **Background hierarchy (iOS):** two sets, *system* and *grouped*, each with primary / secondary / tertiary. Primary = whole view, secondary = groups inside it, tertiary = groups inside groups. Use the grouped set for grouped tables, the system set otherwise.
- **macOS accent:** since macOS 11 an app can set an accent colour for buttons, selection highlights and sidebar icons, but it applies only while the user's system accent setting is "multicolor". Any other user choice overrides the app accent everywhere, except sidebar icons given a fixed meaningful colour.
- **Wide colour:** P3 is allowed and encouraged for richer colour; sRGB is the safe baseline; very close P3 colours can become indistinguishable on sRGB screens, and P3 gradients can clip.
- Prefer the system colour picker if the app lets people pick colours.

Short quote where wording matters: "Apply color sparingly to the Liquid Glass material, and to symbols or text on the material."

## 3. Concrete values

### 3.1 System colours (VERIFIED: values from the HIG swatch alt text; hex and contrast COMPUTED by us)

These are the post-June-2025 values. Note **Blue is now 0,136,255 (#0088FF)** in light mode; the long-familiar #007AFF is no longer the documented value. The page states visionOS uses the dark values.

| Name | Default light | Default dark | Increased contrast light | Increased contrast dark |
|---|---|---|---|---|
| Red | 255,56,60 `#FF383C` | 255,66,69 `#FF4245` | 233,21,45 `#E9152D` | 255,97,101 `#FF6165` |
| Orange | 255,141,40 `#FF8D28` | 255,146,48 `#FF9230` | 197,83,0 `#C55300` | 255,160,86 `#FFA056` |
| Yellow | 255,204,0 `#FFCC00` | 255,214,0 `#FFD600` | 161,106,0 `#A16A00` | 254,223,67 `#FEDF43` |
| Green | 52,199,89 `#34C759` | 48,209,88 `#30D158` | 0,137,50 `#008932` | 74,217,104 `#4AD968` |
| Mint | 0,200,179 `#00C8B3` | 0,218,195 `#00DAC3` | 0,133,117 `#008575` | 84,223,203 `#54DFCB` |
| Teal | 0,195,208 `#00C3D0` | 0,210,224 `#00D2E0` | 0,129,152 `#008198` | 59,221,236 `#3BDDEC` |
| Cyan | 0,192,232 `#00C0E8` | 60,211,254 `#3CD3FE` | 0,126,174 `#007EAE` | 109,217,255 `#6DD9FF` |
| Blue | 0,136,255 `#0088FF` | 0,145,255 `#0091FF` | 30,110,244 `#1E6EF4` | 92,184,255 `#5CB8FF` |
| Indigo | 97,85,245 `#6155F5` | 109,124,255 `#6D7CFF` | 86,74,222 `#564ADE` | 167,170,255 `#A7AAFF` |
| Purple | 203,48,224 `#CB30E0` | 219,52,242 `#DB34F2` | 176,47,194 `#B02FC2` | 234,141,255 `#EA8DFF` |
| Pink | 255,45,85 `#FF2D55` | 255,55,95 `#FF375F` | 231,18,77 `#E7124D` | 255,138,196 `#FF8AC4` |
| Brown | 172,127,94 `#AC7F5E` | 183,138,102 `#B78A66` | 149,109,81 `#956D51` | 219,166,121 `#DBA679` |

### 3.2 WCAG contrast of those colours as text (COMPUTED by us with the WCAG 2 formula; not on the page)

| Name | Light on white | IC light on white | Dark on black | IC dark on black | Dark on `#1C1C1E` |
|---|---|---|---|---|---|
| Red | 3.57 | 4.56 | 6.12 | 7.15 | 4.96 |
| Orange | 2.31 | 4.55 | 9.41 | 10.41 | 7.62 |
| Yellow | 1.51 | 4.59 | 14.87 | 15.85 | 12.05 |
| Green | 2.22 | 4.54 | 10.39 | 11.42 | 8.42 |
| Mint | 2.12 | 4.55 | 11.82 | 12.79 | 9.57 |
| Teal | 2.16 | 4.57 | 11.30 | 12.74 | 9.15 |
| Cyan | 2.16 | 4.57 | 11.94 | 13.02 | 9.67 |
| Blue | 3.52 | 4.57 | 6.49 | 9.76 | 5.26 |
| Indigo | 5.09 | 6.12 | 5.98 | 9.84 | 4.84 |
| Purple | 4.17 | 5.21 | 5.79 | 9.75 | 4.69 |
| Pink | 3.65 | 4.57 | 5.96 | 9.68 | 4.83 |
| Brown | 3.53 | 4.58 | 6.84 | 9.74 | 5.54 |

Finding: the **default light colours are fills, not text colours**. Only Indigo reaches 4.5:1 on white. The **increased-contrast light variants land at ≈4.55–4.59:1**, i.e. they appear tuned to just pass WCAG AA for small text (our inference). In dark mode the default colours all pass 4.5:1 on black.

### 3.3 iOS / iPadOS system grays (VERIFIED values; hex computed)

| Name | Default light | Default dark | IC light | IC dark |
|---|---|---|---|---|
| Gray | 142,142,147 `#8E8E93` | 142,142,147 `#8E8E93` | 108,108,112 `#6C6C70` | 174,174,178 `#AEAEB2` |
| Gray 2 | 174,174,178 `#AEAEB2` | 99,99,102 `#636366` | 142,142,147 `#8E8E93` | 124,124,128 `#7C7C80` |
| Gray 3 | 199,199,204 `#C7C7CC` | 72,72,74 `#48484A` | 174,174,178 `#AEAEB2` | 84,84,86 `#545456` |
| Gray 4 | 209,209,214 `#D1D1D6` | 58,58,60 `#3A3A3C` | 188,188,192 `#BCBCC0` | 68,68,70 `#444446` |
| Gray 5 | 229,229,234 `#E5E5EA` | 44,44,46 `#2C2C2E` | 216,216,220 `#D8D8DC` | 54,54,56 `#363638` |
| Gray 6 | 242,242,247 `#F2F2F7` | 28,28,30 `#1C1C1E` | 235,235,240 `#EBEBF0` | 36,36,38 `#242426` |

The grays are slightly blue (B channel +4 to +5). SwiftUI's `gray` equals UIKit `systemGray`.

### 3.4 Semantic colours named by the HIG (VERIFIED names; values NOT given on the HIG)

iOS foreground: Label, Secondary label, Tertiary label, Quaternary label, Placeholder text, Separator (lets content show through), Opaque separator, Link.
iOS backgrounds: systemBackground / secondary / tertiary; systemGroupedBackground / secondary / tertiary.
Label usage (Labels page): Label = primary info; Secondary = subheading or supplemental text; Tertiary = text describing an unavailable item; Quaternary = watermark text.

macOS (selected from 35 named colours): alternating content backgrounds, control accent, control background, control, control text, disabled control text, find highlight, grid, header text, keyboard focus indicator, label / secondary / tertiary / quaternary label, link, placeholder text, selected content background, unemphasized selected content background (non-key window), selected text background, separator, shadow, text, text background, under-page background, window background, window frame text.

**Not given on the HIG:** RGBA values of any semantic colour (backgrounds, labels, separators, fills). They live in Apple's design kits and SDKs. Any numbers we use for them will be INFERRED and must say where they came from.

## 4. Do / Don't

**Do**
- Use colour consistently: one colour, one meaning.
- Supply light, dark and increased-contrast versions of every custom colour.
- Back colour with text, shape or icon.
- Test under bright and dim light and on different displays (True Tone, P3 vs sRGB).
- Put the accent on the background of the single prominent action (e.g. Done).
- Keep bars monochrome over colourful content; use the brand colour as accent when content is mostly neutral.
- Use the grouped background set for grouped lists; system set elsewhere.
- Provide P3 where useful, with sRGB fallbacks for subtle differences and gradients.

**Don't**
- Don't hard-code the reference values as if they were permanent.
- Don't redefine semantic colours (separator as text, secondary label as background).
- Don't tint several controls' backgrounds.
- Don't put similar colours in control labels and in the content behind them.
- Don't override the user's macOS accent choice (except a fixed-colour sidebar icon that carries meaning).

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| C1 | Define colours as CSS custom properties with semantic names (`--label`, `--label-secondary`, `--bg`, `--bg-grouped`, `--separator`, `--accent`…), never literal names in components. | Semantic naming VERIFIED (Apple's model); CSS form INFERRED |
| C2 | Light/dark via `@media (prefers-color-scheme: dark)` (or `light-dark()`), increased contrast via `@media (prefers-contrast: more)`. Four variants per colour = Apple's four columns. | Apple's four variants VERIFIED; media-query mapping INFERRED |
| C3 | System palette tokens from table 3.1 may be used as the AISloop palette, with the caveat that Apple says the values are references and change by release. | VERIFIED values; use INFERRED |
| C4 | **Accent text and links on white must not use the default light Blue (#0088FF, 3.52:1).** Use the increased-contrast blue (#1E6EF4, 4.57:1) or a darker custom accent for text; keep #0088FF for fills behind white text only if that pair passes (white on #0088FF = 3.52:1, so only for large/bold text, ≥3:1). | Contrast COMPUTED; rule INFERRED |
| C5 | Default switch-on green #34C759 behind a white knob is a non-text graphic: needs 3:1 against adjacent colours (WCAG 1.4.11). Against white it is 2.22:1, so the on/off difference must not depend on colour alone (the knob position does that). | INFERRED |
| C6 | Grays 1–6 are usable as a neutral ramp; Gray 6 light (#F2F2F7) is the colour most people recognise as the iOS grouped-list background, and #1C1C1E as a dark elevated surface, but the HIG does not state those background mappings. | Values VERIFIED; background mapping INFERRED |
| C7 | Wide colour: `color(display-p3 …)` inside `@supports` / `@media (color-gamut: p3)`, sRGB hex fallback first. | INFERRED |
| C8 | macOS accent override behaviour has no web equivalent; CSS `AccentColor` system colour exists but support and value vary by browser. Don't depend on it. | INFERRED |
| C9 | `accent-color: var(--accent)` styles native checkboxes, radios, range and progress in one place; matches Apple's "one accent" model. | INFERRED |

## 6. Open questions for the owner

1. **Accent:** Apple Blue (and which variant: #0088FF fill + #1E6EF4 text?), or a different single brand accent per project?
2. Adopt the 2025 "unified" values (#0088FF) or the older, more familiar iOS blue (#007AFF, not documented on the current page)?
3. Neutral surfaces: copy Apple's slightly blue grays exactly (B +5) or use pure neutral grays?
4. Do we ship increased-contrast variants (prefers-contrast) from day one?
5. Should fixed meaningful colours (like Mail's yellow VIP) be allowed for sidebar icons, or keep all chrome icons monochrome/accent?
