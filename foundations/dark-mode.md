# Dark mode

## When

Every project supports light and dark. Dark is designed with the same care as light, not inverted at the end. *(dark screens were liked across platforms in round 1)*

## Rules

### Follow the system

- By default the page follows `prefers-color-scheme`. A project may add a toggle; it sets `data-theme="light"` or `data-theme="dark"` on `<html>`.
- Never ship light-only. If a screen hasn't been checked in dark, it isn't done.

### The base is dark grey, not black *(voted: r2p03 A)*

The dark ladder, each layer one even step lighter (elevated surfaces get brighter in dark mode, as on Apple platforms):

| Layer | Token | Dark |
|---|---|---|
| Page, grouped page | `--color-bg`, `--color-bg-grouped` | #1f1f1f |
| Sidebar | `--color-bg-sidebar` | #282828 |
| Box on the page, grouped card | `--color-bg-secondary`, `--color-bg-grouped-item` | #303030 |
| Sheet, popover, menu, dialog | `--color-bg-elevated` | #393939 |
| Group inside a group | `--color-bg-tertiary` | #424242 |

- Neighbouring layers differ by about 1.12–1.15:1, enough to tell a window, its sidebar and the frame around it apart on a normal laptop panel.
- **Only go lighter as you go up.** Never put `--color-bg` or `--color-bg-grouped` inside `--color-bg-secondary`: a darker surface inside a lighter one reads as a hole.
- Inside an elevated surface, nest groups with `--color-bg-tertiary`.
- Pure black (#000) is not the default. A project may choose it for a reason it can name (an OLED-first media app); then the whole ladder shifts down by the same steps, and the contrast check is re-run.

### What changes in dark, and what doesn't

- Changes automatically: every background, label, separator, fill, accent (#0070ee, text #77b6fe), meaningful colour, glass tint and shadow.
- Shadows can't separate surfaces on a dark page. Floating surfaces get a faint light rim (built into `--shadow-floating` and `--shadow-overlay`); layers are separated by the ladder.
- Doesn't change: images, and text on images (`--color-on-media`, scrims). A photo is the same photo in both themes.
- Logos and illustrations drawn for light backgrounds need a dark version, or a container that keeps them on light.

### Theme islands

- `data-theme="dark"` (or `"light"`) works on any element: a dark nav over a dark hero inside a light page, a dark media band, a light card in a dark page. Give the island its own background.
- Inside the island every token resolves as in the full theme, including accent hover, glass and text colour.
- Use an island when the content under it is dark by nature (a photo, a video). Don't use islands to make a light page look edgy.

## Web translation

- Include `tokens.css`; nothing else is needed for the system theme.
- A toggle: `document.documentElement.dataset.theme = 'dark'`. Store the choice only as a viewer convenience, and fall back to the system.
- `color-scheme` is set by the tokens, so form controls and scrollbars follow the theme.
- Images that must change: `<picture><source srcset="dark.png" media="(prefers-color-scheme: dark)"><img src="light.png" alt="…"></picture>`.

## Don't

- Don't invert the light design or use `filter: invert()`.
- Don't use pure white text on the dark page for long reading. `--color-label` is white at 92%.
- Don't use saturated light-mode colours as text in dark. Use the `-text` tokens, which are lightened for dark layers.
- Don't rely on a shadow alone to show that something floats in dark.

## Related

[color.md](color.md) · [materials.md](materials.md) · [accessibility.md](accessibility.md) · HIG digest: [dark-mode](../research/hig-digest/dark-mode.md)
