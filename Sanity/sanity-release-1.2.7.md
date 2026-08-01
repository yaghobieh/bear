# Bear Portal Sanity Report — release/1.2.7

**Date:** 2026-08-01
**Branch:** release/1.2.7
**Version:** 1.2.7
**Overall Status:** ✅ PASSED

---

## Code Review Gates (Static Analysis)

✅ ESLint passed (pre-commit / prior run)

---

## TypeScript Check

✅ Portal `npm run type-check` clean

---

## Unit Tests (Vitest)

✅ Passed (no failures; empty suite skipped if none)

---

## Playwright Sanity Results

| Suite | Passed | Failed | Skipped | Total |
|-------|--------|--------|---------|-------|
| Smoke critical paths | 9 | 0 | 0 | 9 |

### Passed

- ✅ `[smoke] / renders`
- ✅ `[smoke] /components/button renders`
- ✅ `[smoke] /components/input renders`
- ✅ `[smoke] /components/select renders`
- ✅ `[smoke] /theming renders`
- ✅ `[smoke] dark class applies from Bear theme storage`
- ✅ `[smoke] default home renders without crash in light storage`
- ✅ `[smoke] RTL direction applies from Bear direction storage`
- ✅ `[smoke] Toast live region announces without focus steal`

---

*Verified locally with `BEAR_E2E_SMOKE=1 PLAYWRIGHT_BROWSERS_PATH=0` before release commit.*
