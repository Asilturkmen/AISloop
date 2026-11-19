# Popovers (and tooltips)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Popovers | https://developer.apple.com/design/human-interface-guidelines/popovers (JSON `.../popovers.json`) | 2026-11-19 |
| Offering help › Tooltips, Tips | https://developer.apple.com/design/human-interface-guidelines/offering-help | 2026-11-19 |
| Materials (popovers use regular Liquid Glass) | https://developer.apple.com/design/human-interface-guidelines/materials | 2026-11-19 |

Popovers page has no change log entries. Offering help: 2023-12-05.

## 2. Key principles (paraphrased)

**Popovers**
- A transient view above content, opened from a control; for a **small amount of information or a few related tasks** (Calendar event details). Also a way to keep rarely needed content out of permanent panels.
- **Arrow points at the control that opened it;** don't cover that control or content needed while using the popover.
- **Dismissal:** clicking/tapping outside or choosing an item closes it. Add Close/Cancel/Done only when it clarifies (save vs discard). For multi-select popovers, stay open until explicitly dismissed or tapped outside.
- **Auto-closing must save the work;** discard only on an explicit Cancel.
- **One popover at a time;** never cascade popovers; nothing appears on top of a popover except an alert.
- One click/tap should both close the current popover and open another.
- **Only as big as the content;** animate size changes so it doesn't look like a new popover.
- Don't write "popover" in help text; don't use a popover for **warnings** (use an alert).
- iOS: **no popovers in compact width** — use a sheet instead.
- macOS: a popover can be **detachable** into a panel that stays visible; keep its look nearly unchanged.
- Glass: popovers are text-heavy, so they use the **regular** Liquid Glass variant.

**Tooltips (macOS, visionOS)**
- Describe only the hovered control; explain what it does, starting with a verb; don't repeat its name; **60–75 characters max**; sentence case, fragments without ending punctuation; can vary with the control's state.

**Tips (TipKit)**
- Small transient hints for simple features (≤ 3 actions), one or two sentences, actionable, not promotional; popover tip (keeps flow) or inline tip (keeps surroundings visible); show only to people who'll benefit; throttle (e.g. once every 24 hours).

Short quote: "Show one popover at a time."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Simultaneous popovers | 1 | all | VERIFIED |
| Tooltip length | 60–75 characters max | macOS, visionOS | VERIFIED |
| Tip length | 1–2 sentences; features ≤ 3 actions | all | VERIFIED |
| Tip frequency example | once every 24 hours | all | VERIFIED (as example) |
| **Popover arrow size, padding, radius, max width** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Small focused content; arrow to the source; close on outside click; save on close.
- Switch to a sheet on narrow screens.
- Animate size changes.

**Don't**
- Don't stack or chain popovers.
- Don't show warnings in popovers.
- Don't make popovers bigger than needed.
- Don't put long instructions in tooltips.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| PO1 | HTML `popover` attribute (`popover="auto"` gives light-dismiss and one-at-a-time behaviour for free) + CSS anchor positioning for the arrow side. | INFERRED |
| PO2 | Compact width (`max-width` breakpoint): render the same content as a bottom sheet. | VERIFIED principle; implementation INFERRED |
| PO3 | Persist edits on light-dismiss (auto-save), discard only via Cancel. | VERIFIED |
| PO4 | Tooltips: `title` is too slow/unstyled; a custom tooltip on hover/focus after a short delay, ≤ 75 chars, sentence case. Never put essential info only in a tooltip (not reachable on touch). | Length VERIFIED; rest INFERRED |
| PO5 | Surface: elevated background + shadow; optional blur (popovers belong to the functional layer). | INFERRED |

## 6. Open questions for the owner

1. Show the popover arrow (macOS/iPad) or arrow-less floating panels (common web)?
