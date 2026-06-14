---
name: bear-js-fundamentals
description: JavaScript fundamentals for Bear development — Promises, event loop, when to avoid useEffect/useCallback/useMemo. Use when writing or reviewing Bear component logic.
---

# Bear JS Fundamentals

## Promises

- **Creation:** `new Promise((resolve, reject) => { ... })`
- **Chaining:** `.then()` / `.catch()` / `.finally()` — each returns a new Promise
- **async/await:** syntactic sugar over Promises; errors propagate via `try/catch`
- **Parallel:** `Promise.all([...])` waits for all; `Promise.race([...])` resolves on first settle
- **Error propagation:** unhandled rejections surface in console; always handle or rethrow

## Event loop

Execution order:

1. **Call stack** — synchronous code runs to completion
2. **Microtask queue** — Promise callbacks, `queueMicrotask`, `MutationObserver`
3. **Macrotask queue** — `setTimeout`, `setInterval`, DOM events, `requestAnimationFrame`

Why this matters in React:

- State updates from events batch; effects run **after** paint (microtasks flush first)
- `await` in an event handler yields to microtasks before continuing
- Avoid assuming immediate DOM reads after `setState` — use refs or effects only when syncing with external DOM

## Bear rule: prefer logic over effects

- **Derive state** from props/state instead of syncing with `useEffect`
- **Event handlers** for user actions — not effects watching the same state
- **Refs** for imperative DOM or values that should not trigger re-render

Reach for `useEffect` only for:

- Subscriptions (WebSocket, listeners) with cleanup
- Imperative third-party library integration
- Syncing with external non-React systems (localStorage, URL)

## When useCallback / useMemo are justified

- Passing stable callbacks to **memoized child** components that depend on referential equality
- Expensive pure computations that would run every render without memo
- Custom hooks that return stable function references for dependency arrays

Do **not** wrap every handler or object in `useCallback`/`useMemo` by default — measure need first.

## Logic check before effects

Ask in order:

1. Can this be computed during render from existing props/state?
2. Can this run in the event handler that caused the change?
3. Can a ref hold the value without re-render?
4. Only then: does this need `useEffect`?
