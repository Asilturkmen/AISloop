# Round 1 · Taste calibration · Sources

Source list for the first review board. The owner adds iPhone/Mac screenshots of Apple's own apps separately. This file covers the **web side**, the **counter-examples**, the **HIG pages** to use later and the **facts** that affect moving Apple's design to the web.

All URLs were read on **2026-11-19**. Requests came from Turkey, so check region redirects (see Gaps).

## How to read the markings

- **verified**: seen in a source. For a URL, this means it returned HTTP 200 and the page content was fetched and checked without logging in. For a fact, the source is quoted or linked.
- **inferred**: our own reading, not confirmed. **No screenshots were taken** (the brief said not to download images). So every visual description below ("airy", "translucent header", "red accent") is **inferred** from what we know about the product and from the page's text, alt text or markup. Check each one by eye when you capture the board.
- **Kind** says what you are actually looking at:
  - **live web UI**: the real app running in the browser
  - **live demo**: a real, working UI with fake data
  - **HTML recreation**: the vendor rebuilt the app UI in HTML on a marketing page
  - **native screenshot**: a marketing screenshot of a native Mac or iOS app

---

## 1. Web products with an Apple-app feel

The brief asks for spread, so this is **17 entries chosen to differ along the open questions** in `preferences.md`. Density runs from airy to dense, materials from translucent to flat, icons from everywhere to none, accent from one colour to none, and titles from large to quiet. The matrix after the list shows which entry covers which dimension.

### 1a. Apple's own web apps (live, no login)

These are the closest thing to "Apple app design, translated to the web, by Apple".

The HTML of Music, Podcasts and the App Store contains the same Svelte navigation shell (`navigation__header`, `navigation__scrollable-container`, `navigation__native-cta`). So these three are one design system shown three times, not three separate designs. **verified** (markup)

| # | Product | URL | Kind | What to look at | Dimension it represents |
|---|---|---|---|---|---|
| 1 | Apple Music (web) | https://music.apple.com/us/browse | live web UI · **verified** loads, no sign-in wall; nav is Search / Home / New / Radio | Sidebar navigation next to a content grid. Large bold section titles ("New Releases", "Best New Songs"). Translucent top bar and player bar over scrolling artwork. Pink/red accent used only on a few elements. *(visuals inferred)* | **Translucency** on chrome only. **Large titles**. Colourful content, monochrome chrome. |
| 2 | Apple Podcasts (web) | https://podcasts.apple.com/us/browse | live web UI · **verified** loads; sign-in needed only for explicit episodes and following | Same shell as Music, with a purple accent instead of red. Rows of episodes with metadata and dates. *(inferred)* | **Accent strategy**: same structure, one different accent per app. Good A/B against #1. |
| 3 | App Store (web) | https://apps.apple.com/us/iphone/today | live web UI · **verified** loads; Today / Games / Apps / Arcade tabs and a platform switcher | The "Today" editorial page: a very large title, big story cards, app rows with "Get" buttons. *(inferred)* | **Large title plus big cards**. Closest to "bento/cards", but done with restraint. A useful test against counter-example (a). |
| 4 | Apple Maps (web, beta) | https://maps.apple.com/ | live web UI · **verified** loads with a "Beta" pill in the markup; supports Safari, Chrome, Edge and Firefox ([support.apple.com/120585](https://support.apple.com/120585)) | A floating panel above a full-bleed map. Search field, place cards and a sidebar toggle (`sidebar-left` symbol in the markup). *(panel material inferred)* | **Materials**: a translucent, floating sidebar over rich content. The "glass where it belongs" case. |
| 5 | Apple Developer Documentation | https://developer.apple.com/documentation/swiftui | live web UI · **verified** (page 200, content JSON 200). Rendered by JavaScript, so a plain fetch sees only the title. | A navigator sidebar with a disclosure tree, a quiet header, a dense two-column reference, code voice, small type icons per symbol. *(inferred)* | **Dense, text-first, quiet header**. Like Xcode or Finder rather than iOS. |

### 1b. Live component demos (open source, no login)

