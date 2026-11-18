# Scope for agents

Address: https://ayeo.io/scope/connector

Copy and structure for the connector page. The connector is a separate download from the Mac App Store app (see `Connector/APP-STORE.md`); this page is where the App Store app does not link yet.

## Hero

**Scope for agents**
Let your coding agent ask before it fills the disk

Agents write until zero bytes are free, then lose their own settings. Scope for agents is a small connector that gives Claude Code and Claude Desktop a sense of the disk: how much is free, what the budget is, what was left behind, and what could be cleared and how it comes back. Nothing moves until you say so, and nothing is ever erased.

[Download Scope for agents](https://ayeo.io/scope/connector/scope.mcpb)
Runs on node 18 or later · Free · No account, no network

## What an agent can ask

- **Does this job fit?** The free space, the budget you set ("leave 20 GB free"), and whether a job of a given size fits. When it does not, the largest entries that could be cleared, each with its way back.
- **What did I leave?** What was written in the folder it worked in since it started: what could be cleared, with its way back, and your own files, which stay.
- **What is filling the disk?** The folders that grew most since the last reading, by the tool that wrote them.
- **Where is the rest?** The space the disk says is used that a scan did not find: the disk's other volumes with their use, the local snapshots by date, the folders Scope could not read, and what is left that Scope cannot name. It reads only, and removes no snapshot.
- **What does this rule match?** What one of your standing orders matches now, with what clearing each entry frees and its way back. For an agent worktree, the agent asks git itself, so it knows exactly whether anything is left to commit and whether the branch was merged. It reads only: the weekly review in Scope is where you approve.
- **Summarise this scan.** The same text Scope's File > Export Summary writes: the 300 largest folders as an outline that adds up to the total, the totals by clearable group and by origin, and what could not be read, so an agent elsewhere can reason about the disk from one message. With names hidden, each name you chose reads as a stand-in (`folder-12`, `project-3`), the same wherever it appears, and the names tools chose stay. It reads only, and sends nothing.
- **May I clear this?** A proposal to move entries to the Trash. You see the proposal, its reason and what the Trash keeps, and you decide, each time. The agent cannot decide for you, and it cannot empty the Trash.

Every answer says what Scope could not read and which figures are estimates. A clearing figure says what clearing frees beside the size when the two differ; a hard link counts once, and a clone counts whole, so the app shows the exact figure.

## Install

**Claude Desktop.** Open `scope.mcpb` (Settings > Extensions), choose the folder to analyse, and set Leave free to the GB you want kept free.

**Claude Code.** Unpack `scope.mcpb` (it is a zip) somewhere that stays, such as `~/Library/Application Support/Scope/connector`, then add the server:

```sh
claude mcp add --env SCOPE_LEAVE_FREE_GB=20 --scope user scope -- node "$HOME/Library/Application Support/Scope/connector/server/index.js"
```

## Tell the agent to ask

Add this sentence to the agent's instructions, such as `CLAUDE.md`:

> Before a job that writes more than a few GB, ask Scope whether it fits the disk budget (`disk_budget`). When you finish, ask Scope what you left (`what_i_left`) and propose any clear-out with `propose_clear`, or a tool's own clean-up with `propose_cleanup`; never move, delete or clean up files yourself.

## The Claude Code hook

The hook asks for the budget when a session starts, so the answer is in the agent's context before it writes anything, and records what the session left when it ends. Add it to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      { "matcher": "startup", "hooks": [ { "type": "command", "command": "SCOPE_LEAVE_FREE_GB=20 node \"$HOME/Library/Application Support/Scope/connector/server/index.js\" --ask disk_budget --stamp", "timeout": 30 } ] }
    ],
    "SessionEnd": [
      { "hooks": [ { "type": "command", "command": "node \"$HOME/Library/Application Support/Scope/connector/server/index.js\" --ask what_i_left", "timeout": 30 } ] }
    ]
  }
}
```

`--stamp` records when the session started, so "what I left" reads from there; the `startup` matcher keeps it to new sessions, so `/clear` and compaction do not move the start. The session's folder comes from the hook's input. Each call takes about 0.1 s over a small project.

## What you see in Scope

Window > Agent Log in Scope lists what agents asked and what they were told, and every proposal with who decided it. The connector writes the log to `~/Library/Application Support/Scope/agent-log.jsonl`; Scope only reads it.

## What it never does

- It never empties the Trash. An agent that asks is refused; only the person does that, in Finder or in Scope.
- It never moves anything without your answer to that proposal.
- It never runs a command. The way back for each entry is yours or the agent's to run.
- It never talks to the network, and it reads only the folder you chose.

## Footer

Requires node 18 or later. Claude Code 2.1.76 or later asks you about proposals. In an older version, and in any host that cannot ask, a proposal is refused: nothing moves, and the agent is told to ask you itself.
[Scope](https://ayeo.io/scope) · [Support](https://ayeo.io/scope/support) · [Privacy policy](https://ayeo.io/scope/privacy) · support@ayeo.io
© 2026 Ayeo Ltd
