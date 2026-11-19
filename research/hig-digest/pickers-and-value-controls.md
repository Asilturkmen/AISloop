# Pickers, sliders and steppers

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Pickers | https://developer.apple.com/design/human-interface-guidelines/pickers (JSON `.../pickers.json`) | 2026-11-19 |
| Sliders | https://developer.apple.com/design/human-interface-guidelines/sliders | 2026-11-19 |
| Steppers | https://developer.apple.com/design/human-interface-guidelines/steppers | 2026-11-19 |
| Entering data | https://developer.apple.com/design/human-interface-guidelines/entering-data | 2026-11-19 |
| Pop-up buttons (short exclusive lists) | https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons | 2026-11-19 |

Change logs: Pickers 2023-06-05; Sliders 2023-06-21; Steppers none.

## 2. Key principles (paraphrased)

**Choosing the right control by list length** (Pickers page)
- Short list of choices → pull-down/pop-up button (a picker is too heavy).
- Medium-to-long list → picker.
- Very long list → list or table (can grow, can have an index).
- Prefer choices over typing whenever possible (Entering data).

**Pickers**
- Predictable, logically ordered values (alphabetical countries) so people can scroll to hidden values.
- **Show the picker in context** (below the edited field or in a popover), not by switching views.
- Minute pickers can use coarser steps that divide 60 evenly (e.g. 0/15/30/45).
- iOS date picker styles: **compact** (a button showing the value in the accent colour that opens a calendar/time editor; for tight spaces), **inline** (calendar or wheels in place), **wheels**, **automatic**. Modes: date, time, date and time, countdown timer (max 23 h 59 min; not in compact/inline).
- macOS date pickers: **textual** (compact, precise entry) or **graphical** (calendar/clock, browsing, ranges).
- Values and order follow the device locale.

**Sliders**
- Track + thumb; the part between minimum and thumb fills with colour; optional min/max icons (small image → large image).
- **Minimum on the leading side, maximum trailing** (bottom→top for vertical).
- Pair with a text field and/or stepper when exact values matter.
- iOS: don't build volume sliders; use the system volume view.
- macOS: optional tick marks (with labels at least at min and max); live feedback while dragging; linear for bounded ranges, circular for repeating values (rotation 0–360°); introduce with a sentence-case label ending in a colon; tooltip with the current value.

**Steppers**
- Two segments (−/+) next to a field that shows the value (the stepper itself shows none); make it obvious which value it changes.
- Pair with a text field when large jumps are likely. macOS: Shift-click for bigger steps (e.g. 10×).

Short quote: "Avoid switching views to show a picker."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Minute interval | must divide 60 (e.g. 15) | all | VERIFIED |
| Countdown timer max | 23 h 59 min | iOS | VERIFIED |
| Stepper Shift-click multiplier (example) | 10× | macOS | VERIFIED (as example) |
| Slider direction | min leading, max trailing | all | VERIFIED |
| **Picker / slider / stepper dimensions** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Match control to list length (menu → picker → list).
- Show pickers inline or in a popover next to the field.
- Use compact date pickers where space is tight.
- Pair sliders with numeric input when precision matters.

**Don't**
- Don't navigate away to pick a value.
- Don't use a picker for 3–4 options.
- Don't reverse slider direction.
- Don't leave a stepper without a visible value.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| PV1 | Date/time: native `<input type="date|time|datetime-local">` gives the platform picker on iOS/macOS Safari (the most Apple-like result for free). A custom calendar popover only when ranges or rich browsing are needed. | INFERRED |
| PV2 | Short option list → `<select>` (renders as a native pop-up menu on Apple platforms) or a custom listbox-in-popover. Long list → searchable combobox; huge list → full list view. | Thresholds VERIFIED (qualitative); HTML INFERRED |
| PV3 | Slider = `<input type="range">` with `accent-color`; `dir`-aware; add an `<output>` or number field for exact values. | INFERRED |
| PV4 | Stepper = − / + buttons beside `<input type="number">` (spin buttons hidden), each ≥ 44px on touch; Shift+click or Shift+Arrow for ×10. | VERIFIED pattern; HTML INFERRED |
| PV5 | Wheel pickers are a touch idiom; don't recreate them on desktop web. | INFERRED |

## 6. Open questions for the owner

1. Native date inputs (look differs by browser/OS) vs one custom date picker everywhere?
