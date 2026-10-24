# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: developers and tech leads who already use Claude Code.** They come to decide whether to install Compass, then to install it. They want to see what Compass does to a real change before they trust it with their workflow.
- **Primary: engineering leaders, such as heads of engineering and CTOs.** They are deciding how their teams should build software with AI agents. They care about governance, traceability and human approval more than install steps.
- **Secondary: existing Compass users.** They return to read news posts and check whether a planned feature is building, shipped or shelved.

## Product Purpose

ayeo.io is the website for Compass, an open-source plugin for Claude Code. ayeo is the name behind Compass. There are no other ayeo products planned, so the site is about Compass.

The site must:

- explain what Compass does and why it differs from one-workflow-for-everything setups;
- get a convinced visitor to install it, or to read the code on GitHub;
- publish PRFAQs (press release and external FAQ) for planned work, each with a status.

Success means a visitor understands that Compass sets the process from an assessment of each change, and installs it.

## Positioning

Compass assesses each change by risk, familiarity, size and goal, then sets the process to match: what to write, what to check and when to ask a human. The judgement sits in one place, the assessment. Everything after it is deterministic, so the same assessment under the same policy always gives the same approach. People can argue with the policy rather than the agent.

ayeo also works in public: it writes the press release before building a feature and publishes it with a status. Shelved posts stay up with a reason.

## Operating Context

- Compass runs inside Claude Code. Install is two `/plugin` commands, then `/compass:assess "<change>"`. It needs Python 3.10 or later.
- The source, docs and issues live at `github.com/ayeo-io/compass` (set in `src/_data/site.js`).
- Compass sits alongside CI. It does not replace tests, linting or security scanning.
- Each Compass issue leaves a record that another session or person can resume from: its documents under `docs/compass/<created>-<issue>/` and its evidence under `.compass/work/<issue>/`.
- News posts are written from `templates/prfaq.md` and carry a status: `planned`, `building`, `shipped` or `shelved`. An Atom feed is published at `/news/feed.xml`.

## Capabilities and Constraints

- Static site built with Eleventy 3 and hosted on Cloudflare Workers static assets at `ayeo.io` (`wrangler.jsonc`).
- No cookies, no tracking and no JavaScript framework.
- `src/_headers` sets a strict Content Security Policy: scripts, styles, fonts and images must come from the site itself. One inline script in `src/_includes/base.njk` is allowed by hash, so changing it means updating the hash. Third-party fonts, scripts and embeds are not allowed without changing the policy.
- Drafts (`draft: true`) show only when running locally and never deploy.
- The home page assessment examples in `src/_data/assessments.js` are illustrative and must stay labelled as such. In a real project, the routing policy makes the call.
- Licence: Apache 2.0.

## Brand Commitments

- The name is written in lower case: "ayeo". The product is "Compass", introduced as "Compass, from ayeo".
- The existing copy is plain, direct British English. It names what happens, admits limits ("Illustrative", "doesn't replace your tests") and avoids hype.
- The visual identity is the ayeo masterbrand design system: cool paper, deep navy ink, a cyan signal on the navy instrument and one copper accent, set in IBM Plex Sans and IBM Plex Mono. Compass is endorsed as "Compass, from ayeo" and shares the copper accent. `DESIGN.md` records how this site applies the system.
- Existing assets: the ayeo mark (`src/assets/mark-*.png`), the Compass mark (`src/assets/compass-mark.png`), the favicon and the social image (`src/assets/og.png`).

## Evidence on Hand

- The public Compass repository (`ayeo-io/compass`): its code, docs and real assessment output can be quoted and shown.
- There are no users, testimonials, customer logos, adoption numbers or benchmarks. Future work must not invent any.

## Product Principles

1. **Show, don't claim.** Every public claim must trace to something Compass does that a visitor can check in the repo or try themselves.
2. **Proportion over ceremony.** The site should model the product: say what is needed for the visitor's decision and no more.
3. **Honest status.** Plans, limits and shelved work are stated plainly and stay visible.
4. **Two readers, one page.** Hands-on developers need the install path and a concrete example. Engineering leaders need the governance story: guardrails, traceability and human approval. Neither should have to dig for their part.
5. **Respect the visitor.** No cookies, no tracking and no third-party requests.

## Accessibility & Inclusion

The site must meet WCAG 2.2 AA.
