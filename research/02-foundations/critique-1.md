# Critique 1: foundations example page (Kestrel)

Phase 2, step 3 (see [PLAN.md](PLAN.md)). Independent review of [`examples/foundations/index.html`](../../examples/foundations/index.html) built on [`tokens/tokens.css`](../../tokens/tokens.css). Reviewed 2026-11-22 in Microsoft Edge (Windows, so Segoe UI renders in place of SF) at 1440×900, 1024×768 and 390×844 (390 with touch emulation), light and dark, comfortable and compact.

Evidence lives in `research/_private/02-foundations/critique/` (git-ignored): full-page shots `{light,dark}-{comfortable,compact}-{1440,1024,390}.png`, 2× detail crops `crop-*.png`, focus crops `focus-*.png`, hover crops `hover-*.png`. Measurements came from Playwright scripts (computed styles, bounding boxes, pixel sampling of the hero photo with the text hidden, a 40-step Tab walk, axe-core 4.10.2).

## Verdict

The page is close. The copy is specific to this product, the grouped settings list is measured with real care (rows exactly on token, text column aligned to the pixel), and compact density reads like macOS System Settings. It is not ready to show the owner yet because of four things anyone would see at a glance: a Turkish label inside an English settings list, a 40 px jump in the left edge between the hero and everything below it on wide screens, and two pieces of text that fail contrast (the "Sign in" link on the nav glass, and "How it works" over the photo on phones). In dark mode, the window loses its edges and the selected segment disappears. Two token gaps cause part of this: a theme cannot be scoped to one element, and the dark surface steps are too close together.

Counts: **4 blockers, 13 major (9 page, 4 token), 14 minor (9 page, 5 token)**.

---

## Page fixes

### BLOCKER

**P-B1. A Turkish label in an English settings list.**
- Where: `index.html:428`, `<span class="row-label">Senkronizasyon</span>`.
- Evidence: `crop-window-light-detail.png`, `crop-window-dark-detail.png`. Every other label is English. The row below it says Language = Türkçe, so a reader takes it for a half-done localisation or a typo, not a test of long words.
- Fix: `Sync` (value "Wi-Fi only"). If you want to test a long word, use realistic English content, e.g. a notebook name, not a label in another language.

**P-B2. The left edge jumps 40 px between the hero/nav and the rest of the page (≥ ~1260 px viewports).**
- Where: `.nav-inner` (`:45-49`) and `.hero-inner` (`:73-76`) put the gutter *inside* a 1180 px box. `.showcase`/`.showcase-inner` (`:113-114`) and `.foot-wrap`/`.page-foot` (`:129-130`) put it *outside*.
- Evidence (1440): wordmark, hero h1, lead and CTA at x = 170; eyebrow, h2, stage, feature list and footer at x = 130. At 1024 and 390 both are 40 / 16, so the problem only shows on wide screens, which is where the owner looks first. Visible in `light-comfortable-1440.png`: the hero headline sits to the right of "Settings you can set with cold hands."
- Fix: give both containers the same model, e.g.
  ```css
  .nav-inner, .hero-inner { box-sizing: content-box; max-width: var(--width-content-wide); padding-inline: var(--gutter); }
  ```
  (or move the gutter to `.nav` / `.hero` the way `.showcase` does it). Then check that all six edges land on one x.

**P-B3. "How it works" fails contrast over the photo on phones.**
- Where: `.hero .quiet` over the narrow-screen scrim (`:275`, `transparent 85%`).
- Evidence (390, text hidden, backdrop sampled under the link box): white against the median backdrop is 3.51:1, against the 95th-percentile pixel 3.02:1, against the brightest pixel 2.70:1. It is 17 px semibold, so it needs 4.5:1. The link sits on the cream notebook page and the leather edge (`crop-hero-390.png`). The primary button sits in the same zone but carries its own fill, so it is fine. On desktop everything passes: headline ≥ 3.17:1 against the brightest pixel (large text), lead ≥ 10:1.
- Fix: keep the scrim at full strength down past the actions on narrow screens:
  ```css
  @media (max-width: 700px) { .hero::before { background: linear-gradient(to bottom, var(--color-scrim) 0 78%, transparent 100%); } }
  ```
  Better still, and closer to how Apple lays out phone heroes: stack the copy on a dark field *above* the image instead of over it.

