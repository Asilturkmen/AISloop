# Critique 2: foundations example page, second pass

Phase 2, step 3, round 2. Re-review of [`examples/foundations/index.html`](../../examples/foundations/index.html) and [`tokens/tokens.css`](../../tokens/tokens.css) after the fixes for [critique-1.md](critique-1.md). Same method as round 1: Edge on Windows (Segoe UI in place of SF); 1440×900, 1024×768 and 390×844 (390 with touch); light/dark × comfortable/compact; Playwright measurements of computed styles, boxes and row heights; contrast of every hero text line against the photo with the text hidden (median, 95th-percentile and brightest pixel under each line box); a 40-step Tab walk; axe-core 4.10.2; and a scroll test of the nav across the bottom of the hero.

Evidence: `research/_private/02-foundations/critique/round2/` (git-ignored). It holds full pages `{light,dark}-{comfortable,compact}-{1440,1024,390}.png`, 2× crops `crop-*.png`, focus crops `focus-*.png`, and nav scroll frames `nav-scroll-{light,dark}-{1440,390}-{-60,1,60}.png`.

## Verdict

**No blockers remain. The page is ready to show the owner once one new major is fixed.** Every round-1 blocker is fixed and measured. Edges line up on one x at every width. Rows are exactly on token in both densities. The toolbar title is centred at every width. Hero text passes with margin, and axe reports zero violations in all four modes. Dark mode is now as good as light. The one regression is the phone hero. The fix for "How it works" (a 62% scrim over the top 80% of the hero) is about twice as strong as the text needs, and it turns the photo into brown murk on phones: the notebook area loses 54% of its brightness. A small new nit: the nav switches to light 52 px too early while scrolling.

Counts in this pass: **0 blockers, 1 major (new), 5 minor (2 new)**. Of the 32 round-1 items: 26 fixed, 4 partly fixed, 1 not fixed (hero image, now an owner question), 1 disagreed-OK (reduced motion). T-M2 is counted as fixed; I agree with its documented accent-fill trade-off.

---

## Round-1 findings: status

### Page

| ID | Finding | Status | Evidence now |
|---|---|---|---|
| P-B1 | Turkish label "Senkronizasyon" | **FIXED** | "Sync / Wi-Fi only". Language moved to its own group ("App language / Türkçe"), which reads naturally. |
| P-B2 | Left edge jumps 40 px | **FIXED** | Wordmark, hero h1, eyebrow, window, feature list and footer all at x = 130 (1440), 40 (1024), 16 (390), in all four modes. |
| P-B3 | "How it works" contrast on phone | **FIXED**, but see N1 | At 390 every hero line is ≥ 8.4:1 against the brightest pixel under it (link 9.2:1, lead 8.4:1, h1 9.7:1). Needed: 4.5 / 3. |
| P-B4 | "Sign in" on nav glass | **FIXED** | The nav is a dark island over the hero (glass samples rgb 29–65). Links are white 92%, about 14:1. "Sign in" uses the label colour, so the CTA is the only accent in the first view. |
| P-M1 | Light glass over dark hero | **FIXED**, see N2 | `data-theme="dark"` on `.nav` while over the hero; light glass over white after it, as intended. In the dark theme the nav stays dark throughout. |
| P-M2 | Eyebrow overridden into a lead | **FIXED** | Computed `600 20.16px/25.2px`, the eyebrow token. The selector is now `.showcase-head > p:not(.eyebrow)`. |
| P-M3 | Headline split "keep / up" | **FIXED** | Set by hand: "Field notes / that keep up / with you." at 88 / 71 / 44 px. Reads well at every width (`crop-hero-1440.png`). |
| P-M4 | Dark window sinks, edge vanishes | **FIXED** | Stage removed. Window has a 1 px rim plus the token's dark rim. Dark sidebar #282828 against page #1f1f1f, cards #303030 on #1f1f1f: separate at a glance (`crop-window-dark-edge.png`). |
| P-M5 | Dark selected segment invisible | **FIXED** | Thumb #636363, lighter than the track (1.69:1 on a card), plus the bold label. Reads like the native control (`crop-capture-dark.png`). |
| P-M6 | Invented "Back up now" button, accent overuse | **FIXED** | "Back up now" is now an accent-text row in "Sync and storage" with the footer "Last backed up today at 07:40." The only accent fills in the view are the switch (native on-state) and the hero CTA. |
| P-M7 | Compact rows uneven | **FIXED** | Compact rows 32/32/32/32/32/32/32/32 (desktop) and 44 everywhere on touch, except a wrapped label (52). Comfortable 52 everywhere. |
| P-M8 | Blank paper notebook for a software product | **NOT FIXED** (kept) | See "Hero image and display cap" below. |
| P-M9 | Phone title off-centre; box in a box | **FIXED** | Title centre = column centre (195 = 195 at 390, both densities). No stage frame on phones. |
| P-m1 | Feature trio, accent icons | **FIXED** | Icons in secondary label colour. Title shortened to "Every note knows where", so all three titles are one line at 1024. |
| P-m2 | Heavy empty state | **PARTLY** | The pill became an accent-text button, which is quieter. The illustrated card stays. Acceptable as is; a single "Invite a colleague…" row would be more Apple-like. |
| P-m3 | Copy details | **PARTLY** | Groups fixed ("Sync and storage", "Language"). The label still ends with "while I am writing". Suggest "Stamp notes with place, time and weather". |
| P-m4 | Focus ring crosses the card edge | **FIXED** | Inset ring inside the card (`focus-nav-row.png`, `focus-danger-row.png`). |
| P-m5 | Two h1s, nested aside | **FIXED** | axe: **0 violations** in light/dark × comfortable/compact. Only `color-contrast` "incomplete" over the photo, which is expected and was measured by hand above. |
| P-m6 | Reduced motion too harsh | **DISAGREED-OK** | Under reduced motion the page now drops the hero reveal entirely rather than keeping a fade. Content shows at once. That is a fair reading of the HIG; the global `*` override is gone. |
| P-m7 | Literal values | **PARTLY** | Semantic misuse is fixed (`--color-on-media`, `--color-media-scrim(-strong)`, `--color-bg-secondary` as hero fallback). Layout literals remain (`56rem`, `21em`, `44rem`, `40rem`, knob `× 0.55`, empty icon `× 1.6`, hero button `lg + 8px`). They are local layout limits, which the header comment does not forbid. OK to leave. |
| P-m8 | Demo control crowds hero | **PARTLY** | Icon-only on phones, which is better. See N3 for the light pill on the dark hero. |
| P-m9 | Compact on touch: 32 px rows | **FIXED** | 44 px rows under coarse pointer (token T-m5 plus `max(var(--row-height), var(--hit-min))`). |

