# HIG digest

A structured, paraphrased digest of Apple's Human Interface Guidelines, written as the backbone for AISloop's web rules. Text only; no images, no Apple assets.

- **Read on:** 2026-11-19, from the HIG's JSON endpoints (`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json`), converted to text locally. 92 pages fetched; the ones used are listed in each file. Colour RGB values come from the swatch images' alt text in that JSON.
- **Wording:** all guidance is in our own words; at most one or two short quotes per file. Numeric specification tables (type sizes, colour values, control sizes) are reproduced as data.
- **Markings:** in every "Web translation" table, **VERIFIED** = Apple says it on the cited page; **INFERRED** = our translation or choice; **COMPUTED** = derived by us from verified numbers (e.g. hex codes, contrast ratios).
- **Unit assumption (INFERRED, used throughout):** 1 Apple pt ≈ 1 CSS px at 100% zoom. Basis: Apple's spec tables assume 144 ppi at @2x (2 device px per pt), and Safari's CSS px is also one logical point on Apple devices. Verify on hardware before relying on sub-pixel details.
- **"Not given"** in a values table means the number is not on the page. We did not fill gaps from memory.

## Files

### Foundations

| File | One line |
|---|---|
| [typography.md](typography.md) | Default/min sizes, full iOS Dynamic Type and macOS text-style tables (size, leading, weight, emphasized weight), SF tracking table, web type-scale mapping. |
| [color.md](color.md) | 2025 system colours with light/dark/increased-contrast RGB + hex, iOS grays, semantic colour names, Liquid Glass colour rules, computed WCAG contrast. |
| [dark-mode.md](dark-mode.md) | Follow the system, no app toggle, base vs elevated surfaces, 4.5:1 floor / 7:1 target, dim white images. |
| [layout.md](layout.md) | Hierarchy, alignment, grouping, size classes, safe areas, iOS/iPadOS/macOS mental models, windows, scroll edge effects; which numbers Apple no longer gives. |
| [materials.md](materials.md) | Liquid Glass (functional layer only, sparingly, regular vs clear, 35% dimming) vs standard materials; CSS approximations and their limits. |
| [motion.md](motion.md) | Purposeful, brief, optional, cancellable motion; Reduce Motion substitutions; no durations given. |
| [icons-and-symbols.md](icons-and-symbols.md) | Interface-icon rules, SF Symbols usage (weights, scales, variants, rendering modes), standard action symbol table, where icons belong; web icon-set substitution. |
| [accessibility.md](accessibility.md) | Control sizes per platform, spacing between controls, contrast table, text enlargement, and where Apple's numbers differ from WCAG. |
| [writing.md](writing.md) | Voice/tone, verbs, no "we"/"oops", error and empty-state copy, plus a capitalization/length table collected from 14 component pages. |

### Components and patterns

