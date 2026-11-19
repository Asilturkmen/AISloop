# Settings

## 1. Sources

| Page | URL | Read |
|---|---|---|
| Settings | https://developer.apple.com/design/human-interface-guidelines/settings (JSON `.../settings.json`) | 2026-11-19 |
| Writing › settings labels | https://developer.apple.com/design/human-interface-guidelines/writing | 2026-11-19 |
| Toggles (switches in rows; macOS mini switches), Lists and tables (grouped style), Search fields (search at top of sidebar, Settings app) | same base URL | 2026-11-19 |

Change log: 2024-06-10 (reorganised, game examples).

## 2. Key principles (paraphrased)

- **Good defaults first:** most people should never need to open settings.
- **Few settings.** Too many make the app feel unapproachable and make each setting hard to find.
- **Open settings the expected way:** ⌘-comma on a keyboard (Esc in games).
- **Don't ask for things you can detect** (Dark Mode, connected hardware).
- **Respect system-wide settings; don't duplicate them** in the app (accessibility, scrolling, authentication, appearance). Duplicates imply the system setting doesn't apply.
- **General settings area** holds infrequently changed, app-wide options (window behaviour, account options).
- **Task-specific options live in the task** (show/hide parts of a view, sort, filter) — not in settings, where they're disconnected from their effect.
- Only the rarest options go into the system Settings app; offer a button that opens it directly.
- **Labels:** practical names; when needed, explain what the setting does when **on**; link directly to a setting instead of describing its location (Writing).
- **macOS:** Settings item in the App menu (not a toolbar button in the main window; document-level options go in the File menu). The settings window has a **non-customisable toolbar of pane buttons that always shows the active pane**; window title = active pane name (or "App Name Settings" if single pane); minimise and zoom buttons dimmed; window size follows the pane; reopen to the last viewed pane.
- watchOS: no custom entries in system Settings; a few options at the bottom of the main view or in a More menu.

Short quote: "Minimize the number of settings you offer."

## 3. Concrete values

| Item | Value | Platform | Status |
|---|---|---|---|
| Keyboard shortcut to open settings | ⌘ + , | macOS, iPadOS with keyboard | VERIFIED |
| Single-pane settings window title | "App Name Settings" | macOS | VERIFIED |
| **Settings layout dimensions, row heights, pane widths** | **not given** | — | — |

## 4. Do / Don't

**Do**
- Pick defaults that suit most people.
- Keep settings few and general; put view options in the view.
- macOS-style: pane toolbar with the active pane highlighted; title reflects pane; reopen last pane.
- Describe the "on" behaviour in a footer line when the label isn't enough.

**Don't**
- Don't duplicate OS settings (theme, text size, reduce motion) in the app.
- Don't ask setup questions the app can detect.
- Don't put a settings button in the main toolbar (macOS).
- Don't bury per-task options (sort, filter) in settings.

## 5. Web translation

| # | Web rule | Status |
|---|---|---|
| ST1 | Route `/settings` reachable from the account/app menu and via ⌘/Ctrl + , in desktop-class web apps (browser doesn't reserve it). | Shortcut VERIFIED; web use INFERRED |
| ST2 | Layout options: (a) **iOS style**: inset grouped list, sections with headers and explanatory footers, switches in rows, drill-down rows with chevrons; (b) **macOS style**: top row of pane buttons (icon + label) or a sidebar of panes, right-aligned labels and controls in a form grid. | Both VERIFIED patterns; web mapping INFERRED |
| ST3 | **No in-app theme / text-size / reduce-motion settings** by default; read `prefers-*` media queries instead. | VERIFIED principle |
| ST4 | Changes apply immediately (Apple settings have no Save button); destructive or account-level changes confirm. | INFERRED (observed Apple behaviour, not stated) |
| ST5 | Search at the top of a long settings sidebar (System Settings / iPad Settings pattern). | VERIFIED (Search fields) |
| ST6 | Deep-link every pane/setting (`/settings/notifications#digest`) so help text and empty states can link directly. | VERIFIED principle (link to the setting); INFERRED URL scheme |

## 6. Open questions for the owner

1. Settings page model: iOS grouped list, macOS pane window, or a sidebar + form (System Settings on macOS Ventura+)?
2. Auto-apply vs explicit Save for web settings (many web backends need Save)?
