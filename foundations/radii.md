# Radii

## When

Every rounded shape: controls, rows, cards, menus, sheets, images.

## Rules

### Scale

`--radius-xs` 4 · `--radius-sm` 6 · `--radius-md` 8 · `--radius-lg` 12 · `--radius-xl` 16 · `--radius-2xl` 20 · `--radius-3xl` 26 · `--radius-4xl` 38 · `--radius-full` (capsule, circle). Measured on Apple's apps and web apps; the `:not()` in the override below keeps a compact page at 12px.

### Use the role, not the size

Roles change with density, so a component keeps the right shape in both. Values marked inferred were not measured on Apple's apps; everything else was.

| Role | Comfortable | Compact | Use |
|---|---|---|---|
| `--radius-control` | capsule | 8 | Buttons, fields, chips |
| `--radius-selection` | 20 | 8 | A selected row or sidebar item |
| `--radius-group` | 26 | 12 | An inset-grouped card, a settings box, a window shown on a page |
| `--radius-menu` | 20 (inferred) | 12 | Menus |
| `--radius-popover` | 26 (inferred) | 20 | Popovers |
| `--radius-sheet` | 38 | 26 | Sheets, dialogs |

### Card radius is a project choice

The owner voted "depends" on 26px against 16px for comfortable cards. *(voted: r2p05)*

- **26px** (default): touch-first and phone-first app screens, settings, consumer products. The iOS look.
- **16px** (`--radius-xl`): desktop-first web apps, cards in a grid next to images or charts, dense or sober professional tools.
- Compact density is always 12px.

To use 16px, after `tokens.css`:

```css
:root:not([data-density="compact"]), [data-density="comfortable"] { --radius-group: var(--radius-xl); }
```

One radius per role across the whole app.

### Nested shapes are concentric

A shape inside another, with padding between them, uses

```
inner radius = max(outer radius − padding, --radius-min)
```

e.g. `border-radius: max(calc(var(--radius-group) - var(--space-8)), var(--radius-min));`. `--radius-min` is 6px: deep nesting never gets sharper than that. Capsules stay capsules.

### Images

- An image inside a card follows the concentric rule. A standalone image or thumbnail uses `--radius-md` to `--radius-xl` by size; small artwork `--radius-xs`.
- A full-bleed hero image has no radius.

## Web translation

- `border-radius: var(--radius-group);` Tailwind: `rounded-group`, `rounded-control`, `rounded-selection`, `rounded-menu`, `rounded-sheet`.
- Clip children to a rounded card with `overflow: clip` (or round the first and last row), so row hover and selection don't poke out of the corners.

## Don't

- Don't give unrelated components the same radius by habit (everything 8px, or everything 24px). Use the role.
- Don't put a large radius on a small element (a 26px radius on a 32px row) or a sharp corner inside a round one.
- Don't use a squircle or corner-smoothing library to imitate Apple's shape. Plain `border-radius` is honest and consistent.
- Don't mix 26px and 16px cards in one app.

## Related

[layout-and-spacing.md](layout-and-spacing.md) · [materials.md](materials.md) · measurements: [tokens-rationale.md §5.4](../research/02-foundations/tokens-rationale.md#54-radii)
