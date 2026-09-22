# Claude prompt — Bear portal redesign

Copy everything below the line into Claude when you want a new visual redesign of the Bear docs portal (`bear/portal`).

---

You are redesigning the Bear UI documentation portal (React + Vite + `@forgedevstack/bear` + Compass routing + i18n).

## Product

Bear is ForgeStack’s React component library. Brand color is pink `#EA0A8E` / `--bear-primary-500` `#ec4899`. Logo is the Bear teddy (`BearLogo`). Do not name competitor UI kits or CMS products in copy.

## Goals

1. Keep every existing route and page. Do not drop docs, catalog, Storybook (`/storybook`), or Sandbox (`/sandbox`).
2. Make the portal feel like a product site + component catalog (search, category chips, live preview cards), not a generic docs theme.
3. Light and dark must both be readable. Use Bear CSS variables (`--bear-bg-*`, `--bear-text-*`, `--bear-primary-*`, `--bear-danger-*`). Never hardcode body copy in components — use `DOCS_TEXT` / `PORTAL_TEXT` / `usePortalLanguage()`.
4. Use Bear primitives for chrome: `Flex`, `Typography`, `Button`, `Card`, `Input`, `Chip`, `Alert`, `AppBar`. No raw layout `div`/`span` when a Bear primitive exists. No inline `style={{}}` for layout chrome.
5. Types in `*.types.ts`, constants in `*.const.ts`, numbers from `@const` / portal number consts. No magic numbers or leftover class-string dumps.
6. Catalog at `/components` must list every public component with search + filters + live previews.
7. Storybook page must show the full Bear color scales and the logo.
8. Sandbox must keep a runnable full project (Sandpack / CodeSandbox) plus coverage of the catalog.

## Constraints

- Portal deploys on Vercel from `portal/dist` (`vercel.json`). The redesign must still build with `npm run portal:build`.
- Do not push or merge unless I say so.
- Do not invent new npm package names. Scope stays `@forgedevstack/bear`.

## Deliver

- A visual system (spacing, type scale, surfaces, nav) applied consistently.
- Updated homepage, catalog, Storybook, and Sandbox first, then component doc pages.
- Screenshots or a local preview checklist for light and dark.
