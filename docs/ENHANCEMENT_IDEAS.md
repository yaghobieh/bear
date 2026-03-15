# Bear UI & Portal — Enhancement Ideas

Ideas to add or improve across the library, portal, and ecosystem. Pick by impact and effort.

---

## Bear UI library

### Components & API
- **RTL support** — `dir="rtl"` and mirroring for forms/layouts (Anchor, Stepper, Drawer, etc.).
- **Component composition** — More compound components with `Slot`-style APIs (e.g. `Result.Icon`, `Result.Extra`) for maximum flexibility.
- **Skeleton variants** — Per-component skeletons (CardSkeleton, TableSkeleton, FormSkeleton) that match Bear components.
- **Toast/Notification stacking** — Configurable max visible + queue, optional “clear all” (extend existing Toast).
- **DataTable ↔ Grid Table** — Document when to use Bear DataTable vs `@forgedevstack/grid-table`, or add a thin wrapper that uses grid-table under the hood with Bear styling.

### Accessibility & DX
- **Focus management** — Consistent focus trap in Modal/Drawer/CommandPalette and visible focus rings (already partial; audit and document).
- **Live regions** — `aria-live` for Result, Toast, and dynamic content so screen readers announce updates.
- **Prop table generation** — Script or doc pipeline that turns `.types.ts` into portal Props tables (single source of truth).

### Theming & build
- **CSS variables for radii/spacing** — Extend theme so radius and spacing can be overridden via CSS vars (in addition to BearProvider).
- **Bundle analysis in CI** — Track size of key entrypoints or component chunks on each release.

---

## Portal

### Discovery & navigation
- **Component search** — Sidebar or top-bar search that filters by component name (e.g. fuse.js or simple string match over `NAVIGATION`).
- **“Copy import” on component pages** — One-click copy of `import { X } from '@forgedevstack/bear'` next to the title (you already have Copy on CodeBlock; add a small button for the canonical import).
- **Breadcrumbs** — On component/API pages show path (e.g. Components → Button) for context and back-navigation.

### Content & docs
- **Do/don’t examples** — For a few key components (e.g. Form, Modal, Button), add “Do” and “Don’t” visual examples (accessibility, layout, wording).
- **Migration / versioned docs** — Short “Upgrading to 1.1.x” notes and, if needed, a simple version selector that surfaces older changelog or behavior.
- **API “Used by”** — On API/overview pages, list which components use which (e.g. “Typography is used by Button, Result, …”) to help discovery.

### UX & polish
- **Keyboard shortcut hint** — Show “⌘K” (or equivalent) in the top bar if CommandPalette/Spotlight is available, so power users know they can search.
- **Mobile sidebar** — On small screens, make the sidebar a drawer or bottom sheet and ensure component list is scrollable and tappable.

---

## Roadmap (from your current roadmap)

You already call out:

- **Templates** — Dashboard layouts, form templates, auth flows (e.g. login/signup screens built with Bear).
- **Advanced** — MCP integration (“Soon” on Introduction), CMS templates, themes marketplace.

Concrete next steps:

- **MCP integration** — Define one or two “Bear + MCP” use cases (e.g. “generate a form from a schema”, “suggest a component”), then implement a minimal demo in the portal or a separate repo.
- **Dashboard template** — One full dashboard layout (sidebar + header + content + a couple of Bear components) as a copy-paste or CLI template.
- **Auth flow template** — Login + signup + forgot-password screens using Bear (Form, Input, Button, Alert, optional Result) and your stack (e.g. Compass, Synapse).

---

## Ecosystem & DX

- **Forge CLI “Bear” template** — `create-forge my-app --template bear` that gives a Vite + React + Bear + BearProvider + one demo page (and optionally Compass, Synapse).
- **Kiln / Storybook** — Ensure Bear components are documented in Kiln (or Storybook) with props and variants so design and dev stay in sync; link from portal to “View in Kiln” where relevant.
- **Ling + Bear** — If Ling is used for i18n, document (or add) a small guide: “Using Ling with Bear” (labels, RTL, date/number formatting with Bear’s formatters).

---

## Quick wins (low effort, high value)

1. **Portal: component search in sidebar** — Filter `NAVIGATION` by label/path; no backend.
2. **Portal: copy import button** — Per component page, “Copy import” that copies `import { ComponentName } from '@forgedevstack/bear'`.
3. **Docs: one “Accessibility” page** — Summarize focus, ARIA, keyboard nav, and link to specific components.
4. **CHANGELOG: “Migration” subsection** — For any release with breaking changes, add 2–3 bullet points on how to upgrade.
5. **README: “Comparison” table** — Short table (e.g. Bear vs MUI vs Chakra) on bundle size, Tailwind, dark mode, TypeScript — reuse content from Introduction if needed.

---

## Optional / later

- **Visual regression tests** — Playwright or similar for a subset of components (e.g. Button, Modal, Result) to catch layout/theme regressions.
- **Contribution guide** — CONTRIBUTING.md with branch rules, how to add a component (types, const, tsx, index), and how to run the portal.
- **Blog or “What’s new”** — Lightweight blog or a single “What’s new” page that links to CHANGELOG and highlights one or two features per release (could be the same content as dev.to/Medium).

Use this as a backlog: prioritize by “impact × reach” and “fits current roadmap” (e.g. MCP, templates) and tackle in small iterations.
