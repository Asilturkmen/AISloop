# Trial 2: do the patterns work for an agent?

Date: 2026-11-22. Question: with the three new patterns (settings, list–detail, landing page) in the reading order, does a fresh agent build those screens the way the patterns describe, and what do the patterns leave open?

## Before the trial

- The live example `examples/patterns/list-detail.html` was built (Claude Sonnet, medium effort) from the tokens and the list–detail pattern.
- An independent critique (Claude Opus, high effort) of the pattern files, the example and the README/AGENTS edits found 28 issues. The serious ones: the list title rule contradicted the unread rule; the tablet sidebar overlay let focus escape behind the scrim; Ctrl/⌘ + F was taken from the browser; the Delete key ignored Mac keyboards; the settings pattern cited an example that contradicts it; the READMEs called untested patterns done. All were fixed in the patterns, foundations and example; the foundations example itself was left as it is, and `patterns/settings.md` now says where it differs. Choices made without asking are in D-014.

## Setup

- A fresh agent with no prior context (Claude Sonnet, medium effort), an empty project folder, and a brief in Turkish: "design using AISloop: <local path>". Product: "Ev Defteri", a fictional household maintenance log (web): jobs done and to do, sections such as heating and kitchen, tradespeople, amounts, warranty end dates, shared by a household. Asked for the main screen (sections, record list, open record), settings, and a page presenting the product, on desktop and phone, light and dark.
- It could not ask questions. Afterwards it reported what it read, what it chose and why, how it verified, and what was missing or contradictory.
- The result was not touched. Screenshots went to the review board as round 4, together with the Kestrel example.

## What happened

- **Reading order:** `AGENTS.md` → `preferences.md` → `foundations/README.md` → four foundation files → `patterns/README.md` and all three patterns → the other foundation files → `checklist.md` → `tokens.css` → `decisions.md`, `templates/DESIGN.md` → the capture tool → both live examples → the first part of trial 1. It did not open `apple-native/` or the rest of `research/`.
- **Language:** the interface is in Turkish, following the brief.
- **Choices** (in its `DESIGN.md`): comfortable density, 26px cards, grey selection, flat sidebar, glass only on the landing nav; colourful section icons (from the `-text` colours, avoiding red, orange and green, which carry meaning); orange only for "warranty ends in 26 days", always with text; medium semibold hero because it shares the screen with the product.
- **Patterns followed:** three panes from 1000px, the sidebar behind a toggle on tablets, a hash-driven stack on phones; settings with a sidebar of panes, changes applied at once, validation in a sheet with Cancel and Done, a destructive dialog that names the action; a landing page with one idea per section, real screens, no device frames, no feature-card grid, no invented numbers.
- **Image:** no image tool, so the hero uses the real interface (the accepted fallback), and `DESIGN.md` describes the image that would help.
- **Verification:** screenshots at 1440, 390 and 320px in both themes (and 820px for the main screen), Playwright runs for the sheet, validation, save, delete with undo, arrow keys and `/` search; fixed the faults it saw. Not done: axe or Lighthouse, 200% zoom, increased contrast, a full keyboard pass, reduced motion.
- **One visible fault we saw:** on phones the agent's filled "+" button in the list bar sits flush against the right edge and overflows the bar. It came from a gap in the rules (row 1 below).

## Gaps it found, and what changed

| Gap | Change |
|---|---|
| `checklist.md` asks for one accent-filled main action per screen, while list–detail puts "new" in the bar as a borderless icon | `checklist.md`: at most one accent-filled button; app screens often have none. `list-detail.md`: the new action is a borderless icon at every width |
| Theme setting: "don't add one" and "if you add one" with no condition | `settings.md`: light and dark support means following the system; a theme override only when the brief asks for one |
| Settings sketch wrote "GROUP HEADER" in capitals | Sentence case in the sketch |
| Bar title: centred by default, but list–detail lets it lead | `typography.md`: the list pane of a desktop split view may lead, as in Mail |
| 700px written as `max-width: 700px` in one place and "below 700" in others | `layout-and-spacing.md`: below 700 is `max-width: 699.98px`, from 700 is `min-width: 700px`; the foundations example now matches |
| No icons for file types | `icons.md`: `file`, `file-pdf`, `file-image`, `file-zip`, `file-doc` |
| What opens first on desktop | `list-detail.md`: the last opened item, the first time the first item |
| Empty-state icon size not given | `list-detail.md`: about twice `--icon-size-lg`, in `--color-label-tertiary`, as a one-off size |
| Headlines that are questions | `landing-page.md`: a question ends with its question mark |
| Dates in the future | `list-detail.md`: "Tomorrow", the weekday within the next week, then the date |
| `tokens.css` said the display weights were still to be confirmed | Comment updated (D-010) |
| Tracking is easy to forget next to the `font` shorthand | `typography.md`: a project can define one class per text style |

Not changed: the image order in `AGENTS.md` and `preferences.md` already agree (a product image is preferred, the real interface is the accepted fallback). Form fields inside a sheet (label leading, input trailing) and different densities per device belong to later patterns (forms; navigation).

## Board

Round 4 on the same review board: six images. The Kestrel list–detail example (desktop, light), and the agent's main screen (desktop light), a record on the phone (dark), settings (desktop light) and the landing page (desktop light full page, phone dark). Like / dislike / unsure, no extra question. Votes: ids `r4i01`–`r4i06`.

**Result (2026-11-22): 4 liked, 1 unsure, 1 disliked.**

| Id | Screen | Vote |
|---|---|---|
| r4i01 | Kestrel list–detail example, desktop light | unsure, no note |
| r4i02 | Ev Defteri main screen, desktop light | liked |
| r4i03 | Ev Defteri record, phone dark | liked |
| r4i04 | Ev Defteri settings, desktop light | liked |
| r4i05 | Ev Defteri landing page, desktop light, full page | liked |
| r4i06 | Ev Defteri landing page, phone dark | disliked: "it looks very monotonous; who reads all that text on a landing page" |

What changed after the board:
- The phone landing page followed the rules and still read as a wall of text: a three-line headline, a lead, a full-width button, then a hero made of the real interface, itself a card of text, all on dark. `patterns/landing-page.md` (narrow screens) now asks that no screenful be text alone, that a real-interface visual be shown on phones as one enlarged crop rather than a shrunken screen, and that the primary button keep its natural size. `preferences.md` records the vote. The Kestrel example already meets this (its photo starts in the first screen at 390×664).
- r4i01 (unsure, no note) changes nothing: the example follows the pattern, and the same layout made by the agent (r4i02) was liked. Per D-012 it does not go back to the owner as a question.

Batch 1 counts as done: the agent's main screen, settings and desktop landing page were accepted, and the one rejected screen led to a rule.
