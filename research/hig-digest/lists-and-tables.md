# Lists and tables (incl. outline views, disclosure controls)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Lists and tables | https://developer.apple.com/design/human-interface-guidelines/lists-and-tables (JSON `.../lists-and-tables.json`) | 2026-11-19 |
| Outline views | https://developer.apple.com/design/human-interface-guidelines/outline-views | 2026-11-19 |
| Disclosure controls | https://developer.apple.com/design/human-interface-guidelines/disclosure-controls | 2026-11-19 |
| Color (grouped backgrounds, macOS alternating rows), Accessibility (swipe alternatives), Toggles (switches in rows) | same base URL | 2026-11-19 |

Change log of Lists and tables: last change 2023-06-21 (visionOS). The page is short and stable.

## 2. Key principles (paraphrased)

- **Text belongs in lists.** Rows make text easy to scan; switch to a collection only for items of very different sizes or many images.
- Lists can express the whole information hierarchy (iOS Settings is a hierarchy of lists); Mail on iPad/Mac uses a table inside a split view.
- **Editing:** let people reorder when it makes sense, even if they can't add/remove. On iOS/iPadOS, selecting multiple rows requires an edit mode.
- **Selection feedback depends on purpose:** a navigation list keeps the selected row highlighted (shows the path); an options list flashes the row briefly and then shows a checkmark.
- **Content:** short row text; for long items show titles only and open details elsewhere. When narrow, a **middle ellipsis** can keep both start and end readable. Multicolumn tables need noun-phrase column headings (title case, no punctuation); single-column lists without headings need a label or header for context.
- **Styles:** iOS/iPadOS *grouped* style separates groups with headers, footers and extra space; macOS *bordered* style uses **alternating row backgrounds** for large tables; built-in row layouts (leading image + label etc.) exist.
- **iOS accessories:** the info button (detail disclosure) only reveals details about the row; to drill down into a hierarchy use the **disclosure indicator** (chevron). Don't combine a trailing index (A–Z) with trailing accessories.
- **macOS tables:** click a column heading to sort; click again to reverse; resizable columns; alternating row colours help in wide tables; use an outline view for hierarchical data.
- **Outline views (macOS):** hierarchy only in the first column; other columns show attributes; always headings in multi-column outlines; sortable headings sort within each level; Option-click expands all; remember expansion state; consider a toolbar search field for long outlines.
- **Disclosure triangles:** point toward the content (inward from leading edge) when collapsed, down when expanded; give them a descriptive label ("Advanced Options"). **Disclosure buttons:** point down when collapsed, up when expanded; place next to what they reveal; at most one per view. Put the most-used controls at the top of the disclosure hierarchy, advanced ones hidden.
- **Switches** belong in list rows (iOS) and need no separate label there; outside lists use a toggle-style button (see `toggles.md`).
- **Swipe-to-delete needs an on-screen alternative** (Edit mode with delete buttons).

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| **Row height** | **not given** (Apple only says sidebar row height depends on the small/medium/large sidebar size setting on macOS) | iOS, macOS | — |
| **Separator thickness / inset** | **not given** | — | — |
| **Grouped list corner radius / side inset** | **not given** | iOS | — |
| Background colours for grouped lists | use systemGroupedBackground / secondary / tertiary (names only) | iOS | VERIFIED (Color page) |
| macOS alternating row colours | `alternatingContentBackgroundColors` (name only) | macOS | VERIFIED |
| Hit target for a row on iOS | ≥ 44 pt (general control minimum) | iOS | VERIFIED (Accessibility) |
| Middle-ellipsis truncation | recommended for narrow tables | all | VERIFIED |

## 4. Do / Don't

**Do**
- Use lists/tables for text; collections for images.
- Persistently highlight the selected row in navigation lists; checkmark for chosen options.
- Use a chevron for drill-down, info button only for details.
- Grouped style with headers/footers for settings-like content (iOS).
- Sortable, resizable columns; alternating rows in wide tables (macOS).
- Hierarchy in the first column only (outlines); remember expansion.
- Middle-truncate long names in narrow columns.

**Don't**
- Don't put long text in rows; link to a detail view.
- Don't use the info button for navigation.
- Don't put an A–Z index next to trailing accessories.
- Don't hide hierarchy in a table; use an outline.
- Don't put more than one disclosure button in a view.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| LT1 | Real semantics: `<ul>/<li>` for simple lists, `<table>` for multi-column data (with `<th scope="col">` and `aria-sort` on sortable headers), `role="tree"` only for real outlines. | INFERRED |
| LT2 | Two list styles as components: **inset grouped** (iOS Settings: sections on a grouped background, rounded section containers, headers above in secondary label colour, footers below) and **plain/bordered** (macOS: full-width rows, optional zebra striping). All dimensions INFERRED (Apple gives none). | Styles VERIFIED; sizes INFERRED |
| LT3 | Row hit height: ≥ 44px on `pointer: coarse`; on desktop dense tables, rows may be ~24–28px tall (macOS 28 pt default control size; INFERRED for rows). | INFERRED |
| LT4 | Selection: navigation list → persistent highlight (`aria-current="page"` or `aria-selected`) with accent background; option list → checkmark on the trailing side. | VERIFIED behaviour; ARIA INFERRED |
| LT5 | Drill-down rows show a trailing chevron and the whole row is the link (object with clear hit area; matches `preferences.md`). | VERIFIED + preference |
| LT6 | Truncation: CSS has no middle ellipsis; do it in JS or keep start+end visible by splitting the string. Default `text-overflow: ellipsis` is end-truncation only. | INFERRED |
| LT7 | Sortable headers: click toggles asc/desc; show direction with a small chevron; keyboard accessible (header is a `<button>`). | VERIFIED behaviour; HTML INFERRED |
| LT8 | Column resize handles on desktop tables (`resize` or pointer events); hide on touch. | INFERRED |
| LT9 | Disclosure: `<details>/<summary>` with a triangle that rotates from leading-pointing to down; label says what it reveals. In RTL, the collapsed triangle points left. | VERIFIED behaviour; HTML INFERRED |
| LT10 | Swipe actions on mobile web are optional; every swipe action must also exist in a visible button or a context/more menu. | VERIFIED |

## 6. Open questions for the owner

1. Default list look: **inset grouped (iOS Settings)** or **plain full-width rows with hairlines (Mail/Finder)**?
2. Zebra striping for data tables: yes (macOS bordered style) or hairline separators only?
3. Row density: 44px everywhere, or 44px touch / ~28–32px desktop?
4. Leading icons in rows: allowed for navigation lists only, or never? (Links to icons question.)
