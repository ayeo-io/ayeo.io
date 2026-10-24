---
name: ayeo.io
description: White page, zinc neutrals, navy ink and one signal green, with a navy instrument in the hero, for the ayeo and Compass website.
colors:
  navy-600: "#0E3A5F"
  navy-700: "#0A2C49"
  navy-500: "#1F547F"
  navy-400: "#3F719A"
  navy-300: "#6A95B6"
  navy-200: "#9BBAD0"
  navy-50: "#EAF1F7"
  signal-500: "#10B981"
  signal-400: "#2EB87A"
  signal-700: "#0B7A57"
  zinc-0: "#FFFFFF"
  zinc-50: "#FAFAFA"
  zinc-200: "#E4E4E7"
  zinc-400: "#A1A1AA"
  zinc-500: "#71717A"
  zinc-600: "#52525B"
  zinc-800: "#27272A"
  zinc-900: "#18181B"
  zinc-950: "#0B0B0E"
  amber-500: "#F59E0B"
  amber-700: "#B45309"
  status-planned: "#6A4FD8"
  status-building: "#1F547F"
  status-shipped: "#0B7A57"
  status-shelved: "#71717A"
  night-status-planned: "#A895FF"
  night-status-building: "#6A95B6"
  night-status-shipped: "#5DCC95"
  night-status-shelved: "#A1A1AA"
typography:
  display:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  readout:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  micro-caps:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.69rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  tick: "2px"
  sm: "4px"
  md: "6px"
  lg: "10px"
  mark: "8px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3vw, 2rem)"
  wrap: "72rem"
  hero: "clamp(2.5rem, 6vw, 5rem)"
  band: "clamp(2.5rem, 6vw, 4rem)"
  section: "clamp(3rem, 7vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.navy-600}"
    textColor: "{colors.zinc-0}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.1rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.zinc-900}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.1rem"
  chip:
    backgroundColor: "{colors.navy-500}"
    textColor: "{colors.navy-50}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.75rem"
  chip-selected:
    backgroundColor: "{colors.signal-500}"
    textColor: "{colors.zinc-950}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.75rem"
  instrument:
    backgroundColor: "{colors.navy-600}"
    textColor: "{colors.navy-50}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.1rem, 2.5vw, 1.75rem)"
  approach-card:
    backgroundColor: "{colors.navy-500}"
    textColor: "{colors.navy-50}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.1rem"
  code-row:
    backgroundColor: "{colors.navy-500}"
    textColor: "{colors.navy-50}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.7rem 0.7rem 1rem"
  status-badge:
    backgroundColor: "transparent"
    typography: "{typography.micro-caps}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.5rem"
---

# Design System: ayeo.io

## Overview

**Creative North Star: "The Navigator's Chart"**

The site is a calm chart table with one lit instrument on it. Pages are white with near-black ink on cool zinc neutrals, ruled with fine hairlines. The one loud object is the navy instrument panel in the hero, where Compass takes a reading of a change and shows it in signal green. Everything else stays quiet so the reading carries the page.

Density is moderate and generous with space. Sections alternate between plain white, a faint zinc tint and full navy bands. Type is IBM Plex Sans at three weights, with IBM Plex Mono for anything a person would type, a tool would print, or a label that sits above data. Components are flat and precise: small radii, hairline borders, clear selected states and meters that fill tick by tick.

The site has light and dark themes and follows the visitor's system setting. In dark mode the page becomes near-black zinc, but the instrument stays navy in both themes. The light theme is the reference design.

The site applies the **ayeo Design System**, published at https://claude.ai/artifact/2Stk5EdRsNJDUcU2sPH3Y2, which is the parent system for ayeo, Nexus and Compass. Its tokens are copied into `src/assets/css/site.css` under the site's role names (`--paper`, `--ink`, `--panel`, `--needle`), and this file records how the site uses them. The marks come from that system's Marks section and are inlined as SVG in `src/_includes/mark-ayeo.njk` and `mark-compass.njk`.

