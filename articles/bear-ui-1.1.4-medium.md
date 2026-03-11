# Bear UI v1.1.4: More Components, Clearer Docs, Same Tailwind-Powered Stack

**Bear UI** (@forgedevstack/bear) is a React component library built on Tailwind CSS. It’s part of the ForgeStack ecosystem and focuses on **zero config**, **TypeScript**, and **dark/light theming**. The latest release, **v1.1.4**, ships more than 22 new components and improves the documentation with **lines-of-code badges** so you can see each component’s size at a glance.

![Bear UI Portal — hero](screenshots/portal-hero.png)

---

## Why Bear?

- **Tailwind-powered** — No extra design runtime; you stay in the utility-first world.
- **React 18+** — Built for modern React with hooks and TypeScript.
- **50+ components** — Buttons, forms, overlays, data display, navigation, and more.
- **Theme-ready** — `BearProvider` gives you dark/light mode and custom colors and variants.
- **Documentation** — The [Bear UI Portal](https://bearui.com/) has live examples and API docs for every component.

Version 1.1.4 extends this with new building blocks and a clearer docs experience.

---

## What’s New in 1.1.4?

### New components

- **Popconfirm** — Inline “Are you sure?” confirmation (no modal).
- **Result** — Full-page feedback for success, error, 404, 403, 500.
- **Descriptions** — Key-value layout for profiles, settings, and details.
- **Anchor** — Scroll-spy navigation (table of contents).
- **Affix** — Sticky elements (e.g. headers or actions).
- **RingProgress** — Circular progress with one or more segments.
- **Spoiler** — “Show more / Show less” with smooth expand/collapse.
- **LoadingOverlay** — Overlay + spinner over any container.
- **Blockquote** — Styled quotes with border and color variants.
- **Indicator** — Small badge/dot on any element (e.g. status, count).
- **CheckboxCard & RadioCard** — Selectable cards for plans or options.
- **ActionIcon** — Icon-only button with variants and loading state.
- **Fieldset** — Semantic form grouping with legend and description.

Plus components already added in 1.1.3: DateRangePicker, TreeSelect, ImageGallery/Lightbox, ContextMenu, NumberFormatter, InfiniteScroll, ColorSwatch, SplitButton.

### Docs: lines-of-code badges

Each component page on the portal now shows a **lines-of-code badge** next to the title — similar to the HoverCard example below. It’s a quick way to see how much code each component adds (green = smaller).

![HoverCard page with LOC badge](screenshots/hovercard-loc-badge.png)

---

## Try it in 30 seconds

```bash
npm install @forgedevstack/bear
```

In your app, import the styles once, then use any component:

```tsx
import '@forgedevstack/bear/styles.css';
import { Button, Popconfirm, Result } from '@forgedevstack/bear';

// Inline confirmation
<Popconfirm title="Delete?" onConfirm={handleDelete}>
  <Button>Delete</Button>
</Popconfirm>

// Full-page result
<Result status="success" title="Done!" subtitle="Your changes were saved." />
```

![Install and first import](screenshots/installation-code.png)

---

## Theming: dark, light, and your brand

Wrap the app in **BearProvider** to enable dark/light mode and optional custom variants:

```tsx
import { BearProvider } from '@forgedevstack/bear';

<BearProvider defaultMode="dark" customVariants={{ brand: { bg: '#6366f1', text: '#fff' } }}>
  <YourApp />
</BearProvider>
```

Text uses the **Typography** component so you can control appearance via props and your theme.

![Dark theme](screenshots/components-dark.png)

![Light theme](screenshots/components-light.png)

---

## Learn more

- **Portal:** [bearui.com](https://bearui.com/) — components, examples, and docs.
- **npm:** [@forgedevstack/bear](https://www.npmjs.com/package/@forgedevstack/bear)
- **ForgeStack:** [forgedevstack.com](https://forgedevstack.com/)

Bear UI v1.1.4 keeps the same pragmatic, Tailwind-based approach while adding many new components and a clearer way to see their size in the docs. If you’re building a React app and want a single design system with dark mode and room to customize, Bear is worth a look.

![New components overview](screenshots/new-components-grid.png)

---

*Bear UI is part of ForgeStack — React, Compass, Synapse, Grid Table, and more.*
