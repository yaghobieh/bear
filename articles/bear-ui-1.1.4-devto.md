# Bear UI v1.1.4: 22+ New Components, LOC Badges, and a Better Docs Experience

**@forgedevstack/bear** is a React UI library built with Tailwind CSS — zero config, TypeScript-first, and part of the ForgeStack ecosystem. Version **1.1.4** adds over 22 new components, improves docs with lines-of-code badges, and keeps dark/light theming and customization front and center.

![Bear UI Portal — hero](screenshots/portal-hero.png)

*Explore all components at [Bear UI Portal](https://bearui.com/).*

---

## What’s in 1.1.4?

### New components (high level)

- **Feedback & overlays:** Popconfirm, Result (success/error/404/403/500), LoadingOverlay  
- **Data & layout:** Descriptions (key-value), Anchor (scroll-spy TOC), Affix (sticky), RingProgress, Spoiler  
- **Form & selection:** CheckboxCard, RadioCard, Fieldset  
- **UI primitives:** Blockquote, Indicator (badge/dot), ActionIcon (icon-only button)  
- **Already in 1.1.3:** DateRangePicker, TreeSelect, ImageGallery/Lightbox, ContextMenu, NumberFormatter, InfiniteScroll, ColorSwatch, SplitButton  

All of these support **BearProvider** (dark/light, custom colors/variants) and use **Typography** for text so you can control appearance via props.

### Docs: lines-of-code badges

Component docs now show a small **lines-of-code (LOC) badge** next to each component name — same idea as the HoverCard screenshot below. Green = smaller footprint; the badge helps you see at a glance how much code each piece adds.

![HoverCard page with LOC badge](screenshots/hovercard-loc-badge.png)

*Component pages use the same LOC badge pattern across the portal.*

---

## Quick start

```bash
npm install @forgedevstack/bear
```

```tsx
// App or main entry
import '@forgedevstack/bear/styles.css';

import { Button, Card, CardHeader, CardBody, Popconfirm, Result } from '@forgedevstack/bear';

function App() {
  return (
    <Card>
      <CardHeader>Welcome</CardHeader>
      <CardBody>
        <Popconfirm title="Delete this?" onConfirm={() => console.log('Deleted')}>
          <Button variant="outline">Delete</Button>
        </Popconfirm>
      </CardBody>
    </Card>
  );
}
```

![Install and first import](screenshots/installation-code.png)

---

## New components in action

### Popconfirm — inline confirmation

Use instead of a heavy modal for simple “Are you sure?” flows.

```tsx
<Popconfirm
  title="Delete this item?"
  description="This cannot be undone."
  variant="danger"
  onConfirm={handleDelete}
>
  <Button variant="outline">Remove</Button>
</Popconfirm>
```

### Result — full-page feedback

Ideal for success, error, 404, 403, or 500 pages.

```tsx
<Result
  status="404"
  title="Page Not Found"
  subtitle="The page you're looking for doesn't exist."
  extra={<Button onClick={goHome}>Go Home</Button>}
/>
```

### Anchor — scroll-spy navigation

Table-of-contents style nav that highlights the active section.

```tsx
<Anchor
  links={[
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API', children: [
      { id: 'props', label: 'Props' },
      { id: 'events', label: 'Events' },
    ]},
  ]}
/>
```

![Anchor scroll-spy](screenshots/anchor-scroll-spy.png)

### CheckboxCard & RadioCard

Cards that act as checkboxes or radios — great for plans, options, or multi/single selection.

```tsx
<RadioCardGroup value={plan} onChange={setPlan} columns={3}>
  <RadioCard value="free" label="Free" description="$0/mo" />
  <RadioCard value="pro" label="Pro" description="$19/mo" />
  <RadioCard value="enterprise" label="Enterprise" description="Custom" />
</RadioCardGroup>
```

### RingProgress, Spoiler, Blockquote, and more

- **RingProgress** — SVG ring with one or more segments and optional center label.  
- **Spoiler** — “Show more / Show less” with a configurable max height.  
- **Blockquote** — Styled quote with left border and color variants.  
- **ActionIcon** — Icon-only button with variants and loading state.  
- **Fieldset** — Semantic grouping with legend and description.  
- **Indicator** — Small dot/badge on any element (e.g. status, count).  

![New components overview](screenshots/new-components-grid.png)

---

## Theming (dark/light + custom)

Wrap your app in **BearProvider** to get dark/light mode and optional custom colors/variants:

```tsx
import { BearProvider, Button } from '@forgedevstack/bear';

<BearProvider
  defaultMode="dark"
  customVariants={{
    brand: { bg: '#6366f1', text: '#fff', hoverBg: '#4f46e5' },
  }}
>
  <Button variant="brand">Custom variant</Button>
</BearProvider>
```

![Dark theme components](screenshots/components-dark.png)

![Light theme components](screenshots/components-light.png)

---

## Modular CSS with @BearInclude

If you don’t want the full bundle, use the PostCSS plugin and import only what you need:

```css
@BearIncludeAll; /* or */
@BearInclude 'base';
@BearInclude 'buttons';
@BearInclude 'alerts';
```

See the [portal Installation page](https://bearui.com/installation) for setup.

---

## Where to go from here

- **Portal:** [bearui.com](https://bearui.com/) — all components, live examples, and API.  
- **npm:** [@forgedevstack/bear](https://www.npmjs.com/package/@forgedevstack/bear)  
- **Changelog:** [GitHub CHANGELOG.md](https://github.com/yaghobieh/bear/blob/main/CHANGELOG.md) for the full 1.1.4 list.

Bear UI v1.1.4 keeps the same “strong, reliable, Tailwind-powered” approach while adding a lot of new building blocks and a clearer docs experience with LOC badges. If you’re building a React app and want a single design system with dark mode and room to customize, Bear is worth a look.

---

*Part of [ForgeStack](https://forgedevstack.com/) — React, Compass, Synapse, Grid Table, and more.*
