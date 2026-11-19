# Motion

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Motion | https://developer.apple.com/design/human-interface-guidelines/motion (JSON `.../motion.json`) | 2026-11-19 |
| Accessibility › Cognitive (Reduce Motion) | https://developer.apple.com/design/human-interface-guidelines/accessibility | 2026-11-19 |
| SF Symbols › Animations | https://developer.apple.com/design/human-interface-guidelines/sf-symbols | 2026-11-19 |
| Popovers, Collections, Progress indicators (motion-related rules) | same base URL | 2026-11-19 |

Change log: 2025-09-09 Liquid Glass motion note added.

## 2. Key principles (paraphrased)

- **Purpose over decoration.** Motion should support the task, not upstage it; gratuitous animation distracts and can make people physically uncomfortable.
- **Motion is optional.** Never make animation the only carrier of information; pair it with other cues (on devices: haptics and sound).
- **Feedback motion should be realistic** and follow the gesture: a view revealed by sliding down should not be dismissed sideways.
- **Brief and precise** feedback animations feel light and communicate better than big ones.
- **Don't animate frequent interactions** in apps; standard controls already have subtle built-in motion, and people shouldn't wait on an animation every time.
- **Cancellable.** Don't block input until an animation ends, especially one people will see repeatedly.
- Liquid Glass motion is input-aware: stronger response to direct touch, more subdued with a trackpad.
- Reduce Motion (Accessibility page): when on, cut automatic and repeating animation, including zooming, scaling and peripheral motion. Suggested techniques: tighter springs (less bounce), motion that tracks the gesture directly, no animated depth (z-axis) changes, **replace x/y/z transitions with fades**, no animating into or out of blur.
- Be careful with fast-moving and blinking effects (dizziness, seizures).
- Specific motion rules elsewhere: animate popover size changes so it doesn't look like a new popover; collections may animate insert/delete/reorder; avoid changing a collection layout while someone is using it; keep progress indicators moving so the app doesn't look frozen.
- Symbol animations (SF Symbols) exist for appear, disappear, bounce, scale, pulse, variable colour, replace / magic replace, wiggle, breathe, rotate, draw on/off; use them sparingly and only when the movement means something.

Short quote: "Make motion optional."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Game frame rate for smooth motion | 30–60 fps | games, all | VERIFIED |
| Oscillation frequency to avoid | around 0.2 Hz | visionOS | VERIFIED |
| watchOS layout/appearance animations | built-in ease in and out; cannot be changed | watchOS | VERIFIED |
| **Durations (ms), easing curves, spring parameters** | **not given anywhere in the HIG** | all | — |

## 4. Do / Don't

**Do**
- Animate only when it explains something (state change, spatial relationship, feedback).
- Keep feedback animations short and precise.
- Let people interrupt animations.
- Offer non-motion equivalents.
- Under Reduce Motion: fades instead of slides/zooms; no bounce; no parallax.

**Don't**
- Don't animate for its own sake.
- Don't animate frequent, routine interactions.
- Don't make people wait for an animation to finish.
- Don't use fast blinking or sustained oscillation.
- Don't animate in/out of blur when Reduce Motion is on.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| MO1 | `@media (prefers-reduced-motion: reduce)`: replace transforms with opacity fades, remove bounce/parallax/auto-play loops, drop blur animations. Do not simply set all durations to 0 if the fade carries meaning. | Apple list VERIFIED; CSS INFERRED |
| MO2 | Durations: Apple gives none. Candidate tokens (INFERRED, must be tested by eye): micro-feedback 100–150 ms, small UI transitions 200–250 ms, sheets/large panels 300–400 ms. | INFERRED |
| MO3 | Easing: Apple's system motion is spring-based; CSS `linear()` can approximate springs, or use `cubic-bezier(.2,.8,.2,1)`-style ease-out. No Apple values exist. | INFERRED |
| MO4 | No animation on hover for dense lists/tables; instant highlight. | VERIFIED principle ("frequent interactions"); mapping INFERRED |
| MO5 | Don't block clicks during transitions (`pointer-events` must stay on the target UI; use the View Transitions API or interruptible CSS transitions). | INFERRED |
| MO6 | Direction must match origin: a sheet that rises from the bottom closes downward; a panel from the leading side closes to the leading side. | VERIFIED principle |
| MO7 | Never animate `filter: blur()` in or out under reduced motion; avoid it generally for performance. | VERIFIED (reduce motion list); perf note INFERRED |
| MO8 | Animated SF Symbols cannot be shipped (licence); simple CSS/SVG equivalents (a 1-shot scale "bounce" on a toggled icon) may be used sparingly. | INFERRED |

## 6. Open questions for the owner

1. How much motion overall: near-none (macOS-like) or soft springs on sheets and navigation (iOS-like)?
2. Do we allow springy overshoot at all, or ease-out only?
3. Should page/route transitions animate (View Transitions API), or swap instantly?
