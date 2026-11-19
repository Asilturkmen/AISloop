# Sidebars

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Sidebars | https://developer.apple.com/design/human-interface-guidelines/sidebars (JSON `.../sidebars.json`) | 2026-11-19 |
| Color › App accent colors (macOS) | https://developer.apple.com/design/human-interface-guidelines/color | 2026-11-19 |
| Search fields (search at top of sidebar) | https://developer.apple.com/design/human-interface-guidelines/search-fields | 2026-11-19 |

Change log: **2026-06-08** (sidebar icon colour guidance updated; adaptable sidebar style clarified).

## 2. Key principles (paraphrased)

- A sidebar sits on the **leading side** and navigates between app areas or top-level collections (folders, playlists). It needs a lot of space; on narrow layouts a tab bar is often better, and iOS/iPadOS offer a tab bar that converts into a sidebar.
- In iOS, iPadOS and macOS the sidebar **floats in the Liquid Glass layer** above content; rich content can extend beneath it (by horizontal scrolling or a mirrored "background extension").
- **Let people customise** which items appear and their order, where possible.
- **Hierarchy: no more than two levels.** Use disclosure controls to keep long lists short; when hierarchy is deeper, add a middle content list (split view: sidebar → list → detail).
- Two-level sidebars need short, descriptive group titles (drop unnecessary words).
- **Icons:** familiar symbols; custom ones as vector symbols, not bitmaps. By default sidebar icons use the **app accent colour**; on macOS the user's accent choice must apply to them. Fixed colours are fine **sparingly**, when they carry meaning (Mail's yellow VIP).
- **Hiding:** let people hide/show the sidebar with familiar means (edge swipe on iPad; button and View-menu commands on Mac); **don't hide it by default** (discoverability). macOS may auto-collapse it when the window gets small.
- macOS: row height, text and icon size follow the user's sidebar size setting (small/medium/large). Don't put critical items at the **bottom** of a sidebar.
- iOS/iPadOS: consider a tab bar first; it leaves more room for content.
- A search field at the top of the sidebar is the pattern for filtering sidebar content (Settings).

Short quote: "In general, show no more than two levels of hierarchy in a sidebar."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Max hierarchy levels | 2 | all | VERIFIED |
| Size settings | small / medium / large (user-selectable) | macOS | VERIFIED |
| **Sidebar width, row height, icon size, padding** | **not given** | all | — |

## 4. Do / Don't

**Do**
- Leading-edge sidebar for top-level areas; ≤ 2 levels.
- Accent-coloured (or monochrome) symbols; a fixed colour only when meaningful.
- Let people collapse it; restore with a button and a keyboard shortcut.
- Allow customisation of items/order where useful.
- Put search at the top if the sidebar can be filtered.

**Don't**
- Don't hide the sidebar by default on wide layouts.
- Don't nest deeper than two levels; use a list column instead.
- Don't use bitmap icons; don't colour every icon differently without meaning.
- Don't put important actions at the bottom.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| SB1 | `<nav aria-label="…">` on the inline-start side; collapsible groups via `<details>` or `aria-expanded` buttons; max 2 levels. | VERIFIED rule; HTML INFERRED |
| SB2 | Selected item: accent-tinted background or accent text + `aria-current="page"`; persistent highlight (Split views). | VERIFIED behaviour; ARIA INFERRED |
| SB3 | Width: Apple gives none. Candidate 220–280px, user-resizable on desktop with min/max (INFERRED). | INFERRED |
| SB4 | Collapse: toggle button in the top bar (leading side) + keyboard shortcut (Apple's Mac apps use a View-menu command; a common web choice is Ctrl/⌘+\ or ⌘+⌥+S; INFERRED). Remember state in `localStorage`. | INFERRED |
| SB5 | Below the regular breakpoint, the sidebar becomes a tab bar (≤ 5 items) or an overlay drawer; same destinations at all sizes. | VERIFIED principle (Layout/Tab bars); mapping INFERRED |
| SB6 | Material: on the web, a sidebar is usually a solid surface (grouped/secondary background). A floating translucent sidebar over full-bleed content (Maps style) is the only case for glass. | VERIFIED (glass for nav layer); web choice INFERRED |
| SB7 | Section headers in sidebars: small, secondary-label colour (Apple apps), not large titles. | INFERRED (observed convention, not stated) |

## 6. Open questions for the owner

1. Sidebar surface: solid tinted panel (Finder/Notes) or floating glass panel over content (iPadOS 26/Maps)?
2. Sidebar icons: accent-tinted, monochrome, or coloured tiles?
3. Sidebar width and whether it's resizable by drag.
