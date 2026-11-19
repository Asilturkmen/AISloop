# Writing (tone, capitalization, labels)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Writing | https://developer.apple.com/design/human-interface-guidelines/writing (JSON `.../writing.json`) | 2026-11-19 |
| Inclusion | https://developer.apple.com/design/human-interface-guidelines/inclusion | 2026-11-19 |
| Capitalization and label rules collected from: Buttons, Menus, Alerts, Toolbars, Tab bars, Tab views, Segmented controls, Lists and tables, Outline views, Sliders, Offering help, Progress indicators, Settings | same base URL | 2026-11-19 |
| Apple Style Guide (linked, not digested) | https://help.apple.com/applestyleguide/ | not read |

Change log of Writing: 2025-12-16 (language patterns, possessive pronouns); page created 2023-02-27.

## 2. Key principles (paraphrased)

- **Voice, then tone.** Decide who you're talking to and keep a list of standard terms. Voice is stable; tone shifts with the situation (serious for a fall alert, light for an achievement).
- **Be clear and brief.** Every word must earn its place; read it aloud.
- **Plain language for everyone:** no jargon, no gendered terms, write for localisation and screen readers. Define technical terms; avoid colloquialisms; think twice about humour (Inclusion).
- **Most important information first** on each screen; split multiple ideas across screens.
- **Action-oriented labels:** buttons and links almost always start with a verb. Plain beats cute ("Send" rather than a playful phrase). Links describe the destination, never "Click here".
- **Patterns:** reuse the same phrasing for the same situations; it makes the product feel designed.
- **Capitalisation is a style choice, applied consistently per element type.** Title case reads formal, sentence case casual. (Specific components have fixed rules, see table.)
- **Multi-step flows:** start with something like "Get Started", move with consistent "Continue" or "Next" (or a label hinting at the next step), end with "Done".
- **Possessives sparingly:** "Favorites" over "Your Favorites"; don't switch between "my" and "your"; **never "we"** (unclear who it is; error messages should state the problem, e.g. "Unable to load content").
- **Right verb for the device:** "tap" on touch, "click" with a pointer; "choose" when neutral.
- **Empty states:** give a clear next step (ideally a button), may show the app's voice, but don't put crucial information there because it disappears.
- **Error messages:** close to the problem, no blame, say how to fix it ("Choose a password with at least 8 characters" beats "too short"). No "oops"/"uh-oh". If many people hit the same error, redesign the interaction.
- **Settings labels:** practical names; if needed, describe what the setting does when **on** (people infer off). Link directly to a setting rather than describing its location.
- **Text fields:** label every field; use hint text to show format ("name@example.com"); errors next to the field, phrased as instructions ("Use only letters for your name"), not as scolding or robotic codes ("Invalid name").

Short quote (exact wording matters for agents): "Interjections like "oops!" or "uh-oh" are typically unnecessary and can sound insincere."

## 3. Concrete values: capitalization and length rules by element (VERIFIED from the pages listed)

| Element | Capitalisation | Other rules | Source page |
|---|---|---|---|
| Button labels | Title case | Start with a verb when possible ("Add to Cart"); no ending punctuation | Buttons |
| Menu items | Title case (every word except articles, coordinating conjunctions, short prepositions; last word always capitalised) | Verb for actions; drop articles ("View Settings", not "View the Settings"); trailing ellipsis (…) when more input is needed | Menus |
| macOS push button that opens another window/view | — | Trailing ellipsis | Buttons |
| Alert title, complete sentence | Sentence case + ending punctuation | Max 2 lines; specific, not "Error" | Alerts |
| Alert title, fragment | Title case, no punctuation | | Alerts |
| Alert message | Sentence case, complete sentences, punctuation | Only if it adds value; as short as possible | Alerts |
| Alert buttons | Title case, no punctuation | 1–2 words; verbs; "OK" only in purely informational alerts; never "Yes"/"No"; always "Cancel" for cancel | Alerts |
| Column headings | Title case, nouns, no ending punctuation (no trailing colon) | | Lists and tables, Outline views |
| Segmented control labels | Title case, nouns or noun phrases | No introductory text needed (iOS) | Segmented controls |
| Tab view labels (macOS) | Title case, nouns/short noun phrases | | Tab views |
| Tab bar labels | — | Single words where possible | Tab bars |
| Toolbar/window title | — | Under **15 characters**; never the app name | Toolbars |
| Slider label (macOS) | Sentence case, ends with a colon | | Sliders |
| Tooltips | Sentence case; omit ending punctuation for fragments | Max **60–75 characters**; start with a verb; don't repeat the control name | Offering help |
| Tips | — | 1–2 sentences; for features of ≤ 3 actions; not promotional | Offering help |
| Progress descriptions | — | Avoid vague words like "Loading" or "Authenticating" | Progress indicators |
| App menu name (macOS) | — | 16 characters or fewer | The menu bar |
| Settings window title (single pane, macOS) | — | "App Name Settings" | Settings |

## 4. Do / Don't

**Do**
- Verbs on buttons; specific outcomes ("Delete", "Convert", "Erase").
- One capitalisation style per element type, everywhere.
- Name the problem and the fix in errors; put them next to the field.
- Start flows with "Get Started"/"Continue", end with "Done".
- Use "tap" vs "click" correctly; or "choose".
- Empty states with a next step and a button.

**Don't**
- Don't use "we", "oops", "uh-oh", or "Click here".
- Don't write "Error 329347 occurred" style titles.
- Don't use "OK" for consequential confirmations or "Yes/No" buttons.
- Don't use cute labels instead of clear ones.
- Don't add "Your/My" unless needed; don't mix them.
- Don't describe where a setting lives; link to it.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| W1 | All rules above transfer 1:1 to web copy; they are language rules, not platform rules. | VERIFIED |
| W2 | Use the real ellipsis character "…" (U+2026), not three dots, in menu items and buttons that open dialogs. | Character VERIFIED (Menus page shows "…"); INFERRED as a web rule |
| W3 | Capitalisation default for AISloop (needs owner): Apple apps use Title Case for buttons, menus, tabs, column headings; sentence case for alert messages, tooltips and descriptive text. | VERIFIED Apple practice; adoption open |
| W4 | Web-specific: "Click" is wrong on touch; prefer "Select" / "Choose" in instructions, or adapt per `pointer` type. | INFERRED |
| W5 | Error copy appears inline (`aria-describedby` linked to the field, `aria-invalid="true"`), not in a modal. | Apple VERIFIED; ARIA INFERRED |
| W6 | Placeholder is a hint, not a label: always render a visible `<label>` (Apple: placeholder disappears when typing, so add a separate label). | VERIFIED |
| W7 | Title Case is English-specific; for other languages follow that language's convention (e.g. Turkish uses sentence case). | INFERRED |
| W8 | "Nothing should look generated" (preferences.md) is directly supported by Apple's rules against cute labels, interjections and "we". | VERIFIED + INFERRED link |

## 6. Open questions for the owner

1. **Title Case for buttons/menus (Apple English convention) or sentence case everywhere** (common modern web convention, easier to localise)?
2. Do we prescribe a voice for AISloop examples (neutral, calm) and forbid emoji in UI copy?
3. Should error messages always include a fix, even when the fix is "try again later"?
