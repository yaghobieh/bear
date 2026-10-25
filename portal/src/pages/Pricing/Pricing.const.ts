import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { PricingFact, PricingFaq, PricingGroup, PricingPlan } from './Pricing.types';

export const BEAR_PRO_PRICE_USD = 9;
export const INGOT_URL = 'https://github.com/yaghobieh/ingot';
export const PRICING_KEY_ID = 'bear-pro-key';

export const PRICING_COPY: Record<PortalLanguage, {
  title: string;
  description: string;
  plansLabel: string;
  compareTitle: string;
  included: string;
  missing: string;
  factsTitle: string;
  faqTitle: string;
  keyLabel: string;
  keyPlaceholder: string;
  save: string;
  clear: string;
  saved: string;
  invalid: string;
  email: string;
  planNames: string[];
}> = {
  en: {
    title: 'Start with Bear for free',
    description: 'Switch to Pro when a table needs pinned columns, row groups, and Excel. Blocks, Flutter, and the icon set stay free.',
    plansLabel: 'Plans',
    compareTitle: 'Compare plans',
    included: 'Included',
    missing: 'Not included',
    factsTitle: 'Key information about the paid plan',
    faqTitle: 'Frequently asked questions',
    keyLabel: 'License key',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Save key',
    clear: 'Remove key',
    saved: 'Pro is on in this browser.',
    invalid: 'That key does not match a Bear Pro license.',
    email: 'After checkout, the receipt email contains the key. Paste it here. There is no checkout link on this page yet.',
    planNames: ['Community', 'Pro', 'Ingot'],
  },
  es: {
    title: 'Empieza con Bear gratis',
    description: 'Pasa a Pro cuando una tabla necesite columnas fijadas, grupos de filas y Excel. Los bloques, Flutter y los iconos siguen gratis.',
    plansLabel: 'Planes',
    compareTitle: 'Comparar planes',
    included: 'Incluido',
    missing: 'No incluido',
    factsTitle: 'Información clave del plan de pago',
    faqTitle: 'Preguntas frecuentes',
    keyLabel: 'Clave de licencia',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Guardar clave',
    clear: 'Quitar clave',
    saved: 'Pro está activo en este navegador.',
    invalid: 'Esa clave no coincide con una licencia Bear Pro.',
    email: 'Después del pago, el email del recibo trae la clave. Pégala aquí. En esta página todavía no hay un enlace de pago.',
    planNames: ['Community', 'Pro', 'Ingot'],
  },
};

export const PRICING_PLANS: Record<PortalLanguage, PricingPlan[]> = {
  en: [
    {
      id: 'community',
      name: 'Community',
      summary: 'The React kit. MIT, free forever.',
      price: '$0',
      interval: 'Free forever',
      points: ['Button, Input, Modal, and theme', 'DataTable sort and sticky header', 'Icons, Flutter, and Blocks'],
      cta: 'Get started',
      href: '/installation',
    },
    {
      id: 'pro',
      name: 'Pro',
      summary: 'Spreadsheet behavior for one app.',
      price: '$9',
      interval: 'per year',
      featured: true,
      points: ['Everything in Community', 'Column pin, row grouping, Excel', 'One app, one key, emailed to you'],
      cta: 'Paste a key',
      href: `#${PRICING_KEY_ID}`,
    },
    {
      id: 'ingot',
      name: 'Ingot',
      summary: 'The open-source AI IDE. Not a Bear component.',
      price: '$0',
      interval: 'Free to start',
      points: ['Apache-2.0, bring your own model key', 'Agents, plugins, and an IDE keymap', 'The $9 Bear key does not unlock it'],
      cta: 'View Ingot',
      href: INGOT_URL,
      external: true,
    },
  ],
  es: [
    {
      id: 'community',
      name: 'Community',
      summary: 'El kit de React. MIT, gratis siempre.',
      price: '$0',
      interval: 'Gratis siempre',
      points: ['Button, Input, Modal y tema', 'DataTable con orden y cabecera fija', 'Iconos, Flutter y bloques'],
      cta: 'Empezar',
      href: '/installation',
    },
    {
      id: 'pro',
      name: 'Pro',
      summary: 'Comportamiento de hoja de cálculo para una app.',
      price: '$9',
      interval: 'al año',
      featured: true,
      points: ['Todo lo de Community', 'Fijar columnas, agrupar filas, Excel', 'Una app, una clave, por email'],
      cta: 'Pegar una clave',
      href: `#${PRICING_KEY_ID}`,
    },
    {
      id: 'ingot',
      name: 'Ingot',
      summary: 'El IDE de IA de código abierto. No es un componente de Bear.',
      price: '$0',
      interval: 'Gratis para empezar',
      points: ['Apache-2.0, con tus claves de modelo', 'Agentes, plugins y atajos de IDE', 'La clave de $9 de Bear no lo abre'],
      cta: 'Ver Ingot',
      href: INGOT_URL,
      external: true,
    },
  ],
};

