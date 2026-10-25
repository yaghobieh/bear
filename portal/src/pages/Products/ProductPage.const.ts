import type { MapTileProvider } from '@forgedevstack/bear-map';
import type { PortalCopyKey } from '@/components/Topbar/Topbar.types';
import type { ProductId, ProductPageData } from './ProductPage.types';

export const MAP_PREVIEW_HEIGHT = 280;

export const MAP_TILE_OPTIONS: { id: MapTileProvider; labelKey: PortalCopyKey }[] = [
  { id: 'openstreetmap', labelKey: 'mapTileStreet' },
  { id: 'cartodb-light', labelKey: 'mapTileLight' },
  { id: 'cartodb-dark', labelKey: 'mapTileDark' },
  { id: 'stamen-terrain', labelKey: 'mapTileTerrain' },
];

export const PRODUCT_CHART_HEIGHT = 180;

export const PRODUCT_CHART_DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

export const PRODUCT_CHAT_MESSAGES = [
  { id: '1', content: 'Hello. How can I help?', sender: 'bot' as const },
  { id: '2', content: 'Show me the Bear X chat package.', sender: 'user' as const, status: 'read' as const },
];

export const PRODUCT_CODE_SAMPLE = `import { Button } from '@forgedevstack/bear';

export const Demo = () => <Button>Click me</Button>;
`;

export const PRODUCT_MAP_MARKERS = [
  { id: '1', lat: 40.7128, lng: -74.006, label: 'New York' },
  { id: '2', lat: 51.5074, lng: -0.1278, label: 'London' },
];

export const PRODUCT_MAP_VIEWPORT = { lat: 40.7128, lng: -74.006, zoom: 3 };

export const PRODUCT_KANBAN_COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [{ id: '1', title: 'Package page', description: 'Rendered from @forgedevstack/kanban' }],
  },
  { id: 'doing', title: 'In Progress', cards: [{ id: '2', title: 'Portal link' }] },
  { id: 'done', title: 'Done', cards: [{ id: '3', title: 'Core export kept' }] },
];

export const PRODUCT_PAGES: Record<ProductId, ProductPageData> = {
  flutter: {
    id: 'flutter',
    packageName: 'bear_flutter',
    install: `flutter pub add bear_flutter

import 'package:bear_flutter/bear_flutter.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return const BearTheme(
      data: BearThemeData(),
      child: BearButton(label: 'Continue'),
    );
  }
}`,
    docLinks: [
      { label: 'Pricing', path: '/pricing' },
      { label: 'Theming', path: '/theming' },
    ],
  },
  grid: {
    id: 'grid',
    packageName: '@forgedevstack/bear-grid',
    install: `npm install @forgedevstack/bear @forgedevstack/bear-grid

import { BearGrid } from '@forgedevstack/bear-grid';

export const App = () => (
  <BearGrid
    licenseKey={process.env.BEAR_PRO_LICENSE_KEY}
    excelExport
    columns={[{ key: 'name', header: 'Name', pinned: 'left', sortable: true }]}
    data={[{ name: 'Ada' }]}
    rowKey={(row) => row.name}
  />
);`,
    docLinks: [
      { label: 'DataTable', path: '/components/data-table' },
      { label: 'Pricing', path: '/pricing' },
    ],
  },
  blocks: {
    id: 'blocks',
    packageName: '@forgedevstack/bear-blocks',
    install: `npm install @forgedevstack/bear @forgedevstack/bear-blocks

import { DashboardBlock } from '@forgedevstack/bear-blocks';

export const App = () => (
  <DashboardBlock stats={[{ id: 'users', title: 'Users', value: '1.2k' }]} />
);`,
    docLinks: [{ label: 'StatCard', path: '/components/stat-card' }],
  },
  charts: {
    id: 'charts',
    packageName: '@forgedevstack/bear-x-charts',
    install: `npm install @forgedevstack/bear-x-charts

import { BearProvider, BarChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';

const data = [{ label: 'Jan', value: 30 }];

export const App = () => (
  <BearProvider>
    <BarChart data={data} showLabels />
  </BearProvider>
);`,
    docLinks: [
      { label: 'Chart', path: '/components/chart' },
      { label: 'Sparkline', path: '/components/sparkline' },
      { label: 'Gauge', path: '/components/gauge' },
    ],
  },
  ai: {
    id: 'ai',
    packageName: '@forgedevstack/bear-x-ai',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-ai',
    docLinks: [
      { label: 'Chat', path: '/components/chat' },
      { label: 'AI chat kit', path: '/components/ai-chat' },
      { label: 'FloatingChat', path: '/components/floating-chat' },
    ],
  },
  code: {
    id: 'code',
    packageName: '@forgedevstack/bear-x-code',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-code',
    docLinks: [
      { label: 'CodeEditor', path: '/components/code-editor' },
      { label: 'Terminal', path: '/components/terminal' },
      { label: 'DiffViewer', path: '/components/diff-viewer' },
      { label: 'JsonViewer', path: '/components/json-viewer' },
    ],
  },
  map: {
    id: 'map',
    packageName: '@forgedevstack/bear-map',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-map',
    docLinks: [{ label: 'Map', path: '/components/map' }],
  },
  kanban: {
    id: 'kanban',
    packageName: '@forgedevstack/kanban',
    install: 'npm install @forgedevstack/bear @forgedevstack/kanban',
    docLinks: [{ label: 'Kanban', path: '/components/kanban' }],
  },
  calendar: {
    id: 'calendar',
    packageName: '@forgedevstack/calendar',
    install: 'npm install @forgedevstack/bear @forgedevstack/calendar',
    docLinks: [{ label: 'Calendar', path: '/components/calendar' }],
  },
  ink: {
    id: 'ink',
    packageName: '@forgedevstack/ink',
    install: `npm install @forgedevstack/ink

import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export const App = () => (
  <InkEditor placeholder="Start writing..." />
);`,
    docLinks: [{ label: 'RichEditor', path: '/components/rich-editor' }],
  },
};

export const PRODUCT_SUMMARY_KEY = {
  flutter: 'librariesFlutter',
  grid: 'librariesGrid',
  blocks: 'librariesBlocks',
  charts: 'librariesCharts',
  ai: 'librariesAi',
  code: 'librariesCode',
  map: 'librariesMap',
  kanban: 'librariesKanban',
  calendar: 'librariesCalendar',
  ink: 'librariesInk',
} as const;

export const PRODUCT_NAME_KEY = {
  flutter: 'productFlutterName',
  grid: 'productGridName',
  blocks: 'productBlocksName',
  charts: 'productChartsName',
  ai: 'productAiName',
  code: 'productCodeName',
  map: 'productMapName',
  kanban: 'productKanbanName',
  calendar: 'productCalendarName',
  ink: 'productInkName',
} as const;

const PRODUCT_IDS = Object.keys(PRODUCT_PAGES);

export const isProductId = (value: string): value is ProductId => PRODUCT_IDS.includes(value);
