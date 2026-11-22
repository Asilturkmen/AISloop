# Settings

## When

The screen where people change how the app behaves for them: account, notifications, sharing, data, preferences. Not for options that belong to a task: sorting, filtering and view options live next to the thing they change.

## Anatomy

```
Desktop (≥ 700px)                          Phone (< 700px)
┌────────────┬──────────────────────────┐   ┌──────────────────────┐
│ App        │        Pane title     ✕  │   │ ‹ Settings  Pane     │
│            │                          │   │                      │
│ ⚙ Account  │   Group header           │   │  Group header        │
│ ◻ Sharing  │  ┌────────────────────┐  │   │ ┌──────────────────┐ │
│ ◻ Alerts   │  │ Label        [on]  │  │   │ │ Label      [on]  │ │
│            │  │ Label     Value  › │  │   │ │ Label   Value  › │ │
│            │  └────────────────────┘  │   │ └──────────────────┘ │
│            │   Footer explains it.    │   │  Footer explains it. │
└────────────┴──────────────────────────┘   └──────────────────────┘
 sidebar of panes   content: grouped lists
```

Parts: a **sidebar of panes** (desktop) or a **list of panes** (phone), a **bar** with the pane's name as a small centred title, and the pane's content as **inset-grouped lists**: group header, rows, group footer.

## Rules

### Content

- **Few settings, good defaults.** Most people should never need this screen. Before adding a setting, ask whether a better default would remove it.
- **Don't duplicate system settings.** Theme, text size, reduced motion and contrast come from the system (`prefers-*`). "Works in light and dark" means following the system, not adding a setting. Offer a theme override only when the brief asks for one; it then has three options, System (default), Light and Dark.
- **Don't ask for what the app can detect** (time zone, language of the browser) except as an override.
- Labels are plain nouns or short phrases ("Notifications", "Sync over Wi-Fi only"). When the label isn't enough, the **group footer** says what happens when the setting is on.
- Group by what people think about together (Account, Sharing, Notifications, Data), not by how the code is organised.

### Layout

- Desktop: sidebar (`--sidebar-width`, `--color-bg-sidebar` or glass per project) with one row per pane, each with a leading icon (`regular`, `fill` when selected). Content column centred, at most `--width-content-narrow` (692px), on `--color-bg-grouped`.
- With more than about eight panes, put a search field at the top of the sidebar.
- A single short pane (three groups or fewer) needs no sidebar: one page of grouped lists.
- Bar: `--bar-height`, the pane's name as a small centred title (`--text-headline`), a close button (`x`) on the trailing side when settings open over the app.
- Groups: `--color-bg-grouped-item`, `--radius-group`, `--gap-group` between groups. Header above in `--text-footnote` (emphasized weight), `--color-label-secondary`. Footer below in `--text-footnote`, `--color-label-secondary`.

### Rows

| Row | Leading | Trailing |
|---|---|---|
| On / off | label (and optional subtitle) | switch |
| Choose one of 2–3 | label | segmented control |
| Choose one of many | label | current value + `caret-up-down`, opens a menu |
| Drill down | label | current value + chevron (`caret-right`); the whole row is the link |
| Action | label in `--color-accent-text` ("Back up now") | nothing, or a spinner while it runs |
| Destructive | label in `--color-red-text` ("Delete account") | nothing |
| Sign out | label in `--color-red-text`, in its own last group of the Account pane | nothing; confirm only if unsynced data would be lost |
| Info | label | value in `--color-label-secondary`, not interactive |

- Rows follow the foundation row rules: `--row-height`, `--pad-row-y`, `--pad-row-x`, separators inset to the text (`--pad-row-x` from the leading edge, past the icon when there is one).
- Labels wrap; values truncate only when the full value is shown one level down.
- If a segmented control doesn't fit beside its label at 320px, use the menu row (current value + `caret-up-down`) instead.
- A destructive action sits alone in the **last group** of its pane, with a footer that says what happens to the data.

### Behaviour

- **Changes apply immediately.** No Save button.
- A change that needs input or validation (a new email, a password) opens a **sheet** with Cancel (leading) and Done (trailing; disabled until the input is valid).
- Destructive actions ask for confirmation in a dialog whose destructive button names the action ("Delete account", not "OK").
- Every pane has its own URL (`/settings/notifications`), and settings reopen on the last pane (on phones, on the pane list).
- Desktop web apps: Ctrl/⌘ + , opens settings.

## Narrow screens

Below 700px the sidebar becomes the first screen: a grouped list of panes with icons and chevrons, titled "Settings". Choosing a pane pushes it, with a back button labelled "Settings" in the bar. The pane content is the same grouped lists, inset by `--gutter` on both sides.

## States

- **Loading:** keep the layout and the labels; show values when they arrive. No skeleton shimmer over a whole pane.
- **Saving failed:** put the control back to its previous value and say why in the group footer, in `--color-red-text`, with a way to retry.
- **Empty group** (no shared people, no devices): an empty state inside the group card: icon, short headline, one line, one action.
- **Long content:** long labels wrap, long emails break at sensible points (`overflow-wrap: anywhere` on the value only), never truncated without a way to see them.

## Web translation

```html
<div class="settings" data-view="pane">
  <nav class="settings-nav" aria-label="Settings">
    <a href="/settings/account" aria-current="page"><i class="ph-fill ph-user-circle" aria-hidden="true"></i>Account</a>
    <a href="/settings/notifications"><i class="ph ph-bell" aria-hidden="true"></i>Notifications</a>
  </nav>
  <main class="settings-pane">
    <header class="bar"><h1>Notifications</h1></header>
    <section class="group" aria-labelledby="g-alerts">
      <h2 id="g-alerts" class="group-header">Alerts</h2>
      <ul class="group-card">
        <li><label class="row"><span>Weekly summary</span> <input type="checkbox" role="switch" checked></label></li>
        <li class="row">
          <a href="/settings/notifications/quiet">Quiet hours <span class="value">22:00–07:00</span><i class="ph ph-caret-right" aria-hidden="true"></i></a>
        </li>
      </ul>
      <p class="group-footer">A short summary every Sunday morning.</p>
    </section>
  </main>
</div>
```

The live example (`examples/foundations/index.html`) shows one settings pane inside the app window: grouped lists, switches, a segmented control, drill-down, action, empty and destructive rows. It has no sidebar of panes (its sidebar is the app's own), and its column width and group gap predate this pattern; where they differ, follow the values here.

## Don't

- Don't add a Save button to settings that can apply immediately.
- Don't put theme, text size or motion settings in unless the brief asks for them.
- Don't put sort, filter or view options here.
- Don't mix control types for the same kind of choice (a switch here, a checkbox there).
- Don't use a red filled button for a destructive row.
- Don't nest deeper than two levels below the pane list.

## Related

[list-detail.md](list-detail.md) (the same sidebar idea) · foundations: [layout-and-spacing](../foundations/layout-and-spacing.md), [color](../foundations/color.md) (destructive, selected rows), [icons](../foundations/icons.md) · HIG digest: [settings](../research/hig-digest/settings.md), [lists-and-tables](../research/hig-digest/lists-and-tables.md), [toggles](../research/hig-digest/toggles.md)
