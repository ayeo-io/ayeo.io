# Scope privacy policy

Last updated: 17 November 2026

Scope is a disk space analyser for macOS, made by Ayeo Ltd. This policy explains what Scope does with your data. The short version: Scope collects nothing, sends nothing and has no way to do either.

## What Scope reads

Scope reads the file system of the volume you choose, so it can show you what takes the space. For each file and folder it reads the name, the size on disk, the modification date and the kind. It reads this only after you choose the volume in the open panel, which is how macOS grants a sandboxed app access to a folder.

If you grant Full Disk Access in System Settings, Scope can also read the folders macOS protects, such as Mail, Messages and Safari data. Without it, Scope shows those folders as "not readable" and does not guess at their contents. You can withdraw Full Disk Access at any time in System Settings > Privacy & Security.

While you watch a volume, Scope listens for file changes on it to see what is growing, and reads the volume's free space. It reads the same metadata and nothing more.

To explain the space a scan did not find, Scope reads the disk's volume figures and the list of local snapshots from macOS.

If you also install Scope for agents, the separate connector, it writes a log of what agents asked at `~/Library/Application Support/Scope/agent-log.jsonl`. Scope reads that log to show it in Window > Agent Log, and writes nothing to it.

Scope never reads the contents of your files. It reads their metadata only.

## What Scope stores

Scope keeps each finished scan on your Mac, in its own container (`~/Library/Containers/io.ayeo.scope/`), so the next launch shows your disk at once and so Colour by Change and the time-lapse can compare scans. It keeps the last ten scans of a volume and, before them, one a week for a year, within the space you set in Settings (5 GB until set), and deletes older ones. You can turn history off in Settings, and delete one scan or a volume's scans from Scan > History. A scan holds the paths, sizes and dates it read, and nothing else.

Scope also stores its settings in the same container: the view you chose, the colour mode, the workers per volume, the download speed, the dormant days, the Low space figure, your standing orders, which volume is watched, and the permission you granted for each volume.

You can delete all of it by deleting Scope. Nothing is stored anywhere else.

## What Scope sends

Nothing. Scope makes no network connections. It runs under the macOS App Sandbox without the network entitlement, so the operating system blocks any connection the app might try to make. There is no analytics, no crash reporting, no account and no telemetry.

The download speed in Settings is a figure you type; Scope uses it to estimate how long a cleared download would take to fetch again, and makes no request to measure it.

The Help menu opens pages of ayeo.io in your browser. The browser makes that connection, as it does for any link, and Scope sends nothing with it.

Scope's App Store privacy label is "Data Not Collected", which matches this policy.

## What Scope notifies

If you watch a volume, Scope asks macOS for permission to notify you, and warns when the disk is forecast to fill or one file grows fast, and once a week when a standing-order review is ready, if you turn that on. These are local notifications made on your Mac; nothing passes through a server. You can turn them off in System Settings > Notifications, and Scope says so in its Watch sheet.

## What Scope changes

Scope changes your disk only when you ask it to:

- Move to Trash puts the item in the macOS Trash, where you can put it back. Empty What Scope Moved removes from the Trash only what Scope moved there, and asks first. Scope never deletes anything permanently without asking, and never what it did not move.
- The weekly review moves to the Trash only the entries you approve in it, and one Undo puts them back.
- Hibernate moves a project's rebuildable folders to the Trash and writes one file, `HIBERNATED.md`, at the top of the project, which says what went and how to build it again. Undo removes the file and puts the folders back.
- Export Summary writes a file where you choose, or puts text on the clipboard, only when you ask.
- Reveal in Finder and Open With hand the item to Finder or the app you choose.

Scope never runs a command. Where a tool's own command would do a better job than the Trash, Scope shows it for you to copy.

## Purchases

Scope is sold through the Mac App Store. Apple handles the purchase and holds your payment details. Ayeo Ltd receives no personal data from the sale. Apple's privacy policy covers the App Store: https://www.apple.com/legal/privacy/

## Children

Scope has no account, no content and no communication features, and it collects no data from anyone, of any age.

## Changes to this policy

If Scope ever starts to collect or send data, this policy will say what, why and how to opt out, and the app's privacy label will change with it. The date at the top shows the last change.

## Contact

Ayeo Ltd
support@ayeo.io
