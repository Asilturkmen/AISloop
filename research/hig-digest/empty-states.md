# Empty states

## 1. Sources

There is **no "Empty states" page** in the HIG (`.../empty-states.json` returned **404** on 2026-11-19). Guidance is spread across:

| Page | URL | What it says about empty states | Read |
|---|---|---|---|
| Writing › Best practices | https://developer.apple.com/design/human-interface-guidelines/writing | Clear next steps on blank screens | 2026-11-19 |
| Tab bars | https://developer.apple.com/design/human-interface-guidelines/tab-bars | Don't hide/disable a tab whose section is empty; explain why | 2026-11-19 |
| Loading | https://developer.apple.com/design/human-interface-guidelines/loading | Don't show a blank screen while loading | 2026-11-19 |
| Alerts | https://developer.apple.com/design/human-interface-guidelines/alerts | On startup problems, show cached/placeholder data plus a quiet label | 2026-11-19 |
| Onboarding | https://developer.apple.com/design/human-interface-guidelines/onboarding | Teach in context rather than up front | 2026-11-19 |
| Menus / Context menus | https://developer.apple.com/design/human-interface-guidelines/menus | A menu with all items unavailable must still open | 2026-11-19 |

## 2. Key principles (paraphrased)

- **Every empty screen gives a clear next step,** ideally with a button or link that does it (Writing).
- Empty states are a chance to welcome people and teach a little, and to show the app's voice — but the content must be **useful and fit the context**, not decorative.
- **Empty states are temporary,** so never put crucial information there: it disappears once content exists.
- **Keep the navigation stable:** a section with no content still appears (its tab is not hidden or disabled), and the section explains why it's empty.
- **Distinguish "empty" from "loading" and from "failed":** loading shows placeholders; failure shows cached data where possible with an unobtrusive explanation, not an alert.
- Context-specific tips near the relevant UI are preferred over long instructional screens (Onboarding).

Short quote: "Remember that empty states are usually temporary, so don't show crucial information that could then disappear."

## 3. Concrete values

None given (no sizes, illustration rules, or copy length). Apple's own apps commonly use a centred SF Symbol, a short title and one line of secondary text with an optional button (SwiftUI `ContentUnavailableView`); this is **INFERRED** from Apple's frameworks/apps, not stated in the HIG pages read.

## 4. Do / Don't

**Do**
- Say what will appear here and how to make it appear.
- Offer the action as a button.
- Keep tabs/sidebar items visible even when empty.
- Use the app's normal voice; calm and brief.

**Don't**
- Don't leave a blank area.
- Don't put critical information only in an empty state.
- Don't confuse empty with loading or error states.
- Don't use cute interjections or blame (Writing).

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| ES1 | Three distinct components: **Loading** (skeleton), **Empty** (title + one line + optional primary/secondary action), **Error** (what happened + Retry + cached data). | Distinction VERIFIED in principle; components INFERRED |
| ES2 | Empty layout (INFERRED from Apple apps): centred in the content area, a single monochrome icon (secondary label colour, ~48px), title in Title 3/Headline style, body in secondary label colour, ≤ 1 prominent button. No illustrations with gradients or mascots. | INFERRED |
| ES3 | Search with no results is an empty state too: echo the query, suggest broadening the scope (default broad scope; Search fields). | VERIFIED (scope guidance); INFERRED copy |
| ES4 | Copy pattern: "No Notes" / "Notes you create appear here." + "New Note" button; no "we", no "oops". | VERIFIED principles (Writing); example INFERRED |
| ES5 | First-run empty state can host the one contextual tip instead of an onboarding carousel. | INFERRED |

## 6. Open questions for the owner

1. Icon or no icon in empty states? Illustrations ever?
2. Should empty states use Title Case titles ("No Notes") like Apple, or sentence case?
