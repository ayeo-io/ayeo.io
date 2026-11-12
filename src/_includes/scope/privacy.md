# Scope privacy policy

Last updated: 12 November 2026

Scope is a disk space analyser for macOS, made by Ayeo Ltd. This policy explains what Scope does with your data. The short version: Scope collects nothing, sends nothing and has no way to do either.

## What Scope reads

Scope reads the file system of the volume you choose, so it can show you what takes the space. For each file and folder it reads the name, the size on disk, the modification date and the kind. It reads this only after you choose the volume in the open panel, which is how macOS grants a sandboxed app access to a folder.

If you grant Full Disk Access in System Settings, Scope can also read the folders macOS protects, such as Mail, Messages and Safari data. Without it, Scope shows those folders as "not readable" and does not guess at their contents. You can withdraw Full Disk Access at any time in System Settings > Privacy & Security.

Scope never reads the contents of your files. It reads their metadata only.

## What Scope stores

Scope keeps each finished scan on your Mac, in its own container (`~/Library/Containers/io.ayeo.scope/`), so the next launch shows your disk at once and so Colour by Change can compare two scans. It keeps the last ten scans per volume and deletes older ones. A scan holds the paths, sizes and dates it read, and nothing else.

Scope also stores its settings (the view you chose, the colour mode, the workers per volume) in the same container.

You can delete all of it by deleting Scope. Nothing is stored anywhere else.

## What Scope sends

Nothing. Scope makes no network connections. It runs under the macOS App Sandbox without the network entitlement, so the operating system blocks any connection the app might try to make. There is no analytics, no crash reporting, no account and no telemetry.

Scope's App Store privacy label is "Data Not Collected", which matches this policy.

## What Scope changes

Scope changes your disk only when you ask it to:

- Move to Trash puts the item in the macOS Trash, where you can put it back. Scope never empties the Trash and never deletes anything permanently.
- Reveal in Finder and Open With hand the item to Finder or the app you choose.

## Purchases

Scope is sold through the Mac App Store. Apple handles the purchase and holds your payment details. Ayeo Ltd receives no personal data from the sale. Apple's privacy policy covers the App Store: https://www.apple.com/legal/privacy/

## Children

Scope has no account, no content and no communication features, and it collects no data from anyone, of any age.

## Changes to this policy

If Scope ever starts to collect or send data, this policy will say what, why and how to opt out, and the app's privacy label will change with it. The date at the top shows the last change.

## Contact

Ayeo Ltd
support@ayeo.io
