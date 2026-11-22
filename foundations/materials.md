# Materials and shadows

## When

Glass (translucent, blurred surfaces) and shadows. Both are for things that sit **above** content, never for content itself.

## Rules

### Glass is for chrome only

- Use glass on: top bars and toolbars, tab bars, floating sidebars, menus, popovers, a floating control over media.
- Never on: content cards, list groups, tiles, tall panels of text, the page background. *(inferred from round 1: glass liked on bars and toolbars, disliked on content tiles and tall panels)*
- Two strengths:

| Material | Tint (light / dark) | Backdrop | Use |
|---|---|---|---|
| `--material-bar` | 72% #fafafc / 72% #262626 | `saturate(180%) blur(20px)` | Bars, toolbars, tab bars |
| `--material-menu` | 82% #f6f6f8 / 82% #393939 | `saturate(180%) blur(40px)` | Menus, popovers, floating sidebars: surfaces that hold more text |

- A sidebar may be glass or flat. Both are fine; choose per project. *(voted: p03 both)*
- Over a dark hero or a photo, give the bar the dark theme (`data-theme="dark"`) instead of light glass. Light glass over dark imagery turns grey and muddy.

### Text on glass

- Keep text on glass at `--color-label`, with monochrome icons. Secondary and accent-coloured text can drop below 4.5:1 when very dark or very bright content passes underneath.
- Keep bars to short primary labels and icons. Long secondary text belongs on an opaque surface.

### Glass turns opaque when it should

Built into the tokens: under `prefers-reduced-transparency: reduce`, under `prefers-contrast: more`, and in browsers without `backdrop-filter`, the materials switch to their solid colours (`--material-bar-solid`, `--material-menu-solid`). Text never sits on an unblurred translucent layer.

### Shadows

Rare and soft on content, stronger only for what floats above everything:

| Token | Use |
|---|---|
| `--shadow-raised` | Rarely: a card that has to lift off the page |
| `--shadow-floating` | Floating controls, small popovers, a window shown on a page |
| `--shadow-overlay` | Menus, sheets, dialogs |
| `--shadow-control-thumb` | The thumb of a segmented control or switch |

- In dark mode floating shadows carry a faint light rim, because a dark shadow can't show an edge on a dark page.
- Increased contrast adds a visible 1px ring to floating surfaces.
- Most content needs no shadow at all: grouped cards sit on the grouped background by colour alone.

## Web translation

```css
.toolbar {
  background: var(--material-bar);
  -webkit-backdrop-filter: var(--material-bar-backdrop);
  backdrop-filter: var(--material-bar-backdrop);
}
```

- Tailwind: `material-bar`, `material-menu`, `shadow-floating`, `shadow-overlay`, `shadow-thumb`.
- A sticky bar needs content scrolling under it to look like glass; at the top of the page, a bar without content behind it may be fully transparent and gain its material on scroll.
- Don't animate `backdrop-filter`. Fade the surface's opacity instead.

## Don't

- Don't make content cards glass, or stack glass on glass.
- Don't fake glass with a white 10% fill and a border on a gradient (the "glassmorphism" card). Real glass needs real content behind it.
- Don't use coloured or glowing shadows.
- Don't give every card a shadow to separate it. Use the background layers.

## Related

[color.md](color.md) · [dark-mode.md](dark-mode.md) · [accessibility.md](accessibility.md) · HIG digest: [materials](../research/hig-digest/materials.md)
