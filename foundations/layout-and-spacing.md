# Layout and spacing

## When

Every layout decision: how dense a screen is, how far apart things sit, how wide content runs, what happens on a phone.

## Rules

### Density

Two presets. A project picks one for its app UI and sets it once on `<html>`. *(voted: p01 depends)*

| | Comfortable (default) | Compact |
|---|---|---|
| Set with | no attribute, or `data-density="comfortable"` | `data-density="compact"` |
| Follows | iOS / iPadOS | macOS, Apple's desktop web apps |
| Body text | 17px | 13px |
| Control height | 44px | 28px |
| List row | 52px | 32px |
| Minimum hit area | 44px | 24px (44px on touch) |
| Right for | anything used on phones or with touch, consumer apps, settings, reading, forms | dense desktop tools used with a mouse for long sessions: editors, inspectors, data tables, mail, admin panels with a lot on screen |

- When unsure, use comfortable. It works at every width and survives 200% zoom.
- Dense is welcome when the hierarchy stays clear. Dense is wrong when lines run into each other. *(voted: a crowded mail list disliked; inferred: dense pro screens were liked)*
- `data-density` also works on one element, e.g. a compact inspector inside a comfortable app.
- **Landing and product pages are always comfortable.** When a landing page shows the app, show it at comfortable size, or as a real screenshot at a readable scale. A compact screen shrunk inside a big marketing page looks small and cramped. *(inferred from r2i02: the compact version of the example page was disliked)*
- On touch screens compact rows and hit areas grow to 44px automatically, and input text stays at 16px or more so iOS Safari doesn't zoom.

### Spacing scale

- One scale: `--space-2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80` (px). Every margin, padding and gap comes from it.
- Measured off-scale values (macOS row padding 10px) exist only inside the density tokens. Don't invent others.
- Component spacing follows density; use these instead of raw steps:

| Token | Comfortable | Compact | Use |
|---|---|---|---|
| `--pad-row-x` | 16 | 10 | Row side padding, separator inset |
| `--pad-row-y` | 9 | 4 (10 on touch) | Row vertical padding; keeps rows exactly on height |
| `--pad-group` | 16 | 10 | Inside a grouped card |
| `--pad-panel` | 20 | 20 | Inside a pane or sheet |
| `--gap-group` | 32 | 12 | Between grouped cards |
| `--gap-control` / `--gap-borderless` | 12 / 24 | 12 / 24 | Around bordered / borderless controls |

- Group by space first, then by a surface, and only then by a line. Related things sit closer than unrelated ones.
- Landing pages breathe: sections are separated by `--space-64` to `--space-80` (`--space-48` on a phone), a headline sits `--space-16` to `--space-24` above its lead.

### Page width and gutters

- Side gutter: `--gutter`, fluid from 16px on a phone to 40px from 1000px wide. It follows width, not density.
- Content widths: `--width-content-narrow` (692px) for reading and forms, `--width-content` (980px) for most pages, `--width-content-wide` (1180px) for wide grids. Centre the column.
- Paragraphs never run wider than `--width-prose` (68ch).

### Sizes

`--bar-height` 52px in both densities. Sidebar 280 / 220px, inspector 320 / 260px (comfortable / compact). Icons `--icon-size-sm`, `--icon-size`, `--icon-size-lg`. Switches `--switch-width` × `--switch-height`. Rows `--row-height-dense`, `--row-height`, `--row-height-2line`, `--row-height-sidebar`, `--row-height-menu`.

### Narrow screens

- One main layout switch at about **700px** (our choice, used by the example page; Apple's web apps use 484, 1000 and 1260px): below it, a sidebar collapses into the list it navigates (or a back-navigation stack), multi-column content becomes one column, and a split hero stacks (text first, image after).
- Above 1000px the gutter stops growing; the content column, not the page, sets the width.
- Test at 320, 390, 768, 1024 and 1440px. Nothing may scroll sideways, and no text may be clipped.

## Web translation

- Gaps, not margins, between siblings: `display: grid` or `flex` with `gap: var(--gap-group)`.
- Rows: `min-height: var(--row-height); padding: var(--pad-row-y) var(--pad-row-x);`. Text wraps; the row grows.
- A page column: `width: min(100% - 2 * var(--gutter), var(--width-content)); margin-inline: auto;`.
- Custom properties can't be used inside media queries; write `@media (max-width: 700px)` literally.
- Tailwind: `px-gutter`, `gap-groups`, `px-row-x py-row-y`, `p-group`, `max-w-content`, `h-row`, `min-h-hit`. Mind the plural: the gap between cards (`--gap-group`) is `gap-groups`; `gap-group` also exists but means `--pad-group` (16px, not 32). Likewise `gap-controls` is `--gap-control`.

## Don't

- Don't mix densities within one app screen, except a deliberately compact panel.
- Don't use a compact screen as the showcase on a landing page.
- Don't space by eye. If two gaps look the same, they must be the same token.
- Don't fill space with cards for the sake of it. Empty space is part of the design.
- Don't set fixed heights on anything that holds text.

## Related

[typography.md](typography.md) · [radii.md](radii.md) · [accessibility.md](accessibility.md) (hit sizes) · HIG digest: [layout](../research/hig-digest/layout.md), [lists-and-tables](../research/hig-digest/lists-and-tables.md)
