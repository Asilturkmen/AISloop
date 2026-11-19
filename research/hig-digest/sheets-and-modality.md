# Sheets and modality

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Sheets | https://developer.apple.com/design/human-interface-guidelines/sheets (JSON `.../sheets.json`; button-placement examples are in image alt text) | 2026-11-19 |
| Modality | https://developer.apple.com/design/human-interface-guidelines/modality | 2026-11-19 |
| Panels (macOS) | https://developer.apple.com/design/human-interface-guidelines/panels | 2026-11-19 |

Change logs: Sheets **2026-03-24** (button placement); Modality 2023-12-05.

## 2. Key principles (paraphrased)

**Modality in general**
- Use a modal only when it clearly helps: critical information, confirming/modifying a recent action, a short scoped task, or an immersive/complex task.
- **Simple, short, streamlined.** Avoid an "app inside the app" — no deep hierarchy inside a modal; if subviews are needed, one path and no buttons that look like the dismiss button.
- **Full-screen modal** for in-depth content or complex tasks (media, camera, photo editing, document markup).
- **Always an obvious way out:** iOS/iPadOS/watchOS → a button in the top toolbar or swipe down; macOS/tvOS → a button in the main content.
- **Confirm before discarding user content** when closing (iOS: an action sheet that offers to save).
- **Name the task** with a title (and guidance text if needed).
- **One modal at a time**; dismiss one before presenting another. An alert may appear above anything, but never two alerts.

**Sheets**
- For a **scoped task related to the current context** (supply info, attach a file, choose a save location).
- macOS, tvOS, visionOS, watchOS: always modal. iOS/iPadOS: can be **nonmodal** (Notes' format sheet edits the text behind it).
- **Buttons:** *Cancel* (or Close) leaves without saving; *Done* completes/saves; *Back* steps back inside a multi-step sheet (never dismisses). **Always pair Done with Cancel or Back; never show Cancel, Done and Back together.**
- **iOS placement:** single-view sheet → **Cancel leading, Done trailing** in the top bar. Multi-step: first step Cancel (leading) + inactive Done (trailing); middle steps Back (leading) + inactive Done; final step Back + active Done (from the page's illustrations).
- Long or complex flows → full-screen modal, a separate window, or full-screen mode instead of a sheet.
- **One sheet at a time** from the main UI; close the first before opening a second.
- Use a nonmodal view (nonmodal sheet on iOS, panel on macOS, split view on visionOS) for supplementary tools that act on the main view.
- **iOS detents:** *large* (full height) and *medium* (about half); custom detents allowed. Medium supports progressive disclosure (share sheet); compose sheets use large only. **Show a grabber** on resizable sheets (also works with VoiceOver). **Swipe down to dismiss**; if there are unsaved changes, confirm with an action sheet.
- iPadOS: prefer **page** or **form sheet** styles (default sizes, centred over dimmed content).
- **macOS:** a card with rounded corners floating over the dimmed parent window; reasonable default size, resizable if useful; other app windows stay usable. If people must repeatedly enter input and watch results (find & replace), use a **panel** instead.
- visionOS: centred in view, not covering the whole window.

**Panels (macOS nonmodal alternative)**
- A panel floats above windows with supplementary controls for the current selection; less prominent than the main window. Good for **inspectors** (details that update with the selection).
- Prefer simple adjustment controls (sliders, steppers) over typing or selection inside panels.
- Short noun title (title case) in its title bar; refer to it by that title ("Show Inspector"), never "panel".
- Shown when the app is active, hidden when it isn't; usually no minimise button.
- Dark translucent **HUD** panels only for media-centric or immersive apps, kept small and low on colour; standard panels otherwise.

Short quote: "Avoid showing all three buttons — Cancel, Done, and Back — together."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Medium detent | about half of full height | iOS | VERIFIED |
| Large detent | fully expanded height | iOS | VERIFIED |
| Simultaneous sheets / modals | 1 (alerts may stack on top, but only one alert) | all | VERIFIED |
| Cancel / Done placement (single view) | leading / trailing of top bar | iOS, iPadOS | VERIFIED |
| **Corner radius, dim opacity, sheet width, grabber size, animation duration** | **not given** | all | — |

## 4. Do / Don't

**Do**
- Sheets for short scoped tasks; title them.
- Cancel leading, Done trailing (iOS); Done always paired with Cancel or Back.
- Grabber + swipe-to-dismiss for resizable sheets; confirm if edits would be lost.
- Medium height when a glance is enough; full height for composing.
- macOS: card over dimmed parent; panels for repeated input.

**Don't**
- Don't stack sheets or open a sheet from a sheet.
- Don't build multi-level navigation inside a modal.
- Don't show Cancel + Done + Back together.
- Don't use Back to dismiss.
- Don't make Done the only exit.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| SH1 | `<dialog>` with `showModal()` (focus trap, Esc, inert background) for modal sheets; non-modal panels with `show()` or `popover="manual"`. | INFERRED |
| SH2 | Phone width: bottom sheet sliding up, rounded top corners, grabber bar, drag-to-dismiss + visible Cancel; optional medium (≈50vh) and large (≈ full minus top gap) heights. | Detents VERIFIED; CSS INFERRED |
| SH3 | Desktop width: centred card over dimmed backdrop (`::backdrop`), default width sized to content (Apple gives none; candidate 480–640px; INFERRED). | INFERRED |
| SH4 | Header bar inside the sheet: leading Cancel (text button), centred title, trailing Done (prominent). | VERIFIED (iOS) |
| SH5 | Esc = Cancel; Enter = Done when Done is the default; Back is a navigation inside the dialog, not a close. | VERIFIED principle; key mapping INFERRED |
| SH6 | Dirty-state guard: closing with unsaved edits asks "Save / Discard / Keep Editing" (action-sheet pattern), not a browser `confirm()`. | VERIFIED pattern; INFERRED for web |
| SH7 | In dark mode, the sheet uses the elevated surface colour. | VERIFIED (Dark Mode) |
| SH8 | Routes: a modal task should be deep-linkable if it's a destination, but closing must return to the exact parent state (web-only concern). | INFERRED |

## 6. Open questions for the owner

1. On desktop web: centred dialog (macOS sheet, modern) or side panel (common SaaS "drawer")?
2. Do we allow nonmodal sheets/panels (e.g. a formatting panel that stays open)?
3. Medium-detent bottom sheets on mobile web: in or out (drag physics are hard to make feel right)?
