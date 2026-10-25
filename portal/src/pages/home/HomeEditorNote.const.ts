import type { PortalLanguage } from '@/constants/portal-i18n.const';

export const EDITOR_SHOTS = [
  { src: '/ingot/hero-ide.png', alt: 'Ingot editor with the Bear workspace open' },
  { src: '/ingot/dashboard-light.png', alt: 'Ingot dashboard in light mode' },
  { src: '/ingot/dashboard-dark.png', alt: 'Ingot dashboard in dark mode' },
];

export const EDITOR_COPY: Record<PortalLanguage, { title: string; body: string; soon: string }> = {
  en: {
    title: 'A Bear editor is coming',
    soon: 'Soon',
    body: 'Bear will have its own editor. We are building that work in Ingot, the open-source AI IDE. Ink stays the rich-text editor you can install today.',
  },
  es: {
    title: 'Llega un editor de Bear',
    soon: 'Pronto',
    body: 'Bear tendrá su propio editor. Ese trabajo lo estamos haciendo en Ingot, el IDE de IA de código abierto. Ink sigue siendo el editor de texto enriquecido que puedes instalar hoy.',
  },
};
