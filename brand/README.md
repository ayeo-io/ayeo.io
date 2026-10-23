# Brand asset kit

The ayeo and Compass marks as files: SVG masters, app tiles, favicons, wordmarks and social previews. Use these files wherever a mark is needed outside the site: GitHub, the plugin directory, slides.

The source is the ayeo Design System, published at https://claude.ai/artifact/2Stk5EdRsNJDUcU2sPH3Y2, in its Marks section. Never redraw a mark. When the system changes a mark, copy the new SVG into `masters/` and regenerate.

## Regenerate

```bash
python3 -m venv .venv && .venv/bin/pip install brotli fonttools pillow uharfbuzz
.venv/bin/python brand/generate.py
```

It needs `rsvg-convert` (`brew install librsvg`). The wordmarks outline IBM Plex Sans from `src/assets/fonts/`, so they render where web fonts do not, such as a GitHub README.

## What each folder holds

`masters/` holds the design system's SVGs, named `<brand>-<kind>.svg`. `ayeo/` and `compass/` hold the files generated from them:

| File | Use |
|---|---|
| `<brand>-mark.svg`, `-mark-dark.svg` | The mark on light grounds (navy-600) and dark grounds (navy-300). |
| `<brand>-mark-16.svg` | The mark at 16 px, with heavier strokes. |
| `<brand>-tile.svg`, `-tile-<size>.png` | The navy app tile, 64 to 1024 px. Organisation avatar, plugin icon. |
| `<brand>-tile-light.svg`, `-tile-light-<size>.png` | The light tile, for dark launchers. |
| `favicon.ico` | 16, 32 and 48 px, from the 16 px mark. |
| `<brand>-wordmark-light.svg`, `-dark.svg`, `@4x.png` | The mark at 112 px with the name in Plex Sans 600 at 64 px. |
| `<brand>-header-light.svg`, `-dark.svg` | A README header: the tile with the name beside it, the name's ink as tall as the tile. |
| `<brand>-social-preview.svg`, `.png` | The 1280x640 GitHub social preview. |

## Where the files are used

- `ayeo-io/.github`: `assets/logo/` and `assets/web/`, which the organisation profile shows.
- The `ayeo-io` organisation avatar: `ayeo/ayeo-tile-512.png`.
- `ayeo-io/compass`: `assets/compass-icon.png` (`compass-tile-1024.png`), the README header, and the social preview (`compass/compass-social-preview.png`).
