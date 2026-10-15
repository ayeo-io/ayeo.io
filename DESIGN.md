---
name: ayeo.io
description: Cool paper, deep navy ink and one lit instrument, for the Compass website.
colors:
  deep-chart-navy: "#0a1424"
  needle-cyan: "#2cecdd"
  sky-signal: "#1bb7f2"
  chart-paper: "#f2f5f7"
  chart-paper-tint: "#e5ecf0"
  slate-ink: "#3c4b5c"
  survey-rule: "#c9d5dd"
  harbour-teal: "#006f7d"
  panel-navy-raised: "#14243d"
  panel-rule: "#23395a"
  panel-text: "#dde7ef"
  panel-muted: "#94a7ba"
  needle-ink: "#06101d"
  status-planned: "#6a4fd8"
  status-building: "#006f7d"
  status-shipped: "#1f7a3d"
  status-shelved: "#66717d"
  night-paper: "#0a1424"
  night-paper-tint: "#0e1b2f"
  night-ink: "#e6eef3"
  night-ink-2: "#a5b5c4"
  night-rule: "#22354f"
  night-link: "#4fe3d7"
  night-panel: "#101e34"
  night-panel-raised: "#172a46"
  night-panel-rule: "#26406a"
  night-status-planned: "#a895ff"
  night-status-building: "#4fe3d7"
  night-status-shipped: "#6fd391"
  night-status-shelved: "#8d99a5"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem)"
    fontWeight: 820
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.9rem, 1.4rem + 1.6vw, 2.5rem)"
    fontWeight: 760
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  readout:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 820
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 680
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  tick: "2px"
  xs: "4px"
  sm: "6px"
  mark: "8px"
  md: "10px"
  panel: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3vw, 2rem)"
  wrap: "72rem"
  hero: "clamp(2.5rem, 6vw, 5rem)"
  band: "clamp(2.5rem, 6vw, 4rem)"
  section: "clamp(3rem, 7vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.deep-chart-navy}"
    textColor: "{colors.chart-paper}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.deep-chart-navy}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
  chip:
    backgroundColor: "{colors.panel-navy-raised}"
    textColor: "{colors.panel-text}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.85rem"
  chip-selected:
    backgroundColor: "{colors.needle-cyan}"
    textColor: "{colors.needle-ink}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.85rem"
  instrument:
    backgroundColor: "{colors.deep-chart-navy}"
    textColor: "{colors.panel-text}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.1rem, 2.5vw, 1.75rem)"
  approach-card:
    backgroundColor: "{colors.panel-navy-raised}"
    textColor: "{colors.panel-text}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.1rem"
  code-row:
    backgroundColor: "{colors.panel-navy-raised}"
    textColor: "{colors.panel-text}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.7rem 0.7rem 1rem"
  status-badge:
    backgroundColor: "transparent"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.55rem"
---

# Design System: ayeo.io

## Overview

**Creative North Star: "The Navigator's Chart"**

The site is a calm chart table with one lit instrument on it. Pages are cool paper with deep navy ink, ruled with fine survey lines. The one loud object is the navy instrument panel in the hero, where Compass takes a reading of a change and shows it in Needle Cyan. Everything else stays quiet so the reading carries the page.

Density is moderate and generous with space. Sections alternate between plain paper, a faint paper tint and full navy bands. Type is a confident grotesque with tight negative tracking for headings, and a monospace for anything a person would type or a tool would print. Components are tactile and confident: solid pills, clear selected states and meters that fill tick by tick.

The site has light and dark themes and follows the visitor's system setting. In dark mode the paper becomes navy, but the instrument stays a navy panel in both themes. The light paper theme is the reference design.

**Key Characteristics:**
- Cool paper and deep navy ink, with one navy instrument as the focal object.
- Needle Cyan marks a reading or a selection, and almost nothing else.
- Flat and tonal everywhere, with a single lifted object.
- Grotesque headings with tight negative tracking; monospace for commands, paths and stage names.
- Pill-shaped controls and softly rounded panels.

## Colors

A cool, nearly monochrome navy-on-paper palette, with one bright cyan used as the needle on the instrument.

### Primary
- **Deep Chart Navy** (`deep-chart-navy`): the ink for headings and body text, the primary button, the instrument panel and the full-width navy bands. It is the system's main voice.
- **Needle Cyan** (`needle-cyan`): the reading on the instrument. It fills meter ticks, marks the selected change, names the approach and highlights commands. It appears only on navy surfaces in light mode. In dark mode it also becomes the primary button fill, and links on paper use the close `night-link` cyan.

### Secondary
- **Sky Signal** (`sky-signal`): focus rings and the small dash bullets in the instrument's plan list. It also tints the primary button on hover.
- **Harbour Teal** (`harbour-teal`): inline links on paper in light mode, and the "building" status.

