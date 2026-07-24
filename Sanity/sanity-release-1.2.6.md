# Sanity Report — Bear 1.2.6

**Date:** 2026-07-24
**Branch:** release/1.2.6 → main
**Version:** 1.2.6
**Overall Status:** ✅ PASSED

---

## Pre-commit gates

| Gate | Status |
|------|--------|
| ESLint | ✅ Passed |
| TypeScript | ✅ Clean |
| Vitest | ○ Skipped (no unit test files) |
| Playwright smoke (`BEAR_E2E_SMOKE=1`) | ✅ Passed |

---

## Playwright Smoke Results

| Suite | Result |
|-------|--------|
| Critical-path smoke | ✅ Passed (pre-commit on release/1.2.6) |

Includes page render for `/`, button, input, select, theming; dark class from theme storage; light storage home render.

### Infra notes

- Root cause of prior **0/275** reports: Playwright Chromium binary missing + e2e webServer not building Bear first.
- Fixes: `npx playwright install chromium`, webServer builds Bear before portal e2e, smoke suite + CI workflow `.github/workflows/e2e-smoke.yml`.
- Theme helpers write both `bear-portal-theme` and `bear-theme-mode`.

---

## Library / Portal builds

- `npm run build` ✅
- `cd portal && npm run build` ✅ (Vercel path)

---

## Release scope check

- #18 Select native / displayEmpty / renderValue
- #19 MessageList virtualization
- #20 RTL wiring
- #21 Toast aria-live
- #22 Theme overlay audit
- #23 Playwright sanity repair
- #24 Portal Phase 6 (category landings + search history)
- New: Backdrop, ChipGroup, AppBar dense/gutters, Progress buffer, ListItem secondaryAction
