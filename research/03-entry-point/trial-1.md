# Trial 1: can an agent use AISloop on its own?

Date: 2026-11-22. Question: with only `AGENTS.md` as the entry point, does a fresh agent read the right files, make sensible project choices, stay out of `apple-native/`, and produce a design that passes the slop test?

## Setup

- A fresh agent with no prior context (Claude Sonnet, medium effort), an empty project folder, and the owner's kind of brief in Turkish: "design using AISloop: <local path>". Product: "Tally", a fictional shared household budget app for couples (web). Asked for a settings screen and a landing page.
- It could not ask questions. Afterwards it reported what it read, what it chose and why, how it verified, and what was unclear.
- The result was not touched. Screenshots (light and dark, 1440 and 390px) went to the review board as round 3.

## What happened

- **Reading order:** `AGENTS.md` → `preferences.md` → `foundations/README.md` → every foundation file → `checklist.md` → `templates/DESIGN.md` → the example page → `tokens.css`. It did not open `research/`, `decisions.md` or `apple-native/`.
- **Choices** (all written to the project's `DESIGN.md` with reasons): comfortable density, medium hero and semibold (the hero shares the screen with an app screen), 26px cards, plain colour (orange only for "over budget", green only for "active"), grey selection, flat sidebar, glass only on the top bar, small centred bar titles, a phone list → pane navigation.
- **Image:** no image tool, so it used the product's real interface (screenshots of a real overview screen, light and dark via `<picture>`). No gradients, no stock people.
- **Verification:** looked at the landing page at 1440, 390 and 320px in both themes and at several settings panes; fixed uneven row heights, a mid-word email wrap, a phone layout bug and a bad crop. It did not test the delete dialog, keyboard order, increased contrast, 200% zoom, or run a contrast scan.
- **Project setup:** copied `tokens.css` unedited, overrides in its own CSS, created `DESIGN.md` and a one-line `AGENTS.md`.

Our own look at the result: the settings screen reads like an Apple app in both themes; the landing page is clean and specific in its copy, but without a product image it is plain. Nothing generic or decorative.

## Gaps it found, and what changed

| Gap | Change |
|---|---|
| "Every value from tokens" left layout proportions (%, ch) and an avatar size unclear | `checklist.md`: design values from tokens; layout proportions and one-off sizes may be raw |
| No destructive button style; white on red fails | `foundations/color.md`: destructive labels in `--color-red-text` on a row, a text button or a background layer. While writing it we found red text on the translucent fills also fails, so those are excluded |
| Phosphor only shown via a CDN link | `foundations/icons.md`: self-host for production or offline |
| "Don't fill space with cards" vs grouped-list cards | `foundations/layout-and-spacing.md`: grouped lists are cards with a job; the ban is decorative feature-card grids |
| Hero table rows could both match | `foundations/typography.md`: a hero that shares the screen with a screenshot gets the medium size |
| Rows holding a 44px field overflow the 52px row; two-line rows | `foundations/layout-and-spacing.md`: padding for rows with full-size controls and for title + subtitle rows |
| Screenshot tool needs `file:///` URLs and can't click | `AGENTS.md`: URL format, and use a Playwright script for states |
| "Check contrast" with no tool named | `checklist.md`: axe, Lighthouse or DevTools; only new colours and text on images need measuring |
| Interface language not addressed (Turkish brief, English UI) | `AGENTS.md`: the project's language; in a new project, the brief's language |
| Image order put the UI screenshot first | `AGENTS.md`: own image → generated image → real interface (and tell the user what image would help) → marked spot |

Not changed: the agent noted the local files were uncommitted, so the GitHub copy differed. That is expected for a trial before commit.

## Board

Round 3 on the same review board: four images (landing desktop light, landing phone dark, settings desktop light, settings phone dark), like / dislike / unsure, with one question: is the real interface enough for the hero, or is a product-specific image necessary? Votes: ids `r3i01`–`r3i04`.
