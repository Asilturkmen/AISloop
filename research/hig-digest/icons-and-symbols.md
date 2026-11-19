# Icons and SF Symbols (usage guidance, not the font)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Icons | https://developer.apple.com/design/human-interface-guidelines/icons (JSON `.../icons.json`) | 2026-11-19 |
| SF Symbols | https://developer.apple.com/design/human-interface-guidelines/sf-symbols (JSON `.../sf-symbols.json`) | 2026-11-19 |
| Toolbars, Menus, Context menus, Sidebars, Tab bars, Buttons (icon placement rules) | same base URL | 2026-11-19 |

Change logs: Icons 2025-06-09 (table of standard action symbols added); SF Symbols 2025-07-28 (SF Symbols 7: Draw animations, gradients); Menus 2026-06-08 (menu item icon guidance updated).

## 2. Key principles (paraphrased)

**Interface icons (glyphs)**
- Simple, recognisable, one concept each; use familiar metaphors tied to the action or content.
- **Consistency across the set:** same size, detail level, stroke weight and perspective; adjust dimensions optically so visually lighter shapes don't look smaller.
- **Match icon weight to adjacent text weight** unless you deliberately want one to dominate.
- **Optical centring:** asymmetric icons (e.g. a download arrow) may need to be nudged; bake that padding into the asset so geometric centring then looks right.
- No separate selected-state artwork needed in standard bars/buttons; the system handles it.
- Inclusive imagery (gender-neutral figures); text inside icons only when essential, localised, and flipped for RTL when it represents text direction.
- Vector format (SVG/PDF) for custom icons; give every custom icon an accessibility label.
- Don't draw Apple hardware.

**SF Symbols usage**
- Four rendering modes: monochrome, hierarchical (one colour, layer opacities), palette (one colour per layer), multicolor (intrinsic colours, e.g. red for data loss). Check each mode for legibility at the size used.
- Nine weights (ultralight→black) match the system font weights; three scales (small, medium default, large) relative to cap height, to change emphasis without breaking the weight match.
- Variants: **outline** (default; best next to text in toolbars and lists), **fill** (more emphasis; iOS tab bars, swipe actions, accent-coloured selection), slash (unavailable), enclosed in circle/square (better legibility at small sizes). Usually the container chooses: iOS tab bar → fill, toolbar → outline.
- Variable colour shows change over time (signal strength, volume), not depth.
- Animations should be rare and meaningful; consider the app's tone.

**Where icons belong (from component pages)**
- Toolbars: prefer symbols over text, **without borders** (no circled icons); the bar provides the container. Use text for actions symbols don't express well (e.g. "Edit"). Keep text-labelled items visually separate from symbol items.
- Menus: use icons **sparingly and with purpose**; in a group, all items have icons or none do; skip an icon if none clearly fits. Context menus should use the same standard icons as the system.
- Sidebars: familiar symbols; tinted with the accent by default; fixed colours only when meaningful.
- Tab bars: prefer filled symbols; always with a short label.
- Buttons: familiar icon for familiar action (share = box with up arrow); use text when it communicates better.

Short quote: "Use menu item icons sparingly and with purpose." (Menus)

## 3. Concrete values

### 3.1 Standard action symbols (VERIFIED; names only, the glyphs themselves may not be shipped on the web)

| Action | Symbol | Action | Symbol |
|---|---|---|---|
| Cut | `scissors` | Copy | `document.on.document` |
| Paste | `document.on.clipboard` | Done / Save | `checkmark` |
| Cancel / Close / Deselect | `xmark` | Delete | `trash` |
| Undo | `arrow.uturn.backward` | Redo | `arrow.uturn.forward` |
| Compose | `square.and.pencil` | Duplicate | `plus.square.on.square` |
| Rename | `pencil` | Move to / Folder | `folder` |
| Attach | `paperclip` | Add | `plus` |
| More | `ellipsis` | Select | `checkmark.circle` |
| Search | `magnifyingglass` | Find (and replace, next, previous) | `text.page.badge.magnifyingglass` |
| Filter | `line.3.horizontal.decrease` | Share / Export | `square.and.arrow.up` |
| Print | `printer` | Account / User / Profile | `person.crop.circle` |
| Like / Dislike | `hand.thumbsup` / `hand.thumbsdown` | Archive | `archivebox` |
| Calendar | `calendar` | Alarm | `alarm` |
| Bold / Italic / Underline | `bold` / `italic` / `underline` | Align left / center / justify / right | `text.alignleft` / `text.aligncenter` / `text.justify` / `text.alignright` |
| Bring to front / Send to back | `square.3.layers.3d.top.filled` / `square.3.layers.3d.bottom.filled` | Bring forward / Send backward | `square.2.layers.3d.top.filled` / `square.2.layers.3d.bottom.filled` |

