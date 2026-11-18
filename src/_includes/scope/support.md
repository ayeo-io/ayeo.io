# Scope support

Scope shows you where your disk has gone. This page answers the questions we get most. If yours is not here, email support@ayeo.io with your macOS version and what you saw, and we will reply within two working days. Help > Scope Help in the app opens this page.

## Getting started

1. Open Scope. The picker lists your volumes with their used and free space.
2. Choose a volume and press Scan. macOS asks you to confirm the folder once, because Scope runs in the App Sandbox and can only read what you grant it.
3. The map appears within a second and fills in as the scan runs. Hover an entry to see its path, size, file count and date. Click a folder to zoom in; the breadcrumb takes you back up.

Scope keeps each finished scan, so the next time you open it your disk shows at once. Press ⌘R to scan again.

## Full Disk Access

macOS protects some folders, such as Mail, Messages, Safari data and parts of ~/Library. Without Full Disk Access, Scope shows them as "not readable" and counts them as unknown rather than guessing.

To grant it: System Settings > Privacy & Security > Full Disk Access, turn on Scope, then scan again. Scope offers to open that page for you when it meets a protected folder, and Scope > Full Disk Access… opens the sheet at any time.

You can turn it off again at any time. Scope reads file names, sizes and dates only, never file contents, and sends nothing anywhere (see the privacy policy).

## Reading the map

- **Size** is the space a file takes on disk, in allocated blocks, so it can differ from the size Finder shows for sparse or compressed files. Where clearing an entry would free less than its size, because a clone or hard link elsewhere shares its blocks, the info strip says what clearing frees.
- **Colour by Depth** (⌘1) shows how deep each folder is. **Type** (⌘2) colours by kind: code, build output and caches, media, archives and images, apps, models and data. **Age** (⌘3) colours by modification date. **Clearable** (⌘4) picks out build output, package caches, virtual environments, agent worktrees and model stores that can be rebuilt, each with its way back. **Change** (⌘5) compares with a saved scan. **Growth** (⌘6) shows what is growing now while the volume is watched. **Origin** (⌘7) groups folders by the tool that wrote them.
- The **3D map** (View > 3D Map, ⌥⌘3) shows the same disk as a platter of blocks. Drag to orbit, scroll or pinch to zoom, hold ⇧ or ⌥ and drag to pan, and press ⌥⌘0 to reset the camera. Each block's height is its size, or its age if you choose. The flat map and the 3D map share the same zoom, selection and filters.
- The **sidebar** (⌥⌘S) lists folders by size as an outline. Its **Developer** view lists the projects on the disk, with what could be cleared in each and when you last worked on it.
- **Filters** in the toolbar narrow the map by name, kind or age.
- The summary above the map says what was found, what you could clear and how much of it comes back in under a minute, the size of the Trash, the space free and how many folders could not be read. Each part is a button that shows more.

## Why the total is less than Finder's "used" figure

Scope counts each file once per path and shows the sum of what it could read. Three things make its total smaller than the volume's used space:

- Folders Scope cannot read (shown as "not readable" and counted in the summary).
- Purgeable space and local snapshots: files macOS can remove on demand. The picker shows the purgeable figure separately.
- Files shared between paths by hard links or APFS clones, which Scope counts once per path.

The grey part of the capacity bar, and the "Elsewhere on this disk" tile in the 3D map, hold the difference. Click either for a breakdown: the disk's other volumes, the local snapshots by date, the folders Scope could not read, and what is left, which Scope names as such rather than guessing. The breakdown shows the command that removes a snapshot; Scope never runs it.

## Freeing space

