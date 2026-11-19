# Search fields

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Search fields | https://developer.apple.com/design/human-interface-guidelines/search-fields (JSON `.../search-fields.json`) | 2026-11-19 |
| Searching (in-app and system-wide search) | https://developer.apple.com/design/human-interface-guidelines/searching | 2026-11-19 |
| Token fields (macOS tokens) | https://developer.apple.com/design/human-interface-guidelines/token-fields | 2026-11-19 |

Searching page change log: 2026-06-08.

Change log: **2026-06-08** (terminology; search-as-a-tab guidance on iOS refined).

## 2. Key principles (paraphrased)

- A search field is an editable field with a search (magnifier) icon, a Clear button and placeholder text.
- **Placeholder text says what can be searched** (scope or content type).
- **Search as people type** when possible; results refine continuously.
- **Suggestions:** recent searches before typing, predictions while typing.
- **Simplify results:** most relevant first; group into categories when helpful.
- **Filtering:** a *scope bar* switches between clearly defined categories (default to the broader scope, let people narrow); *tokens* turn a term into an editable chip that filters further; pair tokens with suggestions so people learn them.
- From Searching: if search matters, give it a **prominent, primary position**; aim for **one clearly identified place** to search the whole app (local filters per section are fine in addition); **always show the current scope** (placeholder, scope bar or title); **search history is private** — show it only where others won't see it, and offer a way to clear it.
- From Token fields (macOS): a typed comma turns text into a token by default (Return can be added); tokens can carry a context menu; suggestions can appear after a short delay rather than instantly, so they don't distract while typing.

**Placement**
- *iOS* has three entry points:
  - **As a tab:** "standard" search tab (opens a search landing page with suggestions and categories; good for exploration, e.g. TV) or "button appearance" (separate trailing button that opens the keyboard immediately; good for quick lookups, returns to the previous tab after).
  - **In a toolbar:** bottom toolbar preferred when there's room (Settings, Mail, Notes); top toolbar when content at the bottom must stay visible (Wallet). It animates into a field above the keyboard.
  - **Inline** above the list it filters, when the search clearly belongs to that content (Music library); can pin to the top bar while scrolling.
- *iPadOS/macOS* (keep both consistent):
  - **Trailing end of the toolbar** for most apps, especially split views (Mail, Notes, Voice Memos) and when results appear in the detail area (Freeform).
  - **Top of the sidebar** when it filters the sidebar (Settings).
  - **A sidebar item or tab** when search is a discovery area with rich suggestions (Music, TV); focus the field immediately on arrival, except on iPad with only a virtual keyboard.
  - In compact widths, keep search above the content list column (Notes, Mail).

Short quote: "If possible, start search immediately when a person types."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Parts | magnifier icon, placeholder, Clear button (+ optional scope bar, tokens) | all | VERIFIED |
| Standard search icon | `magnifyingglass` | all | VERIFIED (Icons) |
| **Field height, corner radius, width** | **not given** | all | — |

## 4. Do / Don't

**Do**
- Placeholder that names the scope ("Search Mail" style).
- Live results; recent searches and suggestions.
- Scope bar for a few clear categories; default to the broadest.
- Trailing-toolbar placement on wide layouts; top of sidebar to filter navigation.
- Clear button whenever text is present.

**Don't**
- Don't require pressing Enter if live search is feasible.
- Don't start with a narrow scope.
- Don't auto-focus the field when that would cover content with a virtual keyboard.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| SF1 | `<input type="search">` inside `role="search"` (or `<search>` element); leading magnifier icon, trailing clear button (hide WebKit's native cancel button if drawing your own, or keep the native one consistently). | INFERRED |
| SF2 | Debounced live search (e.g. 150–250 ms; INFERRED); show recent searches on focus when empty. | Behaviour VERIFIED; timing INFERRED |
| SF3 | Placement by layout: regular width → trailing end of top bar or top of sidebar; compact width → top of the list or a search tab/bottom field. | VERIFIED |
| SF4 | Scope bar = segmented control under the field (see `segmented-controls.md`); tokens = removable chips inside the field (`role="listbox"`/`option` for suggestions, `aria-activedescendant` for keyboard). | Pattern VERIFIED; ARIA INFERRED |
| SF5 | Keyboard: ⌘/Ctrl+F for in-view find vs a global shortcut (⌘K style) for app search; Apple doesn't prescribe ⌘K. | INFERRED |
| SF6 | Field shape: Apple's fields are rounded (capsule in iOS 26); no radius given. | INFERRED |

## 6. Open questions for the owner

1. Default search location for desktop web apps: trailing toolbar (Mail) or top of sidebar (Settings)?
2. Command palette (⌘K, Raycast-like) — in or out of the AISloop vocabulary? Apple apps don't have one.
