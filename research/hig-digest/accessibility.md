# Accessibility (contrast, hit targets, text size)

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Accessibility | https://developer.apple.com/design/human-interface-guidelines/accessibility (JSON `.../accessibility.json`) | 2026-11-19 |
| Buttons (hit region) | https://developer.apple.com/design/human-interface-guidelines/buttons | 2026-11-19 |
| Pointing devices (pointer hit regions) | https://developer.apple.com/design/human-interface-guidelines/pointing-devices | 2026-11-19 |
| Dark Mode (7:1 target) | https://developer.apple.com/design/human-interface-guidelines/dark-mode | 2026-11-19 |
| VoiceOver | https://developer.apple.com/design/human-interface-guidelines/voiceover | 2026-11-19 |

Change log: 2025-06-09 (Assistive Access, Switch Control, Nutrition Labels); 2025-03-07 guidance refined, Dynamic Type moved to Typography, VoiceOver to its own page.

## 2. Key principles (paraphrased)

An accessible interface is **intuitive** (familiar, consistent interactions), **perceivable** (no single channel carries information), and **adaptable** (respects system settings, allows personalisation).

**Vision**
- Support larger text: ideally up to **200%** (140% on watchOS), by Dynamic Type or custom controls.
- Follow default/minimum text sizes; thin fonts need larger sizes.
- Meet contrast minimums (Apple cites both WCAG and APCA as measures; its Accessibility Inspector uses WCAG AA). If defaults fall short, at least provide higher-contrast colours when Increase Contrast is on; check both appearances.
- Prefer system colours (they have accessible variants).
- Don't use colour alone; add shapes or icons; consider letting people customise chart colours.
- Describe the interface for VoiceOver (labels for all key elements; describe meaningful images; hide decorative ones; use headings; declare grouping/order; announce layout changes).

**Mobility**
- **Big enough controls** (table below) and **space between them**: about 12 pt padding around bezeled elements, about 24 pt around borderless ones.
- Simple gestures for frequent actions; always an on-screen alternative to a gesture (e.g. swipe-to-delete also has an Edit/Delete button).
- Full keyboard use; don't override system shortcuts. Support voice control, switch control and similar by labelling elements well.

**Cognitive**
- Keep interactions simple and familiar.
- **Avoid time-limited UI** that dismisses itself; prefer explicit dismissal.
- No autoplay audio/video without controls; respect flashing-light preferences.
- Reduce Motion: cut automatic/repeating animation; fades instead of movement (see `motion.md`).
- In simplified modes, ask twice before hard-to-undo actions.

**Hearing**
- Captions, subtitles, audio descriptions, transcripts; never audio-only information; pair sounds with haptics/visual cues.

## 3. Concrete values

### 3.1 Control sizes (VERIFIED)

| Platform | Default control size | Minimum control size |
|---|---|---|
| iOS, iPadOS | 44 × 44 pt | 28 × 28 pt |
| macOS | 28 × 28 pt | 20 × 20 pt |
| tvOS | 66 × 66 pt | 56 × 56 pt |
| visionOS | 60 × 60 pt | 28 × 28 pt |
| watchOS | 44 × 44 pt | 28 × 28 pt |

Buttons page: a button needs a **hit region of at least 44 × 44 pt** (60 × 60 pt in visionOS) to be easy to select with finger, pointer, eyes or remote.
macOS image buttons: about **10 px** padding between image edge and button edge (the edges define the click area).

### 3.2 Spacing between controls (VERIFIED)

| Element type | Padding |
|---|---|
| With a bezel (visible shape) | about 12 pt |
| Without a bezel | about 24 pt around visible edges |
| visionOS buttons | centres at least 60 pt apart; 4 pt padding around buttons ≥ 60 pt |

### 3.3 Contrast (VERIFIED)

| Text size | Weight | Minimum contrast |
|---|---|---|
| Up to 17 pt | All | 4.5:1 |
| 18 pt and up | All | 3:1 |
| All | Bold | 3:1 |

