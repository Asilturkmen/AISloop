# Round 1 · Taste calibration · Extra sources

This file goes **beyond** [`sources.md`](sources.md). It does not repeat what that list already covers (Apple's web apps, Framework7, Ionic, Catalyst, Radix, Linear, Things, Craft, Bear, Mimestream, Raycast, iA Writer, Fantastical, Aceternity, Magic UI, v0, Framer, shadcn dashboard, macos-web.app, Puppertino, apple.com, the HIG pages and the font facts). Native Apple screenshots, capture of the `sources.md` web entries and the HIG digest are done by other researchers and are not repeated here.

All URLs were checked on **2026-11-19** from Turkey, without logging in. No images were downloaded.

## How to read the markings

- **Loads:** `yes` = HTTP 200 and the content was fetched without a login. `login` = a login wall. `blocked` = a bot check (Cloudflare "Just a moment…", HTTP 202/403). `404` = gone. `JS` = loads, but the page is rendered by JavaScript, so a plain fetch saw only the shell.
- **VERIFIED** = we read it in the source (page text, transcript, licence, README, API data). **INFERRED** = our reading, a search-result summary, or general knowledge not re-checked today. Visual claims are always INFERRED, because no screenshots were taken.
- GitHub star counts and last-push dates come from the GitHub API on 2026-11-19 where shown. The unauthenticated API limit (60 requests an hour) ran out, so some repos have no star count.

---

## Contents

1. [Apple's own design teaching beyond the HIG](#1-apples-own-design-teaching-beyond-the-hig)
2. [Analyses of why Apple software feels the way it does](#2-analyses-of-why-apple-software-feels-the-way-it-does)
3. [More web products with an Apple-app feel](#3-more-web-products-with-an-apple-app-feel)
4. [Open-source kits that imitate Apple](#4-open-source-kits-that-imitate-apple)
5. [Free screenshot galleries](#5-free-screenshot-galleries)
6. [Writing on AI slop in UI](#6-writing-on-ai-slop-in-ui)
7. [Existing agent skills and rulebooks that aim at Apple](#7-existing-agent-skills-and-rulebooks-that-aim-at-apple)
8. [Top 15 most valuable finds](#top-15-most-valuable-finds)
9. [Gaps](#gaps)

---

## 1. Apple's own design teaching beyond the HIG

### 1.0 Facts about the material itself

- **VERIFIED:** Every WWDC video page on `developer.apple.com/videos/play/...` loads without login and **includes the full transcript in the HTML** (`id="transcript-content"`). A plain `curl` gets it; no JavaScript is needed. Word counts are given below. This makes Apple's talks machine-readable for the rule-writing stage.
- **VERIFIED:** The design topic index https://developer.apple.com/videos/design/ (loads: yes) lists **195 design videos**, from WWDC14 to WWDC26, plus Tech Talks and "Meet with Apple" sessions.
- **VERIFIED:** Some classic sessions **have been removed**. `wwdc2016/803` (Typography and Fonts), `wwdc2016/806` (Inclusive App Design) and `wwdc2015/804` (Introducing the New System Fonts) now redirect to the year index. Anything citing them must use another source.
- **VERIFIED:** Apple now serves the HIG as **Markdown**: https://developer.apple.com/design/human-interface-guidelines.md returns `text/markdown`, and every page has a `.md` twin (e.g. `/design/human-interface-guidelines/menus.md`). This is simpler for agents than the JSON route in `sources.md` §3. (Also found independently by the section-7 researcher.)

### 1.1 WWDC and Tech Talk sessions, ranked by value to AISloop

"Words" = transcript length on the page. All rows: **loads: yes**.

#### a) Principles and process

| Session | URL | Words | What it offers | Why it matters to AISloop |
|---|---|---|---|---|
| **Principles of great design** (WWDC26, 250) | https://developer.apple.com/videos/play/wwdc2026/250/ | 2,444 | **VERIFIED (transcript read).** Apple's design evangelists define design as "making something with intention" and walk through eight principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Key lines: "choosing what to build is often a matter of deciding what not to include"; "When we say simple, we don't mean minimal. If you bury all your functionality inside a single place, that might make your interface look more minimal, but it doesn't make it simple"; "Sometimes, simple means adding context and information"; on craft: "Scrolling is jittery. Icons are misaligned… It feels fragile"; on delight: "The way to make a design delightful isn't by adding confetti or tacking on extra flourishes at the end". | The most current statement of Apple's design philosophy, and nearly an anti-slop manifesto in Apple's own words. "Simple ≠ minimal" and "delight is not confetti" are rule-grade quotes. It pairs with the new HIG page (1.2). |
| **Create UI prototypes using agents in Xcode** (WWDC26, 227) | https://developer.apple.com/videos/play/wwdc2026/227/ | 2,756 | **VERIFIED (transcript read).** An Apple Design Team prototyper shows how to go "from an unrefined, first-pass generated interface… to a design that's purposeful, tailored, and distinct". Method: a vague prompt yields "an arbitrary layout" and guessed features, so be specific about features, give "stylistic cues" (mood, palette, typography), and "ask for multiple options" (10 named previews), then "go wide, remix, repeat". Make the app "lived in" with plausible content and edge cases: unbounded lists, long text, empty states, truncation versus wrapping. Build "tuning panels" to adjust springs and timings side by side. "Do not delegate critical thinking to these tools." | **Apple itself describing the AI-slop problem and its fix.** It validates AISloop's method (structurally different options, voting by eye, D-006) and adds two things to steal: an edge-case checklist for realistic content, and tuning panels for motion. |
| **Communicate your brand identity on iOS** (WWDC26, 251) | https://developer.apple.com/videos/play/wwdc2026/251/ | 2,527 | **VERIFIED (transcript read).** Two layers: the UI layer (tab bar, toolbars) stays standard; "the content layer is the best opportunity to express your brand identity". Custom versions of utilitarian components "can make the product appear less native - or even dated". Colour: move brand colour out of bars "into the content area… into the scroll view"; "use color in ways that create meaning such as portraying hierarchy, groupings, or indicating interaction"; "exercise restraint". Type: custom fonts must scale (Dynamic Type), and should wrap rather than truncate at large sizes. Logos: "people don't need to be reminded which app they're using" (NYT Cooking shows its logo only on Home, fading on scroll). Examples: Gentler Streak, Slack, Moonlitt, Crumbl, NYT Cooking. | The best Apple source on **where a product's own identity may go** without breaking the "Apple app" feel. It maps directly to a web rule: standard chrome, branded content, one meaningful accent, no logo in the app chrome. |
| **Design foundations from idea to interface** (WWDC25, 359) | https://developer.apple.com/videos/play/wwdc2025/359/ | 3,146 | **VERIFIED (excerpts read).** A designer critiques and fixes a sample app step by step. The first screen opens on "a menu" and a title that "feels more like branding"; the fix is a toolbar with the screen's name, screen-specific actions there, a tab bar for the main features. Progressive disclosure (show a few groups, the rest behind a disclosure next to the title). Grouping content by time, progress, season or pattern. A "squint test" for hierarchy, text styles instead of eyeballed sizes, care with text over images. | A worked before/after critique, the format AISloop's review boards use. The "title that feels like branding" is a concrete tell. |
| **Essential Design Principles** (WWDC17, 802) | https://developer.apple.com/videos/play/wwdc2017/802/ | 8,491 | **INFERRED (description read, transcript saved but not read in full):** principles serving needs for "safety, meaning, achievement and beauty": wayfinding, feedback, visibility, consistency, mental models, proximity, mapping, affordance. | The long-form older version of the WWDC26 principles; good for rule rationale. |
| **The Qualities of Great Design** (WWDC18, 801) and **Intentional Design** (WWDC18, 802) | https://developer.apple.com/videos/play/wwdc2018/801/ · https://developer.apple.com/videos/play/wwdc2018/802/ | 7,794 · 5,449 | **INFERRED (descriptions):** great design through the voices of Apple designers; strong, clear intention behind apps. | Background on taste vocabulary. Lower priority. |
| **The Life of a Button** (WWDC18, 804) | https://developer.apple.com/videos/play/wwdc2018/804/ | 4,771 | **INFERRED (description):** interaction, visual and sound design principles traced through one button. | Directly useful for the "objects you act on should look like objects" preference. |
| **Iterative UI Design** (WWDC16, 805) · **Prototyping: Fake It Till You Make It** (WWDC14, 223) | https://developer.apple.com/videos/play/wwdc2016/805/ · https://developer.apple.com/videos/play/wwdc2014/223/ | 6,723 · 8,445 | **INFERRED (descriptions):** Apple's iterate-and-prototype process. | Supports AISloop's loop (research → compare → rule → live example). |
| **Designing Award Winning Apps and Games** (WWDC19, 802) | https://developer.apple.com/videos/play/wwdc2019/802/ | 6,639 | **INFERRED (description):** processes and practices behind Apple Design Award winners. | Bridges to the ADA list in 1.4. |

#### b) The current system: Liquid Glass, shape, bars, materials

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **Get to know the new design system** (WWDC25, 356) | https://developer.apple.com/videos/play/wwdc2025/356/ | 2,559 | **VERIFIED (excerpts read).** Concentricity: "fixed shapes have a constant corner radius. Capsules use a radius that's half the height… concentric shapes calculate their radius by subtracting padding from the parent's." Watch for corners "too pinched — or flared". Capsules suit touch; "in dense desktop environments, they're best used for standout actions". "Instead of relying on decoration, hierarchy should be expressed through layout and grouping." Bars: group items "by function and frequency"; don't group a symbol with a text button (reads as one button); the primary action (Done) stands apart and is tinted; crowded bar → move secondary actions into a More menu. Tab bar: no screen-specific actions there. Scroll edge effects replace hard dividers, "are not decorative", one per view. Sheets: dimming layer signals modality. | **Translates almost line by line into CSS rules:** `inner radius = outer radius − padding`, capsules on touch only, one primary tinted action per bar, no screen actions in global navigation. Top-priority source for the shape and toolbar rules. |
| **Meet Liquid Glass** (WWDC25, 219) | https://developer.apple.com/videos/play/wwdc2025/219/ | 2,897 | **VERIFIED (excerpts read).** Glass is for the UI layer; a table view made of glass "would… muddy the hierarchy. So keep it in the content layer"; "always avoid glass on glass"; on top of glass use "fills, transparency, and vibrancy" instead. Clear glass needs a dimming layer and three conditions. Bigger elements (menus, sidebars) adapt but "don't flip from light to dark". Tint only elements that "serve a distinct functional purpose". Scroll edge effect: a gradual fade, or a "hard style" when pinned column headers sit under a toolbar. | Apple's own limits on glass. Use it to settle the "where is glass welcome" vote and to reject C7-style decorative glass. |
| **Build an AppKit app with the new design** (WWDC25, 310) · **Build a SwiftUI app with the new design** (WWDC25, 323) · **Build a UIKit app with the new design** (WWDC25, 284) | https://developer.apple.com/videos/play/wwdc2025/310/ · …/323/ · …/284/ | 3,241 (310) | **INFERRED (descriptions):** per-framework changes to tab views, split views, bars, sidebars, controls. | The macOS one (310) is the best source for desktop density under the new design. |
| **Elevate the design of your iPad app** (WWDC25, 208) | https://developer.apple.com/videos/play/wwdc2025/208/ | 2,178 | **INFERRED (description):** responsive layout for resizable windows, menu bar on iPad. | Resizable windows map to responsive web layouts better than iPhone does. |
| **Liquid Glass showcases** (Meet with Apple 208, 254–257: LTK, Slack, CNN, Tide Guide) | https://developer.apple.com/videos/play/meet-with-apple/208/ · https://developer.apple.com/videos/play/meet-with-apple/257/ | — | **VERIFIED (titles):** real third-party apps explaining their adoption of the new design. **INFERRED:** content. | Third-party, branded apps that still feel native: the case AISloop's users are in. |
| **Design for touch on Mac** (Tech Talk 111456) | https://developer.apple.com/videos/play/tech-talks/111456/ | none yet | **VERIFIED (description):** touch gestures now available on Mac. **VERIFIED:** "Touch on Mac" group labs appear in the index. No transcript yet. | **Watch this.** If Macs get touch, Apple's dense/airy split changes, which affects the "how dense?" open question. |
| **Discover the Apple Design Resources** (Tech Talk 111427) | https://developer.apple.com/videos/play/tech-talks/111427/ | 940 | **INFERRED (description):** overview of the kits. | See the licence warning in 1.5. |

#### c) macOS, iPadOS and navigation

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **Adopt the new look of macOS** (WWDC20, 10104) | https://developer.apple.com/videos/play/wwdc2020/10104/ | 4,415 | **VERIFIED (excerpts read).** The Big Sur structure still used today: full-height sidebar, content under the title bar, unified toolbar with an inline title "at the leading edge… next to the sidebar", inset selection in lists. Sidebar icons use the accent colour by default; "monochrome" de-emphasises secondary groups; fixed colours only for strong associations (Mail's teal folders "would clash with a red accent"). Toolbar styles: unified (default), compact (focus on content), preference (centred icons for settings windows). | The single best source for **a Mac-app web layout**: sidebar + inline-title toolbar + inset selection. Gives the rule for icon colour in sidebars. |
| **Designed for iPad** (WWDC20, 10206) · **Design for the iPadOS pointer** (WWDC20, 10640) | https://developer.apple.com/videos/play/wwdc2020/10206/ · https://developer.apple.com/videos/play/wwdc2020/10640/ | 5,064 · 7,104 | **INFERRED (descriptions):** minimise modals, use the sidebar; how pointer hover effects were designed. | The pointer talk is the closest Apple source for **hover states**, which web UIs over-use. |
| **Explore navigation design for iOS** (WWDC22, 10001) | https://developer.apple.com/videos/play/wwdc2022/10001/ | 3,874 | **INFERRED (description):** tab bars, hierarchical navigation, modals: when to use which. | Rules for web modals versus pages. |
| **Elevate your tab and sidebar experience in iPadOS** (WWDC24, 10147) | https://developer.apple.com/videos/play/wwdc2024/10147/ | 1,842 | **INFERRED:** tab bar ↔ sidebar switching. | A responsive pattern: tabs on narrow, sidebar on wide. |
| **Design intuitive search experiences** (WWDC26, 292) | https://developer.apple.com/videos/play/wwdc2026/292/ | 2,451 | **INFERRED (description):** new search patterns and placement. | Search placement changed in iOS 26 (bottom); relevant to web search fields. |
| **Designing iPad Apps for Mac** (WWDC19, 809) | https://developer.apple.com/videos/play/wwdc2019/809/ | 4,142 | **INFERRED:** adapting touch layouts to desktop. | The touch-to-desktop translation is the web's daily problem. |

#### d) Typography

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **The details of UI typography** (WWDC20, 10175) | https://developer.apple.com/videos/play/wwdc2020/10175/ | 5,004 | **VERIFIED (excerpts read).** Optical sizes ("SF Text for small sizes below 20 points and SF Display for 20 points and above"), the move to variable fonts with an optical-size axis, then tracking and leading for UI. | Explains *why* Apple text looks right: size-specific tracking. On the web `font-optical-sizing: auto` and the system font give part of this for free; a custom web font does not. |
| **Meet the expanded San Francisco font family** (WWDC22, 110381) | https://developer.apple.com/videos/play/wwdc2022/110381/ | 2,716 | **INFERRED:** SF widths (condensed, expanded) and when to use them. | Width as a hierarchy tool (WWDC25/359 uses an expanded face for group titles). Cannot ship SF on the web (sources.md §4.1), so this is principle only. |
| **How to Pick a Custom Font** (WWDC17, 815) | https://developer.apple.com/videos/play/wwdc2017/815/ | 2,358 | **INFERRED:** functional and stylistic criteria for a custom typeface. | Useful if a project must use a brand font instead of `system-ui`. |

#### e) Motion

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **Designing Fluid Interfaces** (WWDC18, 803) | https://developer.apple.com/videos/play/wwdc2018/803/ | 9,933 | **VERIFIED (excerpts read).** "Everything needs to respond instantly"; allow "constant redirection and interruption"; things leaving and entering view do so on "symmetric paths"; objects grow from their source; keep touch interactions "lightweight"; preserve the gesture's momentum. | The canonical source for Apple motion; Emil Kowalski's `apple-design` skill (§7) is a web translation of it. |
| **Animate with springs** (WWDC23, 10158) | https://developer.apple.com/videos/play/wwdc2023/10158/ | — | **INFERRED:** springs described by duration and bounce instead of mass/stiffness/damping. | Matches Motion's `visualDuration` + `bounce` API (§4), so Apple's parameters can be used directly on the web. |
| **Enhance your UI animations and transitions** (WWDC24, 10145) | https://developer.apple.com/videos/play/wwdc2024/10145/ | 2,215 | **INFERRED:** zoom transitions that connect the tapped item to the opened view. | The "grow from source" rule as a web view-transition. |

#### f) Writing

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **Writing for interfaces** (WWDC22, 10037) | https://developer.apple.com/videos/play/wwdc2022/10037/ | 3,683 | **INFERRED (description):** purpose, anticipation, context, empathy in UI copy; alerts; onboarding. | Generic copy is a major slop tell (§6). |
| **Make a big impact with small writing changes** (WWDC25, 404) | https://developer.apple.com/videos/play/wwdc2025/404/ | 2,497 | **INFERRED (description):** revisiting UI words under the new design. | Short, practical. |
| **Add personality to your app through UX writing** (WWDC24, 10140) | https://developer.apple.com/videos/play/wwdc2024/10140/ | 3,305 | **INFERRED:** defining a voice and modulating tone. | For the "how warm should copy be" rule. |
| **Craft clear names for features and labels** (WWDC26, 290) | https://developer.apple.com/videos/play/wwdc2026/290/ | 2,113 | **INFERRED (description):** naming features and labels. | Labels like "AI Studio" or "Smart Hub" are slop tells. |
| **Writing Great Alerts** (WWDC17, 813) | https://developer.apple.com/videos/play/wwdc2017/813/ | 1,355 | **INFERRED:** clear alert titles and buttons. | Source for dialog-button wording rules. |

#### g) Apple teaching about the web itself

| Session | URL | Words | What it offers | Why it matters |
|---|---|---|---|---|
| **Design for Safari 15** (WWDC21, 10029) | https://developer.apple.com/videos/play/wwdc2021/10029/ | 5,467 | **INFERRED (description):** designing websites and web apps for Safari's redesigned, tinted tab bar (`theme-color`). | Apple's own advice to web designers. |
| **Learn CSS Grid Lanes** (WWDC26, 314) · **Rediscover the HTML select element** (WWDC26, 315) | https://developer.apple.com/videos/play/wwdc2026/314/ · https://developer.apple.com/videos/play/wwdc2026/315/ | 1,540 · 1,483 | **VERIFIED (descriptions):** masonry-style "Grid Lanes" layouts; fully stylable `<select>` with new CSS. | **Customisable `select`** means a web pop-up button can finally look like a macOS one without a JS widget. Worth a rule. |

### 1.2 HIG pages that changed recently (for the HIG researcher, not digested here)

| Page | URL | Loads | Finding |
|---|---|---|---|
| **Design principles** (new) | https://developer.apple.com/design/human-interface-guidelines/design-principles | yes (JS; `.md`/JSON twin read) | **VERIFIED:** change log says "June 8, 2026 — Reintroduced design principles". The eight principles from WWDC26/250 with short rules, e.g. "Simplicity isn't minimalism", "Don't mistake delight for decoration", "Stay out of the way", "Help people recover from mistakes". |
| **Menus** | https://developer.apple.com/design/human-interface-guidelines/menus | yes | **VERIFIED:** "Use menu item icons sparingly and with purpose… Don't display an icon if you can't find one that clearly represents the menu item" and "provide icons for all menu items in a group, or none of them". Change log: "June 8, 2026 — Updated guidance for menu item icons". **This answers half of the open question "icons in lists and menus"** in `preferences.md`. Context: the Tahoe menu-icon backlash in §2. |

### 1.3 Other Apple teaching pages

| Title | URL | Loads | What it offers | Why it matters |
|---|---|---|---|---|
| **UI Design Dos and Don'ts** | https://developer.apple.com/design/tips/ | yes | **VERIFIED:** ten short rules with paired good/bad images: fit the screen, touch controls, 44×44 pt hit targets, text ≥ 11 pt, contrast, no overlapping text, @2x/@3x images, no distortion, "puts controls close to the content they modify", "Align text, images, and buttons to show users how information is related". Undated. | A compact checklist in Apple's voice. Good seed for an AISloop lint list. |
| **Apple Style Guide** | https://support.apple.com/guide/applestyleguide/welcome/web | yes | **VERIFIED:** dated June 2026; A–Z usage, inclusive writing, units, international style. **INFERRED:** UI-term entries (click/tap, capitalisation of buttons and menus) live in the A–Z pages, which were not opened. | The authority for UI wording ("Title Case" on Mac buttons and menus, "Settings" vs "Preferences"). Use it to defend Apple conventions that anti-slop skills flag (§6). |
| **Design — What's new** | https://developer.apple.com/design/whats-new/ | yes | **INFERRED:** dated feed of HIG and resource updates, including "Behind the Design" articles (e.g. Crouton, 2024-10-17, per search result). | Watch for rule-affecting HIG changes. |
| **ADA Q&A: What a little Moonlitt can do** | https://developer.apple.com/news/?id=v1nphz91 | yes | **INFERRED (title + search snippet):** interview with the 2026 Interaction winner on Liquid Glass and onboarding. | Moonlitt is used as an example in WWDC26/251 too: a highly branded app that "clearly belongs on iOS". |
| **Adopting Liquid Glass** (technology overview) | https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass | yes (JS) | **INFERRED:** developer checklist for the new design. | Second source for the glass limits. |
| **Apple Newsroom: "Apple introduces a delightful and elegant new software design"** (June 2025) | https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ | yes | **INFERRED:** the official Liquid Glass announcement. | Marketing framing; useful only as a dated reference. |
| **Historical HIGs: 1987 Apple HIG and 1992 Macintosh HIG** | 1987: https://andymatuschak.org/files/papers/Apple%20Human%20Interface%20Guidelines%201987.pdf · 1992: https://archive.org/download/inside-macintosh-1992-1994/1992-human_interface_guidelines.pdf | yes (PDF, 11.8 MB / 3.9 MB) | **VERIFIED:** both PDFs download. **INFERRED:** unofficial scans of copyrighted books. The 1992 edition is the one tonsky quotes on menu icons (§2). | The roots of "consistency, direct manipulation, forgiveness, perceived stability". Cite; never copy text into the repo. |
| **"Bringing Design to Software", chapter profile on the Apple HIG** (Winograd, Stanford) | https://hci.stanford.edu/publications/bds/4p-guidelines.html | yes | **INFERRED:** book profile of how the Apple HIG was made and used. | A free book chapter on why guidelines produce a coherent feel. |

### 1.4 Apple Design Awards: which apps, and why

Source pages, all **loads: yes**: 2026 https://developer.apple.com/design/awards/ · 2025 https://developer.apple.com/design/awards/2025/ · 2024 https://developer.apple.com/design/awards/2024/. Categories since 2024: Delight and Fun, Inclusivity, Innovation, Interaction, Social Impact, Visuals and Graphics (2024 also had Spatial Computing). Only **apps** are listed here; games are not relevant to app UI. Reasons are **VERIFIED** quotes or condensed text from the pages.

| Year · category | App (developer) | Status | Apple's stated reason | Relevance to AISloop |
|---|---|---|---|---|
| 2026 · Interaction | **Moonlitt: Moon Phase Tracker** (Flipping Hues, Italy) | Winner | "best-in-class Liquid Glass integration" and "easy onboarding" | Branded content, native chrome. Also the WWDC26/251 example. |
| 2026 · Visuals and Graphics; Interaction | **Tide Guide: Charts & Tables** (Condor Digital, US) | Winner; finalist | "extra polish to data presentation and custom animations" | **Data-dense app done the Apple way**: the best ADA reference for charts and tables. Has a Liquid Glass showcase video. |
| 2026 · Interaction | **The Outsiders: Athlete Tracker** (Gentler Stories, Slovenia) | Finalist | balance of intensity and recovery | Same team as Gentler Streak (2024 winner), cited in WWDC26/251 for system-font-only branding. |
| 2026 · Inclusivity | **Structured** (unorderly, Germany) | Finalist | praised by neurodivergent users for its "simple layout" | A planner with a calm, simple layout; it has a web presence worth checking. |
| 2026 · Inclusivity | **Guitar Wiz** (Bijoy Thangaraj) | Winner | VoiceOver, Dynamic Type, Differentiate Without Color | Accessibility as part of "Apple quality". |
| 2026 · Social Impact | **Primary: News in Depth** (Wood Metal Rocks) | Winner | news "without once resorting to sensationalism or clickbait" | Calm editorial tone (visionOS). |
| 2026 · Innovation | **Detail: AI Video Editor** | Finalist | "the simplicity of a camera app with the power of a professional AI video editor" | An AI product praised for *not* looking like AI slop. |
| 2026 · Delight and Fun | **grug** (Ocho, NL) | Winner | "a little masterpiece of clever simplicity" | — |
| 2025 · Interaction | **iA Writer** · **Mela – Recipe Manager** (Silvio Rizzi) | Finalists | distraction-free writing with swipe gestures · cooking mode, Dynamic Island timers | Mela is a classic "Apple-feel" recipe app by a solo developer. |
| 2025 · Innovation | **Play** (Rabbit 3 Times) | Winner | SwiftUI prototyping that exports to Xcode | A design tool built on native components. |
| 2025 · Visuals and Graphics | **Feather: Draw in 3D** · **Vocabulary** (Monkey Taps) | Winner · finalist | minimalist Pencil-friendly UI · "consistent illustrations, balanced typography, and thoughtful haptics" | — |
| 2025 · Delight and Fun | **CapWords** · **Lumy** · **Denim** | Winner · finalists | fun animations · elegant sun/moon tracker · polished SwiftUI | — |
| 2024 · Interaction | **Crouton** (Devin Davies, NZ) | Winner | clean recipe interface "so users can focus on cooking rather than the screen" | Has a "Behind the Design" article. Content-first list UI. |
| 2024 · Social Impact | **Gentler Streak** (Gentler Stories) | Winner | encouraging tone, progress-focused design | Uses system fonts only (per WWDC26/251). |
| 2024 · Interaction (finalists) | **Arc Search** (The Browser Company) · **finity.** | Finalists | not stated for finalists | Arc's own web/desktop design language is a §3 candidate. |
| 2024 · Innovation (finalist) | **Copilot Money** | Finalist | not stated | **A finance app often called "Apple-like"** (INFERRED); has a web app. Worth a §3 check. |
| 2024 · Inclusivity (finalist) | **Tiimo** | Finalist | not stated | Calm planner with a web app (INFERRED). |

**INFERRED pattern across winners:** Apple rewards apps whose *chrome* is standard and whose *content* carries the personality, and it praises restraint ("clever simplicity", "without sensationalism", "focus on cooking rather than the screen"). Few winners are flashy productivity tools. For AISloop's web scope, **Tide Guide, Crouton, Mela, Structured, Copilot Money and Gentler Streak** are the best names to pull native screenshots of.

### 1.5 Apple Design Resources: what is offered, and the licence

| Title | URL | Loads | What it offers |
|---|---|---|---|
| Apple Design Resources | https://developer.apple.com/design/resources/ | yes | **VERIFIED:** UI kits for iOS/iPadOS 27 and macOS 27 (Figma, Sketch), watchOS 26, visionOS 26, tvOS 18 (Sketch only); app-icon templates; technology templates (Apple Pay, Live Activities, TipKit, Wallet…); SF fonts; SF Symbols 27 ("over 7,000 symbols in nine weights and three scales"); Icon Composer; product bezels (incl. "iPhone Duo"). |
| Licence: "License Agreement for Apple Design Resources" (LYL142, 06/21/2023) | https://developer.apple.com/support/downloads/terms/apple-design-resources/Apple-Design-Resources-License-20230621-English.pdf | yes (PDF) | **VERIFIED quotes:** "TO BE USED SOLELY FOR CREATING MOCK-UPS OF USER INTERFACES DESIGNED FOR USE IN SOFTWARE PRODUCTS THAT RUN ONLY ON APPLE'S macOS, iOS, watchOS, tvOS, AND/OR visionOS". "you agree not to, install, use or run the Apple Design Resources for the purpose of creating mock-ups of user interfaces to be used in software products running on any non-Apple operating system software". "you may not use the Apple Design Resources to create, develop, display or otherwise distribute any documentation, artwork, website content or any other work product." Template Content "may not otherwise be used, extracted, copied, modified, distributed, or repackaged". No reverse engineering or derivative works. The SF font has its own licence. Figma asks you to accept this licence on first insert (Figma help, per search result, INFERRED). |

**Why it matters (approach change):** `sources.md` §3 lists the kits "For measuring only". The licence grants **no** measuring or reference use; it grants mock-ups for Apple-OS software only, and web interfaces are not that. **INFERRED (not legal advice):** AISloop should **not open the UI kits at all** for rule-writing. Take values from the public HIG text, Apple's WWDC transcripts, our own screenshots of Apple apps on our own devices (kept private, D-003), and the live Apple web apps in `sources.md` §1a. Add this to `decisions.md`.

---

## 2. Analyses of why Apple software feels the way it does

Ordered roughly by usefulness. Essays first, then the "corner and glass physics" group, then reference guides and history.

| # | Title (author, date) | URL | Loads | What it offers | Why it matters to AISloop |
|---|---|---|---|---|---|
| 2.1 | **"It's hard to justify Tahoe icons"** (Nikita Prokopov / tonsky, 2026-01-05) | https://tonsky.me/blog/tahoe-icons/ | yes | **VERIFIED:** a takedown of icons on every macOS Tahoe menu item, derived from the 1992 Macintosh HIG. Rules: icons exist to "help you find what you are looking for faster", so if everything has one nothing stands out; same action = same icon across toolbar and menu and apps; never reuse one icon for different actions; recognisable at small size; "if you can't find a good metaphor, using no icon is better"; mirror opposite actions; no text-as-icon; don't mix icon and no-icon items in a group. | The strongest argument for the "icons in menus: mostly no" side of the open question, and Apple's HIG changed in June 2026 to agree (§1.2). **Also a tell:** an agent puts a Lucide icon on every row. |
| 2.2 | **"Icons in Menus Everywhere — Send Help"** (Jim Nielsen, Dec 2025) | https://blog.jim-nielsen.com/2025/icons-in-menus/ | yes | **INFERRED (search summary):** default icons on every menu item are "noise"; some icons are good (Finder window-position icons). | Shorter companion to 2.1. |
| 2.3 | **"Liquid Glass Is Cracked, and Usability Suffers in iOS 26"** (Raluca Budiu, NN/g, 2025-10-10) | https://www.nngroup.com/articles/liquid-glass/ | yes | **VERIFIED:** text over busy backgrounds; floating controls competing with content; "Motion for motion's sake is not usability"; crowded tap targets; controls that "appear, vanish, collapse, and expand depending on context"; search moved to the bottom; lost back-button labels; essential items in overflow menus. "Apple is prioritizing spectacle over usability." | The counter-weight to copying Apple's newest look. AISloop should take Apple's *older, stable* app conventions where Liquid Glass hurts legibility. |
| 2.4 | **"Bad Dye Job"** (John Gruber, 2025-12-03) | https://daringfireball.net/2025/12/bad_dye_job | yes | **VERIFIED:** on Alan Dye leaving Apple's Human Interface team for Meta and Stephen Lemay (an interaction designer) taking over: Dye's era favoured "how things look" over how they work; macOS Tahoe is messier than Sequoia; the Mac needs depth, layering and clear input focus; designers and programmers "should — speak the exact same language". | Explains why "Apple-like" should mean **behaviour and structure**, not the current visual fashion. Supports preferring app structure over glass. |
| 2.5 | **"Physicality: the new age of UI"** (Sebastiaan de With, Lux, 2025-06-03) | https://www.lux.camera/physicality-the-new-age-of-ui/ | yes | **VERIFIED:** three eras: Shaded (skeuomorphism), Flat (iOS 7), Physicality (glass). Skeuomorphism was "lacquer" that didn't behave like its material; flat design "overcorrected by stripping out cues that signal something is tappable"; dynamic depth works; restraint: richness at varying levels. **INFERRED (Daring Fireball link, 2026-03-11):** the author has since joined Apple's design team. | The clearest history of *why* Apple surfaces look the way they do, from someone now inside. Good for the materials rules and the "objects look like objects" preference. |
| 2.6 | **"How to make absolutely any app look like a macOS app"** (Anton Lovchikov, Evil Martians, 2022-06-16) | https://evilmartians.com/chronicles/how-to-make-absolutely-any-app-look-like-a-macos-app | yes | **VERIFIED:** web/Electron to Mac: default arrow cursor (hand pointer only for links that open a browser page); labels not selectable, only values; styled buttons, pop-ups and checkboxes **don't react to hover**, only ghost buttons do; no hover background on menu items or table rows, but dropdown items do highlight; selected item is highlighted; toggled mode shown by a subtle background (obvious mode) or accent foreground; right-click menus on lists, and re-implement copy/paste if you override it; don't overuse the accent. | **The most concrete web-to-Mac translation found.** Several tells AISloop lacks: `cursor: pointer` on every control, hover lift on every button, selectable labels. |
| 2.7 | **"What Makes an App Feel 'Right' on the Mac?"** (Watts Martin, Coyote Tracks, 2025-03-31) | https://coyotetracks.org/blog/app-feel-on-mac/ | yes | **VERIFIED:** test "a good Mac citizen", not the toolkit: standard menus in order; "Settings should appear in a window, not a tab"; Services; text fields honour system key bindings and text replacements; native-looking controls; "The UI font should be San Francisco, or at the very least something similar". | A checklist of *behaviours* that make software feel Apple. Most are out of reach for web apps, which tells us where web can't fully match and shouldn't pretend. |
| 2.8 | **"Sketch, and the Joy of Mac-App Mac Apps"** (Gruber, 2020-11) + **"Mac-Assed Mac Apps"** link (2020-03-20) | https://daringfireball.net/2020/11/sketch_mac_app_mac_apps · https://daringfireball.net/linked/2020/03/20/mac-assed-mac-apps | yes | **INFERRED (search summary):** origin of the "Mac-assed Mac app" term; Brent Simmons's point that "native" (Slack) is not the same as Mac-feeling. | The vocabulary people use for the feeling AISloop wants. |
| 2.9 | **"Part of your world: Why we're proud to build a truly native Mac app"** (Sketch) | https://www.sketch.com/blog/part-of-your-world-why-we-re-proud-to-build-a-truly-native-mac-app/ | yes | **INFERRED:** a vendor's case for native conventions. | Vendor view; lower weight. |
| 2.10 | **"Claude's Criminally Bad Electron Mac App Is an Inside Job"** (Gruber, 2026-07-03) · **"SwiftUI Only Makes It Easy to Develop Bad Apps"** (2026-06) | https://daringfireball.net/2026/07/claudes_criminally_bad_mac_app_is_an_inside_job · https://daringfireball.net/2026/06/swiftui_only_makes_it_easy_to_develop_bad_apps | yes | **VERIFIED (first):** "Electron guarantees that an app feels just as wrong on all platforms." No concrete tells listed. **INFERRED (second):** a native toolkit alone doesn't make a good app. | Context: web UIs are judged harshly against native. AISloop's honest promise should be "feels like an Apple app" in layout, type, restraint and behaviour, not "is indistinguishable". |
| 2.11 | **"Invisible Details of Interaction Design"** (Rauno Freiberg) | https://rauno.me/craft/interaction-design (repost: https://every.to/p/invisible-details-of-interaction-design, 2023-07-17) | yes | **INFERRED (search summary + known essay):** why iOS and macOS interactions feel right: metaphors (swipe = page turn), momentum kept on dismiss, interruptibility, pinch anchor, shake-to-find pointer. | The best essay-form explanation of Apple's "feel" by a web designer (Vercel). Pair with WWDC18/803. |
| 2.12 | **"You Don't Need Animations"** · **"Great Animations"** · **"Building a drawer component"** (Emil Kowalski) | https://emilkowal.ski/ui/you-dont-need-animations · https://emilkowal.ski/ui/great-animations · https://emilkowal.ski/ui/building-a-drawer-component | yes | **VERIFIED (first):** animate rarely-seen moments only; never animate keyboard actions; no hover effects on things used many times a day; "UI animations should generally stay under 300ms" (180 ms dropdown beats 400 ms); "Sometimes the best animation is no animation"; tooltip delay rules. **INFERRED:** the drawer essay explains the iOS-sheet physics behind Vaul. | Concrete motion values for web, consistent with Apple's "avoid motion on frequent interactions". |
| 2.13 | **"How we redesigned the Linear UI (part II)"** (Linear, 2024-03-28) | https://linear.app/now/how-we-redesigned-the-linear-ui | yes | **VERIFIED:** themes from 3 inputs (base, accent, contrast) in LCH instead of 98 variables; less blue in the chrome for a neutral look; darker text in light mode; sidebar and tabs aligned "to reduce visual noise"; "black and white opacities to express elevation"; "A redesign should not completely disassemble the product". | A web product team explaining how they made app chrome calmer. The 3-input LCH theme is a strong token idea for AISloop. |
| 2.14 | **"Flat UI Elements Attract Less Attention and Cause Uncertainty"** (NN/g) | https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/ | yes | **INFERRED (known study):** eye-tracking shows weak signifiers (flat, unbordered clickables) cost time and confidence. | Evidence for the preference "the thing you act on should look like an object". |
| 2.15 | **Squircles / continuous corners**: Figma "Desperately seeking squircles"; 99% Invisible "Circling the Square"; David Smith "Changing Corners" (2023-05-09) | https://www.figma.com/blog/desperately-seeking-squircles/ · https://99percentinvisible.org/article/circling-square-designing-squircles-instead-rounded-rectangles/ · https://www.david-smith.org/blog/2023/05/09/design-notes-36/ | yes (all three) | **INFERRED (search summaries + known articles):** Apple uses continuous-curvature corners; a plain circular radius has a visible curvature break where it meets the straight edge; Figma reverse-engineered the iOS curve as "corner smoothing". | Explains a subtle reason CSS `border-radius` looks "web". Now fixable natively (MDN `corner-shape: squircle`, §4). |
| 2.16 | **"Liquid Glass in the Browser: Refraction with CSS and SVG"** (kube.io, 2025-09-04) · **"Building glass for the web"** (Aave Labs) | https://kube.io/blog/liquid-glass-css-svg/ · https://aave.com/design/building-glass-for-the-web | yes | **VERIFIED:** kube.io uses Snell's-law displacement maps through `backdrop-filter: url(#filter)`, **Chrome-only**, "experimental", expensive to resize. Aave filters the element's own pixels with `feDisplacementMap`, works in Chromium, Safari and Firefox; design lessons: gentler refraction where values must be read, "refract the highlight, not the labels", glass on switch thumbs and selection indicators only. | The two best technical write-ups. They show real glass is costly and fragile on the web: a reason to keep glass rare, and to prefer Apple's plain "standard materials" (blur + tint) for web chrome. |
| 2.17 | **"On Liquid Glass"** (Michael Tsai, 2025-10-16) | https://mjtsai.com/blog/2025/10/16/on-liquid-glass/ | yes | **INFERRED:** link roundup of developer and designer reactions. | One page to find dozens of critiques. |
| 2.18 | **"macOS Tahoe's Messy Menus"** (MacStories) | https://www.macstories.net/linked/macos-tahoes-messy-menus/ | yes | **INFERRED.** | Corroborates 2.1. |
| 2.19 | **iOS Design Guidelines** (Ivo Mynttinen) | https://ivomynttinen.com/blog/ios-design-guidelines/ | yes | **INFERRED:** the long-standing third-party digest of iOS measurements (bars, type, spacing, icons). | A second source for numbers; check its iOS version before use. |
| 2.20 | **"iOS vs. Android App UI Design: The Differences Explained"** (Erik Kennedy, Learn UI Design, 2021) | https://www.learnui.design/blog/ios-vs-android-app-ui-design-complete-guide.html | yes | **INFERRED:** side-by-side of iOS and Material conventions (titles, buttons, tabs, icons). | Helps phrase rules as "do the iOS thing, not the Material thing" (e.g. text buttons vs filled FAB). Pre-Liquid Glass. |
| 2.21 | **Bjango articles** (Marc Edwards) | https://bjango.com/articles/ | yes | **INFERRED:** precise, technical articles on designing for Apple screens (pixel fitting, colour management, exporting). | Background for hairlines and colour profiles. |
| 2.22 | **"First Principles of Interaction Design"** (Bruce Tognazzini, askTog) | https://asktog.com/atc/principles-of-interaction-design/ | yes | **INFERRED:** principles from Apple's original HI evangelist (latency, Fitts's law, defaults, visible state). | Rationale for hit-target and feedback rules. |
| 2.23 | **Dieter Rams: "Good design"** (Vitsœ) | https://www.vitsoe.com/us/about/good-design | yes | **INFERRED:** the ten principles ("as little design as possible") that shaped Apple's industrial design. | Vocabulary for "calm", "honest", "unobtrusive". Use sparingly; it is a cliché in slop prompts too. |
| 2.24 | **"Desktop Apps Ain't What They Used to Be"** (Matt Birchler) · **"Elegy for the Native Mac App"** (Medium) | https://birchtree.me/blog/desktop-apps-aint-what-they-used-to-be/ · https://medium.com/source-and-buggy/elegy-for-the-native-mac-app-39ee92cc37ba | yes | **INFERRED.** | The web-versus-native debate; context only. |

**Not reachable:** Nathan Gitter's "Building Fluid Interfaces" (the well-known code companion to WWDC18/803) on Medium returned a Cloudflare 403 (**blocked**). Rasmus Andersson's Inter "dynamic metrics" page (`rsms.me/inter/dynmetrics/`), which documented an SF-like size-dependent tracking formula, now returns **404**.

---

## 3. More web products with an Apple-app feel

None of these are in `sources.md`. Research for this section opened JavaScript pages in headless Edge and read their visible text and computed font; no screenshots were saved. Every visual description is **INFERRED** unless marked otherwise. Ordered by usefulness within each group.

### 3a. Apple's own web UIs beyond Music, Podcasts, App Store, Maps and Developer docs

| # | Title | URL | Loads | What it offers | Why it matters to AISloop |
|---|---|---|---|---|---|
| 3.1 | **iWork for iCloud via "anyone with the link" shares** (Pages, Numbers, Keynote on the web) | shared links on `www.icloud.com`; doc: https://support.apple.com/guide/keynote-icloud/gil6483157e4/icloud | doc: yes. A link must first be created by the owner from his own Apple Account. | **VERIFIED (Apple doc):** you can send "a link that doesn't require an Apple Account to view the presentation"; "Anyone can tap or click the link to open the presentation." **INFERRED:** Pages and Numbers work the same way. | **Unlocks the ideal reference that `sources.md` dropped as login-only.** Apple's real productivity web UI (toolbar, inspector sidebar, canvas) reachable by the capture tool without signing in. **Action for Asil:** make a view-only Pages doc, Numbers sheet and Keynote deck with dummy content and share them as "Anyone with the link". |
| 3.2 | **Apple System Status** | https://www.apple.com/support/systemstatus/ | yes | **VERIFIED:** a flat list of about 60 services, each with a status dot and a legend ("Green Circle: Available", "Resolved Outage"). No cards, KPIs or charts. | **Apple's own answer to "status dashboard"**, and the direct opposite of the shadcn KPI-card dashboard (C6). Strong board item. |
| 3.3 | **Apple Developer Forums** | https://developer.apple.com/forums/ | yes, read without login | **VERIFIED:** font stack `-apple-system, "SF Pro Text"…`; search, then Forums / Activities / Post, topic, subtopic chips, tags with RSS. | A dense list-and-detail web tool built by Apple: lists, tags, quiet headers. |
| 3.4 | **Apple Support user guides** | https://support.apple.com/guide/notes/welcome/mac | yes | **VERIFIED:** version selector from macOS 27 "Golden Gate" back to High Sierra; "Search this guide"; table of contents; topic cards with one-line descriptions. | Apple's own calm, text-first reading UI. Also the best official screenshot source (G1 in §5). |
| 3.5 | **WWDC video pages** | e.g. https://developer.apple.com/videos/play/wwdc2025/219/ | yes | **VERIFIED:** Summary / Transcript tabs, chapter list with timestamps, related videos. | Apple's pattern for long text next to media, with a quiet segmented control. |
| 3.6 | **Apple Invites guest RSVP** (`icloud.com/invites`) | doc: https://support.apple.com/guide/apple-invites/DEVC9D9CDBD5 | doc: yes | **VERIFIED (doc, via search):** a guest without an Apple Account can open an invitation and RSVP with an email code. | Apple's newest consumer web app: current Apple web styling on an event card and form. Asil can invite himself. |
| 3.7 | **Apple Account web** | https://account.apple.com/ | 200, title "Manage your Apple Account"; headless stayed on "Loading…" | **INFERRED:** Apple's sign-in and form styling. | Form fields, buttons and focus rings by Apple. Check by eye. |
| 3.8 | **Apple Support Community** | https://discussions.apple.com/welcome | yes | **VERIFIED banner:** "The Apple Support Community will permanently close on November 20, 2026"; read-only now. | **Capture today (2026-11-19) or drop it.** |
| 3.9 | **Apple Books web** | e.g. https://books.apple.com/us/book/the-swift-programming-language-swift-5-7/id881256329 | yes (200) | **INFERRED:** the same Svelte shell as Music and Podcasts. | A fourth accent-colour variant of one system; low added value. |
| 3.10 | **iCloud Shared Album "Public Website"** | doc: https://support.apple.com/guide/icloud/mme985ae44d8/icloud | doc not opened (search result) | **INFERRED:** anyone can view the album in a browser; photo grid only. | Low value. |

### 3b. Third-party live UIs (public, no login)

| # | Title | URL | Loads | What it offers | Why it feels Apple-like (or not) |
|---|---|---|---|---|---|
| 3.11 | **React Modal Sheet demos** | https://temzasse.github.io/react-modal-sheet/ (`/examples/apple-maps/`, `/examples/apple-music/`, `/examples/snap-points/`) | yes | **VERIFIED:** example pages named "Apple Maps" and "Apple Music"; promises "native-feeling interactions to the web" (drag, flick, snap). | iOS sheet detents running in a browser. The best live test of whether sheets belong in AISloop's web rules. Fidelity INFERRED. |
| 3.12 | **Silk** | https://silkhq.com | 200, but blank in headless (heavy JS or bot detection) | **VERIFIED claims:** "Native-like swipeable sheets": detents, depth, detached and stacked sheets, toast, page from bottom, parallax page; swipe on touch, trackpad and mouse wheel; "blended iOS status bar". Licence unclear ("Get Access"). | Likely the most iOS-faithful sheet physics on the web (INFERRED). Open by hand. |
| 3.13 | **Plausible live demo** | https://plausible.io/plausible.io | yes, a real public dashboard | **VERIFIED:** font `ui-sans-serif, system-ui`; six KPIs in one row; one chart; tabbed lists (Channels / Sources / Campaigns; Top / Entry / Exit pages) with bar-backed rows. | Calm data: **tabs and bar-backed lists instead of a bento grid**. A middle pole between C6 and Apple's System Status. |
| 3.14 | **Fathom Analytics demo** | https://usefathom.com/demo (redirects to `app.usefathom.com/share/…`) | yes | **VERIFIED:** font `int, -apple-system`; single scrolling page: realtime count, KPIs, area chart, pages table. | Sibling to Plausible for an A/B. |
| 3.15 | **tldraw** | https://www.tldraw.com | yes, live, no login | **VERIFIED:** font `Inter, -apple-system, system-ui`. **INFERRED:** floating rounded tool palettes over a canvas, close to Apple Freeform. | Tests "floating chrome over content" (the Maps case) in a canvas app. |
| 3.16 | **Sonner** (Emil Kowalski) | https://sonner.emilkowal.ski | yes | **VERIFIED:** toast types, six positions, swipe direction depends on position, expand/stack. | A calm stacked-notification pattern. Likeness to Apple notifications INFERRED. |
| 3.17 | **NumberFlow** | https://number-flow.barvian.me | yes | **VERIFIED:** "An animated number component. Dependency-free. Accessible." | Digits that roll like Apple's (INFERRED): purposeful motion on value changes, not decoration. |
| 3.18 | **Rauno Freiberg, Craft** | https://rauno.me/craft | yes | **VERIFIED titles:** SwiftUI Dock, Toolbar Morph, ⌘K Breadcrumbs, Command Menu, Spatial Tooltip, Animated Checkboxes; essays "Invisible Details of Interaction Design", "Designing Depth". | Apple-grade interaction details prototyped live by a web designer. |
| 3.19 | **Cal.com booking page** | https://cal.com/peer | yes | **VERIFIED:** month grid, day picker, 12h/24h toggle, time-slot list. **INFERRED:** monochrome and calm. | A public picker/form reference that is not a dashboard. |
| 3.20 | **Elk** (Mastodon client) | https://elk.zone | yes; public timeline without login | **VERIFIED:** `-apple-system` stack; sidebar Home / Notifications / … / Settings. **INFERRED:** compact, icon sidebar, Twitter-for-Mac-like. | Sidebar-plus-list social app. |
| 3.21 | **Bluesky web** | https://bsky.app/profile/bsky.app | yes (profiles); home page timed out headless | **VERIFIED:** `InterVariable, -apple-system` stack. **INFERRED:** React Native Web sharing its iOS app's layout. | Shows, uncurated, what an iOS app looks like when moved to the web. |
| 3.22 | **Phanpy** | https://phanpy.social | landing yes; timelines need Mastodon login | **VERIFIED:** font stack starts with `ui-rounded`, so SF Rounded on Apple devices. | A live answer to the `ui-rounded` question in `sources.md` §4.2. |
| 3.23 | **Tweek** | https://tweek.so | yes, usable without login | **VERIFIED:** week columns with inline onboarding ("Mark me complete / Drag to the next day") inside the real UI. | Paper-like rather than Apple; shows onboarding without modals. Medium value. |
| 3.24 | **Brian Lovin, App Dissection** | https://brianlovin.com/app-dissection | yes | **VERIFIED:** about 25 teardowns from 2016 (Paper, Sunrise, Inbox…). | Dated but substantive §2-type analysis. |
| 3.25 | **Devouring Details** | https://devouringdetails.com | landing yes; content paid | **VERIFIED:** "23 chapters with 23 downloadable React components"; Register/Login. | Interaction-detail course (Rauno); paid. |

### 3c. Native Mac apps whose pages show real UI (same genre as `sources.md` §1c)

| # | Title | URL | Loads | What it offers | Why it matters |
|---|---|---|---|---|---|
| 3.26 | **Tower** | https://www.git-tower.com/mac | yes | **VERIFIED alts:** "Reordering and squashing commits in Tower's interactive rebase", "Managing several Git worktrees…". | Dense pro Mac app with sidebar and toolbar. |
| 3.27 | **Retcon** | https://retcon.app | yes | **VERIFIED alt:** "A commit list. A new commit titled 'Increase gravity' is being inserted by drag-and-drop." | Minimal, very AppKit-native; drag and inline states. |
| 3.28 | **NetNewsWire** | https://netnewswire.com | yes | **VERIFIED alts:** "NetNewsWire for Mac", "NetNewsWire for iPad". | Three-pane reader with standard controls; the Brent Simmons "Mac-assed" example. |
| 3.29 | **Nova** (Panic) | https://nova.app | yes | **INFERRED:** the canonical Mac-native editor; only extension-icon alts found. | — |
| 3.30 | **Notion Calendar** (formerly Cron) | https://www.notion.com/product/calendar | yes | **VERIFIED:** alts "Desktop App", "Mobile App"; cron.com is titled "Cron Calendar". | Calendar density, compare with Fantastical (#17). |
| 3.31 | **Readwise Reader** · **Feedbin** | https://readwise.io/read · https://feedbin.com | yes (apps need login) | **VERIFIED:** Reader alts "ipad app", "A document with a highlight and note"; Feedbin: "clean interface with customizable themes and typography". | Reading apps with typography focus. |

### Checked and dropped (VERIFIED unless noted)

- **Mercury demo:** redirects to `/dashboard`, no password field, but stayed on "Loading…" after 15 s headless. Still inconclusive; check by hand.
- **Telegram Web:** QR login wall. **cmdk.paco.me:** now redirects to github.com/dip/cmdk; demo gone. **arc.net:** "A farewell to Arc". **amie.so:** pivoted to "AI Note Taker". **height.app:** no response. **glass.photo:** CloudFront 403. **dynamic-island.vercel.app:** HTTP 402.
- **Excalidraw:** live, but the hand-drawn look is not Apple-like. **HEY, Basecamp:** 37signals' own style, not Apple-like. **Superhuman, Reflect, Tana, Pitch:** marketing only, app needs login. **simpleanalytics.com:** blank headless.

---

## 4. Open-source kits that imitate Apple

Assessed honestly, as "good reference", "useful tool", or "bad imitation". `sources.md` already covers Framework7, Ionic, Konsta, Radix Themes, Puppertino (C9) and macos-web (C8); only updates on those are given.

### 4a. Good references and useful tools

| Title | URL | Loads | Stats | What it offers | Assessment |
|---|---|---|---|---|---|
| **Swift-DocC Render** (Apple / swiftlang) | https://github.com/swiftlang/swift-docc-render | yes | Apache-2.0 (**VERIFIED** on the repo page) | **VERIFIED:** "Web renderer for Swift-DocC documentation". **INFERRED:** the Vue app behind `developer.apple.com/documentation` (`sources.md` #5) and Swift.org docs. | **The only open-source web UI written by Apple.** Its CSS shows how Apple's own web engineers do sidebars, navigators, type scale, dark mode and focus on the web. Read it for values (Apache-2.0 allows reuse with attribution). Top find. |
| **Vaul** (Emil Kowalski) | https://github.com/emilkowalski/vaul · demo https://vaul.emilkowal.ski/ | yes | 8,754★, MIT, pushed 2025-10-03 | **VERIFIED:** "A drawer component for React"; the README now says "This repo is unmaintained". The docs mention a `/gestures` agent skill: track "the finger 1:1, carry the speed of the release, and let the drawer be caught mid-animation". **INFERRED:** behaves like an iOS sheet (drag, snap points, scaled background). | A good, restrained reference for "sheet" behaviour on touch web, but unmaintained, so a reference rather than a dependency. The gesture rule is worth copying verbatim as a principle. |
| **Cupertino Panes** | https://github.com/tech-systems/panes · https://panejs.com/ | yes | 728★, MIT, pushed 2026-02-26 | **VERIFIED:** "multi-functional modals, cards & panes with touch technologies… like in Apple Maps, Apple Stocks, Apple Music". 12 kB, framework-agnostic. | Useful for map-style floating panels (`sources.md` #4 Apple Maps). Quality of motion **INFERRED**; test before recommending. |
| **CSS `corner-shape`** (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape · https://caniuse.com/mdn-css_properties_corner-shape | yes | standard | **VERIFIED:** keywords `round`, `squircle` (= `superellipse(2)`), `square`, `bevel`, `scoop`, `notch`; works only where `border-radius` rounds; "not Baseline… Limited availability". | **The native fix for continuous corners.** Rule candidate: `corner-shape: squircle` as progressive enhancement over `border-radius`. Check the radius: a squircle at the same radius looks smaller, so radii may need raising (INFERRED). |
| **figma-squircle** · **smooth-corners** | https://github.com/phamfoo/figma-squircle (demo https://figma-squircle.vercel.app/) · https://github.com/wopian/smooth-corners | yes | MIT both | **VERIFIED (descriptions):** SVG-path squircles with Figma's corner smoothing; a CSS Houdini paint worklet for superellipse masks. | Fallbacks where `corner-shape` is missing. Probably unnecessary once `corner-shape` ships widely. |
| **Motion `spring`** | https://motion.dev/docs/spring | yes | — | **VERIFIED:** springs set by `visualDuration` and `bounce` (−1…1, default 0.25; 0 = critically damped), or stiffness/damping/mass; can emit CSS `transition` strings. | **INFERRED:** the same duration-plus-bounce model Apple introduced in "Animate with springs" (WWDC23). The cleanest way to give a web UI Apple-like springs with Apple's own numbers. |
| **Framework7 v9.3** (update to `sources.md` #6) | https://framework7.io/ | yes | — | **VERIFIED:** "v9.3.0 released on October 30, 2026"; "Now with iOS 26 styles!". No macOS theme. | The iOS-literal demo is now on the current iOS look; re-capture it for the board. |
| **liquid-glass-web-react** (PallavAg) | https://github.com/PallavAg/liquid-glass-web-react · demo https://agpallav.com/liquid-glass | yes | 97★, MIT, pushed 2026-06-10 | **VERIFIED (README):** cross-browser (Chrome, Safari, Firefox) displacement over live DOM, ~5 kB, based on Aave's write-up; text stays selectable. | The technically honest glass library. Even so, glass belongs on a few controls only (§1.1b). |

### 4b. Bad imitations, costumes and dead ends

| Title | URL | Loads | Stats | What it offers | Assessment |
|---|---|---|---|---|---|
| **liquid-glass-react** (rdev) | https://github.com/rdev/liquid-glass-react · demo https://liquid-glass.maxrovensky.com/ | yes (demo JS) | 6,742★, MIT, pushed 2025-06-13 | **VERIFIED (README):** refraction, chromatic aberration, "elasticity, to mimic Apple's 'liquid' feel"; "Safari and Firefox only partially support the effect". | The most popular web Liquid Glass. Its demos are glass as **decoration** (chromatic aberration on cards), the thing Apple says not to do. Counter-example for the board. |
| **glass-ui** (crenspire) · **glasscn-ui** (itsjavi) · **Quidlass** · 21st.dev "Apple Tahoe Liquid Glass Button" | https://github.com/crenspire/glass-ui · https://github.com/itsjavi/glasscn-ui · https://github.com/programmerlapar/quidlass · https://21st.dev/community/components/explore/shadcn-liquid-glass | yes | glasscn-ui **archived** (VERIFIED); glass-ui ~100★ (INFERRED) | **VERIFIED (descriptions):** shadcn/Tailwind components with glass variants "inspired by Apple's design". | **Glass applied to every component.** The 2026 version of glassmorphism slop. Counter-examples. |
| **react-desktop** (gabrielbull) | https://github.com/gabrielbull/react-desktop | yes | 9,470★, MIT, last push 2023-07-01 | **VERIFIED:** "React UI Components for macOS High Sierra and Windows 10"; "Help wanted!". | Dated (2017 look) and unmaintained. Shows how fast literal skins age. |
| **Desktop UI** (andrejilderda) | https://github.com/andrejilderda/desktop-ui | yes | 26★, no licence | **VERIFIED:** README marks it "🏚️ Abandoned". Planned Radix-based macOS Ventura / Windows 11 kit with Storybooks. | Dead, but its Storybooks may still load (not checked) and show the honest attempt: macOS controls on Radix primitives. |
| **react-big-sur** (Joeyonng) | https://github.com/Joeyonng/react-big-sur · https://joeyonng.github.io/react-big-sur/ | yes | 1★, last push 2022-03-22 | **VERIFIED:** "built to simulate macOS Big Sur". | Abandoned literal skin. |
| **@sylonik/macos-ui** | https://github.com/sylonik/macos-ui | yes | 2★, MIT, pushed 2026-04-26 | **VERIFIED (README):** "Pixel-Perfect macOS Design… Window, Dock, MenuBar, and DesktopIcon"; shadcn-style CLI; uses `lucide-react`. | **Copies OS chrome (Dock, menu bar), not app layout** — the exact mistake AISloop must avoid (same family as C8). |
| **playground-macos** (Renovamen) · **react-ui-os** (saschb2b) | https://github.com/Renovamen/playground-macos · https://github.com/saschb2b/react-ui-os | yes | 3,506★, MIT, pushed 2024-05 · — | **VERIFIED (descriptions):** portfolio "simulating macOS's GUI"; "React based operating system component library". | OS-simulation genre. Counter-examples next to C8. |
| **system.css** (sakofchit) | https://github.com/sakofchit/system.css · https://sakofchit.github.io/system.css/ | yes | 3,938★, MIT, pushed 2023-11 | **VERIFIED:** "A design system for building retro Apple interfaces" (System 6). | Well made, but a deliberate retro costume. Not our target; useful only to show that "Apple" is a moving target. |
| **Onsen UI** · **Ratchet** · **iOCSS** · **iOS-7-CSS** | https://onsen.io/ · https://github.com/twbs/ratchet · https://github.com/lazd/iOCSS · https://github.com/hbang/iOS-7-CSS | yes (goratchet.com timed out) | iOCSS **archived**, last push 2014 (VERIFIED) | Hybrid-app CSS kits from the iOS 6–7 era. | History only. They show the "iOS-literal web" genre has a 12-year track record of ageing badly. |
| **WebF Cupertino UI** | https://github.com/openwebf/webf-cupertino-ui | yes | Apache-2.0 (INFERRED) | **VERIFIED:** "Provides Flutter's Cupertino widgets as HTML custom elements"; renders through Flutter, not the browser. | Not usable for plain web. |
| **Tokamak** | https://github.com/TokamakUI/Tokamak | yes | **archived** (VERIFIED, "Looking for active maintainers") | SwiftUI-compatible framework for WebAssembly. | Dead end, but proof that "SwiftUI on the web" was tried. |
| **Apple's App Store web front-end source (leaked)** | news: https://9to5mac.com/2025/11/04/web-app-store-front-end-source-code-github/ | yes | DMCA'd | **INFERRED (news):** Apple shipped `apps.apple.com` with source maps on 2025-11-04; the Svelte source was posted to GitHub and removed by DMCA (thousands of forks). | **Do not use.** It would be the perfect reference for Apple's own web design system, but it is copyrighted and was taken down. Read only what the live site renders (`sources.md` §1a). |

**Overall assessment (INFERRED):** no open-source kit gives "an Apple *app* on the web" with modern quality. The field splits into (a) iOS-literal mobile kits (Framework7, Konsta, Ionic) that are good but phone-shaped, (b) macOS skins that are abandoned or copy OS chrome, and (c) glass libraries that make glass the point. The best raw material is not a kit at all: Apple's own Swift-DocC Render CSS, native CSS (`corner-shape`, `system-ui`, stylable `select`), and spring maths. This supports AISloop being rules plus tokens rather than a component library.

---

## 5. Free screenshot galleries

"Automation" = what happened to curl / WebFetch / headless Edge. Screenshots of third-party products stay private (D-003).

### 5a. Useful sources

| # | Title | URL | Loads | Apple native apps? | Automation | What it offers / why it matters |
|---|---|---|---|---|---|---|
| G1 | **Apple Support user guides** | https://support.apple.com/guide/notes/welcome/mac (any app: `/guide/<app>/…/mac`) | yes, no login | **Yes, official.** **VERIFIED alts** such as "A Notes app window on Mac showing an audio recording… live transcription… in the panel". Version selector from macOS 27 back to High Sierra. | curl and headless OK | **Highest value.** Official, current, captioned screenshots of every built-in app (Notes, Reminders, Mail, Finder, Settings…) for Mac, iPhone and iPad. The alt texts alone can be scraped into an index. Complements the owner's own screenshots. |
| G2 | **App Store pages of Apple's own apps** | e.g. https://apps.apple.com/us/app/reminders/id1108187841 | yes | **Yes, official.** **VERIFIED:** 22 images on the Reminders page, developer "Apple". | OK | Official per-platform screenshots on the current OS. |
| G3 | **512 Pixels macOS Screenshot Library** (Stephen Hackett) | https://512pixels.net/projects/aqua-screenshot-library/ | yes | **VERIFIED:** 24 releases, newest macOS 27 "Golden Gate", then Tahoe 26. No usage terms stated. | OK | Shows how Aqua changed release by release. Private reference only. |
| G4 | **MacStories OS reviews** | e.g. https://www.macstories.net/stories/macos-26-tahoe-the-macstories-review/ | yes (Club extras paid) | **VERIFIED:** many uncaptioned screenshots across 7 pages. | OK | Real apps plus expert commentary (overlaps §2). |
| G5 | **Apple Newsroom** | e.g. https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ | yes (Turkey region banner, VERIFIED) | Official press images of Liquid Glass apps. | OK | Polished, not workaday screens. Image terms not checked. |
| G6 | **Mobbin** | https://mobbin.com | home and explore 200; `/discover` empty headless | **Yes. VERIFIED in page data:** Apple Notes, Music, Wallet, Health, Fitness, Games, Sports, Maps, Podcasts, App Store. | curl OK; real browsing needs login (free tier limited, INFERRED); has an MCP server (VERIFIED `/mcp`) | Best content, gated. Worth one paid month only if G1/G2 fall short. |
| G7 | **Lazyweb Design** | https://design.lazyweb.com/company/reminders | yes | **Yes, includes Apple Reminders. VERIFIED:** "Showing 5 of 13 app screens"; the rest need a free sign-up. | OK | Partial free previews of Apple apps. |
| G8 | **Refero** | https://refero.design (`/apps/search`) | loads; **VERIFIED gate:** "68,657 more screens hidden. Log In or Sign Up" | iOS and web; Apple apps unknown | headless OK; MCP pitched as making output "look designed, not generated" (VERIFIED) | Login. See the approach note in Gaps. |
| G9 | **Nicelydone** | https://nicelydone.club/examples/apps | yes | No; web SaaS (VERIFIED "227,841 screens", "Free to browse" labels) | OK | Web-app patterns (settings, modals). Not Apple, but good for the web side. |
| G10 | **Are.na** | https://www.are.na/search?q=macos%20ui | yes, search without login | **VERIFIED:** 3.2k results for "macos ui", user channels | OK | Discovery of niche references. |
| G11 | **Setapp app pages** | e.g. https://setapp.com/apps/cleanshot | yes | Third-party Mac apps with screenshots | OK | Many polished Mac apps in one place. |
| G12 | **Recent.design** (godly.website now redirects here, VERIFIED) | https://recent.design | yes | **VERIFIED:** "App Screenshots" and "App Icons" sections | free browsing (INFERRED) | Curated daily; low-medium. |
| G13 | **Pablooo.club** | https://pablooo.club | yes | mobile and desktop; Apple unknown | **VERIFIED:** "All screenshots for free (8 000+)" after sign-in; MCP for Claude Code | Free with login. |
| G14 | **SaaS Interface** | https://saasinterface.com/pages/settings/ | category pages yes | No (VERIFIED: Clerk, ClickUp, Family…) | OK; gallery paywall (INFERRED) | Low-medium. |
| G15 | **Collect UI** | https://collectui.com | yes | Dribbble concept shots (has a "MAC APP" category) | OK | Concepts, not shipped apps: a **counter-example feed**, and a Dribbble substitute since Dribbble is bot-blocked (`sources.md` Gaps). |

### 5b. Paid, gated, blocked or dead (VERIFIED unless noted)

| Source | URL | Status |
|---|---|---|
| Page Flows (screenlane.com redirects here) | https://pageflows.com | "Try 3 Days" trial, then paid. |
| Pttrns | https://www.pttrns.com | "now completely free. Create an account": login. |
| ScreensDesign (uisources.com, scrnshts.club and designvault.io all redirect here) | https://screensdesign.com | Login/paid (INFERRED); onboarding and paywall flows, not Apple. |
| Appshots | https://appshots.design | "Try for free", login. |
| Apple "new design gallery" | `developer.apple.com/design/new-design-gallery/` | **Gone:** 301 to `/design/`, though search engines still index it. |
| UX Archive | — | Cloudflare 403. |
| UI Garage | — | "UI Garage is closing down". |
| AppFuel, mobile-patterns.com, appscreens.design, mac-screenshots.com | — | No response. |
| SaaSFrame, Siteinspire | — | 429 "Vercel Security Checkpoint" (bot-blocked). |
| Behance search | — | 403. |
| landing.love | — | 200 with curl, "Sorry, you have been blocked" (Cloudflare) in headless Edge. |
| Cosmos | — | Pivoted to fashion. |
| Lapa Ninja, Land-book, One Page Love, Awwwards, dark.design | — | Load, but marketing/landing genre. Counter-examples at most. |
| macOSicons | https://macosicons.com | Icons only, not UI. |

---

## 6. Writing on AI slop in UI

### 6.0 Two findings that matter more than any single entry

1. **The popular anti-slop rule sets would flag AISloop's own choices as slop.** **VERIFIED:** avoid-ai-design (6.8) rates "Inter (or the system stack) for everything" as its most severe tell; Uncodixfy (7.4) bans "Segoe UI… safe default stacks"; Impeccable (7.1) bans the platform sans as a display face and says "A grey screen with one accent colour is the category default without the category's polish, not restraint." Anthropic's own skill (6.2) lists middle-dot meta strings ("A · B · C"), ALL-CAPS labels, near-black `#0B0B0B` and "→" on links as tells. **INFERRED (to check against the native screenshots):** Music and the App Store use middle-dot metadata; macOS uses Title Case on buttons and menus; iOS grouped-list section headers were uppercase small labels for years (newer iOS versions use sentence case in many places). AISloop must **defend these as the genre's choice** and name where the polish comes from, or these skills will "fix" AISloop pages.
2. **What people actually notice differs from our counter-examples.** **VERIFIED:** a study of 3.2 million Reddit posts (6.7) ranks **untouched shadcn/Tailwind defaults** and **the purple gradient** highest; bento, glass and aurora rank near the bottom. `sources.md` §2 leans on glass, bento, aurora and sparkles, so the board should add untouched shadcn and the other high-frequency tells below.

### 6.1 Sources

| # | Title (author, date) | URL | Loads | What it offers | Why it matters to AISloop |
|---|---|---|---|---|---|
| 6.1 | **"Improving frontend design through Skills"** (Anthropic, 2025-11-12) | https://claude.com/blog/improving-frontend-design-through-skills | yes | **VERIFIED:** names the cause, "distributional convergence": safe choices "dominate web training data", so the model "samples from this high-probability center". Named defaults: Inter, purple gradients on white, minimal animation. Admits that banning one default only moves the model to the next (Space Grotesk). No measured evaluation. | Why ban lists alone fail. AISloop needs a **positive target** with values, not only bans. |
| 6.2 | **Anthropic `frontend-design` SKILL.md** (updated 2026-09-03) | https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md | yes | **VERIFIED:** five clusters AI design falls into: (1) cream `#F4F1EA` + serif display + terracotta `#D97757`; (2) near-black + one acid-green or vermilion accent; (3) newspaper layout with hairline rules and square corners; (4) the SaaS card kit: one radius everywhere, `rgba(0,0,0,.1)` shadows, gradient washes; (5) template chrome: ALL-CAPS labels above headings, "A · B · C" meta strings, "WORD — fragment" labels, `#0B0B0B` as black, monospace data labels, "→" on links. Also: one accented word in a headline; 01/02/03 markers on non-sequences; fade-up on every section; hover on every card; big-number hero. Writing: "Save changes," not "Submit"; "Publish" produces a "Published" toast; errors don't apologise. Plans first, then checks the plan against the generic default. | The most precise vendor tell list, but several items clash with Apple conventions (see 6.0). |
| 6.3 | **Claude Cookbook, "Prompting for frontend aesthetics"** | https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics | yes | **INFERRED:** notebook version of 6.1. | Low; adds little. |
| 6.4 | **OpenAI frontend prompt guide** (GPT-5.5) | https://developers.openai.com/api/docs/guides/frontend-prompt | yes | **VERIFIED:** avoid "purple/purple-blue gradients, beige/cream/sand/tan, dark blue/slate, and brown/orange/espresso" palettes and one-hue palettes; radius ≤ 8px; no cards in cards; no floating section cards; no decorative orbs or bokeh; letter-spacing 0; no viewport-scaled font sizes; tools should be "quiet, utilitarian, and work-focused"; segmented controls for modes, toggles for settings, tabs for views; no in-app text explaining features; "You should not make a landing page unless absolutely required"; check with Playwright screenshots. | Its app-UI stance is close to ours. The zero-tracking rule conflicts with Apple's tighter tracking on large titles. |
| 6.5 | **"Designing delightful frontends with GPT-5.4"** (OpenAI) | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 | yes | **VERIFIED:** tells "dashboard-card mosaics", "App UI made of stacked cards instead of layout"; "Default: no cards" except as the container of an interaction; app copy is "orientation, status, and action over promise, mood, or brand voice"; apps "Start with the working surface itself." | Supports: app screens open on the work, no hero, no mood copy. |
| 6.6 | **"Scoring Show HN submissions for AI design patterns"** (Adrian Krebs, 2026-04-20) | https://adriankrebs.ch/blog/design-slop/ · HN: https://news.ycombinator.com/item?id=47864393 | yes | **VERIFIED:** ~1,590 sites checked in a headless browser against 16 patterns; 22% hit four or more. Patterns include a badge above the main heading, **coloured top or left card borders** ("almost as reliable a sign… as em-dashes for text"), emoji sidebar icons, stat banners, permanent dark mode. | Tells that a script can detect. AISloop could ship a similar check. |
| 6.7 | **`vibecoded-design-tells`** (J. Carter Johnson) | https://github.com/JCarterJohnson/vibecoded-design-tells | yes | **VERIFIED:** 551★, pushed 2026-06-24. Study of 3.2M posts in 47 subreddits: shadcn/Tailwind defaults and the AI purple gradient rank highest; bento, glass, aurora low or rejected. The ranking chart is an image, so only the order is known. | The only data on what real people notice. Use to weight counter-examples. |
| 6.8 | **avoid-ai-design** (funboy322) | https://github.com/funboy322/avoid-ai-design | yes | **VERIFIED:** 165★, MIT, pushed 2026-11-18. ~75 tells, each with ID, severity and detection method (code / visual / judgement), plus `scripts/detect.mjs`; a "silhouette test"; "second-order defaults" (the tasteful escape that becomes the new default); a "don't over-flag" section; 29 cited sources. | **The best catalogue format to copy.** Its top-severity font rule conflicts with `system-ui`. |
| 6.9 | **signs-of-ai-design** (febbhav) | https://github.com/febbhav/signs-of-ai-design | yes | **VERIFIED:** 37★, CC BY-SA 4.0. New tells: "the Lucide five" icons (Sparkles, Zap, Shield, Check, BarChart3); the "ghost card" (hairline border + wide soft shadow); emerald accent when purple is banned; fake terminal hero; spinner as the only loading state. | Good vocabulary, landing-page biased. |
| 6.10 | **Wikipedia: "Signs of AI writing"** | https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing | yes | **INFERRED:** the model for 6.9. | Tells for interface wording. |
| 6.11 | **"AI slop website design"** (Jenny Ouyang, Build to Launch, 2026-10-28) | https://buildtolaunch.substack.com/p/fix-ai-slop-website-design | yes (partly paywalled) | **VERIFIED frequencies over 120 AI-built pages:** icon-on-top feature cards 63%; Lucide as the only icon set 63%; untouched shadcn 61%; Inter or no chosen font 60%; one accent-coloured headline word 52%; pill badge above headline 51%; fade-in on scroll 51%; AI icons (sparkles, lightning, brain) 47%; small tracked uppercase labels 42%. Four "flavours" (purple SaaS, dark glass, bento, cream-and-serif) share one layout. | Frequency data for weighting tells. |
| 6.12 | **"AI Slop in 2026"** (Sailop) | https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web | yes (sells a tool) | **VERIFIED:** the "section waterfall" (~7 equally padded sections in fixed order); the silhouette test (reduce the page to a 200px black-and-white outline, compare with five competitors); a 47-site case study was withdrawn because records were lost. | The silhouette test suits AISloop review boards. Treat numbers with caution. |
| 6.13 | **"The Linear effect"** (Daryl Ginn, 2023-01-10) | https://rectangle.substack.com/p/the-linear-effect | yes (WebFetch; curl timed out) | **VERIFIED:** admired sites get copied into a cliché: dark pages, blurred gradient glows. | Linear and Raycast are in `sources.md`: their **marketing** glow is slop; their **app** density is not. Keep the distinction on the board. |
| 6.14 | **Tailwind indigo-500 as the origin of "AI purple"** | https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p · https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website | yes | **INFERRED:** Tailwind UI's `bg-indigo-500` buttons became the training default; Adam Wathan apologised on X (2025-08-07; tweet not seen). | Origin story for the purple tell. |
| 6.15 | **"Good from Afar, But Far from Good: AI Prototyping in Real Design Contexts"** (NN/g, 2025-10-24) | https://www.nngroup.com/articles/ai-prototyping/ | yes | **VERIFIED:** "many AI-generated screens appear flat and interchangeable"; task-level failures (wrong pattern for a profile page, related items placed far apart). | Slop is also structural and task-level, not just colour and type. |
| 6.16 | **arXiv 2605.15124, "Usable but Conventional…"** | https://arxiv.org/abs/2605.15124 | yes | **INFERRED (search summary):** 92 people judged prototypes blind; AI prototypes "reinforce conventional interface patterns" and were found less pleasing. | Academic support. |
| 6.17 | **Liquid Glass critique** (NN/g) | see §2.3 | yes | **VERIFIED** (read in §2). | Glass-as-decoration is a slop tell even when Apple does it. |
| 6.18 | **AI dashboards and the density fix** (Laith Aljunaidy) | https://uxskill.laithjunaidy.com/blog/ai-dashboard-design-generic.html | yes (sells a tool) | **VERIFIED:** the core problem is landing-page spacing on dense app screens; suggests 4–8px gaps instead of 16–24px, a 4px base, a 1.2 type-scale ratio, 2–4px radius. | Input to the "airy iOS or compact macOS" vote. |
| 6.19 | **Latent Space interview with Paul Bakaus (Impeccable)** | https://www.latent.space/p/skill-engineering-design | yes | **VERIFIED:** "It's never going to be a tool for one-shot design"; "An adjective with nothing behind it is just a nice apostrophe"; shared skills make outputs converge. | Supports concrete values plus the owner's votes over adjectives. |
| 6.20 | **"Why AI Breaks Your Design System"** (Superdesign) | https://superdesign.dev/blog/ai-design-system-drift | yes | **INFERRED:** agents drift from the system they just built. | AISloop needs a cross-page drift check. |
| 6.21 | **"Hey Claude, Why Do AI-Generated Interfaces All Look the Same?"** (truematter) | https://www.truematter.com/ideas/post/hey-claude-why-do-ai-generated-interfaces-all-look-the-same | yes | **VERIFIED:** generic thinking, not styling, is the root cause. | Low. |
| 6.22 | **"How to make absolutely any app look like a macOS app"** (Evil Martians) and **"Making Electron apps feel native on Mac"** (Building Lotus, 2021-02-28) | §2.6 · https://buttondown.com/building-lotus/archive/making-electron-apps-feel-native-on-mac/ | yes | **VERIFIED (second):** root font 14px (author notes 13px is native); system font stack; arrow cursor except for external links; `user-select: none` on UI; match window background to theme to avoid flashes; muted colours when the window loses focus; every shortcut has a menu item; settings in a separate window via ⌘,. | **Web-specific tells of "website, not app"** that the anti-slop literature misses entirely (see list below). |
| 6.23 | **Other "why it all looks the same" posts** | codemyspec.com/blog/vibe-coded-websites-look-the-same · aimadethis.substack.com/p/why-all-vibecoded-designs-look-the · illos.dev/guides/vibe-coded-websites · regards.design/blog/make-website-look-less-vibe-coded · blog.interfacekit.io/why-ai-generated-websites-all-look-the-same · 925studios.co/blog/ai-slop-design-tells · aiskill.market/blog/banning-inter-the-font-tell · tasteprofile.io/blog/why-ai-generated-ui-looks-generic · maxiality.com/how-to-spot-an-ai-generated-website/ · rottoways.com/blog/ai-generated-website-looks-generic · knowyourmeme.com/memes/sites/your-ai-slop-bores-me · developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it | yes (all) | **INFERRED (not read closely):** extra bits: dot or grid patterns behind the hero, pulsing dots, auto-scrolling logo strips, "Not this. That." slogans, generated avatars, five-star rows. | Long tail; low individual value. |

### 6.2 Concrete tells not yet in AISloop

AISloop currently names: purple-blue gradients, glass everywhere, sparkle icons, identical rounded cards, bento grids, shimmer buttons, KPI-card dashboards, aurora backgrounds. Items marked **(A)** may be normal in Apple apps and need a board vote, not a ban.

**Type**
- Inter or Geist as the only typeface; the "tasteful escape" set (Space Grotesk, Instrument Serif, Bricolage Grotesque).
- One headline word in italic serif or colour; gradient-filled text, including big numbers.
- Tracked ALL-CAPS labels above headings; a pill badge above the title. (A) for grouped-list section headers.
- Monospace as a "technical" costume. Title Case everywhere (A on macOS).
- Font weight changing on hover, which shifts the layout.

**Colour**
- Untouched shadcn theme (zinc/slate greys, default radius); indigo/violet buttons; emerald as the fallback accent.
- Cream + terracotta; near-black + acid green; slate, espresso or sand palettes; one-hue palettes.
- `#0B0B0B` near-black as black (A: dark mode backgrounds).
- Dark mode nobody asked for; grey-blue text below WCAG AA.
- Coloured glow shadows; very large shadows (`0 24px 60px rgba(0,0,0,.35)`); faint dot/grid backgrounds.

**Surfaces**
- Coloured bar down one side or top of a card; the ghost card; cards inside cards.
- One radius on everything, or inner radii that don't match the outer (Apple's rule: inner = outer − padding, §1.1b).
- An icon inside a tinted rounded square on every row; check marks in tinted circles.
- A status badge on every table row; pulsing status dots.
- Count-up numbers, fake charts, vague-percentage donuts, filler sparklines.
- Floating sidebar with rounded outer corners; a 280px sidebar topped by a brand block and a call-to-action; a right-hand "Today" panel; usage progress bars.
- Emoji or "the Lucide five" as icons; **an icon on every menu item or list row** (tonsky, HIG 2026, §2.1); fake window chrome (traffic-light dots) or a fake terminal.
- Browser defaults left unstyled: selection colour, caret, scrollbars, focus ring; proportional digits in tables (no `tabular-nums`).

**Layout**
- A hero inside an app; decorative header copy ("Operational clarity without the clutter"); the app's logo or name as the screen title (WWDC25/359 "title that feels like branding"; WWDC26/251).
- In-app text explaining the interface.
- Landing-page spacing on dense app screens; the section waterfall.
- 01/02/03 markers on non-sequences; centring things to look expensive.
- Mobile layouts that only stack everything into one long column.
- Screen-specific actions placed in global navigation (WWDC25/356).

**Behaviour (web-specific, from 6.22 and §2.6)**
- `cursor: pointer` on every button and control (Mac uses the arrow; the hand is for links).
- Every label selectable; dragging selects the UI chrome.
- Hover background or lift on every button, row and menu item.
- No right-click menus on list items; or right-click hijacked without copy/paste.
- No visual change when the window loses focus; white flash on load in dark mode.
- Settings as a giant page of cards instead of grouped sections with immediate-apply toggles.

**Motion**
- The same fade-up on every section; every card lifting on hover; nav links sliding on hover.
- Bounce or elastic easing on things nobody flicked; `transition: all`.
- Animating frequent or keyboard-initiated actions; animations over ~300 ms in app UI (§2.12).
- Animations firing on theme switch; ignoring `prefers-reduced-motion`.

**Copy**
- Generic button labels ("Get started", "Submit"); three-part slogans; "Not X. Y." slogans; feature names like "AI Studio".
- "→" added to links (A: Apple lists use a chevron for navigation); "A · B · C" meta strings (A).
- Footer lines like "dashboard • dark mode • single-file HTML"; tool signatures left in code.

**System**
- Pages drifting apart in style; the "tasteful escape" becoming the next default after a clean-up pass.

---

## 7. Existing agent skills and rulebooks that aim at Apple

Stars and push dates: GitHub API, 2026-11-19, where available. Assessment = what it gets right / what it misses.

### 7.1 Apple-targeted skills

| # | Title | URL | Loads | Stats | What it offers (VERIFIED unless marked) | Gets right | Misses |
|---|---|---|---|---|---|---|---|
| 7.1 | **Emil Kowalski, `apple-design`** | https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md | yes (GitHub later rate-limited us with 429) | repo ~58k★, MIT, pushed 2026-11-15 | WWDC18 "Designing Fluid Interfaces" translated to the web: respond on press, not release; every animation interruptible; springs with Apple values (moving things 1.0/0.4, drawers 0.8/0.3); never stack light glass on light glass; fade at scroll edges instead of hard dividers. Verbatim copy: boraoztunc/skills (479★). | **Best Apple-sourced motion guidance for the web.** | Almost nothing on layout, lists, density, colour or type. |
| 7.2 | **naplesblue, `apple-design-skill`** | https://github.com/naplesblue/apple-design-skill | yes | 292★, licence unclear, pushed 2026-07-20 | "unified surface over fragmented cards" (one white panel with hairlines); glass only where layers overlap; one blue accent; tokens; reference page; checklist. | The panel and glass rules match the HIG. | Mixes apple.com, Newsroom and macOS. Non-Apple values: body line-height ≥ 1.85 (iOS body is 17/22 ≈ 1.29), centred 720/1080px containers, "gentle hover lift", Lucide icons. |
| 7.3 | **davepoon, `macos-design`** (buildwithclaude; listed on mcpmarket and tessl) | https://raw.githubusercontent.com/davepoon/buildwithclaude/main/plugins/all-skills/skills/macos-design/SKILL.md · https://mcpmarket.com/tools/skills/macos-native-ui-design · https://tessl.io/registry/skills/github/davepoon/buildwithclaude/macos-design | yes | MIT (per mcpmarket) | **VERIFIED (read):** "Build interfaces that feel like they belong on the user's computer — not websites crammed into a window"; checklist: top bar + sidebar + content, draggable top zone, empty states, a shortcut for every primary action, design light and dark separately ("Do NOT directly invert colors"), drag and drop. For web artifacts: "Simulate the macOS window chrome (title bar, traffic light dots…)", font stack naming `"SF Pro Display", "SF Pro Text"`, `backdrop-filter: blur()` for vibrancy, radii 10/8/6/4px. "Every state change gets a transition." | Good philosophy line; empty states; keyboard; separate dark palette. | **Fake traffic lights in a browser tab** = OS-chrome costume (our C8 mistake). Naming SF Pro invites font embedding. "Every state change gets a transition" contradicts Apple's "avoid motion on frequent interactions". |
| 7.4 | **bowen31337, `apple-design`** | https://github.com/bowen31337/apple-design | yes | 12★, no licence, pushed 2026-07-13 | Liquid Glass rebuilt in CSS/SVG, springs, components. | — | Treats glass as the essence of Apple, which the HIG warns against; triggers far too broadly. |
| 7.5 | **s1gmamale1, `apple-design-skills`** (nine skills) | https://github.com/s1gmamale1/apple-design-skills | yes | 41★, pushed 2026-05-25 | Claims labelled observed / documented / inferred / speculative; a "restraint × surface" model (utility screens restrained, marketing cinematic). | Evidence labelling, like ours. | Centre of gravity is apple.com scroll showcases. |
| 7.6 | **rukkiecodes, `claude-apple-design-system`** | https://github.com/rukkiecodes/claude-apple-design-system | yes | 21★, MIT, pushed 2026-07-11 | apple.com rules applied to apps: one accent `#0066cc`, pill buttons, no shadows, weight 500 banned. | — | Wrong genre for Settings/Notes/Mail. |
| 7.7 | **getdesign.md / VoltAgent `awesome-design-md`** (Apple file) | https://github.com/VoltAgent/awesome-design-md · https://getdesign.md/apple/design-md | yes | ~128k★, MIT, pushed 2026-10-28 | ~37 KB of **apple.com** tokens: "A photography-first interface that turns marketing into a museum gallery"; `SF Pro Display` first in the font stack; a 56px hero. | — | **The de-facto "Apple" agents pick up, and it is marketing.** Naming SF Pro invites licence breaches. A counter-reference: likely a main reason agents equate "Apple" with big heroes and bento. |
| 7.8 | **ui-ux-pro-max** (nextlevelbuilder) | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | yes | ~152k★, MIT | 80 searchable styles; its "Apple Native Experience" entry is sensible. | One sensible Apple entry. | Glassmorphism, Claymorphism, Neumorphism as equal options; labels bento "Apple-style" (24px radius, 1.02 hover scale). |
| 7.9 | **dickwu, `apple-design-skill`** | https://github.com/dickwu/apple-design-skill | yes | 3,594★, no licence | A reviewer built on 123 HIG pages in Apple's wording, relabelled Phone / Tablet / Desktop. | Coverage. | **Copies Apple's copyrighted text** (D-003 forbids this); review only; no web tokens. |
| 7.10 | **ehmo, `platform-design-skills`** | https://github.com/ehmo/platform-design-skills | yes | 646★, MIT | 300+ rules across the HIG, Material 3 and WCAG. | Breadth. | **Ships a compiled HIG PDF in the repo** (copyright problem). |
| 7.11 | **~10 small HIG-as-skill repos** (ykswang, yue1123, valentinllpz, fareslaggoun7, davidcafor, roshanjm, allexp1, sanuponnulli, d-date, tzzs) | github.com/<owner>/… | yes | 0–8★ each | **INFERRED:** HIG converted to Markdown for native apps. | — | A commodity, now redundant because Apple serves the HIG as `.md` (§1.0). |

### 7.2 General quality and anti-slop rulebooks (non-Apple, but relevant)

| # | Title | URL | Loads | Stats | What it offers | Gets right | Misses |
|---|---|---|---|---|---|---|---|
| 7.12 | **Impeccable** (Paul Bakaus) | https://github.com/pbakaus/impeccable · https://impeccable.style | yes | ~113k★, Apache-2.0, pushed 2026-11-19 | **VERIFIED:** 23 commands (critique, audit, polish, quieter…), a checker after each edit, `PRODUCT.md` + `DESIGN.md`, four modes (Persuade, Operate, Read, Experience), a quality-floor file of hard bans; a native-iOS file warning against apps "ported from a website" and hand-rolled glass. | **App (Operate) vs landing (Persuade) split**; screenshot checks; "browser surfaces" check; concrete limits (card radius 12–16px, tracking no tighter than −0.04em). | Pushes expressive boldness; bans the system font as display face; calls grey + one accent "the category default". Heavy (ships a binary). No "Apple app on the web" concept. |
| 7.13 | **Vercel Web Interface Guidelines** | https://github.com/vercel-labs/web-interface-guidelines · https://vercel.com/design/guidelines | yes | 1,220★, MIT, pushed 2026-10-05; ships `AGENTS.md` | **VERIFIED:** ~150 polish rules: hit targets ≥ 24px (44px mobile), "Rename…" ellipses, never `transition: all`, matching inner/outer radii, `tabular-nums`, every state designed; Title Case for headings and buttons. | **The best web polish floor.** Reference it instead of rewriting it. | Not Apple-specific; no taste target. |
| 7.14 | **Rauno Freiberg, Web Interface Guidelines** | https://interfaces.rauno.me (repo https://github.com/raunofreiberg/interfaces) | yes | 1,963★, **no licence**, last push 2023-09-07 | **VERIFIED:** toggles take effect immediately; interactions within 200 ms; pressed buttons scale ~0.96; no animation on frequent actions; hover effects only where hover exists. | Precise and close to Apple's thinking. | No licence: cite, don't copy. |
| 7.15 | **Uncodixfy** (cyxzdev) | https://github.com/cyxzdev/Uncodixfy | yes | 2,683★, MIT, pushed 2026-03-18 | **VERIFIED:** "Keep It Normal" values for ~30 components: sidebar 240–260px, buttons ≤ 8–10px radius, cards 8–12px, shadows ≤ `0 2px 8px rgba(0,0,0,.1)`, transitions 100–200 ms, spacing 4/8/12/16/24/32; bans labels above headings, metric-card rows, dashboard heroes. | Closest to our quiet app-UI target, with real numbers. | Self-contradictory (bans system stacks, then says use system fonts); its own presets include purple/pink and `#0a0e27` navy; bans without reasons. |
| 7.16 | **Anthropic `frontend-design`** | see 6.2 | yes | — | — | Current, precise tells; plan-then-review. | Leans to expressive brand pages; no app mode, no measurements, no platform conventions. |
| 7.17 | **avoid-ai-design** | see 6.8 | yes | — | — | Best detection structure. | Bans only, no positive target; penalises `system-ui`. |
| 7.18 | **Google Labs DESIGN.md spec** | https://github.com/google-labs-code/design.md · spec: https://stitch.withgoogle.com/docs/design-md/specification | yes | ~29k★, Apache-2.0, pushed 2026-11-18, alpha | **VERIFIED:** tokens in YAML plus written rationale; `npx @google/design.md lint` checks broken references and WCAG contrast; exports to Tailwind. | A standard format with a linter. | Format only; no taste. **If AISloop's planned `DESIGN.md` follows this spec, we get the lint for free.** |
| 7.19 | **taste-skill** (Leonxlnx) | https://github.com/Leonxlnx/taste-skill | yes | ~119k★, MIT | Builds company websites from a random palette, font pair and hero, then checks in headless Chrome at four widths. | Good verification loop. | Irrelevant to app screens. |
| 7.20 | **samber, `frontend-design-deslop`** | https://github.com/samber/cc-skills/tree/main/skills/frontend-design-deslop | yes | 243★, MIT | "target the convergence mechanism, not a frozen blocklist"; **ships evaluations** (rare). | Evals. | No Apple target. |
| 7.21 | **OpenAI frontend guides as rulebooks** | see 6.4, 6.5 | yes | — | — | Clearest vendor statement that app screens are quiet and work-first. | Zero letter-spacing; Lucide by default. |
| 7.22 | **Ferousco-dev, anti-slop-design** | https://github.com/Ferousco-dev/anti-slop-design | yes | 21★ | Landing-page focused; main skill file not at root, not read. | — | Minor. |

### 7.3 How AISloop can be better than these

- **Fill the empty niche.** No skill found targets the look of Apple's *apps* (Settings, Notes, Mail, Finder, Reminders) on the web. The "Apple" skills target apple.com (7.6, 7.7, 7.8), glass (7.4), motion only (7.1) or native SwiftUI (7.9–7.11). AISloop should give concrete web values: the iOS 17/22 or macOS 13/16 type ramp in px, hairline separators, grouped inset lists, sidebar / list / detail, inline-title toolbars, sheet rules, `inner radius = outer − padding`, hit areas by pointer type.
- **Defend the Apple choices up front**, with the polish that makes them look chosen: system font, one blue accent, middle-dot metadata, chevrons, near-black dark backgrounds, Title Case on macOS. Name the polish: `tabular-nums`, styled selection and focus, glass on chrome only, matching corners, one elevation method.
- **Never fake the OS.** No traffic lights, no dock, no menu bar in a browser tab (7.3, §4b). Translate the *app* layer only.
- **Stay legally clean**, unlike 7.9 and 7.10: no copied HIG text, no SF Pro in font stacks as a named face (use `system-ui`, `-apple-system`), no Design Resources (§1.5).
- **Borrow and cite, don't copy:** avoid-ai-design's catalogue format and a small detection script (like Krebs, 6.6); Vercel's polish floor (7.13); Emil Kowalski's spring values (7.1); Google's DESIGN.md format and linter (7.18); Impeccable's app-versus-landing split (7.12); the silhouette test (6.12).
- **Weight counter-examples by evidence:** lead with what people notice (untouched shadcn, indigo, Inter-only, icon-card rows, labels above headings, coloured card edges), not only glass and bento.
- **Avoid the endless ban list:** every ban creates the next default (6.1). Describe a positive target with values and Asil's votes, and show it in live example pages.
- **Add evaluations**, as only samber (7.20) does: a fixed set of prompts ("build a settings page", "build a notes app") rendered with and without AISloop and compared on a board.

---

## Top 15 most valuable finds

Ranked by how much each one changes or sharpens AISloop's rules.

| Rank | Find | Section | Why it ranks here |
|---|---|---|---|
| 1 | **WWDC26 "Create UI prototypes using agents in Xcode"** | 1.1a | Apple's design team describing the AI "first-pass generated interface" problem and the fix: specific prompts, stylistic cues, many divergent named options, remix, lived-in content with edge cases, tuning panels. It validates AISloop's board method and hands us an edge-case checklist. |
| 2 | **WWDC25 "Get to know the new design system"** (with "Meet Liquid Glass") | 1.1b | Rules that become CSS almost directly: `inner radius = outer − padding`, capsules for touch only, one tinted primary action per bar, no screen actions in global navigation, scroll-edge fades instead of dividers, no glass on glass, tables stay in the content layer. |
| 3 | **Apple Support user guides + App Store pages of Apple apps** | 5 (G1, G2) | Official, current, captioned screenshots of every built-in Apple app on Mac, iPhone and iPad, free, without login, fetchable by script. Fills the native-screenshot need without Mobbin. |
| 4 | **Apple Design Resources licence text** | 1.5 | Use is "SOLELY" for mock-ups of Apple-OS software and bars "website content". `sources.md` says "for measuring only", which the licence does not allow. Approach change: do not use the UI kits at all. |
| 5 | **Web-to-Mac behaviour rules (Evil Martians; Building Lotus)** | 2.6, 6.22 | The concrete "website, not app" tells nobody in the anti-slop world lists: pointer cursor everywhere, selectable labels, hover on every control, no right-click menus, no unfocused state, settings as a page. |
| 6 | **The anti-slop conflict and evidence** (vibecoded-design-tells; Build to Launch frequencies; Krebs; Anthropic/Impeccable/Uncodixfy bans) | 6.0, 6.7, 6.11, 6.6 | Popular anti-slop skills ban `system-ui`, one grey-plus-accent palette and middle-dot metadata, i.e. Apple's own choices. And real users notice untouched shadcn and indigo far more than glass or bento. AISloop must state genre exceptions and reweight its counter-examples. |
| 7 | **WWDC26 "Communicate your brand identity on iOS"** | 1.1a | Where a product's identity may go: content layer yes, chrome no; colour moves into content and means something; no logo in chrome; custom utilitarian components look "less native - or even dated". |
| 8 | **WWDC26 "Principles of great design" + the new HIG "Design principles" page (2026-06-08)** | 1.1a, 1.2 | Apple's current philosophy in eight principles, with anti-slop lines in Apple's voice: "Simplicity isn't minimalism", "Don't mistake delight for decoration", delight "isn't by adding confetti". |
| 9 | **iWork for iCloud "anyone with the link" shares** | 3.1 | Unlocks the ideal reference (Apple's real productivity web UI) that `sources.md` dropped as login-only. Needs Asil to create three dummy shares. |
| 10 | **Swift-DocC Render** (Apple, Apache-2.0) | 4a | The only open-source web UI written by Apple: real Apple CSS for sidebars, navigators, type and dark mode, legally readable. |
| 11 | **HIG served as Markdown** (`…/human-interface-guidelines.md` and per-page `.md`) | 1.0 | Agents and the HIG researcher can read the HIG directly and cheaply; makes the many "HIG-as-skill" repos redundant. |
| 12 | **Apple System Status + Plausible demo** | 3.2, 3.13 | Two live, public, calm answers to "dashboard": Apple's flat status list, and tabs-plus-bar-lists instead of a bento grid. The best counters to C6. |
| 13 | **Menu-icon debate: tonsky + HIG "Menus" update (2026-06-08)** | 2.1, 1.2 | Settles half of the open question "icons in lists and menus": sparingly, with purpose, all-or-none per group, none if no clear metaphor. |
| 14 | **WWDC20 "Adopt the new look of macOS"** | 1.1c | The Mac-app layout AISloop will most likely translate: full-height sidebar, inline-title unified toolbar, inset selection, sidebar icons in the accent colour (fixed colours only for meaning). |
| 15 | **Motion set: Emil Kowalski `apple-design` skill + "You Don't Need Animations" + Motion `spring` (`visualDuration`/`bounce`)** | 7.1, 2.12, 4a | Apple's WWDC18/WWDC23 motion model with numbers, usable on the web today: springs by duration and bounce, under 300 ms, no animation on frequent or keyboard actions. |

Near misses: CSS `corner-shape: squircle` (native continuous corners), NN/g "Liquid Glass Is Cracked" (limits on copying Apple's newest look), Gruber "Bad Dye Job" (behaviour over visual fashion), Google DESIGN.md spec + linter, React Modal Sheet "Apple Maps" demo.

---

## Gaps

**Not verified or not done**
- **No visual verification.** No screenshots were taken (brief). Every description of how something *looks* is INFERRED; check by eye when capturing the board.
- **Transcripts only partly read.** Read in full: WWDC26/250, 251, 227. Read as keyword excerpts: WWDC25/356, 359, 219; WWDC20/10104, 10175; WWDC18/803. All other session entries rest on Apple's page descriptions. The saved transcripts can be read in full in the foundations round.
- **Not opened:** the Apple Style Guide's A–Z UI-term pages; WWDC23 "Animate with springs" transcript; the Desktop UI Storybooks; Silk and the Mercury demo (blank in headless; check by hand); the 1987/1992 HIG PDFs beyond confirming they download.
- **GitHub API limit** (60 requests/hour without login) ran out, so several repos lack star counts. `gh` is not logged in on this machine.
- **Unconfirmed claims:** that macOS 27 "Golden Gate" removes default menu icons (single aggregator source); that Sebastiaan de With joined Apple's design team (Daring Fireball link title and secondary coverage only); Adam Wathan's indigo apology (tweet not seen).
- **"Design for touch on Mac"** (Tech Talk 111456) has no transcript yet. If Macs gain touch, Apple's own dense-versus-airy split may move; recheck before the density rules are written.

**Blocked, gone or closing**
- Medium (Nathan Gitter's "Building Fluid Interfaces"): Cloudflare 403. npm package pages: 403. UX Archive, Behance search: 403. SaaSFrame, Siteinspire: 429 bot checkpoint. landing.love: blocked in a headless browser.
- Removed from Apple's site: WWDC16 "Typography and Fonts", WWDC16 "Inclusive App Design", WWDC15 "Introducing the New System Fonts" (redirect to the year index); Apple's "new design gallery" (301 to `/design/`).
- Rasmus Andersson's Inter "dynamic metrics" page: 404.
- **Apple Support Community closes on 2026-11-20** (tomorrow): capture today or drop.
- Apple's leaked App Store web source: DMCA'd; deliberately not used.

**Things that should change the approach** (for `decisions.md`, owner to decide)
1. **Stop using Apple Design Resources, even for measuring** (§1.5). Take values from the HIG text (`.md`), WWDC transcripts, Apple's own live web apps, Swift-DocC Render's CSS and our private screenshots.
2. **Add a "genre exceptions" list** before borrowing any anti-slop ban list: `system-ui`, one accent on grey, middle-dot metadata, chevrons, Title Case on macOS, near-black dark mode (§6.0).
3. **Add web-behaviour rules**, not only visual ones: cursor, selection, hover restraint, context menus, focus/unfocused states, settings structure (§2.6, §6.22).
4. **Reweight the counter-examples** on the board toward what people notice: untouched shadcn, indigo, Inter-only pages, icon-card rows, coloured card edges, labels above headings (§6.7, §6.11).
5. **Never fake OS chrome**: the existing "Apple" skills (7.3) and kits (§4b) put traffic lights and docks in browser tabs. State this as a rule early.
6. **Plan evaluations**: fixed prompts rendered with and without AISloop, compared on a board, plus a small script that detects the checkable tells (§6.6, §7.20).
7. **Our edge is distilled rules plus Asil's votes, not a pile of images.** Screenshot libraries (Refero, Mobbin, Pablooo, ScreensDesign) already sell screens to agents through MCP servers with the same "look designed, not generated" pitch (§5).
8. **Ask Asil to create the three iCloud iWork share links** (§3.1) and to capture the Apple Support Community today if wanted (§3.8).
