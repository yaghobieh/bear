# Shipping Bear UI 1.2.1: Engineering for Real-World Component Behavior

In Bear UI `1.2.1`, we focused on one principle: **a design system should stay predictable under pressure**.

Repository: [https://github.com/yaghobieh/bear](https://github.com/yaghobieh/bear)

That means handling:

- overflow on small screens,
- deeply nested navigation patterns,
- keyboard parity for interactive charts,
- reliable layering for portal/dropdown/menu stacks,
- and maintainable source structure as the library grows.

## What changed and why

## Overflow became a first-class concern

`Stepper` now supports `maxVisibleSteps` with either:

- a fixed number, or
- responsive breakpoint maps.

On horizontal layouts, we now render a sliding window around the active step and expose hidden steps through overflow dropdown controls. This prevents timeline collapse on mobile while preserving direct navigation.

## Selection state became explicit

Breadcrumb and dropdown flows now keep selected values visible after interaction. We improved discoverability and reduced ambiguous states where users could choose an option but see no visual confirmation.

## Pie/Donut charts became keyboard and composition friendly

Slices now support keyboard activation (`Enter`/`Space`), which improves accessibility and interaction consistency.

We also expanded chart APIs for richer interaction:

- `onSliceClick`
- `onSliceHover`
- `sliceTooltipTitle`
- `sliceTooltipDescription`
- `sliceTooltipContent`

Instead of ad-hoc tooltip markup, chart popups can be rendered through Bear Card composition, aligning the experience with the rest of the system.

## CountdownTimer gained better typography control

We introduced:

- `digital` variant,
- separator customization via `separatorTypographyProps`,
- stronger narrow-width behavior.

This makes timer-heavy UI (dashboards, launches, campaign clocks) easier to style without brittle overrides.

## Structural improvements matter long-term

A large portion of `1.2.1` is architecture hygiene:

- moving magic values into `*.const.ts`,
- extracting reusable logic into `*.utils.ts`,
- splitting oversized files into focused modules,
- enforcing clearer component boundaries.

These are not cosmetic changes—they are the difference between velocity and entropy when a library grows.

## Practical takeaway

`1.2.1` is less about one headline feature and more about trust:

- trust that components behave well on real screens,
- trust that interactions are clear and accessible,
- trust that the codebase stays maintainable for future contributors.

If your product uses Bear in high-interaction surfaces, this release is worth adopting now.