These are not products, but they show the UI patterns directly, in real HTML and CSS. That makes them the best way to judge how something literally iOS-like feels when it runs in a browser.

| # | Product | URL | Kind | What to look at | Dimension |
|---|---|---|---|---|---|
| 6 | Framework7 Kitchen Sink, iOS theme | https://framework7.io/kitchen-sink/core/?theme=ios | live demo · **verified**. 80+ routes, including `list`, `navbar`, `sheet-modal`, `master-detail`, `toggle`, `segmented`, `searchbar`, `swipeout` | Open List View, Navbar, Sheet Modal and Master Detail from the menu. Inset grouped lists, large-title navbars, iOS toggles, hairline separators. **verified** (route list); visuals *(inferred)* | **iOS-literal on the web**. Airy, 44pt rows, icons in lists. The "Settings app clone" end of the scale. |
| 7 | Ionic `ion-list` docs, iOS/MD toggle | https://ionicframework.com/docs/api/list | live demo embedded in docs · **verified**: Basic, Inset List and List Lines demos, each with an iOS/MD switch | Flip the same list between iOS and Material mode. The inset list gets rounded corners in iOS mode (the docs say so). | **Direct A/B: iOS grouping vs Material** on the same content. |
| 8 | Tailwind Catalyst demo app | https://catalyst-demo.tailwindui.com (also `/settings`, `/orders`) | live demo · **verified**: sidebar Home / Events / Orders / Settings, signed in as a demo user | The Settings page: stacked sections with heading, short description and field, then Reset / Save. Orders table. Zinc greys, almost no colour. *(visual details inferred)* | **Flat, quiet, web-native**. Small headers, sparse icons. The "calm SaaS" baseline that is not Apple-literal. |
| 9 | Radix Themes playground | https://www.radix-ui.com/themes/playground | live demo · **verified**: theme panel with accent colour, gray colour, light/dark, radius, scaling and **panel background** | Change the accent colour and the panel background (solid vs translucent) and watch the same components. Compact, dense controls. | **Accent and translucency as toggles** on one screen. Good for "which accent, how much glass". |

Alternative to #6: **Konsta UI kitchen sink** at https://konstaui.com/kitchen-sink/react/dist/ (**verified** loads). The same iOS-literal genre, built with Tailwind. Use it only if Framework7 looks dated on the board.

### 1c. Third-party products whose pages show the real UI

Most of these are native Mac/iOS apps that won Apple-style praise. Their product pages show large real-UI screenshots or HTML recreations, and none needs login. Prefer these over generic marketing renders.

| # | Product | URL | Kind | What to look at | Dimension |
|---|---|---|---|---|---|
| 10 | Linear | https://linear.app | HTML recreation · **verified**: issue detail with properties panel, Backlog/Todo/In Progress/Done board, review list, changelog, all as markup rather than images | Very dense rows, small type, near-monochrome palette, keyboard-first. Quiet section labels instead of large titles. *(visuals inferred)* | **Dense, dark, flat, no accent**. A "pro Mac app" feel on the web. |
| 11 | Things 3 | https://culturedcode.com/things/ | native screenshot · **verified**: collage alt text "Screenshots of Things running on Mac, iPhone, iPad, and Apple Watch" | Large bold list titles ("Today"), lots of whitespace, coloured icons in the sidebar, one blue accent, round checkboxes. *(inferred)* | **Airy, large titles, icons in the sidebar**. Often cited as "more Apple than Apple". |
| 12 | Craft | https://www.craft.do | native screenshot (hero) + HTML recreation (Spaces, Folders, Tags, Calendar, Tasks panels) · **verified**; has a web app ("Continue on web") | Document-centric layout, soft cards, generous margins, serif/sans mix in documents. *(inferred)* | **Airy, document-first, soft surfaces**. Closest to Notes or Pages. |
| 13 | Bear | https://bear.app | native screenshot · **verified**: alt text "Bear … on Mac, showing the sidebar, note list and editor", plus iPhone/iPad, themes and a TOC sidebar | Three-pane Notes-style layout, typography-led editor, red accent, themes. *(inferred)* | **Typography and one warm accent**. Notes-like three panes. |
| 14 | Mimestream | https://mimestream.com | native screenshot · **verified**: `hero.png`, `categorized-inbox.png`, `labels.png`, `compose-window.png` (no alt text) | A Gmail client built to look like Apple Mail: sidebar with mailbox icons, message list, standard macOS toolbar. *(inferred)* | **Dense macOS, standard controls, sidebar vibrancy**. The "Mail" reference. |
| 15 | Raycast | https://www.raycast.com | HTML recreation of the launcher, Quicklinks, Notes and AI chat + native screenshots · **verified** | Dark translucent panel, an icon on every row, keyboard hints (`⌘K`), compact rows. *(inferred)* | **Icons everywhere + translucency + dense**. Spotlight-like. |
| 16 | iA Writer | https://ia.net/writer | native screenshot · **verified**: alt "Alice in Wonderland shown in iA Writer's Focus Mode", "Editor and Preview side by side" | Almost no chrome: type only, focus mode, monospaced-duo font, no icons. *(inferred)* | **Text-only extreme**. Tests "how little UI is too little". |
| 17 | Fantastical | https://flexibits.com/fantastical | native screenshot · **verified**: alt "iPad showing the Week view in Fantastical", weather, widgets | Calendar density, coloured event blocks, red accent, sidebar mini-month. *(inferred)* | **Dense data with colour coding**. Where colour carries meaning, not decoration. |
Count: 17 entries plus the Konsta alternative. shadcn/ui is left out on purpose and appears as counter-example C6.

