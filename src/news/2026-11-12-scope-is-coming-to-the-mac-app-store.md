---
title: "Scope is coming to the Mac App Store"
subtitle: "If your Mac says the disk is full, Scope shows you where the space has gone, as a map you can read, so you know what to delete."
summary: "Scope, a disk space analyser for macOS, is coming to the Mac App Store. It scans a full SSD in under a minute and draws every folder as a map."
status: building
statusUpdate: "Scope is built, and its App Store listing is being prepared. You can't download it yet. We'll mark this post shipped and link the listing when you can."
feedbackUrl: "mailto:support@ayeo.io"
faq:
  - q: "Who is this for?"
    a: "Anyone whose Mac is running out of space and who wants to know what to delete. Developers and people whose AI tools fill the disk especially: `node_modules`, `DerivedData`, `.venv`, agent worktrees and package caches show up first."
  - q: "What does it need?"
    a: "macOS 14 or later. The 3D map needs Metal; a Mac without it stays in the flat map and says why."
  - q: "What will it cost?"
    a: "One purchase through the Mac App Store. No subscription and no account."
  - q: "Does my scan leave my Mac?"
    a: "No. Scope makes no network connections, and there is no analytics, crash reporting or telemetry. The [privacy policy](/scope/privacy) has the details."
  - q: "Will it clean my Mac for me?"
    a: "No. Scope names what you could clear and what getting it back would cost, then does what you pick. It never picks for you, and it never runs a command. When you do delete something, it goes to the Trash, with Undo."
  - q: "When can I get it?"
    a: "When it is live on the Mac App Store. We'll update this post then, and the [Scope page](/scope) will link to the listing."
---

Scope is a disk space analyser for macOS. It scans a full SSD in under a minute and draws every folder as a map you can read: the worktrees, environments, model stores and caches that coding agents and local models leave behind, and everything else beside them. Find what takes the space, see what getting it back would cost, then send it to the Trash.

## The problem

Your Mac says the disk is almost full, and Finder doesn't tell you why. The space is spread across folders you never open: build output, package caches, virtual environments, the worktrees a coding agent left behind, old video exports, a photo library you copied twice. Finding them by hand means opening folder after folder and adding up sizes.

## What's new

Pick a volume and press Scan. The map appears within a second and fills in as the scan runs, so you see the big folders before the scan finishes. Nine million entries scan in 35 seconds on an M4 Pro.

There are two ways to look:

- **The flat map** is a treemap in the classic SpaceMonger style: every folder a labelled rectangle sized by what it holds, its subfolders nested inside. Click to zoom in; the breadcrumb takes you back.
- **The 3D map** shows the same disk as a platter of blocks. Orbit, zoom and pan. Each block's height is its size, or its age.

Colour the map by depth, file type, age, what you could clear, what changed since a saved scan, what is growing now, or the tool that wrote each folder. Filter by name, kind or age to see only the caches, the videos or the files older than a year.

Every entry you could clear says its way back, from "rebuilds itself" to a download timed at your connection's speed. Then:

- **Move to Trash**, one entry or a selection of several, with Undo. **Empty What Scope Moved** removes only what Scope moved there, after asking.
- Where the Trash is the wrong tool, such as an agent worktree or Docker's disk image, Scope shows the owning tool's clean-up command to copy. It never runs one.
- **Hibernate** puts a project you are not working on to sleep: it moves what can be rebuilt to the Trash, keeps your own files and anything not yet committed, and leaves a receipt that names the build command.

To keep the disk from filling again, **Watch** a volume: a menu bar item reads the free space and says when the disk will be full. **Standing orders** are rules you write once; a weekly review lists what they match, and nothing moves until you approve. When free space runs low, Scope lists the quickest space to get back, cheapest way back first.

Scope is honest about what it can't see. A folder it cannot read is drawn and counted, not skipped. Sizes are what files take on disk, and every size says what clearing it frees. The total says what it could and could not see, and "Elsewhere on this disk" breaks down the rest.

## Getting started

When Scope is on the Mac App Store:

1. Open Scope. The picker lists your volumes with their used and free space.
2. Choose a volume and press Scan. macOS asks you to confirm the folder once.
3. Hover an entry to see its path, size, file count and date. Click a folder to zoom in.

To see inside Mail, Messages and the other folders macOS protects, grant Scope Full Disk Access. The [support page](/scope/support) explains how, and answers the questions we get most.
