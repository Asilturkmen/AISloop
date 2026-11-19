# Buttons (styles, prominence, sizes, roles)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Buttons | https://developer.apple.com/design/human-interface-guidelines/buttons (JSON `.../buttons.json`) | 2026-11-19 |
| Toolbars (prominent style), Alerts (button placement), Color (Liquid Glass colour), Accessibility (sizes) | same base URL | 2026-11-19 |

Change log: 2025-12-16 (Liquid Glass).

**Correction to `research/01-taste-calibration/sources.md` §3:** the size table "Mini 28 / Small 32 / Regular 44 / Large 52 / Extra large 64 pt" on the Buttons page is in the **visionOS** section only. The page gives **no button size steps for iOS, iPadOS or macOS.**

## 2. Key principles (paraphrased)

- A button = **style** (size, colour, shape) + **content** (symbol, text, or both) + **role** (normal, primary, cancel, destructive).
- **Easy to hit and to see:** enough space around it to separate it from neighbours; hit region at least 44 × 44 pt (visionOS 60 × 60).
- **Custom buttons must have a pressed state**; without it the UI feels unresponsive.
- **Prominent style for the most likely action** in a view: the system puts the accent colour in the button's background. **One or two prominent buttons per view at most**; more increases decision load.
- **Distinguish the preferred option by style, not size.** Same-size buttons signal a set; mixing sizes looks inconsistent.
- Over colourful content, keep labels monochrome.
- **Content:** each button must make its purpose clear; familiar icon for familiar action; a short text label (title case, verb-first, e.g. "Add to Cart") when clearer than an icon. macOS/visionOS show tooltips on hover.
- **Roles:** primary uses the accent colour and responds to Return (and can close a temporary view such as a sheet or alert); destructive uses system red; cancel cancels. **Never give a destructive action the primary role,** even if it's the likely choice; people press prominent buttons without reading.
- iOS/iPadOS: a button can show an **activity indicator** for slow actions, optionally with a changed label ("Checkout" → "Checking out…").
- macOS:
  - **Push button** is the standard; can be default (accent) and tinted; flexible-height variant only for two-line text or tall icons (same radius and padding).
  - **Trailing ellipsis** on a push button that opens another window/view/app.
  - **Square (gradient) buttons**: symbol-only, attached to a view (e.g. +/− under a table), not in toolbars; no introductory label.
  - **Help button**: round "?" button, max one per window, bottom corner opposite the dismissal buttons (or bottom-left/right in settings); not in toolbars.
  - **Image buttons**: about 10 px padding around the image; label (if any) below.
- visionOS adds shapes (circle for icon-only, capsule or rounded rectangle for text) and avoids white-fill/black-text custom buttons because that look means "toggled on".
- watchOS: full-width capsule buttons for primary actions; equal heights in stacks.

Short quote: "Keep the number of prominent buttons to one or two per view."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Minimum hit region | 44 × 44 pt | stated as a general rule for all platforms except visionOS* | VERIFIED (*the Accessibility table is more specific: macOS default 28 × 28 pt / minimum 20 × 20 pt; tvOS 66 × 66 / 56 × 56 pt) |
| Minimum hit region | 60 × 60 pt | visionOS | VERIFIED |
| Prominent buttons per view | 1–2 max | all | VERIFIED |
| macOS image button padding | about 10 px | macOS | VERIFIED |
| visionOS sizes | Mini 28, Small 32, Regular 44, Large 52, Extra large 64 pt (availability varies by shape) | visionOS only | VERIFIED |
| visionOS spacing | centres ≥ 60 pt apart; 4 pt padding around buttons ≥ 60 pt | visionOS | VERIFIED |
| **iOS/macOS button heights, paddings, corner radii, font sizes** | **not given** | iOS, macOS | — |
| Role colours | primary = accent; destructive = system red | all | VERIFIED |

## 4. Do / Don't

**Do**
- One prominent (filled accent) button for the likely action; others plain/bordered.
- Same size for buttons in a set; vary style to show preference.
- Verb-first title-case labels; ellipsis when the button opens more UI (macOS).
- Pressed, hover (pointer) and disabled states for custom buttons.
- Return triggers the primary button; Esc the cancel button (Alerts).
- Inline spinner + changed label for slow actions.

**Don't**
- Don't use more than two prominent buttons in a view.
- Don't size buttons differently to show importance.
- Don't make a destructive action the default/primary.
- Don't use white fill + black text for custom buttons (reads as "on" in visionOS).
- Don't put square/help/image buttons in toolbars (macOS).

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| B1 | Button hierarchy tokens: **prominent** (accent fill, white label), **secondary/bordered** (tinted or grey fill, accent or label-colour text), **plain/borderless** (text or icon only). Apple names "prominent" and "plain"; the middle levels and their looks are INFERRED from Apple apps. | Prominent + plain VERIFIED; others INFERRED |
| B2 | Max one prominent button per view region (two only for equal-weight choices). | VERIFIED |
| B3 | Sizes: Apple gives no iOS/macOS heights. Candidates: desktop regular ~28px tall (macOS control default), touch ≥ 44px hit area. Visible height may be smaller than hit area. | 28/44 VERIFIED as control sizes; button heights INFERRED |
| B4 | Shape: modern Apple (Liquid Glass) uses capsules for prominent and toolbar buttons; macOS push buttons are rounded rectangles. Radius not given. | INFERRED |
| B5 | States: `:hover` (pointer only, `@media (hover: hover)`), `:active` pressed (darken or reduce opacity), `:focus-visible` ring, `[disabled]`/`aria-disabled` at reduced opacity (value not given). | Pressed state VERIFIED; CSS INFERRED |
| B6 | `<button>` for actions, `<a>` for navigation; a "button" that navigates is a link styled as a button. | INFERRED |
| B7 | Destructive: red text (`--red`) on a plain/bordered button; red filled only in confirmation dialogs, and never as the default (Enter) button when the user didn't explicitly choose the destructive action. | VERIFIED principle; styling INFERRED |
| B8 | Default button in forms/dialogs = submit; Enter submits. Cancel = Esc. | VERIFIED (Alerts/Buttons); HTML INFERRED |
| B9 | Loading: keep button width stable, show spinner at leading side + "…ing" label, `aria-busy="true"`. | VERIFIED pattern; ARIA INFERRED |
| B10 | Ellipsis "…" in labels that open a dialog ("Rename…", "Export…"). | VERIFIED (macOS); INFERRED for web |
| B11 | Accent text on white must meet 4.5:1 → don't use the default light Blue #0088FF for button text; see `color.md` C4. | COMPUTED |

## 6. Open questions for the owner

1. Primary button shape: capsule (iOS 26) or rounded rectangle (classic macOS/web)?
2. Secondary button style: grey fill, tinted (accent at low opacity) fill, or outline?
3. Desktop button height: ~28px (macOS) or ~32–36px (common web)?