**P-B4. "Sign in" fails contrast on the nav glass (light theme), and it is a second accent in the first view.**
- Where: `.nav .signin { color: var(--color-accent-text) }` (`:55`).
- Evidence: with the nav text hidden, the light glass over the dark top of the hero samples rgb(182–217). `#055fcc` on those values gives 3.17–4.13:1 at 1440 and about 3.5:1 at 390. It is 15 px semibold, so it needs 4.5:1. The blue CTA in the hero is the one accent this view should have (HIG rule 1). Toolbars stay monochrome (rule 9).
- Fix: `.nav .signin { color: var(--color-label); }` (weight semibold is enough to mark it). Together with P-M1 this fully resolves it.

### MAJOR

**P-M1. In light mode the nav glass over the dark hero reads as a flat grey band, not as glass.**
- Where: `.nav` (`:38-44`) with `--material-bar` light tint over the photo.
- Evidence: `crop-nav-hero-1440.png`, `crop-hero-390.png`. The bar samples a uniform blue-grey (rgb 182–217) above a cinematic dark photo, with no visible blur texture. In dark mode the same bar looks right (`dark-comfortable-1440.png`). apple.com gives the local nav a dark appearance over dark heroes.
- Fix: give the nav the dark appearance while it overlaps the hero, and switch it back after scrolling past (an IntersectionObserver toggling an attribute). This needs token fix T-M1 (theme scoping). Interim page-only alternative: a transparent nav with label-on-media text over the hero, which gets the bar material once the page scrolls.

**P-M2. The eyebrow is overridden into a second lead paragraph.**
- Where: `.eyebrow` (`:116`) loses to `.showcase-head p` (`:118`, higher specificity), because the eyebrow is a `<p>` inside `.showcase-head`.
- Evidence: computed `.eyebrow` is `400 24px/33.6px`, which is the lead style, plus a stray `margin-top: 16px`. It should be the eyebrow token (`600`, 16→21 px). In the shots the head reads as grey line / black headline / grey paragraph, with the top and bottom lines styled identically, so the kicker has no hierarchy.
- Fix: `.showcase-head > p:not(.eyebrow) { … }` (or give the intro its own class).

**P-M3. The hero headline splits "keep up" across a line break.**
- Where: `.hero h1 { max-width: 6.6em; text-wrap: balance }` (`:77-80`).
- Evidence: at 1440, 1024 and 390 it renders as "Field notes / that keep / up with you." The phrasal verb breaks across lines in three lines of 96 px Segoe UI Bold. It is the first thing on the page.
- Fix: set the break by hand, as Apple does with hero lines: `Field notes<br> that keep up<br> with you.` (with `max-width: none`), or let it run to 2 lines at a smaller size (see T-m3). Recheck at 390, where the column is 358 px.

**P-M4. Dark mode: the app window sinks into its stage and loses its left edge.**
- Where: `.stage { background: var(--color-bg-secondary) }` (`:119-123`) around `.window { background: var(--color-bg-grouped) }` (`:135-144`).
- Evidence: dark stage #2a2a2a, window #1f1f1f (darker than its container, so it reads as a hole), sidebar #282828 against stage #2a2a2a = **1.03:1**. The window outline vanishes along the whole sidebar side and only the shadow remains (`crop-stage-dark.png`). In light mode the window and stage are also 1.02:1 apart, but there the light shadow still draws the edge.
- Fix (page): in dark mode, drop the stage fill (`background: transparent` or `var(--color-bg)`) and give the window a rim: `box-shadow: 0 0 0 1px var(--color-separator), var(--shadow-floating)`. See T-M2 and T-m4 for the token side.

**P-M5. Dark mode: the selected segment is invisible as a shape.**
- Where: `.segmented label:has(input:checked) { background: var(--color-bg-grouped-item) }` (`:249`).
- Evidence: in dark, the selected thumb is #2a2a2a on a track of ≈ #3d3d3f, **1.32:1**, darker than the track, so it reads as a hole. Only the bold weight shows which one is on (`crop-window-dark-detail.png`). On native iOS the dark thumb is #6c6c71 on a #313136 track (native-measurements §4.1).
- Fix: use a thumb token (T-M3). Page interim: `background: color-mix(in srgb, var(--color-label) 22%, var(--color-bg-grouped-item))` in dark only.

