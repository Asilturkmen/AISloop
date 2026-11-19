# AISloop

**A design rulebook for AI coding agents: build interfaces that feel like Apple software, not like AI slop.**

[Türkçe](README.tr.md)

> **Status: early research.** The rules are not written yet. Nothing here is ready to use.

## What this is

When an AI agent designs a screen without guidance, it often falls back on the same look: purple-blue gradients, glass everywhere, sparkle icons, identical rounded cards. People call this "AI slop".

AISloop is a set of plain Markdown rules, design tokens and examples that an agent reads before it designs. The aim is for an interface built with AISloop to feel calm, clear and carefully made, the way good Apple software does.

It covers two registers: **app interfaces** (lists, settings, editors, panels) in the language of Apple's own apps, and **product and landing pages** in an expressive register closer to apple.com. In both, what AISloop bans is carelessness, not a style: generic copy, interchangeable layouts, decoration that says nothing, placeholder content and unchecked details. A popular look done with real care is welcome.

## How it will be used

There is nothing to install. You give the repository to the agent in your project:

> Design the settings page using github.com/Asilturkmen/AISloop.

The agent starts at `AGENTS.md`, reads only the files that the task needs, and follows them unless you say otherwise. If you ask it to use AISloop for the whole project, it adds a `DESIGN.md`, a tokens file and a one-line note to your project. Projects that don't mention AISloop are not affected.

## How it is built

The rules are not a summary of Apple's guidelines. Each topic goes through the same loop:

1. Research real Apple screens, web products that capture the same feel, and counter-examples.
2. Compare the options side by side and pick by eye.
3. Write the chosen direction down as a rule with concrete values.
4. Check the rule by building a live example page from it.

Every choice is logged with its reason in [`decisions.md`](decisions.md), and the taste behind them is in [`preferences.md`](preferences.md).

## Layout

| Path | Contents |
|---|---|
| `preferences.md` | The taste profile the rules follow |
| `decisions.md` | Every design decision, with date and reason |
| `research/` | Research notes and sources; rules are distilled from here |

More folders (foundations, components, patterns, tokens, an agent entry point) will be added once research shows what they need to hold.

## Disclaimer

AISloop is inspired by Apple's design language. It is not affiliated with or endorsed by Apple Inc. It contains no Apple assets: no logos, icons, fonts (such as SF Pro) or screenshots. Product names are used only to refer to the products.

## License

[MIT](LICENSE)
