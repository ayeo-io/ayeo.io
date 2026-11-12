---
title: "Scope is coming to the Mac App Store"
subtitle: "If your Mac says the disk is full, Scope shows you where the space has gone, as a map you can read, so you know what to delete."
summary: "Scope, a disk space analyser for macOS, is coming to the Mac App Store. It scans a full SSD in under a minute and draws every folder as a map."
status: building
statusUpdate: "Scope is built, and its App Store listing is being prepared. You can't download it yet. We'll mark this post shipped and link the listing when you can."
feedbackUrl: "mailto:support@ayeo.io"
faq:
  - q: "Who is this for?"
    a: "Anyone whose Mac is running out of space and who wants to know what to delete. Developers especially: `node_modules`, `DerivedData`, simulator runtimes, Docker images and package caches show up first."
  - q: "What does it need?"
    a: "macOS 14 or later. The 3D map needs Metal; a Mac without it stays in the flat map and says why."
  - q: "What will it cost?"
    a: "One purchase through the Mac App Store. No subscription and no account."
  - q: "Does my scan leave my Mac?"
    a: "No. Scope makes no network connections, and there is no analytics, crash reporting or telemetry. The [privacy policy](/scope/privacy) has the details."
  - q: "Will it clean my Mac for me?"
    a: "No. Scope is not a cleaner, an optimiser or a duplicate finder. It shows you the disk; what you delete is your call. When you do delete something, it goes to the Trash, with Undo."
  - q: "When can I get it?"
    a: "When it is live on the Mac App Store. We'll update this post then, and the [Scope page](/scope) will link to the listing."
---

Scope is a disk space analyser for macOS. It scans a full SSD in under a minute and draws every folder as a map you can read. Find what takes the space, then send it to the Trash.

## The problem

Your Mac says the disk is almost full, and Finder doesn't tell you why. The space is spread across folders you never open: build output, package caches, simulator runtimes, old video exports, a photo library you copied twice. Finding them by hand means opening folder after folder and adding up sizes.

## What's new

Pick a volume and press Scan. The map appears within a second and fills in as the scan runs, so you see the big folders before the scan finishes. Nine million entries scan in 35 seconds on an M4 Pro.

There are two ways to look:

- **The flat map** is a treemap in the classic SpaceMonger style: every folder a labelled rectangle sized by what it holds, its subfolders nested inside. Click to zoom in; the breadcrumb takes you back.
- **The 3D map** shows the same disk as a platter of blocks. Orbit, zoom and pan. Each block's height is its size, or its age.

Colour the map by depth, file type, age, what you could clear, or what changed since your last scan. Filter by name, kind or age to see only the caches, the videos or the files older than a year.

Scope is honest about what it can't see. A folder it cannot read is drawn and counted, not skipped. Sizes are what files take on disk. The total says what it could and could not see.

## Getting started

When Scope is on the Mac App Store:

1. Open Scope. The picker lists your volumes with their used and free space.
2. Choose a volume and press Scan. macOS asks you to confirm the folder once.
3. Hover an entry to see its path, size, file count and date. Click a folder to zoom in.

To see inside Mail, Messages and the other folders macOS protects, grant Scope Full Disk Access. The [support page](/scope/support) explains how, and answers the questions we get most.
