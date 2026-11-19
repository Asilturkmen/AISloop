# Layout (incl. platform models, windows, scroll views)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Layout | https://developer.apple.com/design/human-interface-guidelines/layout (JSON `.../layout.json`) | 2026-11-19 |
| Designing for iOS / iPadOS / macOS | `.../designing-for-ios`, `.../designing-for-ipados`, `.../designing-for-macos` | 2026-11-19 |
| Windows | https://developer.apple.com/design/human-interface-guidelines/windows | 2026-11-19 |
| Scroll views | https://developer.apple.com/design/human-interface-guidelines/scroll-views | 2026-11-19 |
| Accessibility / Pointing devices (spacing between controls) | `.../accessibility`, `.../pointing-devices` | 2026-11-19 |

Change log of Layout: **2026-09-09 "Updated guidance to reflect current best practices."** The device-specification tables (screen sizes, per-device values) that older versions of this page carried are **no longer on the page**; the change log still lists them being added in 2022–2025. Designing for macOS was updated 2026-10-28 (touch input on Mac).

## 2. Key principles (paraphrased)

**Visual hierarchy**
- Put the most important content at the top and on the leading side (reading order).
- **Align to make things scannable; indent to show subordination.** People read aligned items as related and indented items as belonging to the item above.
- **Group related items** with negative space, container shapes or separator lines.
- **Progressive disclosure:** hide detail behind disclosure triangles, menus, nested views or scrollable sections.
- **Separate controls from content.** Controls live in the Liquid Glass layer; instead of putting a solid or semi-opaque colour behind controls, use a scroll edge effect. Full-bleed background content extends under sidebars, toolbars and tab bars; if a sidebar would cover a key part of an image, a "background extension effect" mirrors and blurs the image under it.

**Adaptability**
- Handle size classes, screen sizes, orientation, window resizing, text size and locale (RTL, formats, text length).
- **Decide layout by available space (size class), not by device or orientation.** Horizontal and vertical each are *compact* or *regular*; every combination can occur.
- **Same functionality at every size;** only how much is visible changes. With more room, a tab bar can become a sidebar and overflow items can come out of menus. The layout should stay recognisably the same app.
- Test the smallest and largest layouts first; test localisations and text sizes.
- Respect safe areas, margins and layout guides; the system provides guides for standard margins and for limiting text width for readability (no numbers given).
- Scale background art to fill; don't distort its aspect ratio.

**Platform models**
- *iOS:* medium display, held in hand, viewed at 1–2 feet; short sessions; limit onscreen controls and make secondary actions discoverable with little effort; controls in the middle and bottom are easier to reach.
- *iPadOS:* large display, within about 3 feet; elevate content, minimise modal views and full-screen transitions; choose density from viewing distance and input mode.
- *macOS:* large display, stationary, keyboard + pointer; long sessions; **show more content in fewer nested levels, with less modality, while keeping density comfortable**; resizable windows, full menu bar, keyboard shortcuts, high-precision pointing, customisation. On touch-screen Macs, use larger tap targets that expand on touch while keeping control size and density the same for pointer use.
- *macOS windows:* keep important controls and information away from a window's bottom edge, since people often drag windows partly below the screen; the optional bottom bar is only for small status info (Finder's item count). Key, main and inactive windows look different; custom windows must keep those state appearances. Avoid custom window chrome.

**Scrolling**
- Make scrollability obvious (show partial content at the edge).
- Don't nest scroll views of the same axis.
- Scroll edge effect: only where content scrolls under floating controls; one per view; in split views keep them the same height across panes; prefer the "automatic" style (more opaque when the bar holds many controls, text outside glass, or pinned table headers). It is not decoration and not a dimming overlay.
- Auto-scroll only as much as needed to reveal a selection or insertion point.

