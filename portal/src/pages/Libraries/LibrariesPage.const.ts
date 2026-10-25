import type { BearLibraryCard } from './LibrariesPage.types';

export const LIBRARY_CHART_HEIGHT = 180;

export const LIBRARY_CHART_DATA = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 60 },
];

export const BEAR_LIBRARIES: BearLibraryCard[] = [
  {
    id: 'flutter',
    name: 'bear_flutter',
    kind: 'flutter',
    summaryKey: 'librariesFlutter',
    install: 'flutter pub add bear_flutter',
    components: ['BearButton', 'BearTextField', 'BearCard', 'BearAppBar', 'BearList', 'BearDialog', 'BearBottomSheet'],
  },
  {
    id: 'grid',
    name: '@forgedevstack/bear-grid',
    kind: 'pro',
    summaryKey: 'librariesGrid',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-grid',
    components: ['BearGrid'],
  },
  {
    id: 'blocks',
    name: '@forgedevstack/bear-blocks',
    kind: 'library',
    summaryKey: 'librariesBlocks',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-blocks',
    components: ['DashboardBlock'],
  },
  {
    id: 'charts',
    name: '@forgedevstack/bear-x-charts',
    kind: 'x',
    summaryKey: 'librariesCharts',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-charts',
    components: ['Chart', 'BarChart', 'LineChart', 'PieChart', 'RadarChart', 'FunnelChart', 'Sparkline', 'Gauge', 'RingProgress', 'Heatmap', 'TimelineChart'],
  },
  {
    id: 'ai',
    name: '@forgedevstack/bear-x-ai',
    kind: 'x',
    summaryKey: 'librariesAi',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-ai',
    components: ['Chat', 'PromptComposer', 'StreamingMessage', 'ToolCall', 'CitationList', 'FloatingChat'],
  },
  {
    id: 'code',
    name: '@forgedevstack/bear-x-code',
    kind: 'x',
    summaryKey: 'librariesCode',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-code',
    components: ['CodeEditor', 'Terminal', 'DiffViewer', 'JsonViewer', 'DiffSquares'],
  },
  {
    id: 'map',
    name: '@forgedevstack/bear-map',
    kind: 'library',
    summaryKey: 'librariesMap',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-map',
    components: ['Map'],
  },
  {
    id: 'kanban',
    name: '@forgedevstack/kanban',
    kind: 'library',
    summaryKey: 'librariesKanban',
    install: 'npm install @forgedevstack/bear @forgedevstack/kanban',
    components: ['Kanban'],
  },
  {
    id: 'calendar',
    name: '@forgedevstack/calendar',
    kind: 'library',
    summaryKey: 'librariesCalendar',
    install: 'npm install @forgedevstack/bear @forgedevstack/calendar',
    components: ['EventCalendar', 'EventTimeline', 'EventEditDialog', 'ResourceFilter', 'Calendar'],
  },
  {
    id: 'ink',
    name: '@forgedevstack/ink',
    kind: 'library',
    summaryKey: 'librariesInk',
    install: 'npm install @forgedevstack/ink',
    components: ['InkEditor', 'InkWorkspace'],
  },
];

export const LIBRARY_IMPORT_SAMPLE = `import { BearProvider, BarChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';

export const App = () => (
  <BearProvider>
    <BarChart data={[{ label: 'Jan', value: 30 }]} showLabels />
  </BearProvider>
);`;

export const BEAR_CLI_ADD = `npm install @forgedevstack/bear
npx @forgedevstack/bear-cli add charts
npx @forgedevstack/bear-cli add icons
npx @forgedevstack/bear-cli add ai
npx @forgedevstack/bear-cli add code
npx @forgedevstack/bear-cli add map
npx @forgedevstack/bear-cli add kanban
npx @forgedevstack/bear-cli init --exclude map --exclude kanban --exclude ai --exclude code`;
