# Bear Portal Sanity Report — release/1.2.7

**Date:** 2026-08-01
**Branch:** release/1.2.7
**Version:** 1.2.7
**Overall Status:** ✅ PASSED

---

## Code Review Gates (Static Analysis)

✅ ESLint / type-check / build verified locally before commit

---

## TypeScript Check

✅ Clean (`portal` type-check + library `tsc` via build)

---

## Unit Tests (Vitest)

✅ Passed (or no unit test files)

---

## Playwright Sanity Results

| Suite | Passed | Failed | Skipped | Total |
|-------|--------|--------|---------|-------|
| Smoke (`BEAR_E2E_SMOKE=1`) | 9 | 0 | 0 | 9 |

### Passed Tests

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

*Verified with `PLAYWRIGHT_BROWSERS_PATH=0` after Chromium install.*
