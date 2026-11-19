# Dark Mode

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Dark Mode | https://developer.apple.com/design/human-interface-guidelines/dark-mode (JSON `.../dark-mode.json`) | 2026-11-19 |
| Color (dark values) | https://developer.apple.com/design/human-interface-guidelines/color | 2026-11-19 |

Change log: last change 2024-08-06 (artwork only).

## 2. Key principles (paraphrased)

- People pick Dark Mode system-wide and expect every app to follow it. **No in-app appearance switch**: it means more settings to manage and can make the app look broken when it ignores the system choice.
- Users may also pick **Auto**, which flips appearance during the day, possibly while the app is open; the app must look right in both and switch live.
- **Dark palette ≠ inverted palette.** Backgrounds get dimmer and foregrounds brighter; some colours invert, others don't.
- Test with Increase Contrast and Reduce Transparency, separately and together; dark text on dark backgrounds is where legibility fails.
- A permanently dark UI is acceptable only rarely, e.g. immersive media viewing where the UI should recede (Apple cites Stocks).
- Use adaptive (semantic) colours; when custom, define bright and dim variants. Avoid fixed colours.
- **Contrast floor 4.5:1; aim for 7:1** for custom foreground/background pairs, especially small text (stricter than the general accessibility table, which only asks for WCAG AA).
- **Soften white images.** Content images with white backgrounds should be dimmed slightly so they don't glow in a dark context.
- Icons and illustrations may need separate light/dark versions (e.g. a thin outline that's needed on one background but not the other).
- **iOS/iPadOS depth: base vs elevated backgrounds.** In dark mode, background interfaces use dimmer "base" colours and foreground layers (popovers, sheets, multitasking, separate windows) automatically use brighter "elevated" colours. Custom background colours can break this cue.
- **macOS desktop tinting:** with the graphite accent, window backgrounds pick up a hint of the desktop picture. Custom components with a visible background or bezel can add some transparency in their neutral state to share that tint, but not in coloured states.

Short quote: "Avoid offering an app-specific appearance setting."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Minimum contrast in both appearances | 4.5:1 | all | VERIFIED |
| Target contrast for custom colours, esp. small text | 7:1 | all | VERIFIED |
| Dark-mode system colour values | see `color.md` §3.1 / §3.3 | iOS, iPadOS, macOS, visionOS | VERIFIED |
| Base vs elevated background RGB values | **not given** on the HIG | iOS, iPadOS | — |
| How much to dim white images | **not given** ("slightly") | all | — |
| Dark Mode support | iOS, iPadOS, macOS, tvOS; not visionOS or watchOS | | VERIFIED |

## 4. Do / Don't

**Do**
- Follow the system appearance and switch live.
- Use semantic colours; define light and dark variants for every custom colour.
- Check contrast in both modes, with Increase Contrast and Reduce Transparency.
- Darken white-background images a little in dark mode.
- Provide separate icon/illustration variants when one asset doesn't work in both.
- Let foreground layers (sheets, popovers) use the lighter elevated surface in dark mode.

**Don't**
- Don't add an app-level light/dark toggle.
- Don't simply invert colours.
- Don't use fixed colour values that don't adapt.
- Don't replace system backgrounds with custom ones that remove the base/elevated distinction.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| D1 | Follow `prefers-color-scheme`; set `color-scheme: light dark` on `:root` so form controls and scrollbars adapt. No theme toggle by default. | Principle VERIFIED; CSS INFERRED |
| D2 | If a product truly needs a toggle (web apps sometimes do, e.g. shared screens), make "System" the default option. This departs from Apple; log it as a decision if adopted. | INFERRED |
| D3 | Two dark surface levels: `--bg` (base) and `--bg-elevated` used by dialogs, popovers, sheets and menus. Elevated must be lighter than base in dark mode; in light mode both may be white. Values: not given by HIG; candidates from the gray ramp (`#000` / `#1C1C1E`, or `#1C1C1E` / `#2C2C2E`) are INFERRED. | Concept VERIFIED; values INFERRED |
| D4 | `img` with white backgrounds in dark mode: `filter: brightness(.9)` or similar on opted-in images only (not photos with real whites). Amount INFERRED. | INFERRED |
| D5 | Contrast budget: 4.5:1 minimum everywhere; 7:1 target for small text on custom surfaces. | VERIFIED |
| D6 | Use `prefers-contrast: more` and `prefers-reduced-transparency: reduce` to swap to stronger colours and solid surfaces (the latter has limited browser support). | Apple test matrix VERIFIED; media queries INFERRED |
| D7 | Desktop tinting has no web equivalent (a page cannot read the desktop picture). Skip. | INFERRED |
| D8 | SVG icons with `fill="currentColor"` adapt automatically; multi-colour illustrations need `<picture>` with `media="(prefers-color-scheme: dark)"` sources. | INFERRED |

## 6. Open questions for the owner

1. Strictly no theme toggle (Apple), or "System / Light / Dark" with System default?
2. Pure black (#000) base in dark mode (iOS-like, OLED) or near-black (#1C1C1E-ish, macOS-window-like)?
3. Should dark mode be designed and reviewed on boards with equal weight, or light-first with dark derived?
