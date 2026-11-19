# Segmented controls

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Segmented controls | https://developer.apple.com/design/human-interface-guidelines/segmented-controls (JSON `.../segmented-controls.json`) | 2026-11-19 |
| Tab views (macOS alternative), Search fields (scope bars) | same base URL | 2026-11-19 |

Change log: 2023-06-21 (visionOS).

## 2. Key principles (paraphrased)

- A linear set of two or more segments, usually **equal width**, each acting like a button; text or images; optional labels beneath.
- Three behaviours: **single choice**, **multiple choice** (macOS, e.g. Bold/Italic/Underline), or **momentary actions** without a selected state (Mail's Reply / Reply All / Forward). **Don't mix** selection and action segments in one control.
- Use for a few **tightly related options** that change one object, state or view; the control stays grouped at any width and shows the current choice at a glance.
- **Limit segments:** about **5–7** in wide layouts, about **5** on iPhone.
- **Consistent widths**; similar-size content in each segment.
- **Text or images, not both** in one control. Text labels are nouns/noun phrases in title case; no introductory text needed (iOS). On macOS, introductory text or per-segment labels/tooltips can clarify icon segments.
- **iOS:** good for switching between closely related subviews (Calendar's New Event vs New Reminder). For separate app sections use a tab bar.
- **macOS:** for switching views in the main window area use a **tab view**; segmented controls fit toolbars and inspectors.

Short quote: "Prefer using either text or images — not a mix of both — in a single segmented control."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Max segments | ~5–7 (wide), ~5 (iPhone) | iOS, iPadOS, macOS | VERIFIED |
| Segment width | equal (usually) | all | VERIFIED |
| **Height, radius, selected-thumb style** | **not given** | all | — |

## 4. Do / Don't

**Do**
- 2–5 equal segments with short noun labels.
- Use for view modes, filters, scopes within one screen.
- Keep each control purely selection or purely action.

**Don't**
- Don't use it for app-level navigation (tab bar) or main-window view switching on Mac (tab view).
- Don't mix icons and text.
- Don't exceed ~5 on phones.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| SC1 | Single choice: `role="radiogroup"` with `role="radio"` items (or native radios visually styled), arrow-key navigation. If it switches panels, use `role="tablist"`. | INFERRED |
| SC2 | Multiple choice: group of `aria-pressed` toggle buttons. Momentary actions: plain button group. | INFERRED |
| SC3 | Look (iOS): grey track (fill colour), white raised "thumb" behind the selected segment; macOS: accent-filled selected segment. Neither look's dimensions are given. | INFERRED (observed convention) |
| SC4 | Equal widths: `display: grid; grid-auto-columns: 1fr; grid-auto-flow: column`. | INFERRED |
| SC5 | Scope bar under a search field = segmented control. | VERIFIED |

## 6. Open questions for the owner

1. Selected segment style: iOS white thumb on grey track, or accent fill (macOS / older iOS)?
