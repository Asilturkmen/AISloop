# Toggles (switches, checkboxes, radio buttons, toggle buttons)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Toggles | https://developer.apple.com/design/human-interface-guidelines/toggles (JSON `.../toggles.json`) | 2026-11-19 |
| Materials (toggle takes glass while being dragged), Accessibility (no colour-only state) | same base URL | 2026-11-19 |

Change log: 2024-03-29 (macOS switches, checkbox titles, radio art).

## 2. Key principles (paraphrased)

- A toggle chooses between **two opposing states** that affect content or a view. For picking from a list, use a pop-up button instead.
- Make clear **what** the toggle controls (usually the surrounding context does; macOS often adds a label).
- **State must be obvious without colour alone:** fill on/off, shape shown/hidden, checkmark or dot.
- **iOS/iPadOS**
  - **Switches only inside list rows**; the row text is the label.
  - Default switch colour is **green**; change it (e.g. to the accent) only if needed, keeping enough contrast with the off state.
  - **Outside lists, use a button that behaves like a toggle** (e.g. Phone's filter button gains a blue highlight when on), with an icon and no extra explanatory label.
- **macOS**
  - Switches, checkboxes and radio buttons go in the window body, never in a toolbar or status bar.
  - **Switch** = more visual weight; use it for important settings or to turn a whole group on/off. In grouped forms, a **mini switch** matches row height; regular switch for the parent, mini for children. Don't swap existing checkboxes for switches.
  - **Checkbox**: small rounded square; empty off, checkmark on, dash mixed; title on its trailing side. Use checkboxes (aligned on their leading edge, indented) for **hierarchies of settings**; show the **mixed** state when children differ. A single on/off setting → checkbox.
  - **Radio buttons**: small circles + labels for **mutually exclusive** choices, typically **2–5**; more than about five → pop-up button. Horizontal sets use equal spacing based on the longest label. Mixed state rarely makes sense for radios.
  - Introduce a group with a label aligned to the first checkbox's baseline when the relationship isn't obvious.

Short quote: "Use the switch toggle style only in a list row."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Default switch "on" colour | green (system Green; light `#34C759`) | iOS, iPadOS | VERIFIED (colour value from Color page) |
| Radio button group size | typically 2–5; above ~5 use a pop-up button | macOS | VERIFIED |
| Checkbox states | off / on (checkmark) / mixed (dash) | macOS | VERIFIED |
| Switch sizes | regular and mini | macOS | VERIFIED (names only) |
| **Switch / checkbox dimensions** | **not given** | all | — |

## 4. Do / Don't

**Do**
- Switch in list/settings rows (iOS style); toggle-button outside rows.
- Checkbox for single on/off and for nested option hierarchies (macOS style), with mixed state on parents.
- Radios for 2–5 exclusive options; pop-up beyond that.
- Make state visible by shape as well as colour.

**Don't**
- Don't float a switch alone in the middle of a page (iOS).
- Don't use a toggle to choose between more than two values.
- Don't put switches/checkboxes/radios in toolbars.
- Don't replace checkboxes with switches in an existing design.
- Don't add a text label that explains an icon toggle button.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| TG1 | Switch = `<input type="checkbox" role="switch">` (or `<button role="switch" aria-checked>`), placed in a row whose text is the `<label>`. Effect is immediate (no Save button) — matches iOS settings behaviour. | Placement VERIFIED; ARIA INFERRED; "immediate" INFERRED |
| TG2 | Checkbox = native `<input type="checkbox">` with `accent-color`; mixed state via `indeterminate = true` (+ `aria-checked="mixed"`). | INFERRED |
| TG3 | Radio = native `<input type="radio">` in a `<fieldset>` with `<legend>`; > 5 options → `<select>`/pop-up. | Threshold VERIFIED; HTML INFERRED |
| TG4 | Toggle button = `<button aria-pressed="true|false">` with a tinted background when on. | VERIFIED pattern; ARIA INFERRED |
| TG5 | On-state colour: green (Apple default) or accent. Green #34C759 on white is 2.22:1; the off/on difference must also be shown by knob position (it is), and the off track needs ≥ 3:1 boundary against the page (WCAG 1.4.11). | COMPUTED + INFERRED |
| TG6 | Desktop-dense forms (macOS style): prefer checkboxes; mobile/touch settings lists: prefer switches. | VERIFIED per platform; web mapping INFERRED |

## 6. Open questions for the owner

1. Switch colour: Apple green or the project accent?
2. Desktop settings pages: switches (iOS-like) or checkboxes (macOS-like)?