### Tokens

| ID | Finding | Status | Evidence now |
|---|---|---|---|
| T-M1 | Theme only on `:root` | **FIXED** | `[data-theme]` works on any element. Derived colours and glass re-resolve inside the island, and `:where([data-theme]:not(:root)) { color }` re-inherits text colour. Verified on the nav: link colour flips 0.88 black ↔ 0.92 white exactly at the switch. |
| T-M2 | Dark steps too close | **FIXED** | #1f → #28 → #30 → #39 → #42, neighbours 1.12–1.15:1. The trade-off (accent fill on dark cards 2.86:1, elevated 2.50:1) is documented in tokens-rationale §3.5 and §9. **I agree with it (DISAGREED-OK on the pair):** the state is carried by the knob or label at 4.61:1. Dark accent-text and palette text were relightened, and all pass on the new layers. |
| T-M3 | No selected-thumb token | **FIXED** | `--color-control-thumb` / `--color-control-track` / `--shadow-control-thumb`, including IC variants. |
| T-M4 | No vertical row padding | **FIXED** | `--pad-row-y = (row-height − control-height-sm) / 2`, so rows stay on token in every density and on touch. |
| T-m1 | Media tokens missing | **FIXED** | `--color-on-media(-secondary)`, `--color-media-scrim(-strong)`, with the worst-case rationale in the comment. |
| T-m2 | Lead tracking | **FIXED** | `--text-lead-tracking: -0.01em` (also `--text-eyebrow-tracking`). |
| T-m3 | Display-1 at 96 px | **FIXED** | 88 px maximum. See below. |
| T-m4 | Dark floating shadow rim | **FIXED** | 1 px white 6% rim in both dark blocks. |
| T-m5 | Coarse pointer ignores row heights | **FIXED** | Compact row, sidebar, menu and dense rows go to 44 px under `pointer: coarse`. |
| (note) | Accent text on glass | **FIXED** | The materials comment now warns that accent-coloured text on glass can drop below 4.5:1. |

---

## New issues introduced by the fixes

### MAJOR

