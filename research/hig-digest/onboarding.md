# Onboarding and launching

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Onboarding | https://developer.apple.com/design/human-interface-guidelines/onboarding (JSON `.../onboarding.json`) | 2026-11-19 |
| Launching | https://developer.apple.com/design/human-interface-guidelines/launching | 2026-11-19 |
| Offering help › Tips | https://developer.apple.com/design/human-interface-guidelines/offering-help | 2026-11-19 |
| Writing › multi-step flows | https://developer.apple.com/design/human-interface-guidelines/writing | 2026-11-19 |

Change logs: Onboarding 2024-06-10; Launching 2024-06-10.

## 2. Key principles (paraphrased)

**Launching**
- **Launch instantly**; people often won't wait more than a couple of seconds.
- Launch screens (iOS, iPadOS, tvOS only) exist to make launch feel fast: **nearly identical to the first screen**, no text, **no branding or ads**, matching orientation and appearance. A launch screen is not a splash screen.
- **Restore previous state** on relaunch: scroll position, windows, selection.
- If a splash screen is truly needed, show it at the start of onboarding (or right after launch), briefly.

**Onboarding**
- Ideally unnecessary: the app should be understandable by use. If needed: **fast, fun, optional**, and it comes **after** launch.
- **Teach by doing** (interactive, safe to try) rather than slides to read.
- Prefer **context-specific tips** at the moment of need over one big up-front flow; show them near the relevant UI.
- If a prerequisite flow is unavoidable, keep it brief; don't make people memorise.
- Tutorials: optional; if skipped, don't show again on next launch, but keep them findable (help, account or settings).
- Teach **your** app, not the OS or the device.
- Splash screen only briefly; don't make people wait on big downloads; no licence text inside onboarding.
- **Defer non-essential setup**; reasonable defaults let people start right away.
- Ask for permissions in onboarding only if the app can't work without them (and explain the benefit); otherwise ask when the feature is first used.
- **Ask for ratings or purchases only after people have used the app.**
- Flow wording: "Get Started" to begin, consistent "Continue"/"Next", "Done" to finish (Writing).

Short quote: "Downplay the launch experience."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Acceptable launch wait | "a couple of seconds" at most | all | VERIFIED (qualitative) |
| Tip scope | features of ≤ 3 actions; 1–2 sentences | all | VERIFIED |
| **Number of onboarding screens** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Show the real first screen fast; restore where people left off.
- Teach in context with small tips, or interactively.
- Make tutorials skippable and re-findable.
- Request permissions at the moment of use, with a reason.

**Don't**
- Don't brand or advertise on launch screens; no text on them.
- Don't front-load carousels of feature slides.
- Don't explain standard controls or the OS.
- Don't ask for ratings/purchases before people have used the app.
- Don't put licences in onboarding.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| ON1 | "Launch screen" on the web = app-shell skeleton that matches the first screen's layout (same chrome, placeholder content), never a logo splash. | VERIFIED principle; mapping INFERRED |
| ON2 | Restore state: persist route, scroll position, selection, sidebar state, open panels (URL + `sessionStorage`/`localStorage`). | VERIFIED principle; implementation INFERRED |
| ON3 | First-run: land directly in the product with a useful empty state (see `empty-states.md`) and one contextual tip, instead of a welcome carousel. | VERIFIED principle; mapping INFERRED |
| ON4 | Browser permission prompts (notifications, location, camera) only after a user action that needs them, preceded by an in-page explanation. | VERIFIED principle; web mapping INFERRED |
| ON5 | Tip components: dismissible, show once, max one at a time, frequency cap. | VERIFIED |
| ON6 | PWA `manifest` `background_color`/`theme_color` should match the first screen's background so the installed-app launch has no flash. | INFERRED |

## 6. Open questions for the owner

1. Any onboarding at all in AISloop patterns, or "empty state + tips" only?
2. Is a one-screen "what's new" sheet (Apple-style, after updates) acceptable?
