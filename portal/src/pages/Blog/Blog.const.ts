import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { BlogTip } from './Blog.types';

export const BLOG_POST_COUNT = 6;
export const BLOG_WHATS_NEW_VERSION = '1.3.6';
export const PATH_WHATS_NEW = '/whats-new';
export const PATH_CHANGELOG = '/changelog';

export const BLOG_PUBLISHED_AT: Record<string, string> = {
  'bear-1-3-6': '2026-10-25T12:00:00.000Z',
  'theme-behind': '2026-10-21T07:23:00.000Z',
  'core-exports': '2026-10-18T14:00:00.000Z',
  'hooks-outside': '2026-10-12T11:30:00.000Z',
  'map-tiles': '2026-10-05T08:15:00.000Z',
  'icons-optional': '2026-09-28T16:40:00.000Z',
  'kanban-name': '2026-09-20T09:05:00.000Z',
  'torch-ink': '2026-09-14T13:20:00.000Z',
};

const ENGLISH_TIPS: BlogTip[] = [
  {
    id: 'bear-1-3-6',
    title: 'Bear 1.3.6: Flutter, icons, and a $9 grid',
    body: 'Core stays free. Flutter and the icon set are free. Bear Grid is $9 a year because pinned columns, row groups, and Excel export are the parts teams budget for. Blocks are the screens you build on top of that.',
    path: '/pricing',
    sections: [
      {
        heading: 'What stays free',
        body: 'Button, Input, Modal, the theme, and DataTable stay on the MIT core. DataTable still sorts and sticks the header. Ask Bear on the docs stays free. You do not pay to ship a form or a dialog.',
      },
      {
        heading: 'Flutter',
        body: 'bear_flutter is the mobile kit. It uses the same color, radius, space, and type as Bear. The first widgets are a button, text field, card, app bar, list, dialog, and bottom sheet. Web stays React. Mobile stays Flutter. This kit is free.',
        code: `flutter pub add bear_flutter`,
      },
      {
        heading: 'Icons',
        body: 'Icons are a separate install, @forgedevstack/bear-icons. Core still renders if you leave them out. The home page and /icons browse the set.',
        code: `npm install @forgedevstack/bear-icons`,
      },
      {
        heading: 'What Blocks are',
        body: 'A block is a finished screen made from Bear components. DashboardBlock is the first one: a title and stat cards. It is free, so you can see the pattern and drop a dashboard in without a license. A block is not a locked button. It is the layout you would otherwise copy from a screenshot.',
      },
      {
        heading: 'Why the $9 is for the grid',
        body: 'The screen stays useful with the free DataTable. You pay when the table has to behave like a spreadsheet: pin a column while you scroll, group rows by team, and download Excel. That is Bear Grid. One key covers one app for a year. The intro price is $9. Paste the key from the receipt email and the watermark goes away. Without a key the grid still runs, with a Bear Pro mark, so you can try it.',
        code: `npm install @forgedevstack/bear @forgedevstack/bear-grid`,
      },
    ],
  },
  {
    id: 'theme-behind',
    title: 'What Bear does after you pass a theme',
    body: 'A hex color becomes a full 50–950 scale, then one style tag in the document head. Components read CSS variables, so dark mode and custom variants update without a color prop.',
    path: '/theming',
    sections: [
      {
        heading: 'One style tag',
        body: 'BearProvider writes a style element with id bear-theme-vars. Light rules sit on :root.bear-light. Dark rules sit on :root.dark and .dark. The provider also toggles those classes on the document element.',
      },
      {
        heading: 'How a single color becomes a scale',
        body: 'Shade 500 is the color you passed. Lighter shades are 50 through 400. Darker shades are 600 through 950. Named colors such as blue are mapped to hex before that scale is built. The variables are --bear-primary-50 through --bear-primary-950.',
        code: `<BearProvider theme={{ colors: { primary: '#3b82f6' } }}>
  <Button variant="primary">Save</Button>
</BearProvider>`,
      },
      {
        heading: 'Custom variants are variables too',
        body: 'customVariants.brand becomes --bear-brand-bg and --bear-brand-bg-hover. Built-in button variants use --bear-btn-primary-bg. Charts and focus rings read --bear-primary-500, so they follow the same tag.',
      },
    ],
  },
  {
    id: 'core-exports',
    title: 'Theme the charts with BearProvider',
    body: 'Bar, line, and pie come from @forgedevstack/bear-x-charts. BearProvider is exported from that same package. The primary color on a line chart is the theme token, so dark mode follows the provider.',
    path: '/products/charts',
    code: `npm install @forgedevstack/bear-x-charts

import { BearProvider, LineChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
];

export const App = () => (
  <BearProvider defaultMode="dark">
    <LineChart data={data} smooth showDots />
  </BearProvider>
);`,
  },
  {
    id: 'hooks-outside',
    title: 'Did you know hooks stay outside Bear X?',
    body: 'useMediaQuery, useClipboard, and useDebounce are not a separate X package. Import them from Core and leave them there.',
    path: '/hooks',
    sections: [
      {
        heading: 'Import them from Core',
        body: 'There is no hooks package. useMediaQuery, useClipboard, and useDebounce ship with @forgedevstack/bear, so a Core import is the whole install.',
        code: `import { useMediaQuery, useClipboard, useDebounce } from '@forgedevstack/bear';

const isWide = useMediaQuery('md');
const { copy, copied } = useClipboard();
const debounced = useDebounce(query, 300);`,
      },
    ],
  },
  {
    id: 'map-tiles',
    title: 'Did you know the map has four tile sets?',
    body: 'Street, light, dark, and terrain are tileProvider values on the same Map. Zoom controls, scroll zoom, and drag are props, not extra components.',
    path: '/products/map',
    sections: [
      {
        heading: 'Set the tile set on Map',
        body: 'Install @forgedevstack/bear-map. Street, light, dark, and terrain are tileProvider values on that Map. Zoom buttons, scroll zoom, and drag are showZoomControls, scrollWheelZoom, and draggable.',
        code: `npm install @forgedevstack/bear @forgedevstack/bear-map

import { Map } from '@forgedevstack/bear-map';
import '@forgedevstack/bear/styles.css';

<Map
  tileProvider="cartodb-dark"
  showZoomControls
  scrollWheelZoom
  draggable
  viewport={{ lat: 40.7128, lng: -74.006, zoom: 3 }}
/>`,
      },
    ],
  },
  {
    id: 'icons-optional',
    title: 'Did you know icons can stay out of the install?',
    body: 'npm install @forgedevstack/bear does not include icons. Add @forgedevstack/bear-icons when you want them. Components still render if that package is omitted.',
    path: '/icons',
    sections: [
      {
        heading: 'The default install leaves icons out',
        body: 'npm install @forgedevstack/bear installs the component kit. Icons are not part of that command, so a fresh Bear app has buttons, inputs, and layout without an icon set.',
        code: `npm install @forgedevstack/bear`,
      },
      {
        heading: 'Install the icons package',
        body: 'Add icons with npm install @forgedevstack/bear-icons. Import the icon you need from that package. SearchIcon is one of the named exports.',
        code: `npm install @forgedevstack/bear-icons

import { SearchIcon } from '@forgedevstack/bear-icons';

export const Search = () => <SearchIcon size={24} />;`,
      },
      {
        heading: 'Components still render without icons',
        body: 'Button, Select, and the rest of the kit still render when @forgedevstack/bear-icons is omitted. The Select chevron and check keep working without that package.',
        code: `import { Button, Select } from '@forgedevstack/bear';

<Button>Save</Button>
<Select
  options={[{ value: 'react', label: 'React' }]}
  placeholder="Framework"
/>`,
      },
      {
        heading: 'Browse them at /icons',
        body: 'The icons page at /icons has a search field, an All tab that lists every icon, and Bear Tabs for the category groups, including the Bear group.',
      },
    ],
  },
  {
    id: 'kanban-name',
    title: 'Did you know kanban is not bear-kanban?',
    body: 'The package name is @forgedevstack/kanban. Core still exports Kanban, so current imports keep working.',
    path: '/products/kanban',
    sections: [
      {
        heading: 'Install @forgedevstack/kanban',
        body: 'The package is @forgedevstack/kanban, not bear-kanban. Core still exports Kanban, so an import from @forgedevstack/bear keeps working. New boards can import from the package and keep styles on @forgedevstack/bear/styles.css.',
        code: `npm install @forgedevstack/bear @forgedevstack/kanban

import { Kanban } from '@forgedevstack/kanban';
import '@forgedevstack/bear/styles.css';

const columns = [
  { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Package page' }] },
];

<Kanban columns={columns} />`,
      },
    ],
  },
  {
    id: 'torch-ink',
    title: 'Did you know the player and the editor live elsewhere?',
    body: 'Media playback is Torch. The rich editor is Ink. Bear 1.3.5 does not add a Bear media package or a Bear editor package.',
    path: '/whats-new',
    sections: [
      {
        heading: 'Install Torch and Ink',
        body: 'Media playback is Torch (@forgedevstack/torch). The rich editor is Ink (@forgedevstack/ink). Bear 1.3.5 does not add a Bear media package or a Bear editor package. TorchPlayer is the player export.',
        code: `npm install @forgedevstack/torch
npm install @forgedevstack/ink

import { TorchPlayer } from '@forgedevstack/torch';

<TorchPlayer src="/demo.mp4" title="Demo" />`,
      },
    ],
  },
];