**P-M6. An invented primary action and too many accents in the settings view.**
- Where: `.actions` + "Back up now" (`:259`, `:454`), tinted "Invite a colleague" (`:441`), accent switch.
- Evidence: one view holds an accent-filled pill, an accent-tinted pill, an accent switch, and in the hero above, the blue CTA. Apple settings screens have no centred primary button at the bottom. Backup is a row with a status line. The button is there to demonstrate a token, which is furniture (preferences: "one strong idea, everything else quiet"; HIG rule 1).
- Fix: remove `.actions`. In "Sync", add `<button class="row">` "Back up now" in `--color-accent-text`, with a group footer such as "Last backed up today at 07:40." Keep the switch accent: it is the native on-state.

**P-M7. Compact rows have uneven heights inside one card.**
- Where: `.row { min-height: var(--row-height); padding: var(--space-8) var(--pad-row-x) }` (`:210`).
- Evidence (compact, any width): Capture card rows 36 / 36 / 40, Sync card 32 / 32 / 32, token 32. The 8 px vertical padding plus a 20 px switch gives 36; plus a 24 px segmented control gives 40. You can see the uneven rhythm in `crop-window-compact-light.png`. Comfortable is exactly 52 everywhere.
- Fix: a per-density vertical row padding (T-M4). Page interim: `[data-density="compact"] .row { padding-block: var(--space-4); }`, which puts every compact row at 32.

**P-M8. The hero image shows a blank paper notebook, but the product is software.**
- Where: `assets/hero.webp`.
- Evidence: the moor, first light and hovering kestrel are specific to this product and beautiful. The subject, an empty paper notebook and a pencil, would suit any stationery or journaling brand, and it contradicts the lead ("every line is stamped with place, time and weather"). Preferences: "a real, product-specific image" carries the landing atmosphere. This is a judgement call, but it is the one image on the page.
- Fix: regenerate with the same light and moor, but show the product in use: a phone or small tablet in a gloved hand or on the rock, showing a Kestrel note with a place, time and weather line. Alternatively keep the landscape and kestrel and drop the paper notebook.

**P-M9. On phones the centred toolbar title is not centred, and the stage makes a box inside a box.**
- Where: `.toolbar { grid-template-columns: 1fr auto 1fr }` (`:169`) with an empty `.tb-left`. `@media (max-width:700px) .stage { padding: var(--space-12); border-radius: var(--radius-3xl) }` (`:267`).
- Evidence (390): title centre at x = 178 against a column centre of 195 (compact: 187), so it sits 17 px off. The right group (88 px) is wider than its `1fr`, which pushes the title left (`crop-window-top-390.png`). The stage adds a 12 px grey frame of radius 26 around a window of radius 26. Under the concentric rule the inner radius would be 14, so the corners don't nest, and on a phone the frame serves no purpose (preferences: hierarchy without boxes).
- Fix: `.tb-left, .tb-right { min-width: calc(2 * var(--hit-min) + var(--space-4)); }` (or hide Share at narrow widths). At ≤ 700 px: `.stage { padding: 0; background: none; }` and `.window { border-radius: var(--radius-group); box-shadow: none; }`.

### MINOR

**P-m1. The feature trio is the familiar three-up, and its icons put accent colour on decoration.** `.points` (`:124-128`). The copy is specific and there are no cards, so it passes, but the accent-blue icons on non-interactive items dilute the one accent. At 1024 the first title wraps to two lines, so the three paragraphs start at different heights (`crop-full-1024.png`). Fix: `.points i { color: var(--color-label-secondary) }` (or drop the icons), and shorten the first title ("Notes know where they were written" → "Every note knows where").

**P-m2. The empty state is heavier than Apple's pattern.** `.empty` card (`:437-443`): an illustration icon, a title, a sentence and a tinted pill take ~170 px in a settings list. In Settings an empty shared list is a single accent-text row ("Invite a colleague…") with a footer. Fix: replace it with that row and a `group-foot`.

**P-m3. Copy details.** "Stamp every note with place, time and weather while I am writing" is long and first-person. Apple writes "Stamp notes with place, time and weather" and explains in the footer. "Sync and language" groups two unrelated things. Fix: shorten the label; rename the group "Sync and storage" and move Language to its own group or to the top.

