---
name: bear-code-quality
description: Bear code quality rules — types in type files, constants in const files, no magic numbers or raw strings, logic-first checks, minimal hooks. Use when reviewing or writing Bear code.
---

# Bear Code Quality

## Types

- type should be at type file
- All interfaces and type aliases live in `*.types.ts`
- Use `import type` for type-only imports
- No `any` — use `unknown` when needed

## Constants

- Numbers live in `src/constants/numbers.const.ts` (`ZERO`, `ONE`, `DAYS_IN_WEEK`, …). Import via `@const`
- Shared strings/booleans live in `src/constants/generals.const.ts` (`EMPTY_STRING`, `BOOLEAN_TRUE`, `BOOLEAN_FALSE`, `THOUSANDS_SEPARATOR`, size/variant tokens)
- Keys live in `src/constants/keys.const.ts` (`KEY_ENTER`, `KEY_ESCAPE`, …)
- No magic numbers or raw repeated strings in logic files
- **Do not store CSS class strings in `*.const.ts`.** Write `Bear-*` / `bear-*` classes directly on the element
- Keep keymap objects (variant → classes) when 3+ branches share a key
- Delete a `*.const.ts` file when it only held class strings
- Default translations and numeric tokens still belong in const files

## Hooks

- no useeffect, callback or memo if not needed
- No `useEffect`, `useCallback`, or `useMemo` unless truly required
- Prefer derived values and event-driven updates (see **bear-js-fundamentals** skill)

## Logic check

- logic check
- Validate conditions during render before reaching for effects
- Guard clauses and early returns over nested conditionals
- Pure helpers in `*.utils.ts`, not inline in components

## Imports

- Type-only imports from `@types` (never `../../types`)
- Shared constants from `@const`
- Hooks from `@hooks`
- Context from `@context` / `@context/BearProvider` (never `../../context`)
- One `props` parameter — destructure in the body
- One component per `.tsx`. Child components go in `components/Name/` with `index.ts`
- Loop variables use real names (`node`, not `n`)
- No if/else that swaps markup inside JSX — extract an RFC
- Default icon class tokens live in `*.const.ts`; use Bear icons, not inline SVG
- Overlay z-index and numeric tokens come from `@const`, not a local magic number
- No inline `style={{}}` for layout chrome — use CSS classes or a size helper/ref. Dynamic paint (stroke, swatch color) may use style

## Component checklist

- [ ] Props/types in `*.types.ts`
- [ ] Numbers/strings in `@const` or feature `*.const.ts` (never class dumps)
- [ ] `id` via `useBearId` or prop
- [ ] `testId` for `data-testid`
- [ ] BEM `Bear-ComponentName` / `Bear-ComponentName__`
- [ ] Named exports only
- [ ] No unjustified hooks
- [ ] Structure uses `Box` / `Flex` / `Typography` / `Button` — not raw `span` / `div` / `button`
