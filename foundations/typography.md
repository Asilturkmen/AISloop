# Typography

## When

Every piece of text. App screens use the **text styles**; landing and product pages use the **display scale** for headlines and the text styles for everything else.

## Rules

### Font

- Use the system font stack `--font-sans` (`system-ui, -apple-system, …`). Apple devices render it in the OS font; Windows, Android and Linux get their own UI font, which is what their users expect.
- Never embed, download or name Apple's fonts (licence). `--font-mono` and `--font-serif` follow the same idea.
- A brand font is allowed when the project has one. Set `--tracking-scale: 0` for it, because the built-in tracking table is tuned for the system font.

### Weights

- Only 400, 500, 600, 700 (`--weight-regular` … `--weight-bold`). No thin or light weights: they are hard to read at small sizes.
- Emphasis inside body text uses the style's own emphasized weight (`--text-body-weight-emphasized` …), not a hard-coded bold.

### Text styles (app UI)

| Style | Comfortable | Compact | Use |
|---|---|---|---|
| `--text-large-title` | 34/41 bold | 26/32 bold | Top of a scrolling page, rarely (see titles below) |
| `--text-title-1` | 28/34 bold | 22/26 bold | Page title inside content |
| `--text-title-2` | 22/28 bold | 17/22 bold | Section title |
| `--text-title-3` | 20/25 semibold | 15/20 semibold | Group or card title |
| `--text-headline` | 17/22 semibold | 13/16 bold | Row title, emphasised label |
| `--text-body` | 17/22 | 13/16 | Default text, row labels |
| `--text-callout` | 16/21 | 12/15 | Secondary text in a row, buttons with less weight |
| `--text-subheadline` | 15/20 | 11/14 | Subtitles, metadata |
| `--text-footnote` | 13/18 | 11/14 | Group footers, help text |
| `--text-caption-1` / `-2` | 12/16 · 11/13 | 11/14 | Captions, badges, timestamps |
| `--text-prose` | 17/25 | 13/18 | Paragraphs of three lines or more |

Sizes are in rem, so the browser's text-size setting still works. Compact never goes below 11px (macOS uses 10pt; too small for the web).

### Titles in app UI

- Default: a **small centred title in the bar** (`--text-headline`), content starts right below. *(voted: p02 B)*
- A large left-aligned title (`--text-large-title` or `--text-title-1`) is the exception: a top-level page that is a destination of its own (a library, a home screen), not a settings pane or a detail view.

### Display scale (landing and product pages)

Sizes are fluid: the minimum at a 390px phone, the maximum at about 1440px.

| Token | Size (min → max) | Leading | Weight | Use |
|---|---|---|---|---|
| `--text-display-1` | 44 → 88px | 1.05 | 700 | Hero headline, once per page |
| `--text-display-2` | 32 → 64px (63 at 1440) | 1.08 | 700 | Section headline |
| `--text-display-3` | 24 → 40px | 1.15 | 600 | Sub-section, tile headline |
| `--text-lead` | 19 → 24px | 1.4 | 400 | Intro paragraph under a headline |
| `--text-eyebrow` | 16 → 21px (20 at 1440) | 1.25 | 600 | Short kicker above a headline |

**Hero size and headline weight are project choices** (the owner voted "depends" on both). Decide them together:

| The page | Size | Weight |
|---|---|---|
| One product, one short headline (about six words or fewer), a strong image carrying the hero | Large (default, to 88px) | Bold 700 (default) |
| A longer headline, a tool or service for work, documentation, or a hero that shares the screen with a product screenshot | Medium (to 64px) | Semibold 600 |
| Mixed (short headline, sober product) | Large | Semibold 600 |

Medium and semibold are overrides, set once in the page's CSS after `tokens.css`:

```css
:root {
  /* medium hero: lower the section headline too, so the hero stays the largest */
  --text-display-1-size: clamp(2.5rem, 1.5rem + 3.2vw, 4rem);     /* 40 -> 64px */
  --text-display-2-size: clamp(1.75rem, 1.25rem + 2vw, 3rem);     /* 28 -> 48px */
  /* semibold headlines */
  --text-display-1-weight: var(--weight-semibold);
  --text-display-2-weight: var(--weight-semibold);
}
```

Use the size lines and the weight lines independently, as the table says.

Whichever you choose, the hero headline has to fit in three lines or fewer at every width. If it doesn't, shorten the copy before you shrink the type.

### Tracking

- Every text style has its own letter-spacing token (`--text-body-tracking` …) from Apple's size-specific table: tighter for large text, slightly open for small text. Always set it together with the font:
  `font: var(--text-body); letter-spacing: var(--text-body-tracking);`
- Display sizes track slightly tight (−0.015em to −0.005em). The eyebrow tracks at 0: no spaced-out capitals.

### Measure and alignment

- Paragraphs: at most `--width-prose` (68ch). Text is left-aligned (start-aligned in RTL).
- Centre only short text: a hero headline and its lead on a centred layout, an empty state, a title in a bar. Never centre a paragraph longer than three lines.

## Web translation

- Use the `font` shorthand tokens (`--text-body`, `--text-display-1` …) plus the matching `-tracking` token. With Tailwind, `text-body` (or `text-display-1` …) sets size, leading, weight and tracking in one class.
- Headlines: `text-wrap: balance`. Paragraphs: `text-wrap: pretty`. Both degrade gracefully.
- Numbers that change or line up in columns (prices, timers, tables): `font-variant-numeric: tabular-nums`.
- Truncate only where the full text is available elsewhere (a detail view, a tooltip). Labels in settings and forms wrap; they are never cut off.

## Don't

- Don't use the display scale inside app UI, and don't use app text styles for a hero headline.
- Don't write font sizes in px, or in `vw` alone. The `clamp()` with a rem term keeps zoom working.
- Don't use all caps for headings or eyebrows. Sentence case everywhere.
- Don't add a gradient or glow to headline text to make it look premium. Size, weight and space do that.
- Don't add weights beyond the ones the text styles assign. Hierarchy comes from the styles, not from extra bolding.

## Related

[layout-and-spacing.md](layout-and-spacing.md) (density) · [color.md](color.md) (label colours, text on images) · [accessibility.md](accessibility.md) · HIG digest: [typography](../research/hig-digest/typography.md), [writing](../research/hig-digest/writing.md)