**P-m4. Outline focus rings on middle rows cross the card edge.** `focus-nav-row.png`: a square ring 2 px outside a row that sits inside a rounded card. The ring is clearly visible (which is good), but it looks pasted on. Fix: `.card > .row:focus-visible { outline-offset: calc(-1 * var(--focus-ring-width)); }` so the ring sits inside the card, with the row radii already set.

**P-m5. Heading and landmark structure.** Two `h1`s (hero and toolbar "Settings"). axe reports `landmark-complementary-is-top-level` (moderate, the `aside` sits inside `main`); that is its only violation in all four modes. Fix: toolbar title as `h2`; `.sidebar` as a `div` (its `nav` groups already label it).

**P-m6. The reduced-motion override is harsher than the tokens' rule.** `:297-300` kills every animation and transition with `!important`, including colour fades. The tokens deliberately keep fades and shorten durations (tokens.css §7, HIG). Fix: delete the `*` rule; the hero `rise` already uses `--motion-scale` and the shortened `--duration-expressive`.

**P-m7. Literal values that bypass tokens, despite the header comment ("tokens only").** `56rem` (`:60`), `6.6em` / `21em` (`:79`, `:83`), `0em` lead tracking (`:82`), `90%` colour mix (`:84`), `18%` tint hover (`:104`), `scale(0.98)` (`:102`), `calc(lg + 8px)` hero button (`:105`), `44rem` window (`:143`), `40rem` column (`:188`), switch ratios `1.65` / `0.65` (`:232`, `:243`), icon `× 1.6` (`:254`). Semantic misuse: hero text uses `--color-on-accent`, the photo scrim uses `--color-scrim` (the modal backdrop), and the hero fallback background uses `--material-bar-solid`. Fix: add the tokens in T-m1 / T-m2 and soften the header comment to "no literal colours; layout limits are local".

**P-m8. The demo control crowds the hero on phones.** `.demo` (`:279`): the glass "View options" pill sits 33 px above the headline at 390 and floats over content for the whole scroll. It is a harness, not the design. Fix: pin it bottom-right (`top: auto; bottom: var(--gutter)`), or collapse it to an icon button at narrow widths.

**P-m9. Compact density on a touch screen keeps 32 px rows and a 33×20 switch.** At 390 with coarse pointer, `--hit-min` rises to 44 but nothing on the page uses it. Rows stay 32 (`light-compact-390.png`). Fix: `.row, .side-item { min-height: max(var(--row-height), var(--hit-min)); }` (see T-m5).

---

## Token fixes

### MAJOR

**T-M1. A theme cannot be scoped to one element.** `tokens.css:483`, `:553`: `data-theme` works only on `:root`, whereas `data-density` works on any element. Apple pages constantly need a dark island: a nav over a dark hero (P-M1), a dark media band, a dark product tile. Fix: repeat the dark block for `[data-theme="dark"]` on any element and the light block for `[data-theme="light"]`, and set `color-scheme` on the element (the same pattern as density). Keep the `:root` forms for the page toggle.

**T-M2. The dark surface steps are too close together, and some are identical.** `tokens.css:498-504` / `:555-561`: sidebar #282828, secondary #2a2a2a, grouped-item #2a2a2a, elevated #2c2c2c. Neighbouring pairs are 1.00–1.03:1, so any layout that puts two of them side by side loses its edges (P-M4). Native dark has wider steps: iOS card #2c2c2e on #1c1c1e; macOS sidebar #292929 against content #1e1e1e. Fix: spread the ladder and keep one hue, e.g. bg #1f1f1f, sidebar #282828, secondary and grouped-item #2c2c2e, elevated #333335, tertiary #3a3a3c (re-run the contrast script; label-secondary on #3a3a3c stays around 5.7:1). Add a rule to the colour notes: in dark mode, never place `bg` or `bg-grouped` on `bg-secondary`.

