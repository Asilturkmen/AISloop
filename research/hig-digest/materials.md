# Materials and Liquid Glass

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Materials | https://developer.apple.com/design/human-interface-guidelines/materials (JSON `.../materials.json`) | 2026-11-19 |
| Color › Liquid Glass color | https://developer.apple.com/design/human-interface-guidelines/color#Liquid-Glass-color | 2026-11-19 |
| Scroll views › Scroll edge effects | https://developer.apple.com/design/human-interface-guidelines/scroll-views | 2026-11-19 |
| Layout, Toolbars, Sidebars, Tab bars, Pointing devices (glass placement) | same base URL | 2026-11-19 |

Change log: 2025-09-09 Liquid Glass guidance updated; 2025-06-09 Liquid Glass added.

## 2. Key principles (paraphrased)

**Two kinds of material**
- **Liquid Glass** is a dynamic material for the **functional layer**: controls and navigation (tab bars, toolbars, sidebars, floating buttons) that float above content. Content scrolls and shows through beneath it.
- **Standard materials** (blur, vibrancy, blending; thickness ultra-thin / thin / regular / thick) are for structure **inside the content layer**, beneath Liquid Glass.

**When to use Liquid Glass**
- Only in the controls/navigation layer. **Never in the content layer** (it confuses the hierarchy). The one exception: transient interactive parts of content controls, such as a slider thumb or toggle while being dragged, briefly take on glass to signal interaction.
- **Sparingly** on custom controls. System components get it automatically; custom glass should be limited to the most important functional elements, because glass is meant to direct attention to the content behind it.
- Two variants:
  - *Regular*: blurs and adjusts luminosity behind it; used by most system components; use it when the background could hurt legibility or the component holds a lot of text (alerts, sidebars, popovers).
  - *Clear*: highly translucent; only over visually rich media (photos, video). Add a **dark dimming layer of 35%** behind it if the content beneath is bright; skip the dimming if the content is dark or the media controls already dim.
- Colour on glass: none by default (it takes colour from behind). Tint only for emphasis (primary action, status), and tint the background, not the symbol. Small bars (toolbars, tab bars) flip between light and dark glass depending on what's underneath; their symbols stay monochrome. Larger glass (sidebars) becomes more opaque to stay legible.
- Glass responds to accessibility settings (Reduce Transparency, Increase Contrast) and to a user preference for the glass look.
- Corner radii of items inside bars are concentric with the bar's corners (Toolbars page).
- Don't add custom backgrounds or tints to toolbars; they interfere with the system effect. Use the scroll edge effect for separation.

**Standard materials**
- Pick by **meaning and intended use**, not by the colour it seems to produce (system settings can change its look).
- Put **vibrant** label/fill/separator colours on materials; non-vibrant greys (e.g. systemGray3) become hard to see.
- Thicker = more opaque = better contrast for text and fine detail. Thinner = more context from behind.
- iOS/iPadOS vibrancy levels: label (default, highest contrast), secondary, tertiary, quaternary; fills: fill, secondary, tertiary; one separator level. Avoid quaternary label on thin and ultra-thin materials (too little contrast).
- macOS: several purpose-specific materials (window background, sidebar, menu, popover, HUD… via NSVisualEffectView); two blending modes, *behind window* and *within window*. Vibrancy should be tested in context; inactive windows drop vibrancy.

Short quotes: "Don't use Liquid Glass in the content layer." / "Use Liquid Glass effects sparingly."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Dimming layer behind **clear** Liquid Glass over bright content | **35% opacity, dark** | iOS, iPadOS (and wherever clear glass is used) | VERIFIED |
| Standard material steps | ultra-thin, thin, regular (default), thick | iOS, iPadOS, tvOS, visionOS | VERIFIED |
| tvOS material recommendations | ultraThin: full-screen views needing light scheme; thin: overlays needing light scheme; regular: overlays; thick: overlays needing dark scheme | tvOS | VERIFIED |
| visionOS material use | thin: interactive elements and selection; regular: section separation (sidebar, grouped table); thick: dark element on top of regular | visionOS | VERIFIED |
| Vibrancy levels (iOS) | labels ×4, fills ×3, separator ×1 | iOS, iPadOS | VERIFIED |
| **Blur radius, saturation, tint opacity of any material** | **not given** | all | — |
| **Liquid Glass refraction / highlight parameters** | **not given** | all | — |

## 4. Do / Don't

**Do**
- Glass for bars, sidebars, floating controls; standard materials for structure in content.
- Regular glass by default; clear only over photos/video, with 35% dark dim if the media is bright.
- Choose materials by role; use vibrant colours on them.
- Use thicker materials when text sits on them.
- Let full-bleed content run under the glass layer.

**Don't**
- Don't use glass in the content layer (cards, list rows, app backgrounds).
- Don't put glass on many custom controls.
- Don't use quaternary labels on thin materials.
- Don't tint toolbar backgrounds or several glass controls.
- Don't choose a material for its apparent colour.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| M1 | **Glass only on chrome**: top bar, bottom tab bar, sidebar (when floating over content), floating action buttons, popovers/menus. Never on cards, rows, panels in the content area. | VERIFIED principle; scope list INFERRED |
| M2 | Approximation: `background: color-mix(in srgb, var(--bg) 70%, transparent); backdrop-filter: blur(20px) saturate(180%);` plus a hairline border. Every number here is INFERRED; Apple publishes none. Real Liquid Glass refraction has **no CSS equivalent** (SVG displacement filters only work in Chromium and are costly; see counter-example C7 in `sources.md`). | INFERRED |
| M3 | `@media (prefers-reduced-transparency: reduce)` → solid surfaces. Support is limited (Chromium yes, Safari/Firefox partial or no as of our knowledge); fall back to also honouring `prefers-contrast: more`. | Apple behaviour VERIFIED; CSS support INFERRED, check caniuse |
| M4 | `@supports not (backdrop-filter: blur(1px))` → opaque surface. Never let text sit on an unblurred translucent layer. | INFERRED |
| M5 | Clear-glass equivalent over media: transparent control + `rgba(0,0,0,.35)` scrim behind it when the media is bright. | 35% VERIFIED; CSS INFERRED |
| M6 | Standard materials → 4 tokens (`--material-ultrathin/thin/regular/thick`) differing in opacity, used for in-content overlays (image captions, map panels). Opacities INFERRED. | INFERRED |
| M7 | Scroll edge effect instead of a bar background: a gradient fade or blur strip under the bar that is present only while content is scrolled beneath it. | VERIFIED intent; implementation INFERRED |
| M8 | Vibrancy (colour pulled through from behind) has no direct CSS equivalent; closest is `mix-blend-mode` on text, which harms contrast predictability. Prefer solid semantic label colours on materials. | INFERRED |
| M9 | Performance: `backdrop-filter` on large or many elements is costly; another reason to use it sparingly. | INFERRED |

## 6. Open questions for the owner

1. Glass at all on the web, or flat opaque chrome with only a scroll-edge fade? (Owner's open question in `preferences.md`.)
2. If yes, where exactly: top bar only; top bar + tab bar; floating sidebar too?
3. Accept Chromium-only refraction effects as progressive enhancement, or forbid them as decoration?
4. Should AISloop ever use "clear" glass (over photos/maps), or only "regular"?
