# Loading and progress indicators

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Loading | https://developer.apple.com/design/human-interface-guidelines/loading (JSON `.../loading.json`) | 2026-11-19 |
| Progress indicators | https://developer.apple.com/design/human-interface-guidelines/progress-indicators | 2026-11-19 |
| Buttons › activity indicator in a button (iOS) | https://developer.apple.com/design/human-interface-guidelines/buttons | 2026-11-19 |
| Feedback (watchOS note), Alerts (no alert on launch) | same base URL | 2026-11-19 |

Change logs: Loading 2025-06-09; Progress indicators 2023-09-12.

## 2. Key principles (paraphrased)

**Loading**
- Ideal loading is invisible: it finishes before anyone notices.
- **Show something immediately:** placeholder text, shapes or animation, replaced as real content arrives. A blank screen reads as broken.
- **Let people keep working** while content loads in the background.
- If loading is unavoidably long, offer something worthwhile meanwhile (tips, new features), with timing estimated so it neither runs out nor repeats.
- Download big assets in the background after install/update.
- **Say that something is loading and roughly how long**; use determinate indicators when duration is known, indeterminate when not.

**Progress indicators**
- Two kinds: **determinate** (bar fills leading → trailing; ring fills clockwise) and **indeterminate** ("activity indicator", the spinner; macOS also has an indeterminate bar).
- **Prefer determinate**; it lets people decide whether to wait.
- **Report progress honestly and evenly** (not 90% in 5 seconds then a long tail).
- **Keep it moving;** a frozen indicator looks like a hung app. If the process stalls, say why and what to do.
- Switch indeterminate → determinate once the duration is known; **never switch spinner ↔ bar** (different shapes jolt the layout).
- Optional short description; avoid vague words like "Loading" or "Authenticating".
- **Same location every time.**
- **Cancel** if halting is safe; **Pause** too if cancelling loses partial work; warn (alert) if cancelling loses progress.
- iOS: pull-to-refresh for immediate reload, but **refresh automatically** too; refresh title only if it adds value (e.g. last update time), never instructions.
- macOS: prefer a **spinner** for background work and tight spaces (inside a field, next to a button); **don't label spinners**.
- iOS buttons can host a spinner with an "…ing" label for slow actions.
- watchOS: avoid loading indicators where possible; better to notify on completion.

Short quote: "Show something as soon as possible."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Bar fill direction | leading → trailing | all | VERIFIED |
| Ring fill direction | clockwise | all | VERIFIED |
| When to show an indicator | when loading takes "more than a moment or two" | all | VERIFIED (qualitative) |
| **Delay before showing a spinner (ms), bar height, spinner size** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Placeholder/skeleton content immediately.
- Determinate progress whenever possible; honest pacing.
- Consistent position; Cancel (and Pause) when safe.
- Inline spinners in small spaces; unlabelled.
- Automatic refresh plus manual refresh.

**Don't**
- Don't show blank screens or block the whole UI while loading.
- Don't let indicators freeze.
- Don't swap a spinner for a bar mid-task.
- Don't write "Loading…" when you can say what is loading.
- Don't alert at startup about loading problems.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| LP1 | Skeletons that match the final layout (same row heights, no shimmer needed; if shimmer is used, disable under `prefers-reduced-motion`). | Placeholder VERIFIED; skeleton style INFERRED |
| LP2 | `<progress value max>` for determinate, `<progress>` without value for indeterminate bar; spinner with `role="progressbar"` + `aria-busy` on the region being loaded; announce completion in a live region. | INFERRED |
| LP3 | Show a spinner only after a short delay (e.g. ~300–500 ms) to avoid flashes on fast responses (INFERRED; Apple gives "more than a moment or two"). | INFERRED |
| LP4 | Optimistic UI for quick mutations (aligns with "finishes before people notice"). | INFERRED |
| LP5 | Long uploads/exports: determinate bar with Cancel, a precise label ("Uploading 3 of 12 photos"), not "Loading…". | VERIFIED principle |
| LP6 | Pull-to-refresh on mobile web is mostly provided by the browser; don't reimplement; refresh data automatically (polling/revalidation). | INFERRED |
| LP7 | Offline / failed load: inline message near the content with a Retry button, cached data still visible. | VERIFIED principle (Alerts/Feedback); INFERRED UI |

## 6. Open questions for the owner

1. Skeleton screens vs a single small spinner: which feels more "Apple app" to the owner?
2. Shimmer animation on skeletons: allowed or considered slop?
