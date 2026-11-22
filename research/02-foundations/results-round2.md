# Round 2 results: foundations

Board: the same private review board as round 1 (round 2 added on top, 2026-11-22). The example page (fictional product Kestrel, `examples/foundations/`) was rendered with one token changed per pair; everything else identical. 11 of 11 answered on 2026-11-22.

## Pairs

| Id | Question | A | B | Vote | Outcome |
|---|---|---|---|---|---|
| r2p01 | Comfortable body size | 17px (iOS) | 16px | Both ("they look identical to me") | No perceived difference, so taste doesn't decide it. Keep 17px: the measured iOS value, and the HIG and Apple's long-form web text agree. The two renders were confirmed different (file hashes). |
| r2p02 | Accent | Ours #0a6ee8 (white text 4.8:1) | Apple #0088ff (white text 3.5:1) | **A** | Ours stays. |
| r2p03 | Dark base | Dark grey #1f1f1f | Black #000 | **A** | Grey ladder stays the default. |
| r2p04 | Hero headline | Up to 88px | Up to 64px | Depends | Project choice; guidance in `foundations/typography.md`. Default 88px. |
| r2p05 | Card radius (comfortable) | 26px | 16px | Depends | Project choice; guidance in `foundations/radii.md`. Default 26px. |
| r2p06 | Headline weight | Bold 700 | Semibold 600 | Depends | Project choice, decided together with the hero size; guidance in `foundations/typography.md`. Default 700. |

## Overall impression

| Id | View | Vote | Reading and action |
|---|---|---|---|
| r2i01 | Desktop, light, comfortable | Like | The default combination works. |
| r2i02 | Desktop, dark, compact | Dislike | No note. The landing sections stay comfortable in both modes, so the difference is the app window at 13px inside a large marketing page: it looks small and cramped. Rule added: landing pages are always comfortable and show the app at comfortable size (`foundations/layout-and-spacing.md`). Compact itself stays, for dense desktop tools. |
| r2i03 | Phone, light | Unsure | No note. Decided without a follow-up question (owner: don't ask minor things). Found and fixed: the tall 4:5 hero crop cut the notebook off at the right edge. The phone hero image is now 1:1, anchored right, with the whole notebook in frame (checked at 390px, light and dark). The two hero actions keep stacking on phones (the button and link don't fit one row at 390px); their spacing was tightened. |
| r2i04 | Phone, dark | Unsure | Same page as r2i03 in dark; same fixes. |
| r2i05 | Hero image fits the product | Like | Image stays. |

## Process note

After this round the owner asked not to be asked about minor or obviously project-dependent details: decide them, record the reason, and report in a line (D-012).