Short quote: "Determine layout based on size classes, not device type or orientation."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Spacing around bezeled controls | about 12 pt padding | all (stated in Accessibility and Pointing devices) | VERIFIED |
| Spacing around borderless elements | about 24 pt padding around visible edges | all | VERIFIED |
| Split-view divider (thin style) | 1 pt | macOS | VERIFIED (Split views page) |
| Toolbar title length | under 15 characters | all | VERIFIED (Toolbars page) |
| Max toolbar item groups | about 3 | all | VERIFIED (Toolbars page) |
| tvOS safe area | 60 pt top/bottom, 80 pt sides | tvOS | VERIFIED |
| tvOS grid horizontal spacing | 40 pt; min vertical spacing 100 pt; unfocused item widths 860 / 560 / 410 / 320 / 260 / 217 / 184 / 160 pt for 2–9 columns | tvOS | VERIFIED |
| visionOS button centre spacing | at least 60 pt apart | visionOS | VERIFIED |
| visionOS default window | 1280 × 720 pt | visionOS | VERIFIED (Windows page) |
| iPad viewing distance | within about 3 feet; iPhone 1–2 feet | iPadOS, iOS | VERIFIED |
| macOS menu bar height | 24 pt | macOS | VERIFIED (The menu bar page) |
| **Standard layout margins (e.g. 16/20 pt)** | **not given** on the current page | iOS, iPadOS | — |
| **Readable content width** | exists as a system guide; **no number given** | iOS, iPadOS | — |
| **Size-class breakpoints in points** | **not given** | iOS, iPadOS | — |
| **Grid / spacing scale (4 pt, 8 pt…)** | **not given** for iOS, iPadOS or macOS | — | — |
| **Corner radii** | **not given** for iOS/macOS; only "concentric with bar corners" (Toolbars) and a 16 pt radius for visionOS alert accessory views | — | — |

## 4. Do / Don't

**Do**
- Order by importance; align; indent for hierarchy; group with space, shapes or lines.
- Use progressive disclosure.
- Extend full-bleed backgrounds under bars and sidebars.
- Respond to available width, not device type.
- Keep features identical across sizes; reveal more when there's room.
- Keep primary content near the top even at huge text sizes.
- Test smallest and largest layouts.
- On macOS, show more at once with less nesting and fewer modals.

**Don't**
- Don't paint solid or semi-opaque backgrounds under controls; use a scroll edge effect.
- Don't change functionality with size.
- Don't put critical controls at the bottom of a macOS window or sidebar.
- Don't nest same-axis scroll views.
- Don't build custom window frames or imitate system window chrome.
- Don't stretch background art out of proportion.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| L1 | Breakpoints by **container width**, not device: use container queries / `min-width` media queries. Model two horizontal classes, compact and regular; Apple gives no point values, so AISloop must choose (candidate: compact < ~700 px, regular ≥ ~700 px; INFERRED, to be tested). | Principle VERIFIED; numbers INFERRED |
| L2 | Same features at every width; switch tab bar ↔ sidebar at the compact/regular boundary; move overflow items into a "More" menu when narrow. | VERIFIED pattern; CSS INFERRED |
| L3 | Safe areas: `padding: env(safe-area-inset-*)` with `viewport-fit=cover`; fixed bars must include the inset. | INFERRED |
| L4 | Spacing tokens: Apple only states ~12 px around bezeled controls and ~24 px around borderless ones. A full spacing scale must be our own choice (an 4/8-px base is common; INFERRED). | 12/24 VERIFIED; scale INFERRED |
| L5 | Readable measure: Apple uses a "readable width" guide without a number; on the web use `max-width: 65–75ch` for prose (INFERRED from typographic practice, not Apple). | INFERRED |
| L6 | Floating bars over content: `position: sticky/fixed` bar + a **scroll edge effect** = gradient mask or `backdrop-filter` that appears only when content is under the bar (e.g. via a scroll-driven animation or an IntersectionObserver sentinel). No solid bar background at rest. | Apple VERIFIED; implementation INFERRED |
| L7 | Desktop web apps: avoid fixed bottom bars with primary actions on wide/desktop layouts (macOS rule); bottom placement is for iPhone-width layouts where thumbs reach. | VERIFIED (both platform rules); mapping INFERRED |
| L8 | Concentric corners: inner radius = outer radius − inset (padding). Apply to buttons inside toolbars, cards inside sheets, etc. | Concept VERIFIED; formula INFERRED (standard geometry) |
| L9 | Don't draw fake OS window chrome (traffic lights, title bars) in a web page. | VERIFIED (Windows page: avoid custom window UI) + `sources.md` C8 |
| L10 | Scroll: `overscroll-behavior` to avoid scroll chaining in nested panes; never nest two vertical scrollers. Show partial items at edges of horizontal carousels. | INFERRED |
| L11 | RTL: use logical properties (`margin-inline-start`, `inset-inline-end`) everywhere so "leading/trailing" map directly. | INFERRED |

## 6. Open questions for the owner

1. **Density: iOS-airy or macOS-dense** as the AISloop default? (Apple gives the two models but no web middle ground.)
2. Compact/regular breakpoint value(s) — one breakpoint or two (compact / regular / wide desktop)?
3. Spacing scale: 4-px base, 8-px base, or Apple-like irregular steps?
4. Corner radius family: Apple gives none for iOS/macOS. Who decides — the boards?
5. Should full-bleed backgrounds under chrome (Music/TV style) be allowed, or keep chrome over plain surfaces only?
