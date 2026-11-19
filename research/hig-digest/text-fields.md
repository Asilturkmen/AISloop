# Text fields, text views, labels and data entry

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Text fields | https://developer.apple.com/design/human-interface-guidelines/text-fields (JSON `.../text-fields.json`) | 2026-11-19 |
| Text views | https://developer.apple.com/design/human-interface-guidelines/text-views | 2026-11-19 |
| Labels | https://developer.apple.com/design/human-interface-guidelines/labels | 2026-11-19 |
| Entering data | https://developer.apple.com/design/human-interface-guidelines/entering-data | 2026-11-19 |
| Writing › text fields and errors | https://developer.apple.com/design/human-interface-guidelines/writing | 2026-11-19 |

Change logs: Text fields 2023-06-05; Text views 2023-06-05; Labels 2023-06-05; Entering data 2023-06-21.

## 2. Key principles (paraphrased)

**Choosing**
- Label = small read-only text (often copyable). Text field = small editable text (name, email). Text view = long, multi-line, styled, optionally editable text.

**Entering data**
- **Don't ask for what the system can provide** (settings, location with permission).
- **Offer choices instead of typing** when feasible (pickers, menus).
- Support paste and drag-and-drop into fields.
- **Prefill sensible defaults**; never prefill passwords.
- **Validate as soon as possible** and give immediate feedback; enable Next/Continue only when required data is present.

**Text fields**
- **Placeholder hint** shows purpose or format ("Email", "name@example.com"); because it vanishes while typing, also show a **separate label**.
- **Secure fields** for passwords and sensitive data.
- **Field width matches expected input length.**
- **Even spacing; stack vertically; consistent widths** (first/last name one width, street/city another).
- **Logical tab order.**
- **Validation timing:** email when leaving the field; username/password before leaving it.
- **Number formatters** for numeric/currency/percent; never assume a locale's format.
- Overflow: clip by default, or wrap, or truncate at start/middle/end; a hover tooltip can reveal the full value (macOS expansion tooltip).
- iOS: appropriate keyboard type; **Clear button at the trailing end**; leading end = purpose icon, trailing end = extra functions (bookmarks).
- macOS: combo box when typing and choosing from a list combine.

**Labels / text views**
- Prefer system fonts; use the four label colours for importance (primary, secondary for subheadings/supplemental, tertiary for unavailable, quaternary for watermarks).
- **Make useful text selectable** (error messages, IP addresses, serial numbers).
- Keep text views legible; support text-size changes and Bold Text.

**Error copy (Writing)**: next to the field; instructive, not scolding ("Use only letters for your name"); no robotic "Invalid name".

No direct quote needed; the key rule is that a placeholder vanishes on typing, so a field also needs a visible label.

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Placeholder colour | `placeholderText` semantic colour (value not given) | iOS, macOS | VERIFIED (name) |
| Label colours | 4 levels | all | VERIFIED |
| **Field height, padding, border, radius, focus ring** | **not given** | — | — |
| Password example in Writing | "at least 8 characters" (copy example, not a rule) | | VERIFIED as example |

## 4. Do / Don't

**Do**
- Visible label + placeholder hint.
- Width suggests expected length; vertical stack; even spacing.
- Validate early, inline; instructive error text beside the field.
- Correct input types/keyboards; Clear button on iOS-style fields.
- Selectable error and info text.

**Don't**
- Don't rely on placeholder as the only label.
- Don't prefill passwords.
- Don't ask for data you can detect.
- Don't show errors in a separate modal or far from the field.
- Don't use one full-width field for everything (e.g. a ZIP code at 600px).

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| TF1 | `<label for>` always visible (above the field on mobile; leading column on desktop forms, macOS style); `placeholder` only for format hints. | VERIFIED principle; layout INFERRED |
| TF2 | `type`/`inputmode`/`autocomplete` attributes give the right iOS keyboard and AutoFill (`email`, `tel`, `url`, `numeric`, `one-time-code`, `current-password`, `new-password`). | VERIFIED principle (right keyboard); attributes INFERRED |
| TF3 | Validation: on `blur` for format fields (email), on `input` for constraints that must hold before continuing (new password rules); `aria-invalid` + `aria-describedby` to the message; disable/enable Continue accordingly (or explain on press). | Timing VERIFIED; ARIA INFERRED |
| TF4 | Width tokens: short (4–6 ch), medium (~20 ch), long (full) fields; `size`/`max-width` in `ch`. | VERIFIED principle; values INFERRED |
| TF5 | Clear button: `type="search"` gives one in WebKit; otherwise a trailing × button visible when non-empty, ≥ 44px hit area on touch. | VERIFIED (iOS); INFERRED for web |
| TF6 | Numbers/currency: `Intl.NumberFormat` with the user's locale; never hard-code separators. | INFERRED |
| TF7 | Placeholder colour = tertiary label-ish token; must still meet 4.5:1 if it conveys information (WCAG doesn't strictly require placeholder contrast, but Apple's legibility rules argue for it). | INFERRED |
| TF8 | `user-select: text` on error messages and identifiers; don't disable selection on read-only data. | VERIFIED principle |

## 6. Open questions for the owner

1. Form layout on desktop: labels above fields (web standard) or right-aligned labels in a leading column (macOS settings style)?
2. Field style: bordered boxes, filled grey (iOS search-field style), or grouped-list rows with inline fields (iOS Settings/Contacts)?
