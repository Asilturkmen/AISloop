# Phase 4 plan: patterns

Status: **batch 1 done** (2026-11-22). The three patterns, the list–detail example, the critique and trial 2 are in; round 4 voted 4 liked, 1 unsure, 1 disliked (the phone landing page, which led to a rule); see [trial-2.md](trial-2.md#board). Next: batch 2, one pattern at a time when a project needs it.

## Goal

Describe the screens agents build most often, one pattern per file in `patterns/`, each built on the foundations and tokens. A pattern counts as done only after an agent that has never seen AISloop has used it on a product and the result was accepted (a review board, or a real project).

## Format of a pattern file

**When** (and when not) → **Anatomy** (a small sketch and the parts) → **Rules** (with tokens) → **Narrow screens** → **States** (empty, loading, error, long content) → **Web translation** (an HTML skeleton) → **Don't** → **Related**.

## Batches

1. **Settings, list–detail, landing page.** The three most common screens. Settings and landing already have a live example (Kestrel, `examples/foundations/`); list–detail gets one (`examples/patterns/list-detail.html`, same fictional product).
2. Later, by need: forms and sign-in, navigation (tab bar, sidebar, top bar), dialogs and sheets, empty / loading / error states, tables and dashboards, onboarding.

## Steps per batch

1. Write the pattern files from the foundations, the HIG digest and what the Kestrel and Tally screens taught.
2. Build the missing live example from the tokens.
3. Independent critique of files and example; fix.
4. Trial: a fresh agent uses the patterns on a new fictional product; record gaps and fix them.
5. Board: the trial's screens; the owner votes. Then commit (the owner pushes).

## Team (within the owner's limit of three)

- Lead (this session): pattern files, fixes, board.
- Example builder: Sonnet, medium.
- Critic: Opus, high.
- Trial agent: Sonnet, medium (runs after the critic, so at most two agents at a time).

## Decided without asking (D-012)

- Batch order and the products used for trials.
- Settings apply immediately, without a Save button; changes that need validation (email, password) open a sheet with Cancel and Done.
- No device frames when a landing page shows the app: device frames are Apple artwork (D-003), and fake window chrome was rejected in round 1.
