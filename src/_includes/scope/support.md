# Scope support

Scope shows you where your disk has gone. This page answers the questions we get most. If yours is not here, email support@ayeo.io with your macOS version and what you saw, and we will reply within two working days.

## Getting started

1. Open Scope. The picker lists your volumes with their used and free space.
2. Choose a volume and press Scan. macOS asks you to confirm the folder once, because Scope runs in the App Sandbox and can only read what you grant it.
3. The map appears within a second and fills in as the scan runs. Hover an entry to see its path, size, file count and date. Click a folder to zoom in; the breadcrumb takes you back up.

Scope keeps each finished scan, so the next time you open it your disk shows at once. Press ⌘R to scan again.

## Full Disk Access

macOS protects some folders, such as Mail, Messages, Safari data and parts of ~/Library. Without Full Disk Access, Scope shows them as "not readable" and counts them as unknown rather than guessing.

To grant it: System Settings > Privacy & Security > Full Disk Access, turn on Scope, then scan again. Scope offers to open that page for you when it meets a protected folder.

You can turn it off again at any time. Scope reads file names, sizes and dates only, never file contents, and sends nothing anywhere (see the privacy policy).

## Reading the map

- **Size** is the space a file takes on disk, in allocated blocks, so it can differ from the size Finder shows for sparse or compressed files.
- **Colour by Depth** (⌘1) shows how deep each folder is. **Type** (⌘2) colours by kind: code, build output and caches, media, archives and images, apps. **Age** (⌘3) colours by modification date. **Clearable** (⌘4) picks out build output, package caches, simulators and containers that can be rebuilt. **Change** (⌘5) compares with a saved scan.
- The **3D map** (View > 3D Map, ⌥⌘3) shows the same disk as a platter of blocks. Drag to orbit, scroll or pinch to zoom, hold ⇧ or ⌥ and drag to pan, and press ⌥⌘0 to reset the camera. Each block's height is its size, or its age if you choose. The flat map and the 3D map share the same zoom, selection and filters.
- The **sidebar** lists folders by size as an outline.
- **Filters** in the toolbar narrow the map by name, kind or age.

## Why the total is less than Finder's "used" figure

Scope counts each file once per path and shows the sum of what it could read. Three things make its total smaller than the volume's used space:

- Folders Scope cannot read (shown as "not readable" and counted in the summary).
- Purgeable space: files macOS can remove on demand, such as local snapshots and caches. The picker shows this figure separately.
- Files shared between paths by hard links or APFS clones, which Scope counts once per path.

Scope says what it could not see rather than filling the gap with a guess.

## Freeing space

- **Move to Trash** sends the item to the macOS Trash. Press ⌘Z to put it back. Scope never empties the Trash and never deletes anything permanently; empty the Trash in Finder when you are ready.
- **Rescan Folder** (⌘R while zoomed in) scans one folder again and updates every size above it, so you do not rescan the whole volume after clearing something.
- **Reveal in Finder** and **Open With** are in the right-click menu.

Scope does not clean, "optimise" or find duplicates. It shows you the disk; what you delete is your decision.

## Known limits

- Scope scans one volume at a time. Volumes mounted inside the one you scan (disk images, simulator runtimes) are shown as mount points and not entered.
- The 3D map needs Metal. A Mac without it stays in the flat map and says why.
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
