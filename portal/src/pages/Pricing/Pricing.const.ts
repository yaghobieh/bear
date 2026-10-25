import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { PricingNote, PricingPlan } from './Pricing.types';

export const BEAR_PRO_PRICE_USD = 9;

export const PRICING_COPY: Record<PortalLanguage, {
  title: string;
  description: string;
  keyLabel: string;
  keyPlaceholder: string;
  save: string;
  clear: string;
  saved: string;
  invalid: string;
  email: string;
  benefitsTitle: string;
  benefitsLead: string;
  blocksTitle: string;
  catalogTitle: string;
}> = {
  en: {
    title: 'Premium',
    description: 'Core, icons, Flutter, and Blocks stay free. Pro is $9 a year for Bear Grid. The license key arrives by email and clears the watermark.',
    keyLabel: 'License key',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Save key',
    clear: 'Remove key',
    saved: 'Pro is on in this browser.',
    invalid: 'That key does not match a Bear Pro license.',
    email: 'After checkout, the receipt email contains the key. Paste it here. There is no checkout link on this page yet.',
    benefitsTitle: 'What the $9 pays for',
    benefitsLead: 'You pay when a table has to work like a spreadsheet. Everything you need to ship a form, a dialog, a dashboard shell, or a phone screen stays free.',
    blocksTitle: 'What Blocks are',
    catalogTitle: 'Every library',
  },
  es: {
    title: 'Premium',
    description: 'Core, iconos, Flutter y bloques siguen gratis. Pro cuesta $9 al año por Bear Grid. La clave llega por email y quita la marca de agua.',
    keyLabel: 'Clave de licencia',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Guardar clave',
    clear: 'Quitar clave',
    saved: 'Pro está activo en este navegador.',
    invalid: 'Esa clave no coincide con una licencia Bear Pro.',
    email: 'Después del pago, el email del recibo trae la clave. Pégala aquí. En esta página todavía no hay un enlace de pago.',
    benefitsTitle: 'Qué pagan los $9',
    benefitsLead: 'Pagas cuando una tabla tiene que funcionar como una hoja de cálculo. Todo lo que necesitas para publicar un formulario, un diálogo, un panel o una pantalla de teléfono sigue gratis.',
    blocksTitle: 'Qué son los bloques',
    catalogTitle: 'Todas las librerías',
  },
};

export const PRICING_PLANS: Record<PortalLanguage, PricingPlan[]> = {
  en: [
    {
      id: 'core',
      name: 'Core',
      price: '$0',
      interval: 'forever',
      points: ['Button, Input, Modal, theme', 'DataTable sort and sticky header', 'Ask Bear on the docs', 'MIT'],
      path: '/components',
    },
    {
      id: 'blocks',
      name: 'Blocks',
      price: '$0',
      interval: 'the screen',
      points: ['A finished dashboard', 'Title and stat cards', 'No license and no watermark', 'Pay only if you add Bear Grid'],
      path: '/products/blocks',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      interval: 'per year',
      featured: true,
      points: ['Column pin', 'Row grouping', 'Excel and CSV export', 'One app, one key, emailed to you', 'Watermark gone after you paste the key'],
      path: '/products/grid',
    },
    {
      id: 'flutter',
      name: 'Flutter',
      price: '$0',
      interval: 'with the kit',
      points: ['Same Bear tokens', 'Button, field, card, app bar', 'List, dialog, bottom sheet', 'The mobile kit'],
      path: '/products/flutter',
    },
  ],
  es: [
    {
      id: 'core',
      name: 'Core',
      price: '$0',
      interval: 'siempre',
      points: ['Button, Input, Modal, tema', 'DataTable con orden y cabecera fija', 'Ask Bear en la documentación', 'MIT'],
      path: '/components',
    },
    {
      id: 'blocks',
      name: 'Bloques',
      price: '$0',
      interval: 'la pantalla',
      points: ['Un panel terminado', 'Título y tarjetas de cifras', 'Sin licencia y sin marca de agua', 'Pagas solo si añades Bear Grid'],
      path: '/products/blocks',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      interval: 'al año',
      featured: true,
      points: ['Columnas fijadas', 'Agrupación de filas', 'Exportación Excel y CSV', 'Una app, una clave, por email', 'La marca de agua se va al pegar la clave'],
      path: '/products/grid',
    },
    {
      id: 'flutter',
      name: 'Flutter',
      price: '$0',
      interval: 'con el kit',
      points: ['Los mismos tokens de Bear', 'Botón, campo, tarjeta, barra', 'Lista, diálogo, bottom sheet', 'El kit móvil'],
      path: '/products/flutter',
    },
  ],
};

