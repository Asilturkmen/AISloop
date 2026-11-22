# Decisions

Every decision about the repository and the design language, newest at the bottom. A decision is changed only by adding a new entry that supersedes it; old entries stay for the record.

Format: `D-NNN · date · decision`, then the reason and, for design decisions, the evidence (board, vote, source).

---

## Repository

**D-001 · 2026-11-19 · AISloop is a plain-Markdown rulebook that agents read on request.**
Not a plugin or an installed tool. A user hands the repo to an agent ("design X using AISloop"); the agent reads it and follows it unless told otherwise. Projects that don't mention it are unaffected. A Claude Code plugin wrapper may be added later as an optional shortcut.

**D-002 · 2026-11-19 · Public repository, MIT license.**
Anyone may use it. It holds design preferences only, no personal information.

**D-003 · 2026-11-19 · No third-party assets in git.**
Screenshots of Apple or other products stay in `research/_private/` (ignored by git) and on private review boards. The repo holds our own rules, our own example code and links to sources. No Apple logos, icons or fonts. Reason: copyright and trademark; also, the value is in the distilled rules, not the images.

**D-004 · 2026-11-19 · Rules are written in English.**
The main readers are agents: English costs fewer tokens and matches design vocabulary and Apple's own documentation. Only the README has a Turkish version (`README.tr.md`). Review boards and discussion with the owner are in Turkish.

**D-005 · 2026-11-19 · Research first, architecture follows.**
Order: (0) minimal skeleton → (1) taste calibration board → (2) foundations (type, colour, spacing, materials, motion) with live examples → (3) final structure and `AGENTS.md` entry point → (4) patterns one at a time, each tested in a real project. Reason: folders designed before content is known are guesses; research without the owner's votes would encode an average of Apple rather than a chosen taste.

**D-006 · 2026-11-19 · Every research round ends with a visual review board.**
A private web page showing options side by side, with like / dislike / unsure and a note field per item. Votes are stored with the board and read back directly. Results become entries in `preferences.md` and here.

**D-007 · 2026-11-19 · Web first.**
Rules are framework-agnostic web (CSS custom properties, with a Tailwind mapping). React Native may be added later as a separate layer.

**D-008 · 2026-11-19 · Apple Design Resources (UI kits) are never opened.**
The licence (LYL142, 2023-06-21) applies on use, limits use solely to mock-ups for software that runs only on Apple operating systems (§2A), forbids using the resources to create documentation, website content or other work product (§2B) and forbids derivative works (§2D). AISloop is web documentation, so even studying the kits would fall outside the licence. Values come instead from sources whose terms allow it: the public HIG and WWDC sessions, screenshots of Apple's shipping apps (kept private, D-003), the CSS of Apple's public web apps (values as facts, no code copied), Apple's open-source Swift-DocC-Render (Apache 2.0, with attribution), and measurements of the owner's own devices.

**D-009 · 2026-11-20 · Two registers: app UI and product/landing pages. Ban carelessness, not styles.**
AISloop covers app interfaces (Apple app language) and product/landing pages (expressive, apple.com-like: large type, strong imagery, atmosphere). The anti-slop rules target careless execution (generic copy, interchangeable layouts, decoration without purpose, placeholder content, unchecked details, surface imitation), not looks that happen to be popular with AI tools. Evidence: p09 (marketing language chosen for a product page), follow-up notes on four counter-examples ("slop, but the atmosphere is beautiful"), and the owner's statement: "if the design is really beautiful, include it; the difference between trash AI slop and quality is what matters". Results: `research/01-taste-calibration/results.md`.

**D-010 · 2026-11-22 · Foundations fixed after the round-2 board.**
Accent stays our deeper blue (#0a6ee8 light, #0070ee dark), not Apple's #0088ff (r2p02 A). Dark mode base stays dark grey #1f1f1f with an even lighter-going ladder, not black (r2p03 A). Comfortable body stays 17px: the owner saw no difference between 17 and 16 (r2p01), so the measured iOS value wins. Hero headline size (88 / 64px), headline weight (700 / 600) and comfortable card radius (26 / 16px) are per-project choices (r2p04–r2p06 "depends"); the defaults stay 88px, 700 and 26px, and `foundations/typography.md` and `foundations/radii.md` say when to switch. Landing pages are always comfortable and show the app at comfortable size, after the compact version of the example page was disliked (r2i02). Results: `research/02-foundations/results-round2.md`.

**D-011 · 2026-11-22 · Icon set: Phosphor (MIT).**
It reproduces how SF Symbols works as a system (matching weights, outline and fill pairs, a layered duotone) best of the three open sets compared (Phosphor, Lucide, Heroicons); Lucide at 1.5px stroke is the fallback for outline-only projects. SF Symbols stay out of everything except `apple-native/` (licence). Comparison: `research/02-foundations/tokens-rationale.md` §7. Decided without a board, per D-012.

**D-012 · 2026-11-22 · Boards ask only real taste questions.**
Details that are minor, or that obviously change from project to project, are decided by the lead, recorded with the reason, and reported to the owner in a line; they don't go to a board or a follow-up question. Owner, after round 2: "don't make me pick everything; if something obviously changes per project or is very minor, you can decide it". Extends the round-1 rule that page-type decisions are never asked.

**D-013 · 2026-11-22 · Entry point and project setup.**
Agents start at `AGENTS.md`: a short reading order (preferences, foundations index, the foundation files the task needs, tokens, the example), how to tell which parts apply (`apple-native/` only for Apple-only native apps, described by the folder, not enforced by a rule, per the owner's wish), register first, project choices made by the agent without asking, image order, interface language, and `checklist.md` before calling anything done. A project that keeps AISloop copies `tokens.css` unedited, overrides in its own CSS, records its choices in `DESIGN.md` (from `templates/DESIGN.md`) and adds one line to its agent instructions. Tested with a fresh agent on a fictional product (`research/03-entry-point/trial-1.md`); its gaps were fixed the same day.