const SPANISH_TIPS: BlogTip[] = [
  {
    id: 'bear-1-3-6',
    title: 'Bear 1.3.6: Flutter, iconos y una tabla a $9',
    body: 'Core sigue gratis. Flutter y los iconos son gratis. Bear Grid cuesta $9 al año porque fijar columnas, agrupar filas y exportar Excel es lo que los equipos presupuestan. Los bloques son las pantallas que construyes encima.',
    path: '/pricing',
    sections: [
      {
        heading: 'Qué sigue gratis',
        body: 'Button, Input, Modal, el tema y DataTable siguen en el core MIT. DataTable ordena y fija la cabecera. Ask Bear en la documentación sigue gratis. No pagas por publicar un formulario o un diálogo.',
      },
      {
        heading: 'Flutter',
        body: 'bear_flutter es el kit móvil. Usa el mismo color, radio, espacio y tipo que Bear. Los primeros widgets son botón, campo, tarjeta, barra, lista, diálogo y bottom sheet. La web sigue en React. El móvil sigue en Flutter. Este kit es gratis.',
        code: `flutter pub add bear_flutter`,
      },
      {
        heading: 'Iconos',
        body: 'Los iconos son una instalación aparte, @forgedevstack/bear-icons. Core se sigue viendo si los omites. La home y /icons muestran el set.',
        code: `npm install @forgedevstack/bear-icons`,
      },
      {
        heading: 'Qué son los bloques',
        body: 'Un bloque es una pantalla terminada hecha con componentes de Bear. DashboardBlock es el primero: un título y tarjetas de cifras. Es gratis, para ver el patrón y poner un panel sin licencia. Un bloque no es un botón cerrado. Es el layout que si no copiarías de una captura.',
      },
      {
        heading: 'Por qué los $9 son de la tabla',
        body: 'La pantalla sirve con el DataTable gratis. Pagas cuando la tabla tiene que parecer una hoja de cálculo: fijar una columna al hacer scroll, agrupar filas y descargar Excel. Eso es Bear Grid. Una clave cubre una app durante un año. El precio de entrada es $9. Pega la clave del email y desaparece la marca de agua. Sin clave la tabla sigue funcionando, con la marca Bear Pro, para que puedas probarla.',
        code: `npm install @forgedevstack/bear @forgedevstack/bear-grid`,
      },
    ],
  },
  {
    id: 'theme-behind',
    title: 'Qué hace Bear después de pasar un theme',
    body: 'Un color hex se convierte en una escala 50–950 y en una etiqueta style en el head. Los componentes leen variables CSS, así que el modo oscuro y las variantes custom cambian sin un prop color.',
    path: '/theming',
    sections: [
      {
        heading: 'Una sola etiqueta style',
        body: 'BearProvider escribe un elemento style con id bear-theme-vars. La luz va en :root.bear-light. La oscuridad va en :root.dark y .dark. El provider también alterna esas clases en el documento.',
      },
      {
        heading: 'De un color a una escala',
        body: 'El tono 500 es el color que pasaste. 50 a 400 son más claros. 600 a 950 son más oscuros. Un nombre como blue se traduce a hex antes de construir la escala.',
        code: `<BearProvider theme={{ colors: { primary: '#3b82f6' } }}>
  <Button variant="primary">Guardar</Button>
</BearProvider>`,
      },
    ],
  },
  {
    id: 'core-exports',
    title: 'Tema de los gráficos con BearProvider',
    body: 'Barras, líneas y pastel salen de @forgedevstack/bear-x-charts. BearProvider se exporta desde ese mismo paquete. El color de la línea es el token primario, así que el modo oscuro sigue al provider.',
    path: '/products/charts',
    code: `npm install @forgedevstack/bear-x-charts

import { BearProvider, LineChart } from '@forgedevstack/bear-x-charts';
import '@forgedevstack/bear/styles.css';

const data = [
  { label: 'Ene', value: 30 },
  { label: 'Feb', value: 45 },
];

export const App = () => (
  <BearProvider defaultMode="dark">
    <LineChart data={data} smooth showDots />
  </BearProvider>
);`,
  },
  {
    id: 'hooks-outside',
    title: '¿Sabías que los hooks se quedan fuera de Bear X?',
    body: 'useMediaQuery, useClipboard y useDebounce no son un paquete X. Impórtalos desde Core y déjalos ahí.',
    path: '/hooks',
    sections: [
      {
        heading: 'Impórtalos desde Core',
        body: 'No hay un paquete de hooks. useMediaQuery, useClipboard y useDebounce vienen con @forgedevstack/bear, así que el import de Core basta.',
        code: `import { useMediaQuery, useClipboard, useDebounce } from '@forgedevstack/bear';

const isWide = useMediaQuery('md');
const { copy, copied } = useClipboard();
const debounced = useDebounce(query, 300);`,
      },
    ],
  },
  {
    id: 'map-tiles',
    title: '¿Sabías que el mapa tiene cuatro juegos de teselas?',
    body: 'Calle, claro, oscuro y terreno son valores de tileProvider en el mismo Map. El zoom, la rueda y el arrastre son props, no componentes extra.',
    path: '/products/map',
    sections: [
      {
        heading: 'Elige el juego de teselas en Map',
        body: 'Instala @forgedevstack/bear-map. Calle, claro, oscuro y terreno son valores de tileProvider en ese Map. Los botones de zoom, la rueda y el arrastre son showZoomControls, scrollWheelZoom y draggable.',
        code: `npm install @forgedevstack/bear @forgedevstack/bear-map

import { Map } from '@forgedevstack/bear-map';
import '@forgedevstack/bear/styles.css';

<Map
  tileProvider="cartodb-dark"
  showZoomControls
  scrollWheelZoom
  draggable
  viewport={{ lat: 40.7128, lng: -74.006, zoom: 3 }}
/>`,
      },
    ],
  },
  {
    id: 'icons-optional',
    title: '¿Sabías que los iconos pueden quedar fuera de la instalación?',
    body: 'npm install @forgedevstack/bear no incluye iconos. Añade @forgedevstack/bear-icons cuando los quieras. Los componentes se renderizan aunque omitas ese paquete.',
    path: '/icons',
    sections: [
      {
        heading: 'La instalación por defecto deja los iconos fuera',
        body: 'npm install @forgedevstack/bear instala el kit de componentes. Los iconos no forman parte de ese comando, así que una app nueva tiene botones, campos y layout sin un set de iconos.',
        code: `npm install @forgedevstack/bear`,
      },
      {
        heading: 'Instala el paquete de iconos',
        body: 'Añade los iconos con npm install @forgedevstack/bear-icons. Importa el icono que necesites desde ese paquete. SearchIcon es uno de los exports con nombre.',
        code: `npm install @forgedevstack/bear-icons

import { SearchIcon } from '@forgedevstack/bear-icons';

export const Search = () => <SearchIcon size={24} />;`,
      },
      {
        heading: 'Los componentes se renderizan sin iconos',
        body: 'Button, Select y el resto del kit se renderizan aunque omitas @forgedevstack/bear-icons. El chevron y la marca de Select siguen funcionando sin ese paquete.',
        code: `import { Button, Select } from '@forgedevstack/bear';

<Button>Guardar</Button>
<Select
  options={[{ value: 'react', label: 'React' }]}
  placeholder="Framework"
/>`,
      },
      {
        heading: 'Míralos en /icons',
        body: 'La página de iconos en /icons tiene un campo de búsqueda, la pestaña All con todos los iconos y las pestañas de Bear (Tabs) para los grupos, incluida la de Bear.',
      },
    ],
  },
  {
    id: 'kanban-name',
    title: '¿Sabías que kanban no se llama bear-kanban?',
    body: 'El paquete es @forgedevstack/kanban. Core sigue exportando Kanban, así que los imports actuales siguen funcionando.',
    path: '/products/kanban',
    sections: [
      {
        heading: 'Instala @forgedevstack/kanban',
        body: 'El paquete es @forgedevstack/kanban, no bear-kanban. Core sigue exportando Kanban, así que un import desde @forgedevstack/bear sigue funcionando. Los tableros nuevos pueden importar desde el paquete y dejar los estilos en @forgedevstack/bear/styles.css.',
        code: `npm install @forgedevstack/bear @forgedevstack/kanban

import { Kanban } from '@forgedevstack/kanban';
import '@forgedevstack/bear/styles.css';

const columns = [
  { id: 'todo', title: 'Por hacer', cards: [{ id: '1', title: 'Página del paquete' }] },
];

<Kanban columns={columns} />`,
      },
    ],
  },
  {
    id: 'torch-ink',
    title: '¿Sabías que el reproductor y el editor viven en otro sitio?',
    body: 'La reproducción es Torch. El editor enriquecido es Ink. Bear 1.3.5 no añade un paquete de media ni un editor de Bear.',
    path: '/whats-new',
    sections: [
      {
        heading: 'Instala Torch e Ink',
        body: 'La reproducción es Torch (@forgedevstack/torch). El editor enriquecido es Ink (@forgedevstack/ink). Bear 1.3.5 no añade un paquete de media ni un editor de Bear. TorchPlayer es el export del reproductor.',
        code: `npm install @forgedevstack/torch
npm install @forgedevstack/ink

import { TorchPlayer } from '@forgedevstack/torch';

<TorchPlayer src="/demo.mp4" title="Demo" />`,
      },
    ],
  },
];

export const BLOG_TIPS: Record<PortalLanguage, BlogTip[]> = {
  en: ENGLISH_TIPS,
  es: SPANISH_TIPS,
};
