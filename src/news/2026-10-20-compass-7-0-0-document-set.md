---
title: "Compass 7.0.0: see what your agent decided before anything ships"
subtitle: "Compass is our open-source plugin for Claude Code. In 7.0.0, every document in a change carries a status, decisions your agent makes for you wait for your say-so, and you approve without leaving the session."
summary: "Compass 7.0.0 for Claude Code tracks the status of every document in a change, shows you the decisions your agent made, and lets you approve from the session."
scripts: ["/assets/js/compass-7-anim.js"]
release:
  name: Compass 7.0.0
  url: https://github.com/ayeo-io/compass/releases/tag/v7.0.0
status: shipped
shipped: 2026-10-20
faq:
  - q: "Who is this for?"
    a: "Anyone running Compass on a project with more than a handful of changes. Tech leads can see what was reviewed and by whom. Developers get shorter documents that all look the same, and less to type."
  - q: "Do I have to migrate?"
    a: "Only if you already have Compass issues. `compass issue migrate` moves and renames their documents. Copy `.compass/work` and `docs/compass` somewhere outside the project before you run it; the [upgrade guide](https://github.com/ayeo-io/compass/blob/main/docs/upgrade-7-0-0.md) has the steps. A new project has nothing to migrate."
  - q: "Can I go back?"
    a: "Only by restoring both folders from that copy, together. There's no supported rollback of the issue migration, and restoring the copy loses anything recorded since you made it. `compass policy migrate --undo` reverses the configuration migration only. Don't run a 6.x CLI on a migrated tree."
  - q: "Does Compass now block more of my work?"
    a: |
      Yes, in four places:

      - `/compass:ship` refuses a document that's still a draft or waiting for approval.
      - `compass approach evaluate` refuses an `autonomous` project that's below the readiness floor.
      - `compass check` refuses a technical design more than 1.5 times its word limit once the plan stage is done.
      - The pre-tool hook refuses more shell writes to production code that have no failing test on record.

      One check got narrower. The human sign-off rule (guardrail 5) now applies to work labelled `auth`, `payments`, `personal-data` or `migrations`, rather than to every critical-risk change. If you want the old behaviour back, set it in `compass.yml`.
  - q: "Does my role still affect the assessment?"
    a: "No. Compass now reads the documents on disk instead. A `positioning.md` adds the claims gate, and an `intent.md` makes the plan stage check the spec against it. `--justify role=` and `--role` are still accepted, and ignored, until 8.0.0."
  - q: "What else changed?"
    a: "Three smaller things. The 8 command spellings renamed in 6.0.0 are gone, along with `issue labels sync`; the old spellings now exit with an error. Compass writes its own messages and documents in US English, and still reads the old spellings until 8.0.0. And a new `language` setting in `compass.yml` tells the agent which language to write prose in. The [release notes](https://github.com/ayeo-io/compass/releases/tag/v7.0.0) list everything, including one known issue when migrating a one-unit distribution map."
---

Before 7.0.0, a finished change could still list its spec and design as drafts, and nothing told you whether anyone had actually read them. If your agent settled a requirement on your behalf, you found out in the verification report, after the code was written.

7.0.0 closes both gaps. Compass now keeps track of each document's status itself, refuses to ship anything that hasn't been accepted, and stops to show you what your agent decided before it builds anything.

<figure class="ca" id="compass-7-anim">
  <div class="ca-stage">
    <svg viewBox="0 0 640 380" role="img" aria-labelledby="ca-t ca-d">
      <title id="ca-t">How Compass 7.0.0 checks the documents of a change</title>
      <desc id="ca-d">intent.md, acceptance-criteria.md, requirements-review.md and technical-design.md move through the eight Compass stages, from assess to ship. Each gets a status as its stage ends, and acceptance-criteria.md waits for a human check. An agent decision waits at a checkpoint for confirmation. /compass:ship refuses a document awaiting approval until a person types /compass:approve, then the change ships with one release line.</desc>
    </svg>
  </div>
  <figcaption>
    <p class="ca-caption" aria-hidden="true"></p>
    <div class="ca-controls">
      <button type="button" class="ca-play" aria-label="Play"></button>
      <input type="range" min="0" max="1000" value="0" aria-label="Animation position">
      <button type="button" class="ca-replay" aria-label="Replay">
        <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </div>
    <ol class="ca-sr"></ol>
  </figcaption>
