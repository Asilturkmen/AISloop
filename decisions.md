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
