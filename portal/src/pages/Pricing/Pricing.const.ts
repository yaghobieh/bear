import type { PortalLanguage } from '@/constants/portal-i18n.const';
import type { PricingPlan } from './Pricing.types';

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
}> = {
  en: {
    title: 'Pricing',
    description: 'Core stays free. Pro is $9 a year for now. The license key arrives by email and clears the watermark on Bear Grid.',
    keyLabel: 'License key',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Save key',
    clear: 'Remove key',
    saved: 'Pro is on in this browser.',
    invalid: 'That key does not match a Bear Pro license.',
    email: 'After checkout, the receipt email contains the key. Paste it here. Button, Input, Modal, DataTable, theme, blocks, and Flutter stay free.',
  },
  es: {
    title: 'Precios',
    description: 'Core sigue gratis. Pro cuesta $9 al año por ahora. La clave llega por email y quita la marca de agua de Bear Grid.',
    keyLabel: 'Clave de licencia',
    keyPlaceholder: 'bear_pro_xxxx_xxxx_xxxx_xxxx',
    save: 'Guardar clave',
    clear: 'Quitar clave',
    saved: 'Pro está activo en este navegador.',
    invalid: 'Esa clave no coincide con una licencia Bear Pro.',
    email: 'Después del pago, el email del recibo trae la clave. Pégala aquí. Button, Input, Modal, DataTable, el tema, los bloques y Flutter siguen gratis.',
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
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      interval: 'per year',
      featured: true,
      points: ['Column pin', 'Row grouping', 'Excel export', 'One app, one key, emailed to you'],
    },
    {
      id: 'flutter',
      name: 'Flutter',
      price: '$0',
      interval: 'with the kit',
      points: ['Same Bear tokens', 'Button, field, card, app bar', 'List, dialog, bottom sheet', 'The mobile masterpiece'],
    },
  ],
  es: [
    {
      id: 'core',
      name: 'Core',
      price: '$0',
      interval: 'siempre',
      points: ['Button, Input, Modal, tema', 'DataTable con orden y cabecera fija', 'Ask Bear en la documentación', 'MIT'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      interval: 'al año',
      featured: true,
      points: ['Columnas fijadas', 'Agrupación de filas', 'Exportación Excel', 'Una app, una clave, por email'],
    },
    {
      id: 'flutter',
      name: 'Flutter',
      price: '$0',
      interval: 'con el kit',
      points: ['Los mismos tokens de Bear', 'Botón, campo, tarjeta, barra', 'Lista, diálogo, bottom sheet', 'La pieza principal en móvil'],
    },
  ],
};
