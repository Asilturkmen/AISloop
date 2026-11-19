# Tab bars (and macOS tab views)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Tab bars | https://developer.apple.com/design/human-interface-guidelines/tab-bars (JSON `.../tab-bars.json`) | 2026-11-19 |
| Tab views (macOS, watchOS) | https://developer.apple.com/design/human-interface-guidelines/tab-views | 2026-11-19 |
| Search fields › Search as a tab | https://developer.apple.com/design/human-interface-guidelines/search-fields | 2026-11-19 |
| Segmented controls (alternative inside a view) | https://developer.apple.com/design/human-interface-guidelines/segmented-controls | 2026-11-19 |

Change log: Tab bars **2026-06-08** (terminology and art). Tab views 2023-06-05.

## 2. Key principles (paraphrased)

**Tab bars (app-level navigation)**
- **Navigation, not actions.** Tabs switch between top-level sections and keep each section's navigation state. Actions on the current view belong in a toolbar.
- **Always visible** across sections (except when a modal covers it); hiding it makes people lose their place.
- **Few tabs**; weigh each one. For complex apps use a sidebar or the tab bar that converts into a sidebar.
- **Avoid the overflow "More" tab** (iOS turns the last tab into More when space runs out; hidden tabs are hard to find).
- **Never disable or hide a tab** when its content is unavailable; show the section and explain why it's empty.
- **Every tab has a label** (single word if possible) and preferably a **filled** symbol. Icons sit above labels in compact width, beside them in regular width.
- **Badges** (red oval, white number or "!") only for critical new information.
- Over colourful content, keep tab labels **monochrome** or pick a clearly different accent.
- **iOS:** the tab bar floats at the bottom on Liquid Glass; it can minimise on scroll when it has an accessory (Music's MiniPlayer); a dedicated **search tab** can sit at the trailing end.
- **iPadOS:** the tab bar sits **near the top**; can be fixed or convertible to a sidebar; can share the top row with a toolbar. If people can customise tabs, keep the default at **five or fewer**.
- **visionOS:** always vertical on the leading side; expands on gaze.

**Tab views (macOS, inside a window)**
- For closely related panes in one area; controls in a pane affect only that pane.
- Noun labels, title case; don't switch tabs with a pop-up button (two clicks, hidden choices) unless there are too many panes.
- **No more than six tabs.** Inset the tab view with window margin on all sides.
- iOS/iPadOS equivalent: a segmented control.

Short quote: "Use a tab bar to support navigation, not to provide actions."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Default customisable tab count | five or fewer | iPadOS | VERIFIED |
| macOS tab view max tabs | avoid more than six | macOS | VERIFIED |
| Tab label length | single word when possible | all | VERIFIED |
| Badge | red oval, white text, number or "!" | iOS, iPadOS | VERIFIED |
| tvOS tab bar | 68 pt tall, top edge 46 pt from screen top (fixed) | tvOS | VERIFIED |
| **iOS tab bar height, icon size, label size** | **not given** (icon dimensions deferred to Apple Design Resources) | iOS | — |

## 4. Do / Don't

**Do**
- Use tabs for top-level navigation only; keep them visible.
- Label every tab; prefer filled icons.
- Explain empty sections instead of disabling tabs.
- Use badges only for critical items.
- iPad/desktop: tabs at top or convert to a sidebar.

**Don't**
- Don't put actions (Compose, Add) in the tab bar.
- Don't hide the tab bar during navigation.
- Don't create a "More" overflow tab if avoidable.
- Don't colour tab labels like the content behind them.
- Don't exceed six tabs in a macOS tab view.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| TB1 | Compact width (phone): fixed bottom `<nav>` with 3–5 items, icon above label, `padding-bottom: env(safe-area-inset-bottom)`; items ≥ 44px tall. | Bottom placement and icon-above-label VERIFIED; item count (Apple only says "fewer is easier"; ≤ 5 is the iPadOS customisation default) and sizes INFERRED |
| TB2 | Regular width: move navigation to a top tab row (iPadOS) or a sidebar (macOS-like web apps). Same destinations. | VERIFIED |
| TB3 | Semantics: navigation tabs are **links** (`<a aria-current="page">`) inside `<nav>`, not ARIA `role="tablist"` (that role is for in-page panels, i.e. Apple's tab views / segmented controls). | INFERRED |
| TB4 | In-page panels (macOS tab view / iOS segmented control): `role="tablist"` + `role="tab"` + `role="tabpanel"`, ≤ 6 tabs. | Limits VERIFIED; ARIA INFERRED |
| TB5 | Selected tab: filled icon + accent label; unselected: outline/monochrome secondary label. | VERIFIED (filled symbols; monochrome over colour); mapping INFERRED |
| TB6 | Floating glass tab bar (iOS 26 look) on the web = rounded, inset, `backdrop-filter` bar; optional. A full-width solid bar is the conservative alternative. | INFERRED |
| TB7 | Badges: small red pill with white count; use `aria-label` like "Inbox, 3 unread". | Visual VERIFIED; ARIA INFERRED |
| TB8 | Don't hide the bottom bar on scroll unless there's a minimise affordance (Apple only minimises when an accessory is attached). | VERIFIED |

## 6. Open questions for the owner

1. On phone-width web: bottom tab bar (iOS) or top bar + hamburger/drawer (common web)? Apple strongly favours the bottom tab bar.
2. Floating rounded glass tab bar (iOS 26) or classic full-width bar?
3. Should a search tab be part of the pattern?