### 3.2 Numbers

| Item | Value | Platform | Status |
|---|---|---|---|
| Symbol weights | 9 (ultralight … black) | all | VERIFIED |
| Symbol scales | 3 (small, medium, large) | all | VERIFIED |
| Hierarchical layer opacities in Apple's example | about 100% / 50% / 25% (from image alt text) | all | VERIFIED as example only |
| macOS document icon sizes | 16, 32, 128, 256, 512 px @1x (+@2x) | macOS | VERIFIED (not relevant to web UI) |
| Activity view custom icon | centre in about 70×70 px | iOS | VERIFIED |
| **Interface icon size in toolbars, lists, tab bars (pt)** | **not given** (tab bar icon sizes are deferred to Apple Design Resources) | iOS, macOS | — |
| **Stroke width** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Keep one icon style: same weight, size, perspective, detail.
- Match icon weight to text; centre optically.
- Outline icons next to text; filled for tab bars and selected states.
- Use the standard metaphor for standard actions.
- Label every icon-only control for assistive tech.
- All-or-none icons within a menu group.

**Don't**
- Don't put circles/borders around toolbar icons.
- Don't add icons to menus just to decorate.
- Don't redraw Apple products or SF Symbols that depict Apple features.
- Don't use variable colour to show depth.
- Don't add text inside icons unless essential.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| I1 | **SF Symbols cannot be used on the web** (licence: mock-ups for Apple platforms only; no use in apps for other platforms, no logos). Use an open-source set with similar construction (outline/fill pairs, multiple weights): candidates Lucide, Phosphor, Heroicons, Material Symbols (variable weight). Pick one set per project. | Licence restriction VERIFIED (sources.md §4.1 and SF Symbols page terms note); candidates INFERRED |
| I2 | Map Apple's standard actions (table 3.1) to equivalent glyphs in the chosen set, so "share" always looks like a box with an up arrow, "more" is an ellipsis, etc. | INFERRED |
| I3 | Icon size tied to text: e.g. `width: 1.2em` and stroke width chosen so stroke ≈ text stem weight; Apple gives no numbers. For 17px body text an icon box of ~20–22px; for 13px, ~16px (INFERRED). | INFERRED |
| I4 | Stroke-weight matching: with variable-weight sets (Material Symbols `wght`, Phosphor weights) map text 400→regular icon, 600→semibold icon. | INFERRED |
| I5 | Outline by default; filled variant for the selected tab/sidebar item and for swipe actions. | VERIFIED principle |
| I6 | Hierarchical rendering ≈ SVG with `currentColor` and layer `opacity` (1 / .5 / .25). | Opacities from Apple example; mapping INFERRED |
| I7 | Icon-only buttons need `aria-label` (and a `title` tooltip on desktop). | VERIFIED principle; ARIA INFERRED |
| I8 | Flip direction icons (back/forward arrows) under `dir="rtl"`; don't flip real-world objects or logos. | VERIFIED (Right to left page) |

## 6. Open questions for the owner

1. **Icons in lists and menus: yes or no?** Apple says "sparingly, with purpose, all-or-none per group". Settings-style coloured icon tiles are an iOS idiom; macOS menus are mostly text.
2. Which open icon set best matches SF Symbols' feel (stroke, terminals, roundness)? Needs a board.
3. Coloured icon tiles in sidebars (Apple Settings style) or monochrome/accent sidebar icons (Mail/Finder style)?
