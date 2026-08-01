# Theme overlay audit checklist

Use this when shipping portal/overlay changes so light and dark modes stay readable.

## Surfaces to check

- Dropdown / Autocomplete menus
- ContextMenu / Menu / Popover
- CommandPalette / Spotlight
- DatePicker / TimePicker / Calendar popovers
- NotificationCenter / Toast / Snackbar
- Drawer / Modal / BottomSheet / Backdrop
- BottomNavigation / Chip / PropsPlayground preview

## Rules

1. Prefer CSS variables (`--bear-bg-primary`, `--bear-text-primary`, `--bear-border-default`) or `dark:` paired classes.
2. Never ship a portaled surface with only zinc-900 / white-on-dark styles.
3. Toggle portal theme light ↔ dark on every fixed component page before release.
4. Backdrop tints should work on both themes (`bear-bg-black/50` + slightly stronger dark).

## 1.2.6 fixes

- BottomNavigation light surfaces
- Chip outlined/soft readable in light mode
- Backdrop dual-mode tint

## 1.2.7 fixes

- Autocomplete input + listbox use `--bear-bg-*` / `--bear-text-*` / `--bear-border-default` tokens
- Dropdown panel already on CSS vars; verified dual-mode readability
- EmptyState card/default surfaces moved off zinc-only classes