### Dimension coverage

| Dimension | Strong examples | Opposite pole |
|---|---|---|
| Airy | Things (11), Craft (12), App Store (3), Framework7 (6) | Linear (10), Developer docs (5), Raycast (15) |
| Translucent materials | Maps (4), Music (1), Raycast (15), Radix "translucent panel" (9) | Catalyst (8), Linear (10), iA Writer (16) |
| Icons everywhere | Raycast (15), Things sidebar (11), Mimestream (14), Framework7 lists (6) | iA Writer (16), Catalyst table (8) |
| One accent | Things blue (11), Bear red (13), Music red (1) vs Podcasts purple (2) | Linear (10), Catalyst (8): near-monochrome |
| Colour that carries meaning | Fantastical (17) | |
| Large titles | App Store (3), Music (1), Things (11), Framework7 large-title navbar (6) | Developer docs (5), Mimestream (14), Catalyst (8) |
| iOS-literal vs web-native | Framework7 (6), Ionic iOS mode (7) | Catalyst (8), Radix (9) |

---

## 2. Counter-examples

### 2a. Typical "AI slop" web UI

| # | Source | URL | Kind | What it shows |
|---|---|---|---|---|
| C1 | Aceternity UI: component index | https://ui.aceternity.com/components | live component gallery · **verified** | The whole vocabulary in one place: Aurora Background, Background Gradient Animation, Glowing Effect, Sparkles, Spotlight, Background Beams, Meteors, Bento Grid. |
| C2 | Aceternity: Aurora Background, Sparkles, Bento Grids | https://ui.aceternity.com/components/aurora-background · https://ui.aceternity.com/components/sparkles · https://ui.aceternity.com/blocks/bento-grids | live component previews · **verified** (all 200) | One screen each for **purple-blue gradient**, **sparkle**, and the **bento grid**. |
| C3 | Magic UI: Bento Grid, Shimmer Button | https://magicui.design/docs/components/bento-grid · https://magicui.design/docs/components/shimmer-button | live previews · **verified**: the bento demo renders "Save your files / Notifications / Integrations / Calendar" cards | Identical rounded cards with icon, heading and blurb. Shimmer CTAs. The sidebar also lists Animated Gradient Text, Aurora Text, Border Beam, Meteors and Magic Card. |
| C4 | v0 templates, AI category | https://v0.app/templates/ai | public template gallery · **verified**: no login wall for browsing; template detail pages not checked | What an agent produces by default: "Modern AI Chat Interface with Voice Animation & 3D Particle Visualisation", "Ai service landing page", "AI Video Generation Playground". |
| C5 | Framer Marketplace, AI templates | https://www.framer.com/marketplace/templates/categories/ai/ | public template gallery · **verified** (e.g. Nouva, Agent Kit, Reflex, MessageAgent) | The marketing-page version of slop: dark hero with gradient glow, logos strip, bento feature grid. *(visual inferred)* |
| C6 | shadcn/ui Dashboard example | https://ui.shadcn.com/examples/dashboard | live demo · **verified**: "Acme Inc." sidebar, four KPI cards (Total Revenue, New Customers, Active Accounts, Growth Rate), area chart, tabbed paginated table | **Not ugly, but generic.** This is the skeleton almost every agent produces for "build a dashboard". It belongs on the board as the "competent but anonymous" pole. |

