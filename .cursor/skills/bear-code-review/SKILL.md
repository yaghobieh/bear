---
name: bear-code-review
description: Structured code review workflow for Bear components — hooks, SVG helpers, props pattern, IDs, portal docs. Use when the user says /bear-code-review or asks to review Bear component structure.
---

# Bear Code Review Workflow

## When to use

- User invokes `/bear-code-review`
- Reviewing a component before merge
- Refactoring legacy Bear components to current standards

## Review checklist

### 1. File layout

| Concern | Location |
|---------|----------|
| Props & interfaces | `ComponentName.types.ts` |
| Constants, BEM classes, defaults | `ComponentName.const.ts` |
| Main render only | `ComponentName.tsx` |
| Context object | `ComponentName.context.ts` |
| Context hook | `hooks/useComponentName/useComponentName.ts` |
| Stateful logic | `hooks/useComponentName.ts` or `ComponentName/hooks/useComponentName.ts` |
| SVG / complex markup | `helpers/ComponentNameSvg.tsx` |
| Barrel | `index.ts` |

### 2. Component signature

Prefer a single `props` parameter — destructure inside the body:

```tsx
export const FormControl = (props: FormControlProps) => {
  const { label, id, ...rest } = props;
```

Avoid long inline destructuring in the function signature unless the component is trivial.

### 3. Hooks rules

**Never** call hooks conditionally:

```tsx
const generatedId = useBearId('FormControl');
const domId = resolveBearId(id, generatedId);
```

**Do not** use `id ?? useBearId('X')`.

Move `useContext` wrappers to `hooks/use{Name}.ts` — not in the component file.

Extract multi-hook logic into `use{Name}` with JSDoc when the component has geometry, animation, or derived state.

### 4. IDs

- Format: `Bear_{component_snake_case}_{segment}` (e.g. `Bear_button_482931`)
- Use `useBearId('ComponentName')` + `resolveBearId(id, generatedId)`
- No one-off migration scripts — IDs are runtime utilities only

### 5. UI primitives

- Use Bear `Box`, `Flex`, `Typography`, `Paper` — not raw `<span>` / `<div>` for structure
- BEM root class in `*.const.ts`: `Bear-ComponentName`
- Theme tokens: `var(--bear-primary-500)`, `var(--bear-text-primary)`, etc.

### 6. Portals & overlays

- `Snackbar`, `Modal`, `Toast` — use `createPortal` with optional `container` prop
- Default mount: `document.body`

### 7. Portal documentation

Each public component page must include:

- `ComponentPreview` playground
- `PropsTable` with all public props
- Import example
- Nav badge `1.2.4` only for items new in the current release

### 8. Portal page file layout

Colocate next to `ComponentPage.tsx`:

| Concern | Location |
|---------|----------|
| Page-specific types | `ComponentPage.types.ts` |
| Props rows, demo data, code strings | `ComponentPage.const.ts` |
| LiveProps → component prop mappers | `ComponentPage.utils.ts` |
| Playground sub-components | `ComponentPlayground.tsx` + `.types.ts` + `.utils.ts` |

Rules:

- No inline `PropRow[]`, demo arrays, or union casts in page TSX
- User-facing strings via `DOCS_TEXT` / `usePortalLanguage()` — no hardcoded UI copy
- Portal demos use Bear primitives and `BearIcons` — not emoji or raw HTML mocks
- Typed resolvers replace `as` casts on `LiveProps`

### 9. Code quality gates (apply on every review)

| Gate | Rule |
|------|------|
| **G1 — No magic strings/numbers** | Every literal string or number shared across 2+ places belongs in `*.const.ts` |
| **G2 — No `as` casts on LiveProps** | Use a typed resolver in `*.utils.ts` |
| **G3 — No HTML comments in JSX** | Remove all `{/* ... */}` blocks inside rendered markup |
| **G4 — No bare `<>` for layout** | Replace `<>` with `<div>` / `<header>` / semantic element when structure is needed |
| **G5 — Bear primitives only** | Replace raw `<span>` / `<div>` for layout with `Box`, `Flex`, `Typography`, `Paper` |
| **G6 — Keymap over chained conditions** | If a function has 3+ `if (x === 'a')` branches keyed by the same string/type, replace with an object map `const MAP = { a: …, b: … }` |
| **G7 — One component per `.tsx`** | A helper used only by one parent lives in `helpers/HelperName.tsx` |
| **G8 — SVGs in helper files** | Inline SVG that is not a trivial 1-liner belongs in `helpers/ComponentNameXxxSvg.tsx` |
| **G9 — Translations** | All user-visible text (labels, buttons, table headers, placeholders) goes through `DOCS_TEXT` or `PORTAL_TEXT` — no hardcoded English or Spanish strings in components |
| **G10 — 1 const + 1 types file per folder** | Every component or page folder must have `*.const.ts` and `*.types.ts` |

### 10. Review levels

When reporting, classify each issue with a level:

1. **Must fix** — hooks violations, missing types, broken a11y, G1–G5 gate failures
2. **Should fix** — file layout, SVGs inline, translation gaps, G6–G10 gate failures
3. **Nice to have** — naming, minor extraction, comment cleanup

After listing issues, apply fixes unless the user asked for review-only.

## Related skills

- **bear-ui-standards** — BEM, types, consts, translations
- **bear-code-quality** — no magic numbers, logic-first
- **bear-component-workflow** — new component checklist
