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
    id: 'charts',
    name: '@forgedevstack/bear-x-charts',
    kind: 'x',
    summaryKey: 'librariesCharts',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-charts',
    components: ['Chart', 'BarChart', 'LineChart', 'PieChart', 'RadarChart', 'FunnelChart', 'Sparkline', 'Gauge', 'RingProgress', 'Heatmap', 'TimelineChart'],
  },
  {
    id: 'tree',
    name: '@forgedevstack/bear-x-tree',
    kind: 'x',
    summaryKey: 'librariesTree',
    install: 'npm install @forgedevstack/bear @forgedevstack/bear-x-tree',
    components: ['TreeView', 'TreeSelect', 'FileTree', 'Cascader'],
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
];

export const LIBRARY_IMPORT_SAMPLE = `import { BarChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';`;

export const BEAR_CLI_ADD = `npx @forgedevstack/bear-cli add charts
npx @forgedevstack/bear-cli add tree
npx @forgedevstack/bear-cli add ai
npx @forgedevstack/bear-cli add code
npx @forgedevstack/bear-cli add map
npx @forgedevstack/bear-cli add kanban`;
