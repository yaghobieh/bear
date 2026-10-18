import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { BlogTip } from './Blog.types';

export const BLOG_POST_COUNT = 6;
export const BLOG_WHATS_NEW_VERSION = '1.3.5';
export const PATH_WHATS_NEW = '/whats-new';
export const PATH_CHANGELOG = '/changelog';

const ENGLISH_TIPS: BlogTip[] = [
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
