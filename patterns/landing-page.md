# Landing page

## When

A page that presents a product: what it is, who it's for, why it's good, and how to start. The expressive register: large type, one strong product-specific image, generous space.

Not for documentation, blog posts or pricing pages; those have their own needs.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ Wordmark                 Link  Link  Sign in │  nav bar
├──────────────────────────────────────────────┤
│                                              │
│  Headline that says                [ image ] │  hero: one idea
│  what it does.                               │
│  Lead: for whom, and how.                    │
│  [ Primary action ]  Secondary →             │
├──────────────────────────────────────────────┤
│  Eyebrow                                     │
│  Section headline        [ real product ]    │  2–4 sections,
│  One paragraph.                              │  one idea each
├──────────────────────────────────────────────┤
│  ◻ Point     ◻ Point     ◻ Point             │  optional: 3 quiet points
├──────────────────────────────────────────────┤
│           Closing headline.                  │  closing call to action
│           [ Primary action ]                 │
├──────────────────────────────────────────────┤
│ Footer: one line, a few links                │
└──────────────────────────────────────────────┘
```

## Rules

### Hero

- **One idea.** A headline that says what the product does for whom, in words only this product could use. Then a lead (`--text-lead`, one to three lines) with the how. Then one primary action (accent button) and at most one secondary action as a text link with an arrow (`arrow-right`), in `--color-label` (`--color-on-media` over an image), never the accent. The secondary action only leads somewhere ("How it works"); it never starts the main task.
- Headline in `--text-display-1`, at most three lines at every width. Size and weight are project choices ([typography.md](../foundations/typography.md#display-scale-landing-and-product-pages)).
- **The image carries the atmosphere.** Follow the image order in [`AGENTS.md`](../AGENTS.md#images). Two layouts work:
  - **Full-bleed image** with the text on its calm side: the hero becomes a dark island (`data-theme="dark"`), text in `--color-on-media` over a scrim strong enough for the brightest pixel under each line ([color.md](../foundations/color.md#text-on-photos-and-video)).
  - **Split:** text on one side, the image or the real product screen on the other, on the page background.
- Hero height: headline, lead and actions must be visible without scrolling at 1366×768 and 390×664, together with the image's subject. A floor like `min-height: min(100svh, 56rem)` is fine; a plain `100vh` that pushes content below the fold on short screens is not.

### Sections

- Two to four sections, each with **one idea** and one visual: an eyebrow (`--text-eyebrow`, `--color-label-secondary`, optional; it names a product area, never a slogan), a headline (`--text-display-2`), one short paragraph (`--text-lead` or `--text-body`), and a real product visual.
- Show the product as it is: real screens at comfortable density, `--radius-group`, `--shadow-floating`. No device frames (Apple's device artwork is off-limits) and no fake window chrome.
- Alternate the layout side or the background (`--color-bg`, `--color-bg-secondary`) only when it helps separate sections. Not every section needs a new trick.
- Spacing: `--space-80` between sections on desktop, `--space-48` on phones; content within `--width-content` (980px) or `--width-content-wide` (1180px).

### Points (optional)

- Skip this row unless the sections leave out facts people need; a row of three icon-and-text points is the most common AI page part.
- At most three short points, each a headline (`--text-title-3`) and one or two lines (`--text-callout`, `--color-label-secondary`). An icon (`regular`, `--icon-size-lg`) only when it names the fact (a map pin for location); otherwise none. No card backgrounds, no shadows. A hairline above each point is enough.
- Each point is a concrete fact about the product ("Export as CSV with coordinates"), not a virtue ("Fast", "Secure", "Easy").

### Closing

- A short headline (`--text-display-2` or `--text-display-3`), one sentence, the same primary action as the hero. Centred.
- Footer: one line about the product and a few links, `--text-footnote`.

### Nav bar

- `--bar-height`, wordmark leading, two or three links and the sign-in trailing. Over a dark hero, the bar is a dark island too; over light content, `--material-bar` glass.
- The nav is fixed. Keep `data-theme="dark"` on it while it overlaps a dark hero, and remove it once the hero has scrolled under it.
- On phones keep the wordmark and the most important link (often Sign in); hide the rest. A menu button only when there are more than three destinations people need on a phone.

### Copy

- Specific beats impressive: what the product does, for whom, with real details (numbers, places, file formats) that are true.
- No "Why choose us", "Ship faster", "Next-generation", "Unlock", "Seamless". No invented statistics, logos of customers you don't have, or testimonials with stock faces.
- Sentence case everywhere. Hero, section and closing headlines end with a period when they are sentences (a question ends with its question mark); point titles don't.

### Motion

One reveal of the hero on load (`--duration-expressive`, `--ease-emphasized`); sections may fade in once as they enter. No parallax on text, no scroll-jacking, nothing looping. Reduced motion: no movement ([motion.md](../foundations/motion.md)).

## Narrow screens

- The hero stacks: text first, then the image. A full-bleed image becomes a block under the text, cropped to keep its subject in frame (check the crop at 320 and 390px).
- **No screenful of text alone.** At 390×664 the first screen shows the headline, the primary action and a clear part of the visual; further down, no screen-height stretch is text only. When it is, cut words before shrinking the visual.
- When the visual is the real interface, show one enlarged, legible crop of it on phones (a single card or control people recognise), not a whole screen scaled down: a shrunken screen reads as more text.
- Keep the primary button its natural size, not stretched to full width. Actions may stack; the primary stays first.
- Sections become one column: text, then the visual.
- Display sizes shrink by themselves (the `clamp()` scale); the headline still fits in three lines.

## States

- **No image yet:** see the image order in `AGENTS.md`; never a gradient placeholder.
- **Signed-in visitor:** the primary action changes to "Open <product>"; nothing else moves.
- **Slow image:** reserve its space (`width`/`height` or `aspect-ratio`) so the layout doesn't jump; give the hero image `fetchpriority="high"` and lazy-load the rest.

## Web translation

```html
<header class="nav" data-theme="dark">…</header>
<main>
  <section class="hero" data-theme="dark" aria-labelledby="hero-title">
    <img class="hero-img" src="hero.webp" width="1536" height="1024" alt="…" fetchpriority="high">
    <div class="hero-inner">
      <h1 id="hero-title">Field notes that keep up with you.</h1>
      <p class="lead">…</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/start">Start a field notebook</a> <a class="link-arrow" href="#how">How it works</a></div>
    </div>
  </section>
  <section aria-labelledby="s1">…</section>
</main>
<footer>…</footer>
```

Live example: the Kestrel page ([`examples/foundations/index.html`](../examples/foundations/index.html)) uses a full-bleed hero image with a dark nav island. The Tally trial ([`research/03-entry-point/trial-1.md`](../research/03-entry-point/trial-1.md)) describes a hero built from real app screens.

## Don't

- Don't use a grid of six feature cards, a logo wall, a pricing table or testimonials unless they are real and needed.
- Don't put a gradient blob, glow, sparkle icon or animated background behind the hero.
- Don't use gradient or outlined headline text.
- Don't show the product inside a device frame or a fake window.
- Don't use more than one accent button per section.
- Don't let the hero headline exceed three lines; shorten the copy.

## Related

[AGENTS.md](../AGENTS.md#images) (images) · foundations: [typography](../foundations/typography.md), [color](../foundations/color.md), [motion](../foundations/motion.md), [layout-and-spacing](../foundations/layout-and-spacing.md) · [checklist.md](../checklist.md) (the slop test)
