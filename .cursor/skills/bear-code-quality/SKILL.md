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

- contant and .const file
- constant and .const file
- No magic numbers — extract to `*.const.ts` or `numbers.const.ts`
- No string, we are using const
- No raw string literals for repeated values — use named constants in `*.const.ts`
- Default translations, BEM classes, size maps, z-indexes belong in const files

## Hooks

- no useeffect, callback or memo if not needed
- No `useEffect`, `useCallback`, or `useMemo` unless truly required
- Prefer derived values and event-driven updates (see **bear-js-fundamentals** skill)

## Logic check

- logic check
- Validate conditions during render before reaching for effects
- Guard clauses and early returns over nested conditionals
- Pure helpers in `*.utils.ts`, not inline in components

## Component checklist

- [ ] Props/types in `*.types.ts`
- [ ] Constants in `*.const.ts`
- [ ] `id` via `useBearId` or prop
- [ ] `testId` for `data-testid`
- [ ] BEM `Bear-*` classes
- [ ] Named exports only
- [ ] No unjustified hooks
