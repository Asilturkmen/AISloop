# Icons

## When

Interface icons: toolbars, sidebars, tab bars, list rows, buttons, empty states. Not illustrations or app icons.

## Rules

### The set: Phosphor

- Use **[Phosphor](https://phosphoricons.com)** (MIT). It is the open set closest to how SF Symbols works as a system: every icon comes in matching weights, with outline and fill drawn as a pair, and a duotone style for layered emphasis.
- Alternative when a project needs only outlines and more breadth: Lucide with `stroke-width: 1.5`. One set per project, never mixed.
- Never use SF Symbols, Apple's glyphs or Apple product drawings outside [`apple-native/`](../apple-native/). Their licence limits them to apps for Apple platforms.

### Weight and style

| Context | Phosphor style |
|---|---|
| Next to regular or medium text (rows, toolbars, buttons) | `regular` |
| Next to bold titles | `bold` |
| The selected item of a tab bar or sidebar | `fill` |
| Layered emphasis (rare: a feature tile, an empty state) | `duotone` |

- Outline is the default. Fill marks selection; the container decides, not the icon.
- Never use `thin` or `light`.
- One style per context: all toolbar icons regular, all selected tabs fill.

### Size and colour

- Size with `--icon-size-sm`, `--icon-size`, `--icon-size-lg` (18 / 22 / 28 comfortable, 14 / 16 / 20 compact). They follow density.
- Icons take `currentColor`: they inherit the label colour. With grey row selection, sidebar icons may take `--color-accent-text`; on an accent-filled selected row the icon is `--color-on-accent`. A fixed colour (a red trash in a destructive row, coloured tiles in a settings list) only when it carries meaning.

### Where icons belong

- **Toolbars:** icons without borders or circles around them; the bar is the container. Use a text label for actions an icon doesn't express well ("Edit", "Done").
- **Menus:** sparingly, and all-or-none within a group.
- **Lists:** decided by the list type, not by taste. Settings-style navigation lists get leading icons; reading lists and form rows don't.
- **Tab bars:** always an icon plus a short label.
- **Icon-only buttons:** always an accessible name (`aria-label`), and a hit area of at least `--hit-min`.

### Standard actions

Use the familiar metaphor. Phosphor names for Apple's standard action symbols:

| Action | Phosphor | Action | Phosphor |
|---|---|---|---|
| Share / Export | `export` | More | `dots-three` |
| Add | `plus` | Delete | `trash` |
| Done / Save | `check` | Cancel / Close | `x` |
| Search | `magnifying-glass` | Filter | `funnel-simple` |
| Settings | `gear` | Account | `user-circle` |
| Compose | `note-pencil` | Rename / Edit | `pencil-simple` |
| Copy / Duplicate | `copy` | Paste | `clipboard-text` |
| Cut | `scissors` | Attach | `paperclip` |
| Undo / Redo | `arrow-u-up-left` / `arrow-u-up-right` | Select | `check-circle` |
| Folder / Move to | `folder` | Archive | `archive` |
| Print | `printer` | Calendar | `calendar-blank` |
| Like / Dislike | `thumbs-up` / `thumbs-down` | Alarm | `alarm` |
| Bold / Italic / Underline | `text-b` / `text-italic` / `text-underline` | Align left | `text-align-left` |
| File (generic) | `file` | PDF / Image / Archive / Document | `file-pdf` / `file-image` / `file-zip` / `file-doc` |

## Web translation

- Inline SVG from `@phosphor-icons/core`, the web font from `@phosphor-icons/web` (`<i class="ph ph-gear">`, `<i class="ph-fill ph-gear">`), or the framework package. Pin the version.
- For production or offline use, self-host: install the package and serve its files, or inline the SVGs you use. A CDN link (as in the example page) is fine for prototypes.
- Decorative icons next to a text label: `aria-hidden="true"`. Icon-only controls: a label on the control, not on the icon.
- Line icons up with text by their optical centre: `display: inline-flex; align-items: center; gap: var(--space-8);`.

## Don't

- Don't use emoji as interface icons.
- Don't put icons on every heading, card or bullet to fill space.
- Don't draw a circle or a tinted square behind toolbar icons.
- Don't mix icon sets, or outline and fill in the same row of controls, except fill for the selected item.

## Related

[color.md](color.md) · [layout-and-spacing.md](layout-and-spacing.md) (sizes) · [accessibility.md](accessibility.md) · set comparison: [tokens-rationale.md §7](../research/02-foundations/tokens-rationale.md#7-icon-set-recommendation) · HIG digest: [icons-and-symbols](../research/hig-digest/icons-and-symbols.md)
