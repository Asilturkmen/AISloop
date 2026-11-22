# Colour

## When

Every surface, text and control. Colour in AISloop is mostly neutral; the accent and the meaningful colours are used sparingly, and only where they carry something.

## Rules

### Use roles, not colours

Use the semantic token for the job. Never a hex value, never a palette colour where a role exists. The roles change with theme, contrast setting and theme islands; hex values don't.

| Job | Tokens |
|---|---|
| Page and surfaces | `--color-bg` (page) · `--color-bg-secondary` (a box on the page) · `--color-bg-tertiary` (a group inside a group) · `--color-bg-grouped` + `--color-bg-grouped-item` (Settings-style grey page with cards) · `--color-bg-elevated` (sheets, popovers, menus) · `--color-bg-sidebar` |
| Text | `--color-label` (primary) · `--color-label-secondary` (passes 4.5:1 everywhere) · `--color-label-tertiary` (disabled or decorative only) · `--color-label-quaternary` (watermark; never information) |
| Lines | `--color-separator` (hairline) · `--color-separator-opaque` · `--color-border-control` (the only outline of a control; 3:1) |
| Control fills and states | `--color-fill` … `--color-fill-quaternary` · `--color-fill-hover` · `--color-fill-selected` · `--color-control-track` + `--color-control-thumb` (segmented controls, switches) |

Labels are black or white at falling opacity, so the same label token works on every layer.

### Accent

- Default accent: **`--color-accent` #0a6ee8** in light, #0070ee in dark. *(voted: r2p02 A, over Apple's brighter #0088ff)* It is slightly deeper than Apple's blue so that white text on it passes 4.5:1.
- **One accent per view**, on the background of the main action (the primary button, a switch that is on, the selected segment of a key control).
- Text in the accent colour (links, a "Back up now" row, an inline action) uses **`--color-accent-text`**, never `--color-accent`. It passes at least 4.5:1 on every layer (5:1 in light, 4.7:1 in dark).
- Hover, pressed, tint and focus ring derive from the accent automatically.
- **Rebranding:** a project may replace the blue. Override `--color-accent` and `--color-accent-text` in all six colour blocks of `tokens.css`: light, dark (twice: the system block and the `data-theme="dark"` block), light increased contrast, dark increased contrast (twice, same reason). Then re-run a contrast check: white on the accent needs 4.5:1, accent text on every layer 4.5:1 (7:1 in increased contrast), and the accent fill as a shape 3:1 against the page and the sidebar. A light accent (yellow, light green) needs dark text on it: set `--color-on-accent` too.

### Amount of colour is a project choice

The owner voted "depends" (p04).

- **Plain** (default): neutrals plus one accent. Right for tools, settings, reading, anything used for hours.
- **Colourful**: add the meaningful colours to small elements that carry meaning: tags, category tiles, calendar events, status dots, chart series, icon tiles in a settings list.
- In both cases colour sits on **small elements**. A large background wash (a tinted page, a gradient header, pastel cards) was disliked every time it appeared. *(inferred from round 1)*

### Meaningful colours

- Nine hues: red, orange, yellow, green, teal, blue, indigo, purple, pink.
- `--color-<hue>` is the fill (a dot, a tile, a bar). `--color-<hue>-text` is the version for text and thin lines. **Never put text in the fill colour.**
- Fixed meanings: red = destructive or error, orange = warning, green = success. Don't use these three for decoration.
- Destructive actions (delete, remove, sign out of everything) use `--color-red-text` as the label: a row in a grouped list, a text button, or a button whose surface is a background layer (`--color-bg-secondary` or `--color-bg-tertiary`), where the `-text` colours are verified. Not on the translucent `--color-fill` tokens (red text on them falls below 4.5:1, worst in dark), and never white text on the red fill (it fails 4.5:1).
- Switches that are on use the accent, not green (one accent per view keeps the screen calm; green stays free for success).
- Colour is never the only signal. Pair it with a label, an icon or a position.

### Selected rows are a project choice

The owner voted "depends" (p06).

- **Grey** (`--color-fill-selected`, default): content lists, multi-select, and any screen where the accent already marks the main action.
- **Accent** (accent fill, `--color-on-accent` for the selected row's text and icon): a single main navigation list (a sidebar) in a focused tool, where the selection is the user's place in the app.
- One style per app.

### Text on photos and video

The image doesn't change with the theme, so these tokens are the same in light and dark:

- `--color-on-media` (white) and `--color-on-media-secondary` (white 86%).
- Behind display-size headlines: at least `--color-media-scrim` (black 45%; white text 3.4:1 over a pure white pixel; large text only).
- Behind body-size text, links and secondary lines: `--color-media-scrim-strong` (black 62%; white 6.2:1, secondary 5.1:1).
- Check against the **brightest pixel under the text**, not the average. A gradient scrim counts only where it reaches the required strength under every line.
- A better crop often beats a stronger scrim: put the text where the image is calm and dark.

## Web translation

- Include `tokens.css`, then use the roles: `color: var(--color-label); background: var(--color-bg-grouped-item);`. Tailwind: `text-label`, `bg-grouped-item`, `bg-accent`, `text-accent-text` (see the preset).
- A gradient scrim for hero text: `linear-gradient(to right, var(--color-media-scrim-strong) 0 40%, transparent 75%)`. Measure where the text actually sits.

## Don't

- Don't use a hex value in component code. If no role fits, add a token with a comment and check its contrast.
- Don't use more than one accent in a view, and don't use a second brand colour as a second accent.
- Don't put an accent-coloured text link where the user acts on something important. Make it a button or a row: an object with a shape and a hit area. *(observed)*
- Don't use a purple-to-blue gradient, glowing borders or coloured shadows as decoration. They say nothing about the product.
- Don't tint the whole page with the brand colour.

## Related

[dark-mode.md](dark-mode.md) · [accessibility.md](accessibility.md) (contrast targets) · [materials.md](materials.md) (text on glass) · contrast results: [tokens-rationale.md §6](../research/02-foundations/tokens-rationale.md#6-contrast-check) · HIG digest: [color](../research/hig-digest/color.md)
