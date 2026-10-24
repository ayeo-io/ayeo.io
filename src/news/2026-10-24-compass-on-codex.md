---
title: "Compass is coming to Codex"
subtitle: "If your team writes code in Codex, you'll be able to run every change through Compass, the way Claude Code teams do today."
summary: "Compass is coming to Codex. Assess a change, get the right amount of process, and ship with the same checks as on Claude Code. A source install is in 7.0.0."
status: building
statusUpdate: "You can install the Codex adapter today from a Compass 7.0.0 checkout. We haven't yet watched a full change go from assess to ship in a native Codex session, and nobody outside ayeo has shipped one. Until then, treat it as a preview."
faq:
  - q: "Who is this for?"
    a: "Teams that work in Codex. Also teams where some people use Codex and some use Claude Code on the same repository, and want one way of working."
  - q: "Is it really the same Compass?"
    a: "Yes, apart from the hooks. Same commands, same agents, same CLI, same records on disk. The [support table](https://github.com/ayeo-io/compass/blob/main/docs/codex.md#control-support-by-runtime) lists where the hooks differ."
  - q: "Can I use it today?"
    a: "You can. It installs from a source checkout of Compass 7.0.0 or later, on macOS or Linux. It isn't in a plugin marketplace yet, and Windows isn't supported."
  - q: "How far along is it?"
    a: "The install, the uninstall and the hook translation are tested. What we haven't done is watch a real change go from assess to ship in a native Codex session, resume a cold session, or test on Linux or a clean machine. Approval in Codex is terminal-only for now. Until we've measured those, treat the hooks as advice and run `compass check` yourself before you merge."
  - q: "When will you call it done?"
    a: "When someone who doesn't work at ayeo has shipped a change through Compass on Codex, and we can show it behaved as it would have in Claude Code."
  - q: "Does this change anything in Claude Code?"
    a: "No. Claude Code uses the same shared sources it always has."
---

Compass has only ever run in Claude Code. That's been fine if that's where you work. If your team is in Codex, or split between the two, it has meant Compass wasn't for you.

That's changing. Compass now installs into a Codex project, and once it's there you work the way a Claude Code team does. Describe the change in one line, and Compass reads it for risk, familiarity, size and goal, picks an approach, and tells you what it will write and what it will check before anything ships.

## The problem

Choose a coding agent and you've chosen your process. While Compass only ran in Claude Code, a team in Codex couldn't have it, and a company using both ended up with two ways of shipping on one codebase. We don't think your choice of agent should decide how carefully you ship.

## What's new

We didn't write a second Compass. The commands, the agents, the skills and the Python CLI are shared. Codex gets a small adapter on top: one entry skill, and a translation that turns Codex's hook events into the ones Compass already understands.

In practice:

- `$compass:compass assess "Add rate limiting to the public API"` starts the same assess stage that `/compass:assess` starts in Claude Code. The other stages, from `define` to `ship`, follow the same way.
- A change leaves the same documents behind, in the same place, with the same statuses. The records are the same files whichever runtime wrote them.
- `compass check` and `compass ci` run unchanged, so a pull request is judged the same way.

The hooks are where the two runtimes differ. Codex runs them only once you've trusted them, and we haven't yet measured how they behave through a full native session. Rather than claim parity, we publish a [support table](https://github.com/ayeo-io/compass/blob/main/docs/codex.md#control-support-by-runtime) that says, control by control, what Codex enforces, what it advises on, and what it doesn't have.

## Getting started

Pin a Compass checkout at 7.0.0 or later and point the installer at your project:

```
python3 adapters/codex/install.py --project /absolute/path/to/your/project
```

Restart Codex, trust the project, then review and trust the hooks it installed with `/hooks`. The [Codex guide](https://github.com/ayeo-io/compass/blob/main/docs/codex.md) explains what the installer adds, how to take it out again, and exactly what we have and haven't tested.