### Neutral
- **Chart Paper** (`chart-paper`): the page background.
- **Chart Paper Tint** (`chart-paper-tint`): alternate section bands, the post status box and inline code backgrounds.
- **Slate Ink** (`slate-ink`): secondary text, such as ledes, captions, metadata and nav links at rest.
- **Survey Rule** (`survey-rule`): hairline dividers, card borders and the quiet button outline.
- **Panel Navy Raised**, **Panel Rule**, **Panel Text** and **Panel Muted** (`panel-navy-raised`, `panel-rule`, `panel-text`, `panel-muted`): the instrument's internal layers. They are raised cards, borders, primary text and labels on navy.
- **Needle Ink** (`needle-ink`): text on a Needle Cyan fill.

### Status
- **Planned** (`status-planned`), **Building** (`status-building`), **Shipped** (`status-shipped`) and **Shelved** (`status-shelved`): one colour per news status, for badges and the post status box. Each has a lighter `night-` counterpart for dark mode.

### Dark theme
The `night-*` tokens replace the light tokens of the same role under `prefers-color-scheme: dark`. The instrument panel uses `night-panel` and `night-panel-raised`, which stay navy.

### Named Rules
**The One Needle Rule.** Needle Cyan marks a reading or a selection. Do not use it for decoration, large fills or body text on paper.

**The Navy Instrument Rule.** The instrument is navy in both themes. Do not invert it to a light panel in light mode or a cyan panel in dark mode.

**The Status Is Colour Plus Words Rule.** Every status badge carries its word ("Planned", "Shipped"), and Shelved is also struck through. Colour never carries the status alone.

## Typography

**Display Font:** Schibsted Grotesk (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Schibsted Grotesk (same stack)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SF Mono, Menlo, monospace)

**Character:** One variable grotesque does all the speaking, from heavy, tightly tracked headlines (weight 820) to plain body text. IBM Plex Mono appears wherever text is something you would type or a tool would print.

All fonts are self-hosted in `src/assets/fonts/`. The Content Security Policy allows fonts only from the site itself.

### Hierarchy
- **Display** (`display`): the page's single H1, limited to about 11em wide in the hero.
- **Headline** (`headline`): section H2s and post titles.
- **Readout** (`readout`): the approach name inside the instrument, in Needle Cyan. It is the only display-weight text inside the panel.
- **Title** (`title`): H3s, news item titles and layer names.
- **Lede** (`lede`): the intro paragraph under a headline, in Slate Ink, up to 34em wide.
- **Body** (`body`): running text. Prose blocks are limited to 38em, and news subtitles to 44em.
- **Small** (`small`): captions, metadata, chips and the instrument's plan text.
- **Label** (`label`): definition-list terms inside the instrument, status badges and notes.
- **Mono** (`mono`): commands, the assessment prompt, the record tree and the six pipeline stage names (weight 500).

### Named Rules
**The Typed Text Is Mono Rule.** Anything a visitor would type, copy or see printed by Compass uses IBM Plex Mono. Prose about it does not.

**The Tight Heading Rule.** Headings use negative tracking that grows with size (`-0.01em` for titles up to `-0.03em` for display) and balanced wrapping.

## Layout

Content sits in a centred column up to `wrap` wide, with a fluid `gutter` on each side. Sections stack vertically with fluid padding (`section`, `band`, `hero`). Long text is limited in width (38em for prose, 34em for ledes).

- **Hero:** one column on small screens. From 62rem it becomes two columns, with copy on the left and the instrument on the right, the instrument slightly wider.
- **Two-column sections:** from 56rem, a narrower text column on the left and a wider example (code, tree) on the right.
- **Three-up and two-up grids:** the pipeline goes from three columns to six from 48rem. The guardrails and strategies sit side by side from 48rem, as do the three layers.
- **Instrument internals:** meters and the plan list go from two columns to their full grid from 36rem.

The masthead is sticky, 4rem tall and translucent over the paper, with a fine bottom rule. Anchor targets scroll with 5rem of top padding so the masthead never covers a heading.

Section rhythm alternates plain paper, Chart Paper Tint and full navy bands.

## Elevation & Depth

The system is flat and tonal. Depth comes from layers of tone: paper, paper tint, navy band, then raised navy cards inside the instrument. Exactly one object casts a shadow: the hero instrument, with a long, soft navy drop below it. It is the one object resting on the chart table.

### Shadow Vocabulary
- **Instrument lift** (`box-shadow: 0 30px 60px -30px rgba(10, 20, 36, 0.55)`): the hero instrument only.

### Named Rules
**The One Lifted Object Rule.** Only the instrument casts a shadow. Cards, buttons, code rows and news items stay flat at rest and on hover. They show state with border, tone or underline changes instead.