**Key Characteristics:**
- White page, zinc neutrals and deep navy ink, with one navy instrument as the focal object.
- Signal green marks a reading or a selection, and the O in the ayeo mark; almost nothing else.
- Flat and tonal everywhere, with a single lifted object.
- Plex Sans at 600 for headings, 500 for controls, 400 for text; Plex Mono for commands, paths, stage names and small uppercase labels.
- Small radii: 6px controls and cards, 10px for the instrument, pills only for chips and status badges.

## Colors

The ayeo palette: a navy scale, a signal-green scale and zinc neutrals. Weight the navy; spend the green.

### Primary
- **Navy 600** (`navy-600`): links, the primary button, the instrument panel, the full-width navy bands, the first pipeline stage and the ink of the ayeo and Compass marks on light grounds. It is the system's main voice. **Navy 700** is its hover.
- **Signal 500** (`signal-500`): the reading on the instrument. It fills meter ticks, marks the selected change, names the approach and highlights commands. On the page it appears only as the O in the ayeo mark. In dark mode it is `signal-400`, and it also becomes the focus ring. Text on a signal fill is `zinc-950`, never white (3.0:1).

### Secondary
- **Navy 300** (`navy-300`): secondary strokes on navy, such as the plan list's dash bullets and the "quick fix" fill in the explainers. In dark mode it is also the link colour, the primary button fill and the mark's ink on the page.
- **Amber 500** (`amber-500`): the one warm colour, kept for the human sign-off marks in the explainers. Never a button, link, large fill or text on white. A rare highlight word uses `amber-700` in light mode.

### Neutral
- **Zinc 0** (`zinc-0`): the page background.
- **Zinc 50** (`zinc-50`): alternate section bands, the post status box and inline code backgrounds.
- **Zinc 900** (`zinc-900`): headings and body text.
- **Zinc 600** (`zinc-600`): secondary text, such as ledes, captions, metadata and nav links at rest (7.2:1 on white).
- **Zinc 200** (`zinc-200`): hairline dividers, card borders and the quiet button outline.
- **Navy 500**, **Navy 400**, **Navy 50** and **Navy 200** (`navy-500`, `navy-400`, `navy-50`, `navy-200`): the instrument's internal layers. They are raised cards, borders, primary text and labels on navy. Navy 200 on Navy 600 is 5.6:1.

### Status
- **Planned**, **Building**, **Shipped** and **Shelved** (`status-*`): one colour per news status, for badges and the post status box. Building is `navy-500` and Shipped is `signal-700`, so they belong to the palette. Each has a lighter `night-` counterpart for dark mode.

### Dark theme
Under `prefers-color-scheme: dark`, or `data-theme="dark"`, the page becomes `zinc-950` with `zinc-900` tints, `zinc-50` text, `zinc-400` secondary text and `zinc-800` rules. Links and the primary button become `navy-300` with `zinc-950` text. The instrument keeps `navy-600`, which is lighter than the page, so it still stands out.

### Named Rules
**The One Needle Rule.** Signal green marks a reading or a selection. Do not use it for decoration, large fills or body text on white, where it is 3.0:1.

**The Navy Instrument Rule.** The instrument is navy in both themes. Do not invert it to a light panel in light mode or a green panel in dark mode.

**The Status Is Colour Plus Words Rule.** Every status badge carries its word ("Planned", "Shipped"), and Shelved is also struck through. Colour never carries the status alone.

**The Mark Rule.** The marks are the ayeo Design System's, inlined as SVG so they take `currentColor`: white on the navy masthead, `navy-600` on the page, `navy-300` in dark mode. The O in the ayeo mark is always `#10B981`. Never redraw them, never use the old "a" with a copper dot.

## Typography

**Display Font:** IBM Plex Sans (with -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)
**Body Font:** IBM Plex Sans (same stack)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SF Mono, Menlo, monospace)

**Character:** One engineering-grade sans at three weights. Headings are 600 with slight negative tracking, never heavier. IBM Plex Mono appears wherever text is something you would type, a tool would print, or a small uppercase label above data.