</figure>

## What was wrong

In 6.x, five things got in the way on shared projects:

- **Agents made calls you didn't see.** An agent could answer a requirement question for you, and you'd only read about it once the code existed.
- **Statuses never moved.** Nothing updated a document's status, so "draft" could mean unread or could mean done.
- **A hand-ticked box counted as proof.** Anyone could tick a box on the page, and Compass took it as evidence.
- **Big designs were too big to review.** On the largest changes, the technical design grew past the point where anyone would read it closely.
- **Some things had nowhere to go.** There was no place for non-functional requirements, data and interface contracts, or a test plan.

## What's new

### You see what your agent decided, before it writes code

When your agent makes a decision for you, Compass records it. On `balanced` and `controlled` autonomy, the agent stops at a checkpoint at the end of `/compass:define` and `/compass:plan` until you confirm each decision or reopen it. Later, `compass retro --decisions` shows how many you confirmed, changed or never got to.

### You approve from the session you're already in

Type `/compass:approve` or `/compass:reject` in Claude Code. No terminal, no context switch.

If you'd rather not be the bottleneck, `/compass:delegate` lets one named agent approve for you, for up to 24 hours and only within the scope you set. You can see everything it approved afterwards. A delegation never covers the human sign-off on `auth`, `payments`, `personal-data` or `migrations` work unless you type back a code Compass shows you.

### Every document has a status, and Compass checks it

Each stage now sets the status of the documents it produces. A document that needs no human check is `approved` when its stage ends. One that does stays `awaiting-approval` until a person signs it off.

`/compass:ship` won't ship a change while any of its documents is still a draft or waiting for approval, and it tells you which command clears it. Quick fixes skip the extra stop.

Ticks, counts and statuses on the issue page now come from Compass's own records, not from what someone typed. `compass check` fails a document that disagrees with them, and `compass issue render` rebuilds the page.

### Documents that are easier to review

- **New sections where teams needed them.** The spec gets Non-functional requirements. The design gets Data and interfaces, Verification plan, and Risks and dependencies.
- **Every document starts the same way.** One header block, and headings without numbers, so leaving out an optional section doesn't leave a gap.
- **A short intent for regular changes.** Four headings: Problem, Desired outcome, Success signals and Non-goals. Regular changes also get a short requirements review, and hotfixes get a bug report.
- **Word limits on technical designs.** Each depth has a limit. On the full approach, the detail moves into one low-level design per work unit.
- **A release line on every shipped change.** One sentence, written for your users. `compass release notes --since <ref>` collects them, so your release notes start from what you already wrote.

### Also in 7.0.0

**Readiness limits autonomy.** `compass readiness` checks your repository against 11 signals. Before Compass accepts an `autonomous` assessment, four of them must pass: agent instructions, a build that succeeds, tests that finish in under 2 minutes, and clean lint. `compass readiness --fix-list` tells you what to change for each one that fails. `balanced` and `controlled` projects are never refused.

**Issues can wait on other issues.** Add a dependency with `compass issue depends add`. While it's open, the issue can't start implementation, and the board shows what it's waiting for. Spec and design aren't blocked, so you can get ahead on those.

**The issue page on GitHub, if you want it.** Set `github_labels: {page: true}` and Compass posts the issue page to the linked GitHub issue. It's off by default, because it shows your documents to everyone who can read that issue.

## Getting started

### New to Compass

Install it from inside Claude Code:

```text
/plugin marketplace add ayeo-io/compass
/plugin install compass@compass
```

Then type `/compass:go` followed by the change you want to make. The [five-minute walkthrough](https://github.com/ayeo-io/compass/blob/main/docs/five-minutes.md) takes you through your first issue.

### Upgrading from 6.x

> **Copy your Compass folders before you upgrade.** There is no supported rollback of the issue migration. Copy `.compass/work` and `docs/compass` to a folder outside the project first.

Update every checkout and every installed plugin at the same time, and don't run a 6.x CLI on a 7.0.0 tree. If you have existing issues, follow the [7.0.0 upgrade guide](https://github.com/ayeo-io/compass/blob/main/docs/upgrade-7-0-0.md). It lists every change, what breaks and what to do about it. The [release notes](https://github.com/ayeo-io/compass/releases/tag/v7.0.0) cover everything since 6.1.0.
