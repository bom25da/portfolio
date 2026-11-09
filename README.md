# Kyungwon Kwon — Portfolio

A static, responsive portfolio for https://springcotton.com.

## Development

Requires Node.js 22.12+ (Node 24 is supported).

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run typecheck
npm run build
npm run preview -- --port 4173
```

React + TypeScript renders the portfolio and manages the menu, project dialogs, clipboard feedback, and local time. Vite serves the development app with React Fast Refresh and builds the production JavaScript/CSS bundles.

Every production build runs the TypeScript compiler with no emit first. `npm run typecheck` runs that check independently.

The build also prerenders the React tree into `dist/index.html`. The client hydrates that same tree, preserving initial HTML content and search metadata with static hosting. A production React server is not required. `dist/` is generated and ignored by Git; edit `src/`, `public/`, and the root `index.html` instead.

Keyboard-accessible native dialogs, repeatable scroll animation, reduced-motion support, local fonts, and SVG stars are retained. Sync uses an official DOF product image; Sync Mobile uses official App Store screenshots; Madi uses an actual app screenshot. Other project illustrations are conceptual and labelled accordingly.

## Source layout

- `src/App.tsx`: page composition and dialog state
- `src/components/`: page sections, project cards/dialogs, shared title and SVG components
- `src/data/projects.ts`: project descriptions and card data
- `src/data/technologies.ts`: technology groups and icon paths
- `src/hooks/useScrollMotion.ts`: animation observer and cleanup
- `src/types/portfolio.ts`: project, card, navigation, and technology types
- `src/styles.css`: responsive visual system
- `tsconfig.json`: strict type checking, including unchecked indexed access
- `vite.config.ts`: Vite and React configuration
- `public/`: original images, fonts, icons, sitemap, and hosting headers
- `index.html`: Vite entry and search/social metadata
- `scripts/build.mjs`: production build and static prerender
- `scripts/generate-assets.py`: original procedural SVG illustrations
- `.openai/hosting.json`: retained Sites project identity and static output directory

Fonts: Barlow Condensed and IBM Plex Mono, SIL Open Font License (see `public/assets/OFL-*.txt`).

Technology logos: [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), MIT license (`public/assets/icons/LICENSE`). The Madi image is a screenshot of the live application.

Sync image source: https://doflab.com/en/software/sync (`project_request.jpg`, © DOF). Madi was recaptured from the live v0.1.5 piano editor on 2026-11-09.

Sync Mobile image source: https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757 (© DOF). `dof-sync-mobile-board.png` and `dof-sync-mobile-viewer.png` are the official Main board and 3D File Viewer screenshots, downloaded on 2026-11-09. Their artwork is displayed in full in both the project card and case study.

## Knot identity

`scripts/knot_art.py` generates a closed trefoil with periodic surface normals and a flat front projection with three woven crossings. Run it with Python, then use `scripts/render-knot-previews.cjs` with an installed `sharp` package directory to render the hero PNG, multi-size ICO/PNG favicons, Apple touch icon and review sheet. The hero uses the rasterized artwork so browsers do not need to repaint the detailed vector mesh.
