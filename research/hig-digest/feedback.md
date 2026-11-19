# Feedback (status, confirmation, warnings, help)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Feedback | https://developer.apple.com/design/human-interface-guidelines/feedback (JSON `.../feedback.json`) | 2026-11-19 |
| Playing haptics (headlines only) | https://developer.apple.com/design/human-interface-guidelines/playing-haptics | 2026-11-19 |
| Alerts, Progress indicators, Buttons (press state), Offering help | same base URL | 2026-11-19 |

Feedback page has no change-log entries.

## 2. Key principles (paraphrased)

- Feedback tells people **what's happening, what they can do next, what their action did, and how to avoid mistakes.**
- **Match the delivery to the importance:** passive status that people can glance at when they want; interrupting warnings only for possible data loss.
- **Make all feedback accessible** by using several channels (colour + text + sound + haptics) so it reaches people with sound off, eyes elsewhere, or using VoiceOver.
- **Put status inside the interface, near what it describes** (Mail shows last update time and unread count in its toolbar).
- **Alerts only for critical, ideally actionable information**; overused alerts lose impact.
- **Warn only about unexpected, irreversible data loss;** not when loss is the expected result (Finder doesn't warn on every move to Trash).
- **Confirm completion only for significant tasks** (a payment); otherwise success is assumed and only failure needs reporting.
- **When a command can't run, say why** (Maps explains it can't route from a place to itself).
- Every custom button needs a **pressed state** (Buttons).
- Haptics (headlines from that page): use system patterns by their meaning, consistently, as a complement to other feedback, sparingly, short, optional.
- Help: contextual and dismissible; don't explain standard controls; tooltips ≤ 60–75 characters (see `popovers.md`).

Short quote: "Warn people when they initiate a task that can cause data loss that's unexpected and irreversible."

## 3. Concrete values

None given (no toast durations, no banner sizes). Related numbers live in `popovers.md` (tooltip length) and `alerts.md` (button counts).

## 4. Do / Don't

**Do**
- Inline, passive status near its subject.
- Multiple channels for important feedback.
- Confirmation for significant completed actions only.
- Explain failures and blocked commands with a reason and a fix.
- Pressed states on every control.

**Don't**
- Don't alert for routine or undoable actions.
- Don't celebrate every success.
- Don't rely on colour, motion or sound alone.
- Don't use auto-vanishing UI for essential messages (Accessibility: avoid time-boxed elements).

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| FB1 | Status lives in place: counts, "Updated 2 min ago", sync state in the toolbar/sidebar footer, not toasts. | VERIFIED principle; INFERRED UI |
| FB2 | Toasts/snackbars are **not an Apple pattern**; if used (e.g. Undo after delete), they must persist long enough or until dismissed, be announced via `aria-live="polite"`, and never carry the only copy of essential info. | Apple has no toast page (INFERRED); time-box rule VERIFIED |
| FB3 | Field-level errors inline; form-level summary only for long forms. | VERIFIED (Writing) |
| FB4 | Success confirmation: subtle inline change (checkmark, updated state) for routine saves; a clear confirmation screen/sheet only for significant transactions. | VERIFIED principle |
| FB5 | No web haptics on iOS Safari (Vibration API unsupported there); feedback must be visual + text. | INFERRED |
| FB6 | `:active` pressed styles on all controls, including on touch (add `touch-action: manipulation`; iOS Safari needs a touch listener or `:active` may not fire — test). | VERIFIED principle; implementation INFERRED |

## 6. Open questions for the owner

1. Allow toasts at all (they are very "web", not Apple), or only an inline "Undo" affordance?
2. Success feedback for saves: silent (state just updates), a small inline check, or a toast?
