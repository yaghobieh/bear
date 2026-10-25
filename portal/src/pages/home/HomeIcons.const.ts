import { BearIcons } from '@forgedevstack/bear-icons';
import type { PortalLanguage } from '@/constants/portal-i18n.const';

export const HOME_ICON_SIZE = 22;

export const HOME_ICONS = [
  { name: 'Search', Icon: BearIcons.SearchIcon },
  { name: 'Sparkles', Icon: BearIcons.SparklesIcon },
  { name: 'Bear', Icon: BearIcons.BearFaceIcon },
  { name: 'Layers', Icon: BearIcons.LayersIcon },
  { name: 'Package', Icon: BearIcons.PackageIcon },
  { name: 'Check', Icon: BearIcons.CheckCircleIcon },
  { name: 'Play', Icon: BearIcons.PlayIcon },
  { name: 'Send', Icon: BearIcons.SendIcon },
  { name: 'Close', Icon: BearIcons.CloseIcon },
  { name: 'File', Icon: BearIcons.FileTextIcon },
  { name: 'Message', Icon: BearIcons.MessageCircleIcon },
  { name: 'Github', Icon: BearIcons.GithubIcon },
];

export const HOME_ICONS_COPY: Record<PortalLanguage, { title: string; body: string; badge: string }> = {
  en: {
    badge: 'Icons',
    title: 'Icons on their own install',
    body: 'Install @forgedevstack/bear-icons when you want the set. Core still renders if you leave it out.',
  },
  es: {
    badge: 'Iconos',
    title: 'Iconos en su propia instalación',
    body: 'Instala @forgedevstack/bear-icons cuando quieras el set. Core se sigue viendo si lo omites.',
  },
};
