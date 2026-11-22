# Motion

## When

Any change on screen: feedback on a press, a hover, something appearing or leaving, a layout change, a landing-page reveal.

## Rules

### Motion explains, it doesn't decorate

- Animate to show where something came from, where it went, or that an action registered. If an animation explains nothing, remove it.
- App UI is quick and quiet. Expressive, slower reveals belong to landing pages only.
- **Nothing bounces or overshoots.** None of the easing curves goes past its target.

### Durations

| Token | Value | Use |
|---|---|---|
| `--duration-micro` | 100ms | Press feedback, small fade-ins |
| `--duration-short` | 150ms | Hover and colour changes (default) |
| `--duration-medium` | 200ms | Chevrons, badges, popovers, small transitions |
| `--duration-long` | 300ms | Layout: a sidebar, drawer or panel opening or resizing |
| `--duration-xlong` | 400ms | Sheets and large panels |
| `--duration-expressive` | 700ms | Landing-page reveals only |

### Easing

| Token | Use |
|---|---|
| `--ease-out` | Default: things that appear or respond |
| `--ease-in` | Things that leave |
| `--ease-in-out` | Things that move or resize while staying on screen |
| `--ease-emphasized` | Sheets and hero reveals: a long, calm settle |

### Landing pages

- A hero may reveal once on load: headline, lead and actions rise a few pixels and fade in, staggered by `--duration-medium`.
- Scroll-triggered reveals: each element at most once, short distance (12–24px), no parallax on text.
- Never hide content until an animation runs. If scripts fail, everything must already be visible.

### Reduced motion

Built into the tokens: under `prefers-reduced-motion: reduce`, `--motion-scale` becomes 0 (movement distances drop to zero), and long, xlong and expressive durations shorten to 200ms. Fades keep working, because a fade still explains a change without moving anything.

## Web translation

- `transition: background-color var(--duration-short) var(--ease-out);`. Tailwind: `duration-short ease-out`, `duration-long ease-in-out`.
- Multiply every distance by the scale: `transform: translateY(calc(12px * var(--motion-scale)));`.
- Animate only `opacity` and `transform` where possible. Never animate `backdrop-filter`, `box-shadow` on many elements, or layout properties in a loop.
- An entry animation in CSS: `animation: rise var(--duration-expressive) var(--ease-emphasized) both;`, with `@keyframes rise { from { opacity: 0; transform: translateY(calc(16px * var(--motion-scale))); } }`.

## Don't

- Don't use spring overshoot, wobble, rubber-banding or bounce.
- Don't animate on every scroll position, or loop animations in the background of a page.
- Don't use the expressive duration inside app UI.
- Don't animate blur, zoom or large movements when reduced motion is on.

## Related

[accessibility.md](accessibility.md) · [materials.md](materials.md) · HIG digest: [motion](../research/hig-digest/motion.md)
