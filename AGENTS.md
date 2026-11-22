# AISloop: instructions for agents

You were pointed at this repository to design something. AISloop is a design rulebook: follow it so the result feels like carefully made Apple software, not like generic AI output. Unless the user says otherwise, it is the design base for the task.

These instructions apply only when a user hands you AISloop. They don't apply to other projects.

## What to read, in order

1. **[`preferences.md`](preferences.md)**: the owner's taste. It wins over every other file here.
2. **[`foundations/README.md`](foundations/README.md)**: the map of the foundation rules and the list of choices you make per project.
3. **The foundation files your task touches** (`foundations/*.md`). For any visual work that means at least typography, colour, layout-and-spacing and accessibility.
4. **[`tokens/tokens.css`](tokens/tokens.css)**: every value as a CSS custom property. Build with these, never with raw numbers. Tailwind projects: [`tokens/tailwind.preset.js`](tokens/tailwind.preset.js).
5. **[`examples/foundations/index.html`](examples/foundations/index.html)**: a page built only from the tokens (an app settings screen and a landing hero). Read it to see the rules applied.

Read when you need them:
- [`decisions.md`](decisions.md): why things are the way they are.
- [`research/`](research/): evidence and measurements behind every value. Don't copy from it; the rules already contain what you need.

## Which parts apply to your project

| Part | Applies to |
|---|---|
| Everything outside `apple-native/` | Any project: web, cross-platform, any framework |
| [`apple-native/`](apple-native/) | Only apps built solely for Apple platforms with native frameworks (SwiftUI, UIKit, AppKit). You can tell from the project: an Xcode project with no web or Android target. |

When a web or cross-platform project should look like Apple, that look comes from the rest of this repo; `apple-native/` is not part of it.

## Decide the register first

- **App UI** (screens people work in: lists, settings, editors, dashboards, panels): Apple app language. Text styles, quiet colour, one accent.
- **Product or landing page** (a page that presents the product): expressive, apple.com-like. The display scale, one strong product-specific image, generous space.

A page can contain both, e.g. a landing page that shows the real app. Each part follows its own register.

## Make the project choices

Some values depend on the project; the owner voted "depends" on them. Decide each one from the guidance in the foundation files, without asking the user, unless the brief truly leaves you no basis:

density · hero headline size · headline weight · card radius · amount of colour · selected-row style · sidebar glass or flat

Everything else has a default. Keep it unless you can name a reason. The full table is in [`foundations/README.md`](foundations/README.md#choices-a-project-makes).

## Using AISloop in a project

When the design work will live on in the project (not a one-off sketch):

1. Copy `tokens/tokens.css` into the project and load it before the project's own CSS (Tailwind: also add the preset).
2. Create `DESIGN.md` in the project from [`templates/DESIGN.md`](templates/DESIGN.md): which registers the project uses, the project choices you made and why, the accent if rebranded, and any deliberate departures.
3. Add one line to the project's agent instructions (`AGENTS.md`, `CLAUDE.md` or similar): `Design follows AISloop; see DESIGN.md.`
4. Override tokens in the project's CSS, after `tokens.css`. Don't edit the copied file, so it can be updated later.

## Images

A landing page gets its atmosphere from a real, product-specific image: a photo or illustration of the world the product lives in (the example page uses a field notebook on a moor for a field-notes app). In order of preference:
1. An image the project or the user already has.
2. An image you generate, if you have a tool for it. Say that it is generated.
3. The product's real interface, shown large and crisp. This is honest but quieter; tell the user that a product-specific image would give the page its atmosphere, and what it should show.
4. A clearly marked spot, and a note to the user describing the image that is needed.

Never fill the gap with a gradient blob, a glow, stock people or a generic illustration.

## Interface language

Write interface copy in the project's language. In a new project, use the language the user wrote the brief in, unless they say otherwise. Record it in `DESIGN.md`.

## Before you call it done

Go through [`checklist.md`](checklist.md). In short: look at the result yourself in a browser, in light and dark, at a phone width and a desktop width. (No browser tool? [`tools/capture.mjs`](tools/capture.mjs) takes screenshots with an installed Chrome or Edge; run `npm install` in `tools/` once. Pass an `http://` URL or an absolute `file:///` URL, e.g. `file:///C:/project/index.html` on Windows. It doesn't click; for dialogs and other states, write a short Playwright script.) Check contrast and keyboard focus. Then run the slop test: could this page belong to any product? If yes, it isn't done.

## Reading from GitHub

If you only have the GitHub link, read the files raw: `https://raw.githubusercontent.com/Asilturkmen/AISloop/main/<path>`, e.g. `.../main/foundations/README.md`.
