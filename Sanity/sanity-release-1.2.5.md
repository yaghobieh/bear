# Bear Portal Sanity Report — release/1.2.5

**Date:** 2026-07-12
**Branch:** release/1.2.4
**Version:** 1.2.5
**Overall Status:** ❌ FAILED

---

## Code Review Gates (Static Analysis)

✅ ESLint passed

| Gate | Rule | Status | Notes |
|------|------|--------|-------|
| **G1** | No magic strings/numbers | 🔍 Manual |  |
| **G2** | No `as` casts on LiveProps | 🔍 Manual |  |
| **G3** | No HTML comments in JSX | ✅ |  |
| **G4** | No bare `<>` for layout | 🔍 Manual |  |
| **G5** | Bear primitives only (no raw div/span) | 🔍 Manual |  |
| **G6** | Keymap over chained conditions | 🔍 Manual |  |
| **G7** | One component per `.tsx` | 🔍 Manual |  |
| **G8** | SVGs in helper files | 🔍 Manual |  |
| **G9** | All user-visible text translated | 🔍 Manual |  |
| **G10** | 1 const + 1 types file per folder | 🔍 Manual |  |


---

## TypeScript Check

❌ Type errors found:
```

```


---

## Unit Tests (Vitest)

✅ Passed — 


---

## Playwright Sanity Results

| Suite | Passed | Failed | Skipped | Total |
|-------|--------|--------|---------|-------|
| Page Render (sanity) | 0 | 135 | 0 | 135 |
| Click Interactions | 0 | 119 | 0 | 119 |
| Dark Mode | 0 | 21 | 0 | 21 |

### Failed Tests