- **Move to Trash** sends the item, or every item in a selection, to the macOS Trash. Press ⌘Z to put it back. The sheet names what the space comes back as, and warns before data macOS or your apps keep, and before a worktree with changes not yet committed. The space comes back when the Trash is emptied: choose Entry > Empty What Scope Moved… to remove what Scope moved there, after an alert, or empty the whole Trash in Finder. Scope never removes what it did not move.
- **The way back.** Every clearable entry says what getting it back would cost: it rebuilds itself, one command, a build, or a download timed at the speed you set in Settings. Where the Trash would break the tool that owns a folder, such as an agent worktree or Docker's disk image, the sheet shows the tool's own command and **Copy Command** copies it. Scope never runs a command.
- **Hibernate** (in the Developer view) moves a dormant project's rebuildable parts to the Trash, keeps your own files and anything not committed, and writes a receipt, `HIBERNATED.md`, at the top of the project with the build command. ⌘Z wakes it. A project is dormant when its own files have not changed for the days set in Settings (90 until you change it).
- **Rescan Folder** (⌘R while zoomed in) scans one folder again and updates every size above it, so you do not rescan the whole volume after clearing something.
- **Reveal in Finder** and **Open With** are in the right-click menu, and in the Entry menu for the selected entry.

Scope does not choose what to delete. It names what you could clear and what getting it back would cost, and does what you pick. There is no "optimise your Mac" and no one-press clean.

## Watching a volume

Scan > Watch Volume…, or the Watch button in the toolbar, keeps an eye on the volume after the scan. A menu bar item reads the free space and, when the disk is filling, says about when it will be full; its menu lists the five fastest-growing folders with their rate, and Colour by Growth shows them on the map. The window can be closed while Scope watches.

Scope warns by notification for two causes only: the forecast falling under the threshold you set, and one file growing past a threshold in a short time. Choosing the warning opens Scope at the cause, and the warning offers to ignore that file. macOS asks for permission when you start watching; if notifications are off for Scope, the Watch sheet says so and opens the Notifications pane of System Settings.

## Standing orders and the weekly review

Settings > Standing Orders holds rules you write once: agent worktrees not changed for 14 days with nothing left to commit, build output of projects not changed for 60 days, and package folders of projects not changed for 90 days. All are off until you turn them on, and a rule moves nothing on its own. Scan > Weekly Review… lists what the rules match now, with what clearing each frees and its way back; you untick what stays, approve the rest, and one ⌘Z puts everything back. With "Notify me when a review is ready" on and the volume watched, one notification a week says how many entries the review holds.

## Low space

When the volume's free space falls under the figure in Settings (1 GB until you change it), a panel above the map lists the quickest space to get back from your last saved scan, cheapest way back first. Under 1 GB of free space a scan still runs, but its result is held in memory and saved once the space is back.

## Saved scans, Change and time-lapse

Scope keeps the last ten scans of a volume and, before them, one a week for a year, within the space set in Settings (5 GB until you change it). Scan > History opens any of them; Scan > Compare With and Colour by Change show what grew, shrank, is new or is gone since. Play beside the scrubber steps through the saved scans, oldest first. Settings turns history off or deletes it.

## Export Summary

File > Export Summary… (⇧⌘E) writes a short account of the scan to paste into a chat or send to a colleague: the 300 largest folders as an outline that adds up to the total, the totals by clearable group and by origin, and what could not be read. "Full" writes every folder at or above 0.1% of the scan as JSON. "Hide names" replaces your folder names with stand-ins and keeps the names tools chose. Scope writes a file or the clipboard; nothing is sent.

## Settings

- **General**: the download speed used to time a download's way back (Scope makes no network request to find it), the days after which a project is dormant, when Low space shows, and scan history with its space.
- **Standing Orders**: the rules and the review notification.

## Known limits

- Scope scans one volume at a time. Volumes mounted inside the one you scan (disk images, simulator runtimes) are shown as mount points and not entered.
- The 3D map needs Metal. A Mac without it stays in the flat map and says why.
- Scope never runs a command. The App Store app shows a tool's clean-up command for you to run; the separate [Scope for agents](https://ayeo.io/scope/connector) connector can run one with your approval.
- Scope needs macOS 14 or later.

## Something went wrong

If Scope quits, scans for much longer than expected or shows a figure you do not believe, email support@ayeo.io with:

- your macOS version and Mac model;
- the volume you scanned and roughly how many files it holds;
- what you expected and what you saw, with a screenshot if you can.

We do not receive crash reports automatically, so your report is the only way we hear about a problem.

## Refunds

Purchases go through the Mac App Store, so Apple handles refunds: https://reportaproblem.apple.com

## Contact

Ayeo Ltd
support@ayeo.io
Privacy policy: https://ayeo.io/scope/privacy
Accessibility: https://ayeo.io/scope/accessibility
