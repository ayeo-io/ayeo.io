---
title: "Compass for GitHub Copilot"
subtitle: "We're bringing Compass to GitHub Copilot, so your team can run changes through it in the Copilot app and the Copilot CLI."
summary: "Planned: Compass as a GitHub Copilot plugin. Assess a change in Copilot, get the right amount of process, and ship with the same checks as on Claude Code."
status: planned
faq:
  - q: "Who is this for?"
    a: "Teams whose coding agent is Copilot, and companies where Copilot, Claude Code and Codex are all in use on the same code."
  - q: "Will it be the same Compass?"
    a: "That's the aim. The CLI, the policy and the records will be the same. The hooks are where runtimes differ, and we'll publish a support table that is honest about what Copilot can and can't enforce."
  - q: "When?"
    a: "No date yet. We haven't demonstrated compatibility, and we won't commit to a date until the feasibility check is done. Our plan is Compass 8.0.0, after Codex."
  - q: "Can I help?"
    a: "Yes, please. If you run Copilot and want Compass in it, tell us in the [discussions](https://github.com/ayeo-io/compass/discussions) which Copilot surface you use and what you'd want the hooks to refuse."
---

If your team's coding agent is GitHub Copilot, Compass hasn't been an option. We're changing that. Compass will install as a plugin for Copilot, in the app and in the CLI, and a change you make there will get the same treatment it gets in Claude Code: assessed first, given the process it needs, and checked before it ships.

## The problem

Governance tools tend to arrive with a preferred tool built in. Compass has had one too: it only ran in Claude Code. That left Copilot teams out, and it meant a company that uses more than one agent couldn't have one way of shipping across all of them. We don't think your choice of agent should decide how carefully you ship.

## What's new

Compass will install as a supported Copilot plugin, for local sessions in the Copilot app and the Copilot CLI. It's the same Compass: the same Python CLI, the same record on disk, the same policy. So:

- assess a change in Copilot and you get the approach the policy gives it, whichever agent you'd have used;
- every change leaves the same documents behind, each with a status;
- `compass check` and `compass ci` judge the pull request the same way.

We're building it the way we built the Codex adapter: one shared source for the commands, agents and skills, with a thin adapter for Copilot. Copilot lets a plugin step in at its own points, so we'll publish a support table that says, control by control, what Copilot enforces, what it advises on, and what it can't do.

## Getting started

Not yet. Codex comes first. After that, the first job on Copilot is a feasibility check: what can a plugin install, run and refuse? Then an install you can diagnose, then the stages, then the hooks and the evidence. We'll update this post as each step lands.