- ❌ `[dark-mode] / — dark class applied`
- ❌ `[dark-mode] / — light mode restores correctly`
- ❌ `[dark-mode] /components/button — dark class applied`
- ❌ `[dark-mode] /components/button — light mode restores correctly`
- ❌ `[dark-mode] /components/input — dark class applied`
- ❌ `[dark-mode] /components/input — light mode restores correctly`
- ❌ `[dark-mode] /components/modal — dark class applied`
- ❌ `[dark-mode] /components/modal — light mode restores correctly`
- ❌ `[dark-mode] /components/switch — dark class applied`
- ❌ `[dark-mode] /components/switch — light mode restores correctly`
- ❌ `[dark-mode] /components/card — dark class applied`
- ❌ `[dark-mode] /components/card — light mode restores correctly`
- ❌ `[dark-mode] /components/tabs — dark class applied`
- ❌ `[dark-mode] /components/tabs — light mode restores correctly`
- ❌ `[dark-mode] /components/alert — dark class applied`
- ❌ `[dark-mode] /components/alert — light mode restores correctly`
- ❌ `[dark-mode] /components/badge — dark class applied`
- ❌ `[dark-mode] /components/badge — light mode restores correctly`
- ❌ `[dark-mode] /components/typography — dark class applied`
- ❌ `[dark-mode] /components/typography — light mode restores correctly`
- ❌ `[dark-mode] theme persists across navigation`
- ❌ `[interaction] /components/accordion — no crash on click`
- ❌ `[interaction] /components/action-icon — no crash on click`
- ❌ `[interaction] /components/active-bar — no crash on click`
- ❌ `[interaction] /components/affix — no crash on click`
- ❌ `[interaction] /components/alert — no crash on click`
- ❌ `[interaction] /components/alert-dialog — no crash on click`
- ❌ `[interaction] /components/anchor — no crash on click`
- ❌ `[interaction] /components/animated-counter — no crash on click`
- ❌ `[interaction] /components/app-bar — no crash on click`
- ❌ `[interaction] /components/aspect-ratio — no crash on click`
- ❌ `[interaction] /components/autocomplete — no crash on click`
- ❌ `[interaction] /components/avatar — no crash on click`
- ❌ `[interaction] /components/back-top — no crash on click`
- ❌ `[interaction] /components/badge — no crash on click`
- ❌ `[interaction] /components/bear-loader — no crash on click`
- ❌ `[interaction] /components/biometric — no crash on click`
- ❌ `[interaction] /components/blockquote — no crash on click`
- ❌ `[interaction] /components/bottom-navigation — no crash on click`
- ❌ `[interaction] /components/bottom-sheet — no crash on click`
- ❌ `[interaction] /components/box — no crash on click`
- ❌ `[interaction] /components/breadcrumbs — no crash on click`
- ❌ `[interaction] /components/button — no crash on click`
- ❌ `[interaction] /components/button-group — no crash on click`
- ❌ `[interaction] /components/calendar — no crash on click`
- ❌ `[interaction] /components/card — no crash on click`
- ❌ `[interaction] /components/carousel — no crash on click`
- ❌ `[interaction] /components/cascader — no crash on click`
- ❌ `[interaction] /components/chart — no crash on click`
- ❌ `[interaction] /components/checkbox — no crash on click`
- ❌ `[interaction] /components/checkbox-card — no crash on click`
- ❌ `[interaction] /components/chip — no crash on click`
- ❌ `[interaction] /components/close-button — no crash on click`
- ❌ `[interaction] /components/code-block — no crash on click`
- ❌ `[interaction] /components/collapsible — no crash on click`
- ❌ `[interaction] /components/color-picker — no crash on click`
- ❌ `[interaction] /components/color-swatch — no crash on click`
- ❌ `[interaction] /components/columns — no crash on click`
- ❌ `[interaction] /components/command-palette — no crash on click`
- ❌ `[interaction] /components/container — no crash on click`
- ❌ `[interaction] /components/context-menu — no crash on click`
- ❌ `[interaction] /components/copy-button — no crash on click`
- ❌ `[interaction] /components/countdown-timer — no crash on click`
- ❌ `[interaction] /components/credit-input — no crash on click`
- ❌ `[interaction] /components/currency-input — no crash on click`
- ❌ `[interaction] /components/data-table — no crash on click`
- ❌ `[interaction] /components/date-picker — no crash on click`
- ❌ `[interaction] /components/date-range-picker — no crash on click`
- ❌ `[interaction] /components/descriptions — no crash on click`
- ❌ `[interaction] /components/diff-viewer — no crash on click`
- ❌ `[interaction] /components/divider — no crash on click`
- ❌ `[interaction] /components/dock — no crash on click`
- ❌ `[interaction] /components/drawer — no crash on click`
- ❌ `[interaction] /components/dropdown — no crash on click`
- ❌ `[interaction] /components/editable — no crash on click`
- ❌ `[interaction] /components/empty-state — no crash on click`
- ❌ `[interaction] /components/fab — no crash on click`
- ❌ `[interaction] /components/fieldset — no crash on click`
- ❌ `[interaction] /components/file-tree — no crash on click`
- ❌ `[interaction] /components/file-upload — no crash on click`
- ❌ `[interaction] /components/flex — no crash on click`
- ❌ `[interaction] /components/form — no crash on click`
- ❌ `[interaction] /components/form-control — no crash on click`
- ❌ `[interaction] /components/form-field — no crash on click`
- ❌ `[interaction] /components/gauge — no crash on click`
- ❌ `[interaction] /components/glow-card — no crash on click`
- ❌ `[interaction] /components/gradient-text — no crash on click`
- ❌ `[interaction] /components/grid — no crash on click`
- ❌ `[interaction] /components/heatmap — no crash on click`
- ❌ `[interaction] /components/highlight — no crash on click`
- ❌ `[interaction] /components/hover-card — no crash on click`
- ❌ `[interaction] /components/image — no crash on click`
- ❌ `[interaction] /components/input — no crash on click`
- ❌ `[interaction] /components/input-group — no crash on click`
- ❌ `[interaction] /components/kanban — no crash on click`
- ❌ `[interaction] /components/kbd — no crash on click`
- ❌ `[interaction] /components/link — no crash on click`
- ❌ `[interaction] /components/list — no crash on click`
- ❌ `[interaction] /components/mark — no crash on click`
- ❌ `[interaction] /components/menu — no crash on click`
- ❌ `[interaction] /components/modal — no crash on click`
- ❌ `[interaction] /components/multi-select — no crash on click`
- ❌ `[interaction] /components/number-input — no crash on click`
- ❌ `[interaction] /components/overlay — no crash on click`
- ❌ `[interaction] /components/pagination — no crash on click`
- ❌ `[interaction] /components/paper — no crash on click`
- ❌ `[interaction] /components/password-input — no crash on click`
- ❌ `[interaction] /components/popover — no crash on click`
- ❌ `[interaction] /components/progress — no crash on click`
- ❌ `[interaction] /components/radio — no crash on click`
- ❌ `[interaction] /components/scroll-area — no crash on click`
- ❌ `[interaction] /components/segmented-control — no crash on click`
- ❌ `[interaction] /components/select — no crash on click`
- ❌ `[interaction] /components/sidebar — no crash on click`
- ❌ `[interaction] /components/skeleton — no crash on click`
- ❌ `[interaction] /components/slider — no crash on click`
- ❌ `[interaction] /components/slider-range — no crash on click`
- ❌ `[interaction] /components/snackbar — no crash on click`
- ❌ `[interaction] /components/sparkline — no crash on click`
- ❌ `[interaction] /components/spinner — no crash on click`
- ❌ `[interaction] /components/split-button — no crash on click`
- ❌ `[interaction] /components/spoiler — no crash on click`
- ❌ `[interaction] /components/statistic — no crash on click`
- ❌ `[interaction] /components/stepper — no crash on click`
- ❌ `[interaction] /components/switch — no crash on click`
- ❌ `[interaction] /components/tabs — no crash on click`
- ❌ `[interaction] /components/tags-input — no crash on click`
- ❌ `[interaction] /components/theme-icon — no crash on click`
- ❌ `[interaction] /components/time-picker — no crash on click`
- ❌ `[interaction] /components/timeline — no crash on click`
- ❌ `[interaction] /components/toast — no crash on click`
- ❌ `[interaction] /components/toggle-button — no crash on click`
- ❌ `[interaction] /components/tooltip — no crash on click`
- ❌ `[interaction] /components/transfer-list — no crash on click`
- ❌ `[interaction] /components/transition — no crash on click`
- ❌ `[interaction] /components/tree-select — no crash on click`
- ❌ `[interaction] /components/tree-view — no crash on click`
- ❌ `[interaction] /components/typography — no crash on click`
- ❌ `[interaction] /components/virtual-list — no crash on click`
- ❌ `[interaction] /components/watermark — no crash on click`
- ❌ `[sanity] / renders without crash`
- ❌ `[sanity] /installation renders without crash`
- ❌ `[sanity] /theming renders without crash`
- ❌ `[sanity] /typescript renders without crash`
- ❌ `[sanity] /icons renders without crash`
- ❌ `[sanity] /changelog renders without crash`
- ❌ `[sanity] /whats-new renders without crash`
- ❌ `[sanity] /skills renders without crash`
- ❌ `[sanity] /docs/forms renders without crash`
- ❌ `[sanity] /docs/cli renders without crash`
- ❌ `[sanity] /docs/package-imports renders without crash`
- ❌ `[sanity] /docs/dark-mode renders without crash`
- ❌ `[sanity] /docs/javascript renders without crash`
- ❌ `[sanity] /docs/nextjs renders without crash`
- ❌ `[sanity] /docs/directory renders without crash`
- ❌ `[sanity] /roadmap renders without crash`
- ❌ `[sanity] /components/accordion renders without crash`
- ❌ `[sanity] /components/action-icon renders without crash`
- ❌ `[sanity] /components/active-bar renders without crash`
- ❌ `[sanity] /components/affix renders without crash`
- ❌ `[sanity] /components/alert renders without crash`
- ❌ `[sanity] /components/alert-dialog renders without crash`
- ❌ `[sanity] /components/anchor renders without crash`
- ❌ `[sanity] /components/animated-counter renders without crash`
- ❌ `[sanity] /components/app-bar renders without crash`
- ❌ `[sanity] /components/aspect-ratio renders without crash`
- ❌ `[sanity] /components/autocomplete renders without crash`
- ❌ `[sanity] /components/avatar renders without crash`
- ❌ `[sanity] /components/back-top renders without crash`
- ❌ `[sanity] /components/badge renders without crash`
- ❌ `[sanity] /components/bear-loader renders without crash`
- ❌ `[sanity] /components/biometric renders without crash`
- ❌ `[sanity] /components/blockquote renders without crash`
- ❌ `[sanity] /components/bottom-navigation renders without crash`
- ❌ `[sanity] /components/bottom-sheet renders without crash`
- ❌ `[sanity] /components/box renders without crash`
- ❌ `[sanity] /components/breadcrumbs renders without crash`
- ❌ `[sanity] /components/button renders without crash`
- ❌ `[sanity] /components/button-group renders without crash`
- ❌ `[sanity] /components/calendar renders without crash`
- ❌ `[sanity] /components/card renders without crash`
- ❌ `[sanity] /components/carousel renders without crash`
- ❌ `[sanity] /components/cascader renders without crash`
- ❌ `[sanity] /components/chart renders without crash`
- ❌ `[sanity] /components/checkbox renders without crash`
- ❌ `[sanity] /components/checkbox-card renders without crash`
- ❌ `[sanity] /components/chip renders without crash`
- ❌ `[sanity] /components/close-button renders without crash`
- ❌ `[sanity] /components/code-block renders without crash`
- ❌ `[sanity] /components/collapsible renders without crash`
- ❌ `[sanity] /components/color-picker renders without crash`
- ❌ `[sanity] /components/color-swatch renders without crash`
- ❌ `[sanity] /components/columns renders without crash`
- ❌ `[sanity] /components/command-palette renders without crash`
- ❌ `[sanity] /components/container renders without crash`
- ❌ `[sanity] /components/context-menu renders without crash`
- ❌ `[sanity] /components/copy-button renders without crash`
- ❌ `[sanity] /components/countdown-timer renders without crash`
- ❌ `[sanity] /components/credit-input renders without crash`
- ❌ `[sanity] /components/currency-input renders without crash`
- ❌ `[sanity] /components/data-table renders without crash`
- ❌ `[sanity] /components/date-picker renders without crash`
- ❌ `[sanity] /components/date-range-picker renders without crash`
- ❌ `[sanity] /components/descriptions renders without crash`
- ❌ `[sanity] /components/diff-viewer renders without crash`
- ❌ `[sanity] /components/divider renders without crash`
- ❌ `[sanity] /components/dock renders without crash`
- ❌ `[sanity] /components/drawer renders without crash`
- ❌ `[sanity] /components/dropdown renders without crash`
- ❌ `[sanity] /components/editable renders without crash`
- ❌ `[sanity] /components/empty-state renders without crash`
- ❌ `[sanity] /components/fab renders without crash`
- ❌ `[sanity] /components/fieldset renders without crash`
- ❌ `[sanity] /components/file-tree renders without crash`
- ❌ `[sanity] /components/file-upload renders without crash`
- ❌ `[sanity] /components/flex renders without crash`
- ❌ `[sanity] /components/form renders without crash`
- ❌ `[sanity] /components/form-control renders without crash`
- ❌ `[sanity] /components/form-field renders without crash`
- ❌ `[sanity] /components/gauge renders without crash`
- ❌ `[sanity] /components/glow-card renders without crash`
- ❌ `[sanity] /components/gradient-text renders without crash`
- ❌ `[sanity] /components/grid renders without crash`
- ❌ `[sanity] /components/heatmap renders without crash`
- ❌ `[sanity] /components/highlight renders without crash`
- ❌ `[sanity] /components/hover-card renders without crash`
- ❌ `[sanity] /components/image renders without crash`
- ❌ `[sanity] /components/input renders without crash`
- ❌ `[sanity] /components/input-group renders without crash`
- ❌ `[sanity] /components/kanban renders without crash`
- ❌ `[sanity] /components/kbd renders without crash`
- ❌ `[sanity] /components/link renders without crash`
- ❌ `[sanity] /components/list renders without crash`
- ❌ `[sanity] /components/mark renders without crash`
- ❌ `[sanity] /components/menu renders without crash`
- ❌ `[sanity] /components/modal renders without crash`
- ❌ `[sanity] /components/multi-select renders without crash`
- ❌ `[sanity] /components/number-input renders without crash`
- ❌ `[sanity] /components/overlay renders without crash`
- ❌ `[sanity] /components/pagination renders without crash`
- ❌ `[sanity] /components/paper renders without crash`
- ❌ `[sanity] /components/password-input renders without crash`
- ❌ `[sanity] /components/popover renders without crash`
- ❌ `[sanity] /components/progress renders without crash`
- ❌ `[sanity] /components/radio renders without crash`
- ❌ `[sanity] /components/scroll-area renders without crash`
- ❌ `[sanity] /components/segmented-control renders without crash`
- ❌ `[sanity] /components/select renders without crash`
- ❌ `[sanity] /components/sidebar renders without crash`
- ❌ `[sanity] /components/skeleton renders without crash`
- ❌ `[sanity] /components/slider renders without crash`
- ❌ `[sanity] /components/slider-range renders without crash`
- ❌ `[sanity] /components/snackbar renders without crash`
- ❌ `[sanity] /components/sparkline renders without crash`
- ❌ `[sanity] /components/spinner renders without crash`
- ❌ `[sanity] /components/split-button renders without crash`
- ❌ `[sanity] /components/spoiler renders without crash`
- ❌ `[sanity] /components/statistic renders without crash`
- ❌ `[sanity] /components/stepper renders without crash`
- ❌ `[sanity] /components/switch renders without crash`
- ❌ `[sanity] /components/tabs renders without crash`
- ❌ `[sanity] /components/tags-input renders without crash`
- ❌ `[sanity] /components/theme-icon renders without crash`
- ❌ `[sanity] /components/time-picker renders without crash`
- ❌ `[sanity] /components/timeline renders without crash`
- ❌ `[sanity] /components/toast renders without crash`
- ❌ `[sanity] /components/toggle-button renders without crash`
- ❌ `[sanity] /components/tooltip renders without crash`
- ❌ `[sanity] /components/transfer-list renders without crash`
- ❌ `[sanity] /components/transition renders without crash`
- ❌ `[sanity] /components/tree-select renders without crash`
- ❌ `[sanity] /components/tree-view renders without crash`
- ❌ `[sanity] /components/typography renders without crash`
- ❌ `[sanity] /components/virtual-list renders without crash`
- ❌ `[sanity] /components/watermark renders without crash`


---

*Generated by `portal/e2e/scripts/generate-report.mjs`*
