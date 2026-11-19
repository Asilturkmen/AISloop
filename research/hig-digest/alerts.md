# Alerts and action sheets (confirmation dialogs)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Alerts | https://developer.apple.com/design/human-interface-guidelines/alerts (JSON `.../alerts.json`) | 2026-11-19 |
| Action sheets | https://developer.apple.com/design/human-interface-guidelines/action-sheets | 2026-11-19 |
| Feedback (when to warn), Buttons (roles), Writing (error copy) | same base URL | 2026-11-19 |

Change logs: Alerts 2024-02-02 (default and Cancel buttons). Action sheets: none.

## 2. Key principles (paraphrased)

**When to alert**
- **Rarely.** Alerts interrupt; each must carry essential information and useful actions.
- **Not for information alone**; show non-actionable status in context instead (Mail shows an offline indicator people can tap).
- **Not for common, undoable actions**, even destructive ones (deleting an email). **Yes** for uncommon destructive actions that can't be undone.
- **Never on launch.** Problems at start-up (no network) get cached/placeholder content plus an unobtrusive label.

**Content**
- Title + optional message + **up to three buttons** (macOS can add icon, accessory view, suppression checkbox, Help button; iOS/macOS/visionOS can add a text field — only if input is needed to resolve the situation, e.g. a password).
- **Neutral, direct, approachable tone;** don't hide severity, don't accuse.
- **Title:** says what happened, in what context, and why; specific; no more than two lines; never just "Error" or an error code. Sentence → sentence case + punctuation; fragment → title case, no punctuation.
- **Message:** only if it adds value; short, complete sentences.
- Don't explain the buttons; if you must refer to one, use its exact title and the verb "choose".

**Buttons**
- One or two words, describing the result; verbs tied to the text ("View All", "Reply", "Ignore"). **"OK" only for purely informational alerts; never "Yes/No".** The cancel button is always titled **"Cancel"**.
- **Placement:** the most likely (default) button goes **last in a horizontal row (trailing)** or **first in a vertical stack (top)**; **Cancel goes leading** in a row or **at the bottom** of a stack.
- **Destructive style** only when the destructive result wasn't what the person deliberately chose (Empty Trash after choosing Empty Trash is *not* styled destructive, so Return can confirm it).
- If there's a destructive action, include Cancel. **Cancel is never the default button.** To force reading, make no button default. A single-button alert that is also the default uses "Done", not "Cancel".
- Offer quick cancellation: Esc or ⌘-period on keyboards; leaving to the Home Screen on iOS.
- iOS: avoid scrolling alerts (keep text short). For choices related to an action the person started, use an **action sheet**, not an alert.
- macOS: the app icon appears automatically; use the caution symbol sparingly (only for unexpected data loss, not for routine overwrite/delete).

**Action sheets (iOS/iPadOS; "confirmation dialog" in SwiftUI)**
- For **choices about an action the person initiated** (cancelling a Mail draft → Delete Draft / Save Draft). Alerts, by contrast, are usually unexpected.
- Sparingly; short single-line title; message only if needed.
- **Cancel at the bottom** (watchOS: top-left); **destructive choices at the top**, destructive style.
- iOS: action sheet, not a menu, for choices that follow an action; never scrolling.
- watchOS: max four buttons including Cancel.

Short quote: "Avoid displaying alerts for common, undoable actions, even when they're destructive."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Max buttons in an alert | 3 | all | VERIFIED |
| Title length | ≤ 2 lines | all | VERIFIED |
| Button title length | 1–2 words | all | VERIFIED |
| Simultaneous alerts | 1 | all | VERIFIED (Modality) |
| Action sheet buttons (watchOS) | ≤ 4 incl. Cancel | watchOS | VERIFIED |
| visionOS alert accessory view | max height 154 pt, corner radius 16 pt | visionOS | VERIFIED |
| Cancel shortcuts | Esc or ⌘-. (iOS, iPadOS, macOS, visionOS); Menu (tvOS) | | VERIFIED |
| **Alert width, padding, radius, button height** | **not given** for iOS/macOS | — | — |

## 4. Do / Don't

**Do**
- Alert only for important, actionable situations or irreversible surprises.
- Specific title; short message; verb buttons.
- Default on the trailing side; Cancel leading; Esc cancels.
- Action sheet for options following the person's own action; destructive on top, Cancel at bottom.

**Don't**
- Don't alert at launch or for routine deletes.
- Don't title "Error" or show codes only.
- Don't use OK for consequential confirmations, or Yes/No ever.
- Don't make Cancel or a destructive button the default.
- Don't show two alerts at once.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| AL1 | Use `<dialog role="alertdialog">` with `aria-labelledby` (title) and `aria-describedby` (message); focus the least destructive safe button (or none) when destructive. Never `window.alert/confirm`. | INFERRED |
| AL2 | Desktop layout: buttons in a row, default (prominent) at the trailing end, Cancel leading of it. Phone layout: if titles don't fit side by side, stack with default on top, Cancel at bottom. | VERIFIED |
| AL3 | Replace "Are you sure?" modals for undoable deletes with **undo** (e.g. an inline "Deleted · Undo" message). | VERIFIED principle (no alert for undoable actions); undo UI INFERRED |
| AL4 | Mobile web action sheet = bottom sheet with a list of large buttons, destructive (red) first, Cancel separated at the bottom. Desktop = small popover menu anchored to the trigger. | VERIFIED (iOS/iPadOS mapping); INFERRED for web |
| AL5 | Startup problems (offline) → inline banner/label + cached content, not a modal. | VERIFIED |
| AL6 | Esc = Cancel; Enter = default button (if one exists). | VERIFIED |

## 6. Open questions for the owner

1. Undo-instead-of-confirm as an AISloop default for deletes?
2. Alert visual: centred compact card (iOS/macOS) — any objection to it being smaller than a sheet with no header bar?