const yes = 'yes';
const no = 'no';

export const PRICING_GROUPS: Record<PortalLanguage, PricingGroup[]> = {
  en: [
    {
      title: 'Bear Core',
      rows: [
        { feature: 'Button, Input, Modal, theme', cells: [yes, yes, no] },
        { feature: 'DataTable sort and sticky header', cells: [yes, yes, no] },
        { feature: 'Icons', cells: [yes, yes, no] },
        { feature: 'Flutter (same tokens)', cells: [yes, yes, no] },
        { feature: 'Blocks, the dashboard screen', cells: [yes, yes, no] },
        { feature: 'Charts, map, calendar, kanban, AI, code', cells: [yes, yes, no] },
        { feature: 'Ask Bear on the docs', cells: [yes, yes, no] },
      ],
    },
    {
      title: 'Bear Grid',
      rows: [
        { feature: 'Column pin', cells: [no, yes, no] },
        { feature: 'Row grouping', cells: [no, yes, no] },
        { feature: 'Excel and CSV export', cells: [no, yes, no] },
        { feature: 'Runs before you buy', cells: ['Free DataTable', 'Yes, with a watermark', no] },
        { feature: 'Watermark removed', cells: [no, 'With the key', no] },
      ],
    },
    {
      title: 'Ingot',
      rows: [
        { feature: 'Open-source AI IDE', cells: [no, no, yes] },
        { feature: 'Bring your own model key', cells: [no, no, yes] },
        { feature: 'Agents, plugins, and keymap', cells: [no, no, yes] },
        { feature: 'Included in the Bear Pro key', cells: [no, no, no] },
        { feature: 'Paid Ingot plans', cells: [no, no, 'Not priced yet'] },
      ],
    },
    {
      title: 'License',
      rows: [
        { feature: 'Price', cells: ['$0', '$9 / year', 'Free to start'] },
        { feature: 'Covers', cells: ['Any app, MIT', 'One app', 'The IDE, Apache-2.0'] },
        { feature: 'Ink rich text', cells: ['Own license', 'Own license', no] },
      ],
    },
  ],
  es: [
    {
      title: 'Bear Core',
      rows: [
        { feature: 'Button, Input, Modal, tema', cells: [yes, yes, no] },
        { feature: 'DataTable con orden y cabecera fija', cells: [yes, yes, no] },
        { feature: 'Iconos', cells: [yes, yes, no] },
        { feature: 'Flutter (los mismos tokens)', cells: [yes, yes, no] },
        { feature: 'Bloques, la pantalla de panel', cells: [yes, yes, no] },
        { feature: 'Gráficos, mapa, calendario, kanban, IA, código', cells: [yes, yes, no] },
        { feature: 'Ask Bear en la documentación', cells: [yes, yes, no] },
      ],
    },
    {
      title: 'Bear Grid',
      rows: [
        { feature: 'Columnas fijadas', cells: [no, yes, no] },
        { feature: 'Agrupación de filas', cells: [no, yes, no] },
        { feature: 'Exportación Excel y CSV', cells: [no, yes, no] },
        { feature: 'Funciona antes de comprar', cells: ['DataTable gratis', 'Sí, con marca de agua', no] },
        { feature: 'Marca de agua quitada', cells: [no, 'Con la clave', no] },
      ],
    },
    {
      title: 'Ingot',
      rows: [
        { feature: 'IDE de IA de código abierto', cells: [no, no, yes] },
        { feature: 'Tus propias claves de modelo', cells: [no, no, yes] },
        { feature: 'Agentes, plugins y atajos', cells: [no, no, yes] },
        { feature: 'Incluido en la clave Bear Pro', cells: [no, no, no] },
        { feature: 'Planes de pago de Ingot', cells: [no, no, 'Aún sin precio'] },
      ],
    },
    {
      title: 'Licencia',
      rows: [
        { feature: 'Precio', cells: ['$0', '$9 / año', 'Gratis para empezar'] },
        { feature: 'Cubre', cells: ['Cualquier app, MIT', 'Una app', 'El IDE, Apache-2.0'] },
        { feature: 'Texto enriquecido de Ink', cells: ['Licencia propia', 'Licencia propia', no] },
      ],
    },
  ],
};