All fonts are self-hosted in `src/assets/fonts/`. The Content Security Policy allows fonts only from the site itself. The files are Plex Sans 400, 500 and 600 (`plex-sans-400/500/600.woff2`, the latin subsets from `@fontsource/ibm-plex-sans`) and Plex Mono 400 and 500.

### Hierarchy
- **Display** (`display`): the page's single H1, limited to about 13em wide in the hero.
- **Headline** (`headline`): section H2s and post titles.
- **Readout** (`readout`): the approach name inside the instrument, in signal green. It is the only display-size text inside the panel.
- **Title** (`title`): H3s, news item titles and layer names.
- **Lede** (`lede`): the intro paragraph under a headline, in Zinc 600, up to 34em wide.
- **Body** (`body`): running text. Prose blocks are limited to 38em, and news subtitles to 44em.
- **Small** (`small`): captions, metadata, chips and the instrument's plan text.
- **Micro caps** (`micro-caps`): definition-list terms inside the instrument and status badges: Plex Mono, 11px, uppercase, tracked +0.08em. The only all-caps text.
- **Mono** (`mono`): commands, the assessment prompt, the record tree and the six pipeline stage names (weight 500).

### Named Rules
**The Typed Text Is Mono Rule.** Anything a visitor would type, copy or see printed by Compass uses IBM Plex Mono. Prose about it does not.

**The Three Weights Rule.** 400 for text, 500 for controls and nav, 600 for headings and emphasis. Nothing heavier.

## Layout

Content sits in a centred column up to `wrap` wide, with a fluid `gutter` on each side. Sections stack vertically with fluid padding (`section`, `band`, `hero`). Long text is limited in width (38em for prose, 34em for ledes).

- **Hero:** one column on small screens. From 62rem it becomes two columns, with copy on the left and the instrument on the right, the instrument slightly wider.
- **Two-column sections:** from 56rem, a narrower text column on the left and a wider example (code, tree) on the right.
- **Three-up and two-up grids:** the pipeline goes from three columns to six from 48rem. The guardrails and strategies sit side by side from 48rem, as do the three layers.
- **Instrument internals:** meters and the plan list go from two columns to their full grid from 36rem.

The masthead is sticky, 4rem tall and navy in both themes, with a navy-500 bottom rule. Anchor targets scroll with 5rem of top padding so the masthead never covers a heading.

Section rhythm alternates white, Zinc 50 and full navy bands.

## Elevation & Depth

The system is flat and tonal. Depth comes from layers of tone: white, zinc tint, navy band, then raised navy cards inside the instrument. Exactly one object casts a shadow: the hero instrument, with a long, soft navy drop below it.

### Shadow Vocabulary
- **Instrument lift** (`box-shadow: 0 24px 60px -24px rgba(14, 58, 95, 0.45)`): the hero instrument only.

### Named Rules
**The One Lifted Object Rule.** Only the instrument casts a shadow. Cards, buttons, code rows and news items stay flat at rest and on hover. They show state with border, tone or underline changes instead.

## Shapes

Restrained, from the ayeo radius scale. Nothing bounces and nothing is a capsule unless it is small.

- **Controls and cards** (`md`, 6px): buttons, approach cards, code rows, the record tree, code blocks, the status box and the outer ends of the pipeline strip.
- **The instrument** (`lg`, 10px): the largest and most rounded object.
- **Small details** (`sm`, `tick`): copy and replay buttons, inline code, focus rings, meter ticks.
- **Pills** (`pill`): chips, status badges and the theme switcher only; all under 32px tall.

Lines carry meaning as well as dividing space. A solid 3px ink top rule marks the guardrails, which are hard and blocking. A dotted top rule marks the strategies, which are flexible defaults. A dashed rule inside the instrument separates what Compass leaves out.

## Components

### Buttons
Flat and precise: solid fills with a 1px border, 6px corners, weight 500.
- **Primary:** Navy 600 fill and white text. In dark mode it becomes a Navy 300 fill with Zinc 950 text.
- **Hover:** the fill darkens about 6% towards the ink. There is no lift and no shadow.
- **Quiet:** transparent with a Zinc 200 outline and ink text. On hover the outline darkens to Zinc 600 and the fill becomes Zinc 50.
- **Focus:** a 3px outline, offset by 3px. It is Navy 600 on white and Signal green on navy surfaces and in dark mode, so it always has at least 3:1 contrast.
- **In a navy band:** the primary button is white with navy text, and the quiet button has a Navy 400 outline and white text.

