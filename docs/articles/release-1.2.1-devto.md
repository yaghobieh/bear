# Bear UI 1.2.1: Better Overflow UX, Better Composition, Better Release Readiness

Bear UI `1.2.1` focuses on practical component ergonomics: overflow handling, improved chart interactions, stronger portal/dropdown layering, and cleaner internal architecture for long-term maintainability.

Repository: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)

## Why this release

When teams scale a design system, most pain is not in "hello world" usage. It is in:

- constrained mobile layouts,
- layered overlays/menus/popovers,
- keyboard accessibility and interaction parity,
- and keeping code split/typed/maintainable over time.

This release addresses those exact pressure points.

## Highlights in 1.2.1

### 1) Smarter overflow across navigation components

- `Stepper` now supports `maxVisibleSteps` (number or breakpoint map).
- Horizontal steppers use a sliding visible window around `activeStep`.
- Hidden steps are reachable through left/right overflow dropdowns.

This keeps step flows usable on mobile without truncation chaos.

### 2) Breadcrumb and dropdown selection clarity

- Breadcrumb item dropdown selections are now persisted and visible.
- Hidden breadcrumb selection from ellipsis menus is preserved in UI state.
- Dropdown supports selected item state for stronger feedback.

### 3) Charts are now more interactive and accessible

- Pie/Donut slices support keyboard activation (`Tab`, `Enter`, `Space`).
- Slice hover/click APIs expanded:
  - `onSliceClick`
  - `onSliceHover`
- Tooltip composition is now Bear-native via Card primitives:
  - `sliceTooltipTitle`
  - `sliceTooltipDescription`
  - `sliceTooltipContent`

### 4) CountdownTimer readability and control upgrades

- Added `digital` variant.
- Added `separatorTypographyProps` (for `:` sizing/style control).
- Added better narrow-width behavior and typography customization.

### 5) Layering and portal reliability

- Portal/Menu/Dropdown stacking behavior was tightened for real overlay usage.
- Positioning and z-index consistency improved in practical portal scenarios.

### 6) Internal architecture cleanup

This release includes structure hardening work:

- constants moved into `*.const.ts`,
- logic extracted into `*.utils.ts` where needed,
- larger files split into focused modules (e.g., chart split),
- more consistent alias usage.

These changes reduce future regressions and improve contributor velocity.

## Breaking changes?

No intentional breaking API changes for core use cases in `1.2.1`.
Most updates are additive, with behavior improvements and better defaults.

## Who should upgrade now

Upgrade immediately if your app relies on:

- mobile step flows,
- breadcrumb/dropdown-heavy navigation,
- pie/donut chart interactivity,
- timer-heavy dashboard surfaces,
- layered overlays in portal-rich pages.

## Final note

`1.2.1` is a quality-of-use release. It keeps Bear UI fast to integrate while making edge-case behavior feel production-ready by default.