export const PRICING_FACTS: Record<PortalLanguage, PricingFact[]> = {
  en: [
    {
      title: 'What the $9 pays for',
      body: 'Column pin, row grouping, and Excel or CSV export in Bear Grid. Sort and a sticky header stay on the free DataTable, so a simple table does not need a license.',
    },
    {
      title: 'What Blocks are',
      body: 'A block is a finished screen made from Bear components. DashboardBlock is a title and stat cards. It is free and has no watermark. You pay only when the table under those cards needs Bear Grid.',
    },
    {
      title: 'One app, one key',
      body: 'The intro price is $9 for one year and one app. The key arrives in the receipt email. Paste it on this page and the watermark goes away in that browser.',
    },
    {
      title: 'You can try the grid first',
      body: 'Bear Grid still runs without a key. Pin, grouping, and export show a Bear Pro mark and one console warning until the key is saved.',
    },
    {
      title: 'Ingot is separate',
      body: 'Ingot is the open-source AI IDE: a calm desktop editor, any model with your own key, agents, plugins, and an IDE keymap. It is Apache-2.0 and still in development. It is not a Bear component, and the Bear Pro key does not include it. Paid Ingot plans are not priced yet.',
    },
    {
      title: 'Ink is separate',
      body: 'Ink is the rich-text editor, with tables, comments, and track changes. It has its own license. Bear RichEditor stays the lighter editor in Core.',
    },
  ],
  es: [
    {
      title: 'Qué pagan los $9',
      body: 'Fijar columnas, agrupar filas y exportar Excel o CSV en Bear Grid. El orden y la cabecera fija siguen en DataTable gratis, así que una tabla simple no necesita licencia.',
    },
    {
      title: 'Qué son los bloques',
      body: 'Un bloque es una pantalla terminada hecha con componentes de Bear. DashboardBlock es un título y tarjetas de cifras. Es gratis y no tiene marca de agua. Pagas solo cuando la tabla bajo esas tarjetas necesita Bear Grid.',
    },
    {
      title: 'Una app, una clave',
      body: 'El precio de entrada es $9 por un año y una app. La clave llega en el email del recibo. Pégala en esta página y la marca de agua desaparece en ese navegador.',
    },
    {
      title: 'Puedes probar la tabla antes',
      body: 'Bear Grid funciona sin clave. Fijar, agrupar y exportar muestran la marca Bear Pro y un aviso en la consola hasta que guardas la clave.',
    },
    {
      title: 'Ingot es aparte',
      body: 'Ingot es el IDE de IA de código abierto: un editor de escritorio, cualquier modelo con tu clave, agentes, plugins y atajos de IDE. Es Apache-2.0 y sigue en desarrollo. No es un componente de Bear, y la clave Bear Pro no lo incluye. Los planes de pago de Ingot aún no tienen precio.',
    },
    {
      title: 'Ink es aparte',
      body: 'Ink es el editor enriquecido, con tablas, comentarios y control de cambios. Tiene su propia licencia. RichEditor de Bear sigue siendo el editor ligero de Core.',
    },
  ],
};

export const PRICING_FAQ: Record<PortalLanguage, PricingFaq[]> = {
  en: [
    {
      question: 'Do I need to pay for Blocks?',
      answer: 'No. DashboardBlock is free. The $9 is for Bear Grid: pin, grouping, and Excel under that screen.',
    },
    {
      question: 'How do I remove the watermark?',
      answer: 'Buy Pro, then paste the key from the receipt email into the form on this page. Checkout is not linked here yet.',
    },
    {
      question: 'Does the Bear key include Ingot or Ink?',
      answer: 'No. Ingot is the AI IDE and starts free with your own model keys. Ink has its own license. The $9 key is only Bear Grid.',
    },
    {
      question: 'Is Flutter free?',
      answer: 'Yes. The mobile kit uses the same color, radius, space, and type as Bear. Web stays React.',
    },
  ],
  es: [
    {
      question: '¿Hay que pagar por los bloques?',
      answer: 'No. DashboardBlock es gratis. Los $9 son de Bear Grid: fijar, agrupar y Excel bajo esa pantalla.',
    },
    {
      question: '¿Cómo quito la marca de agua?',
      answer: 'Compra Pro y pega la clave del email del recibo en el formulario de esta página. Aquí todavía no hay un enlace de pago.',
    },
    {
      question: '¿La clave de Bear incluye Ingot o Ink?',
      answer: 'No. Ingot es el IDE de IA y empieza gratis con tus claves de modelo. Ink tiene su propia licencia. La clave de $9 es solo Bear Grid.',
    },
    {
      question: '¿Flutter es gratis?',
      answer: 'Sí. El kit móvil usa el mismo color, radio, espacio y tipo que Bear. La web sigue en React.',
    },
  ],
};
