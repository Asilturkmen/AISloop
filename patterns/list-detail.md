# List–detail

## When

A collection of text items that people browse and open one at a time: mail, notes, tasks, contacts, orders, tickets, documents. The list shows enough to choose; the detail shows everything.

Not for collections of images or items of very different sizes (use a grid), and not for data people compare across columns (use a table).

## Anatomy

```
Desktop, three panes (≥ 1000px)                   Phone (< 700px)
┌──────────┬──────────────┬───────────────────┐  ┌────────────────────┐   ┌────────────────────┐
│ Sources  │ List    🔍 ✎ │ Detail    ⎙ ⋯     │  │ Inbox       🔍 ✎   │ → │ ‹ Inbox      ⋯     │
│          │              │                   │  │ ● Title    09:41   │   │ Title              │
│ ▣ Inbox  │ ● Title 09:41│ Title             │  │   Preview line…    │   │ meta · meta        │
│ ◻ Drafts │   Preview…   │ meta · meta       │  │   Title   Mon      │   │                    │
│ ◻ Archive│   Title  Mon │                   │  │   Preview line…    │   │ Body text…         │
│          │   Preview…   │ Body text…        │  │                    │   │                    │
└──────────┴──────────────┴───────────────────┘  └────────────────────┘   └────────────────────┘
 sidebar      list           detail                list screen               detail screen
```

Two panes (list + detail) when there is only one collection; three (sidebar + list + detail) when people switch between collections (folders, notebooks, projects).

## Rules

### Panes

- Widths: sidebar `--sidebar-width`; list between 320 and 400px (`clamp(320px, 30vw, 400px)`, the same value at every width so it never jumps); detail takes the rest. The detail's text column stays within `--width-prose`.
- Each pane scrolls on its own; the page itself doesn't scroll on desktop.
- Panes are separated by a 1px `--color-separator` line, not by gaps or shadows.
- Every pane has a bar of the same height (`min-height: var(--bar-height)`). The list bar holds the list's title and its actions (search, new); the detail bar holds actions on the open item, as borderless icons (`regular`), with share and more (`export`, `dots-three`) on the trailing side. In desktop panes the bar title may lead, as in Mail; below 700px it is centred between the back button and the actions.
- The list's main action (new) is a borderless icon in the list bar (`note-pencil`, or `plus` for things that aren't written) with an accessible name ("New note"), at every width. Not a filled button in the bar.
- Surfaces: sidebar `--color-bg-sidebar` (or glass, per project); list and detail `--color-bg`. Sidebar icons `regular`, `fill` for the selected source.
- A toggle button in the list bar (`sidebar-simple`, with `aria-expanded`) hides and restores the sidebar at every desktop width. Between 700 and 1000px the sidebar starts hidden and opens over the list with `--color-scrim`; the panes behind it are inert, and Esc, a tap on the scrim or choosing a source closes it and returns focus to the toggle.

### Selection

