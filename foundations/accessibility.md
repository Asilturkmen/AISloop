# Accessibility

## When

Always. Accessibility is part of the Apple feel: Apple's own software respects text size, contrast, motion and transparency settings. AISloop targets **WCAG 2.2 AA**, and goes further wherever Apple's own thresholds are looser.

## Rules

### Contrast

| What | Minimum | Token that guarantees it |
|---|---|---|
| Body text | 4.5:1 | `--color-label`, `--color-label-secondary` on every layer |
| Primary label | 7:1 (HIG target) | `--color-label` |
| Large text (24px+, or 19px+ bold) and UI parts (control outlines, focus ring, icons that carry meaning) | 3:1 | `--color-border-control`, `--color-focus-ring` |
| Accent-coloured text and links | 4.5:1 | `--color-accent-text` |
| White text on the accent | 4.5:1 | `--color-accent` + `--color-on-accent` |
| Coloured text | 4.5:1 (7:1 in increased contrast) | `--color-<hue>-text` |
| Disabled or decorative text | 3:1 | `--color-label-tertiary` (never for information) |
| Body-size text on an image | 4.5:1 against the brightest pixel under it | `--color-media-scrim-strong` |
| Display headline on an image | 3:1 against the brightest pixel under it | `--color-media-scrim` |

Every token pair above is checked in light, dark and both increased-contrast modes ([tokens-rationale.md §6](../research/02-foundations/tokens-rationale.md#6-contrast-check)). If you add or override a colour, check it again.

### User settings, all built into the tokens

| Setting | What happens |
|---|---|
| `prefers-color-scheme` | Light or dark theme |
| `prefers-contrast: more` | Stronger labels and lines, accent and coloured text to 7:1, rims on floating surfaces, opaque glass |
| `prefers-reduced-transparency` | Opaque glass |
| `prefers-reduced-motion` | No movement, shorter durations, fades only |
| `pointer: coarse` | 44px hit areas and rows in every density, 16px input text |
| Browser text size and zoom | All type in rem; layouts reflow up to 200% zoom and at 320px width |

Your own CSS must not undo these: no px font sizes, no fixed heights on text, no animations outside the motion tokens.

### Hit areas

- At least `--hit-min`: 44px in comfortable density and on any touch screen, 24px in compact with a mouse (WCAG 2.5.8).
- A small visual control (a 20px switch, a 16px icon) gets an invisible hit area of `--hit-min`.

### Focus

- Every interactive element shows a focus ring on keyboard focus:
  `:focus-visible { outline: var(--focus-ring-width) solid var(--color-focus-ring); outline-offset: var(--focus-ring-offset); }`
- The ring is solid, 3px, offset 2px, and passes 3:1 against any surface. Don't remove it, and don't replace it with a colour change alone.
- Tab order follows the visual order. A sheet or dialog traps focus while open and returns it on close.

### Semantics

- Real elements: `<button>` for actions, `<a>` for navigation, `<input type="checkbox" role="switch">` for switches, `<fieldset>` + `<legend>` for groups.
- Every icon-only control has an accessible name. Every image has `alt` text, empty (`alt=""`) when decorative.
- Headings in order; one `<h1>` per page.
- Colour is never the only signal: a red error also has text, a selected item also has a shape or a check.

### Language

- Write labels as plain words a person would say. No jargon, no ALL CAPS.
- Error messages say what happened and how to fix it.

## Web translation

- Check every page with an automated scan (axe or Lighthouse) and by keyboard, in light and dark, at 320px, 390px and 1440px. Automated scans miss a lot; the keyboard pass is not optional.
- Hide text visually but keep it for screen readers with a `.visually-hidden` class (clip-path), not `display: none`.

## Don't

- Don't use `outline: none` without a visible replacement.
- Don't put information in `--color-label-tertiary` or `--color-label-quaternary`.
- Don't block zoom (`user-scalable=no`, `maximum-scale=1`).
- Don't rely on hover to reveal anything a touch user needs.
- Don't autoplay video with sound, or motion that lasts longer than five seconds without a pause control.

## Related

[color.md](color.md) · [motion.md](motion.md) · [materials.md](materials.md) · [layout-and-spacing.md](layout-and-spacing.md) · HIG digest: [accessibility](../research/hig-digest/accessibility.md)
