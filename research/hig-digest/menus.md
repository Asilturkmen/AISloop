# Menus (menus, pull-down buttons, pop-up buttons, context menus)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Menus | https://developer.apple.com/design/human-interface-guidelines/menus (JSON `.../menus.json`) | 2026-11-19 |
| Pull-down buttons | https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons | 2026-11-19 |
| Pop-up buttons | https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons | 2026-11-19 |
| Context menus | https://developer.apple.com/design/human-interface-guidelines/context-menus | 2026-11-19 |
| The menu bar (macOS; glanced for numbers) | https://developer.apple.com/design/human-interface-guidelines/the-menu-bar | 2026-11-19 |

Change logs: Menus **2026-06-08** (menu item icons); Context menus 2023-12-05 (hide unavailable items); Pop-up buttons 2023-10-24.

## 2. Key principles (paraphrased)

**Kinds**
- **Pull-down button** → menu of **actions/items related to the button's purpose** (Add → what to add; Sort → by what). After a choice the menu closes and the action runs.
- **Pop-up button** → **flat list of mutually exclusive options**; the button then shows the current choice. For actions, multi-select or submenus use a pull-down instead.
- **Context menu** → hidden, frequently used, **item-specific** commands (right-click / Control-click / long-press).
- **Menu bar** (macOS, iPadOS) → every command in the app.

**Labels**
- Verb or verb phrase for actions; **title case**; drop articles; trailing **ellipsis** when the item needs more input.
- Toggled items: one item whose label changes (Show Map ↔ Hide Map), or add a verb if a state label is ambiguous, or show both items; **checkmarks** for attributes in effect; consider a "remove all" item (Plain).

**Icons** (updated 2026)
- Use standard icons for standard actions; use icons **sparingly and with purpose** (common actions, key features, locations, devices, visual concepts like rotate, user content like folders). **All items in a group get icons, or none.** No icon if none fits clearly.

**Organisation**
- Most important / frequent items first; group related items with **separators**; keep related commands together even if some are rarely used.
- Watch length; split long menus or use a submenu; user-generated lists (History, Bookmarks) may be long and scroll.
- **Submenus:** sparingly; one level deep; about **five items** max before making a new menu; title the parent with the repeated term ("Sort By"); keep submenus openable even if all children are unavailable; prefer a submenu to indenting items.
- **Unavailable items:** dimmed in regular menus (keep the menu openable); **hidden** in context menus (except Cut/Copy/Paste on macOS).

**Pull-down specifics**
- Don't hide all of a view's primary actions in one pull-down.
- At least **three items** makes opening it worthwhile; one or two → separate buttons/toggles.
- Title only if it adds meaning. Destructive items in red and confirmed (action sheet on iOS, popover on iPadOS).
- iOS: a **More** (ellipsis) pull-down is fine for secondary items but hurts discoverability.

**Pop-up specifics**
- Sensible default selection; make the options predictable from the button label or an introductory label; a "Custom…" option for rare needs.

**Context menu specifics**
- Only the most relevant commands; short; consistent across the app; **every item also available elsewhere** in the main UI; submenus one level; at most about **three groups**; most frequent items nearest the pointer/finger; **no keyboard shortcuts shown** in context menus (show them in main menus); destructive items **at the end**, marked destructive (red); title only when it clarifies scope (e.g. "3 Messages"). iOS: an item gets a context menu or an edit menu, never both; previews should match the item's shape.

**iOS menu layouts:** small (row of 4 icon-only items on top), medium (row of 3 icons with short labels on top), large (default list).

Short quote: "Hide unavailable menu items, don't dim them." (context menus only)

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Submenu depth | 1 level | all | VERIFIED |
| Submenu length before splitting | about 5 items | all | VERIFIED |
| Pull-down minimum items | 3 | iOS, iPadOS, macOS, visionOS | VERIFIED |
| Context menu groups | about 3 max | all | VERIFIED |
| iOS menu top row | small: 4 icon-only; medium: 3 icon + label | iOS, iPadOS | VERIFIED |
| App name in macOS menu bar | 16 characters or fewer | macOS | VERIFIED |
| macOS menu bar height | 24 pt | macOS | VERIFIED |
| **Menu item height, menu width, corner radius, padding** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Choose: pull-down (actions), pop-up (one exclusive value), context menu (item commands).
- Title-case verb labels, no articles, "…" for items needing input.
- Separators between logical groups; frequent items first.
- Icons all-or-none per group; standard icons for standard actions.
- Destructive items last and red (context menus); confirm them.
- Duplicate context-menu commands in visible UI.

**Don't**
- Don't nest submenus more than one level.
- Don't show keyboard shortcuts in context menus.
- Don't dim items in context menus (hide them).
- Don't use a pull-down for fewer than three items.
- Don't indent items to fake hierarchy.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| MN1 | Pull-down: `<button aria-haspopup="menu" aria-expanded>` + `role="menu"`/`menuitem`; arrow-key navigation, type-ahead, Esc closes and returns focus. | INFERRED |
| MN2 | Pop-up: native `<select>` (most Apple-like on Apple platforms) or custom `role="listbox"`; the button shows the current value + an up/down chevron (macOS) or a down chevron. | INFERRED |
| MN3 | Context menu: `contextmenu` event on items in dense desktop apps; **always** provide the same commands via a visible "More" (ellipsis) button for touch and discoverability. | VERIFIED principle; implementation INFERRED |
| MN4 | Separators: `role="separator"` hairline or a small gap. | VERIFIED concept; ARIA INFERRED |
| MN5 | Shortcuts displayed right-aligned in main/pull-down menus (`aria-keyshortcuts`), never in context menus. | VERIFIED; ARIA INFERRED |
| MN6 | Menus render on an elevated surface (dark-mode elevated colour), optionally with material blur — menus are part of the functional layer. | INFERRED |
| MN7 | Popover API (`popover` attribute) + CSS anchor positioning can place menus next to their trigger without JS positioning (check browser support). | INFERRED |

## 6. Open questions for the owner

1. Icons in menus: never, or Apple's "sparingly, all-or-none per group"?
2. Should AISloop prescribe right-click context menus in web apps at all (browser expectation conflicts)?