### 2b. Apple imitation gone wrong (surface without hierarchy)

| # | Source | URL | Kind | Why it's here |
|---|---|---|---|---|
| C7 | Aceternity "Liquid Glass" | https://ui.aceternity.com/components/liquid-glass | live preview · **verified**: describes "a curved rim, color fringing and a frosted fallback", refraction works only in Chromium, demos include "app-chrome" and a hero section | It copies Apple's newest material as decoration. The HIG says the opposite: "Don't use Liquid Glass in the content layer" and "Use Liquid Glass effects sparingly" (see §3, Materials). Good for a "glass yes/no" vote. |
| C8 | "macOS in Svelte" | https://macos-web.app | live web app · **verified** loads (200, title "macOS in Svelte"); rendered by JavaScript, so contents were not fetched | Recreates the OS itself (menu bar, dock, window buttons) in a browser tab. This copies the **system chrome** instead of the **app's** layout logic: the thing AISloop must not do. *(contents inferred)* |
| C9 | Puppertino | https://puppertino.com/docs/desktop/ (also `/docs/mobile/`) | live CSS framework docs · **verified**: "brings macOS 27 and iOS 27 styling to web pages", 38 Mac and 27 iPhone components, "Not affiliated with Apple Inc." | Not bad work. It is **literal skinning**: Apple controls redrawn in CSS. It shows whether the owner reads literal imitation as "Apple" or as a costume. Treat it as a borderline test, not a strawman. |

### 2c. Right brand, wrong genre (optional, one screen)

| # | Source | URL | Why |
|---|---|---|---|
| C10 | apple.com iPhone page | https://www.apple.com/iphone/ | **verified** loads. Apple's own **marketing** language: huge display type, full-bleed product photos, scroll choreography. `preferences.md` says we want the *apps*, not this. One screen confirms the owner rejects it on sight. |

---

## 3. Apple Human Interface Guidelines pages for web translation

All pages **verified** (HTTP 200). They are rendered by JavaScript. For agents, the same content is available as JSON at `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json`, which is how the quotes below were read. **verified**

**Foundations**

| Page | URL | Useful for the web |
|---|---|---|
| Typography | https://developer.apple.com/design/human-interface-guidelines/typography | Default and minimum sizes per platform, the full Dynamic Type table (iOS) and the macOS text-style table. These are our type-scale source (numbers in §4). |
| Color | https://developer.apple.com/design/human-interface-guidelines/color | "Apply color sparingly"; put the accent on the *background* of the one prominent button (e.g. Done); "prefer a monochromatic appearance for toolbars and tab bars" over colourful content; on macOS the accent tints buttons, selection and sidebar icons. |
| Layout | https://developer.apple.com/design/human-interface-guidelines/layout | Order by importance, align to scan, indent to show hierarchy, group related items, progressive disclosure, "differentiate controls from content". Also size classes, which map to breakpoints. |
| Materials | https://developer.apple.com/design/human-interface-guidelines/materials | Two kinds: **Liquid Glass** (controls/navigation layer only; "Don't use Liquid Glass in the content layer"; "use … sparingly") and **standard materials** ultra-thin / thin / regular / thick for the content layer. Thicker means better text contrast. Gives a dimming hint (35% over bright content for clear glass). |
| Motion | https://developer.apple.com/design/human-interface-guidelines/motion | "Add motion purposefully", "Make motion optional", "brevity and precision", "avoid adding motion to UI interactions that occur frequently". These map to `prefers-reduced-motion` and short transitions. |
| Dark Mode | https://developer.apple.com/design/human-interface-guidelines/dark-mode | "Avoid offering an app-specific appearance setting" (follow `prefers-color-scheme`); dimmer backgrounds, brighter foregrounds; "Soften the color of white backgrounds". |
| Accessibility | https://developer.apple.com/design/human-interface-guidelines/accessibility | Control sizes per platform (§4), padding guidance (about 12pt around bezeled controls, about 24pt around borderless ones), contrast table based on WCAG AA. |
| Writing | https://developer.apple.com/design/human-interface-guidelines/writing | Tone of labels and buttons. Useful for "nothing should look generated". |
| SF Symbols | https://developer.apple.com/design/human-interface-guidelines/sf-symbols | How icons match text weight and size. The symbols themselves cannot be shipped on the web (see §4 licensing); only the principle carries over. |
| Icons | https://developer.apple.com/design/human-interface-guidelines/icons | Interface-icon rules (simple, consistent stroke, optical alignment). |

