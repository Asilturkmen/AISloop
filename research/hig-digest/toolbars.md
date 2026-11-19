# Toolbars, navigation bars and titles

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Toolbars | https://developer.apple.com/design/human-interface-guidelines/toolbars (JSON `.../toolbars.json`) | 2026-11-19 |
| Navigation bars (`.../navigation-bars`) | **404**: the separate page no longer exists; the Toolbars page says a navigation-specific toolbar in iOS "is sometimes called a navigation bar". | 2026-11-19 |
| Scroll views › Scroll edge effects | https://developer.apple.com/design/human-interface-guidelines/scroll-views | 2026-11-19 |
| Windows (macOS frame), Settings (macOS settings toolbar) | same base URL | 2026-11-19 |

Change log: Toolbars 2025-12-16 (Liquid Glass).

## 2. Key principles (paraphrased)

**What a toolbar holds:** the view title, navigation controls (back/forward, search), and actions (buttons, menus). It acts on the current view; a tab bar is for switching app areas.

**Best practices**
- **Choose items deliberately;** too many become indistinguishable. Decide which items move to overflow as the bar narrows. iPadOS/macOS add the overflow menu automatically; don't add it yourself and don't design a bar that overflows by default.
- A **More menu** (ellipsis) holds less important actions, only if really needed.
- Let people customise toolbars on iPad/Mac in item-rich, long-session apps.
- **Reduce toolbar backgrounds and tinted controls;** let content colour the bar and use a scroll edge effect for separation.
- Keep item labels monochrome over colourful content.
- Use standard components; their corner radii are **concentric** with the bar; custom items must be too.
- Optionally hide toolbars for distraction-free modes, with a reliable way back.

**Titles**
- Give each window/view a useful title, or leave it empty if redundant (Notes shows no title for a single note).
- **Never title a window with the app name.**
- Keep titles **under 15 characters**.
- iOS: **large titles** help orientation; a large title shrinks to a standard inline title as content scrolls and grows back at the top.

**Navigation**
- Use the **standard Back and Close buttons** with their standard symbols, **without the text "Back" or "Close"**. Custom versions must look and behave the same and be used consistently.

**Actions**
- Prioritise the commands people use most (or that act on the most important objects).
- Meaning must be clear; **prefer symbols to text**, except for actions symbols don't express well (e.g. Edit).
- **Symbols without borders** (no outlined circles); the bar groups provide the container and states.
- **One primary action** (Done, Submit) in the **prominent** (tinted) style, on the **trailing** side.

**Groupings**
- Three zones: **leading** (back, sidebar toggle, title, document menu; not customisable), **center** (common controls; customisable; collapses into overflow first), **trailing** (always-visible important items, inspector buttons, search, More menu, primary action).
- Group by function and frequency; give navigation and critical actions (Done/Close/Save) their own visually distinct groups.
- **At most about three groups.**
- Keep text-labelled buttons separated from symbol buttons (fixed space), or they read as one control.
- Same groupings across platforms.

**Platform notes**
- iOS: include only essentials; the rest goes in More.
- iPadOS: toolbar and tab bar can share the top row.
- macOS: toolbar lives in the window frame (below or merged with the title bar); items have no bezel; **every toolbar item must also exist as a menu-bar command** (toolbars can be hidden/customised).
- Settings windows (macOS): non-customisable toolbar of pane buttons that always shows the active pane; title = active pane name.

Short quote: "Don't title windows with your app name."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Title length | under 15 characters | all | VERIFIED |
| Toolbar groups | max about 3 | all | VERIFIED |
| Primary (prominent) actions | 1, trailing side | all | VERIFIED |
| Zones | leading / center / trailing | all | VERIFIED |
| macOS menu bar height (context) | 24 pt | macOS | VERIFIED (The menu bar page) |
| **Toolbar height, large-title area height, item spacing** | **not given** | iOS, macOS | — |
| Large title type size | 34 pt (iOS Large Title style), 26 pt (macOS) | | VERIFIED (Typography; mapping to the bar is INFERRED) |

## 4. Do / Don't

**Do**
- Title = short location name (< 15 chars).
- Back = chevron symbol only; Close = × symbol only.
- Symbols without borders; text only for symbol-poor actions.
- One prominent primary action on the trailing edge.
- ≤ 3 groups: navigation (leading), tools (center), important + primary (trailing).
- Large title that collapses on scroll (iOS-style views).
- Every toolbar command also available elsewhere (menu, context menu, keyboard).

**Don't**
- Don't title with the app name.
- Don't write "Back"/"Close" next to the symbols.
- Don't put circles/outlines around toolbar icons.
- Don't tint the toolbar background or many items.
- Don't let text and symbol buttons touch.
- Don't make the toolbar the only place a command exists.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| TO1 | Top bar = `<header>` with three grid areas: `grid-template-columns: 1fr auto 1fr` (leading / center / trailing), so the title stays centred on iOS-style bars; on macOS-style bars the title is leading-aligned after the back/sidebar buttons. | Zones VERIFIED; CSS INFERRED |
| TO2 | No background at rest; show a hairline or blur (scroll edge effect) only once content scrolls under it. | VERIFIED intent; implementation INFERRED |
| TO3 | Large title pattern: an `<h1>` at Large Title size in the content; when it scrolls out, a small title fades in centred in the bar (IntersectionObserver or scroll-driven animation). | Behaviour VERIFIED (iOS); implementation INFERRED |
| TO4 | Icon buttons: borderless, ≥ 44px hit area on touch / ≥ 28px on desktop, `aria-label`, tooltip on desktop. Hover shows a subtle background shape (system-provided hover in Apple bars). | Borderless VERIFIED; sizes per accessibility.md |
| TO5 | Primary action: one filled accent button ("Done", "Save") at the trailing end. | VERIFIED |
| TO6 | Overflow: below a width, center-zone items collapse into a "More" (ellipsis) menu; trailing primary action never collapses. | VERIFIED behaviour; implementation INFERRED |
| TO7 | Back button: chevron icon, optionally followed by the *previous page's title* is an older iOS pattern; the current HIG says symbol only. | VERIFIED (current page) |
| TO8 | `<title>` of the page/tab: the view title, not only the product name (web equivalent of "don't title windows with the app name"; product name may follow, e.g. "Inbox — Product"). | INFERRED |
| TO9 | Keyboard: every toolbar action has a shortcut or menu equivalent in desktop-class web apps. | VERIFIED (macOS rule); INFERRED for web |

## 6. Open questions for the owner

1. **Large bold titles (iOS) or quiet small titles in the bar (macOS)?** (Open question in `preferences.md`.)
2. Centred title (iOS) or leading title (macOS/iPadOS) in the top bar?
3. Back button: chevron only, or chevron + previous-page name (older iOS habit many users still expect on the web)?