| File | One line |
|---|---|
| [lists-and-tables.md](lists-and-tables.md) | Text belongs in lists; grouped vs bordered styles; selection feedback; chevron vs info button; sortable/resizable columns; outline views; disclosure controls. |
| [collections.md](collections.md) | Standard grid or row only; text goes in lists; padding for hover/focus; no layout shifts. |
| [sidebars.md](sidebars.md) | Leading-side navigation, ≤ 2 levels, accent-tinted icons, hideable but not hidden by default. |
| [split-views.md](split-views.md) | Sidebar/list/detail, persistent selection in every pane, 1 pt dividers, hide/restore panes. |
| [tab-bars.md](tab-bars.md) | Navigation not actions, always visible, labelled, no More tab, badges sparingly; macOS tab views ≤ 6. |
| [toolbars.md](toolbars.md) | Navigation bars and titles: < 15-char titles, never the app name, ≤ 3 groups, borderless symbols, one prominent trailing action, large titles. |
| [search-fields.md](search-fields.md) | Live search, suggestions, scope bars and tokens, placement per platform (tab, bottom/top toolbar, inline, trailing toolbar, sidebar top). |
| [buttons.md](buttons.md) | Style/content/role, 1–2 prominent per view, style not size for preference, destructive never default; corrects a sources.md size claim. |
| [toggles.md](toggles.md) | Switches only in list rows (iOS), toggle buttons elsewhere; macOS checkboxes, radios (2–5), mixed state. |
| [segmented-controls.md](segmented-controls.md) | Equal segments, ≤ 5 on phones (5–7 wide), text or icons not both, not for app navigation. |
| [pickers-and-value-controls.md](pickers-and-value-controls.md) | Picker vs menu vs list by list length; date picker styles; sliders and steppers. |
| [menus.md](menus.md) | Pull-down vs pop-up vs context menus; labels, ellipsis, icons all-or-none, submenus one level, hidden vs dimmed items. |
| [popovers.md](popovers.md) | Small, anchored, one at a time, save on dismiss, sheet on narrow screens; tooltips ≤ 60–75 chars; tips. |
| [sheets-and-modality.md](sheets-and-modality.md) | When to go modal, one at a time, Cancel/Done/Back rules and placement, detents, grabber, macOS sheets and panels. |
| [alerts.md](alerts.md) | Rare, actionable alerts; titles and button wording; default trailing, Cancel leading; action sheets for chosen actions. |
| [text-fields.md](text-fields.md) | Labels + placeholders, sizing, spacing, validation timing, keyboards, labels/text views, data entry. |
| [settings.md](settings.md) | Few settings, good defaults, no duplicate OS settings, task options in context, macOS settings window. |
| [onboarding.md](onboarding.md) | Launch instantly, restore state, no branded launch screens; onboarding optional, interactive, in context. |
| [loading-and-progress.md](loading-and-progress.md) | Show something immediately, determinate over indeterminate, honest pacing, Cancel/Pause, spinners unlabelled. |
| [empty-states.md](empty-states.md) | No HIG page exists; rules assembled from Writing, Tab bars, Loading, Alerts. |
| [feedback.md](feedback.md) | Match feedback weight to importance, inline status, warn only on unexpected irreversible loss, confirm only significant success. |

## The 15 most important rules for a web UI that feels like Apple's apps

1. **One accent, used once per view.** Put the accent on the *background* of the single most likely action (Done, Save); keep bars, labels and icons monochrome, especially over colourful content. → [color.md](color.md), [buttons.md](buttons.md), [toolbars.md](toolbars.md)
2. **Glass only for chrome, and rarely.** Translucent material belongs to the navigation/controls layer floating over content (bars, floating sidebar, popovers), never to cards, rows or backgrounds; separate bars from content with a scroll-edge effect, not a painted bar. → [materials.md](materials.md), [layout.md](layout.md)
3. **Semantic colour tokens with four variants** (light, dark, light high-contrast, dark high-contrast); follow the system appearance, no in-app theme switch; lighter "elevated" surfaces for sheets and popovers in dark mode. → [color.md](color.md), [dark-mode.md](dark-mode.md)
4. **System font, Apple's text-style scale, no light weights.** `system-ui` stack, never embed SF; Regular/Medium/Semibold/Bold only; hierarchy from a fixed set of text styles plus emphasized weight. → [typography.md](typography.md)
5. **Hierarchy through four label levels, alignment and indentation,** not through boxes and colours. Primary/secondary/tertiary/quaternary text colours; align to scan; indent to subordinate; group with space or a hairline. → [layout.md](layout.md), [color.md](color.md)
6. **Text lives in lists.** Lists and tables for textual items (grouped sections or plain rows), grids only for images; standard layouts over attention-seeking custom ones (no bento mosaics). → [lists-and-tables.md](lists-and-tables.md), [collections.md](collections.md)
7. **Targets and spacing:** ≥ 44 × 44 px hit area on touch, ≥ 28 px (never < 24 px) on desktop; ~12 px around bezeled controls, ~24 px around borderless ones. → [accessibility.md](accessibility.md)
8. **Contrast is non-negotiable:** ≥ 4.5:1 for normal text, aim for 7:1 on custom surfaces; Apple's default light system colours (e.g. Blue #0088FF at 3.5:1) are fill colours, not text colours. → [accessibility.md](accessibility.md), [color.md](color.md)
9. **Toolbars stay quiet:** title under 15 characters and never the product name; ≤ 3 groups (navigation leading, tools centre, important + primary trailing); borderless symbols; standard back/close symbols without words. → [toolbars.md](toolbars.md)
10. **Navigation adapts to width, not device:** tab bar (labelled, always visible, navigation only) when compact; sidebar (≤ 2 levels) and split views with persistently highlighted selection when regular; same features at every size. → [tab-bars.md](tab-bars.md), [sidebars.md](sidebars.md), [split-views.md](split-views.md), [layout.md](layout.md)
11. **Modals are rare, short and single:** one sheet at a time, no navigation trees inside; Cancel leading + Done trailing, never Cancel + Done + Back together; popovers become sheets on narrow screens. → [sheets-and-modality.md](sheets-and-modality.md), [popovers.md](popovers.md)
12. **Alerts only for critical or irreversible moments:** specific title, 1–2-word verb buttons, no OK/Yes/No for decisions, default trailing, Cancel never default, destructive never default; undoable deletes get no alert. → [alerts.md](alerts.md)
13. **Write like a person, not a generator:** verb-first labels, no "we", no "oops", errors next to the field saying how to fix it, one capitalisation style per element type, "…" when more input follows. → [writing.md](writing.md), [menus.md](menus.md)
14. **Motion only when it explains,** brief and interruptible, none on frequent interactions, fades instead of movement under reduced motion. → [motion.md](motion.md)
15. **Never a blank or frozen screen:** show placeholders immediately, prefer determinate progress, give every empty state a next step, keep status inline instead of interrupting. → [loading-and-progress.md](loading-and-progress.md), [empty-states.md](empty-states.md), [feedback.md](feedback.md)