**N1. The phone hero is over-darkened; the photo's atmosphere is gone on phones.**
- Where: `index.html:272`, `@media (max-width:700px) .hero::before { background: linear-gradient(to bottom, var(--color-media-scrim-strong) 0 80%, transparent 100%); }`.
- Evidence: `crop-hero-390.png` (round 2) against round 1's `../crop-hero-390.png`. Mean brightness of the notebook area fell from 146 to 67 (−54%), and of the sky on the right from 106 to 73. Text now sits at 8.4–9.7:1 against the *brightest* pixel, about twice what it needs (4.5:1 for the link and lead). The sunrise glow is out of frame and the paper reads as grey-brown. The preferences say the landing atmosphere comes from the image, and on a phone the image no longer carries it.
- Fix (recommended, and the usual Apple layout on phones): stack the copy above the image instead of over it.
  ```css
  @media (max-width: 700px) {
    .hero { flex-direction: column; align-items: stretch; min-height: 0; background: var(--color-bg); }  /* add data-theme="dark" to .hero */
    .hero::before { display: none; }
    .hero-img { position: relative; inset: auto; order: 2; height: auto; aspect-ratio: 4 / 5; object-position: 70% 50%;
                -webkit-mask-image: linear-gradient(to bottom, transparent, #000 20%); mask-image: linear-gradient(to bottom, transparent, #000 20%); }
    .hero-inner { padding-bottom: var(--space-32); }
  }
  ```
  Lighter alternative if the overlay stays: use `var(--color-media-scrim)` (45%) at full strength only from 0 to 55%, fading to transparent by 75%, and set `object-position: 78% 100%` so the bright paper falls below the fade. Then re-measure the link against the brightest pixel; it must stay ≥ 4.5:1.

### MINOR

**N2. The nav turns light 52 px too early while scrolling.**
- Where: `index.html:490`, `if (window.scrollY < hero.offsetHeight - nav.offsetHeight) …dark… else …light`.
- Evidence: the switch happens at scrollY = 844 (1440), when the bar still covers the last 51 px of the photo. For the next 52 px of scrolling, the light glass sits over the dark photo and shows the old grey band (`nav-scroll-light-1440-1.png`). At −60 and +60 px it is correct.
- Fix: switch at the midpoint, `if (window.scrollY < hero.offsetHeight - nav.offsetHeight / 2)`. Or switch when the hero is fully under the bar (`scrollY < hero.offsetHeight`).

**N3. In the light theme the demo pill is the only light object in the dark first view.** `.demo` (`:276`, `data-density="compact"` but no theme). It is a harness, so this is low priority, but the light glass pill under the dark nav looks like a leftover (`crop-hero-1440.png`). Fix: toggle `data-theme="dark"` on `.demo` with the nav in `navTheme()`.

**N4. Leftovers.** An empty `.stage { }` rule (`:118`) and its wrapper div remain. In dark, the window gets two 1 px rims (page ring 12% plus the token rim 6%). It looks fine, but the page ring is redundant there. Fix: delete `.stage`; optional.

(Still open from round 1, minor: P-m2 empty-state card, P-m3 "while I am writing", P-m8 demo placement.)

---

## Hero image and display cap

- **88 px cap: no longer a problem.** With the hand-set breaks the headline is three balanced lines ("Field notes / that keep up / with you."), stays inside the dark left half of the photo, and sits in apple.com's measured 70–88 px range. Every line is ≥ 5.8:1 against the brightest pixel under it at 1024 and ≥ 6.6:1 at 1440.
- **Hero image: still a mismatch, but no longer a craft problem.** On desktop the image is the best thing on the page: real light, the moor, a hovering kestrel, and now a dark nav that respects it. The subject is still a blank paper notebook for a software product, and it contradicts "every line is stamped with place, time and weather". I would not block on it. Put it to the owner as a taste question ("atmosphere only" against "product in the scene"), ideally as a pair on the round-2 board, rather than spend a regeneration before asking.

## What improved most (keep)

- One left edge, one text column, one row height per density, in all 12 combinations. This is the "measured details" row of the preferences table, done properly.
- The dark nav island over the hero, switching to light glass over content. It is apple.com behaviour, and it comes from a reusable token mechanism (`data-theme` on any element), not a page hack.
- Dark mode surfaces now step cleanly (page, sidebar, card, control thumb), and the selected segment is visible.
- The settings view is quiet: one accent fill (the switch), accent text for links, "Back up now" as a row with a status footer.
- Accessibility: axe is clean, the focus ring is visible everywhere (light-blue ring on the dark nav, white on the hero, inset on rows), and there is no overflow at any width.
