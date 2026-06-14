# MUI Parity Reference

Living document mapping Material UI patterns to Bear equivalents.

## Styling

| MUI | Bear | Notes |
|-----|------|-------|
| `sx` | `bis` | Theme-aware style overrides via `useBearStyles` |
| `styled()` | `bearStyled` hook | CSS-in-JS via inline styles + theme |
| `ThemeProvider` | `BearProvider` | Light/dark, tokens, custom variants |
| `CssBaseline` | `CssBaseline` | Global reset (1.2.4) |

## BearProvider (1.2.4)

| MUI | Bear |
|-----|------|
| `theme.components.defaultProps` | `defaultProps` on `BearProvider` |
| `direction: 'rtl'` | `direction` + `useBearDirection()` |
| `density` | `density: 'comfortable' \| 'compact'` |
| Controlled `mode` | `mode` + `onModeChange` |

## Components

| MUI | Bear | Status |
|-----|------|--------|
| `Button` | `Button` | `disableRipple`, `href`, `component`, `disableElevation` (1.2.4) |
| `TextField` | `Input` / `FormField` | `multiline`, `rows`, adornments |
| `FormControl` | `FormControl` | New in 1.2.4 |
| `ToggleButton` | `ToggleButton` / `ToggleButtonGroup` | New in 1.2.4 |
| `Snackbar` | `Snackbar` | New in 1.2.4 |
| `Select` | `Select` | `displayEmpty`, `renderValue`, `native` (types 1.2.4) |
| `Modal` | `Modal` | `disableEscapeKeyDown`, `hideBackdrop`, `keepMounted` |
| `Drawer` | `Drawer` | `anchor`, `variant` |
| `Skeleton` | `Skeleton`, `CardSkeleton`, `TableSkeleton`, `FormSkeleton` | |

## IDs

| MUI | Bear |
|-----|------|
| Implicit / `id` prop | `id` prop or `useBearId('ComponentName')` |
| `data-testid` | `testId` prop |

## Deferred

- `slotProps` / `slots` — partial via `createSlots` (FormControl, Modal planned)
- Full `theme.components.styleOverrides` wiring for all components
- `createTheme()` composable builder
