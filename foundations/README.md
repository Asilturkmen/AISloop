# Foundations

The base layer of AISloop: type, colour, space, shape, materials, motion, icons and accessibility. Every design value here (colour, size, space, radius, duration) exists as a token in [`tokens/tokens.css`](../tokens/tokens.css) (Tailwind: [`tokens/tailwind.preset.js`](../tokens/tailwind.preset.js)). Use the token, never the raw number, so themes, densities and accessibility settings keep working.

These rules apply to any project: web, cross-platform, any framework. Guidance that is only for apps built solely for Apple platforms lives in [`apple-native/`](../apple-native/).

## Files

| File | Covers |
|---|---|
| [typography.md](typography.md) | Font stack, text styles, the display scale for landing pages, weights, tracking |
| [color.md](color.md) | Semantic colours, accent, meaningful colours, text on images |
| [dark-mode.md](dark-mode.md) | The dark layer ladder, theme islands, what changes and what doesn't |
| [layout-and-spacing.md](layout-and-spacing.md) | Density presets, spacing scale, gutters, widths, sizes, breakpoints |
| [radii.md](radii.md) | Radius scale, roles per density, the concentric rule |
| [materials.md](materials.md) | Glass (chrome only), opaque fallbacks, shadows |
| [motion.md](motion.md) | Durations, easing, reduced motion |
| [icons.md](icons.md) | Icon set (Phosphor), weights, fill for selection, standard actions |
| [accessibility.md](accessibility.md) | Contrast targets, hit sizes, focus, user settings |

## The two registers (D-009)

- **App UI** (lists, settings, editors, panels): Apple app language. Text styles (`--text-body`, `--text-headline`…), quiet colour, one accent.
- **Product and landing pages**: expressive, apple.com-like. The display scale (`--text-display-*`), a real product-specific image, generous space. Same tokens for colour, radius and motion.

A page can hold both (a landing page that shows the real app screen). Each part follows its own register.

## Choices a project makes

The owner voted "depends on the project" on these, so no single value is right. Pick per project using the guidance in each file, and write the choice into the project's own design notes:

| Choice | Options | Where |
|---|---|---|
| Density | comfortable (default) · compact | [layout-and-spacing.md](layout-and-spacing.md#density) |
| Hero headline size | large (to 88px) · medium (to 64px) | [typography.md](typography.md#display-scale-landing-and-product-pages) |
| Headline weight | bold 700 · semibold 600 | [typography.md](typography.md#display-scale-landing-and-product-pages) |
| Card radius (comfortable) | 26px · 16px | [radii.md](radii.md#card-radius-is-a-project-choice) |
| Amount of colour | plain · colourful (meaningful colour only) | [color.md](color.md#amount-of-colour-is-a-project-choice) |
| Selected-row style | grey · accent | [color.md](color.md#selected-rows-are-a-project-choice) |
| Sidebar surface | glass · flat | [materials.md](materials.md#glass-is-for-chrome-only) |

Everything else has a default. Change a default only for a reason you can name.

## Format of each file

**When** (what the rule is for) → **Rules** (with values and tokens) → **Web translation** (how to build it) → **Don't** → **Related**. Sources and contrast results for every value: [`research/02-foundations/tokens-rationale.md`](../research/02-foundations/tokens-rationale.md). Live example built only from the tokens: [`examples/foundations/index.html`](../examples/foundations/index.html).
