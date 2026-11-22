# Before you call a design done

Check these yourself, in a real browser, on the real result. A screenshot you haven't looked at doesn't count.

## Look at it

- [ ] Light and dark, at about 390px (phone) and 1440px (desktop). Also 320px: nothing scrolls sideways.
- [ ] Nothing is clipped, overlapping or crowded. Labels wrap instead of being cut off.
- [ ] Alignment holds: edges line up, list rows line up like a list, gaps that look equal are the same token.
- [ ] Each screen has one clear main action. At most one accent-filled button per screen; app screens often have none, because bar actions are borderless icons.
- [ ] The thing a user acts on looks like an object (a button or a row with a shape and a hit area), not a bare coloured link.

## Tokens and rules

- [ ] Every colour, font size, space, radius, shadow and duration comes from `tokens.css`. No raw hex values or invented spacing. Layout proportions (`%`, `fr`, `ch`) and one-off sizes with no token (an avatar) may be raw; keep sizes on the spacing scale.
- [ ] Text styles match the register: app UI uses the text styles, landing headlines use the display scale.
- [ ] Glass only on chrome (bars, toolbars, menus, popovers), never on content.
- [ ] Nested corners follow the concentric rule.
- [ ] Icons: one set (Phosphor), one style per context, fill only for the selected item.
- [ ] The project choices are written in the project's `DESIGN.md`.

## Accessibility

- [ ] Text contrast at least 4.5:1, UI parts 3:1. Token pairs are already verified; measure the colours you added and text on images (against the brightest pixel under it). Tools: axe (e.g. `@axe-core/playwright`), Lighthouse, or the browser's DevTools contrast check.
- [ ] Every interactive element works by keyboard and shows the focus ring.
- [ ] Icon-only controls have an accessible name. Images have `alt` text.
- [ ] Hit areas at least `--hit-min`.
- [ ] Works with reduced motion, increased contrast and 200% zoom.

## The slop test

Answer honestly. One "yes" in the left column means it isn't done.

| Trash slop | Quality |
|---|---|
| Could the copy belong to any product? ("Why choose us", "Ship faster") | The words and imagery could only be this product's |
| Is the layout interchangeable? (the same hero, the same six feature cards) | One strong idea for this page; everything else is quiet |
| Is there an effect just to look impressive? (sparkles, glows, gradient text) | Every effect carries hierarchy or atmosphere the content needs |
| Placeholder people, stock avatars, invented numbers? | Real or realistic content, including long names and empty states |
| Any detail nobody checked? (contrast, spacing, clipped text) | Every detail measured |
| Does it imitate a surface? (fake macOS windows, traffic lights) | The behaviour and proportions, translated honestly to the web |

Source: [`preferences.md`](preferences.md#quality-not-style-is-what-we-ban-stated-2026-11-20).