**Platform overviews**

| Page | URL | Useful for |
|---|---|---|
| Designing for macOS | https://developer.apple.com/design/human-interface-guidelines/designing-for-macos | The "dense desktop app" mental model (pointer, windows, menus). |
| Designing for iOS | https://developer.apple.com/design/human-interface-guidelines/designing-for-ios | The "touch, airy" mental model. |

**Components and patterns**

| Page | URL | Useful for |
|---|---|---|
| Lists and tables | https://developer.apple.com/design/human-interface-guidelines/lists-and-tables | "Prefer displaying text in a list or table"; grouped style (headers, footers, extra space) in iOS; bordered style with alternating rows in macOS; info button vs disclosure indicator; sortable column headings. |
| Sidebars | https://developer.apple.com/design/human-interface-guidelines/sidebars | "No more than two levels of hierarchy"; sidebar icons use the accent by default, fixed colours only when they carry meaning (Mail's yellow VIP); let people hide the sidebar but don't hide it by default. |
| Toolbars | https://developer.apple.com/design/human-interface-guidelines/toolbars | "Reduce the use of toolbar backgrounds and tinted controls"; a title under 15 characters; never title a window with the app name; leading / center / trailing zones; overflow into a More menu. |
| Sheets | https://developer.apple.com/design/human-interface-guidelines/sheets | Cancel / Done / Back semantics, "Avoid showing all three … together", one sheet at a time, alternatives for long flows. This is the source for web modal rules. |
| Settings | https://developer.apple.com/design/human-interface-guidelines/settings | "Minimize the number of settings", good defaults, respect system-wide settings and don't duplicate them, task-specific options in context. On macOS: a non-customizable toolbar showing the active pane. |
| Split views | https://developer.apple.com/design/human-interface-guidelines/split-views | Sidebar / list / detail, i.e. the Mail and Notes three-pane layout. |
| Buttons | https://developer.apple.com/design/human-interface-guidelines/buttons | Hit region at least 44×44pt; size steps from Mini (28pt) to Regular (44pt); don't use white-fill-black-text buttons (reserved for the toggled state). |
| Toggles, Segmented controls, Search fields, Menus, Tab bars, Windows | `…/toggles`, `…/segmented-controls`, `…/search-fields`, `…/menus`, `…/tab-bars`, `…/windows` (same base URL) | Per-control rules for later rounds (all **verified** 200). |
| Apple Design Resources | https://developer.apple.com/design/resources/ | Official Figma/Sketch UI kits. For measuring only: never redistribute them (D-003). |

---

## 4. Facts that affect web translation

### 4.1 SF Pro licensing

