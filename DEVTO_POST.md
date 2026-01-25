# Bear UI: 50+ React Components, Zero Config Required

**Tags (dev.to — use hyphens, no spaces):** `bear-ui` `react` `typescript` `tailwindcss` `uicomponents` `zeroconfig` `frontend`

---

**Bear UI** is a production-ready React component library built with Tailwind CSS and TypeScript. It’s part of the [ForgeStack](https://bearui.com) ecosystem and aims to be the “protective force” for your frontend — strong, reliable, and easy to use.

Whether you’re building dashboards, admin panels, or customer-facing apps, Bear UI gives you 50+ components so you can ship faster without compromising quality.

---

## Why Bear UI?

### Benefits

- **Zero config** — Works out of the box. Install, import CSS, and start building.
- **Tailwind-powered** — Uses Tailwind CSS for styling. No separate design system to learn.
- **Type-safe** — Full TypeScript support and exported types for every component.
- **Accessible** — ARIA attributes and keyboard navigation built in.
- **Tree-shakeable** — Import only what you use. Keeps bundle size lean.
- **Customizable** — Override styles via Tailwind. No fighting the library.
- **Production-ready** — Built for real apps, not just demos.

### Who is it for?

- React developers who want to move fast
- Teams standardizing on Tailwind
- Projects that need TypeScript + accessibility
- Anyone tired of wiring up the same UI patterns from scratch

---

## Key Features

| Feature | Description |
|--------|-------------|
| **50+ components** | Layout, forms, data display, navigation, overlays, feedback, and more |
| **React 18+** | Targets modern React |
| **Tailwind CSS** | Styling via utility classes, no extra CSS framework |
| **TypeScript** | Types for all components and props |
| **Accessible** | ARIA, focus management, keyboard support |
| **ESM + CJS** | Works with any bundler |
| **MIT License** | Free for personal and commercial use |

---

## Component Overview

### Layout
`Container`, `Flex`, `Grid`, `GridItem` — responsive layout primitives.

### UI
`Button`, `ButtonGroup`, `Card`, `Badge`, `Paper`, `Divider`, `Typography`, `Link`.

### Forms
`Input`, `Select`, `MultiSelect`, `Checkbox`, `Radio`, `Switch`, `Autocomplete`, `TransferList`, `FileUpload`, `NumberInput`, `OTPInput`, `ColorPicker`, `DatePicker`, `TimePicker`, `Slider`.

### Feedback
`Alert`, `Spinner`, `Rating`, `Progress`, `Skeleton`, `Toast`, `BearLoader`.

### Overlays
`Modal`, `Drawer`, `Tooltip`, `Popover`, `Menu`, `Dropdown`, `SpeedDial`.

### Data display
`DataTable`, `Carousel`, `Accordion`, `Tabs`, `List`, `Avatar`, `Chip`, `TreeView`, `Timeline`, `Statistic`, `EmptyState`, `Image`.

### Navigation
`Breadcrumbs`, `Stepper`, `BottomNavigation`, `AppBar`, `Pagination`.

### Utilities
`ScrollArea`, `Collapsible`, `Kbd`, `CopyButton`, `Icon`, `BearIcons`, `BearLogo`.

---

## Quick Start

**1. Install from npm**

```bash
npm install @forgedevstack/bear
# or
pnpm add @forgedevstack/bear
# or
yarn add @forgedevstack/bear
```

**2. Import CSS** (required, once per app)

```tsx
import '@forgedevstack/bear/styles.css';
```

**3. Use components**

```tsx
import { Button, Card, CardHeader, CardBody } from '@forgedevstack/bear';

function App() {
  return (
    <Card>
      <CardHeader>
        <h2>Welcome to Bear</h2>
      </CardHeader>
      <CardBody>
        <Button variant="primary">Get Started</Button>
      </CardBody>
    </Card>
  );
}
```

---

## Links

- **Documentation & live examples:** [https://bearui.com](https://bearui.com)
- **npm package:** [https://www.npmjs.com/package/@forgedevstack/bear](https://www.npmjs.com/package/@forgedevstack/bear)

---

## Coming Soon

- **Data & Calendar** — Richer data components and more calendar options (ranges, presets, etc.).
- **Style hook** — A hook to control or extend styling consistently across components.

---

## Summary

Bear UI is a modern, Tailwind-based React component library with TypeScript, accessibility, and zero-config setup. If you’re building React apps and want to focus on product logic instead of reinventing UI, it’s worth a look.

Try it on the [portal](https://bearui.com) or install via [npm](https://www.npmjs.com/package/@forgedevstack/bear) and drop it into your next project.
