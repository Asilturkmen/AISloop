# Collections (grids of items)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Collections | https://developer.apple.com/design/human-interface-guidelines/collections (JSON `.../collections.json`) | 2026-11-19 |
| Lockups (tvOS only: cards, caption buttons, monograms, posters) | https://developer.apple.com/design/human-interface-guidelines/lockups | 2026-11-19 |
| Layout › tvOS grids | https://developer.apple.com/design/human-interface-guidelines/layout | 2026-11-19 |

Collections page has no change log entries (stable, short).

## 2. Key principles (paraphrased)

- Collections suit **image-based content**: an ordered set shown as a row or grid.
- **Use the standard row or grid.** Custom layouts confuse people and draw attention to themselves.
- **Text belongs in a list**, not a collection.
- **Make items easy to pick:** leave enough padding around images so hover/focus effects are visible and items don't overlap.
- Default interactions: tap to select, touch-and-hold to edit, swipe to scroll; add custom gestures only when needed.
- Insert, delete and reorder can be animated (standard animations exist).
- **Don't change the layout while people are using it,** unless they asked for it (iOS/iPadOS).
- From Lockups (tvOS, but the logic carries): keep item sizes **consistent within a row or group**; leave room for focused items to grow without displacing neighbours; for people, prefer a photo over initials (monogram fallback = initials in a circle).

Short quote: "Avoid creating a custom layout that might confuse people or draw undue attention to itself."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| tvOS grid spacing | 40 pt horizontal; ≥ 100 pt vertical | tvOS | VERIFIED |
| tvOS unfocused item widths | 2 col 860, 3 col 560, 4 col 410, 5 col 320, 6 col 260, 7 col 217, 8 col 184, 9 col 160 pt | tvOS | VERIFIED |
| **Item size, gap, corner radius for iOS/iPadOS/macOS grids** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Standard grid or horizontal row.
- Padding so hover/focus states show.
- Animate insert/delete/reorder modestly.
- Keep partially visible items at edges to show scrollability (Scroll views page).

**Don't**
- Don't invent unusual layouts (masonry/bento) when a grid works.
- Don't present mostly-text content as tiles.
- Don't reflow the grid under the user's pointer/finger.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| CO1 | `display: grid; grid-template-columns: repeat(auto-fill, minmax(<item-min>, 1fr)); gap: <token>`. Item-min and gap are our choice (Apple gives none for iOS/macOS). | INFERRED |
| CO2 | Horizontal rows (shelves): `overflow-x: auto; scroll-snap-type: x mandatory;` with the last item partially visible. | INFERRED |
| CO3 | **Anti-slop link:** Apple's "standard grid, no attention-seeking custom layout" directly argues against bento grids and irregular card mosaics (counter-examples C1–C3 in `sources.md`). | VERIFIED principle; link INFERRED |
| CO4 | Text-heavy "cards" (title + blurb + icon repeated) should usually be a list. | VERIFIED principle |
| CO5 | Focus/hover ring needs room: gap ≥ ring width × 2. | INFERRED |
| CO6 | No layout shift on hover (no scale that pushes neighbours; Pointing devices page warns that scaling crowds neighbours). | VERIFIED principle |

## 6. Open questions for the owner

1. Are image grids in scope for AISloop at all (photo/media apps), or should the default be "use a list"?
2. Card style for grid items: borderless image + caption below (Photos/Music) or bordered cards?