- **verified**: The SF fonts licence on the Apple fonts page says: "THE APPLE SAN FRANCISCO FONT IS TO BE USED SOLELY FOR CREATING MOCK-UPS OF USER INTERFACES TO BE USED IN SOFTWARE PRODUCTS RUNNING ON APPLE'S iOS, OS X OR tvOS OPERATING SYSTEMS". It also says "You may not embed the Apple Font in any software programs or otherwise distribute any documentation, artwork, **website content** or any other work product". Use is limited to registered Apple Developers, and mock-ups for non-Apple platforms are not allowed. Source: https://developer.apple.com/fonts/ (licence text is on the page).
- **verified**: The HIG typography page says "don't embed system fonts in your app or game". Source: https://developer.apple.com/design/human-interface-guidelines/typography
- **inferred (practical rule)**: **Never self-host or `@font-face` SF Pro, SF Mono, New York or SF Symbols.** Ask for the platform font with `system-ui` / `-apple-system`. Apple devices then render SF because it is the operating system's own font, and nothing is distributed. Other platforms get their own UI font, so the rules must not depend on SF's exact metrics. This is not legal advice.

### 4.2 What the system font keywords render

| Keyword | macOS / iOS (Safari) | Windows | Android | Status |
|---|---|---|---|---|
| `-apple-system` | San Francisco (since iOS 9 / OS X 10.11) | ignored, falls to the next font in the stack | ignored | **verified** ([WebKit blog, 27 Jul 2015](https://webkit.org/blog/3709/using-the-system-font-in-web-content/)) |
| `system-ui` | San Francisco | Segoe UI | Roboto (or the phone maker's UI font) | Definition **verified**: "the default user interface font", which varies by platform, language and locale ([CSS Fonts 4](https://www.w3.org/TR/css-fonts-4/), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)). The per-platform fonts are **inferred**: Bootstrap's documented stack labels `-apple-system` as "Safari for macOS and iOS (San Francisco)", `"Segoe UI"` as Windows and `Roboto` as Android ([Bootstrap Reboot](https://getbootstrap.com/docs/5.3/content/reboot/)), but no spec states what `system-ui` resolves to. |
| `ui-sans-serif` / `ui-serif` / `ui-monospace` / `ui-rounded` | San Francisco / New York / SF Mono / SF Rounded | **inferred**: not mapped in Chromium or Firefox on other platforms; falls through | same | macOS/iOS mapping **verified**: the spec's sample images are captioned "on macOS Catalina and iOS 13" (CSS Fonts 4). WebKit shipped them in Safari 13.1 ([WebKit blog](https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1/)). |
| `font: -apple-system-body` (also `-headline`, `-caption1`, …) | iOS: Dynamic Type text styles that follow the user's text-size setting | n/a | n/a | **verified** for iOS (WebKit 2015 post). Not documented for macOS. |

Caveats:
- **verified**: The spec warns that `system-ui` depends on locale. For example, "Simplified Chinese users might get a monospaced serif font on older version of Windows."
- **verified**: MDN says `system-ui` "is intended to make UI elements look like native apps, and not for typesetting large paragraphs of text".
- **inferred**: A safe stack is `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif`, with emoji fonts at the end.

### 4.3 Apple's default text sizes

All **verified** from https://developer.apple.com/design/human-interface-guidelines/typography

| Platform | Default size | Minimum size |
|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt |
| macOS | 13 pt | 10 pt |
| visionOS | 17 pt | 12 pt |
| watchOS | 16 pt | 12 pt |
| tvOS | 29 pt | 23 pt |

**iOS Dynamic Type, "Large (default)"** (size / leading, pt): Large Title 34/41 · Title 1 28/34 · Title 2 22/28 · Title 3 20/25 · Headline 17/22 Semibold · **Body 17/22** · Callout 16/21 · Subhead 15/20 · Footnote 13/18 · Caption 1 12/16 · Caption 2 11/13.

Body across the iOS text-size settings: xSmall 14 · Small 15 · Medium 16 · **Large 17 (default)** · xLarge 19 · xxLarge 21 · xxxLarge 23 · AX1 28 … AX5 53.

**macOS built-in text styles** (size / line height, pt): Large Title 26/32 · Title 1 22/26 · Title 2 17/22 · Title 3 15/20 · Headline 13/16 Bold · **Body 13/16** · Callout 12/15 · Subheadline 11/14 · Footnote 10/13 · Caption 1 10/13. macOS does not support Dynamic Type. **verified**

**inferred**: 1 Apple pt ≈ 1 CSS px at 100% zoom. So iOS-like web body text is 17px and Mac-like body text is 13px. 13px is small for a general web audience, which feeds directly into the "airy iOS vs compact macOS" vote.

### 4.4 Minimum hit target

- **verified** (HIG Accessibility): default and minimum control sizes are iOS/iPadOS **44×44 pt / 28×28 pt**, macOS **28×28 pt / 20×20 pt**, visionOS 60×60 / 28×28, watchOS 44×44 / 28×28, tvOS 66×66 / 56×56. Padding: about 12 pt around bezeled controls and about 24 pt around borderless ones. https://developer.apple.com/design/human-interface-guidelines/accessibility
- **verified** (HIG Buttons): "a button needs a hit region of at least 44x44 pt — in visionOS, 60x60 pt". https://developer.apple.com/design/human-interface-guidelines/buttons
- **verified** (WCAG 2.2): SC 2.5.8 Target Size (Minimum), level AA, requires **24×24 CSS px** (with exceptions). SC 2.5.5 (Enhanced, AAA) asks for 44×44 CSS px. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **inferred (rule candidate)**: 44×44 px hit area on touch (`pointer: coarse`) and at least 28 px on desktop pointer (`pointer: fine`). The visible control can be smaller than its hit area.

### 4.5 Contrast (bonus, relevant to glass)

- **verified** (HIG Accessibility): uses WCAG AA as guidance: text up to 17 pt needs 4.5:1; 18 pt and up, or bold, needs 3:1. It also names APCA as an alternative measure.

---

## Gaps / could not verify

- **No visual verification at all.** Every description of looks (accent colours, translucency, density, large titles) is *inferred*, because the brief said not to save images. Confirm each by eye when capturing the board.
- **Dropped: needs login or could not confirm access**
  - `icloud.com` web apps (Notes, Reminders, Mail, Pages): sign-in required. These would be the ideal references.
  - `demo.mercury.com` (Mercury banking demo): returns 200, but it is a JavaScript app and the fetch saw only the title. Mercury's blog describes an "Explore Demo" with an example account, but I could not confirm that it opens without signing up. Worth a manual check: it would be a strong "calm, dense finance app" example.
  - `demo.usememos.com`: JavaScript app; could not tell whether it shows a login form.
  - Bear and Craft web apps: login required. Their product pages are used instead.
- **Dropped: bot-blocked or broken**
  - Dribbble searches and tags (`/search/ai-dashboard`, `/tags/glassmorphism_dashboard`): HTTP 202 bot challenge.
  - `ui.glass/generator`: timed out.
  - `css.glass`: only "Loading…" came back.
  - `hype4.academy` glass generator: page includes a login form; unclear whether it is gated.
  - Awwwards glassmorphism tag: only one listing.
  - The shadcn **Mail** example (`/examples/mail`) now returns **404**. The Dashboard example is used instead.
- **Pages rendered by JavaScript that a fetch can't see** (they load in a browser): Apple Developer docs, HIG pages (read through their JSON instead), macos-web.app, Konsta kitchen sink, Framework7 menu contents.
- **Region:** requests came from Turkey. `tv.apple.com/us` redirected to `/tr` (dropped from the list for that reason). `music`, `podcasts` and `apps.apple.com/us/...` stayed on `/us`. Storefront content will differ by country.
- **`system-ui` on Windows 11 and Android:** I found no primary source stating the exact font. Open questions: does Chromium resolve to "Segoe UI" or "Segoe UI Variable" on Windows 11? Do Samsung and other phone makers substitute their own fonts? Test on real devices before writing a rule that depends on metrics.
- **`ui-rounded` / `ui-serif` outside Safari:** the claim that Chromium and Firefox ignore them is *inferred*; check caniuse/MDN compatibility tables before relying on it.
- **"Apple imitation gone wrong" is thin on live examples.** The best ones are Dribbble shots and one-off CodePens, which are blocked or unstable. C7–C9 are the most reliable public stand-ins. If the owner wants more, screenshot a few Dribbble "glassmorphism dashboard" shots by hand into `research/_private/01-taste-calibration/`.
