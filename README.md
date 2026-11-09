# Kyungwon Kwon — Portfolio

A static, responsive portfolio for https://springcotton.com.

## Preview

```sh
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

`dist/` is the complete deployable website. No runtime dependencies or build step.
The site includes keyboard-accessible menus and project dialogs, reduced-motion support,
local fonts and original SVG artwork. Content is based on the supplied career handoff.
Sync uses an official DOF product image; Sync Mobile uses official App Store screenshots; Madi uses an actual app screenshot. Other project illustrations are conceptual and labelled accordingly. Private resume details
and internal service URLs are excluded.

## Content

- `dist/index.html`: page content and search metadata
- `dist/style.css`: responsive visual system
- `dist/app.js`: case studies and interactions
- `scripts/generate-assets.py`: original procedural SVG illustrations
- `.openai/hosting.json`: retained Sites project identity

Fonts: Barlow Condensed and IBM Plex Mono, SIL Open Font License (see `dist/assets/OFL-*.txt`).

Technology logos: [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), MIT license (`dist/assets/icons/LICENSE`). The Madi image is a screenshot of the live application.

Sync image source: https://doflab.com/en/software/sync (`project_request.jpg`, © DOF). Madi was recaptured from the live v0.1.5 piano editor on 2026-11-09.

Sync Mobile image source: https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757 (© DOF). `dof-sync-mobile-board.png` and `dof-sync-mobile-viewer.png` are the official Main board and 3D File Viewer screenshots, downloaded on 2026-11-09. Their artwork is displayed in full in both the project card and case study.

## Knot identity

`scripts/knot_art.py` generates a closed trefoil with periodic surface normals and a flat front projection with three woven crossings. Run it with Python, then use `scripts/render-knot-previews.cjs` with an installed `sharp` package directory to render the hero PNG, multi-size ICO/PNG favicons, Apple touch icon and review sheet. The hero uses the rasterized artwork so browsers do not need to repaint the detailed vector mesh.
