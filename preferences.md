# Preferences

The taste profile that AISloop's rules follow. Rules are derived from this file, never the other way round. When a rule and this file disagree, this file wins, and the rule gets fixed.

Each entry says where it came from:
- **voted:** chosen on a review board; evidence in `research/01-taste-calibration/results.md` (round 1) and `research/02-foundations/results-round2.md` (round 2, ids `r2…`)
- **stated:** said directly by the owner
- **observed:** inferred from a past project's accepted or rejected designs
- **inferred:** our reading of a pattern across several votes; to be confirmed on a later board

## Direction

- Interfaces should feel like Apple's own software: calm, clear and carefully made, not generated. *(stated)*
- Real beats imitation. A web copy of macOS chrome (fake windows, traffic lights, Finder look-alikes) was rejected twice, and the real Finder won the head-to-head. *(voted: p07, Puppertino windows)*

## Two genres, two registers

- **Inside an app** (lists, settings, editors, panels): Apple app language. *(stated; voted: most liked screens)*
- **Product and landing pages** are in scope too, in an expressive, apple.com-like register: large type, strong imagery, atmosphere. *(stated 2026-11-20; voted: p09 B; follow-ups on the glass hero, Framer, Sparkles, v0)*
- What was liked in those heroes is the **atmosphere and imagery**, not the template furniture: the generic feature-card grid was retracted on a second look. *(voted: follow-up)*
- On a landing page the atmosphere usually comes from the **imagery** (illustration or photo), more than from the type or the palette; it varies by product. So a landing page needs a real, product-specific image to carry it, not a generic gradient or glow. *(stated 2026-11-20)*
- When no such image exists, a hero built from the product's real interface is acceptable. *(voted: r3i01 liked)*
- On a phone, a landing page that reads as a wall of text is wrong, even when every part follows the rules: "it looks very monotonous; who reads all that text on a landing page". Each screen needs a visual moment. *(voted: r4i06 disliked, note)*

## Quality, not style, is what we ban *(stated 2026-11-20)*

"If the design is really beautiful, include it. The difference between trash AI slop and quality is what matters to us."

- A look is not slop because it is trendy or because AI tools often produce it. Glass, dark heroes, glows and big type are allowed when they are executed with care and serve the page.
- Slop is **carelessness**: something that could belong to any product, decoration that says nothing, and details nobody checked.
- Working test (inferred, to be refined into rules):

| Trash slop | Quality, even when trendy |
|---|---|
| Copy that fits any product ("Why choose us over others?", "Ship your X") | Words and imagery that only this product could have |
| Interchangeable layout: the same six cards, the same hero, any brand | One strong idea for this page, everything else quiet |
| Effects added to look impressive (sparkles, glows) with nothing to show | Effects that carry hierarchy or atmosphere the content needs |
| Stock avatars, placeholder people, invented numbers | Real or realistic content, including edge cases |
| Unchecked details: crowded lines, low contrast, uneven spacing, clipped text | Measured details: alignment, spacing scale, contrast, type set with care |
| Imitation of a surface (fake macOS windows, traffic lights) | The underlying behaviour and proportions, translated honestly to the web |

## Typography and titles

- Small centred title in the bar by default; large left-aligned titles only in exceptional cases. *(voted: p02 B)*
- Hero headline size (up to 88 or 64px) and headline weight (700 or 600) depend on the project. *(voted: r2p04, r2p06 depends)*
- 17px against 16px body text made no visible difference to the owner; not a taste question. *(voted: r2p01 both)*

## Density

- Density is per project, not global. *(voted: p01 depends)*
- Dense is welcome when hierarchy is clear: dense pro screens were liked (Pages inspector, Linear, Raycast, Mimestream, Fantastical, Mail inbox). *(inferred)*
- Dense is rejected when lines crowd each other without clear separation ("the lines run into each other"). *(voted: Framework7 mail list)*
- A compact app screen shown inside a large landing page looked wrong; landing pages stay comfortable. *(inferred: r2i02 disliked, no note)*

## Colour

- Amount of colour is per project: some get colourful palettes, some stay plain. *(voted: p04 depends)*
- Colour that carries meaning in small elements is liked (Reminders tiles, calendar events). Colour spread as a large background wash is disliked (Health gradient header, Music album tinted page, Craft pastel cards). *(inferred)*
- Selected-row style (grey vs accent) is per project. *(voted: p06 depends)*
- Accent: a slightly deeper blue that keeps white text readable, over Apple's brighter blue. *(voted: r2p02 A)*

## Shape

- Card roundness in comfortable density (26 or 16px) depends on the project. *(voted: r2p05 depends)*

## Materials (glass)

- Glass and flat are both acceptable for a sidebar. *(voted: p03 both)*
- Glass on bars and toolbars is liked (Mail toolbar close-up, glass nav over a hero). Glass as the surface of content tiles or tall panels is not (Control Center tiles disliked, tall glass popover unsure). *(inferred)*

## Dark mode

- Dark screens were liked across platforms (Calendar sheet, iPad Music, Linear, Raycast, App Store app page). Dark mode deserves first-class care, not an afterthought. *(inferred)*
- Dark base: dark grey, not black. *(voted: r2p03 A)*

## Decided by page type, not by taste

The owner asked not to be asked these: AISloop decides them from the kind of page. *(stated, p05)* The same goes for anything minor or obviously project-dependent: decide it, record why, and say so in a line. *(stated 2026-11-22, D-012)*
- Icons in list rows (e.g. Settings-style navigation lists get them; reading and form lists don't).
- Mobile list style and admin-panel style default to the calmer option unless the project says otherwise; on first sight the plain black-and-white panel looked better. *(voted: p08, p10 depends)*

## Observed in past projects (still valid)

- Options must differ in structure, not just in styling. *(observed)*
- In each design round, change one thing and say what stays the same. *(observed)*
- A list stays aligned like a list, even inside a chat-style layout. *(observed)*
- Text is never cut off. Alignment and consistent spacing matter more than decoration. *(observed)*
- The thing a user acts on should look like an object (a surface with a clear shape and hit area), not a bare coloured text link. *(observed)*

## Questions for the owner

None open.
