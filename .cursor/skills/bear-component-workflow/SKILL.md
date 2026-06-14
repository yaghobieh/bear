---
name: bear-component-workflow
description: Workflow for adding or changing Bear components — 4-file pattern, barrel export, portal page, navigation, changelog. Use when creating new Bear components or updating existing ones.
---

# Bear Component Workflow

## When to use

Adding a new component, enhancing props, or refactoring an existing component in the Bear library.

## 4-file pattern

Every component folder under `src/components/ComponentName/`:

1. `ComponentName.types.ts` — all props and interfaces
2. `ComponentName.const.ts` — BEM classes, sizes, defaults, translations
3. `ComponentName.tsx` — implementation (named export only)
4. `index.ts` — barrel re-export

**One component per `.tsx` file — no exceptions.**
Helper components that are only used by one parent belong in a `helpers/` subfolder, each in their own file.

## Implementation checklist

1. Create types with `id?: string`, `testId?: string`, and all public props
2. Extract magic strings/numbers to `*.const.ts`
3. Use `useBearId('ComponentName')` + `resolveBearId(id, generatedId)` for auto-generated DOM ids (`Bear_component_123456`)
4. Use BEM `Bear-ComponentName` classes
5. User-facing strings via props with defaults from const
6. Register in `src/components/index.ts`
7. Export from main `src/index.ts` if public API

## Portal page file layout

For every portal component page, colocate:

```
ComponentPage/
  ComponentPage.tsx          — render only, imports from below
  ComponentPage.types.ts     — page-specific types
  ComponentPage.const.ts     — PropRow arrays, demo data, code strings
  ComponentPage.utils.ts     — LiveProps resolvers, data transforms
  index.ts                   — barrel
```

Rules:
- No inline `PropRow[]`, demo arrays, or union `as` casts in page `.tsx`
- User-facing strings via `DOCS_TEXT` / `usePortalLanguage()` — no hardcoded UI copy
- Portal demos use Bear primitives and `BearIcons` — not emoji or raw HTML mocks
- Typed resolvers replace `as` casts on `LiveProps`

## One const + one types file per component folder

- Always create `ComponentName.const.ts` and `ComponentName.types.ts` for every component or page
- A single `constants/strings.const.ts` file per feature folder can hold shared string constants like `EMPTY_STRING`, `PACKAGE_NAME`, etc.
- If a component needs SVGs, put them in a `helpers/` subfolder with one SVG per file: `ComponentNameBellSvg.tsx`

## Code quality gates

1. **No inline magic strings** — move to const
2. **No raw `as` casts** — use typed resolvers
3. **No HTML comments in JSX** — remove `{/* ... */}` comment blocks from rendered markup
4. **No `<>` fragment when a structural element is needed** — use `<div>` or `<header>` etc.
5. **No raw `<span>` / `<div>` for structure** — use Bear `Box`, `Flex`, `Typography`, `Paper`
6. **5+ related items → const** — extract to the matching const file
7. **Chained `if/else` keyed by string → keymap** — replace `if (x === 'a')... if (x === 'b')...` with `const MAP = { a: ..., b: ... }; return MAP[x]`
8. **SVGs in TSX → helper file** — put each inline SVG in `helpers/ComponentNameXxxSvg.tsx`

## Portal documentation

For each new or significantly changed component:

1. Create `portal/src/pages/ComponentName/ComponentName.tsx`
2. Add route in portal router
3. Add entry to navigation constants
4. Include live preview / props playground when applicable

## Changelog

Add entry under `CHANGELOG.md` for the target version:

- **Added** — new components or props
- **Changed** — behavior or API updates
- **Fixed** — bug fixes
- **Migration** — breaking or opt-in changes

## Reference

- **TimePicker** — canonical layout and standards
- **CONTRIBUTING.md** — full contributor guide
- **bear-ui-standards** skill — types, consts, BEM, translations
