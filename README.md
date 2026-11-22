# AISloop

![A landing page split by a diagonal band of refracting glass. Behind it, a generic AI hero: neon aurora, sparkles, glowing buttons, identical cards. Past it, the same page refined: misty mountains at dawn, the word AISloop in large white type, one button, and a calm settings card with a single blue toggle.](assets/hero.png)

**A design rulebook that AI coding agents read before they draw a single pixel, so what they build feels like Apple made it, not like AI made it.**

[Türkçe](README.tr.md)

> **Status: usable.** Hand an agent this repo and it starts at [`AGENTS.md`](AGENTS.md). Foundations, tokens, live examples and a checklist are in place; the first three patterns (settings, list–detail, landing page) are written and being tried with an agent. See [Roadmap](#roadmap).

---

## The problem

Ask an AI agent for an interface and you can usually tell. The same purple-blue gradient. Glass on everything. A sparkle icon next to anything "smart". Six identical rounded cards under a headline that could sell any product. People call it **AI slop**.

The fix is not a longer prompt. An agent needs what a new designer on a good team gets on day one: a rulebook, with reasons and real numbers.

## What AISloop is

Plain Markdown rules, design tokens and live examples that an agent reads before it designs. No install, no runtime, no framework lock-in.

```
You:    "Build the settings page using github.com/Asilturkmen/AISloop."
Agent:  reads AGENTS.md  →  opens only the rules this page needs
        →  builds with AISloop's tokens  →  checks the result against the checklist
Result: a page that feels calm, clear and deliberate, like Apple's own software
```

It covers two registers:

| | Feels like | For |
|---|---|---|
| **App interfaces** | Apple's own apps: Settings, Notes, Mail, Finder, Pages | lists, settings, editors, dashboards, panels |
| **Product and landing pages** | apple.com: large type, strong imagery, atmosphere | product pages, launches, landing pages |

## What makes it different

**It bans carelessness, not styles.**
Most anti-slop lists ban looks: no glass, no dark heroes, no glows. AISloop doesn't. A trendy look done with care is welcome. What it bans is what makes slop slop:

| Trash slop | Quality, even when trendy |
|---|---|
| Copy that fits any product | Words and imagery only this product could have |
| The same six cards, the same hero | One strong idea, everything else quiet |
| Effects added to look impressive | Effects that carry hierarchy or atmosphere |
| Stock avatars, invented numbers | Real or realistic content, edge cases included |
| Crowded lines, low contrast, clipped text | Measured alignment, spacing and contrast |
| Fake macOS windows and traffic lights | Apple's proportions and behaviour, translated honestly |

**It is built from evidence, not from memory.**
- **92 pages** of Apple's Human Interface Guidelines, digested topic by topic with every number Apple gives.
- **89 official screenshots** of current iOS, iPadOS and macOS apps, **measured pixel by pixel**: row heights, margins, corner radii, colour layers.
- **Apple's own web apps** (Music, Podcasts, App Store, Maps, Developer) measured live in the browser: the closest thing to "Apple designing for the web".
- **WWDC sessions** on design principles, Liquid Glass and AI-assisted prototyping.

**It is built from a real taste, not an average.**
Apple's guidelines say what Apple does; they don't say what you like. Every direction in AISloop goes through a review board where options sit side by side and get voted on by eye. The result lives in [`preferences.md`](preferences.md), and every decision and its reason in [`decisions.md`](decisions.md).

**It translates; it doesn't copy.**
Apple's fonts, icons and UI kits are licensed for Apple platforms only. AISloop contains none of them. It takes the proportions, hierarchy and behaviour and expresses them in plain web terms: the system font stack, CSS custom properties, an open icon set.

## A few things the research found

- Apple's own web apps use the **macOS type scale** (13 px body), not iOS's 17 px.
- **Glass belongs to chrome, never to content.** The HIG, the shipping apps and Apple's web CSS all agree.
- Nested corners follow a rule you can compute: **inner radius = outer radius − padding**, with a floor around 6 px.
- **One accent per screen**, used on the single most likely action; toolbars and icons stay monochrome.
- Dark mode in Apple's web apps is **dark grey (#1f1f1f), not black**.

## How it is organised

| Path | What's inside |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Where an agent starts: what to read, in which order, and how to set AISloop up in a project |
| [`preferences.md`](preferences.md) | The taste profile every rule follows |
| [`decisions.md`](decisions.md) | Every decision, dated, with its reason |
| [`foundations/`](foundations/) | The rules: type, colour, dark mode, layout, radii, materials, motion, icons, accessibility |
| [`patterns/`](patterns/) | Common screens built on the foundations: settings, list–detail, landing page |
| [`tokens/`](tokens/) | Every value as CSS custom properties, plus a Tailwind preset |
| [`examples/`](examples/) | Live pages built only from the tokens, in light and dark, at both densities |
| [`checklist.md`](checklist.md) | What to check before calling a design done, including the slop test |
| [`templates/`](templates/) | `DESIGN.md`, the file a project keeps its AISloop choices in |
| [`research/`](research/) | The evidence: HIG digest, measurements, sources, vote results |
| [`tools/`](tools/) | Screenshot tool used for research and for verifying designs |
| [`apple-native/`](apple-native/) | Only for apps built solely for Apple platforms (SwiftUI/UIKit). Everything else is for any project. |

More patterns (forms and sign-in, navigation, dialogs…) arrive as the roadmap moves on.

## Roadmap

| Phase | | Status |
|---|---|---|
| 0 | Skeleton, licence, decision log | done |
| 1 | Taste calibration: research, review board, 51 votes | done |
| 2 | Foundations: type, colour, spacing, radii, materials, motion → tokens + a live example page | done |
| 3 | `AGENTS.md` entry point and the final structure, tested with a fresh agent | done |
| 4 | Patterns one at a time (settings, list–detail, forms, landing…), each tested in a real project | in progress: first three written, trial pending |

## Disclaimer

AISloop is inspired by Apple's design language. It is not affiliated with or endorsed by Apple Inc. It contains no Apple assets: no logos, icons, fonts (such as SF Pro), UI kits or screenshots. Product names are used only to refer to the products.

## License

[MIT](LICENSE)