export const PRICING_BLOCKS: Record<PortalLanguage, string> = {
  en: 'A block is a finished screen made from Bear components. DashboardBlock is the first one: a title and stat cards. It is free. You do not pay to use the block, and it has no watermark. You pay when the screen under those cards needs spreadsheet behavior. That behavior is Bear Grid: pin a column while you scroll, group rows, and download Excel. The free DataTable still sorts and sticks its header, so a small table does not need the key.',
  es: 'Un bloque es una pantalla terminada hecha con componentes de Bear. DashboardBlock es el primero: un título y tarjetas de cifras. Es gratis. No pagas por usar el bloque y no tiene marca de agua. Pagas cuando la pantalla bajo esas tarjetas necesita comportarse como una hoja de cálculo. Eso es Bear Grid: fijar una columna al hacer scroll, agrupar filas y descargar Excel. DataTable gratis sigue ordenando y fijando la cabecera, así que una tabla pequeña no necesita la clave.',
};

export const PRICING_CATALOG: Record<PortalLanguage, PricingNote[]> = {
  en: [
    { title: 'Core', price: 'Free', path: '/components', body: 'Buttons, inputs, modals, theme, and DataTable. The parts every screen needs.' },
    { title: 'Icons', price: 'Free', path: '/icons', body: 'Optional set. Install @forgedevstack/bear-icons only if you want the icons. Core still renders without them.' },
    { title: 'Flutter', price: 'Free', path: '/products/flutter', body: 'Mobile widgets on the same tokens. Button, field, card, app bar, list, dialog, and bottom sheet.' },
    { title: 'Blocks', price: 'Free', path: '/products/blocks', body: 'Finished screens. The dashboard block is a title and stat cards. Pay only if you add Bear Grid under it.' },
    { title: 'Grid', price: '$9 / year', path: '/products/grid', body: 'Pin, group, and Excel. One key, one app, emailed after checkout. The watermark stays until you paste the key.' },
    { title: 'Charts', price: 'Free', path: '/products/charts', body: 'Bar, line, area, pie, radar, gauge, heatmap, and the other common shapes.' },
    { title: 'AI', price: 'Free', path: '/products/ai', body: 'Chat, composer, streaming, tools, and citations for your own app.' },
    { title: 'Code', price: 'Free', path: '/products/code', body: 'Editor, terminal, diff, and JSON viewer. Ink is the rich-text editor, not this package.' },
    { title: 'Map', price: 'Free', path: '/products/map', body: 'Street, light, dark, and terrain tiles, with zoom and drag.' },
    { title: 'Kanban', price: 'Free', path: '/products/kanban', body: 'A board of columns and cards in its own package.' },
    { title: 'Calendar', price: 'Free', path: '/products/calendar', body: 'Event grid and resource timeline.' },
    { title: 'Ink', price: 'Own license', path: '/products/ink', body: 'Rich text: tables, comments, and track changes. The $9 Bear key does not unlock Ink.' },
  ],
  es: [
    { title: 'Core', price: 'Gratis', path: '/components', body: 'Botones, campos, modales, tema y DataTable. Las piezas que toda pantalla necesita.' },
    { title: 'Iconos', price: 'Gratis', path: '/icons', body: 'Set opcional. Instala @forgedevstack/bear-icons solo si quieres los iconos. Core se ve igual sin ellos.' },
    { title: 'Flutter', price: 'Gratis', path: '/products/flutter', body: 'Widgets móviles con los mismos tokens. Botón, campo, tarjeta, barra, lista, diálogo y bottom sheet.' },
    { title: 'Bloques', price: 'Gratis', path: '/products/blocks', body: 'Pantallas terminadas. El panel es un título y tarjetas de cifras. Pagas solo si añades Bear Grid debajo.' },
    { title: 'Grid', price: '$9 / año', path: '/products/grid', body: 'Fijar, agrupar y Excel. Una clave, una app, por email después del pago. La marca de agua sigue hasta que pegas la clave.' },
    { title: 'Gráficos', price: 'Gratis', path: '/products/charts', body: 'Barras, líneas, área, pastel, radar, gauge, heatmap y las otras formas habituales.' },
    { title: 'IA', price: 'Gratis', path: '/products/ai', body: 'Chat, compositor, streaming, herramientas y citas para tu propia app.' },
    { title: 'Código', price: 'Gratis', path: '/products/code', body: 'Editor, terminal, diff y visor JSON. Ink es el editor enriquecido, no este paquete.' },
    { title: 'Mapa', price: 'Gratis', path: '/products/map', body: 'Teselas de calle, claro, oscuro y terreno, con zoom y arrastre.' },
    { title: 'Kanban', price: 'Gratis', path: '/products/kanban', body: 'Un tablero de columnas y tarjetas en su propio paquete.' },
    { title: 'Calendario', price: 'Gratis', path: '/products/calendar', body: 'Cuadrícula de eventos y línea de tiempo de recursos.' },
    { title: 'Ink', price: 'Licencia propia', path: '/products/ink', body: 'Texto enriquecido: tablas, comentarios y control de cambios. La clave de $9 de Bear no abre Ink.' },
  ],
};