- The selected item stays highlighted in **every pane** that leads to the detail (the sidebar source and the list row), so the path is always visible.
- Selection style follows the project choice (grey or accent, [color.md](../foundations/color.md#selected-rows-are-a-project-choice)). With accent selection, only the pane that has keyboard focus shows the accent; the others show grey (`--color-fill-selected`).
- On desktop the app reopens on the item that was open last; the first time, on the first item. The nothing-selected state is for an empty list or after the last item is deleted.
- Selection is persistent: opening an item doesn't clear the highlight.
- A search that filters out the open item doesn't close it: the detail keeps showing it, and clearing the search scrolls the list back to it.
- **Multi-select** (Shift- and Ctrl/⌘-click, Shift + arrows) only where people act on many items at once (mail, files). Use grey selection for it, `aria-multiselectable="true"`, and show the count and the shared actions in the detail ("3 notes selected").

### List rows

- Use `--row-height-2line` with title + one preview line; three lines only when the preview is what people scan for (mail).
- Title in `--text-body`, preview in `--text-subheadline` `--color-label-secondary`, metadata (date, count) trailing in `--text-footnote` `--color-label-secondary`.
- Unread or new: a small accent dot leading (the one accent mark a row may carry besides selection), plus the title in `--text-body-weight-emphasized`. Never colour alone. Opening an item marks it read.
- Rows with their own controls (a task checkbox, a flag button) can't sit inside `role="option"`: use a plain list whose rows are links or buttons, with the controls beside them.
- Separators inset to the text. Hover: `--color-fill-hover`.
- Avatars or thumbnails only when they help people recognise the item (a person, a photo); not as decoration on every row.
- Dates: today, the time ("09:41"); yesterday, "Yesterday"; within a week, the weekday ("Monday", or "Mon" where space is tight; one form per app); older, the date ("14 Nov"); another year, with the year ("14 Nov 2025"). Items with future dates (due tasks, bookings) mirror this: "Tomorrow", the weekday within the next week, then the date.

### Detail

- A header with the title in `--text-title-2` (not the large title, which is for top-level pages; see [typography.md](../foundations/typography.md)) and metadata on one line in `--text-subheadline` `--color-label-secondary`, then the content.
- Reading content uses `--text-prose` within `--width-prose`.
- Editing happens in place where the item is the user's own (notes, tasks); there is no separate edit mode unless the content is structured.

### Keyboard

- Each list is one Tab stop (roving `tabindex` or `aria-activedescendant`); Up / Down move the selection inside it and update the detail; Enter moves focus into the detail. Tab otherwise follows the page order, through each bar's buttons.
- Delete or Backspace (⌫ on a Mac) removes the selected item when focus is in the list. Undo stays available in a toast (which doesn't time out while it has hover or focus) and with Ctrl/⌘ + Z.
- `/` focuses the list search when focus isn't in a text field. Leave Ctrl/⌘ + F to the browser (find in page).

### Density

Desktop tools with long sessions (mail, tickets) are typically compact; consumer apps and anything used on phones, comfortable. Same anatomy in both.

## Narrow screens

Below 700px only one pane is visible at a time, as a stack: sources → list → detail. The app opens on the last-used list, with Back to the sources. Each step pushes; the bar shows a back button labelled with the previous screen's title ("‹ Inbox"), or "Back" when the title doesn't fit. Source rows get a trailing chevron (`caret-right`) and no lasting highlight, since the stack shows where you are. The URL reflects each level (`/inbox`, `/inbox/2841`), so Back in the browser works and items can be linked. The list's selection is remembered when going back.

## States

- **Nothing selected** (desktop): the detail shows one quiet line centred in `--color-label-secondary` ("No note selected"). No illustration. The actions on the item, share and more included, hide with it.
- **Empty list:** an empty state in the list pane: an icon (about twice `--icon-size-lg`, in `--color-label-tertiary`; a one-off size), a short headline (`--text-headline`), one line (`--text-subheadline`, `--color-label-secondary`), and the action that fills it ("New note"). For a search with no results: say what was searched and offer to clear it.
- **Loading:** keep the panes; rows appear as they arrive. A thin progress indicator in the bar for refreshes, not a full-pane spinner.
- **Error:** an inline message in the pane that failed, with Retry. The other panes keep working.
- **Long content:** titles wrap to two lines in the list at most, then truncate; the detail always shows the full title.

## Web translation

```html
<div class="split" data-panes="3">
  <nav class="pane pane-sources" aria-label="Notebooks">…</nav>
  <section class="pane pane-list" aria-labelledby="list-title">
    <header class="bar"><h2 id="list-title">Moorland 2026</h2> <button aria-label="Search">…</button> <button aria-label="New note">…</button></header>
    <ul role="listbox" aria-label="Notes">
      <li role="option" aria-selected="true" id="n-2841">
        <span class="title">North gate, morning count</span>
        <time datetime="2026-11-22T09:41">09:41</time>
        <span class="preview">Two kestrels over the east ridge, wind NW 3…</span>
      </li>
    </ul>
  </section>
  <article class="pane pane-detail" aria-labelledby="d-title">…</article>
</div>
```

```css
.split { display: grid; grid-template-columns: var(--sidebar-width) clamp(320px, 30vw, 400px) minmax(0, 1fr); height: 100dvh; }
.pane { overflow: auto; min-width: 0; }
.pane + .pane { border-inline-start: 1px solid var(--color-separator); }
```

A `listbox` with `aria-selected` suits a list where arrow keys move the selection; if rows are plain links, use a `<ul>` of links with `aria-current="page"` on the open one. Live example: [`examples/patterns/list-detail.html`](../examples/patterns/list-detail.html).

## Don't

- Don't put each list row in its own card with a shadow.
- Don't force two or three panes onto a phone.
- Don't open the detail in a modal over the list on desktop.
- Don't clear the selection when the detail opens, or reset the list's scroll position on Back.
- Don't truncate the title in the detail.
- Don't use thick dividers or gaps between panes.

## Related

[settings.md](settings.md) · foundations: [layout-and-spacing](../foundations/layout-and-spacing.md), [color](../foundations/color.md), [typography](../foundations/typography.md), [icons](../foundations/icons.md) · HIG digest: [split-views](../research/hig-digest/split-views.md), [sidebars](../research/hig-digest/sidebars.md), [lists-and-tables](../research/hig-digest/lists-and-tables.md)