### Chips (change picker)
- **Style:** pills on Navy 500 with a Navy 400 border and Navy 50 text, in `small` type at weight 500.
- **Hover:** the border turns signal green.
- **Selected:** a solid signal fill with Zinc 950 text, weight 600. They work as an accessible tab list (`role="tab"`, `aria-selected`).

### Status badges
- **Style:** outlined pills in `micro-caps` type with a 1px border in the status colour.
- **States:** Planned and Building are outline only. Shipped adds a 12% tint of its colour. Shelved is struck through. Draft uses Zinc 600 with a dashed border.

### Code rows (install commands)
- **Style:** Navy 500 rows with a Navy 400 border and `md` corners, with the command in `mono`.
- **Copy button:** a small transparent button with a Navy 400 border and signal text. On hover its border turns signal. It appears only when JavaScript is running.

### Navigation
- **Masthead:** the ayeo mark (the hex with an I and a signal O, inlined SVG, white) at 28px and the lower-case wordmark "ayeo" at weight 600 on the left, nav links on the right, the theme switcher at the end.
- **Links:** Navy 200 at rest on the masthead. On hover they become white with a 2px signal underline offset by 0.4em.
- **Inline links:** Navy 600 with a 1px underline. On hover they become Navy 700 with a 2px underline.

### News list
- **Style:** full-width rows divided by Zinc 200 hairlines, each with a status badge, date, title (`title`) and subtitle in Zinc 600.
- **Hover:** the title gets a 2px underline. The row does not lift or change colour.

### The Instrument (signature component)
The navy panel in the hero, showing how Compass would handle a chosen change. From top to bottom it contains:
- a muted question;
- the chip picker;
- a signal-green mono prompt (`> /compass:assess "..."`);
- three meters and a goal, with `micro-caps` terms;
- the approach card with the approach name in `readout` type;
- a plan grid of what Compass writes, checks and asks, how many agents run and what it leaves out, with Navy 300 dash bullets;
- a muted note saying the example is illustrative.

Without JavaScript, the question and the picker are hidden, and every example shows under its own heading. With JavaScript, the examples share one grid cell, so the instrument keeps the height of the tallest one and the page below does not move.

Each meter is three small rounded ticks. Ticks fill with signal green up to the level, with a 0.18s colour transition on the system's `cubic-bezier(0.2, 0, 0, 1)` ease, staggered by 0.06s per tick.

## Do's and Don'ts

### Do:
- **Do** keep signal green for readings and selections on navy, and for the O in the mark, as the One Needle Rule says.
- **Do** keep the instrument navy in both themes, and keep it the only object with a shadow.
- **Do** use IBM Plex Mono for commands, paths, prompts, stage names and small uppercase labels.
- **Do** pair every status colour with its word, and strike through Shelved.
- **Do** show hover and focus with border, tone and underline changes, and always keep the 3px focus ring: navy on white, signal on navy.
- **Do** check new colour pairs against WCAG 2.2 AA: 4.5:1 for text and 3:1 for focus rings and other non-text marks. Zinc 600 on white is 7.2:1; Navy 300 on white is only 3.6:1, so it is never body text in light mode.
- **Do** keep every transition inside the `prefers-reduced-motion` reset, and under 250ms.

### Don't:
- **Don't** add gradients, glowing orbs, sparkle icons, emoji or other generic AI-startup styling.
- **Don't** make the site dark-only. White is the reference theme, and dark mode is a careful counterpart.
- **Don't** add shadows to cards, buttons or news rows.
- **Don't** use a weight above 600 anywhere, or tracking tighter than -0.02em.
- **Don't** use Zinc 200 alone to carry meaning. It is a hairline for structure only.
- **Don't** redraw, recolour or theme the marks, and never theme the O.
- **Don't** load fonts, scripts or images from other sites. The Content Security Policy blocks them.
