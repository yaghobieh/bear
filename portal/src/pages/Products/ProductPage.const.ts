import type { MapTileProvider } from '@forgedevstack/bear-map';
import type { PortalCopyKey } from '@/components/Topbar/Topbar.types';
import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { ProductDetail, ProductId, ProductPageData } from './ProductPage.types';

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

export const PRODUCT_DETAILS: Record<PortalLanguage, Record<ProductId, ProductDetail>> = {
  en: {
    flutter: {
      price: 'Free',
      why: 'Flutter is the mobile kit. It uses the same color, radius, space, and type as Bear, so a phone screen matches the web app. Web stays React. This kit is free because the widgets are the same critical pieces as Core: a button, a field, a card, a bar, a list, a dialog, and a sheet.',
      benefits: ['Same tokens as the web theme', 'No license key', 'Pub package bear_flutter', 'Dialog and bottom sheet included'],
    },
    grid: {
      price: '$9 / year',
      why: 'Bear Grid is the table you pay for. Pin a column while the rest scroll, group rows by a field such as team, and download Excel or CSV. Simple sort and a sticky header stay on the free DataTable, so a settings page does not need a license. One key covers one app. Paste it from the receipt email and the watermark goes away. Without a key the grid still runs, with a Bear Pro mark, so you can try the pin, the groups, and the export first.',
      benefits: ['Pinned columns', 'Row grouping', 'Excel and CSV download', 'One app, one emailed key'],
    },
    blocks: {
      price: 'Free',
      why: 'A block is a finished screen made from Bear components. DashboardBlock is the first one: a title and stat cards. It is free, so you can drop a dashboard in and see the pattern without a license. You do not pay for the block. You pay $9 a year when that screen needs Bear Grid: pinned columns, row groups, and an Excel export. The buttons, inputs, and the basic table under the cards stay free.',
      benefits: ['Dashboard layout without assembling it', 'Stat cards from Core', 'No watermark on the block', 'Add Bear Grid only when the table grows'],
    },
    charts: {
      price: 'Free',
      why: 'Charts is the graph set: bar, stacked bar, line, area, pie, donut, polar area, radar, funnel, sparkline, gauge, ring, heatmap, and timeline. Use it when a number needs a shape. Chart.js plugins such as sankey, boxplot, and zoom are not included.',
      benefits: ['Common chart types in one package', 'Sits next to Core, optional install', 'No Pro key'],
    },
    ai: {
      price: 'Free',
      why: 'The AI package is the chat surface: a thread, a composer, streaming, tool calls, citations, and a floating chat. Ask Bear on the docs is separate and stays free. This package is what you embed in your own app.',
      benefits: ['Chat and composer', 'Streaming and citations', 'Optional install'],
    },
    code: {
      price: 'Free',
      why: 'The code package is for reading and comparing source: an editor, a terminal, a diff, and a JSON viewer. Use it in an internal tool or a docs page. It is not the rich-text editor. That is Ink.',
      benefits: ['Editor, terminal, diff, JSON', 'Optional install', 'Separate from Ink'],
    },
    map: {
      price: 'Free',
      why: 'The map package draws a tile map with street, light, dark, and terrain styles, plus zoom and drag. Media playback is Torch, not this package.',
      benefits: ['Tile styles', 'Zoom and drag', 'Optional install'],
    },
    kanban: {
      price: 'Free',
      why: 'Kanban is the board: columns and cards you move between them. It lives in its own package so Core stays smaller.',
      benefits: ['Board layout', 'Own package', 'Optional install'],
    },
    calendar: {
      price: 'Free',
      why: 'Calendar is the date grid and the resource timeline. Use it for events. It is a separate package from Core.',
      benefits: ['Event grid', 'Resource timeline', 'Optional install'],
    },
    ink: {
      price: 'See Ink',
      why: 'Ink is the rich-text editor: tables, comments, track changes, and a pluggable assistant. Bear RichEditor stays the lighter editor in Core. Ink has its own license. It is not part of the $9 Bear Grid key.',
      benefits: ['Tables and comments', 'Track changes', 'Separate from Bear Pro'],
    },
  },
  es: {
    flutter: {
      price: 'Gratis',
      why: 'Flutter es el kit móvil. Usa el mismo color, radio, espacio y tipo que Bear, así que la pantalla del teléfono coincide con la web. La web sigue en React. Este kit es gratis porque los widgets son las mismas piezas críticas que Core: botón, campo, tarjeta, barra, lista, diálogo y sheet.',
      benefits: ['Los mismos tokens que el tema web', 'Sin clave', 'Paquete pub bear_flutter', 'Diálogo y bottom sheet incluidos'],
    },
    grid: {
      price: '$9 / año',
      why: 'Bear Grid es la tabla de pago. Fija una columna mientras el resto hace scroll, agrupa filas por un campo como el equipo y descarga Excel o CSV. El orden simple y la cabecera fija siguen en DataTable gratis, así que una página de ajustes no necesita licencia. Una clave cubre una app. Pégala desde el email del recibo y desaparece la marca de agua. Sin clave la tabla sigue funcionando, con la marca Bear Pro, para probar fijar, agrupar y exportar.',
      benefits: ['Columnas fijadas', 'Agrupación de filas', 'Descarga Excel y CSV', 'Una app, una clave por email'],
    },
    blocks: {
      price: 'Gratis',
      why: 'Un bloque es una pantalla terminada hecha con componentes de Bear. DashboardBlock es el primero: un título y tarjetas de cifras. Es gratis, para poner un panel y ver el patrón sin licencia. No pagas por el bloque. Pagas $9 al año cuando esa pantalla necesita Bear Grid: columnas fijadas, grupos de filas y exportación Excel. Los botones, los campos y la tabla básica bajo las tarjetas siguen gratis.',
      benefits: ['Panel sin montarlo a mano', 'Tarjetas de Core', 'Sin marca de agua en el bloque', 'Añade Bear Grid solo cuando la tabla crece'],
    },
    charts: {
      price: 'Gratis',
      why: 'Charts es el set de gráficos: barras, barras apiladas, líneas, área, pastel, dona, área polar, radar, embudo, sparkline, gauge, anillo, heatmap y línea de tiempo. Úsalo cuando un número necesita una forma. Los plugins de Chart.js como sankey, boxplot y zoom no están incluidos.',
      benefits: ['Tipos habituales en un paquete', 'Opcional, junto a Core', 'Sin clave Pro'],
    },
    ai: {
      price: 'Gratis',
      why: 'El paquete de IA es la superficie de chat: hilo, compositor, streaming, herramientas, citas y un chat flotante. Ask Bear en la documentación es aparte y sigue gratis. Este paquete es el que incrustas en tu app.',
      benefits: ['Chat y compositor', 'Streaming y citas', 'Instalación opcional'],
    },
    code: {
      price: 'Gratis',
      why: 'El paquete de código sirve para leer y comparar fuente: editor, terminal, diff y visor JSON. Úsalo en una herramienta interna o en la documentación. No es el editor enriquecido. Ese es Ink.',
      benefits: ['Editor, terminal, diff, JSON', 'Instalación opcional', 'Aparte de Ink'],
    },
    map: {
      price: 'Gratis',
      why: 'El paquete de mapa dibuja teselas de calle, claro, oscuro y terreno, con zoom y arrastre. El reproductor de media es Torch, no este paquete.',
      benefits: ['Estilos de tesela', 'Zoom y arrastre', 'Instalación opcional'],
    },
    kanban: {
      price: 'Gratis',
      why: 'Kanban es el tablero: columnas y tarjetas que mueves entre ellas. Vive en su propio paquete para que Core siga pequeño.',
      benefits: ['Tablero', 'Paquete propio', 'Instalación opcional'],
    },
    calendar: {
      price: 'Gratis',
      why: 'Calendar es la cuadrícula de fechas y la línea de tiempo de recursos. Úsalo para eventos. Es un paquete aparte de Core.',
      benefits: ['Cuadrícula de eventos', 'Línea de tiempo', 'Instalación opcional'],
    },
    ink: {
      price: 'Ver Ink',
      why: 'Ink es el editor enriquecido: tablas, comentarios, control de cambios y un asistente conectable. RichEditor de Bear sigue siendo el editor ligero de Core. Ink tiene su propia licencia. No entra en la clave de $9 de Bear Grid.',
      benefits: ['Tablas y comentarios', 'Control de cambios', 'Aparte de Bear Pro'],
    },
  },
};