Dark Mode page: never below 4.5:1; aim for **7:1** for custom colours, especially small text.

Note (our observation): Apple's "18 pt / bold = 3:1" is looser than WCAG's large-text definition (WCAG: 18 pt ≈ 24 CSS px regular, or 14 pt ≈ 18.66 CSS px bold). Because Apple pt ≈ CSS px, applying Apple's rule literally on the web would allow 3:1 for 18px text, which **fails WCAG 1.4.3**. Use WCAG thresholds on the web.

### 3.4 Text scaling (VERIFIED)

| Item | Value |
|---|---|
| Enlargement to support | at least 200% (watchOS 140%) |
| Text sizes | see `typography.md` §3.1 |

## 4. Do / Don't

**Do**
- 44 × 44 hit regions on touch; respect platform minimums.
- Keep ~12 pt around bezeled and ~24 pt around borderless controls.
- Meet 4.5:1 (small text) everywhere, aim for 7:1 on custom pairs.
- Support text enlargement to 200% without loss.
- Offer buttons for every gesture; full keyboard operation.
- Label all controls and meaningful images for screen readers; hide decorative ones.
- Respect Reduce Motion, Increase Contrast, Reduce Transparency.

**Don't**
- Don't convey state by colour alone.
- Don't auto-dismiss important UI on a timer.
- Don't autoplay media without controls.
- Don't override system keyboard shortcuts.
- Don't rely on complex multi-finger gestures.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| A1 | Touch (`@media (pointer: coarse)`): interactive targets ≥ 44 × 44 px (the visible control may be smaller; extend the hit area with padding or a pseudo-element). | 44 VERIFIED; px mapping INFERRED |
| A2 | Fine pointer (`pointer: fine`): targets ≥ 28 × 28 px default, never below 24 × 24 px (WCAG 2.5.8 AA). Apple's macOS minimum is 20 pt, below WCAG's 24 px; use 24 px as the web floor. | Apple + WCAG values VERIFIED; floor INFERRED |
| A3 | Contrast: WCAG 2.2 AA thresholds (4.5:1 normal, 3:1 for ≥ 24px regular or ≥ 18.66px bold, 3:1 for UI component boundaries and icons). Target 7:1 for small body text on custom surfaces. | VERIFIED (both sources); combination INFERRED |
| A4 | Text resize: layouts must survive 200% browser text zoom (WCAG 1.4.4) and 400% reflow at 320 CSS px (WCAG 1.4.10). | Apple 200% VERIFIED; WCAG VERIFIED |
| A5 | Reduce motion / contrast / transparency → `prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`; also `forced-colors: active` (Windows High Contrast) has no Apple counterpart but must not break. | INFERRED |
| A6 | Keyboard: visible focus ring on every interactive element (`:focus-visible`), logical tab order, Esc closes popovers/sheets/alerts, Enter triggers the default button. macOS has a "keyboard focus indicator colour"; on the web use the accent with ≥ 3:1 contrast. | Apple VERIFIED; CSS INFERRED |
| A7 | VoiceOver ↔ ARIA: labels → `aria-label`/`<label>`; headings → real `<h1>`–`<h6>`; grouping → landmarks and `role="group"`; layout changes → `aria-live` regions; decorative images → `alt=""`. | INFERRED |
| A8 | No toasts that vanish before they can be read; if used, keep them until dismissed or long enough, and mirror them in a live region. | VERIFIED principle (time-boxed UI); mapping INFERRED |
| A9 | Swipe actions (mobile web) must also be reachable via a button or menu. | VERIFIED |

## 6. Open questions for the owner

1. Desktop target size: Apple macOS default (28 px) or a roomier web default (32–36 px rows/buttons)?
2. Contrast target: AA (4.5:1) as the hard floor and 7:1 as aim, or require 7:1 (AAA) for body text?
3. Should AISloop always ship visible focus rings (Apple-like accent ring) even for mouse users, or only `:focus-visible`?
