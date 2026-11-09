# Kyungwon Kwon — Portfolio

A static, responsive portfolio for https://springcotton.com.

## Preview

```sh
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

`dist/` is the complete deployable website. No runtime dependencies or build step.
The site includes keyboard-accessible menus and project dialogs, reduced-motion support,
local fonts and original SVG artwork. Content is based on the supplied career handoff.
Project illustrations are conceptual, and are labelled accordingly. Private resume details
and internal service URLs are excluded.

## Content

- `dist/index.html`: page content and search metadata
- `dist/style.css`: responsive visual system
- `dist/app.js`: case studies and interactions
- `scripts/generate-assets.py`: original procedural SVG illustrations
- `.openai/hosting.json`: retained Sites project identity

Fonts: Barlow Condensed and IBM Plex Mono, SIL Open Font License (see `dist/assets/OFL-*.txt`).
