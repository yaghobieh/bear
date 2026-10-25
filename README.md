# @forgedevstack/bear

React components, a theme provider, and AeroCraft tokens. Version 1.3.6 in this repository. Publishing happens when this release is merged to main.

Author: John Yaghobieh. Docs: [bearui.com](https://bearui.com). Package: [@forgedevstack/bear](https://www.npmjs.com/package/@forgedevstack/bear).

## Install

```bash
npm install @forgedevstack/bear
```

That install is the component set and the theme. Icons are a separate package. Charts still ship inside the core build today, and they also have a dedicated package entry so you can import them on their own.

```bash
npm install @forgedevstack/bear-grid
npm install @forgedevstack/bear-blocks
npm install @forgedevstack/bear-icons
npm install @forgedevstack/bear-x-charts
npm install @forgedevstack/bear-x-ai
npm install @forgedevstack/bear-x-code
npm install @forgedevstack/bear-map
npm install @forgedevstack/kanban
npm install @forgedevstack/calendar
```

`@forgedevstack/bear-icons` and `@forgedevstack/calendar` are on npm (`calendar` is 1.0.1 there; 1.0.2 with the event calendar is in this repo). Charts, AI, code, map, and kanban are not on npm yet.

Media playback stays [Torch](https://www.npmjs.com/package/@forgedevstack/torch). The rich text editor stays [Ink](https://www.npmjs.com/package/@forgedevstack/ink).

## Bundle size

Sizes change with each publish. Open Bundlephobia for the package you are about to add:

- [Core](https://bundlephobia.com/package/@forgedevstack/bear)
- [Icons](https://bundlephobia.com/package/@forgedevstack/bear-icons)
- [Charts](https://bundlephobia.com/package/@forgedevstack/bear-x-charts)
- [AI](https://bundlephobia.com/package/@forgedevstack/bear-x-ai)
- [Code](https://bundlephobia.com/package/@forgedevstack/bear-x-code)
- [Map](https://bundlephobia.com/package/@forgedevstack/bear-map)
- [Kanban](https://bundlephobia.com/package/@forgedevstack/kanban)
- [Calendar](https://bundlephobia.com/package/@forgedevstack/calendar)

The portal product pages and the libraries page have the same link as a button.

## Provider

Import the stylesheet once, then wrap the tree.

```tsx
import '@forgedevstack/bear/styles.css';
import { BearProvider, Button, Card, CardBody, Typography } from '@forgedevstack/bear';

export function App() {
  return (
    <BearProvider
      colorScheme="system"
      theme={{ colors: { primary: '#ec4899' } }}
    >
      <Card>
        <CardBody>
          <Typography variant="h4">Bear</Typography>
          <Button variant="primary">Save</Button>
        </CardBody>
      </Card>
    </BearProvider>
  );
}
```

`colorScheme` is `light`, `dark`, or `system`. Dark mode follows the `.dark` class from the provider.

## Charts

```tsx
import { BarChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';

<BarChart
  data={[
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 45 },
  ]}
  showLabels
/>
```

Chart views in this repo: `bar`, `line`, `area`, `pie`, `donut`, `radar`, `funnel`, `stacked`. Pie also has `full`, `half`, and `rose`. Sparkline, Gauge, RingProgress, Heatmap, and TimelineChart sit next to those. Motion is `grow`, `fade`, `scale`, or `none`, and `animated` is a boolean. These are zero-dependency SVG charts. They are not Chart.js plugins.

## Icons

```tsx
import { SearchIcon } from '@forgedevstack/bear-icons';

<SearchIcon size={24} />
```

## Calendar

Peer of Bear. 1.0.2 adds the event month and the resource timeline. Popups and filters use Bear.

```tsx
import { EventCalendar, EventTimeline } from '@forgedevstack/calendar';
import '@forgedevstack/calendar/styles.css';
import '@forgedevstack/bear/styles.css';

<EventCalendar events={events} mode="dark" />
<EventTimeline events={events} />
```

## Map and kanban

```tsx
import { Map } from '@forgedevstack/bear-map';
import { Kanban } from '@forgedevstack/kanban';
```

Hooks stay on core. Date pickers stay on core.

## CLI

Forge CLI is the installer that exists today.

```bash
npx create-forge my-app
```

When you select Bear, the CLI prints the Lotso mascot and asks which libraries to include: icons, charts, AI, code, map, kanban, and calendar. It then asks for the primary color. `--yes` selects Bear and those libraries.

Add one package to an existing app:

```bash
forge add bear
forge add bear-icons
forge add calendar
```

`forge add bear` asks the same library question. Icons and calendar install from npm. Charts, AI, code, map, and kanban are recorded in a comment in `src/main.tsx` until those packages are published, so the install does not fail on a missing package.

`npx @forgedevstack/bear-cli` is the name reserved for a Bear-only binary. That binary is not published, so those commands do not run yet.

## What 1.3.6 adds

- `bear_flutter` in `packages/bear_flutter`. Free widgets on the Bear tokens.
- `@forgedevstack/bear-grid`. Pin, grouping, and Excel export. The watermark clears with a license key. Pro is $9 a year. DataTable stays free.
- `@forgedevstack/bear-blocks`. Free `DashboardBlock`.
- Portal pricing, Storybook entries, and sandbox recipes.
- A Bear editor is coming. That work is being built in Ingot.

## What 1.3.5 adds

- Optional packages: `@forgedevstack/bear-x-charts`, `@forgedevstack/bear-x-ai`, `@forgedevstack/bear-x-code`, `@forgedevstack/bear-map`, `@forgedevstack/kanban`.
- Overlay open and close motion on the panel: `none`, `fade`, `slide-down`, `scale`, `fold`, `elastic`, `reveal`, `expand`. The default is `fold`.
- Portal product pages for each library, with a Bundlephobia button.
- `@forgedevstack/calendar` 1.0.2: event calendar, resource filter, side editor, and timeline.

## Components

| Area | Examples |
|---|---|
| Actions | Button, ButtonGroup, ToggleGroup, FAB, SplitButton |
| Forms | Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker |
| Overlays | Modal, Drawer, AlertDialog, Popover, Tooltip, Menu, CommandPalette |
| Feedback | Alert, Toast, Spinner, Progress, Skeleton, Badge |
| Layout | Container, Flex, Grid, Paper, Divider, ScrollArea |
| Data | DataTable, Chart, Calendar, Timeline |

## Scripts

```bash
npm run build
cd portal && npm run test:e2e:smoke
```

## License

MIT. John Yaghobieh and the ForgeStack team.