**T-M3. No token for a selected thumb (segmented control, popup chips).** Pages fall back to `bg-grouped-item`, which is right in light (#fff) and wrong in dark (P-M5). Fix: `--color-fill-thumb: #ffffff` (light), `#636366` (dark; native #6c6c71), with `--shadow-raised` in light only.

**T-M4. No vertical row padding per density.** `--pad-row-x` exists (`:251`, `:340`), but the vertical padding is left to each page, so compact rows drift off `--row-height` as soon as they hold a control (P-M7). Fix: `--pad-row-y: 11px` (comfortable, which keeps wrapped labels airy, like the iOS inset) and `4px` (compact). Note in the comments that `min-height: var(--row-height)` plus `--pad-row-y` keeps every one-line row on token.

### MINOR

**T-m1. Media tokens are missing.** The page needs "text on a photo" and "scrim under text on a photo" and borrows `--color-on-accent` and the modal `--color-scrim` for them. Fix: `--color-on-media: #fff`, `--color-on-media-secondary: rgb(255 255 255 / 0.86)`, `--color-media-scrim: rgb(0 0 0 / 0.45)`, with a note that text on media is checked against the brightest pixel under it.

**T-m2. The lead style has no tracking token.** `:73-75`. Every other style ships one, so the page writes `0em` by hand. Fix: add `--text-lead-tracking` (≈ −0.01em at 19–24 px).

**T-m3. The display-1 maximum (96 px) is above Apple's measured range.** `:61`. apple-web-css §2.4 measures 70–88 px on apple.com. At 96 px in a fallback font (Segoe UI Bold here) the hero headline turns blunt and needs three lines (P-M3). It is already a board question. Suggestion for the "current" option: `clamp(2.75rem, 1.5rem + 4.6vw, 5.5rem)` (88 px max).

**T-m4. The dark `--shadow-floating` lacks the light rim that `--shadow-overlay` has.** `:548`, `:601`. A floating surface in dark needs that 1 px rim to keep its edge (P-M4). Fix: prepend `0 0 0 1px rgb(255 255 255 / 0.06)` in both dark blocks.

**T-m5. The coarse-pointer override does not reach row heights.** `:357-365` raises `--hit-min` only, so compact rows and switches stay at 24–32 px under touch (P-m9). Fix: inside `@media (pointer: coarse) [data-density="compact"]`, raise `--row-height`, `--row-height-sidebar` and `--row-height-menu` to 44 px, or state in the comments that components must use `max(var(--row-height), var(--hit-min))`.

(Also note the contrast check in tokens-rationale §6.2 does not cover `--color-accent-text` on bar glass. Over dark content it measured 3.2–4.1:1 here (P-B4). Add a comment to the materials block: on glass bars, keep text at `--color-label`.)

---

## What works (keep these)

- **The copy belongs to this product.** "Settings you can set with cold hands", "so the north gate never gets mixed up with the south", "nothing sits behind a spinner", CSV with coordinates for a supervisor. It passes the first row of the slop table cleanly.
- **Realistic edge cases instead of placeholders:** a long notebook name that wraps in the sidebar, a three-line switch label at 390, a long value ("2.4 GB of 5 GB"), a non-English value ("Türkçe"), an empty state with a next step, a destructive action with an explanatory footer. Nothing is clipped at any width.
- **The grouped list is measured precisely.** Comfortable rows are exactly 52 px and sidebar rows 44 px. Row label, separator inset, group header and group footer share one text column (x = 556 at 1440, 60 at 390). Counts use tabular numerals.
- **Toolbar matches the owner's p02 choice:** a small centred title with a secondary subtitle (exactly centred on desktop, 860 = 860), borderless monochrome icon buttons with 44 px hits, no product name in the bar.
- **Glass only on chrome** (nav, menu). No glass on cards, tiles or panels.
- **The destructive action is done the Apple way:** its own group, a red label (not a red button) and a reassuring footer.
- **Controls have native proportions:** the switch is 50×30 (iOS 51×31) with a concentric knob; the segmented control nests capsule in capsule; the sidebar selection is the near-capsule 20 px iPad shape; compact uses 8 px selection and 12 px boxes like System Settings.
- **Compact density** reads convincingly like a macOS settings pane (`crop-window-compact-light.png`).
- **Robust basics:** no horizontal overflow in any of the 12 combinations. Every control shows a 3 px focus ring (a white ring on the hero), the Tab order is logical, and the search field rings on `:focus-within`. axe finds one moderate issue. Text tokens pass contrast in both themes.
- **The hero works on desktop:** the scrim keeps the 96 px headline ≥ 3.17:1 against the brightest pixel and the lead ≥ 10:1. The kestrel, moor and first light make a real atmosphere, with no gradient or glow.
- **The showcase stage at desktop** presents a real, working screen honestly: no traffic lights or fake window chrome, which follows the "real beats imitation" rule.
