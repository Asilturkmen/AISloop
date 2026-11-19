# Split views (sidebar / list / detail)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Split views | https://developer.apple.com/design/human-interface-guidelines/split-views (JSON `.../split-views.json`) | 2026-11-19 |
| Sidebars, Search fields, Windows, Layout | same base URL | 2026-11-19 |

Change log: 2025-06-09 iOS and iPadOS considerations added.

## 2. Key principles (paraphrased)

- A split view shows **adjacent panes**, typically several levels of hierarchy at once: selecting in the primary pane shows content in the secondary, and optionally a tertiary pane (Mail and Notes: sidebar → list → detail). Rarely, panes hold supplementary tools around a canvas (Keynote: navigator, notes, inspector).
- **Persistently highlight the current selection in every pane** that leads to the detail; it shows how the panes relate.
- Consider **drag and drop between panes**.
- iOS: prefer split views only in **regular width**; in compact width panes become a navigation stack.
- iPadOS: two panes (Mail) or three (Keynote); design for narrow, compact and intermediate window widths so navigation between panes stays logical.
- macOS: panes can be arranged vertically, horizontally or both; dividers can be dragged.
  - Set sensible min/max pane sizes so the divider never disappears.
  - Let people hide panes (e.g. to focus on editing) and offer **several ways to bring them back** (toolbar button, menu command with a keyboard shortcut).
  - **Prefer the thin divider (1 pt).** Thicker only when both sides have strong lines that would hide a thin one.
- Search in split-view apps goes at the **trailing end of the toolbar** (searches across columns while keeping the detail selection visible), or at the top of the sidebar to filter it.
- An inspector usually sits on the trailing side of a split view (Windows page).

Short quote: "Prefer the thin divider style."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Thin divider width | 1 pt | macOS | VERIFIED |
| Panes | 2 or 3 vertical panes | iPadOS | VERIFIED |
| tvOS default pane split | 1/3 primary, 2/3 secondary (or 1/2 + 1/2) | tvOS | VERIFIED |
| **Default pane widths, min/max** | **not given** (only "reasonable") | macOS, iPadOS | — |

## 4. Do / Don't

**Do**
- Highlight the selected item in each pane.
- Collapse to a stack in compact widths.
- Allow hiding panes and restoring them via button and shortcut.
- Use 1 pt dividers; enforce min/max widths.
- Put the cross-column search at the trailing end of the toolbar.

**Don't**
- Don't force multiple panes into an iPhone-width layout.
- Don't let a pane shrink until its divider vanishes.
- Don't use thick dividers by default.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| SV1 | CSS grid: `grid-template-columns: var(--sidebar-w) var(--list-w) 1fr;` with resizable dividers (pointer events) clamped to min/max; panes scroll independently (`overflow: auto` per pane, page itself doesn't scroll). | INFERRED |
| SV2 | Dividers: 1px line in separator colour; a wider invisible hit area (≥ 8px) for dragging; `cursor: col-resize`; keyboard-operable (`role="separator"` with `aria-valuenow`). | 1pt VERIFIED; rest INFERRED |
| SV3 | Compact width: show one pane at a time with Back navigation (stack); keep selection state per level. | VERIFIED principle; implementation INFERRED |
| SV4 | Selection highlight in non-focused panes is quieter (macOS "unemphasized selected content background" for non-key windows) — on the web, a neutral grey highlight in panes without focus, accent highlight in the focused pane. | Colour names VERIFIED; mapping INFERRED |
| SV5 | Each pane may have its own sticky header with a scroll edge effect; keep those headers the same height across panes (Scroll views page). | VERIFIED |
| SV6 | URL should reflect the selection in each pane (deep-linkable) — web-only concern. | INFERRED |

## 6. Open questions for the owner

1. Three-pane (Mail/Notes) as the default "app shell" for content apps, or two-pane (sidebar + content)?
2. Selection colour in unfocused panes: grey (macOS) or accent always (iOS)?
