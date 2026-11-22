# Phase 2 plan: foundations

Status: **steps 1–4 done, waiting for the owner's round-2 votes** (2026-11-22). Read this first when resuming.

## Progress
- Step 1 done: `tokens/tokens.css`, `tokens/tailwind.preset.js`, `tokens-rationale.md` (all required contrast checks pass; re-run the checker after any token change).
- Step 2 done: `examples/foundations/index.html` (fictional product Kestrel; hero image generated with Codex).
- Step 3 done: two independent critique rounds (`critique-1.md`, `critique-2.md`); all blockers fixed, axe clean, no overflow at 390/1024/1440.
- Step 4 in progress: round 2 added to the same board (6 controlled A/B pairs + 5 overall images). Votes land in the board's `votes` collection with ids `r2p01`–`r2p06` and `r2i01`–`r2i05` (`r2i05` = hero image fit).
- Next: read the round-2 votes, adjust tokens, write `foundations/` rule files, record decisions (step 5).

## Goal
Turn the research into the first usable foundation of AISloop:
1. `tokens/tokens.css`: CSS custom properties for type, colour (light/dark, increased contrast), spacing, radii, materials, shadows, motion, focus. Plus a Tailwind mapping.
2. Foundation rule files (`foundations/`): typography, colour, layout and spacing, radii, materials, motion, dark mode, accessibility. One short file each, in the format: when, rules with values, web translation, don't, related.
3. A live example page built only from the tokens: one app screen (settings / list–detail) and one landing hero, in light and dark, at compact and comfortable density. This page is the test that the rules produce good design.

## Inputs (already in the repo)
- `preferences.md`: the owner's taste profile; it wins over everything else.
- `research/01-taste-calibration/results.md`: the 51 votes and follow-ups.
- `research/hig-digest/`: Apple's guidance and numbers, with web translations.
- `research/02-foundations/native-measurements.md`: geometry and colours measured on 89 Apple screens.
- `research/02-foundations/apple-web-css.md`: values Apple's own web apps use.
- `research/02-foundations/docc-render.md`: token architecture from Apple's open-source web code.

## Defaults to apply (owner may object; not to be asked again)
- **Density:** two presets. Compact follows the macOS/Apple-web scale (13 px body). Comfortable follows iOS (17 px body). A project picks one.
- **Accent:** Apple-like blue by default, overridable per project. Use it as a fill; text links need a darker variant that passes WCAG AA.
- **Theme:** follow the system by default; a project may add a toggle.
- **Accessibility:** WCAG 2.2 AA wherever Apple's thresholds are looser.
- **Type:** system font stack (`system-ui`, `-apple-system`, …); never embed SF.
- **Radii:** a measured scale; nested shapes use inner = max(outer − padding, about 6 px).
- **Glass:** only on chrome (bars, toolbars, floating sidebars, popovers), never on content. Start from Apple web's values (about `saturate(180%) blur(20px)`).
- **Dark mode:** layered dark greys (Apple web uses about #1f1f1f), not pure black, as the default; to be confirmed on the board.
- **Icons:** an open icon set (no SF Symbols outside `apple-native/`); pick one in this phase.
- **Landing hero imagery:** atmosphere comes from a product-specific image; generate the example's image with Codex.

## Round 2 board (taste only)
Ask only what taste decides; never what the page type decides (owner's rule from round 1). Compare like with like (same device class, same screen).
Candidates: comfortable body size, default accent hue, dark base (black vs grey), glass strength, landing headline scale.
Reuse the same board artifact (one artifact per job).

## Steps
1. Synthesise a token draft from the three measurement files and the HIG digest; note every value's source.
2. Build the example page from the draft (app screen + landing hero; light/dark; compact/comfortable).
3. Independent design critique of the page; fix what it finds.
4. Round 2 board with controlled variants; owner votes.
5. Finalise tokens and write the foundation rule files; record decisions in `decisions.md`.
6. Commit; the owner pushes.

## Team (ask the owner before starting, per their rule)
- Option A: 3 agents. Token synthesis (Opus, high), example page (Sonnet, medium), independent critic (Opus, high).
- Option B: the lead does steps 1–2 alone; one critic agent for step 3.
State model and effort explicitly for every agent.

## Not in this phase
- `AGENTS.md` and the final structure (Phase 3). Requirement for Phase 3: an agent must understand from the repo alone which parts apply to any project and which only to Apple-only apps (`apple-native/`), without being told.