## Shapes

The form language is soft and rounded, but never bubbly.

- **Pills** (`pill`): every button, chip and status badge.
- **Panel** (`panel`): the instrument, the largest and most rounded object.
- **Cards and code** (`md`): approach cards, code rows, the record tree, code blocks and the outer ends of the pipeline strip.
- **Small details** (`sm`, `xs`, `tick`): copy buttons and mobile pipeline cells, inline code and focus rings, and meter ticks.
- **Marks** (`mark`): the Compass mark in the masthead.

Lines carry meaning as well as dividing space. A solid 3px navy top rule marks the guardrails, which are hard and blocking. A dotted top rule marks the strategies, which are flexible defaults. A dashed rule inside the instrument separates what Compass leaves out.

## Components

### Buttons
Tactile and confident: solid pills with a clear outline in both variants.
- **Shape:** fully rounded pill (`pill`) with a 2px border.
- **Primary:** Deep Chart Navy fill and Chart Paper text, weight 650. In dark mode it becomes a Needle Cyan fill with Needle Ink text.
- **Hover:** the fill mixes 15% Sky Signal into the navy. There is no lift and no shadow.
- **Quiet:** transparent with a Survey Rule outline and navy text. On hover the outline darkens to navy.
- **Focus:** a 3px Sky Signal outline, offset by 3px.

### Chips (change picker)
- **Style:** pills on Panel Navy Raised with a Panel Rule border and Panel Text, in `small` type.
- **Hover:** the border turns Needle Cyan.
- **Selected:** a solid Needle Cyan fill with Needle Ink text, weight 650. They work as an accessible tab list (`role="tab"`, `aria-selected`).

### Status badges
- **Style:** outlined pills in `label` type, 650 weight, with a 1.5px border in the status colour.
- **States:**
  - Planned and Building are outline only.
  - Shipped adds a 12% tint of its colour.
  - Shelved is struck through.
  - Draft uses Slate Ink with a dashed border.

### Code rows (install commands)
- **Style:** Panel Navy Raised rows with a Panel Rule border and `md` corners, with the command in `mono`.
- **Copy button:** a small transparent button with a Panel Rule border and Needle Cyan text. On hover its border turns Needle Cyan. It appears only when JavaScript is running.

### Navigation
- **Masthead:** the brand mark and the lower-case wordmark "ayeo" at weight 800 on the left, and nav links on the right.
- **Links:** Slate Ink at rest. On hover, and on the current page, they become navy with a 2px underline offset by 0.4em.
- **Inline links:** Harbour Teal with a 1px underline. On hover they become navy with a 2px underline.

### News list
- **Style:** full-width rows divided by Survey Rule hairlines, each with a status badge, date, title (`title`) and subtitle in Slate Ink.
- **Hover:** the title gets a 2px underline. The row does not lift or change colour.

### The Instrument (signature component)
The navy panel in the hero, showing how Compass would handle a chosen change. From top to bottom it contains:
- a muted question;
- the chip picker;
- a Needle Cyan mono prompt (`> /compass:assess "..."`);
- three meters and a goal;
- the approach card with the approach name in `readout` type;
- a plan grid of what Compass writes, checks and asks, how many agents run and what it leaves out, with Sky Signal dash bullets;
- a muted note saying the example is illustrative.

Each meter is three small rounded ticks. Ticks fill with Needle Cyan up to the level, with a 0.25s colour transition staggered by 0.06s per tick. Without JavaScript, every readout shows in sequence. With JavaScript, only the selected one shows.

## Do's and Don'ts

### Do:
- **Do** keep Needle Cyan for readings and selections on navy, as the One Needle Rule says.
- **Do** keep the instrument navy in both themes, and keep it the only object with a shadow.
- **Do** use IBM Plex Mono for commands, paths, prompts and stage names.
- **Do** pair every status colour with its word, and strike through Shelved.
- **Do** show hover and focus with border, tone and underline changes, and always keep the 3px Sky Signal focus ring.
- **Do** check new colour pairs against WCAG 2.2 AA. The current text pairs all meet at least 4.5:1, for example Slate Ink on Chart Paper at 8.2:1.
- **Do** keep every transition inside the `prefers-reduced-motion` reset.

### Don't:
- **Don't** add purple-to-blue gradients, glowing orbs, sparkle icons or other generic AI-startup styling.
- **Don't** make the site dark-only or use neon-on-black hacker styling. Light paper is the reference theme, and dark mode is a careful counterpart.
- **Don't** add shadows to cards, buttons or news rows.
- **Don't** use Survey Rule alone to carry meaning. It is a 1.4:1 hairline against Chart Paper, for structure only.
- **Don't** load fonts, scripts or images from other sites. The Content Security Policy blocks them.
