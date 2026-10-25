import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { PricingFact, PricingFaq, PricingGroup, PricingPlan } from './Pricing.types';

export const BEAR_PRO_PRICE_USD = 9;

/** Same Lemon checkout as Ink Pro. */
export const BEAR_PRO_CHECKOUT_URL =
  'https://alloy-ai.lemonsqueezy.com/checkout/buy/f18d9ba7-5d9b-4263-a108-66f69ab0a55b';

export const PRICING_COPY: Record<PortalLanguage, {
  title: string;
  description: string;
  plansLabel: string;
  compareTitle: string;
  included: string;
  missing: string;
  factsTitle: string;
  faqTitle: string;
  payNote: string;
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
    payNote: 'Pay $9 a year on Lemon Squeezy. The license key is emailed to you.',
    planNames: ['Community', 'Pro'],
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
    payNote: 'Paga $9 al año en Lemon Squeezy. La clave de licencia llega por email.',
    planNames: ['Community', 'Pro'],
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
      cta: 'Pay',
      href: BEAR_PRO_CHECKOUT_URL,
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
      cta: 'Pagar',
      href: BEAR_PRO_CHECKOUT_URL,
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
        { feature: 'Button, Input, Modal, theme', cells: [yes, yes] },
        { feature: 'DataTable sort and sticky header', cells: [yes, yes] },
        { feature: 'Icons', cells: [yes, yes] },
        { feature: 'Flutter (same tokens)', cells: [yes, yes] },
        { feature: 'Blocks, the dashboard screen', cells: [yes, yes] },
        { feature: 'Charts, map, calendar, kanban, AI, code', cells: [yes, yes] },
        { feature: 'Ask Bear on the docs', cells: [yes, yes] },
      ],
    },
    {
      title: 'Bear Grid',
      rows: [
        { feature: 'Column pin', cells: [no, yes] },
        { feature: 'Row grouping', cells: [no, yes] },
        { feature: 'Excel and CSV export', cells: [no, yes] },
        { feature: 'Runs before you buy', cells: ['Free DataTable', 'Yes, with a watermark'] },
        { feature: 'Watermark removed', cells: [no, 'With the key'] },
      ],
    },
    {
      title: 'License',
      rows: [
        { feature: 'Price', cells: ['$0', '$9 / year'] },
        { feature: 'Covers', cells: ['Any app, MIT', 'One app'] },
        { feature: 'Ink rich text', cells: ['Own license', 'Own license'] },
      ],
    },
  ],
  es: [
    {
      title: 'Bear Core',
      rows: [
        { feature: 'Button, Input, Modal, tema', cells: [yes, yes] },
        { feature: 'DataTable con orden y cabecera fija', cells: [yes, yes] },
        { feature: 'Iconos', cells: [yes, yes] },
        { feature: 'Flutter (los mismos tokens)', cells: [yes, yes] },
        { feature: 'Bloques, la pantalla de panel', cells: [yes, yes] },
        { feature: 'Gráficos, mapa, calendario, kanban, IA, código', cells: [yes, yes] },
        { feature: 'Ask Bear en la documentación', cells: [yes, yes] },
      ],
    },
    {
      title: 'Bear Grid',
      rows: [
        { feature: 'Columnas fijadas', cells: [no, yes] },
        { feature: 'Agrupación de filas', cells: [no, yes] },
        { feature: 'Exportación Excel y CSV', cells: [no, yes] },
        { feature: 'Funciona antes de comprar', cells: ['DataTable gratis', 'Sí, con marca de agua'] },
        { feature: 'Marca de agua quitada', cells: [no, 'Con la clave'] },
      ],
    },
    {
      title: 'Licencia',
      rows: [
        { feature: 'Precio', cells: ['$0', '$9 / año'] },
        { feature: 'Cubre', cells: ['Cualquier app, MIT', 'Una app'] },
        { feature: 'Texto enriquecido de Ink', cells: ['Licencia propia', 'Licencia propia'] },
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
      body: 'The intro price is $9 for one year and one app. Pay, and the license key is emailed to you. That key clears the watermark.',
    },
    {
      title: 'You can try the grid first',
      body: 'Bear Grid still runs before you pay. Pin, grouping, and export show a Bear Pro mark until the emailed key is in the app.',
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
      body: 'El precio de entrada es $9 por un año y una app. Pagas y la clave de licencia llega por email. Esa clave quita la marca de agua.',
    },
    {
      title: 'Puedes probar la tabla antes',
      body: 'Bear Grid funciona antes de pagar. Fijar, agrupar y exportar muestran la marca Bear Pro hasta que la clave del email está en la app.',
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
      answer: 'Pay for Pro. The license key is emailed to you and clears the watermark.',
    },
    {
      question: 'Does the Bear key include Ink?',
      answer: 'No. Ink has its own license. The $9 key is only Bear Grid.',
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
      answer: 'Paga Pro. La clave de licencia llega por email y quita la marca de agua.',
    },
    {
      question: '¿La clave de Bear incluye Ink?',
      answer: 'No. Ink tiene su propia licencia. La clave de $9 es solo Bear Grid.',
    },
    {
      question: '¿Flutter es gratis?',
      answer: 'Sí. El kit móvil usa el mismo color, radio, espacio y tipo que Bear. La web sigue en React.',
    },
  ],
};