## Cross-cutting findings

- **Apple gives almost no geometry for iOS/macOS.** No corner radii, row heights, bar heights, button heights, spacing scale, layout margins, breakpoints, blur values or animation durations appear on the pages read. Only "concentric with the bar" for radii, ~12/24 pt padding, 1 pt dividers, and control-size minimums. Every such token in AISloop will be our decision and must be marked as such.
- **The Layout page dropped its device-size tables** in the 2026-09-09 update (still listed in its change log). Older third-party summaries citing "16 pt margins" etc. cannot be verified on the current HIG.
- **System colours changed in June 2025** (e.g. Blue #007AFF → documented #0088FF). The increased-contrast light variants all sit at ≈ 4.55–4.59:1 on white, i.e. just above WCAG AA.
- **Apple's large-text contrast threshold (18 pt / bold = 3:1) is looser than WCAG's** (24 px regular / 18.66 px bold). On the web, use WCAG.
- **macOS minimum control size (20 pt) is below WCAG 2.5.8 (24 px).**
- **Correction to `research/01-taste-calibration/sources.md` §3:** the button size steps (Mini 28 → Extra large 64 pt) are visionOS-only; there are no iOS/macOS button size steps on the Buttons page.

## Pages that failed or don't exist (2026-11-19)

| Slug | Result | Note |
|---|---|---|
| `navigation-bars` | 404 | Merged into Toolbars ("a navigation-specific toolbar … is sometimes called a navigation bar"). |
| `empty-states` | 404 | No such page; see [empty-states.md](empty-states.md). |
| `liquid-glass` | 404 | Covered in Materials and Color. |
| `content-and-layout` | 404 | Not a real slug; the index page is `layout-and-organization`. |

## Open questions the owner must decide (collected; details in each file)

1. **Density:** iOS-airy (17 px body, 44 px rows) or macOS-dense (13 px body, ~28 px controls), or a web middle scale keeping Apple's ratios?
2. **Glass:** none, top bar only, or bars + floating sidebar? Chromium-only refraction allowed?
3. **Accent:** Apple Blue (which variant) or a per-project brand accent? Apple's slightly blue grays or neutral grays?
4. **Titles:** large bold titles (iOS) or quiet small titles in the bar (macOS)? Centred or leading?
5. **Icons in lists, menus and sidebars:** none, Apple's "sparingly, all-or-none per group", or coloured tiles? Which open icon set?
6. **Capitalisation:** Apple's Title Case for buttons/menus, or sentence case everywhere?
7. **Theme toggle:** strictly follow the system, or offer System/Light/Dark with System default?
8. **Phone navigation:** bottom tab bar (Apple) or top bar + drawer (common web)?
9. **Desktop modals:** centred sheets (macOS) or side drawers (common SaaS)?
10. **Toasts:** banned (not an Apple pattern) or allowed for Undo only?
